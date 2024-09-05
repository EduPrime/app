<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonToast } from '@ionic/vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { toastController } from '@ionic/core'
import { useRouter } from 'vue-router'
import SchoolService from '../services/SchoolService'
import InstitutionService from '../services/InstitutionService'
import EpInput from '@/components/EpInput.vue'
import showToast from '@/utils/toast-alert'
import { isValidDDD } from '@/utils/ddd-validator'
import type { Tables } from '@/types/database.types'

defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()

defineExpose({
  registerSchool,
})

const selectedSegment = ref('general-info')
const router = useRouter()
const schoolId = computed(() => route.currentRoute.value.params.id) as { value: string }
const schoolService = new SchoolService()
const institutionService = new InstitutionService()
const institutionId = ref('')
const formSchema = yup.object({
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
    .string(),
  city: yup
    .string(),
  state: yup
    .string()
    .max(2)
    .matches(/^[A-Za-z]{2}$/, 'O campo deve conter exatamente 2 letras'),
  postal_code: yup
    .string()
    .matches(/^\d{5}-\d{3}$/, 'Código postal deve estar no formato 00000-000'),
  latitude: yup
    .number()
    .transform((value) => Number.isNaN(value) ? null : value )
    .nullable()
    .min(-90, 'Latitude deve ser maior ou igual a -90')
    .max(90, 'Latitude deve ser menor ou igual a 90'),
  longitude: yup
    .number()
    .transform((value) => Number.isNaN(value) ? null : value )
    .nullable()
    .min(-180, 'Longitude deve ser maior ou igual a -180')
    .max(180, 'Longitude deve ser menor ou igual a 180'),
  number_of_floors: yup
    .number()
    .min(1, 'Deve haver pelo menos um andar'),
  total_area: yup
    .number()
    .positive('Área total deve ser um número positivo'),
  built_area: yup
    .number()
    .positive('Área construída deve ser um número positivo'),
  available_area: yup
    .number()
    .positive('Área disponível deve ser um número positivo'),
  operation_location: yup
    .string(),
  logo_url: yup
    .string()
    .url('Deve ser uma URL válida'),
  manager_id: yup
    .string(),
  manager_position: yup
    .string(),
  abbreviation: yup
    .string()
    .max(10, 'Abreviação deve ter no máximo 10 caracteres'),
})

const { values, errors, validate } = useForm<SchoolPartial>({
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
      postal_code: values.postalCode,
      latitude: values.latitude,
      longitude: values.longitude,
      number_of_floors: values.numberOfFloors,
      total_area: values.totalArea,
      built_area: values.builtArea,
      available_area: values.availableArea,
      operation_location: values.operationLocation,
      logo_url: values.logoUrl,
      manager_id: values.managerId,
      manager_position: values.managerPosition,
      abbreviation: values.abbreviation,
    }
    try {
      let result
      if (schoolId.value) {
        result = await schoolService.update(schoolId.value, formData)
        if (result) {
            showToast('Escola atualizada com sucesso')
            setTimeout(() => {
                router.push('/schools/manage')
            }, 2000)
        }
      }
      else {
      result = await schoolService.create(formData)
      if (result) {
        showToast('Escola cadastrada com sucesso!', 'top', 'success')
        setTimeout(() => {
            router.push('/schools/manage')
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
//* * Mask Inputs
const managerMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/, /\d/])
const stateMask = ref([/\w/, /\w/])
const abbreviationMask = ref([/[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/, /[\w\d]/])
const postalCodeMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/])
const phoneMask = ref(['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/])
const areaMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/])

onMounted(async () => {
  institutionId.value = (await institutionService.getAll())?.at(0)?.id
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
      <ion-segment-button value="facilities">
        <ion-label style="font-size: calc(1rem - 2px);">
          Instalações
        </ion-label>
      </ion-segment-button>
    </ion-segment>

    <div v-show="selectedSegment === 'general-info'">
      <ep-input v-model="values.name" name="name" label="Nome*" placeholder="Digite o nome da escola" />
      <ep-input v-model="values.abbreviation" name="abbreviation" :mask="abbreviationMask" label="Abreviação" placeholder="Digite a abreviação" />
      <ep-input v-model="values.phone" name="phone" :mask="phoneMask" inputmode="tel" label="Telefone*" placeholder="(99) 99999-9999" />
      <ep-input v-model="values.manager_id" name="manager_id" :mask="managerMask" label="ID do Gerente" placeholder="999999" />
      <ep-input v-model="values.manager_position" name="manager_position" label="Posição do Gerente" placeholder="Digite a posição do gerente" />
      <ep-input v-model="values.logo_url" name="logo_url" label="URL do Logo" placeholder="Digite a URL do logo" />
    </div>

    <div v-show="selectedSegment === 'location'">
      <ep-input v-model="values.address" name="address" label="Endereço" placeholder="Digite o endereço" />
      <ep-input v-model="values.city" name="city" label="Cidade" placeholder="Digite a cidade" />
      <ep-input v-model="values.state" :maxlength="2" name="state" :mask="stateMask" label="Estado" placeholder="Digite o estado" />
      <ep-input v-model="values.postal_code" name="postal_code" :mask="postalCodeMask" inputmode="number" label="CEP" placeholder="00000-000" /> 
      <ep-input v-model="values.latitude" name="latitude" label="Latitude" type="number" placeholder="Digite a latitude" />
      <ep-input v-model="values.longitude" name="longitude" label="Longitude" type="number" placeholder="Digite a longitude" />
    </div>

    <div v-show="selectedSegment === 'facilities'">
      <ep-input v-model="values.number_of_floors" name="number_of_floors" :mask="[/\d/, /\d/]" label="Número de Andares" placeholder="99" />
      <ep-input v-model="values.total_area" name="total_area" :mask="areaMask" label="Área Total" placeholder="99999" />
      <ep-input v-model="values.built_area" name="built_area" :mask="areaMask" label="Área Construída" placeholder="99999" />
      <ep-input v-model="values.available_area" name="available_area" :mask="areaMask" label="Área Disponível" placeholder="99999" />
      <ep-input v-model="values.operation_location" name="operation_location" label="Local de Operação" placeholder="Digite o local de operação" />
    </div>
    <ion-toast />
</template>
