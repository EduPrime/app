<script setup lang="ts">
import type { MaskitoElement } from '@maskito/core'
import type { School, SchoolSettings } from '@prisma/client'
import type { SubmissionHandler } from 'vee-validate'
import type SchoolForm from '../../school-management/components/SchoolForm.vue'
import { IonAccordion, IonAccordionGroup, IonButton, IonCol, IonFooter, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonSelect, IonSelectOption, IonToolbar } from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'
import { apps, schoolSharp } from 'ionicons/icons'
// eslint-disable-next-line no-duplicate-imports
import { Field, Form } from 'vee-validate'

import { ref, watch } from 'vue'

import { useRouter } from 'vue-router'

// function handleCancel() {
//   router.push({ name: 'InstitutionListInstitutions' })
// }

// function handleSave() {
//   schoolFormRef.value?.registerSchool()
// }

defineProps<{
  closeModal: (status: boolean) => void
}>()
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
  id: '',
  idpes: null,
  INEPCode: '',
  name: '',
  corporateName: '',
  cnpj: null,
  educationNetwork: null,
  phone1: '',
  phone2: '',
  acronym: '',
  blockJournalEntries: null,
  operationalStatus: null,
  usesAlternativeRules: null,
  administrativeDependency: null,
  address: '',
  addressNumber: '',
  additionalInfo: '',
  neighborhood: '',
  city: '',
  state: '',
  postalCode: '',
  unusualLocation: null,
  email: '',
  website: '',
  operatingLocation: null,
  buildingUsage: null,
  sharedSchool: null,
  sharedSchoolINEPCode: '',
  potableWaterAvailable: null,
  sewageAvailable: null,
  electricityAvailable: null,
  wasteDisposal: null,
  wasteTreatmentBySchool: null,
  foodServiceAvailable: null,
  communitySharedSpaces: null,
  usesSurroundingSpaces: null,
  specificFacilities: null,
  generalUseRooms: null,
  labsAndFunctionalAreas: null,
  supportFacilities: null,
  insideClassroooms: null,
  outsideClassrooms: null,
  refrigeratedClassrooms: null,
  accessibleClassrooms: null,
  internetAvailable: null,
  localNetworkAvailable: null,
  devicesUsedByStudents: null,
  teachingEquipments: null,
  connectionTypes: null,
  availabeDesktops: null,
  availableLaptops: null,
  availableTablets: null,
  administrativeStaffNumber: null,
  teachingStaffNumber: null,
  generalServicesStaffNumber: null,
  securityStaffNumber: null,
  schoolManagementStaffNumber: null,
  healthcareStaffNumber: null,
  socialAssistanceStaffNumber: null,
  specializedAssistance: null,
  elementaryEducationModel: null,
  wasPedagogicalProjectUpdated: null,
  indigenousEducationAvailable: null,
  linkedWithSuperiorEducation: null,
  collegiateBodies: null,
  studentSelectionCriteria: null,
  indigenousEducationLanguages: null,
  pedagogicalMaterials: null,
  headSchoolCode: '',
  IESCode: '',
  institutionId: '',
  active: true,
  abbreviation: '',
  longitude: '',
  latitude: '',
  totalArea: '',
  builtArea: '',
  availableArea: '',
  blockDiaryEntries: null,
  regulation: null,
  logoUrl: '',
  access: null,
  managerid: '',
  managerPosition: '',
  operationLocation: '',
  condition: null,
  sharedSchooLinePCode: null,
  creationDecree: '',
  numberOfFloors: null,
  floorType: null,
  energyMeter: null,
  hasExternalArea: null,
  metadata: null,
  createdAt: new Date(),
  deletedAt: null,
  updatedAt: null,
  updatedBy: '',
  tenantId: '',
  userCreated: '',
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

async function fetchAddressByPostalCode(postalCode: string) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${postalCode}/json/`)
    const data = await response.json()
    if (data.erro) {
      throw new Error('CEP não encontrado')
    }

    return data
  }
  catch (error) {
    console.error('Erro ao buscar o endereço:', error)
    return null
  }
}

// Observa mudanças no campo de CEP
watch(() => formValues.value.postalCode, async (newPostalCode) => {
  const cepCleaned = String(newPostalCode).replace(/\D/g, '')

  if (cepCleaned && cepCleaned.length === 8) {
    const endereco = await fetchAddressByPostalCode(cepCleaned)
    if (endereco) {
      formValues.value.address = endereco.logradouro
      formValues.value.neighborhood = endereco.bairro
      formValues.value.city = endereco.localidade
      formValues.value.state = endereco.uf
    }
  }
}, { deep: true })

const handleSubmit: SubmissionHandler<typeof formValues.value> = (values) => {
  console.log('Form submitted:', values)
}
</script>

<template>
  <IonPage>
    <ion-content class="ion-no-padding ion-no-margin">
      <Form class="ion-margin-horizontal" @submit="handleSubmit as SubmissionHandler">
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
              <IonInput v-model="formValues.INEPCode" v-bind="field" label="Código INEP" label-placement="stacked" fill="outline" placeholder="Digite o código INEP" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="schoolName" rules="required">
              <IonInput v-model="formValues.name" v-bind="field" label="Nome da Escola" label-placement="stacked" fill="outline" placeholder="Digite o nome oficial" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="corporateName" rules="required">
              <IonInput v-model="formValues.corporateName" v-bind="field" label="Razão Social" label-placement="stacked" fill="outline" placeholder="Digite o nome da empresa" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="cnpj" rules="required|cnpj">
              <IonInput v-model="formValues.cnpj" v-maskito="cnpjOptions" v-bind="field" label="CNPJ" label-placement="stacked" fill="outline" placeholder="nn.nnn.nnn/nnnn-nn" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="educationNetwork" rules="required">
              <IonSelect v-model="formValues.educationNetwork" v-bind="field" label="Rede de Ensino" label-placement="stacked" fill="outline" placeholder="Selecione a rede de ensino">
                <IonSelectOption value="Pública">
                  Pública
                </IonSelectOption>
                <IonSelectOption value="Privada">
                  Privada
                </IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <div class="title-identifier" style="display: flex; align-items: center;">
              Endereço
            </div>

            <Field v-slot="{ field, errors }" name="postalCode" rules="required|postalCode">
              <IonInput v-model="formValues.postalCode" v-maskito="postalCodeOptions" v-bind="field" label="CEP" label-placement="stacked" fill="outline" placeholder="nnnnn-nnn" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="state" rules="required">
              <IonSelect v-model="formValues.state" v-bind="field" label="Estado" label-placement="stacked" fill="outline" placeholder="Selecione o estado">
                <IonSelectOption value="AC">
                  Acre
                </IonSelectOption>
                <IonSelectOption value="AL">
                  Alagoas
                </IonSelectOption>
                <IonSelectOption value="AP">
                  Amapá
                </IonSelectOption>
                <IonSelectOption value="AM">
                  Amazonas
                </IonSelectOption>
                <IonSelectOption value="BA">
                  Bahia
                </IonSelectOption>
                <IonSelectOption value="CE">
                  Ceará
                </IonSelectOption>
                <IonSelectOption value="DF">
                  Distrito Federal
                </IonSelectOption>
                <IonSelectOption value="ES">
                  Espírito Santo
                </IonSelectOption>
                <IonSelectOption value="GO">
                  Goiás
                </IonSelectOption>
                <IonSelectOption value="MA">
                  Maranhão
                </IonSelectOption>
                <IonSelectOption value="MT">
                  Mato Grosso
                </IonSelectOption>
                <IonSelectOption value="MS">
                  Mato Grosso do Sul
                </IonSelectOption>
                <IonSelectOption value="MG">
                  Minas Gerais
                </IonSelectOption>
                <IonSelectOption value="PA">
                  Pará
                </IonSelectOption>
                <IonSelectOption value="PB">
                  Paraíba
                </IonSelectOption>
                <IonSelectOption value="PR">
                  Paraná
                </IonSelectOption>
                <IonSelectOption value="PE">
                  Pernambuco
                </IonSelectOption>
                <IonSelectOption value="PI">
                  Piauí
                </IonSelectOption>
                <IonSelectOption value="RJ">
                  Rio de Janeiro
                </IonSelectOption>
                <IonSelectOption value="RN">
                  Rio Grande do Norte
                </IonSelectOption>
                <IonSelectOption value="RS">
                  Rio Grande do Sul
                </IonSelectOption>
                <IonSelectOption value="RO">
                  Rondônia
                </IonSelectOption>
                <IonSelectOption value="RR">
                  Roraima
                </IonSelectOption>
                <IonSelectOption value="SC">
                  Santa Catarina
                </IonSelectOption>
                <IonSelectOption value="SP">
                  São Paulo
                </IonSelectOption>
                <IonSelectOption value="SE">
                  Sergipe
                </IonSelectOption>
                <IonSelectOption value="TO">
                  Tocantins
                </IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="address" rules="required">
              <IonInput v-model="formValues.address" v-bind="field" label="Endereço" label-placement="stacked" fill="outline" placeholder="Digite a rua/avenida" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="addressNumber" rules="required">
              <IonInput v-model="formValues.addressNumber" v-bind="field" label="Número" label-placement="stacked" fill="outline" placeholder="Digite o número" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="additionalInfo">
              <IonInput v-model="formValues.additionalInfo" v-bind="field" label="Complemento" label-placement="stacked" fill="outline" placeholder="Digite informações adicionais (opcional)" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="neighborhood" rules="required">
              <IonInput v-model="formValues.neighborhood" v-bind="field" label="Bairro" label-placement="stacked" fill="outline" placeholder="Digite o nome do bairro" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="city" rules="required">
              <IonInput v-model="formValues.city" v-bind="field" label="Município" label-placement="stacked" fill="outline" placeholder="Digite a cidade" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="unusualLocation" rules="required">
              <IonSelect v-model="formValues.unusualLocation" v-bind="field" label="Localização diferenciada da escola" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                <IonSelectOption value="Sim">
                  Sim
                </IonSelectOption>
                <IonSelectOption value="Não">
                  Não
                </IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <div class="title-identifier" style="display: flex; align-items: center;">
              Contato
            </div>

            <Field v-slot="{ field, errors }" name="phone1" rules="required">
              <IonInput v-model="formValues.phone1" v-maskito="phoneOptions" v-bind="field" label="Telefone 1" label-placement="stacked" fill="outline" placeholder="Digite o telefone 1" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="phone2">
              <IonInput v-model="formValues.phone2" v-maskito="phoneOptions" v-bind="field" label="Telefone 2" label-placement="stacked" fill="outline" placeholder="Digite o telefone 2" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="email" rules="email">
              <IonInput v-model="formValues.email" v-bind="field" label="E-mail" label-placement="stacked" fill="outline" placeholder="Digite o e-mail" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="website">
              <IonInput v-model="formValues.website" v-bind="field" label="Site" label-placement="stacked" fill="outline" placeholder="Digite o link do site" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="abbreviation">
              <IonInput v-model="formValues.abbreviation" v-bind="field" label="Sigla" label-placement="stacked" fill="outline" placeholder="Digite a sigla oficial" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <div class="title-identifier" style="display: flex; align-items: center;">
              Configurações Gerais
            </div>

            <Field v-slot="{ field, errors }" name="blockJournalEntries" rules="required">
              <IonSelect v-model="formValues.blockJournalEntries" v-bind="field" label="Bloquear lançamento no diário para anos letivos encerrados" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                <IonSelectOption value="Sim">
                  Sim
                </IonSelectOption>
                <IonSelectOption value="Não">
                  Não
                </IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="usesAlternativeRules" rules="required">
              <IonSelect v-model="formValues.usesAlternativeRules" v-bind="field" label="Utiliza regra alternativa de avaliação" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                <IonSelectOption value="Sim">
                  Sim
                </IonSelectOption>
                <IonSelectOption value="Não">
                  Não
                </IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="operationalStatus" rules="required">
              <IonSelect v-model="formValues.operationalStatus" v-bind="field" label="Situação de Funcionamento" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                <IonSelectOption value="Ativa">
                  Ativa
                </IonSelectOption>
                <IonSelectOption value="Inativa">
                  Inativa
                </IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="administrativeDependency" rules="required">
              <IonSelect v-model="formValues.administrativeDependency" v-bind="field" label="Dependência Administrativa" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                <IonSelectOption value="Federal">
                  Federal
                </IonSelectOption>
                <IonSelectOption value="Estadual">
                  Estadual
                </IonSelectOption>
                <IonSelectOption value="Municipal">
                  Municipal
                </IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>
          </IonSegmentContent>
          <IonSegmentContent id="complementary">
            <IonAccordionGroup>
              <IonAccordion value="infrastructure">
                <IonItem slot="header" class="accordion-header-color">
                  <IonLabel color="dark">
                    Infraestrutura
                  </IonLabel>
                </IonItem>

                <div slot="content" class="ion-padding">
                  <Field v-slot="{ field, errors }" name="operatingLocation">
                    <IonSelect v-model="formValues.operatingLocation" v-bind="field" label="Local de Funcionamento" label-placement="stacked" fill="outline" placeholder="Selecione o local de funcionamento">
                      <IonSelectOption value="Próprio">
                        Próprio
                      </IonSelectOption>
                      <IonSelectOption value="Alugado">
                        Alugado
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="buildingUsage">
                    <IonSelect v-model="formValues.buildingUsage" v-bind="field" label="Forma de Ocupação do Prédio" label-placement="stacked" fill="outline" placeholder="Selecione a forma de ocupação">
                      <IonSelectOption value="Exclusivo">
                        Exclusivo
                      </IonSelectOption>
                      <IonSelectOption value="Compartilhado">
                        Compartilhado
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="sharedSchool">
                    <IonSelect v-model="formValues.sharedSchool" v-bind="field" label="Escola Compartilhada?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
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
                    <IonInput v-model="formValues.sharedSchoolINEPCode" v-bind="field" label="Código INEP da escola compartilhada" label-placement="stacked" fill="outline" placeholder="Digite o código INEP" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="potableWaterAvailable">
                    <IonSelect v-model="formValues.potableWaterAvailable" v-bind="field" label="Água potável disponível" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Sim">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="Não">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="electricityAvailable">
                    <IonSelect v-model="formValues.electricityAvailable" v-bind="field" label="Fonte de energia elétrica" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Sim">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="Não">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="sewageAvailable">
                    <IonSelect v-model="formValues.sewageAvailable" v-bind="field" label="Esgotamento sanitário adequado" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Sim">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="Não">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="wasteDisposal">
                    <IonSelect v-model="formValues.wasteDisposal" v-bind="field" label="Destinação do lixo" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
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

                  <Field v-slot="{ field, errors }" name="wasteTreatmentBySchool">
                    <IonSelect v-model="formValues.wasteTreatmentBySchool" v-bind="field" label="Tratamento de resíduos realizado pela escola" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Sim">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="Não">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="foodServiceAvailable">
                    <IonSelect v-model="formValues.foodServiceAvailable" v-bind="field" label="Oferece alimentação escolar aos alunos?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Sim">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="Não">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="communitySharedSpaces">
                    <IonSelect v-model="formValues.communitySharedSpaces" v-bind="field" label="Compartilha espaços com a comunidade?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Sim">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="Não">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="usesSurroundingSpaces">
                    <IonSelect v-model="formValues.usesSurroundingSpaces" v-bind="field" label="Utiliza equipamentos do entorno escolar para atividades educacionais?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
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
                <IonItem slot="header" class="accordion-header-color">
                  <IonLabel color="dark">
                    Dependências
                  </IonLabel>
                </IonItem>
                <div slot="content" class="ion-padding">
                  <Field v-slot="{ field, errors }" name="specificFacilities">
                    <IonSelect v-model="formValues.specificFacilities" v-bind="field" label="A escola possui dependências específicas?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Sim">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="Não">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <!-- <Field v-slot="{ field, errors }" name="exportToCensus">
                  <IonSelect v-model="formValues.exportToCensus" v-bind="field" label="Exportar os dados para o Censo Escolar?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                    <IonSelectOption value="Sim">Sim</IonSelectOption>
                    <IonSelectOption value="Não">Não</IonSelectOption>
                  </IonSelect>
                  <span class="error-message">{{ errors[0] }}</span>
                  </Field> -->

                  <Field v-slot="{ field, errors }" name="generalUseRooms">
                    <IonSelect v-model="formValues.generalUseRooms" v-bind="field" label="Salas de Uso Geral" label-placement="stacked" fill="outline" multiple placeholder="Selecione as opções">
                      <IonSelectOption value="salasDeAula">
                        Salas de Aula
                      </IonSelectOption>
                      <IonSelectOption value="espacosComuns">
                        Espaços Comuns
                      </IonSelectOption>
                      <IonSelectOption value="auditorio">
                        Auditório
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="labsAndFunctionalAreas">
                    <IonSelect v-model="formValues.labsAndFunctionalAreas" v-bind="field" label="Laboratórios e Áreas Funcionais" label-placement="stacked" fill="outline" multiple placeholder="Selecione as opções">
                      <IonSelectOption value="informatica">
                        Informática
                      </IonSelectOption>
                      <IonSelectOption value="ciencias">
                        Ciências
                      </IonSelectOption>
                      <IonSelectOption value="multimidia">
                        Multimídia
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="supportFacilities">
                    <IonSelect v-model="formValues.supportFacilities" v-bind="field" label="Instalações de Apoio" label-placement="stacked" fill="outline" multiple placeholder="Selecione as opções">
                      <IonSelectOption value="banheiros">
                        Banheiros
                      </IonSelectOption>
                      <IonSelectOption value="areasExternas">
                        Áreas Externas
                      </IonSelectOption>
                      <IonSelectOption value="acessibilidade">
                        Acessibilidade
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="insideClassroooms">
                    <IonInput v-model="formValues.insideClassroooms" v-bind="field" label="Salas de Aula Dentro do Prédio" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="outsideClassrooms">
                    <IonInput v-model="formValues.outsideClassrooms" v-bind="field" label="Salas de Aula Fora do Prédio" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="refrigeratedClassrooms">
                    <IonInput v-model="formValues.refrigeratedClassrooms" v-bind="field" label="Salas de Aula Climatizadas" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="accessibleClassrooms">
                    <IonInput v-model="formValues.accessibleClassrooms" v-bind="field" label="Salas de Aula Adaptadas para Acessibilidade" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>
                </div>
              </IonAccordion>

              <IonAccordion value="equipments">
                <IonItem slot="header" class="accordion-header-color">
                  <IonLabel color="dark">
                    Equipamentos
                  </IonLabel>
                </IonItem>
                <div slot="content" class="ion-padding">
                  <Field v-slot="{ field, errors }" name="internetAvailable">
                    <IonSelect v-model="formValues.internetAvailable" v-bind="field" label="A escola tem internet?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Sim">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="Não">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="connectionTypes">
                    <IonSelect v-model="formValues.connectionTypes" v-bind="field" label="Tipos de Conexão Disponíveis" label-placement="stacked" fill="outline" multiple placeholder="Selecione as opções">
                      <IonSelectOption value="wifi">
                        Wi-Fi
                      </IonSelectOption>
                      <IonSelectOption value="cabo">
                        Cabo
                      </IonSelectOption>
                      <IonSelectOption value="fibra">
                        Fibra Óptica
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="localNetworkAvailable">
                    <IonSelect v-model="formValues.localNetworkAvailable" v-bind="field" label="Rede local disponível?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Sim">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="Não">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="devicesUsedByStudents">
                    <IonSelect v-model="formValues.devicesUsedByStudents" v-bind="field" label="Equipamentos acessados pelos alunos" label-placement="stacked" fill="outline" multiple placeholder="Selecione os dispositivos">
                      <IonSelectOption value="COMPUTER">
                        Computador
                      </IonSelectOption>
                      <IonSelectOption value="TABLET">
                        Tablet
                      </IonSelectOption>
                      <IonSelectOption value="SMARTPHONE">
                        Smartphone
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="availabeDesktops">
                    <IonInput v-model.number="formValues.availabeDesktops" v-bind="field" label="Computadores disponíveis (Desktop)" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="availableLaptops">
                    <IonInput v-model.number="formValues.availableLaptops" v-bind="field" label="Computadores disponíveis (Laptop)" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="availableTablets">
                    <IonInput v-model.number="formValues.availableTablets" v-bind="field" label="Tablets disponíveis" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="teachingEquipments">
                    <IonSelect v-model="formValues.teachingEquipments" v-bind="field" label="Equipamentos para ensino/aprendizagem" label-placement="stacked" fill="outline" multiple placeholder="Selecione os equipamentos">
                      <IonSelectOption value="PROJECTOR">
                        Projetor
                      </IonSelectOption>
                      <IonSelectOption value="DVD_BLU_RAY">
                        DVD/Blu-ray
                      </IonSelectOption>
                      <IonSelectOption value="MULTIMEDIA_TV">
                        TV multimídia
                      </IonSelectOption>
                      <IonSelectOption value="DIGITAL_WHITEBOARD">
                        Lousa digital
                      </IonSelectOption>
                      <IonSelectOption value="SOUND_SYSTEM">
                        Sistema de som
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>
                </div>
              </IonAccordion>

              <IonAccordion value="humanResources">
                <IonItem slot="header" class="accordion-header-color">
                  <IonLabel color="dark">
                    Recursos Humanos
                  </IonLabel>
                </IonItem>
                <div slot="content" class="ion-padding">
                  <Field v-slot="{ field, errors }" name="administrativeStaffNumber">
                    <IonInput v-model.number="formValues.administrativeStaffNumber" v-bind="field" label="Administração e suporte pedagógico" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="teachingStaffNumber">
                    <IonInput v-model.number="formValues.teachingStaffNumber" v-bind="field" label="Docentes e suporte direto ao ensino" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="generalServicesStaffNumber">
                    <IonInput v-model.number="formValues.generalServicesStaffNumber" v-bind="field" label="Serviços de apoio e segurança" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="healthcareStaffNumber">
                    <IonInput v-model.number="formValues.healthcareStaffNumber" v-bind="field" label="Saúde e nutrição" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="socialAssistanceStaffNumber">
                    <IonInput v-model.number="formValues.socialAssistanceStaffNumber" v-bind="field" label="Psicologia e assistência social" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="schoolManagementStaffNumber">
                    <IonInput v-model.number="formValues.schoolManagementStaffNumber" v-bind="field" label="Gestão escolar" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>
                </div>
              </IonAccordion>

              <IonAccordion value="teachingAndPedagogicalPractices">
                <IonItem slot="header" class="accordion-header-color">
                  <IonLabel color="dark">
                    Ensino e Práticas Pedagógicas
                  </IonLabel>
                </IonItem>
                <div slot="content" class="ion-padding">
                  <Field v-slot="{ field, errors }" name="specializedAssistance">
                    <IonSelect v-model="formValues.specializedAssistance" v-bind="field" label="Atendimento Educacional Especializado (AEE)" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Sim">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="Não">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="elementaryEducationModel">
                    <IonSelect v-model="formValues.elementaryEducationModel" v-bind="field" label="Modelo de Ensino Fundamental" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Ciclo">
                        Ciclos
                      </IonSelectOption>
                      <IonSelectOption value="Série">
                        Séries
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="pedagogicalMaterials">
                    <IonSelect v-model="formValues.pedagogicalMaterials" v-bind="field" label="Materiais pedagógicos utilizados" label-placement="stacked" fill="outline" multiple placeholder="Selecione os materiais">
                      <IonSelectOption value="MULTIMEDIA_ARCHIVE">
                        Arquivo multimídia
                      </IonSelectOption>
                      <IonSelectOption value="TOYS">
                        Brinquedos
                      </IonSelectOption>
                      <IonSelectOption value="EDUCATIONAL_GAMES">
                        Jogos educativos
                      </IonSelectOption>
                      <IonSelectOption value="SCIENTIFICAL_MATERIALS">
                        Materiais científicos
                      </IonSelectOption>
                      <IonSelectOption value="AUDIO_EQUIPMENT">
                        Equipamentos de áudio
                      </IonSelectOption>
                      <IonSelectOption value="MUSICAL_INSTRUMENTS">
                        Instrumentos musicais
                      </IonSelectOption>
                      <IonSelectOption value="ARTISTIC_MATERIALS">
                        Materiais culturais/artísticos
                      </IonSelectOption>
                      <IonSelectOption value="SPORT_MATERIALS">
                        Materiais esportivos
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="collegiateBodies">
                    <IonSelect v-model="formValues.collegiateBodies" v-bind="field" label="Órgãos colegiados em funcionamento" label-placement="stacked" fill="outline" multiple placeholder="Selecione os órgãos">
                      <IonSelectOption value="ASSOCIACAO_DE_PAIS">
                        Associação de Pais
                      </IonSelectOption>
                      <IonSelectOption value="ASSOCIACAO_DE_PAIS_E_MESTRES">
                        Associação de Pais e Mestres
                      </IonSelectOption>
                      <IonSelectOption value="GREMIO_ESTUDANTIL">
                        Grêmio Estudantil
                      </IonSelectOption>
                      <IonSelectOption value="CONSELHO_ESCOLAR">
                        Conselho Escolar
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="studentSelectionCriteria">
                    <IonSelect v-model="formValues.studentSelectionCriteria" v-bind="field" label="Critérios de seleção para alunos" label-placement="stacked" fill="outline" multiple placeholder="Selecione os critérios">
                      <IonSelectOption value="ANALISE_CURRICULAR">
                        Análise curricular
                      </IonSelectOption>
                      <IonSelectOption value="EXAME_DE_SELECAO">
                        Exame de seleção
                      </IonSelectOption>
                      <IonSelectOption value="COTAS">
                        Cotas
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="wasPedagogicalProjectUpdated">
                    <IonSelect v-model="formValues.wasPedagogicalProjectUpdated" v-bind="field" label="Projeto Político-Pedagógico atualizado nos últimos 12 meses?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Sim">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="Não">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="indigenousEducationAvailable">
                    <IonSelect v-model="formValues.indigenousEducationAvailable" v-bind="field" label="Educação Escolar Indígena disponível?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Sim">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="Não">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="indigenousEducationLanguages">
                    <IonSelect v-model="formValues.indigenousEducationLanguages" v-bind="field" label="Língua de ensino" label-placement="stacked" fill="outline" multiple placeholder="Selecione as línguas">
                      <IonSelectOption value="PORTUGUES">
                        Português
                      </IonSelectOption>
                      <IonSelectOption value="TIKUNA">
                        Ticuna
                      </IonSelectOption>
                      <IonSelectOption value="GUARANI_KAIOWA">
                        Guarani Kaiowá
                      </IonSelectOption>
                      <IonSelectOption value="KAINGANG">
                        Kaingang
                      </IonSelectOption>
                      <IonSelectOption value="XAVANTE">
                        Xavante
                      </IonSelectOption>
                      <IonSelectOption value="YANOMAMI">
                        Yanomami
                      </IonSelectOption>
                      <IonSelectOption value="OUTRO">
                        Outro
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="linkedWithSuperiorEducation">
                    <IonSelect v-model="formValues.linkedWithSuperiorEducation" v-bind="field" label="Vínculo com unidades de ensino superior" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Sim">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="Não">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="headSchoolCode">
                    <IonInput v-model="formValues.headSchoolCode" v-bind="field" label="Código da escola sede" label-placement="stacked" fill="outline" placeholder="Digite o código" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="IESCode">
                    <IonInput v-model="formValues.IESCode" v-bind="field" label="Código da Instituição de Ensino Superior" label-placement="stacked" fill="outline" placeholder="Digite o código" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>
                </div>
              </IonAccordion>
            </IonAccordionGroup>
          </IonSegmentContent>
        </IonSegmentView>
      </Form>
    </ion-content>
    <div>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonButton :disabled="false" color="danger" expand="full" @click="closeModal(false)">
              Cancelar
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton :disabled="false" color="secondary" expand="full" @click="">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  </IonPage>
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

.title-identifier {
  background: rgba(var(--ion-color-secondary-rgb), 0.15);
  color: var(--ion-color-secondary);
  padding: 1px 0px 0px 5px;
  margin: 10px 2px 12px 2px;
}

ion-segment-content#general ion-input, ion-select {
  margin: 10px 0px 12px 0px;
  color: var(--ion-color-secondary);
}

ion-segment-content#complementary ion-input, ion-select {
  margin: 10px 0px 12px 0px;
  color: var(--ion-color-secondary);
}

.accordion-header-color {
  /* --background: var(--ion-color-secondary-tint); */
  --background: rgba(var(--ion-color-primary-rgb), 0.2);
  /* font-weight: bold; */
  padding: 0px;
  border-radius: 0px;
}
</style>
