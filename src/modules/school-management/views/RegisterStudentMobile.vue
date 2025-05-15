<script setup lang="ts">
import showToast from '@/utils/toast-alert'
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonModal,
  IonItem,
} from '@ionic/vue'
import { schoolSharp } from 'ionicons/icons'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue'
import RegisterStudentService from '../services/RegisterStudentService'

const props = defineProps<{
  editId?: string
}>()

const emits = defineEmits<{
  (e: 'saved'): void
  (e: 'cancel'): void
}>()

const registerStudentService = new RegisterStudentService()

const addressRef = ref<HTMLTextAreaElement | null>(null)
const formValues = ref({
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  birthdate: '',
  gender: '',
  status: 'ACTIVE',
})

const originalFormValues = ref({
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  birthdate: '',
  gender: '',
  status: 'ACTIVE',
})

const showDatePicker = ref(false)
const hasChanges = ref(false)
const isEditing = computed(() => Boolean(props.editId))
const modalTitle = computed(() => isEditing.value ? 'Editar aluno' : 'Novo aluno')

const saveButtonEnabled = computed(() => {
  if (!isEditing.value) {
    // Para novo registro, pelo menos o nome é obrigatório
    const enabled = !!formValues.value.name
    return enabled
  }

  return hasChanges.value
})

function checkForChanges() {
  if (!isEditing.value)
    return

  // Verifica cada campo para detectar mudanças
  const fields = ['name', 'email', 'phone', 'address', 'birthdate', 'gender', 'status'] as const
  
  hasChanges.value = fields.some(field => 
    formValues.value[field] !== originalFormValues.value[field]
  )
}

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
    console.log('Mobile: Valores do formulário mudaram:', newValues)

    if (isEditing.value) {
      checkForChanges()
    }
  },
  { deep: true, immediate: true },
)

onMounted(async () => {
  if (props.editId) {
    console.log('Mobile: ID do aluno para edição:', props.editId)

    const student = await registerStudentService.getStudentById(props.editId)

    console.log('Mobile: Aluno encontrado:', student)

    if (student) {
      const loadedValues = {
        id: student.id,
        name: student.name,
        email: student.email || '',
        phone: student.phone || '',
        address: student.address || '',
        birthdate: student.birthdate ? new Date(student.birthdate).toISOString().split('T')[0] : '',
        gender: student.gender || '',
        status: student.status || 'ACTIVE',
      }

      formValues.value = { ...loadedValues }
      originalFormValues.value = { ...loadedValues }
      hasChanges.value = false

      autoResizeTextarea()
    }
  }
  else {
    formValues.value = {
      id: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      birthdate: '',
      gender: '',
      status: 'ACTIVE',
    }
    originalFormValues.value = { ...formValues.value }
    hasChanges.value = false
  }
})

async function handleSubmit(values: any) {
  const payload = {
    id: isEditing.value ? props.editId : undefined,
    name: values.name,
    email: values.email || undefined,
    phone: values.phone || undefined,
    address: values.address || undefined,
    birthdate: values.birthdate ? new Date(values.birthdate) : undefined,
    gender: values.gender || undefined,
    status: values.status || 'ACTIVE',
  }

  await registerStudentService.upsertStudent(payload)

  const successMessage = isEditing.value
    ? 'Aluno atualizado com sucesso'
    : 'Novo aluno cadastrado com sucesso'
    
  showToast(successMessage, 'top', 'success')

  handleSaved()
}

function handleCancel() {
  emits('cancel')
}

function handleSaved() {
  emits('saved')
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
    <IonContent class="ion-padding ion-no-padding">
      <div class="style-purple-lane" style="display: flex; align-items: center;">
        <IonIcon :icon="schoolSharp" style="margin-right: 10px;" />
        {{ modalTitle }}
      </div>
      <Form id="student-form-mobile" :key="formValues.id || 'new'" :initial-values="formValues" @submit="handleSubmit">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="name" rules="required|min:3|max:100">
                <IonInput
                  v-bind="field"
                  v-model="formValues.name"
                  label="Nome do aluno"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o nome do aluno"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="field.onInput"
                >
                  <div slot="label" class="required-field">
                    Nome do aluno <span class="required-text">(Obrigatório)</span>
                  </div>
                </IonInput>
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
              <Field v-slot="{ field, errors }" name="email" rules="email">
                <IonInput
                  v-bind="field"
                  v-model="formValues.email"
                  label="Email"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o email do aluno"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="field.onInput"
                />
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
              <Field v-slot="{ field, errors }" name="phone">
                <IonInput
                  v-bind="field"
                  v-model="formValues.phone"
                  label="Telefone"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o telefone do aluno"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="field.onInput"
                />
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
              <Field v-slot="{ field, errors }" name="birthdate">
                <IonInput
                  readonly
                  v-bind="field" 
                  v-model="formValues.birthdate"
                  label="Data de Nascimento"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Selecione a data de nascimento"
                  :class="{ 'has-error': errors.length > 0 }" 
                  @click="showDatePicker = true"
                />
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
              <Field v-slot="{ field, errors }" name="gender">
                <IonSelect
                  v-bind="field"
                  v-model="formValues.gender"
                  label="Gênero"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Selecione o gênero"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-change="field.onInput"
                >
                  <IonSelectOption value="M">Masculino</IonSelectOption>
                  <IonSelectOption value="F">Feminino</IonSelectOption>
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
              <Field v-slot="{ field, errors }" name="status">
                <IonSelect
                  v-bind="field"
                  v-model="formValues.status"
                  label="Status"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Selecione o status"
                  :class="{ 'has-error': errors.length > 0 }"
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

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="address">
                <IonTextarea
                  v-bind="field"
                  ref="addressRef"
                  v-model="formValues.address"
                  label="Endereço"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o endereço"
                  :class="{ 'has-error': errors.length > 0 }"
                  :auto-grow="true"
                  @ion-input="(event) => {
                    field.onInput(event);
                    autoResizeTextarea();
                  }"
                />
                <ErrorMessage v-slot="{ message }" name="address">
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

    <div>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonButton color="danger" expand="block" @click="handleCancel()">
              Cancelar
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton expand="block" type="submit" form="student-form-mobile" :disabled="!saveButtonEnabled">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>

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
.style-purple-lane {
  background: rgba(var(--ion-color-secondary-rgb), 0.15);
  color: var(--ion-color-secondary);
  padding: 2px;
  margin: 8px 2px;
  border-radius: 4px;
}

.lane-icon {
  margin-right: 10px;
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

ion-input.has-error,
ion-textarea.has-error,
ion-select.has-error {
  --border-color: var(--ion-color-danger);
}

.date-modal {
  --height: auto;
  --width: 290px;
  --border-radius: 8px;
}
</style>
