<script setup lang="ts">
import showToast from '@/utils/toast-alert'
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonModal,
  IonItem,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
} from '@ionic/vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, nextTick, onMounted, ref, watchEffect, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RegisterStudentService from '../services/RegisterStudentService'
import { personOutline, homeOutline, callOutline, peopleOutline } from 'ionicons/icons'

const route = useRoute()
const router = useRouter()
const registerStudentService = new RegisterStudentService()

const initialFormValues = { 
  id: '', 
  name: '', 
  email: '', 
  phone: '', 
  // Informações cadastrais
  birthdate: '',
  gender: '',
  nationality: '',
  birthCity: '',
  birthState: '',
  ethnicity: '',
  documentType: '',
  documentNumber: '',
  rgEmissor: '',
  rgState: '',
  rgIssueDate: '',
  certidaoFolha: '',
  certidaoLivro: '',
  nisNumero: '',
  // Endereço
  zipCode: '',
  city: '',
  state: '',
  street: '',
  number: '',
  neighborhood: '',
  zone: '',
  complement: '',
  // Responsável
  responsibleType: '', 
  guardianName: '',
  guardianRelationship: '',
  guardianCpf: '',
  guardianPhone: '',
  guardianEmail: '',
  fatherName: '',
  fatherCpf: '',
  fatherPhone: '',
  fatherEmail: '',
  motherName: '',
  motherCpf: '',
  motherPhone: '',
  motherEmail: '',
  status: 'ACTIVE',
  schoolId: '',
  classId: '',
  gradeId: '',
  shiftId: '',
}

const formValues = ref({ ...initialFormValues })
const originalFormValues = ref({ ...initialFormValues })
const isEditing = ref(false)
const studentId = computed(() => route.params.id as string | undefined)
const pageTitle = computed(() => isEditing.value ? 'Editar aluno' : 'Novo aluno')
const hasChanges = ref(false)
const showDatePicker = ref(false)

// Controle de abas
const activeTab = ref('personal')

const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

// Etapas do formulário
const tabs = [
  { id: 'personal', label: 'Informações Cadastrais', icon: personOutline },
  { id: 'address', label: 'Endereço', icon: homeOutline },
  { id: 'contact', label: 'Contato', icon: callOutline },
  { id: 'matricula', label: 'Matrícula', icon: peopleOutline },
]

function checkForChanges() {
  if (!isEditing.value) return;
  
  const keys = Object.keys(formValues.value) as (keyof typeof formValues.value)[];
  hasChanges.value = keys.some(key => formValues.value[key] !== originalFormValues.value[key]);
}

const saveButtonEnabled = computed(() => {
  if (!isEditing.value) {
    const enabled = !!formValues.value.name;
    return enabled;
  }
  
  return hasChanges.value;
})

watch(
  () => ({ ...formValues.value }),
  () => {
    if (isEditing.value) {
      checkForChanges();
    }
  },
  { deep: true, immediate: true }
)

onMounted(async () => {
  if (studentId.value) {
    console.log('ID do aluno para edição:', studentId.value)

    isEditing.value = true
    const student = await registerStudentService.getStudentById(studentId.value)

    console.log('Aluno encontrado:', student)
    
    if (student) {
      const loadedValues = { 
        ...initialFormValues,
        id: student.id, 
        name: student.name, 
        email: student.email || '', 
        phone: student.phone || '',
        birthdate: student.birthdate ? new Date(student.birthdate).toISOString().split('T')[0] : '',
        gender: student.gender || '',
        status: student.status || 'ACTIVE',
        schoolId: student.schoolId || ''
      };
      
      if (student.address) {
        loadedValues.street = student.address;
      }
      
      if (student.city) {
        loadedValues.city = student.city;
      }
      
      if (student.citystate) {
        loadedValues.state = student.citystate;
      }
      
      if (student.postalCode) {
        loadedValues.zipCode = student.postalCode;
      }
      
      if (student.numberAddress) {
        loadedValues.number = student.numberAddress;
      }
      
      if (student.neighborhood) {
        loadedValues.neighborhood = student.neighborhood;
      }
      
      if (student.complement) {
        loadedValues.complement = student.complement;
      }
      
      if (student.residenceZone) {
        loadedValues.zone = student.residenceZone;
      }
      
      formValues.value = { ...loadedValues };
      originalFormValues.value = { ...loadedValues };
      hasChanges.value = false;
    }
  } else {
    formValues.value = { ...initialFormValues };
    originalFormValues.value = { ...initialFormValues };
    hasChanges.value = false;
  }
})

async function handleSubmit(values: any) {
  const payload = {
    id: isEditing.value ? studentId.value : undefined,
    name: values.name,
    email: values.email || null,
    phone: values.phone || null,
    birthdate: values.birthdate ? new Date(values.birthdate) : undefined,
    gender: values.gender || null,
    
    // Informações cadastrais
    nationality: values.nationality || null,
    birthCity: values.birthCity || null,
    birthState: values.birthState || null,
    ethnicity: values.ethnicity || null,
    documentType: values.documentType || null,
    documentNumber: values.documentNumber || null,
    
    // Endereço
    postalCode: values.zipCode || null, 
    city: values.city || null,
    citystate: values.state || null, 
    address: values.street || null, 
    numberAddress: values.number || null,
    neighborhood: values.neighborhood || null,
    residenceZone: values.zone || null, 
    complement: values.complement || null,
    
    // Responsável
    responsibleType: values.responsibleType || 'GUARDIAN',
    guardianName: values.guardianName || null,
    guardianRelationship: values.guardianRelationship || null,
    guardianCpf: values.guardianCpf || null,
    guardianPhone: values.guardianPhone || null,
    guardianEmail: values.guardianEmail || null,
    fatherName: values.fatherName || null,
    fatherCpf: values.fatherCpf || null,
    fatherPhone: values.fatherPhone || null,
    fatherEmail: values.fatherEmail || null,
    motherName: values.motherName || null,
    motherCpf: values.motherCpf || null,
    motherPhone: values.motherPhone || null,
    motherEmail: values.motherEmail || null,
    
    status: values.status || 'ACTIVE',
    schoolId: values.schoolId || null
  }

  await registerStudentService.upsertStudent(payload)

  const successMessage = isEditing.value
    ? 'Aluno atualizado com sucesso'
    : 'Novo aluno cadastrado com sucesso'
    
  showToast(successMessage, 'top', 'success')

  router.push({ 
    name: 'StudentListStudent',
    query: { refresh: Date.now().toString() } 
  })
}

function resetForm() {
  router.back()
}

function handleDateChange(event: CustomEvent) {
  const selectedDate = event.detail.value;
  if (selectedDate) {
    formValues.value.birthdate = selectedDate.split('T')[0];
  }
  showDatePicker.value = false;
}

async function buscarEndereco(cep: string) {
  
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const form = ref<any>(null);

watch(() => formValues.value.zipCode, async (novoCep) => {
  const cepLimpo = String(novoCep).replace(/\D/g, '');
  if (cepLimpo && cepLimpo.length === 8) {
    const endereco = await buscarEndereco(cepLimpo);
    if (endereco) {
      formValues.value.street = endereco.logradouro;
      formValues.value.neighborhood = endereco.bairro;
      formValues.value.city = endereco.localidade;
      formValues.value.state = endereco.uf;

      if (form.value) {
        form.value.setFieldValue('street', endereco.logradouro);
        form.value.setFieldValue('neighborhood', endereco.bairro);
        form.value.setFieldValue('city', endereco.localidade);
        form.value.setFieldValue('state', endereco.uf);
      }
    }
  }
});

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
      <Form ref="form" @submit="handleSubmit" :initial-values="formValues" v-slot="{handleSubmit}">
        <IonGrid class="tab-content">
          <!-- Aba 1: Informações Cadastrais -->
          <div v-show="activeTab === 'personal'">
            <h4 class="section-title">Informações Cadastrais</h4>
            
            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="name" label="Nome do aluno" rules="required|min:3|max:100">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.name"
                      type="text" 
                      class="floating-native" 
                      maxlength="101"
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>Nome do aluno </span><span class="required-text">(Obrigatório)</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="name">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="birthdate" rules="required|notFuture">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.birthdate"
                      type="date" 
                      class="floating-native" 
                      placeholder=" "
                    >
                    <label class="floating-label"><span>Data de Nascimento </span><span class="required-text">(Obrigatório)</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="birthdate">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="gender" label="Gênero" rules="required">
                  <IonSelect
                    v-bind="field" 
                    v-model="formValues.gender"
                    interface="popover"
                    label="Gênero (Obrigatório)"
                    label-placement="floating"
                    cancel-text="Cancelar"
                    fill="outline"
                    class="ion-select-card-content"
                    @ion-change="field.onInput"
                  >
                    <IonSelectOption value="MASCULINO">Masculino</IonSelectOption>
                    <IonSelectOption value="FEMININO">Feminino</IonSelectOption>
                  </IonSelect>
                  <ErrorMessage v-slot="{ message }" name="gender">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="nationality" label="Nacionalidade">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.nationality"
                      type="text" 
                      class="floating-native" 
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>Nacionalidade</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="nationality">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="birthCity" label="Cidade de Nascimento">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.birthCity"
                      type="text" 
                      class="floating-native" 
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>Cidade de Nascimento</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="birthCity">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="birthState" label="UF de Nascimento">
                  <IonSelect
                    v-bind="field" 
                    v-model="formValues.birthState"
                    interface="popover"
                    label="UF de Nascimento"
                    label-placement="floating"
                    cancel-text="Cancelar"
                    fill="outline"
                    class="ion-select-card-content"
                    @ion-change="field.onInput"
                  >
                    <IonSelectOption v-for="state in brazilianStates" :key="state" :value="state">
                      {{ state }}
                    </IonSelectOption>
                  </IonSelect>
                  <ErrorMessage v-slot="{ message }" name="birthState">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="ethnicity" label="Raça/Etnia" rules="required">
                  <IonSelect
                    v-bind="field" 
                    v-model="formValues.ethnicity"
                    interface="popover"
                    label="Raça/Etnia (Obrigatório)"
                    label-placement="floating"
                    cancel-text="Cancelar"
                    fill="outline"
                    class="ion-select-card-content"
                    @ion-change="field.onInput"
                  >
                    <IonSelectOption value="BRANCO">Branco</IonSelectOption>
                    <IonSelectOption value="PRETO">Preto</IonSelectOption>
                    <IonSelectOption value="PARDO">Pardo</IonSelectOption>
                    <IonSelectOption value="AMARELO">Amarelo</IonSelectOption>
                    <IonSelectOption value="INDIGENA">Indígena</IonSelectOption>
                    <IonSelectOption value="NAODECLARADA">Não declarada</IonSelectOption>
                  </IonSelect>
                  <ErrorMessage v-slot="{ message }" name="ethnicity">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="documentType" label="Tipo de Documento" rules="required">
                  <IonSelect
                    v-bind="field" 
                    v-model="formValues.documentType"
                    label="Tipo de Documento (Obrigatório)"
                    interface="popover"
                    label-placement="floating"
                    cancel-text="Cancelar"
                    fill="outline"
                    class="ion-select-card-content"
                    @ion-change="field.onInput"
                  >
                    <IonSelectOption value="RG">RG</IonSelectOption>
                    <IonSelectOption value="CPF">CPF</IonSelectOption>
                    <IonSelectOption value="NIS">NIS</IonSelectOption>
                    <IonSelectOption value="CERTIDAO">Certidão de Nascimento</IonSelectOption>
                  </IonSelect>
                  <ErrorMessage v-slot="{ message }" name="documentType">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              <!-- Campo CPF - exibido somente quando CPF for selecionado --> 
              <IonCol size="12" size-md="6" v-if="formValues.documentType === 'CPF'">
                <Field v-slot="{ field }" name="documentNumber" rules="required">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.documentNumber"
                      v-imask="{ mask: '000.000.000-00' }"
                      type="text" 
                      class="floating-native" 
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>CPF</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="documentNumber">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>

              <!-- Campos RG - exibidos somente quando RG for selecionado -->
              <template v-if="formValues.documentType === 'RG'">
                <IonCol size="12" size-md="6">
                  <Field v-slot="{ field }" name="documentNumber">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.documentNumber"
                        type="text" 
                        class="floating-native" 
                        placeholder=" "
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Número do RG</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="documentNumber">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
                <IonCol size="12" size-md="6">
                  <Field v-slot="{ field }" name="rgIssueDate" rules="notFuture">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.rgIssueDate"
                        type="date" 
                        class="floating-native" 
                        placeholder=" "
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Data de expedição</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="rgIssueDate">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
                <IonCol size="12" size-md="6">
                  <Field v-slot="{ field }" name="rgState">
                    <IonSelect
                      v-bind="field" 
                      v-model="formValues.rgState"
                      interface="popover"
                      label="Estado emissor"
                      label-placement="floating"
                      cancel-text="Cancelar"
                      fill="outline"
                      class="ion-select-card-content"
                      @ion-change="field.onInput"
                    >
                      <IonSelectOption v-for="state in brazilianStates" :key="state" :value="state">
                        {{ state }}
                      </IonSelectOption>
                    </IonSelect>
                    <ErrorMessage v-slot="{ message }" name="rgState">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
                <IonCol size="12" size-md="6">
                  <Field v-slot="{ field }" name="rgEmissor">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.rgEmissor"
                        type="text" 
                        class="floating-native" 
                        placeholder=" "
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Órgão emissor</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="rgEmissor">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </template>

              <!-- Campos NIS - exibidos somente quando NIS for selecionado -->
              <IonCol size="12" size-md="6" v-if="formValues.documentType === 'NIS'">
                <Field v-slot="{ field }" name="nisNumero">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.nisNumero"
                      type="text" 
                      class="floating-native" 
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>Número de Identificação Social (NIS)</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="nisNumero">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>

              <!-- Campos Certidão de Nascimento - exibidos somente quando CERTIDAO for selecionado -->
              <template v-if="formValues.documentType === 'CERTIDAO'">
                <IonCol size="12" size-md="6">
                  <Field v-slot="{ field }" name="documentNumber">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.documentNumber"
                        type="text" 
                        class="floating-native" 
                        placeholder=" "
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Número certidão de nascimento</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="documentNumber">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
                <IonCol size="12" size-md="6">
                  <Field v-slot="{ field }" name="certidaoFolha">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.certidaoFolha"
                        type="text" 
                        class="floating-native" 
                        placeholder=" "
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Folha certidão de nascimento</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="certidaoFolha">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
                <IonCol size="12" size-md="6">
                  <Field v-slot="{ field }" name="certidaoLivro">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.certidaoLivro"
                        type="text" 
                        class="floating-native" 
                        placeholder=" "
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Livro certidão de nascimento</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="certidaoLivro">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </template>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="status">
                  <IonSelect
                    v-bind="field" 
                    v-model="formValues.status"
                    interface="popover"
                    label="Status"
                    label-placement="floating"
                    cancel-text="Cancelar"
                    fill="outline"
                    class="ion-select-card-content"
                    @ion-change="field.onInput"
                  >
                    <IonSelectOption value="ACTIVE">Ativo</IonSelectOption>
                    <IonSelectOption value="INACTIVE">Inativo</IonSelectOption>
                    <IonSelectOption value="GRADUATED">Formado</IonSelectOption>
                    <IonSelectOption value="SUSPENDED">Suspenso</IonSelectOption>
                    <IonSelectOption value="TRANSFERRED">Transferido</IonSelectOption>
                  </IonSelect>
                  <ErrorMessage v-slot="{ message }" name="status">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
          </div>

          <!-- Aba 2: Endereço -->
          <div v-show="activeTab === 'address'">
            <h4 class="section-title">Endereço</h4>
            
            <IonRow>
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="zipCode" label="CEP" rules="required|cep" >
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.zipCode"
                      v-imask="{ mask: '00000-000' }"
                      type="text" 
                      class="floating-native" 
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>CEP </span><span class="required-text">(Obrigatório)</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="zipCode">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="8">
                <Field v-slot="{ field }" name="city">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.city"
                      type="text" 
                      class="floating-native" 
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>Cidade</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="city">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="state">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.state"
                      type="text" 
                      class="floating-native" 
                      placeholder=" "
                      maxlength="2"
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>UF</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="state">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="street">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.street"
                      type="text" 
                      class="floating-native" 
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>Logradouro</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="street">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="4">
                <Field v-slot="{ field }" name="number" label="Número">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.number"
                      type="text" 
                      class="floating-native" 
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>Número</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="number">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
              <IonCol size="12" size-md="8">
                <Field v-slot="{ field }" name="neighborhood">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.neighborhood"
                      type="text" 
                      class="floating-native" 
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>Bairro</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="neighborhood">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="zone">
                  <IonSelect
                    v-bind="field" 
                    v-model="formValues.zone"
                    interface="popover"
                    label="Zona"
                    label-placement="floating"
                    cancel-text="Cancelar"
                    fill="outline"
                    class="ion-select-card-content"
                    @ion-change="field.onInput"
                  >
                    <IonSelectOption value="URBANA">Urbana</IonSelectOption>
                    <IonSelectOption value="RURAL">Rural</IonSelectOption>
                  </IonSelect>
                  <ErrorMessage v-slot="{ message }" name="zone">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="complement">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.complement"
                      type="text" 
                      class="floating-native" 
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>Complemento</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="complement">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
          </div>

          <!-- Aba 3: Informações de Contato -->
          <div v-show="activeTab === 'contact'">
            <h4 class="section-title">Informações de Contato</h4>
            
            <IonRow>
              <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="phone" label="Telefone" rules="required|phone">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.phone"
                      v-imask="{ mask: '(00) 00000-0000' }"
                      type="tel" 
                      class="floating-native" 
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>Telefone </span><span class="required-text">(Obrigatório)</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="phone">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="email" rules="email">
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.email"
                      type="email" 
                      class="floating-native" 
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>Email</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="email">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <div class="section-separator">
            <h4 class="section-title">Informações do Responsável</h4>
          </div>
            
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="responsibleType" label="Grau de parentesco" rules="required">
                <IonSelect
                    v-bind="field" 
                    v-model="formValues.responsibleType"
                    interface="popover"
                    label="Grau de parentesco (Obrigatório)"
                    label-placement="floating"
                    cancel-text="Cancelar"
                    fill="outline"
                    class="ion-select-card-content"
                    @ion-change="field.onInput"
                  >
                    <IonSelectOption value="GUARDIAN">Guardião</IonSelectOption>
                    <IonSelectOption value="PAI">Pai</IonSelectOption>
                    <IonSelectOption value="MAE">Mãe</IonSelectOption>
                  </IonSelect>
                  <ErrorMessage v-slot="{ message }" name="responsibleType">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <!-- Campos do responsável legal -->
            <div v-show="formValues.responsibleType === 'GUARDIAN'">
              <IonRow>
                <IonCol size="12">
                  <Field v-slot="{ field }" name="guardianName" rules="min:3">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.guardianName"
                        type="text" 
                        class="floating-native" 
                        placeholder=" "
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Nome do Responsável</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="guardianName">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <Field v-slot="{ field }" name="guardianCpf">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.guardianCpf"
                        type="text" 
                        class="floating-native" 
                        placeholder=" "
                        maxlength="14"
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>CPF</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="guardianCpf">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <Field v-slot="{ field }" name="guardianPhone">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.guardianPhone"
                        type="tel" 
                        class="floating-native" 
                        placeholder=" "
                        maxlength="15"
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Telefone</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="guardianPhone">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <Field v-slot="{ field }" name="guardianEmail" rules="email">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.guardianEmail"
                        type="email" 
                        class="floating-native" 
                        placeholder=" "
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Email</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="guardianEmail">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </IonRow>
            </div>

            <!-- Campos do pai (exibidos quando responsibleType = PAI) -->
            <div v-show="formValues.responsibleType === 'PAI'">
              <IonRow>
                <IonCol size="12">
                  <Field v-slot="{ field }" name="fatherName" rules="min:3">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.fatherName"
                        type="text" 
                        class="floating-native" 
                        placeholder=" "
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Nome do Pai</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="fatherName">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <Field v-slot="{ field }" name="fatherCpf">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.fatherCpf"
                        type="text" 
                        class="floating-native" 
                        placeholder=" "
                        maxlength="14"
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>CPF</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="fatherCpf">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <Field v-slot="{ field }" name="fatherPhone">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.fatherPhone"
                        type="tel" 
                        class="floating-native" 
                        placeholder=" "
                        maxlength="15"
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Telefone</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="fatherPhone">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <Field v-slot="{ field }" name="fatherEmail" rules="email">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.fatherEmail"
                        type="email" 
                        class="floating-native" 
                        placeholder=" "
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Email</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="fatherEmail">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </IonRow>
            </div>

            <!-- Campos da mãe (exibidos quando responsibleType = MAE) -->
            <div v-show="formValues.responsibleType === 'MAE'">
              <IonRow>
                <IonCol size="12">
                  <Field v-slot="{ field }" name="motherName" rules="min:3">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.motherName"
                        type="text" 
                        class="floating-native" 
                        placeholder=" "
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Nome da Mãe</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="motherName">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <Field v-slot="{ field }" name="motherCpf">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.motherCpf"
                        type="text" 
                        class="floating-native" 
                        placeholder=" "
                        maxlength="14"
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>CPF</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="motherCpf">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <Field v-slot="{ field }" name="motherPhone">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.motherPhone"
                        type="tel" 
                        class="floating-native" 
                        placeholder=" "
                        maxlength="15"
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Telefone</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="motherPhone">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <Field v-slot="{ field }" name="motherEmail" rules="email">
                    <div class="floating-input">
                      <input 
                        v-bind="field" 
                        v-model="formValues.motherEmail"
                        type="email" 
                        class="floating-native" 
                        placeholder=" "
                        @input="field.onInput"
                      >
                      <label class="floating-label"><span>Email</span></label>
                    </div>
                    <ErrorMessage v-slot="{ message }" name="motherEmail">
                      <div class="error-message">
                        {{ message }}
                      </div>
                    </ErrorMessage>
                  </Field>
                </IonCol>
              </IonRow>
            </div>
          </div>

        <!-- Aba 4: Matrícula -->
        <div v-show="activeTab === 'matricula'">
            <h4 class="section-title">Matrícula</h4>
            
            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="schoolId" rules="required">
                  <IonSelect
                    v-bind="field" 
                    v-model="formValues.schoolId"
                    interface="popover"
                    label="Selecionar escola (Obrigatório)"
                    label-placement="floating"
                    cancel-text="Cancelar"
                    fill="outline"
                    class="ion-select-card-content"
                    @ion-change="field.onInput"
                  >
                    <IonSelectOption value="1">Escola Municipal João da Silva</IonSelectOption>
                    <IonSelectOption value="2">Escola Estadual Maria José</IonSelectOption>
                    <IonSelectOption value="3">Colégio Aplicativo</IonSelectOption>
                  </IonSelect>
                  <ErrorMessage v-slot="{ message }" name="schoolId">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="classId" rules="required">
                  <IonSelect
                    v-bind="field" 
                    v-model="formValues.classId"
                    interface="popover"
                    label="Selecionar turma (Obrigatório)"
                    label-placement="floating"
                    cancel-text="Cancelar"
                    fill="outline"
                    class="ion-select-card-content"
                    @ion-change="field.onInput"
                  >
                    <IonSelectOption value="1">Turma A</IonSelectOption>
                    <IonSelectOption value="2">Turma B</IonSelectOption>
                    <IonSelectOption value="3">Turma C</IonSelectOption>
                  </IonSelect>
                  <ErrorMessage v-slot="{ message }" name="classId">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="gradeId" rules="required">
                  <IonSelect
                    v-bind="field" 
                    v-model="formValues.gradeId"
                    interface="popover"
                    label="Selecionar série (Obrigatório)"
                    label-placement="floating"
                    cancel-text="Cancelar"
                    fill="outline"
                    class="ion-select-card-content"
                    @ion-change="field.onInput"
                  >
                    <IonSelectOption value="1">1º Ano</IonSelectOption>
                    <IonSelectOption value="2">2º Ano</IonSelectOption>
                    <IonSelectOption value="3">3º Ano</IonSelectOption>
                    <IonSelectOption value="4">4º Ano</IonSelectOption>
                    <IonSelectOption value="5">5º Ano</IonSelectOption>
                  </IonSelect>
                  <ErrorMessage v-slot="{ message }" name="gradeId">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="shiftId" rules="required">
                  <IonSelect
                    v-bind="field" 
                    v-model="formValues.shiftId"
                    interface="popover"
                    label="Selecionar turno (Obrigatório)"
                    label-placement="floating"
                    cancel-text="Cancelar"
                    fill="outline"
                    class="ion-select-card-content"
                    @ion-change="field.onInput"
                  >
                    <IonSelectOption value="1">Matutino</IonSelectOption>
                    <IonSelectOption value="2">Vespertino</IonSelectOption>
                    <IonSelectOption value="3">Noturno</IonSelectOption>
                    <IonSelectOption value="4">Integral</IonSelectOption>
                  </IonSelect>
                  <ErrorMessage v-slot="{ message }" name="shiftId">
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
              <IonButton color="danger" expand="block" @click="resetForm">
                Cancelar
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton expand="block" type="submit" form="student-form" :disabled="!saveButtonEnabled">
                Salvar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>

    <IonModal :is-open="showDatePicker" class="date-modal">
      <IonDatetime
        presentation="date"
        :value="formValues.birthdate"
        @ionChange="handleDateChange"
      ></IonDatetime>
      <IonItem lines="none" class="ion-text-center">
        <IonButton slot="end" @click="showDatePicker = false">Fechar</IonButton>
      </IonItem>
    </IonModal>
  </IonPage>
</template>

<style scoped>
.page-title {
  font-weight: bold; color: var(--ion-color-secondary);
}

.custom-segment {
  --background: rgba(var(--ion-color-tertiary-rgb), 0.15);
  --color: var(--ion-color-secondary);
}

.section-title {
  color: var(--ion-color-secondary);
  margin: 16px 0;
  font-size: 1.1rem;
  font-weight: 600;
  border-bottom: 1px solid rgba(var(--ion-color-secondary-rgb), 0.3);
  padding-bottom: 8px;
}

.toolbar-accent { height: 4px; background-color: var(--ion-color-primary); }
.content-with-footer { padding-bottom: 80px; }
.floating-input { position: relative; border: 1px solid var(--ion-color-primary); border-radius: 4px; margin-top: 16px; height: 56px; }
.floating-native { width:100%; height:100%; padding:0 16px; border:none; outline:none; background:transparent; font-size:1rem; color:var(--ion-color-dark-tint); display:flex; align-items:center; }
.floating-native::placeholder { color:transparent; }
.description-input { position:relative; border:1px solid var(--ion-color-primary); border-radius:4px; margin-top:16px; min-height:80px; }
.description-native { width:100%; height:auto; padding:8px 16px 6px; border:none; outline:none; background:transparent; font-size:1rem; color:var(--ion-color-dark-tint); overflow:hidden; resize:none; }
.description-native::placeholder { color:transparent; }
.floating-label { position:absolute; top:50%; left:16px; transform:translateY(-50%); background:white; padding:0 4px; font-size:1rem; pointer-events:none; transition:0.2s ease all; color:var(--ion-color-medium-shade); }
.top-label { top:8px; transform:translateY(0); }
.floating-native:focus + .floating-label, .floating-native:not(:placeholder-shown) + .floating-label, .description-native:focus + .floating-label, .description-native:not(:placeholder-shown) + .floating-label { top:-8px; transform:translateY(0); font-size:0.75rem; color:var(--ion-color-primary); }
.required-text { color:var(--ion-color-danger); }
.error-message { color:var(--ion-color-danger); font-size:0.8rem; margin-top:4px; }
.action-buttons-fixed { margin: 0; padding: 8px; }
.date-modal {
  --height: auto;
  --width: 290px;
  --border-radius: 8px;
}
/* Estilos para os componentes IonSelect */
.ion-select-card-content {
  --border-color: var(--ion-color-secondary);
  --placeholder-color: var(--ion-color-secondary);
  --placeholder-opacity: 1;
  width: 100%;
  margin-top: 16px;
}

.ion-select-card-content::part(text) {
  flex: 0 0 auto;
}

.ion-select-card-content::part(text) {
  color: var(--ion-color-secondary);
  background-color: rgba(79, 41, 116, 0.1);
  border-radius: 16px;
  padding: 2px 8px;
  display: inline-block;
}

.ion-select-card-content::part(icon) {
  color: var(--ion-color-secondary);
  opacity: 1;
}
</style>
