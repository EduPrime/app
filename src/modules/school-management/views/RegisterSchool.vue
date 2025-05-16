<script setup lang="ts">
import type { MaskitoElement } from '@maskito/core'
import type { SubmissionHandler } from 'vee-validate'
import { IonAccordion, IonAccordionGroup, IonButton, IonToolbar, IonGrid, IonCol, IonRow, IonIcon, IonInput, IonItem, IonLabel, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonSelect, IonSelectOption, IonPage, IonFooter } from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'
import { schoolSharp } from 'ionicons/icons'
import { SchoolFormValues, Institutions } from '../types/types'
import showToast from '@/utils/toast-alert'
import SchoolRegistrationService from '../services/SchoolRegistrationService'
import InstitutionService from '../services/InstitutionService'
import { ref, watch, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// eslint-disable-next-line no-duplicate-imports
import { Field, Form } from 'vee-validate'

const schoolService = new SchoolRegistrationService()
const institutionService = new InstitutionService()

const router = useRouter()
const formRef = ref<any>(null)
let institutions = ref<Institutions[]>({} as Institutions[])

const formValues = ref<SchoolFormValues>({
  id: undefined,
  idpes: null,
  INEPCode: '12343',
  name: 'Escola Primeiro de Maio',
  corporateName: 'Sociedade Educacional Primeiro de Maio',
  cnpj: '73819874000149',
  educationNetwork: 'false',
  phone: '(91) 98010-1212',
  phone2: '(92) 99010-1212',
  email: 'contato@primeirodemaio.com',
  website: 'www.escolaprimeirodemaio.com.br',
  abbreviation: 'EPM',
  blockJournalEntries: 'false',
  operationalStatus: 'true',
  usesAlternativeRules: 'true',
  administrativeDependency: 'Privada',
  address: 'Rua Primeiro de Maio',
  addressNumber: '105',
  additionalInfo: 'Esquina da rua',
  neighborhood: 'Sacramenta',
  city: 'Belém',
  state: 'PA',
  postalCode: '66123200',
  unusualLocation: "false",
  acronym: '',
  operatingLocation: 'Própria',
  buildingUsage: 'Exclusiva',
  sharedSchool: 'true',
  sharedSchoolINEPCode: '54321',
  potableWaterAvailable: 'true',
  electricityAvailable: 'true',
  sewageAvailable: 'true',
  wasteDisposal: 'Aterro',
  wasteTreatmentBySchool: 'false',
  foodServiceAvailable: 'true',
  communitySharedSpaces: 'false',
  usesSurroundingSpaces: 'true',
  specificFacilities: 'true',
  generalUseRooms: ['Sala de aula', 'Espaços comuns'],
  labsAndFunctionalAreas: ['Informática', 'Ciências', 'Multimídia'],
  supportFacilities: ['Banheiros', 'Acessibilidade'],
  insideClassrooms: 1,
  outsideClassrooms: 2,
  refrigeratedClassrooms: 2,
  accessibleClassrooms: 2,
  internetAvailable: 'true',
  localNetworkAvailable: 'true',
  devicesUsedByStudents: ['Smartphone'],
  connectionType: ['Fibra ótica'],
  availableDesktops: 3,
  availableLaptops: 3,
  availableTablets: 0,
  teachingEquipments: ['DVD/Blu-ray', 'TV multimídia'],
  administrativeStaffNumber: 10,
  teachingStaffNumber: 10,
  generalServicesStaffNumber: 10,
  securityStaffNumber: 10,
  healthcareStaffNumber: 1,
  socialAssistanceStaffNumber: 1,
  schoolManagementStaffNumber: 1,
  specializedAssistance: 'true',
  elementaryEducationModel: 'Série',
  wasPedagogicalProjectUpdated: 'true',
  indigenousEducationAvailable: 'true',
  linkedWithSuperiorEducation: 'true',
  collegiateBodies: ['Associação de Pais', 'Grêmio Estudantil'],
  studentSelectionCriteria: ['Análise curricular'],
  indigenousEducationLanguages: ['Português', 'Ticuna'],
  pedagogicalMaterials: ['Arquivo multimídia', 'Brinquedos'],
  headSchoolCode: 12345657,
  IESCode: 123456,
  institutionId: null,
  // active: null,
  // longitude: '',
  // latitude: '',
  // totalArea: '',
  // builtArea: '',
  // availableArea: '',
  // blockDiaryEntries: null,
  // regulation: null,
  // logoUrl: '',
  // access: null,
  // managerid: '',
  // managerPosition: '',
  // operationLocation: '',
  // condition: null,
  // sharedSchooLinePCode: null,
  // creationDecree: '',
  // numberOfFloors: null,
  // floorType: null,
  // energyMeter: null,
  // hasExternalArea: null,
  // metadata: null,
  // createdAt: new Date(),
  // deletedAt: null,
  // updatedAt: null,
  updatedBy: localStorage.getItem('userLocal') ? JSON.parse(localStorage.getItem('userLocal')!).id : '',
  tenantId: '',
  userCreated: '',
})
// const ORIGINALformValues = ref<SchoolFormValues>({
//   id: '',
//   idpes: null,
//   INEPCode: '12343',
//   name: 'Escola Primeiro de Maio',
//   corporateName: 'Sociedade Educacional Primeiro de Maio',
//   cnpj: '73.819.874/0001-49',
//   educationNetwork: 'false',
//   phone: '(91) 98010-1212',
//   phone2: '(92) 99010-1212',
//   email: 'contato@primeirodemaio.com',
//   website: 'www.escolaprimeirodemaio.com.br',
//   abbreviation: 'EPM',
//   blockJournalEntries: 'false',
//   operationalStatus: 'true',
//   usesAlternativeRules: 'true',
//   administrativeDependency: 'Privada',
//   address: 'Rua Primeiro de Maio',
//   addressNumber: '105',
//   additionalInfo: 'Esquina da rua',
//   neighborhood: 'Sacramenta',
//   city: 'Belém',
//   state: 'PA',
//   postalCode: '66123200',
//   unusualLocation: "false",
//   acronym: '',
//   operatingLocation: 'Própria',
//   buildingUsage: 'Exclusiva',
//   sharedSchool: 'true',
//   sharedSchoolINEPCode: '54321',
//   potableWaterAvailable: 'true',
//   electricityAvailable: 'true',
//   sewageAvailable: 'true',
//   wasteDisposal: 'Aterro',
//   wasteTreatmentBySchool: 'false',
//   foodServiceAvailable: 'true',
//   communitySharedSpaces: 'false',
//   usesSurroundingSpaces: 'true',
//   specificFacilities: 'true',
//   generalUseRooms: ['Sala de aula', 'Espaços comuns'],
//   labsAndFunctionalAreas: ['Informática', 'Ciências', 'Multimídia'],
//   supportFacilities: ['Banheiros', 'Accessibilidade'],
//   insideClassrooms: 1,
//   outsideClassrooms: 2,
//   refrigeratedClassrooms: 2,
//   accessibleClassrooms: 2,
//   internetAvailable: 'true',
//   localNetworkAvailable: 'true',
//   devicesUsedByStudents: ['Smartphone'],
//   connectionType: ['Fibra ótica'],
//   availableDesktops: 3,
//   availableLaptops: 3,
//   availableTablets: 0,
//   teachingEquipments: ['DVD/Blu-ray', 'TV multimídia'],
//   administrativeStaffNumber: 10,
//   teachingStaffNumber: 10,
//   generalServicesStaffNumber: 10,
//   securityStaffNumber: 10,
//   healthcareStaffNumber: 1,
//   socialAssistanceStaffNumber: 1,
//   schoolManagementStaffNumber: 1,
//   specializedAssistance: 'true',
//   elementaryEducationModel: ['Série'],
//   wasPedagogicalProjectUpdated: 'true',
//   indigenousEducationAvailable: 'true',
//   linkedWithSuperiorEducation: 'true',
//   collegiateBodies: ['Associação de Pais', 'Grêmio Estudantil'],
//   studentSelectionCriteria: ['Análise curricular'],
//   indigenousEducationLanguages: ['Português', 'Ticuna'],
//   pedagogicalMaterials: ['Arquivo', 'multimídia', 'Brinquedos'],
//   headSchoolCode: 12345657,
//   IESCode: 123456,
//   institutionId: null,
//   active: null,
//   longitude: '',
//   latitude: '',
//   totalArea: '',
//   builtArea: '',
//   availableArea: '',
//   blockDiaryEntries: null,
//   regulation: null,
//   logoUrl: '',
//   access: null,
//   managerid: '',
//   managerPosition: '',
//   operationLocation: '',
//   condition: null,
//   sharedSchooLinePCode: null,
//   creationDecree: '',
//   numberOfFloors: null,
//   floorType: null,
//   energyMeter: null,
//   hasExternalArea: null,
//   metadata: null,
//   // createdAt: new Date(),
//   // deletedAt: null,
//   // updatedAt: null,
//   updatedBy: localStorage.getItem('userLocal') ? JSON.parse(localStorage.getItem('userLocal')!).id : '',
//   tenantId: '',
//   userCreated: '',
// })

defineProps<{
  closeModal: (status: boolean) => void;
}>()

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

async function presetFirstInstitutionOnIonSelect() {
  // Carregar instituições e preencher o input de instituição(IonSelect) com o primeiro elemento da consulta
  const result = await institutionService.getInstitutions()
  institutions.value = result ?? []
  formValues.value.institutionId = institutions.value.length > 0 ? institutions.value[0]?.id : ''
}

async function saveSchool() {
  try {
    // const savedSchool = await schoolService.upsertSchoolRegistration(formValues.value)
    const savedSchool = await schoolService.upsertUPDATINGSchoolRegistration(formValues.value)
    console.log('Escola salva com sucesso:', savedSchool)
    // closeModal(false)
  } catch (error) {
    console.error('Erro ao salvar a escola:', error)
  }
}

const handleSubmit: SubmissionHandler<typeof formValues.value> = async (values) => {
  if (formRef.value) {
    const result = await formRef.value.validate()
    if (result.valid) {
      saveSchool()
    } else {
      showToast('Verifique os campos obrigatórios', 'top', 'danger')
    }
  } else {
    showToast('Verifique os campos obrigatórios', 'top', 'danger')
  }
}

function submitFormExternally() {
  nextTick(() => {
    // formRef.value.$el é o elemento HTML do formulário
    const formEl = formRef.value?.$el as HTMLFormElement | undefined
    if (formEl) {
      formEl.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }
  })
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

onMounted(async () => {
  presetFirstInstitutionOnIonSelect()
})
</script>

<template>
  <IonPage>
    <ion-content class="ion-no-padding ion-no-margin">
      <Form ref="formRef" class="ion-margin-horizontal" @submit="handleSubmit as SubmissionHandler">
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
            <Field v-slot="{ field, errors }" name="institutionId" rules="">
              <IonSelect
                v-model="formValues.institutionId"
                v-bind="field"
                label="Instituição"
                label-placement="stacked"
                fill="outline"
                placeholder="Selecione a instituição"
                disabled
              >
                <IonSelectOption
                  v-for="(institution, index) in institutions"
                  :key="index"
                  :value="institution.id"
                >
                  {{ institution.name }}
                </IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="inepCode" rules="">
              <IonInput v-model="formValues.INEPCode" v-bind="field" label="Código INEP" label-placement="stacked" fill="outline" placeholder="Digite o código INEP" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="schoolName" rules="">
              <IonInput v-model="formValues.name" v-bind="field" label="Nome da Escola" label-placement="stacked" fill="outline" placeholder="Digite o nome oficial" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="corporateName" rules="">
              <IonInput v-model="formValues.corporateName" v-bind="field" label="Razão Social" label-placement="stacked" fill="outline" placeholder="Digite o nome da empresa" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="cnpj" rules="">
              <IonInput v-model="formValues.cnpj" v-imask="{mask: '00.000.000/0000-00'}" v-bind="field" label="CNPJ" label-placement="stacked" fill="outline" placeholder="00.000.000/0000-00" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="educationNetwork" rules="">
              <IonSelect v-model="formValues.educationNetwork" v-bind="field" label="Rede de Ensino" label-placement="stacked" fill="outline" placeholder="Selecione a rede de ensino">
                <IonSelectOption value="true">Pública</IonSelectOption>
                <IonSelectOption value="false">Privada</IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <div class="title-identifier" style="display: flex; align-items: center;">
              Endereço
            </div>

            <Field v-slot="{ field, errors }" name="postalCode" rules="">
              <IonInput v-model="formValues.postalCode" v-imask="{ mask: '00000-000' }" v-bind="field" label="CEP" label-placement="stacked" fill="outline" placeholder="00000-000" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="state" rules="">
              <IonSelect v-model="formValues.state" v-bind="field" label="Estado" label-placement="stacked" fill="outline" placeholder="Selecione o estado">
                <IonSelectOption value="AC">Acre</IonSelectOption>
                <IonSelectOption value="AL">Alagoas</IonSelectOption>
                <IonSelectOption value="AP">Amapá</IonSelectOption>
                <IonSelectOption value="AM">Amazonas</IonSelectOption>
                <IonSelectOption value="BA">Bahia</IonSelectOption>
                <IonSelectOption value="CE">Ceará</IonSelectOption>
                <IonSelectOption value="DF">Distrito Federal</IonSelectOption>
                <IonSelectOption value="ES">Espírito Santo</IonSelectOption>
                <IonSelectOption value="GO">Goiás</IonSelectOption>
                <IonSelectOption value="MA">Maranhão</IonSelectOption>
                <IonSelectOption value="MT">Mato Grosso</IonSelectOption>
                <IonSelectOption value="MS">Mato Grosso do Sul</IonSelectOption>
                <IonSelectOption value="MG">Minas Gerais</IonSelectOption>
                <IonSelectOption value="PA">Pará</IonSelectOption>
                <IonSelectOption value="PB">Paraíba</IonSelectOption>
                <IonSelectOption value="PR">Paraná</IonSelectOption>
                <IonSelectOption value="PE">Pernambuco</IonSelectOption>
                <IonSelectOption value="PI">Piauí</IonSelectOption>
                <IonSelectOption value="RJ">Rio de Janeiro</IonSelectOption>
                <IonSelectOption value="RN">Rio Grande do Norte</IonSelectOption>
                <IonSelectOption value="RS">Rio Grande do Sul</IonSelectOption>
                <IonSelectOption value="RO">Rondônia</IonSelectOption>
                <IonSelectOption value="RR">Roraima</IonSelectOption>
                <IonSelectOption value="SC">Santa Catarina</IonSelectOption>
                <IonSelectOption value="SP">São Paulo</IonSelectOption>
                <IonSelectOption value="SE">Sergipe</IonSelectOption>
                <IonSelectOption value="TO">Tocantins</IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="city" rules="">
              <IonInput v-model="formValues.city" v-bind="field" label="Município" label-placement="stacked" fill="outline" placeholder="Digite a cidade" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="neighborhood" rules="">
              <IonInput v-model="formValues.neighborhood" v-bind="field" label="Bairro" label-placement="stacked" fill="outline" placeholder="Digite o nome do bairro" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="address" rules="">
              <IonInput v-model="formValues.address" v-bind="field" label="Endereço" label-placement="stacked" fill="outline" placeholder="Digite a rua/avenida" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="addressNumber" rules="">
              <IonInput v-model="formValues.addressNumber" v-bind="field" label="Número" label-placement="stacked" fill="outline" placeholder="Digite o número" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="additionalInfo">
              <IonInput v-model="formValues.additionalInfo" v-bind="field" label="Complemento" label-placement="stacked" fill="outline" placeholder="Digite informações adicionais (opcional)" />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="unusualLocation" rules="">
              <IonSelect v-model="formValues.unusualLocation" v-bind="field" label="Localização diferenciada da escola" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                <IonSelectOption value="true">Sim</IonSelectOption>
                <IonSelectOption value="false">Não</IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <div class="title-identifier" style="display: flex; align-items: center;">
              Contato
            </div>

            <Field v-slot="{ field, errors }" name="phone" rules="">
              <IonInput v-model="formValues.phone" v-maskito="phoneOptions" v-bind="field" label="Telefone 1" label-placement="stacked" fill="outline" placeholder="Digite o telefone 1" />
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

            <Field v-slot="{ field, errors }" name="blockJournalEntries" rules="">
              <IonSelect v-model="formValues.blockJournalEntries" v-bind="field" label="Bloquear lançamento no diário para anos letivos encerrados" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                <IonSelectOption value="true">Sim</IonSelectOption>
                <IonSelectOption value="false">Não</IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="usesAlternativeRules" rules="">
              <IonSelect v-model="formValues.usesAlternativeRules" v-bind="field" label="Utiliza regra alternativa de avaliação" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                <IonSelectOption value="true">Sim</IonSelectOption>
                <IonSelectOption value="false">Não</IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="operationalStatus" rules="">
              <IonSelect v-model="formValues.operationalStatus" v-bind="field" label="Situação de Funcionamento" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                <IonSelectOption value="true">Ativa</IonSelectOption>
                <IonSelectOption value="false">Inativa</IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="administrativeDependency" rules="">
              <IonSelect v-model="formValues.administrativeDependency" v-bind="field" label="Dependência Administrativa" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                <IonSelectOption value="Federal">Federal</IonSelectOption>
                <IonSelectOption value="Estadual">Estadual</IonSelectOption>
                <IonSelectOption value="Municipal">Municipal</IonSelectOption>
                <IonSelectOption value="Privada">Privada</IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

          </IonSegmentContent>
          <IonSegmentContent id="complementary">

            <IonAccordionGroup>

              <IonAccordion value="infrastructure">
                <IonItem slot="header" class="accordion-header-color">
                  <IonLabel  color="dark">Infraestrutura</IonLabel>
                </IonItem>

                <div slot="content" class="ion-padding">

                  <Field v-slot="{ field, errors }" name="operatingLocation">
                    <IonSelect v-model="formValues.operatingLocation" v-bind="field" label="Local de Funcionamento" label-placement="stacked" fill="outline" placeholder="Selecione o local de funcionamento">
                      <IonSelectOption value="Própria">
                        Própria
                      </IonSelectOption>
                      <IonSelectOption value="Alugada">
                        Alugada
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="buildingUsage">
                    <IonSelect v-model="formValues.buildingUsage" v-bind="field" label="Forma de Ocupação do Prédio" label-placement="stacked" fill="outline" placeholder="Selecione a forma de ocupação">
                      <IonSelectOption value="Exclusiva">
                        Exclusiva
                      </IonSelectOption>
                      <IonSelectOption value="Compartilhada">
                        Compartilhada
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="sharedSchool">
                    <IonSelect v-model="formValues.sharedSchool" v-bind="field" label="Escola Compartilhada?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="false">
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
                      <IonSelectOption value="true">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="false">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="electricityAvailable">
                    <IonSelect v-model="formValues.electricityAvailable" v-bind="field" label="Fonte de energia elétrica" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="false">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="sewageAvailable">
                    <IonSelect v-model="formValues.sewageAvailable" v-bind="field" label="Esgotamento sanitário adequado" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="false">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="wasteDisposal">
                    <IonSelect
                      v-model="formValues.wasteDisposal"
                      v-bind="field"
                      label="Destinação do lixo"
                      label-placement="stacked"
                      fill="outline"
                      placeholder="Selecione uma opção"
                    >
                      <IonSelectOption value="Incineração">Incineração</IonSelectOption>
                      <IonSelectOption value="Aterro">Aterro</IonSelectOption>
                      <IonSelectOption value="Compostagem">Compostagem</IonSelectOption>
                      <IonSelectOption value="Reciclagem">Reciclagem</IonSelectOption>
                      <IonSelectOption value="Outro">Outro</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="wasteTreatmentBySchool">
                    <IonSelect v-model="formValues.wasteTreatmentBySchool" v-bind="field" label="Tratamento de resíduos realizado pela escola" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="false">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="foodServiceAvailable">
                    <IonSelect v-model="formValues.foodServiceAvailable" v-bind="field" label="Oferece alimentação escolar aos alunos?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="false">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="communitySharedSpaces">
                    <IonSelect v-model="formValues.communitySharedSpaces" v-bind="field" label="Compartilha espaços com a comunidade?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="false">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="usesSurroundingSpaces">
                    <IonSelect v-model="formValues.usesSurroundingSpaces" v-bind="field" label="Utiliza equipamentos do entorno escolar para atividades educacionais?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">
                        Sim
                      </IonSelectOption>
                      <IonSelectOption value="false">
                        Não
                      </IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                </div>
              </IonAccordion>

              <IonAccordion value="facilities">
                <IonItem slot="header" class="accordion-header-color">
                  <IonLabel  color="dark">Dependências</IonLabel>
                </IonItem>
                <div slot="content" class="ion-padding">
                  <Field v-slot="{ field, errors }" name="specificFacilities">
                    <IonSelect v-model="formValues.specificFacilities" v-bind="field" label="A escola possui dependências específicas?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">Sim</IonSelectOption>
                      <IonSelectOption value="false">Não</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <!-- <Field v-slot="{ field, errors }" name="exportToCensus">
                  <IonSelect v-model="formValues.exportToCensus" v-bind="field" label="Exportar os dados para o Censo Escolar?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                    <IonSelectOption value="true">Sim</IonSelectOption>
                    <IonSelectOption value="false">Não</IonSelectOption>
                  </IonSelect>
                  <span class="error-message">{{ errors[0] }}</span>
                  </Field> -->

                  <Field v-slot="{ field, errors }" name="generalUseRooms">
                    <IonSelect v-model="formValues.generalUseRooms" v-bind="field" label="Salas de Uso Geral" label-placement="stacked" fill="outline" multiple placeholder="Selecione as opções">
                      <IonSelectOption value="Sala de aula">Salas de Aula</IonSelectOption>
                      <IonSelectOption value="Auditório">Auditório</IonSelectOption>
                      <IonSelectOption value="Espaços comuns">Espaços comuns</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="labsAndFunctionalAreas">
                    <IonSelect v-model="formValues.labsAndFunctionalAreas" v-bind="field" label="Laboratórios e Áreas Funcionais" label-placement="stacked" fill="outline" multiple placeholder="Selecione as opções">
                      <IonSelectOption value="Informática">Informática</IonSelectOption>
                      <IonSelectOption value="Ciências">Ciências</IonSelectOption>
                      <IonSelectOption value="Multimídia">Multimídia</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="supportFacilities">
                    <IonSelect v-model="formValues.supportFacilities" v-bind="field" label="Instalações de Apoio" label-placement="stacked" fill="outline" multiple placeholder="Selecione as opções">
                      <IonSelectOption value="Banheiros">Banheiros</IonSelectOption>
                      <IonSelectOption value="Acessibilidade">Acessibilidade</IonSelectOption>
                      <IonSelectOption value="Áreas externas">Áreas externas</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="insideClassrooms" rules="">
                    <IonInput v-model="formValues.insideClassrooms" v-bind="field" label="Salas de Aula Dentro do Prédio" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="outsideClassrooms" rules="">
                    <IonInput v-model="formValues.outsideClassrooms" v-bind="field" label="Salas de Aula Fora do Prédio" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="refrigeratedClassrooms" rules="">
                    <IonInput v-model="formValues.refrigeratedClassrooms" v-bind="field" label="Salas de Aula Climatizadas" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="accessibleClassrooms" rules="">
                    <IonInput v-model="formValues.accessibleClassrooms" v-bind="field" label="Salas de Aula Adaptadas para Acessibilidade" label-placement="stacked" fill="outline" placeholder="Digite o número" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>
                </div>
              </IonAccordion>

              <IonAccordion value="equipments">
                <IonItem slot="header" class="accordion-header-color">
                  <IonLabel  color="dark">Equipamentos</IonLabel>
                </IonItem>
                <div slot="content" class="ion-padding">
                  <Field v-slot="{ field, errors }" name="internetAvailable">
                    <IonSelect v-model="formValues.internetAvailable" v-bind="field" label="A escola tem internet?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">Sim</IonSelectOption>
                      <IonSelectOption value="false">Não</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="connectionType">
                    <IonSelect v-model="formValues.connectionType" v-bind="field" label="Tipos de Conexão Disponíveis" label-placement="stacked" fill="outline" multiple placeholder="Selecione as opções">
                      <IonSelectOption value="Fibra ótica">Fibra ótica</IonSelectOption>
                      <IonSelectOption value="Banda larga">Banda larga</IonSelectOption>
                      <IonSelectOption value="Satélite">Satélite</IonSelectOption>
                      <IonSelectOption value="Outro">Outro</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="localNetworkAvailable">
                    <IonSelect v-model="formValues.localNetworkAvailable" v-bind="field" label="Rede local disponível?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">Sim</IonSelectOption>
                      <IonSelectOption value="false">Não</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="devicesUsedByStudents">
                    <IonSelect v-model="formValues.devicesUsedByStudents" v-bind="field" label="Equipamentos acessados pelos alunos" label-placement="stacked" fill="outline" multiple placeholder="Selecione os dispositivos">
                      <IonSelectOption value="Computador">Computador</IonSelectOption>
                      <IonSelectOption value="Tablet">Tablet</IonSelectOption>
                      <IonSelectOption value="Smartphone">Smartphone</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="availabeDesktops">
                    <IonInput v-model.number="formValues.availableDesktops" v-bind="field" label="Computadores disponíveis (Desktop)" label-placement="stacked" fill="outline" placeholder="Digite o número" />
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
                      <IonSelectOption value="Projetor">Projetor</IonSelectOption>
                      <IonSelectOption value="DVD/Blu-ray">DVD/Blu-ray</IonSelectOption>
                      <IonSelectOption value="TV multimídia">TV multimídia</IonSelectOption>
                      <IonSelectOption value="Lousa digital">Lousa digital</IonSelectOption>
                      <IonSelectOption value="Sistema de som">Sistema de som</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                </div>
              </IonAccordion>

              <IonAccordion value="humanResources">
                <IonItem slot="header" class="accordion-header-color">
                  <IonLabel  color="dark">Recursos Humanos</IonLabel>
                </IonItem>
                <div slot="content" class="ion-padding">

                  <Field v-slot="{ field, errors }" name="administrativeStaffNumber">
                    <IonInput v-model.number="formValues.administrativeStaffNumber" v-bind="field" label="Administração e suporte pedagógico" label-placement="stacked" fill="outline" placeholder="Digite o número de profissionais" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="teachingStaffNumber">
                    <IonInput v-model.number="formValues.teachingStaffNumber" v-bind="field" label="Docentes e suporte direto ao ensino" label-placement="stacked" fill="outline" placeholder="Digite o número de profissionais" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="generalServicesStaffNumber">
                    <IonInput v-model.number="formValues.generalServicesStaffNumber" v-bind="field" label="Serviços de apoio e segurança" label-placement="stacked" fill="outline" placeholder="Digite o número de profissionais" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="healthcareStaffNumber">
                    <IonInput v-model.number="formValues.healthcareStaffNumber" v-bind="field" label="Saúde e nutrição" label-placement="stacked" fill="outline" placeholder="Digite o número de profissionais" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="socialAssistanceStaffNumber">
                    <IonInput v-model.number="formValues.socialAssistanceStaffNumber" v-bind="field" label="Psicologia e assistência social" label-placement="stacked" fill="outline" placeholder="Digite o número de profissionais" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="schoolManagementStaffNumber">
                    <IonInput v-model.number="formValues.schoolManagementStaffNumber" v-bind="field" label="Gestão escolar" label-placement="stacked" fill="outline" placeholder="Digite o número de profissionais" />
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                </div>
              </IonAccordion>

              <IonAccordion value="teachingAndPedagogicalPractices">
                <IonItem slot="header" class="accordion-header-color">
                  <IonLabel  color="dark">Ensino e Práticas Pedagógicas</IonLabel>
                </IonItem>
                <div slot="content" class="ion-padding">
                  <Field v-slot="{ field, errors }" name="specializedAssistance">
                    <IonSelect v-model="formValues.specializedAssistance" v-bind="field" label="Atendimento Educacional Especializado (AEE)" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">Sim</IonSelectOption>
                      <IonSelectOption value="false">Não</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="elementaryEducationModel">
                    <IonSelect v-model="formValues.elementaryEducationModel" v-bind="field" label="Modelo de Ensino Fundamental" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="Ciclo">Ciclo</IonSelectOption>
                      <IonSelectOption value="Série">Série</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="pedagogicalMaterials">
                    <IonSelect v-model="formValues.pedagogicalMaterials" v-bind="field" label="Materiais pedagógicos utilizados" label-placement="stacked" fill="outline" multiple placeholder="Selecione os materiais">
                      <IonSelectOption value="Arquivo multimídia">Arquivo multimídia</IonSelectOption>
                      <IonSelectOption value="Brinquedos">Brinquedos</IonSelectOption>
                      <IonSelectOption value="Jogos educativos">Jogos educativos</IonSelectOption>
                      <IonSelectOption value="Materiais científicos">Materiais científicos</IonSelectOption>
                      <IonSelectOption value="Equipamentos de áudio">Equipamentos de áudio</IonSelectOption>
                      <IonSelectOption value="Instrumentos musicais">Instrumentos musicais</IonSelectOption>
                      <IonSelectOption value="Materiais culturais/artísticos">Materiais culturais/artísticos</IonSelectOption>
                      <IonSelectOption value="Materiais de educação profissional">Materiais de educação profissional</IonSelectOption>
                      <IonSelectOption value="Materiais esportivos">Materiais esportivos</IonSelectOption>
                      <IonSelectOption value="Materiais educacionais indígenas">Materiais educacionais indígenas</IonSelectOption>
                      <IonSelectOption value="Materiais étnicos">Materiais étnicos</IonSelectOption>
                      <IonSelectOption value="Materiais educacionais do campo">Materiais educacionais do campo</IonSelectOption>
                      <IonSelectOption value="Nenhum dos anteriores">Nenhum dos anteriores</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="collegiateBodies">
                    <IonSelect v-model="formValues.collegiateBodies" v-bind="field" label="Órgãos colegiados em funcionamento" label-placement="stacked" fill="outline" multiple placeholder="Selecione os órgãos">
                      <IonSelectOption value="Associação de Pais">Associação de Pais</IonSelectOption>
                      <IonSelectOption value="Associação de Pais e Mestres">Associação de Pais e Mestres</IonSelectOption>
                      <IonSelectOption value="Grêmio Estudantil">Grêmio Estudantil</IonSelectOption>
                      <IonSelectOption value="Conselho Escolar">Conselho Escolar</IonSelectOption>
                      <IonSelectOption value="Não há órgãos colegiados">Não há órgãos colegiados</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="studentSelectionCriteria">
                    <IonSelect v-model="formValues.studentSelectionCriteria" v-bind="field" label="Critérios de seleção para alunos" label-placement="stacked" fill="outline" multiple placeholder="Selecione os critérios">
                      <IonSelectOption value="Análise curricular">Análise curricular</IonSelectOption>
                      <IonSelectOption value="Exame de seleção">Exame de seleção</IonSelectOption>
                      <IonSelectOption value="Cotas">Cotas</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="wasPedagogicalProjectUpdated">
                    <IonSelect v-model="formValues.wasPedagogicalProjectUpdated" v-bind="field" label="Projeto Político-Pedagógico atualizado nos últimos 12 meses?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">Sim</IonSelectOption>
                      <IonSelectOption value="false">Não</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="indigenousEducationAvailable">
                    <IonSelect v-model="formValues.indigenousEducationAvailable" v-bind="field" label="Educação Escolar Indígena disponível?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">Sim</IonSelectOption>
                      <IonSelectOption value="false">Não</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="indigenousEducationLanguages">
                    <IonSelect v-model="formValues.indigenousEducationLanguages" v-bind="field" label="Língua de ensino" label-placement="stacked" fill="outline" multiple placeholder="Selecione as línguas">
                      <IonSelectOption value="Português">Português</IonSelectOption>
                      <IonSelectOption value="Ticuna">Ticuna</IonSelectOption>
                      <IonSelectOption value="Guarani Kaiowá">Guarani Kaiowá</IonSelectOption>
                      <IonSelectOption value="Kaingang">Kaingang</IonSelectOption>
                      <IonSelectOption value="Xavante">Xavante</IonSelectOption>
                      <IonSelectOption value="Yanomami">Yanomami</IonSelectOption>
                      <IonSelectOption value="Outro">Outro</IonSelectOption>
                    </IonSelect>
                    <span class="error-message">{{ errors[0] }}</span>
                  </Field>

                  <Field v-slot="{ field, errors }" name="linkedWithSuperiorEducation">
                    <IonSelect v-model="formValues.linkedWithSuperiorEducation" v-bind="field" label="Vínculo com unidades de ensino superior" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                      <IonSelectOption value="true">Sim</IonSelectOption>
                      <IonSelectOption value="false">Não</IonSelectOption>
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
            <IonButton :disabled="false" color="secondary" expand="full" @click="submitFormExternally">
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
