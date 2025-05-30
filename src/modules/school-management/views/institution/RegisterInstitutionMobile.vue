<script setup lang="ts">
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
} from '@ionic/vue'
import { businessOutline } from 'ionicons/icons'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import InstitutionService from '../../services/InstitutionService'

const props = defineProps<{
  editId?: string
}>()

const emits = defineEmits<{
  (e: 'saved'): void
  (e: 'cancel'): void
  (e: 'error', message: string, color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark'): void
  (e: 'success', message: string, color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark'): void
}>()

const form = ref<any>(null)

const institutionService = new InstitutionService()

const formValues = ref({
  id: '',
  name: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  email: '',
})

const originalFormValues = ref({
  id: '',
  name: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  email: '',
})

const hasChanges = ref(false)
const isEditing = computed(() => Boolean(props.editId))
const modalTitle = computed(() => isEditing.value ? 'Editar instituição' : 'Nova instituição')

const saveButtonEnabled = computed(() => {
  if (!isEditing.value) {
    const enabled = !!formValues.value.name || !!formValues.value.address
      || !!formValues.value.city || !!formValues.value.state
      || !!formValues.value.postalCode || !!formValues.value.phone
      || !!formValues.value.email
    return enabled
  }

  return hasChanges.value
})

function checkForChanges() {
  if (!isEditing.value)
    return

  const hasNameChanged = formValues.value.name !== originalFormValues.value.name
  const hasAddressChanged = formValues.value.address !== originalFormValues.value.address
  const hasCityChanged = formValues.value.city !== originalFormValues.value.city
  const hasStateChanged = formValues.value.state !== originalFormValues.value.state
  const hasPostalCodeChanged = formValues.value.postalCode !== originalFormValues.value.postalCode
  const hasPhoneChanged = formValues.value.phone !== originalFormValues.value.phone
  const hasEmailChanged = formValues.value.email !== originalFormValues.value.email

  hasChanges.value = hasNameChanged || hasAddressChanged || hasCityChanged
    || hasStateChanged || hasPostalCodeChanged || hasPhoneChanged
    || hasEmailChanged
}

// Observar mudanças em todos os campos do formulário
watch(
  () => ({ ...formValues.value }),
  () => {
    if (isEditing.value) {
      checkForChanges()
    }
  },
  { deep: true },
)

// Observar especificamente mudanças no CEP
watch(() => formValues.value.postalCode, async (novoCep, antigoCep) => {
  if (!novoCep || novoCep !== antigoCep) {
    formValues.value.address = ''
    formValues.value.city = ''
    formValues.value.state = ''

    if (form.value) {
      form.value.setFieldValue('address', '')
      form.value.setFieldValue('city', '')
      form.value.setFieldValue('state', '')
    }
  }

  if (!novoCep)
    return

  const cepLimpo = String(novoCep).replace(/\D/g, '')
  if (cepLimpo && cepLimpo.length === 8) {
    const endereco = await buscarEndereco(cepLimpo)
    if (endereco) {
      formValues.value.address = endereco.logradouro || ''
      formValues.value.city = endereco.localidade || ''
      formValues.value.state = endereco.uf || ''

      if (form.value) {
        form.value.setFieldValue('address', endereco.logradouro || '')
        form.value.setFieldValue('city', endereco.localidade || '')
        form.value.setFieldValue('state', endereco.uf || '')
      }
    }
  }
}, { immediate: true })

onMounted(async () => {
  if (props.editId) {
    await loadInstitution()
  }
})

async function loadInstitution() {
  try {
    const institution = await institutionService.getInstitutionById(props.editId!)
    if (institution) {
      const loadedValues = {
        id: institution.id || '',
        name: institution.name || '',
        address: institution.address || '',
        city: institution.city || '',
        state: institution.state || '',
        postalCode: institution.postalCode || '',
        phone: institution.phone || '',
        email: institution.email || '',
      }

      formValues.value = { ...loadedValues }
      originalFormValues.value = { ...loadedValues }
      hasChanges.value = false
    }
  }
  catch (error) {
    console.error('Erro ao carregar instituição:', error)
    emits('error', 'Erro ao carregar instituição', 'danger')
  }
}

async function handleSubmit(values: any) {
  try {
    const institutionData = {
      id: isEditing.value ? props.editId : undefined,
      name: values.name.trim(),
      address: values.address?.trim() || '',
      city: values.city?.trim() || '',
      state: values.state?.trim() || '',
      postalCode: values.postalCode?.trim() || '',
      phone: values.phone?.trim() || '',
      email: values.email?.trim() || '',
    }

    await institutionService.upsertInstitution(institutionData)

    emits('success', `Instituição ${isEditing.value ? 'atualizada' : 'cadastrada'} com sucesso!`, 'success')
    handleSaved()
  }
  catch (error) {
    console.error('Erro ao salvar instituição:', error)
    emits('error', 'Erro ao salvar instituição', 'danger')
  }
}

function handleCancel() {
  emits('cancel')
}

function handleSaved() {
  emits('saved')
}

async function buscarEndereco(cep: string) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()
    if (data.erro) {
      throw new Error('CEP não encontrado')
    }
    return data
  }
  catch (error) {
    console.error(error)
    return null
  }
}

function formatCEP(event: any) {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length > 5) {
    value = `${value.substring(0, 5)}-${value.substring(5)}`
  }
  formValues.value.postalCode = value.substring(0, 9)

  // Acionar busca de CEP quando completar 8 dígitos
  const cepLimpo = value.replace(/\D/g, '')
  if (cepLimpo.length === 8) {
    preencherEnderecoPorCEP(cepLimpo)
  }
}

async function preencherEnderecoPorCEP(cepLimpo: string) {
  const endereco = await buscarEndereco(cepLimpo)
  if (endereco) {
    formValues.value.address = endereco.logradouro || ''
    formValues.value.city = endereco.localidade || ''
    formValues.value.state = endereco.uf || ''

    if (form.value) {
      form.value.setFieldValue('address', endereco.logradouro || '')
      form.value.setFieldValue('city', endereco.localidade || '')
      form.value.setFieldValue('state', endereco.uf || '')
    }
  }
}

function formatPhone(event: any) {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length > 2) {
    value = `(${value.substring(0, 2)}) ${value.substring(2)}`
  }
  if (value.length > 10) {
    value = `${value.substring(0, 10)}-${value.substring(10)}`
  }
  formValues.value.phone = value.substring(0, 16)
}
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding ion-no-padding">
      <div class="style-purple-lane" style="display: flex; align-items: center;">
        <IonIcon :icon="businessOutline" style="margin-right: 10px;" />
        {{ modalTitle }}
      </div>

      <Form
        id="institution-form-mobile"
        ref="form"
        :key="formValues.id || 'new'"
        :initial-values="formValues"
        @submit="handleSubmit"
      >
        <IonGrid>
          <div class="section-header">
            <h3>Informações Básicas</h3>
          </div>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="name" label="Nome da instituição" rules="required|min:3|max:100">
                <IonInput
                  v-bind="field"
                  v-model="formValues.name"
                  label="Nome da instituição"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o nome da instituição"
                  class="custom-input"
                  :maxlength="101"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="field.onInput"
                />
                <ErrorMessage v-slot="{ message }" name="name">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <div class="section-header">
            <h3>Endereço</h3>
          </div>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="postalCode" label="CEP" rules="required|cep">
                <IonInput
                  v-bind="field"
                  v-model="formValues.postalCode"
                  label="CEP"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o CEP (00000-000)"
                  class="custom-input"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="formatCEP"
                />
                <ErrorMessage v-slot="{ message }" name="postalCode">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="address" label="Logradouro" rules="max:100">
                <IonInput
                  v-bind="field"
                  v-model="formValues.address"
                  label="Logradouro"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o logradouro"
                  class="custom-input"
                  :maxlength="101"
                  @ion-input="field.onInput"
                />
                <ErrorMessage v-slot="{ message }" name="address">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" size-md="8">
              <Field v-slot="{ field }" name="city" label="Cidade" rules="max:100">
                <IonInput
                  v-bind="field"
                  v-model="formValues.city"
                  label="Cidade"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite a cidade"
                  class="custom-input"
                  :maxlength="101"
                  @ion-input="field.onInput"
                />
                <ErrorMessage v-slot="{ message }" name="city">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>

            <IonCol size="12" size-md="4">
              <Field v-slot="{ field }" name="state" label="Estado" rules="max:2">
                <IonInput
                  v-bind="field"
                  v-model="formValues.state"
                  label="Estado"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="UF"
                  class="custom-input"
                  :maxlength="2"
                  @ion-input="field.onInput"
                />
                <ErrorMessage v-slot="{ message }" name="state">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <div class="section-header">
            <h3>Contato</h3>
          </div>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="phone" label="Telefone" rules="required|phone">
                <IonInput
                  v-bind="field"
                  v-model="formValues.phone"
                  label="Telefone"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o telefone (00) 00000-0000"
                  class="custom-input"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="formatPhone"
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
              <Field v-slot="{ field, errors }" name="email" label="E-mail" rules="email|max:100">
                <IonInput
                  v-bind="field"
                  v-model="formValues.email"
                  label="E-mail"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o e-mail"
                  class="custom-input"
                  :maxlength="25"
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
            <IonButton expand="block" type="submit" form="institution-form-mobile" :disabled="!saveButtonEnabled">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
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

.section-header {
  padding: 4px 0;
  margin-top: 8px;
  margin-bottom: 0;
}

.section-header h3 {
  color: var(--ion-color-primary);
  margin: 4px 0;
  font-size: 14px;
  font-weight: bold;
}

.custom-input {
  margin-bottom: 15px;
}

.has-error {
  --border-color: var(--ion-color-danger) !important;
}

.error-message {
  color: var(--ion-color-danger);
  font-size: 12px;
  margin-top: -12px;
  margin-bottom: 10px;
  padding-left: 16px;
}

ion-content {
  --padding-bottom: 80px;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
  z-index: 999;
  padding: 0;
  margin: 0;
}

.footer-grid {
  padding: 0;
  margin: 0;
}

.footer-button {
  margin: 0;
  --border-radius: 0;
  height: 50px;
}
</style>
