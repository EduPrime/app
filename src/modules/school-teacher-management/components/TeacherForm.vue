<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import { date, object, string } from 'yup'
import SchoolService from '../services/SchoolService'
import { hundredYearsAgo } from '@/utils/hundred-years-ago'
import { isValidDDD } from '@/utils/ddd-validator'
import EpInput from '@/components/EpInput.vue'
import EpTextarea from '@/components/EpTextarea.vue'
import EpJson from '@/components/EpJson.vue'

interface TeacherPartial {
  name: string
  birthdate: Date
  email: string
  phone: string
  address?: string
  specializations?: string[]
  school_id: string
}

const props = defineProps<{ teacher?: TeacherPartial }>()
const emits = defineEmits(['submit', 'cancel'])

const formSchema = object({
  name: string().required('Nome é obrigatório').min(12, 'O nome deve ter pelo menos 12 caracteres'),
  birthdate: date().required('Data de nascimento é obrigatória').typeError('Data de nascimento inválida').min(hundredYearsAgo(), 'A pessoa não pode ter mais de 100 anos'),
  email: string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: string().required('Telefone é obrigatório').matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido').test('valid-ddd', 'DDD inválido', value => isValidDDD(value || '')),
  address: string().optional(),
  specializations: string().optional(),
  school_id: string().required('Selecionar escola é obrigatório'),
})

const { values, validate, setFieldValue } = useForm<TeacherPartial>({
  validationSchema: formSchema,
  initialValues: props.teacher || {},
})

const selectedSegment = ref('general-info')
const specializations = ref<string[]>(props.teacher?.specializations || [])
const schoolList = ref<{ id: string, name: string }[]>([])

function handleEntriesUpdate(updatedEntries: string[]) {
  specializations.value = updatedEntries
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
function handleSubmit() {
  validate().then((isValid) => {
    if (isValid) {
      emits('submit', values)
    }
  })
}
function handleCancel() {
  emits('cancel')
}
const phoneMask = ref(['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/])
onMounted(loadSchools)
</script>

<template>
  <div>
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

    <div v-show="selectedSegment === 'additional-info'">
      <ep-json
        name="specializations"
        :fields="[
          { key: 'specialization', label: 'Formações', placeholder: 'Ex: Cursos, Especializações' },
        ]"
        @update:entries="handleEntriesUpdate"
      />
    </div>

    <!-- Remover os botões daqui -->
  </div>
</template>

  <style scoped>
  ion-label h2 {
    margin: 0;
    font-weight: bold;
  }
  ion-searchbar {
    --background: var(--ion-color-light);
  }
  </style>
