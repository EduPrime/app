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
} from '@ionic/vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ServerFunctionService from '../services/ServerFunctionService'

const route = useRoute()
const router = useRouter()
const serverFunctionService = new ServerFunctionService()

const initialFormValues = { id: '', name: '', abbreviation: '', description: '' }
const formValues = ref({ ...initialFormValues })
const originalFormValues = ref({ ...initialFormValues })
const isEditing = ref(false)
const serverFunctionId = computed(() => route.params.id as string | undefined)
const pageTitle = computed(() => isEditing.value ? 'Editar função' : 'Nova função')
const descriptionRef = ref<HTMLTextAreaElement | null>(null)
const hasChanges = ref(false)

// Função para verificar se houve mudanças nos campos
function checkForChanges() {
  if (!isEditing.value)
    return

  const hasNameChanged = formValues.value.name !== originalFormValues.value.name
  const hasAbbreviationChanged = formValues.value.abbreviation !== originalFormValues.value.abbreviation
  const hasDescriptionChanged = formValues.value.description !== originalFormValues.value.description

  hasChanges.value = hasNameChanged || hasAbbreviationChanged || hasDescriptionChanged
}

const saveButtonEnabled = computed(() => {
  if (!isEditing.value) {
    const enabled = !!formValues.value.name || !!formValues.value.abbreviation || !!formValues.value.description
    return enabled
  }

  return hasChanges.value
})

watchEffect(() => {
  if (formValues.value.description) {
    nextTick(() => {
      autoResizeTextarea()
    })
  }
})

watch(
  () => ({ ...formValues.value }),
  () => {
    if (isEditing.value) {
      checkForChanges()
    }
  },
  { deep: true, immediate: true },
)

onMounted(async () => {
  if (serverFunctionId.value) {
    isEditing.value = true
    const fn = await serverFunctionService.getServerFunctionById(serverFunctionId.value)

    if (fn) {
      // Armazena os valores originais
      const loadedValues = {
        id: fn.id,
        name: fn.name,
        abbreviation: fn.abbreviation || '',
        description: (fn as any).description ?? '',
      }

      formValues.value = { ...loadedValues }
      originalFormValues.value = { ...loadedValues }
      hasChanges.value = false

      autoResizeTextarea()
    }
  }
  else {
    formValues.value = { ...initialFormValues }
    originalFormValues.value = { ...initialFormValues }
    hasChanges.value = false
  }
})

async function handleSubmit(values: any) {
  const payload = {
    id: isEditing.value ? serverFunctionId.value : undefined,
    name: values.name,
    abbreviation: values.abbreviation,
    description: values.description,
  }

  try {
    await serverFunctionService.upsertServerFunction(payload)

    const successMessage = isEditing.value
      ? 'Função atualizada com sucesso'
      : 'Nova função cadastrada com sucesso'

    showToast(successMessage, 'top', 'success')

    router.push({
      name: 'FunctionListFunction',
      query: { refresh: Date.now().toString() },
    })
  }
  catch (error: any) {
    console.error('Erro ao salvar função:', error)

    // Exibe mensagem específica dependendo do tipo de erro
    if (error.message) {
      if (error.message.includes('Nome de função já existente')) {
        showToast('Não foi possível salvar nova função: Nome de função já existente', 'top', 'warning')
      }
      else if (error.message.includes('Abreviação de função já existente')) {
        showToast('Não foi possível salvar nova função: Abreviação de função já existente', 'top', 'warning')
      }
      else {
        showToast(`Erro ao salvar função: ${error.message}`, 'top', 'danger')
      }
    }
    else {
      showToast('Erro ao salvar função', 'top', 'danger')
    }
  }
}

function resetForm() {
  router.back()
}

function trimDescription(event: Event) {
  const el = event.target as HTMLTextAreaElement
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
    <IonHeader>
      <IonToolbar>
        <IonTitle class="page-title">
          {{ pageTitle }}
        </IonTitle>
      </IonToolbar>
      <div class="toolbar-accent" />
    </IonHeader>

    <IonContent :scroll-y="true" class="ion-padding content-with-footer">
      <Form id="function-form" :key="formValues.id || 'new'" :initial-values="formValues" @submit="handleSubmit">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="name" label="Nome da função" rules="required|min:3|max:180">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.name"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Nome da função </span><span class="required-text">(Obrigatório)</span></label>
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
              <Field v-slot="{ field }" name="abbreviation" label="Abreviação" rules="min:2|max:6">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.abbreviation"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    :maxlength="7"
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Abreviação</span></label>
                </div>
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
              <Field v-slot="{ field }" name="description" label="Descrição da função" rules="max:180">
                <div class="description-input">
                  <textarea
                    v-bind="field"
                    ref="descriptionRef"
                    v-model="formValues.description"
                    class="description-native"
                    placeholder=" "
                    maxlength="181"
                    @input="(event) => {
                      field.onInput(event);
                      trimDescription(event);
                      autoResizeTextarea();
                    }"
                  />
                  <label class="floating-label top-label"><span>Descrição da função</span></label>
                </div>
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
              <IonButton expand="block" type="submit" form="function-form" :disabled="!saveButtonEnabled">
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
</style>
