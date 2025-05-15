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
} from '@ionic/vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, nextTick, onMounted, ref, watchEffect, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RegisterStudentService from '../services/RegisterStudentService'

const route = useRoute()
const router = useRouter()
const registerStudentService = new RegisterStudentService()

const initialFormValues = { 
  id: '', 
  name: '', 
  email: '', 
  phone: '', 
  address: '', 
  birthdate: '', 
  gender: '', 
  status: 'ACTIVE',
  schoolId: '',
}

const formValues = ref({ ...initialFormValues })
const originalFormValues = ref({ ...initialFormValues })
const isEditing = ref(false)
const studentId = computed(() => route.params.id as string | undefined)
const pageTitle = computed(() => isEditing.value ? 'Editar aluno' : 'Novo aluno')
const addressRef = ref<HTMLTextAreaElement | null>(null)
const hasChanges = ref(false)
const showDatePicker = ref(false)
const dateValue = ref('')

// Função para verificar se houve mudanças nos campos
function checkForChanges() {
  if (!isEditing.value) return;
  
  // Verifica cada campo para determinar se houve mudanças
  const keys = Object.keys(formValues.value) as (keyof typeof formValues.value)[];
  hasChanges.value = keys.some(key => formValues.value[key] !== originalFormValues.value[key]);
}

const saveButtonEnabled = computed(() => {
  if (!isEditing.value) {
    // Para um novo cadastro, verifica se pelo menos os campos obrigatórios estão preenchidos
    const enabled = !!formValues.value.name;
    return enabled;
  }
  
  return hasChanges.value;
})

watchEffect(() => {
  if (formValues.value.address) {
    nextTick(() => {
      autoResizeTextarea()
    })
  }
})

watch(
  () => ({ ...formValues.value }),
  (newValues) => {
    console.log('Valores do formulário mudaram:', newValues);
    
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
      // Armazena os valores originais
      const loadedValues = { 
        id: student.id, 
        name: student.name, 
        email: student.email || '', 
        phone: student.phone || '',
        address: student.address || '',
        birthdate: student.birthdate ? new Date(student.birthdate).toISOString().split('T')[0] : '',
        gender: student.gender || '',
        status: student.status || 'ACTIVE',
        schoolId: student.schoolId || ''
      };
      
      formValues.value = { ...loadedValues };
      originalFormValues.value = { ...loadedValues };
      hasChanges.value = false; 
      
      autoResizeTextarea();
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
    address: values.address || null,
    birthdate: values.birthdate ? new Date(values.birthdate) : undefined,
    gender: values.gender || null,
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

function autoResizeTextarea() {
  const el = addressRef.value
  if (el) {
    el.style.height = '80px'
    el.style.height = 'auto'
    el.style.height = `${Math.max(80, el.scrollHeight)}px`
  }
}

function handleDateChange(event: CustomEvent) {
  const selectedDate = event.detail.value;
  if (selectedDate) {
    formValues.value.birthdate = selectedDate.split('T')[0];
  }
  showDatePicker.value = false;
}
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
    </IonHeader>

    <IonContent :scroll-y="true" class="ion-padding content-with-footer">
      <Form id="student-form" :initial-values="formValues" :key="formValues.id || 'new'" @submit="handleSubmit">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="name" label="Nome do aluno" rules="required|min:3|max:100">
                <div class="floating-input">
                  <input 
                    v-bind="field" 
                    v-model="formValues.name"
                    type="text" 
                    class="floating-native" 
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

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="phone">
                <div class="floating-input">
                  <input 
                    v-bind="field" 
                    v-model="formValues.phone"
                    type="tel" 
                    class="floating-native" 
                    placeholder=" "
                    maxlength="15"
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Telefone</span></label>
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
              <Field v-slot="{ field }" name="address">
                <div class="description-input">
                  <textarea
                    v-bind="field"
                    ref="addressRef"
                    class="description-native"
                    placeholder=" "
                    v-model="formValues.address"
                    @input="(event) => {
                      field.onInput(event);
                      autoResizeTextarea();
                    }"
                  />
                  <label class="floating-label top-label"><span>Endereço</span></label>
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
            <IonCol size="12">
              <Field v-slot="{ field }" name="birthdate">
                <div class="floating-input">
                  <input 
                    readonly
                    v-bind="field" 
                    v-model="formValues.birthdate"
                    type="text" 
                    class="floating-native" 
                    placeholder=" "
                    @click="showDatePicker = true"
                  >
                  <label class="floating-label"><span>Data de Nascimento</span></label>
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
              <Field v-slot="{ field }" name="gender">
                <div class="floating-input">
                  <select 
                    v-bind="field" 
                    v-model="formValues.gender"
                    class="floating-native" 
                    @input="field.onInput"
                  >
                    <option value=""></option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMININO">Feminino</option>
                  </select>
                  <label class="floating-label"><span>Gênero</span></label>
                </div>
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
              <Field v-slot="{ field }" name="status">
                <div class="floating-input">
                  <select 
                    v-bind="field" 
                    v-model="formValues.status"
                    class="floating-native" 
                    @input="field.onInput"
                  >
                    <option value="ACTIVE">Ativo</option>
                    <option value="INACTIVE">Inativo</option>
                    <option value="GRADUATED">Formado</option>
                    <option value="SUSPENDED">Suspenso</option>
                    <option value="TRANSFERRED">Transferido</option>
                  </select>
                  <label class="floating-label"><span>Status</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="status">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>
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
</style>
