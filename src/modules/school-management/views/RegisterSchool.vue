<script setup lang="ts">
import type { MaskitoElement } from '@maskito/core'
import type { School, SchoolSettings } from '@prisma/client'
import type SchoolForm from '../../school-management/components/SchoolForm.vue'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonInput, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonSelect, IonSelectOption } from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'
import { apps, schoolSharp } from 'ionicons/icons'

import { defineRule, ErrorMessage, Field, Form } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Define validation rules
defineRule('required', (value) => {
  return value ? true : 'Este campo é obrigatório.'
})

defineRule('email', (value) => {
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
  return emailRegex.test(value) || 'E-mail inválido.'
})

defineRule('cnpj', (value) => {
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
  return cnpjRegex.test(value) || 'CNPJ inválido.'
})

defineRule('postalCode', (value) => {
  const postalCodeRegex = /^\d{5}-\d{3}$/
  return postalCodeRegex.test(value) || 'CEP inválido.'
})

defineRule('min', (value, [min]) => {
  return value.length >= min || `O campo deve ter pelo menos ${min} caracteres.`
})

defineRule('max', (value, [max]) => {
  return value.length <= max || `O campo deve ter no máximo ${max} caracteres.`
})

const schoolFormRef = ref<InstanceType<typeof SchoolForm> | null>(null)
const router = useRouter()
const school = ref<School>({
  id: '',
  name: '',
  idpes: null,
  cnpj: null,
  address: null,
  city: null,
  state: null,
  postalCode: null,
  phone: null,
  institutionId: '',
  active: null,
  abbreviation: null,
  longitude: null,
  latitude: null,
  totalArea: null,
  builtArea: null,
  availableArea: null,
  acronym: null,
  blockDiaryEntries: null,
  operationalStatus: null,
  administrativeDependency: null,
  regulation: null,
  logoUrl: null,
  access: null,
  managerid: null,
  managerPosition: null,
  operationLocation: null,
  condition: null,
  sharedSchooLinePCode: null,
  creationDecree: null,
  numberOfFloors: null,
  floorType: null,
  energyMeter: null,
  hasExternalArea: null,
  metadata: null,
  createdAt: null,
  deletedAt: null,
  updatedAt: null,
  updatedBy: null,
  tenantId: null,
  userCreated: null,
})
const schoolSettings = ref<SchoolSettings>({
  id: '',
  createdAt: new Date(),
  dateOpening: null,
  dateClosing: null,
  schoolDays: null,
  dateStart: null,
  dateEnd: null,
  institutionId: '',
  schoolId: '',
  updatedAt: null,
  updatedBy: null,
  tenantId: null,
  userCreated: null,
  deletedAt: null,
})

const formValues = ref({
  inepCode: '',
  schoolName: '',
  corporateName: '',
  cnpj: '',
  educationNetwork: '',
  phone1: '',
  phone2: '',
  email: '',
  website: '',
  acronym: '',
  operationalStatus: '',
  administrativeDependence: '',
  postalCode: '',
  address: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  district: '',
  operatingLocation: '',
  buildingUsage: '',
  sharedSchool: false,
  sharedSchoolINEPCode: '',
  potableWaterAvailable: false,
  electricityAvailable: false,
  sewageAvailable: false,
  wasteDisposal: '',
  wasteTreatmentBySchool: false,
  foodServiceAvailable: false,
  communitySharedSpaces: false,
  usesSurroundingSpaces: false,
  specificFacilities: false,
  internetAvailable: false,
  connectionType: '',
  availableDesktops: 0,
  availableLaptops: 0,
  availableTablets: 0,
  // Add other fields as needed...
})

// Máscara para CNPJ
const cnpjOptions = {
  mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],

  elementPredicate: (el: HTMLElement): Promise<MaskitoElement> => {
    return new Promise((resolve) => {
      requestAnimationFrame(async () => {
        // eslint-disable-next-line no-undef
        const input = await (el as HTMLIonInputElement).getInputElement()
        resolve(input as MaskitoElement)
      })
    })
  },
}

// Máscara para Telefone
const phoneOptions = {
  mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  elementPredicate: (el: HTMLElement): Promise<MaskitoElement> => {
    return new Promise((resolve) => {
      requestAnimationFrame(async () => {
        // eslint-disable-next-line no-undef
        const input = await (el as HTMLIonInputElement).getInputElement()
        resolve(input as MaskitoElement)
      })
    })
  },
}

// Máscara para CEP
const postalCodeOptions = {
  mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],

  elementPredicate: (el: HTMLElement): Promise<MaskitoElement> => {
    return new Promise((resolve) => {
      requestAnimationFrame(async () => {
        // eslint-disable-next-line no-undef
        const input = await (el as HTMLIonInputElement).getInputElement()
        resolve(input as MaskitoElement)
      })
    })
  },
}

function handleSubmit(values: typeof formValues.value) {
  console.log('Form submitted:', values)
}

function handleCancel() {
  router.push({ name: 'InstitutionListInstitutions' })
}

function handleSave() {
  schoolFormRef.value?.registerSchool()
}
</script>

<template>
  <Form @submit="handleSubmit">
    <IonSegment
      mode="ios" :scrollable="false"
      style="margin: 20px 0 0 0; padding: 3px 0 3px 0; font-size: 10px;" :style="{}"
    >
      <IonSegmentButton value="general" content-id="general">
        <ion-label>Dados Gerais</ion-label>
      </IonSegmentButton>
      <IonSegmentButton value="complementary" content-id="complementary">
        <ion-label>Informações Complementares</ion-label>
      </IonSegmentButton>
    </IonSegment>

    <div class="ion-margin style-purple-lane" style="display: flex; align-items: center;">
      <IonIcon :icon="schoolSharp" style="margin-right: 10px;" />
      Nova escola
    </div>

    <IonSegmentView>
      <IonSegmentContent id="general">
        <!-- <IonCard> -->
        <!-- <IonCardHeader
        id="accordionContentHeader" class="ion-no-padding" style="padding: 8px;"
        :translucent="true"
      >
        <div style="display: flex; align-items: center; height: 15px;">
          <IonIcon :icon="schoolSharp" style="margin-right: 10px;" />
          Unidades Temáticas
        </div>
      </IonCardHeader> -->
        <!-- <IonCardContent> -->
        <Field v-slot="{ field, errors }" name="inepCode" rules="required">
          <IonInput v-bind="field" label="Código INEP" label-placement="stacked" fill="outline" placeholder="Digite o código INEP" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="schoolName" rules="required">
          <IonInput v-bind="field" label="Nome da Escola" label-placement="stacked" fill="outline" placeholder="Digite o nome da escola" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="corporateName" rules="required">
          <IonInput v-bind="field" label="Razão Social" label-placement="stacked" fill="outline" placeholder="Digite a razão social" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="cnpj" rules="required|cnpj">
          <IonInput v-maskito="cnpjOptions" v-bind="field" label="CNPJ" label-placement="stacked" fill="outline" placeholder="Digite o CNPJ" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="educationNetwork" rules="required">
          <IonSelect v-bind="field" label="Rede de Ensino" label-placement="stacked" fill="outline" placeholder="Selecione a rede de ensino">
            <IonSelectOption value="Pública">
              Pública
            </IonSelectOption>
            <IonSelectOption value="Privada">
              Privada
            </IonSelectOption>
          </IonSelect>
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="phone1" rules="required">
          <IonInput v-maskito="phoneOptions" v-bind="field" label="Telefone 1" label-placement="stacked" fill="outline" placeholder="Digite o telefone 1" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="email" rules="email">
          <IonInput v-bind="field" label="E-mail" label-placement="stacked" fill="outline" placeholder="Digite o e-mail" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="postalCode" rules="required|postalCode">
          <IonInput v-maskito="postalCodeOptions" v-bind="field" label="CEP" label-placement="stacked" fill="outline" placeholder="Digite o CEP" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="address" rules="required">
          <IonInput v-bind="field" label="Endereço" label-placement="stacked" fill="outline" placeholder="Digite o endereço" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="operatingLocation" rules="required">
          <IonSelect v-bind="field" label="Local de Funcionamento" label-placement="stacked" fill="outline" placeholder="Selecione o local de funcionamento">
            <IonSelectOption value="Própria">
              Própria
            </IonSelectOption>
            <IonSelectOption value="Alugada">
              Alugada
            </IonSelectOption>
          </IonSelect>
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <!-- Add other fields similarly -->
      <!-- </IonCardContent>
    </IonCard> -->
      </IonSegmentContent>

      <IonSegmentContent id="complementary">
        <Field v-slot="{ field, errors }" name="inepCode" rules="required">
          <IonInput v-bind="field" label="Código INEP" label-placement="stacked" fill="outline" placeholder="Digite o código INEP" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="schoolName" rules="required">
          <IonInput v-bind="field" label="Nome da Escola" label-placement="stacked" fill="outline" placeholder="Digite o nome da escola" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="corporateName" rules="required">
          <IonInput v-bind="field" label="Razão Social" label-placement="stacked" fill="outline" placeholder="Digite a razão social" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="cnpj" rules="required|cnpj">
          <IonInput v-maskito="cnpjOptions" v-bind="field" label="CNPJ" label-placement="stacked" fill="outline" placeholder="Digite o CNPJ" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="educationNetwork" rules="required">
          <IonSelect v-bind="field" label="Rede de Ensino" label-placement="stacked" fill="outline" placeholder="Selecione a rede de ensino">
            <IonSelectOption value="Pública">
              Pública
            </IonSelectOption>
            <IonSelectOption value="Privada">
              Privada
            </IonSelectOption>
          </IonSelect>
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="phone1" rules="required">
          <IonInput v-maskito="phoneOptions" v-bind="field" label="Telefone 1" label-placement="stacked" fill="outline" placeholder="Digite o telefone 1" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="email" rules="email">
          <IonInput v-bind="field" label="E-mail" label-placement="stacked" fill="outline" placeholder="Digite o e-mail" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="postalCode" rules="required|postalCode">
          <IonInput v-maskito="postalCodeOptions" v-bind="field" label="CEP" label-placement="stacked" fill="outline" placeholder="Digite o CEP" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="address" rules="required">
          <IonInput v-bind="field" label="Endereço" label-placement="stacked" fill="outline" placeholder="Digite o endereço" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field v-slot="{ field, errors }" name="operatingLocation" rules="required">
          <IonSelect v-bind="field" label="Local de Funcionamento" label-placement="stacked" fill="outline" placeholder="Selecione o local de funcionamento">
            <IonSelectOption value="Própria">
              Própria
            </IonSelectOption>
            <IonSelectOption value="Alugada">
              Alugada
            </IonSelectOption>
          </IonSelect>
          <span class="error-message">{{ errors[0] }}</span>
        </Field>
      </IonSegmentContent>
    </IonSegmentView>

    <IonButton type="submit" expand="block" color="primary">
      Salvar
    </IonButton>
  </Form>
</template>

<style scoped>
.error-message {
  color: red;
  font-size: 0.9em;
}

.style-purple-lane {
  background: rgba(var(--ion-color-secondary-rgb), 0.15);
  color: var(--ion-color-secondary);
  padding: 2px 2px 2px 2px;
  margin: 8px 2px 8px 2px;
}

ion-segment-content#general ion-input, ion-select {
  margin: 10px 0px 12px 0px;
  color: var(--ion-color-secondary);
}

ion-segment-content#complementary ion-input {
  margin: 10px 0px 12px 0px;
}
</style>
