<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import SchoolService from '../services/SchoolService'
import InstitutionService from '../services/InstitutionService'
import QualificationForm from './QualificationForm.vue'
import { hundredYearsAgo } from '@/utils/hundred-years-ago'
import { isValidDDD } from '@/utils/ddd-validator'
import EpInput from '@/components/EpInput.vue'
import EpTextarea from '@/components/EpTextarea.vue'
import type { Tables } from '@/types/database.types'
import showToast from '@/utils/toast-alert'
import { toastController } from '@ionic/core'

defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()

defineExpose({
  registerSchool,
})

const selectedSegment = ref('general-info')
const router = useRouter()
const route = useRouter()
const schoolData = ref< Tables<'school'> | []>([]) 
const schoolId = computed(() => route.currentRoute.value.params.id) as { value: string }
const schoolService = new SchoolService()
const institutionService = new InstitutionService()
const institutionId = ref('')
const formSchema = yup.object ({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(12, 'O nome deve ter pelo menos 12 caracteres'),
    phone: yup
    .string()
    .required('Telefone é obrigatório')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido')
    .test('valid-ddd', 'DDD inválido', value => isValidDDD(value || '')),
  address: yup
    .string()
    .required('Endereço é obrigatório'),
  city: yup
    .string()
    .required('Cidade é obrigatório'),
  state: yup
    .string()
    .max(2)
    .matches(/^[A-Za-z]{2}$/, 'O campo deve conter exatamente 2 letras')
    .required('Estado é obrigatório'),
  postalcode: yup
    .string()
    .required('CEP é obrigatório')
    .matches(/^\d{5}-\d{3}$/, 'Código postal deve estar no formato 00000-000'),
  logourl: yup
    .string()
    .required('URL do Logo é obrigatório')
    .url('Deve ser uma URL válida'),
  abbreviation: yup
    .string()
    .required('Abreviação é obrigatório')
    .max(10, 'Abreviação deve ter no máximo 10 caracteres'),
})

const { values, errors, validate, setFieldValue } = useForm<SchoolPartial>({
  validationSchema: formSchema,
})

async function registerSchool() {
  const validationResult = await validate()

  if (!validationResult.valid) {
    const displayErrors = Object.values(errors.value).join(', ')
    showToast(displayErrors, 'top', 'warning')
  }
  else {
    const formData = {
      institution_id: institutionId.value,
      name: values.name,
      phone: values.phone,
      address: values.address,
      city: values.city,
      state: values.state,
      postalcode: values.postalcode,
      logourl: values.logourl,
      abbreviation: values.abbreviation,
    }
    try {
      let result
      if (schoolId.value) {
        result = await schoolService.update(schoolId.value, formData)
        if (result) {
          showToast('Escola atualizada com sucesso')
          setTimeout(() => {
            router.push('/Institutions/schools').then(() => {
              location.reload()
            })
          }, 2000)
        }
      } 
      else {
        result = await schoolService.create(formData)
        if (result) {
          showToast('Escola cadastrada com sucesso!', 'top', 'success')
          setTimeout(() => {
            router.push('/Institutions/schools').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
    }
      catch (error) {
        console.error('Erro ao salvar escola:', error)
        showToast('Erro ao cadastrar escola. Tente novamente.', 'top', 'danger')
      }
  }
}

async function getSchoolData() {
  if (schoolId.value) {
    const schoolDbData = await schoolService.getById(schoolId.value)
    if (schoolDbData) {
      setFieldValue('institutionId', schoolDbData.institutionId),
      setFieldValue('name', schoolDbData.name),
      setFieldValue('phone', schoolDbData.phone),
      setFieldValue('address', schoolDbData.address),
      setFieldValue('city', schoolDbData.city),
      setFieldValue('state', schoolDbData.state),
      setFieldValue('postalcode', schoolDbData.postalcode),
      setFieldValue('logourl', schoolDbData.logourl),
      setFieldValue('abbreviation', schoolDbData.abbreviation)
    }
    else {
      console.error(`Dados da escola não encontrados para o ID: ${schoolId.value}`)
    }
  }
}

//* * Mask Inputs
const managerMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/, /\d/])
const stateMask = ref([/\w/, /\w/])
const abbreviationMask = ref([/[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/])
const postalCodeMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/])
const phoneMask = ref(['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/])
const areaMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/])

onMounted(async () => {
  institutionId.value = (await institutionService.getAll())?.at(0)?.id
  if (schoolId.value) {
    await getSchoolData()
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
    <ion-segment-button value="location">
      <ion-label style="font-size: calc(1rem - 2px);">
        Localização
      </ion-label>
    </ion-segment-button>
  </ion-segment>

  <div v-show="selectedSegment === 'general-info'">
    <ep-input v-model="values.name" name="name" label="Nome*" placeholder="Digite o nome da escola" />
    <ep-input v-model="values.abbreviation" name="abbreviation" :mask="abbreviationMask" label="Abreviação*" placeholder="Digite a abreviação" />
    <ep-input v-model="values.phone" name="phone" :mask="phoneMask" inputmode="tel" label="Telefone*" placeholder="(99) 99999-9999" />
    <ep-input v-model="values.logourl" name="logourl" label="URL do Logo*" placeholder="Digite a URL do logo" />
  </div>

  <div v-show="selectedSegment === 'location'">
    <ep-input v-model="values.address" name="address" label="Endereço*" placeholder="Digite o endereço" />
    <ep-input v-model="values.city" name="city" label="Cidade*" placeholder="Digite a cidade" />
    <ep-input v-model="values.state" :maxlength="2" name="state" :mask="stateMask" label="Estado*" placeholder="Digite o estado" />
    <ep-input v-model="values.postalcode" name="postalcode" :mask="postalCodeMask" inputmode="number" label="CEP*" placeholder="00000-000" /> 
  </div>
</template>