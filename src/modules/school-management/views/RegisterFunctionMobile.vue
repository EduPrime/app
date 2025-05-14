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
} from '@ionic/vue'
import { personSharp } from 'ionicons/icons'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue'
import ServerFunctionService from '../services/ServerFunctionService'

const props = defineProps<{
  editId?: string
}>()

const emits = defineEmits<{
  (e: 'saved'): void
  (e: 'cancel'): void
}>()

const serverFunctionService = new ServerFunctionService()

const descriptionRef = ref<HTMLTextAreaElement | null>(null)
const formValues = ref({
  id: '',
  name: '',
  abbreviation: '',
  description: '',
})

const originalFormValues = ref({
  id: '',
  name: '',
  abbreviation: '',
  description: '',
})

const hasChanges = ref(false)
const isEditing = computed(() => Boolean(props.editId))
const modalTitle = computed(() => isEditing.value ? 'Editar função' : 'Nova função')

const saveButtonEnabled = computed(() => {
  if (!isEditing.value) {
    const enabled = !!formValues.value.name || !!formValues.value.abbreviation || !!formValues.value.description
    return enabled
  }

  return hasChanges.value
})

function checkForChanges() {
  if (!isEditing.value)
    return

  const hasNameChanged = formValues.value.name !== originalFormValues.value.name
  const hasAbbreviationChanged = formValues.value.abbreviation !== originalFormValues.value.abbreviation
  const hasDescriptionChanged = formValues.value.description !== originalFormValues.value.description

  hasChanges.value = hasNameChanged || hasAbbreviationChanged || hasDescriptionChanged
}

watchEffect(() => {
  if (formValues.value.description) {
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
    console.log('Mobile: ID da função para edição:', props.editId)

    const fn = await serverFunctionService.getServerFunctionById(props.editId)

    console.log('Mobile: Função encontrada:', fn)

    if (fn) {
      const loadedValues = {
        id: fn.id,
        name: fn.name,
        abbreviation: fn.abbreviation || '',
        description: (fn as any).description || '',
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
      abbreviation: '',
      description: '',
    }
    originalFormValues.value = {
      id: '',
      name: '',
      abbreviation: '',
      description: '',
    }
    hasChanges.value = false
  }
})

async function handleSubmit(values: any) {
  const payload = {
    id: isEditing.value ? props.editId : undefined,
    name: values.name,
    abbreviation: values.abbreviation,
    description: values.description,
  }

  await serverFunctionService.upsertServerFunction(payload)

  const successMessage = isEditing.value
    ? 'Função atualizada com sucesso'
    : 'Nova função cadastrada com sucesso'
    
  showToast(successMessage, 'top', 'success')

  handleSaved()
}

function handleCancel() {
  emits('cancel')
}

function handleSaved() {
  emits('saved')
}

function trimDescription(event: any) {
  const el = event.target
  if (el.value.length > 180)
    el.value = el.value.slice(0, 180)
}

function autoResizeTextarea() {
  const el = descriptionRef.value
  if (el) {
    el.style.height = '80px'
    el.style.height = 'auto'
    el.style.height = `${Math.max(80, el.scrollHeight)}px`
  }
}
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding ion-no-padding">
      <div class="style-purple-lane" style="display: flex; align-items: center;">
        <IonIcon :icon="personSharp" style="margin-right: 10px;" />
        {{ modalTitle }}
      </div>
      <Form id="function-form-mobile" :key="formValues.id || 'new'" :initial-values="formValues" @submit="handleSubmit">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="name" rules="required|min:3|max:180">
                <IonInput
                  v-bind="field"
                  v-model="formValues.name"
                  label="Nome da função"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o nome da função"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="field.onInput"
                >
                  <div slot="label" class="required-field">
                    Nome da função <span class="required-text">(Obrigatório)</span>
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
              <Field v-slot="{ field, errors }" name="abbreviation">
                <IonInput
                  v-bind="field"
                  v-model="formValues.abbreviation"
                  label="Abreviação"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite a abreviação"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="field.onInput"
                />
                <ErrorMessage v-slot="{ message }" name="abbreviation">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="description" rules="max:180">
                <IonTextarea
                  v-bind="field"
                  ref="descriptionRef"
                  v-model="formValues.description"
                  label="Descrição da função"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite uma descrição"
                  :class="{ 'has-error': errors.length > 0 }"
                  :maxlength="180"
                  :auto-grow="true"
                  @ion-input="(event) => {
                    field.onInput(event);
                    trimDescription(event);
                    autoResizeTextarea();
                  }"
                />
                <ErrorMessage v-slot="{ message }" name="description">
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
            <IonButton expand="block" type="submit" form="function-form-mobile" :disabled="!saveButtonEnabled">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  </IonPage>
</template>

<style scoped>

/* .drag-handle {
  width: 36px;
  height: 4px;
  border-radius: 2px;
  margin: 10px auto;
  background-color: var(--ion-color-medium);
} */


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

/* .action-buttons-fixed {
  margin: 0;
  padding: 8px;
} */

ion-input.has-error,
ion-textarea.has-error {
  --border-color: var(--ion-color-danger);
}

/* .mobile-function-content {
/* .mobile-function-content {
  height: 100%;
  display: flex;
  flex-direction: column;
} */

/* .footer-fixed {
  position: sticky;
  bottom: 0;
  z-index: 10;
} */

/* ion-content {
  --padding-bottom: 80px;
} */

/* ion-modal .modal-wrapper {
  --height: 70%;
} */

/* .action-buttons-fixed {
  position: sticky;
  bottom: 0;
  background: var(--ion-color-light);
  padding: 8px 0;
} */
</style>
