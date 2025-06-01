<script setup lang="ts">
import type { School } from '@prisma/client'
import showToast from '@/utils/toast-alert'
import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonIcon,
} from '@ionic/vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SchoolService from '../../services/SchoolService'
import InstitutionService from '../../services/InstitutionService'
import { homeOutline, businessOutline, constructOutline, desktopOutline, peopleOutline, bookOutline } from 'ionicons/icons'

const cnpjMask = { mask: '00.000.000/0000-00' }
const cepMask = { mask: '00000-000' }
const phoneMask = { mask: '(00) 00000-0000' }

const route = useRoute()
const router = useRouter()
const schoolService = new SchoolService()
const institutionService = new InstitutionService()

const form = ref<any>(null)
const institution = ref({ id: 'bd14f407-3758-4656-a299-e4cf3859dd29', name: '' })

async function fetchInstitution() {
  try {
    const data = await institutionService.getInstitutionById(institution.value.id)
    if (data) {
      institution.value.name = data.name
    }
  } catch (error) {
    console.error('Erro ao buscar instituição:', error)
  }
}

async function buscarEndereco(cep: string) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()
    if (data.erro) {
      throw new Error('CEP não encontrado')
    }
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

const initialFormValues = {
  id: '',
  idpes: null,
  INEPCode: '',
  corporateName: '',
  acronym: '',
  blockJournalEntries: false,
  operationalStatus: true,
  usesAlternativeRules: false,
  educationNetwork: false,
  administrativeDependency: null,
  name: '',
  cnpj: '',
  address: '',
  addressNumber: '',
  additionalInfo: '',
  neighborhood: '',
  city: '',
  state: '',
  postalCode: '',
  unusualLocation: false,
  phone: '',
  phone2: '',
  zone: '',
  // Campos de infraestrutura
  operatingLocation: null,
  buildingUsage: null,
  sharedSchool: false,
  sharedSchoolINEPCode: '',
  potableWaterAvailable: false,
  sewageAvailable: false,
  electricityAvailable: false,
  wasteDisposal: null,
  wasteTreatmentBySchool: false,
  foodServiceAvailable: false,
  communitySharedSpaces: false,
  usesSurroundingSpaces: false,
  // Campos de dependências
  specificFacilities: false,
  generalUseRooms: [],
  labsAndFunctionalAreas: [],
  supportFacilities: [],
  insideClassrooms: 0,
  outsideClassrooms: 0,
  refrigeratedClassrooms: 0,
  accessibleClassrooms: 0,
  // Campos de equipamentos
  hasInternet: false,
  hasLocalNetwork: false,
  connectionTypes: [],
  studentAccessDevices: [],
  teachingEquipments: [],
  desktopComputers: 0,
  laptopComputers: 0,
  tabletsAvailable: 0,
  // Campos de recursos humanos (RH)
  administrationStaff: 0,
  teachingStaff: 0,
  supportAndSecurityStaff: 0,
  healthAndNutritionStaff: 0,
  psychologyAndSocialStaff: 0,
  schoolManagementStaff: 0,
  // Campos de dados do ensino
  hasSpecializedEducation: false,
  hasPoliticalPedagogicalProject: false,
  hasIndigenousEducation: false,
  hasHigherEducationLink: false,
  elementarySchoolModel: null,
  teachingLanguage: null,
  teachingMaterials: [],
  collegiateBodies: [],
  studentSelectionCriteria: [],
  headquartersSchoolCode: '',
  higherEducationInstitutionCode: '',
  tenantId: null,
  userCreated: null,
}

// Dados que serão exibidos no formulário
const formValues = ref<any>({
  ...JSON.parse(JSON.stringify(initialFormValues))
})

// Monitorar alterações no campo CEP
watch(() => formValues.value.postalCode, async (novoCep) => {
  const cepLimpo = String(novoCep).replace(/\D/g, '')
  if (cepLimpo && cepLimpo.length === 8) {
    const endereco = await buscarEndereco(cepLimpo)

    console.log("endereco", endereco)

    if (endereco) {
      formValues.value.address = endereco.logradouro
      formValues.value.neighborhood = endereco.bairro
      formValues.value.city = endereco.localidade
      formValues.value.state = endereco.uf

      if (form.value) {
        form.value.setFieldValue('address', endereco.logradouro)
        form.value.setFieldValue('neighborhood', endereco.bairro)
        form.value.setFieldValue('municipality', endereco.localidade)
        form.value.setFieldValue('state', endereco.uf)
      }
    }
  }
})

const originalFormValues = ref({ ...initialFormValues })
const isEditing = ref(false)
const schoolId = computed(() => route.params.id as string | undefined)
const pageTitle = computed(() => isEditing.value ? 'Editar escola' : 'Nova escola')
const hasChanges = ref(false)

// Controle de abas
const activeTab = ref('dadosGerais')

// Definição das abas
const tabs = [
  { id: 'dadosGerais', label: 'Dados gerais', icon: businessOutline },
  { id: 'infraestrutura', label: 'Infraestrutura', icon: homeOutline },
  { id: 'dependencias', label: 'Dependências', icon: constructOutline },
  { id: 'equipamentos', label: 'Equipamentos', icon: desktopOutline },
  { id: 'rh', label: 'RH', icon: peopleOutline },
  { id: 'dadosEnsino', label: 'Dados do ensino', icon: bookOutline },
]

const stateOptions = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

const administrativeDependencyOptions = [
  { value: 'Municipal', label: 'Municipal' },
  { value: 'Estadual', label: 'Estadual' },
  { value: 'Federal', label: 'Federal' },
  { value: 'Privada', label: 'Privada' },
]

const initialEmptyState = ref({
  idpes: null,
  INEPCode: '',
  corporateName: '',
  acronym: '',
  blockJournalEntries: false,
  operationalStatus: true,
  usesAlternativeRules: false,
  educationNetwork: false,
  administrativeDependency: null,
  name: '',
  cnpj: '',
  address: '',
  addressNumber: '',
  additionalInfo: '',
  neighborhood: '',
  city: '',
  state: '',
  postalCode: '',
  unusualLocation: false,
  phone: '',
})

function checkForChanges() {
  if (!isEditing.value)
    return

  if (!formValues.value || !originalFormValues.value) {
    hasChanges.value = false
    return
  }

  const currentObj = JSON.parse(JSON.stringify(formValues.value))
  const originalObj = JSON.parse(JSON.stringify(originalFormValues.value))

  const currentValues = JSON.stringify(currentObj)
  const originalValues = JSON.stringify(originalObj)

  hasChanges.value = currentValues !== originalValues
}

const saveButtonEnabled = computed(() => {
  if (!isEditing.value) {
    let hasFieldChanges = false

    const fieldsToCheck = [
      'name',
      'INEPCode',
      'corporateName',
      'acronym',
      'address',
      'city',
      'state',
      'postalCode',
      'phone',
    ]

    for (const field of fieldsToCheck) {
      if (formValues.value[field as keyof typeof formValues.value]
        && formValues.value[field as keyof typeof formValues.value] !== initialEmptyState.value[field as keyof typeof initialEmptyState.value]) {
        hasFieldChanges = true
        break
      }
    }

    return hasFieldChanges
  }

  return hasChanges.value
})

function resetFormState() {
  formValues.value = { ...initialFormValues }
  originalFormValues.value = { ...initialFormValues }
  isEditing.value = false
  hasChanges.value = false
}

async function initialize() {
  resetFormState()
  
  // Buscar dados da instituição
  await fetchInstitution()

  if (schoolId.value) {
    try {
      const schoolData = await schoolService.getSchoolById(schoolId.value)

      if (schoolData) {
        isEditing.value = true
        formValues.value = {
          ...formValues.value,
          ...schoolData,
        }
        
        originalFormValues.value = JSON.parse(JSON.stringify(formValues.value))
      }
      else {
        showToast('Escola não encontrada', 'top', 'warning')
        router.push({ name: 'SchoolListSchool' })
      }
    }
    catch (error) {
      console.error('Erro ao carregar dados da escola:', error)
      showToast('Erro ao carregar dados da escola', 'top', 'danger')
      router.push({ name: 'SchoolListSchool' })
    }
  }
}

watch(formValues, () => {
  checkForChanges()
}, { deep: true })

async function handleSubmit(values: any) {
  try {
    const payload = {
      ...values,
      idpes: values.idpes || null,
      INEPCode: values.INEPCode || null,
      corporateName: values.corporateName || null,
      acronym: values.acronym || null,
      blockJournalEntries: !!values.blockJournalEntries,
      operationalStatus: values.operationalStatus !== false,
      usesAlternativeRules: !!values.usesAlternativeRules,
      educationNetwork: !!values.educationNetwork,
      administrativeDependency: values.administrativeDependency || null,
      institutionId: institution.value.id,
      address: values.address || null,
      addressNumber: values.addressNumber || null,
      additionalInfo: values.additionalInfo || null,
      neighborhood: values.neighborhood || null,
      city: values.city || null,
      state: values.state || null,
      postalCode: values.postalCode || null,
      unusualLocation: !!values.unusualLocation,
      phone: values.phone || null,
    }

    const result = await schoolService.upsertSchool(payload)

    if (result && result.length > 0) {
      const action = isEditing.value ? 'atualizada' : 'cadastrada'
      showToast(`Escola ${action} com sucesso`, 'top', 'success')

      if (!isEditing.value) {
        router.push({ 
          name: 'SchoolListSchool',
          query: { refresh: 'true' }
        })
      }
      else {
        router.push({ 
          name: 'SchoolListSchool',
          query: { refresh: 'true' }
        })
      }
    }
    else {
      showToast('Erro ao salvar escola', 'top', 'danger')
    }
  }
  catch (error: any) {
    console.error('Erro ao salvar escola:', error)
    if (error.message && error.message.includes('já existente')) {
      showToast(error.message, 'top', 'warning')
    }
    else {
      showToast(`Erro ao salvar: ${error.message || 'Erro desconhecido'}`, 'top', 'danger')
    }
  }
}

function resetForm() {
  router.push({ name: 'SchoolListSchool' })
}

function handleManualSubmit() {
  const form = document.getElementById('school-form')
  if (form) (form as HTMLFormElement).requestSubmit()
}

onMounted(() => {
  initialize()
})
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle class="page-title">
          {{ pageTitle }}
        </IonTitle>
      </IonToolbar>
      <div class="toolbar-accent" />
      
      <IonToolbar>
        <IonSegment v-model="activeTab" class="custom-segment">
          <IonSegmentButton v-for="tab in tabs" :key="tab.id" :value="tab.id">
            <IonIcon :icon="tab.icon" />
            <IonLabel>{{ tab.label }}</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
    </IonHeader>

    <IonContent :scroll-y="true" class="ion-padding content-with-footer">
      <Form ref="form" id="school-form" :key="formValues.id || `new-${Date.now()}`" :initial-values="formValues" @submit="handleSubmit">
        <IonGrid class="tab-content">
          <!-- Aba 1: Dados Gerais -->
          <div v-show="activeTab === 'dadosGerais'">
            <h4 class="section-title">Informações Básicas</h4>

            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="institutionName" label="Instituição">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      :value="institution.name"
                      type="text"
                      class="floating-native"
                      placeholder="Instituição"
                      disabled
                    />
                    <label class="floating-label"><span>Instituição</span></label>
                  </div>
                </Field>
              </IonCol>
            </IonRow>
              
            <IonRow>
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="name" label="Nome da Escola" rules="required|min:3|max:100">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.name"
                      type="text"
                      class="floating-native"
                      maxlength="101"
                      placeholder="Nome da Escola"
                    />
                    <label class="floating-label"><span>Nome da Escola</span> <span class="required-text">(Obrigatório)</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="name">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>

              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="acronym" label="Sigla" rules="required|max:6">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.acronym"
                      type="text"
                      class="floating-native"
                      maxlength="7"
                      placeholder="Sigla"
                    />
                    <label class="floating-label"><span>Sigla</span> <span class="required-text">(Obrigatório)</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="acronym">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="corporateName" label="Razão Social" rules="max:100">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.corporateName"
                      type="text"
                      class="floating-native"
                      maxlength="101"
                      placeholder="Razão Social"
                    />
                    <label class="floating-label"><span>Razão Social</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="corporateName">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>

              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="educationNetwork" label="Rede de ensino">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.educationNetwork"
                      interface="alert"
                      placeholder="Selecione a Rede de ensino"
                      class="select-native"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="true">Pública</IonSelectOption>
                      <IonSelectOption value="false">Privada</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Rede de ensino</span></label>
                  </div>
                </Field>
              </IonCol>
            </IonRow>

          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="cnpj" label="CNPJ" rules="cnpj">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.cnpj"
                    type="text"
                    class="floating-native"
                    placeholder="CNPJ"
                    v-imask="cnpjMask"
                  />
                  <label class="floating-label"><span>CNPJ</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="cnpj">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>

            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="INEPCode" label="Código INEP" rules="max:8">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.INEPCode"
                    type="text"
                    class="floating-native"
                    maxlength="9"
                    placeholder="Código INEP"
                  />
                  <label class="floating-label"><span>Código INEP</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="INEPCode">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <h4 class="section-title">Endereço</h4>
          
          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="postalCode" label="CEP" rules="required|cep">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.postalCode"
                    type="text"
                    class="floating-native"
                    placeholder="CEP"
                    v-imask="cepMask"
                  />
                  <label class="floating-label"><span>CEP</span> <span class="required-text">(Obrigatório)</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="postalCode">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>

            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="address" label="Logradouro" rules="max:255">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.address"
                    type="text"
                    class="floating-native"
                    maxlength="256"
                    placeholder="Logradouro"
                  />
                  <label class="floating-label"><span>Logradouro</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="address">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol size="12" size-md="4">
              <Field v-slot="{ field }" name="addressNumber" label="Número" rules="max:6">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.addressNumber"
                    type="text"
                    class="floating-native"
                    maxlength="7"
                    placeholder="Número"
                  />
                  <label class="floating-label"><span>Número</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="addressNumber">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>

            <IonCol size="12" size-md="8">
              <Field v-slot="{ field }" name="additionalInfo" label="Complemento" rules="max:255">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.additionalInfo"
                    type="text"
                    class="floating-native"
                    maxlength="256"
                    placeholder="Complemento"
                  />
                  <label class="floating-label"><span>Complemento</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="additionalInfo">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="neighborhood" label="Bairro" rules="max:100">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.neighborhood"
                    type="text"
                    class="floating-native"
                    maxlength="101"
                    placeholder="Bairro"
                  />
                  <label class="floating-label"><span>Bairro</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="neighborhood">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>

            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="city" label="Cidade" rules="max:100">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.city"
                    type="text"
                    class="floating-native"
                    maxlength="101"
                    placeholder="Cidade"
                  />
                  <label class="floating-label"><span>Cidade</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="city">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" size-md="4">
              <Field v-slot="{ field }" name="state" label="Estado" rules="max:2">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.state"
                    type="text"
                    class="floating-native"
                    maxlength="2"
                    placeholder="UF"
                  />
                  <label class="floating-label"><span>Estado (UF)</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="state">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>

            <IonCol size="12" size-md="4">
              <Field v-slot="{ field }" name="zone" label="Zona">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.zone"
                    interface="alert"
                    placeholder="Selecione a Zona"
                    class="select-native"
                    @ion-change="(e) => { field.onChange(e.detail.value) }"
                  >
                    <IonSelectOption value="rural">Rural</IonSelectOption>
                    <IonSelectOption value="urbana">Urbana</IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Zona</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="zone">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>

            <IonCol size="12" size-md="4" class="ion-align-self-end">
              <div style="padding-bottom: 12px; ">
                <IonCheckbox v-model="formValues.unusualLocation" labelPlacement="end">Localização diferenciada</IonCheckbox>
              </div>
            </IonCol>
          </IonRow>

          <h4 class="section-title">Contato</h4>

          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="phone" label="Telefone 1" rules="required|phone">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.phone"
                    type="text"
                    class="floating-native"
                    placeholder="Telefone 1"
                    v-imask="phoneMask"
                  />
                  <label class="floating-label"><span>Telefone 1</span> <span class="required-text">(Obrigatório)</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="phone">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="phone2" label="Telefone 2" rules="phone">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.phone2"
                    type="text"
                    class="floating-native"
                    placeholder="Telefone 2"
                    v-imask="phoneMask"
                  />
                  <label class="floating-label"><span>Telefone 2</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="phone2">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="email" label="E-mail" rules="email">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.email"
                    type="text"
                    class="floating-native"
                    placeholder="E-mail"
                  />
                  <label class="floating-label"><span>E-mail</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="email">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="website" label="Site" rules="max:255">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.website"
                    type="text"
                    class="floating-native"
                    placeholder="Site"
                  />
                  <label class="floating-label"><span>Site</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="website">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <h4 class="section-title">Configurações</h4>

          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="administrativeDependency" label="Dependência Administrativa" rules="required">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.administrativeDependency"
                    interface="alert"
                    placeholder="Selecione a Dependência Administrativa"
                    class="select-native"
                    @ion-change="(e) => { field.onChange(e.detail.value) }"
                  >
                    <IonSelectOption v-for="option in administrativeDependencyOptions" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Dependência Administrativa</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="administrativeDependency">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
            
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="operationalStatus" label="Situação de funcionamento" rules="required">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.operationalStatus"
                    interface="alert"
                    placeholder="Selecione a situação"
                    class="select-native"
                    @ion-change="(e) => { field.onChange(e.detail.value) }"
                  >
                    <IonSelectOption value="true">Ativa</IonSelectOption>
                    <IonSelectOption value="false">Inativa</IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Situação de funcionamento</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="operationalStatus">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
            
          </IonRow>

          <IonRow>
            <IonCol size="12" size-md="6">
              <IonItem class="checkbox-item">
                <IonCheckbox v-model="formValues.blockJournalEntries" labelPlacement="end">Bloquear lançamentos no diário</IonCheckbox>
              </IonItem>
            </IonCol>
            <IonCol size="12" size-md="6">
              <IonItem class="checkbox-item">
                <IonCheckbox v-model="formValues.usesAlternativeRules" labelPlacement="end">Utiliza regras alternativas</IonCheckbox>
              </IonItem>
            </IonCol>
          </IonRow>

            
          </div>
          
          <!-- Aba 2: Infraestrutura -->
          <div v-show="activeTab === 'infraestrutura'">
            <h4 class="section-title">Infraestrutura</h4>
            
            <!-- Local de funcionamento -->
            <IonRow>
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="operatingLocation" label="Local de funcionamento">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.operatingLocation"
                      interface="alert"
                      placeholder="Selecione o local"
                      class="select-native"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="OWNED">Própria</IonSelectOption>
                      <IonSelectOption value="RENTED">Alugada</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Local de funcionamento</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="operatingLocation">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Forma de ocupação do prédio -->
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="buildingUsage" label="Forma de ocupação do prédio">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.buildingUsage"
                      interface="alert"
                      placeholder="Selecione a ocupação"
                      class="select-native"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="EXCLUSIVE">Exclusiva</IonSelectOption>
                      <IonSelectOption value="SHARED">Compartilhada</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Forma de ocupação do prédio</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="buildingUsage">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Destinação do lixo -->
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="wasteDisposal" label="Destinação do lixo">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.wasteDisposal"
                      interface="alert"
                      placeholder="Selecione a destinação"
                      class="select-native"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="INCINERATION">Incineração</IonSelectOption>
                      <IonSelectOption value="LANDFILL">Aterro</IonSelectOption>
                      <IonSelectOption value="COMPOSTING">Compostagem</IonSelectOption>
                      <IonSelectOption value="RECYCLING">Reciclagem</IonSelectOption>
                      <IonSelectOption value="OTHER">Outro</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Destinação do lixo</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="wasteDisposal">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
            
            <h4 class="section-title">Recursos e Funcionalidades</h4>
            
            <IonRow>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.sharedSchool" labelPlacement="end">Escola compartilhada</IonCheckbox>
                </IonItem>
              </IonCol>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.potableWaterAvailable" labelPlacement="end">Água potável disponível</IonCheckbox>
                </IonItem>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.electricityAvailable" labelPlacement="end">Fonte de energia elétrica</IonCheckbox>
                </IonItem>
              </IonCol>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.sewageAvailable" labelPlacement="end">Esgotamento sanitário adequado</IonCheckbox>
                </IonItem>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.wasteTreatmentBySchool" labelPlacement="end">Tratamento de resíduos realizado pela escola</IonCheckbox>
                </IonItem>
              </IonCol>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.foodServiceAvailable" labelPlacement="end">Oferece alimentação escolar aos alunos</IonCheckbox>
                </IonItem>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.communitySharedSpaces" labelPlacement="end">Compartilha espaços com a comunidade</IonCheckbox>
                </IonItem>
              </IonCol>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.usesSurroundingSpaces" labelPlacement="end">Utiliza equipamentos do entorno escolar para atividades educacionais</IonCheckbox>
                </IonItem>
              </IonCol>
            </IonRow>
            
            <!-- Campo para código INEP da escola compartilhada -->
            <IonRow v-if="formValues.sharedSchool">
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="sharedSchoolINEPCode" label="Código INEP da escola compartilhada" rules="max:100">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.sharedSchoolINEPCode"
                      type="text"
                      class="floating-native"
                      maxlength="100"
                      placeholder="Código INEP da escola compartilhada"
                    />
                    <label class="floating-label"><span>Código INEP da escola compartilhada</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="sharedSchoolINEPCode">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

          </div>
          
          <!-- Aba 3: Dependências -->
          <div v-show="activeTab === 'dependencias'">
            <h4 class="section-title">Dependências da Escola</h4>
            
            <!-- Checkbox para dependências específicas -->
            <IonRow>
              <IonCol size="12">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.specificFacilities" labelPlacement="end">A escola possui dependências específicas</IonCheckbox>
                </IonItem>
              </IonCol>
            </IonRow>

            <!-- Salas de uso geral (Room enum) -->
            <IonRow>
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="generalUseRooms" label="Salas de uso geral">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.generalUseRooms"
                      interface="alert"
                      placeholder="Selecione as salas"
                      class="select-native"
                      :multiple="true"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="CLASSROOM">Sala de aula</IonSelectOption>
                      <IonSelectOption value="AUDITORIUM">Auditório</IonSelectOption>
                      <IonSelectOption value="COMMON_PLACES">Espaços comuns</IonSelectOption>
                      <IonSelectOption value="WAREHOUSE">Almoxarifado</IonSelectOption>
                      <IonSelectOption value="LIBRARY">Biblioteca</IonSelectOption>
                      <IonSelectOption value="TEACHER_ROOM">Sala de professores</IonSelectOption>
                      <IonSelectOption value="BATHROOM">Banheiro</IonSelectOption>
                      <IonSelectOption value="ACCESSIBILITY_BATHROOM">Banheiro acessível</IonSelectOption>
                      <IonSelectOption value="TEACHER_BATHROOM">Banheiro de professores</IonSelectOption>
                      <IonSelectOption value="KITCHEN">Cozinha</IonSelectOption>
                      <IonSelectOption value="STUDENT_DORMROOM">Dormitório de alunos</IonSelectOption>
                      <IonSelectOption value="TEACHER_DORMROOM">Dormitório de professores</IonSelectOption>
                      <IonSelectOption value="POOL">Piscina</IonSelectOption>
                      <IonSelectOption value="LUNCHROOM">Refeitório</IonSelectOption>
                      <IonSelectOption value="OPEN_COURT">Pátio aberto</IonSelectOption>
                      <IonSelectOption value="CLOSED_COURT">Pátio fechado</IonSelectOption>
                      <IonSelectOption value="COVERED_FIELD">Quadra coberta</IonSelectOption>
                      <IonSelectOption value="OPEN_FIELD">Quadra descoberta</IonSelectOption>
                      <IonSelectOption value="SECRETARY">Secretaria</IonSelectOption>
                      <IonSelectOption value="PARKING">Estacionamento</IonSelectOption>
                      <IonSelectOption value="CAFETERIA">Cantina</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Salas de uso geral</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="generalUseRooms">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Laboratórios e áreas funcionais (Lab enum) -->
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="labsAndFunctionalAreas" label="Laboratórios e áreas funcionais">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.labsAndFunctionalAreas"
                      interface="alert"
                      placeholder="Selecione os laboratórios"
                      class="select-native"
                      :multiple="true"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="COMPUTER_SCIENCE">Informática</IonSelectOption>
                      <IonSelectOption value="SCIENCE">Ciências</IonSelectOption>
                      <IonSelectOption value="MULTIMEDIA">Multimídia</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Laboratórios e áreas funcionais</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="labsAndFunctionalAreas">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Instalações de apoio (Facility enum) -->
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="supportFacilities" label="Instalações de apoio">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.supportFacilities"
                      interface="alert"
                      placeholder="Selecione as instalações"
                      class="select-native"
                      :multiple="true"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="RESTROOMS">Banheiros</IonSelectOption>
                      <IonSelectOption value="ACCESSIBILITY">Acessibilidade</IonSelectOption>
                      <IonSelectOption value="EXTERNAL_AREAS">Áreas externas</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Instalações de apoio</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="supportFacilities">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <h4 class="section-title">Salas de Aula</h4>
            
            <IonRow>
              <!-- Salas de aula dentro do prédio -->
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="insideClassrooms" label="Salas de aula dentro do prédio" rules="checandoNumero|valorMinimo:0|max:3">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.insideClassrooms"
                      type="text"
                      maxlength="4"
                      class="floating-native"
                      placeholder="Quantidade"
                    />
                    <label class="floating-label"><span>Salas de aula dentro do prédio</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="insideClassrooms">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Salas de aula fora do prédio -->
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="outsideClassrooms" label="Salas de aula fora do prédio" rules="checandoNumero|valorMinimo:0|max:3">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.outsideClassrooms"
                      type="text"
                      maxlength="4"
                      min="0"
                      class="floating-native"
                      placeholder="Quantidade"
                    />
                    <label class="floating-label"><span>Salas de aula fora do prédio</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="outsideClassrooms">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <!-- Salas de aula climatizadas -->
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="refrigeratedClassrooms" label="Salas de aula climatizadas" rules="checandoNumero|valorMinimo:0|max:3">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.refrigeratedClassrooms"
                      type="text"
                      maxlength="4"
                      min="0"
                      class="floating-native"
                      placeholder="Quantidade"
                    />
                    <label class="floating-label"><span>Salas de aula climatizadas</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="refrigeratedClassrooms">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Salas de aula adaptadas para acessibilidade -->
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="accessibleClassrooms" label="Salas de aula adaptadas para acessibilidade" rules="checandoNumero|valorMinimo:0|max:3">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.accessibleClassrooms"
                      type="text"
                      maxlength="4"
                      min="0"
                      class="floating-native"
                      placeholder="Quantidade"
                    />
                    <label class="floating-label"><span>Salas de aula adaptadas para acessibilidade</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="accessibleClassrooms">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
          </div>
          
          <!-- Aba 4: Equipamentos -->
          <div v-show="activeTab === 'equipamentos'">
            <h4 class="section-title">Recursos Tecnológicos</h4>
            
            <!-- Checkboxes para internet e rede local -->
            <IonRow>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.hasInternet" labelPlacement="end">A escola tem internet</IonCheckbox>
                </IonItem>
              </IonCol>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.hasLocalNetwork" labelPlacement="end">Rede local disponível</IonCheckbox>
                </IonItem>
              </IonCol>
            </IonRow>

            <!-- Tipos de conexão disponíveis (ConnectionType enum) -->
            <IonRow>
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="connectionTypes" label="Tipos de conexão disponíveis">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.connectionTypes"
                      interface="alert"
                      placeholder="Selecione os tipos de conexão"
                      class="select-native"
                      :multiple="true"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="OPTIC_FIBER">Fibra ótica</IonSelectOption>
                      <IonSelectOption value="BROAD_BAND">Banda larga</IonSelectOption>
                      <IonSelectOption value="SATELLITE">Satélite</IonSelectOption>
                      <IonSelectOption value="OTHER">Outro</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Tipos de conexão disponíveis</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="connectionTypes">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Equipamentos acessados pelos alunos (Device enum) -->
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="studentAccessDevices" label="Equipamentos acessados pelos alunos">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.studentAccessDevices"
                      interface="alert"
                      placeholder="Selecione os equipamentos"
                      class="select-native"
                      :multiple="true"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="COMPUTER">Computador</IonSelectOption>
                      <IonSelectOption value="TABLET">Tablet</IonSelectOption>
                      <IonSelectOption value="SMARTPHONE">Smartphone</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Equipamentos acessados pelos alunos</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="studentAccessDevices">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Equipamentos para ensino/aprendizagem (TeachingEquipment enum) -->
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="teachingEquipments" label="Equipamentos para ensino/aprendizagem">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.teachingEquipments"
                      interface="alert"
                      placeholder="Selecione os equipamentos"
                      class="select-native"
                      :multiple="true"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="PROJECTOR">Projetor</IonSelectOption>
                      <IonSelectOption value="DVD_BLU_RAY">DVD/Blu-ray</IonSelectOption>
                      <IonSelectOption value="MULTIMEDIA_TV">TV multimídia</IonSelectOption>
                      <IonSelectOption value="DIGITAL_WHITEBOARD">Lousa digital</IonSelectOption>
                      <IonSelectOption value="SOUND_SYSTEM">Sistema de som</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Equipamentos para ensino/aprendizagem</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="teachingEquipments">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <h4 class="section-title">Quantidade de Equipamentos</h4>
            
            <IonRow>
              <!-- Computadores disponíveis (Desktop) -->
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="desktopComputers" label="Computadores disponíveis (Desktop)" rules="checandoNumero|valorMinimo:0|max:3">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.desktopComputers"
                      type="text"
                      maxlength="4"
                      min="0"
                      class="floating-native"
                      placeholder="Quantidade"
                    />
                    <label class="floating-label"><span>Computadores disponíveis (Desktop)</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="desktopComputers">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Computadores disponíveis (Notebooks) -->
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="laptopComputers" label="Computadores disponíveis (Notebooks)" rules="checandoNumero|valorMinimo:0|max:3">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.laptopComputers"
                      type="text"
                      maxlength="4"
                      min="0"
                      class="floating-native"
                      placeholder="Quantidade"
                    />
                    <label class="floating-label"><span>Computadores disponíveis (Notebooks)</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="laptopComputers">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Tablets disponíveis -->
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="tabletsAvailable" label="Tablets disponíveis" rules="checandoNumero|valorMinimo:0|max:3">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.tabletsAvailable"
                      type="text"
                      maxlength="4"
                      min="0"
                      class="floating-native"
                      placeholder="Quantidade"
                    />
                    <label class="floating-label"><span>Tablets disponíveis</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="tabletsAvailable">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
          </div>
          
          <!-- Aba 5: RH -->
          <div v-show="activeTab === 'rh'">
            <h4 class="section-title">Recursos Humanos</h4>
            <p class="section-subtitle">Informe a quantidade de profissionais por categoria</p>
            
            <IonRow>
              <!-- Administração e suporte pedagógico -->
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="administrationStaff" label="Administração e suporte pedagógico" rules="checandoNumero|valorMinimo:0|max:3">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.administrationStaff"
                      type="text"
                      maxlength="4"
                      class="floating-native"
                      placeholder="Quantidade"
                    />
                    <label class="floating-label"><span>Administração e suporte pedagógico</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="administrationStaff">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Docentes e suporte direto ao ensino -->
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="teachingStaff" label="Docentes e suporte direto ao ensino" rules="checandoNumero|valorMinimo:0|max:3">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.teachingStaff"
                      type="text"
                      maxlength="4"
                      class="floating-native"
                      placeholder="Quantidade"
                    />
                    <label class="floating-label"><span>Docentes e suporte direto ao ensino</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="teachingStaff">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <!-- Serviços de apoio e segurança -->
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="supportAndSecurityStaff" label="Serviços de apoio e segurança" rules="checandoNumero|valorMinimo:0|max:3">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.supportAndSecurityStaff"
                      type="text"
                      maxlength="4"
                      class="floating-native"
                      placeholder="Quantidade"
                    />
                    <label class="floating-label"><span>Serviços de apoio e segurança</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="supportAndSecurityStaff">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Saúde e nutrição -->
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="healthAndNutritionStaff" label="Saúde e nutrição" rules="checandoNumero|valorMinimo:0|max:3">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.healthAndNutritionStaff"
                      type="text"
                      maxlength="4"
                      class="floating-native"
                      placeholder="Quantidade"
                    />
                    <label class="floating-label"><span>Saúde e nutrição</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="healthAndNutritionStaff">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <!-- Psicologia e assistência social -->
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="psychologyAndSocialStaff" label="Psicologia e assistência social" rules="checandoNumero|valorMinimo:0|max:3">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.psychologyAndSocialStaff"
                      type="text"
                      maxlength="4"
                      class="floating-native"
                      placeholder="Quantidade"
                    />
                    <label class="floating-label"><span>Psicologia e assistência social</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="psychologyAndSocialStaff">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Gestão escolar -->
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="schoolManagementStaff" label="Gestão escolar" rules="checandoNumero|valorMinimo:0|max:3">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.schoolManagementStaff"
                      type="text"
                      maxlength="4"
                      class="floating-native"
                      placeholder="Quantidade"
                    />
                    <label class="floating-label"><span>Gestão escolar</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="schoolManagementStaff">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
          </div>
          
          <!-- Aba 6: Dados do ensino -->
          <div v-show="activeTab === 'dadosEnsino'">
            <h4 class="section-title">Dados do Ensino</h4>
            
            <!-- Checkboxes -->
            <IonRow>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.hasSpecializedEducation" labelPlacement="end">Atendimento educacional especializado (AEE)</IonCheckbox>
                </IonItem>
              </IonCol>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.hasPoliticalPedagogicalProject" labelPlacement="end">Projeto político-Pedagógico atualizado nos últimos 12 meses</IonCheckbox>
                </IonItem>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.hasIndigenousEducation" labelPlacement="end">Educação escolar indígena disponível</IonCheckbox>
                </IonItem>
              </IonCol>
              <IonCol size="12" size-md="6">
                <IonItem class="checkbox-item">
                  <IonCheckbox v-model="formValues.hasHigherEducationLink" labelPlacement="end">Vínculo com unidades de ensino superior</IonCheckbox>
                </IonItem>
              </IonCol>
            </IonRow>
            
            <!-- IonSelects -->
            <IonRow>
              <!-- Modelo de ensino fundamental -->
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="elementarySchoolModel" label="Modelo de ensino fundamental">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.elementarySchoolModel"
                      interface="alert"
                      placeholder="Selecione o modelo"
                      class="select-native"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="CYCLE">Ciclo</IonSelectOption>
                      <IonSelectOption value="GRADE">Série</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Modelo de ensino fundamental</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="elementarySchoolModel">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Língua de ensino -->
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="teachingLanguage" label="Língua de ensino">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.teachingLanguage"
                      interface="alert"
                      placeholder="Selecione a língua"
                      class="select-native"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="PORTUGUES">Português</IonSelectOption>
                      <IonSelectOption value="TIKUNA">Ticuna</IonSelectOption>
                      <IonSelectOption value="GUARANI_KAIOWA">Guarani Kaiowá</IonSelectOption>
                      <IonSelectOption value="KAINGANG">Kaingang</IonSelectOption>
                      <IonSelectOption value="XAVANTE">Xavante</IonSelectOption>
                      <IonSelectOption value="YANOMAMI">Yanomami</IonSelectOption>
                      <IonSelectOption value="OUTRO">Outro</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Língua de ensino</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="teachingLanguage">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <!-- Materiais pedagógicos utilizados -->
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="teachingMaterials" label="Materiais pedagógicos utilizados">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.teachingMaterials"
                      interface="alert"
                      placeholder="Selecione os materiais"
                      class="select-native"
                      :multiple="true"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="MULTIMEDIA_ARCHIVE">Arquivo multimídia</IonSelectOption>
                      <IonSelectOption value="TOYS">Brinquedos</IonSelectOption>
                      <IonSelectOption value="EDUCATIONAL_GAMES">Jogos educativos</IonSelectOption>
                      <IonSelectOption value="SCIENTIFICAL_MATERIALS">Materiais científicos</IonSelectOption>
                      <IonSelectOption value="AUDIO_EQUIPMENT">Equipamentos de áudio</IonSelectOption>
                      <IonSelectOption value="MUSICAL_INSTRUMENTS">Instrumentos musicais</IonSelectOption>
                      <IonSelectOption value="ARTISTIC_MATERIALS">Materiais culturais/artísticos</IonSelectOption>
                      <IonSelectOption value="PROFESSIONAL_EDUCATION_MATERIALS">Materiais de educação profissional</IonSelectOption>
                      <IonSelectOption value="SPORT_MATERIALS">Materiais esportivos</IonSelectOption>
                      <IonSelectOption value="INDIGENOUS_MATERIALS">Materiais educacionais indígenas</IonSelectOption>
                      <IonSelectOption value="ETHNIC_MATERIALS">Materiais étnicos</IonSelectOption>
                      <IonSelectOption value="RURAL_MATERIALS">Materiais educacionais do campo</IonSelectOption>
                      <IonSelectOption value="NONE_OF_THE_ABOVE">Nenhum dos anteriores</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Materiais pedagógicos utilizados</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="teachingMaterials">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Órgãos colegiados em funcionamento -->
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="collegiateBodies" label="Órgãos colegiados em funcionamento">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.collegiateBodies"
                      interface="alert"
                      placeholder="Selecione os órgãos"
                      class="select-native"
                      :multiple="true"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="ASSOCIACAO_DE_PAIS">Associação de Pais</IonSelectOption>
                      <IonSelectOption value="ASSOCIACAO_DE_PAIS_E_MESTRES">Associação de Pais e Mestres</IonSelectOption>
                      <IonSelectOption value="GREMIO_ESTUDANTIL">Grêmio Estudantil</IonSelectOption>
                      <IonSelectOption value="CONSELHO_ESCOLAR">Conselho Escolar</IonSelectOption>
                      <IonSelectOption value="NAO_HA_ORGAOS_COLEGIADOS">Não há órgãos colegiados</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Órgãos colegiados em funcionamento</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="collegiateBodies">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <!-- Critérios de seleção para alunos -->
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="studentSelectionCriteria" label="Critérios de seleção para alunos">
                  <div class="floating-input select-input">
                    <IonSelect
                      v-bind="field"
                      v-model="formValues.studentSelectionCriteria"
                      interface="alert"
                      placeholder="Selecione os critérios"
                      class="select-native"
                      :multiple="true"
                      @ion-change="(e) => { field.onChange(e.detail.value) }"
                    >
                      <IonSelectOption value="ANALISE_CURRICULAR">Análise curricular</IonSelectOption>
                      <IonSelectOption value="EXAME_DE_SELECAO">Exame de seleção</IonSelectOption>
                      <IonSelectOption value="COTAS">Cotas</IonSelectOption>
                    </IonSelect>
                    <label class="floating-label"><span>Critérios de seleção para alunos</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="studentSelectionCriteria">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
            
            <!-- Inputs condicionais -->
            <IonRow v-if="formValues.hasHigherEducationLink">
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="headquartersSchoolCode" label="Código da escola sede" rules="checandoNumero">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.headquartersSchoolCode"
                      type="text"
                      maxlength="10"
                      class="floating-native"
                      placeholder="Código da escola sede"
                    />
                    <label class="floating-label"><span>Código da escola sede</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="headquartersSchoolCode">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="higherEducationInstitutionCode" label="Código da instituição de ensino superior" rules="checandoNumero">
                  <div class="floating-input">
                    <input
                      v-bind="field"
                      v-model="formValues.higherEducationInstitutionCode"
                      type="text"
                      maxlength="10"
                      class="floating-native"
                      placeholder="Código da instituição de ensino superior"
                    />
                    <label class="floating-label"><span>Código da instituição de ensino superior</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="higherEducationInstitutionCode">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
          </div>
        </IonGrid>
      </Form>
    </IonContent>

    <IonFooter>
      <IonToolbar>
        <IonGrid>
          <IonRow class="action-buttons-fixed">
            <IonCol size="6">
              <IonButton type="button" color="danger" expand="block" @click="resetForm()">
                Cancelar
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton
                expand="block"
                type="button"
                :disabled="!saveButtonEnabled"
                @click="handleManualSubmit"
              >
                Salvar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  </IonPage>
</template>

<style scoped>
.page-title {
  font-weight: bold; color: var(--ion-color-secondary);
}

.toolbar-accent {
  height: 4px;
  background-color: var(--ion-color-primary);
}

.custom-segment {
  --background: rgba(var(--ion-color-tertiary-rgb), 0.15);
  --color: var(--ion-color-secondary);
}

.tab-content {
  padding-bottom: 100px;
}

.section-title {
  color: var(--ion-color-secondary);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.placeholder-message {
  text-align: center;
  color: var(--ion-color-medium);
  font-style: italic;
  padding: 2rem;
  background-color: rgba(var(--ion-color-light-rgb), 0.7);
  border-radius: 8px;
  border: 1px dashed var(--ion-color-medium);
}

.section-header {
  margin-top: 24px;
  margin-bottom: 16px;
}

.section-header h2 {
  color: var(--ion-color-secondary);
  font-size: 1.1rem;
  font-weight: 600;
  border-bottom: 1px solid rgba(var(--ion-color-secondary-rgb), 0.3);
  padding-bottom: 8px;
}

.content-with-footer {
  padding-bottom: 80px;
}

.floating-input {
  position: relative;
  border: 1px solid var(--ion-color-primary);
  border-radius: 4px;
  margin-top: 16px;
  height: 56px;
}

.floating-native {
  width: 100%;
  height: 100%;
  padding: 0 16px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: var(--ion-color-dark-tint);
  display: flex;
  align-items: center;
}

.floating-native::placeholder {
  color: transparent;
}

.select-input {
  display: flex;
  align-items: center;
  padding: 0;
}

.select-native {
  width: 100%;
  max-width: 100%;
  --padding-start: 16px;
  --padding-end: 16px;
}

.checkbox-item {
  --background: transparent;
  --padding-start: 0;
  margin-top: 8px;
}

.floating-label {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  background: white;
  padding: 0 4px;
  font-size: 1rem;
  pointer-events: none;
  transition: 0.2s ease all;
  color: var(--ion-color-medium-shade);
}

.floating-native:focus + .floating-label,
.floating-native:not(:placeholder-shown) + .floating-label,
.select-native:not(.select-placeholder) + .floating-label {
  top: -8px;
  transform: translateY(0);
  font-size: 0.75rem;
  color: var(--ion-color-primary);
}

.required-text {
  color: var(--ion-color-danger);
}

.error-message {
  color: var(--ion-color-danger);
  font-size: 0.8rem;
  margin-top: 4px;
  padding-left: 16px;
}

.action-buttons-fixed {
  margin: 0;
  padding: 8px;
}
</style>

