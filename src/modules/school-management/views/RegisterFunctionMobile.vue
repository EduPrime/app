<script setup lang="ts">
import showToast from '@/utils/toast-alert'
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
  IonTextarea,
  IonToolbar,
} from '@ionic/vue'
import { personSharp } from 'ionicons/icons'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, nextTick, onMounted, ref } from 'vue'
// Router não é necessário neste componente pois usa emits para navegação
import ServerFunctionService from '../services/ServerFunctionService'

const props = defineProps<{
  editId?: string
}>()

const emits = defineEmits<{
  (e: 'saved'): void
  (e: 'cancel'): void
}>()

// Não precisamos do router aqui pois o componente pai gerencia a navegação
const serverFunctionService = new ServerFunctionService()

const descriptionRef = ref<HTMLTextAreaElement | null>(null)
const formValues = ref({
  id: '',
  name: '',
  abbreviation: '',
  description: '',
})

const isEditing = computed(() => Boolean(props.editId))
const modalTitle = computed(() => isEditing.value ? 'Editar função' : 'Nova função')

onMounted(async () => {
  if (props.editId) {
    const fn = await serverFunctionService.getServerFunctionById(props.editId)
    if (fn) {
      formValues.value = {
        id: fn.id,
        name: fn.name,
        abbreviation: fn.abbreviation || '',
        description: (fn as any).description || '',
      }
      await nextTick()
      autoResizeTextarea()
    }
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

  // Exibe mensagem de sucesso
  showToast('Nova função cadastrada com sucesso', 'top', 'success')

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
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }
}
</script>

<template>
  <div class="mobile-function-content">
    <IonContent class="ion-padding ion-no-padding" :fullscreen="false">
      <div class="style-purple-lane" style="display: flex; align-items: center;">
        <IonIcon :icon="personSharp" style="margin-right: 10px;" />
        {{ modalTitle }}
      </div>
      <Form id="function-form-mobile" :initial-values="formValues" @submit="handleSubmit">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="name" rules="required|min:3|max:180">
                <IonInput
                  v-bind="field"
                  label="Nome da função"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o nome da função"
                  :class="{ 'has-error': errors.length > 0 }"
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
                  label="Abreviação"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite a abreviação"
                  :class="{ 'has-error': errors.length > 0 }"
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

    <IonFooter slot="fixed-bottom" class="ion-no-border footer-fixed">
      <IonToolbar>
        <IonGrid>
          <IonRow class="action-buttons-fixed">
            <IonCol size="6">
              <IonButton color="danger" expand="block" @click="handleCancel()">
                Cancelar
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton expand="block" type="submit" form="function-form-mobile">
                Salvar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  </div>
</template>

<style scoped>
.drag-handle {
  width: 36px;
  height: 4px;
  border-radius: 2px;
  margin: 10px auto;
  background-color: var(--ion-color-medium);
}

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

.action-buttons-fixed {
  margin: 0;
  padding: 8px;
}

ion-input.has-error,
ion-textarea.has-error {
  --border-color: var(--ion-color-danger);
}

.mobile-function-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.footer-fixed {
  position: sticky;
  bottom: 0;
  z-index: 10;
}

ion-content {
  --padding-bottom: 80px;
}

ion-modal .modal-wrapper {
  --height: 70%;
}

.action-buttons-fixed {
  position: sticky;
  bottom: 0;
  background: var(--ion-color-light);
  padding: 8px 0;
}
</style>
