<script setup lang="ts">
import type { MaskitoElement } from '@maskito/core'
import type { School, SchoolSettings } from '@prisma/client'
import type { SubmissionHandler } from 'vee-validate'
import type SchoolForm from '../../school-management/components/SchoolForm.vue'
import { IonAccordion, IonAccordionGroup, IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonSelect, IonSelectOption } from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'
import { apps, schoolSharp } from 'ionicons/icons'
// eslint-disable-next-line no-duplicate-imports
import { defineRule, Field, Form } from 'vee-validate'

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

const handleSubmit: SubmissionHandler<typeof formValues.value> = (values) => {
  console.log('Form submitted:', values)
}

// function handleCancel() {
//   router.push({ name: 'InstitutionListInstitutions' })
// }

// function handleSave() {
//   schoolFormRef.value?.registerSchool()
// }
</script>

<template>
  <Form @submit="handleSubmit as SubmissionHandler">
    <IonSegment
      mode="ios" :scrollable="false"
      style="margin: 20px 0 0 0; padding: 3px 0 3px 0; font-size: 10px;" :style="{}"
    >
      <IonSegmentButton value="general" content-id="general">
        <IonLabel>Dados Gerais</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="complementary" content-id="complementary">
        <IonLabel>Informações Complementares</IonLabel>
      </IonSegmentButton>
    </IonSegment>

    <div class="ion-margin style-purple-lane" style="display: flex; align-items: center;">
      <IonIcon :icon="schoolSharp" style="margin-right: 10px;" />
      Nova escola
    </div>

    <IonSegmentView>
      <IonSegmentContent id="general">
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
        <IonAccordionGroup>
          <IonAccordion value="infrastructure">
            <IonItem slot="header" color="light">
              <IonLabel>Infraestrutura</IonLabel>
            </IonItem>
            <div slot="content" class="ion-padding">
              <Field v-slot="{ field, errors }" name="operatingLocation" rules="required">
                <IonSelect v-bind="field" label="Local de Funcionamento" label-placement="stacked" fill="outline" placeholder="Selecione o local de funcionamento">
                  <IonSelectOption value="Próprio">
                    Próprio
                  </IonSelectOption>
                  <IonSelectOption value="Alugado">
                    Alugado
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field v-slot="{ field, errors }" name="buildingUsage" rules="required">
                <IonSelect v-bind="field" label="Forma de Ocupação do Prédio" label-placement="stacked" fill="outline" placeholder="Selecione a forma de ocupação">
                  <IonSelectOption value="Exclusivo">
                    Exclusivo
                  </IonSelectOption>
                  <IonSelectOption value="Compartilhado">
                    Compartilhado
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field v-slot="{ field, errors }" name="sharedSchool" rules="required">
                <IonSelect v-bind="field" label="Escola Compartilhada?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">
                    Sim
                  </IonSelectOption>
                  <IonSelectOption value="Não">
                    Não
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field v-slot="{ field, errors }" name="sharedSchoolINEPCode">
                <IonInput v-bind="field" label="Código INEP da escola compartilhada" label-placement="stacked" fill="outline" placeholder="Digite o código INEP" />
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field v-slot="{ field, errors }" name="potableWaterAvailable" rules="required">
                <IonSelect v-bind="field" label="Água potável disponível" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">
                    Sim
                  </IonSelectOption>
                  <IonSelectOption value="Não">
                    Não
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field v-slot="{ field, errors }" name="electricityAvailable" rules="required">
                <IonSelect v-bind="field" label="Fonte de energia elétrica" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">
                    Sim
                  </IonSelectOption>
                  <IonSelectOption value="Não">
                    Não
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field v-slot="{ field, errors }" name="sewageAvailable" rules="required">
                <IonSelect v-bind="field" label="Esgotamento sanitário adequado" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">
                    Sim
                  </IonSelectOption>
                  <IonSelectOption value="Não">
                    Não
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field v-slot="{ field, errors }" name="wasteDisposal" rules="required">
                <IonSelect v-bind="field" label="Destinação do lixo" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Coleta Regular">
                    Coleta Regular
                  </IonSelectOption>
                  <IonSelectOption value="Reciclagem">
                    Reciclagem
                  </IonSelectOption>
                  <IonSelectOption value="Outro">
                    Outro
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field v-slot="{ field, errors }" name="wasteTreatmentBySchool" rules="required">
                <IonSelect v-bind="field" label="Tratamento de resíduos realizado pela escola" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">
                    Sim
                  </IonSelectOption>
                  <IonSelectOption value="Não">
                    Não
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field v-slot="{ field, errors }" name="foodServiceAvailable" rules="required">
                <IonSelect v-bind="field" label="Oferece alimentação escolar aos alunos?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">
                    Sim
                  </IonSelectOption>
                  <IonSelectOption value="Não">
                    Não
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field v-slot="{ field, errors }" name="communitySharedSpaces" rules="required">
                <IonSelect v-bind="field" label="Compartilha espaços com a comunidade?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">
                    Sim
                  </IonSelectOption>
                  <IonSelectOption value="Não">
                    Não
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field v-slot="{ field, errors }" name="usesSurroundingSpaces" rules="required">
                <IonSelect v-bind="field" label="Utiliza equipamentos do entorno escolar para atividades educacionais?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">
                    Sim
                  </IonSelectOption>
                  <IonSelectOption value="Não">
                    Não
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>
            </div>
          </IonAccordion>

          <IonAccordion value="facilities">
            <IonItem slot="header" color="light">
              <IonLabel>Dependências</IonLabel>
            </IonItem>
            <div slot="content" class="ion-padding">
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
                <IonInput v-bind="field" label="CNPJ" label-placement="stacked" fill="outline" placeholder="Digite o CNPJ" />
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
                <IonInput v-bind="field" label="Telefone 1" label-placement="stacked" fill="outline" placeholder="Digite o telefone 1" />
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field v-slot="{ field, errors }" name="email" rules="email">
                <IonInput v-bind="field" label="E-mail" label-placement="stacked" fill="outline" placeholder="Digite o e-mail" />
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field v-slot="{ field, errors }" name="postalCode" rules="required|postalCode">
                <IonInput v-bind="field" label="CEP" label-placement="stacked" fill="outline" placeholder="Digite o CEP" />
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
            </div>
          </IonAccordion>

          <IonAccordion value="equipments">
            <IonItem slot="header" color="light">
              <IonLabel>Equipamentos</IonLabel>
            </IonItem>
          </IonAccordion>
          <div slot="content" class="ion-padding" />

          <IonAccordion value="humanResources">
            <IonItem slot="header" color="light">
              <IonLabel>Recursos Humanos</IonLabel>
            </IonItem>
          </IonAccordion>
          <div slot="content" class="ion-padding" />

          <IonAccordion value="teachingAndPedagogicalPractices">
            <IonItem slot="header" color="light">
              <IonLabel>Ensino e Práticas Pedagógicas</IonLabel>
            </IonItem>
          </IonAccordion>
          <div slot="content" class="ion-padding" />
        </IonAccordionGroup>
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

ion-segment-content#complementary ion-input, ion-select {
  margin: 10px 0px 12px 0px;
  color: var(--ion-color-secondary);
}
</style>
