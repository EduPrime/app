<script setup lang="ts">
import { ref } from 'vue'
import { IonLabel, IonSegment, IonSegmentButton, IonToast } from '@ionic/vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { toastController } from '@ionic/core'
import EpInput from '@/components/EpInput.vue'

const selectedSegment = ref('general-info')

const formSchema = yup.object({
  id: yup
    .number()
    .typeError('ID deve ser numérico')
    .required('ID é obrigatório'),
  name: yup.string().required('Nome é obrigatório'),
  abbreviation: yup.string().required('Abreviação é obrigatória'),
  managerId: yup.string().required('ID do Gerente é obrigatório'),
  managerPosition: yup.string().required('Posição do Gerente é obrigatória'),
  logoUrl: yup.string().url('URL inválida').required('URL do Logo é obrigatória'),
  address: yup.string().required('Endereço é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  state: yup.string().required('Estado é obrigatório'),
  postalCode: yup
    .string()
    .required('CEP é obrigatório')
    .matches(/^\d{5}-\d{3}$/, 'CEP inválido'),
  phone: yup
    .string()
    .required('Telefone é obrigatório')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
  latitude: yup
    .number()
    .required('Latitude é obrigatória')
    .min(-90, 'Latitude deve ser entre -90 e 90')
    .max(90, 'Latitude deve ser entre -90 e 90'),
  longitude: yup
    .number()
    .required('Longitude é obrigatória')
    .min(-180, 'Longitude deve ser entre -180 e 180')
    .max(180, 'Longitude deve ser entre -180 e 180'),
  numberOfFloors: yup
    .number()
    .required('Número de Andares é obrigatório')
    .min(0, 'Número de Andares deve ser um número positivo')
    .max(99, 'Número de Andares deve ter no máximo 2 dígitos'),
  totalArea: yup
    .number()
    .required('Área Total é obrigatória')
    .min(0, 'Área Total deve ser um número positivo'),
  builtArea: yup
    .number()
    .required('Área Construída é obrigatória')
    .min(0, 'Área Construída deve ser um número positivo'),
  availableArea: yup
    .number()
    .required('Área Disponível é obrigatória')
    .min(0, 'Área Disponível deve ser um número positivo'),
  operationLocation: yup.string().required('Local de Operação é obrigatório'),
})

const { values, errors } = useForm({
  validationSchema: formSchema,
})

async function registerSchool() {
  console.log('Values : ', values)
  console.log('Errors : ', errors.value)
  let displayErrors: string = ''
  if (typeof (errors.value) === 'object') {
    displayErrors = Object.values(errors.value).join(', ')
  }
  else {
    displayErrors = errors.value
  }
  const toast: any = await toastController.create({
    header: 'Errors',
    message: displayErrors,
    duration: 2500,
    position: 'bottom',
    color: 'dark',
  })
  await toast.present()
}

//* * Mask Inputs
const idMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/, /\d/])
const postalCodeMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/])
const phoneMask = ref(['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/])
const areaMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/])
</script>

<template>
  <content-layout :show-footer="true">
    <template #header-buttons>
      <ion-buttons slot="start">
        <ion-back-button default-href="/" />
      </ion-buttons>
    </template>
    <template #description>
      Todos os campos são obrigatórios, a menos que indicado de outra forma.
    </template>
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
      <ep-input name="name" label="Nome" placeholder="Digite o nome da escola" />
      <ep-input name="abbreviation" label="Abreviação" placeholder="Digite a abreviação" />
      <ep-input name="managerId" :mask="idMask" label="ID do Gerente" placeholder="999999" />
      <ep-input name="managerPosition" label="Posição do Gerente" placeholder="Digite a posição do gerente" />
      <ep-input name="logoUrl" label="URL do Logo" placeholder="Digite a URL do logo" />
    </div>

    <div v-show="selectedSegment === 'location'">
      <ep-input name="address" label="Endereço" placeholder="Digite o endereço" />
      <ep-input name="city" label="Cidade" placeholder="Digite a cidade" />
      <ep-input name="state" label="Estado" placeholder="Digite o estado" />
      <ep-input name="postalCode" :mask="postalCodeMask" inputmode="number" label="CEP" placeholder="99999-999" />
      <ep-input name="phone" :mask="phoneMask" inputmode="tel" label="Phone" placeholder="(99) 99999-9999" />
      <ep-input name="latitude" label="Latitude" type="number" placeholder="Digite a latitude" />
      <ep-input name="longitude" label="Longitude" type="number" placeholder="Digite a longitude" />
    </div>

    <div v-show="selectedSegment === 'facilities'">
      <ep-input name="numberOfFloors" :mask="[/\d/, /\d/]" label="Número de Andares" placeholder="99" />
      <ep-input name="totalArea" :mask="areaMask" label="Área Total" placeholder="99999" />
      <ep-input name="builtArea" :mask="areaMask" label="Área Construída" placeholder="99999" />
      <ep-input name="availableArea" :mask="areaMask" label="Área Disponível" placeholder="99999" />
      <ep-input name="operationLocation" label="Local de Operação" placeholder="Digite o local de operação" />
    </div>
    <template #footer>
      <ion-grid>
        <ion-row class="ion-justify-content-between">
          <ion-col>
            <ion-button expand="block" color="danger">
              Cancelar
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button expand="block" color="primary" @click="registerSchool">
              Salvar
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
    <ion-toast />
  </content-layout>
</template>
