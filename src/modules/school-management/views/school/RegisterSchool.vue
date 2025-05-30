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
          <div v-if="activeTab === 'infraestrutura'">
            <h4 class="section-title">Infraestrutura</h4>
            <IonRow>
              <IonCol size="12">
                <p class="placeholder-message">Configurações de infraestrutura serão implementadas em breve.</p>
              </IonCol>
            </IonRow>
          </div>
          
          <!-- Aba 2: Infraestrutura -->
          <div v-show="activeTab === 'infraestrutura'">
            <h4 class="section-title">Infraestrutura</h4>
            <IonRow>
              <IonCol size="12">
                <p class="placeholder-message">Configurações de infraestrutura serão implementadas em breve.</p>
              </IonCol>
            </IonRow>
          </div>
          
          <!-- Aba 3: Dependências -->
          <div v-show="activeTab === 'dependencias'">
            <h4 class="section-title">Dependências</h4>
            <IonRow>
              <IonCol size="12">
                <p class="placeholder-message">Configurações de dependências serão implementadas em breve.</p>
              </IonCol>
            </IonRow>
          </div>
          
          <!-- Aba 4: Equipamentos -->
          <div v-show="activeTab === 'equipamentos'">
            <h4 class="section-title">Equipamentos</h4>
            <IonRow>
              <IonCol size="12">
                <p class="placeholder-message">Configurações de equipamentos serão implementadas em breve.</p>
              </IonCol>
            </IonRow>
          </div>
          
          <!-- Aba 5: RH -->
          <div v-show="activeTab === 'rh'">
            <h4 class="section-title">Recursos Humanos</h4>
            <IonRow>
              <IonCol size="12">
                <p class="placeholder-message">Configurações de recursos humanos serão implementadas em breve.</p>
              </IonCol>
            </IonRow>
          </div>
          
          <!-- Aba 6: Dados do ensino -->
          <div v-show="activeTab === 'dadosEnsino'">
            <h4 class="section-title">Dados do Ensino</h4>
            <IonRow>
              <IonCol size="12">
                <p class="placeholder-message">Configurações de dados do ensino serão implementadas em breve.</p>
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

