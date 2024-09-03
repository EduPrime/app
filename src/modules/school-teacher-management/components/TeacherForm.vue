<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import { date, object, string } from 'yup'
import TeacherService from '../services/TeacherService'
import SchoolService from '../services/SchoolService'
import QualificationForm from './QualificationForm.vue'
import { hundredYearsAgo } from '@/utils/hundred-years-ago'
import { isValidDDD } from '@/utils/ddd-validator'
import EpInput from '@/components/EpInput.vue'
import EpTextarea from '@/components/EpTextarea.vue'

import type { Tables } from '@/types/database.types'
import showToast from '@/utils/toast-alert'

type TeacherPartial = Omit<Pick<Tables<'teacher'>, 'name' | 'birthdate' | 'email' | 'phone' | 'address' | 'qualifications' | 'school_id'>, 'birthdate'> & {
  birthdate: Date | string // Redefinindo o campo birthdate para ser do tipo Date
}

defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()

defineExpose({
  registerTeacher,
})

const router = useRouter()
const route = useRouter()
const teacherId = computed(() => route.currentRoute.value.params.id) as { value: string }
const formSchema = object({
  name: string()
    .required('Nome é obrigatório')
    .min(12, 'O nome deve ter pelo menos 12 caracteres'),
  birthdate: date()
    .required('Data de nascimento é obrigatória')
    .typeError('Data de nascimento inválida')
    .min(hundredYearsAgo(), 'A pessoa não pode ter mais de 100 anos'),
  email: string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  phone: string()
    .required('Telefone é obrigatório')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido')
    .test('valid-ddd', 'DDD inválido', value => isValidDDD(value || '')),
  address: string().optional(),
  qualifications: string().optional(),
  school_id: string().required('Selecionar escola é obrigatório'),
})

const { values, errors, validate, setFieldValue } = useForm<TeacherPartial>({
  validationSchema: formSchema,
})

const selectedSegment = ref('general-info')
const qualifications = ref<{ institution: string, course: string, start: string | number | undefined, end: string | number | undefined }[]>([])
const schoolList = ref<{ id: string, name: string }[]>([])
const teacherService = new TeacherService()

function handleEntriesUpdate(updatedEntries: never[]) {
  qualifications.value = updatedEntries
}
const schoolId = computed({
  get: () => values.school_id,
  set: newValue => setFieldValue('school_id', newValue),
})
function handleSchoolChange(event: { detail: { value: string } }) {
  setFieldValue('school_id', event.detail.value)
}

async function loadSchools() {
  const schoolService = new SchoolService()
  const schools = await schoolService.getAll()
  if (schools) {
    schoolList.value = schools.map(school => ({
      id: school.id,
      name: school.name,
    }))
  }
}
async function registerTeacher() {
  const validationResult = await validate()

  if (!validationResult.valid) {
    const displayErrors = Object.values(errors.value).join(', ')
    showToast(displayErrors, 'top', 'warning')
  }
  else {
  // Verifique se 'birthdate' é uma instância de Date, caso contrário, converta
    const birthdateValue = values.birthdate instanceof Date ? values.birthdate : new Date(values.birthdate)

    const formData = {
      name: values.name,
      birthdate: birthdateValue.toISOString().split('T')[0],
      email: values.email,
      phone: values.phone,
      address: values.address,
      qualifications: qualifications.value,
      school_id: values.school_id,
    }
    try {
      let result
      if (teacherId.value) {
        result = await teacherService.update(teacherId.value, formData)
        if (result) {
          showToast('Professor atualizado com sucesso')
          setTimeout(() => {
            router.push('/teachers/manage')
          }, 2000)
        }
      }
      else {
        result = await teacherService.create(formData)
        if (result) {
          showToast('Professor cadastrado com sucesso!')
          setTimeout(() => {
            router.push('/teachers/manage')
          }, 2000)
        }
      }
    }
    catch (error) {
      console.error('Erro ao salvar professor:', error)
      showToast('Erro ao cadastrar professor. Tente novamente.', 'top', 'danger')
    }
  }
}

//* * Mask Inputs
const phoneMask = ref(['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/])

// check if the teacher is being edited

async function getTeacherData() {
  if (teacherId.value) {
    const teacherDbData = await teacherService.getById(teacherId.value)
    if (teacherDbData) {
      const birthdateString = teacherDbData.birthdate
      setFieldValue('birthdate', birthdateString)
      setFieldValue('name', teacherDbData.name)
      setFieldValue('email', teacherDbData.email)
      setFieldValue('phone', applyPhoneMask(teacherDbData.phone))
      setFieldValue('address', teacherDbData.address)
      setFieldValue('school_id', teacherDbData.school_id)

      if (teacherDbData.qualifications && typeof teacherDbData.qualifications === 'object') {
        qualifications.value = teacherDbData.qualifications as any
      }
      else {
        qualifications.value = []
      }
    }
    else {
      console.error(`Dados do professor não encontrados para o ID: ${teacherId.value}`)
    }
  }
}
function applyPhoneMask(phone: string | null): string {
  if (!phone)
    return ''
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

onMounted(async () => {
  await loadSchools()
  if (teacherId.value) {
    await getTeacherData()
  }
})
</script>

<template>
  <ion-segment v-model="selectedSegment">
    <ion-segment-button value="general-info">
      <ion-label style="font-size: calc(1rem - 2px);">
        Informações Gerais
      </ion-label>
    </ion-segment-button>
    <ion-segment-button value="additional-info">
      <ion-label style="font-size: calc(1rem - 2px);">
        Informações Adicionais
      </ion-label>
    </ion-segment-button>
  </ion-segment>
  <div v-show="selectedSegment === 'general-info'">
    <ion-list id="schoolList">
      <ion-item>
        <ion-select
          v-model="schoolId"
          justify="space-between"
          label="Escola do Professor"
          placeholder="Selecione a escola"
          @ion-change="handleSchoolChange"
        >
          <ion-select-option v-for="school in schoolList" :key="school.id" :value="school.id">
            {{ school.name }}
          </ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <ep-input v-model="values.name" name="name" label="Nome" placeholder="Digite o nome do professor" />
    <ep-input v-model="values.birthdate" name="birthdate" label="Data de Nascimento" type="date" placeholder="YYYY-MM-DD" />
    <ep-input v-model="values.email" name="email" label="Email" placeholder="Digite o email" />
    <ep-input v-model="values.phone" name="phone" :mask="phoneMask" inputmode="tel" label="Telefone" placeholder="(99) 99999-9999" />
    <ep-textarea v-model="values.address" name="address" label="Endereço" placeholder="Digite o endereço" />
  </div>
  <!-- another tab -->
  <div v-show="selectedSegment === 'additional-info'">
    <qualification-form v-model="qualifications" @update:qualifications="handleEntriesUpdate" />
  </div>
</template>
