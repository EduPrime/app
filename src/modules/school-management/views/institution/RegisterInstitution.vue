<script setup lang="ts">
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
import { computed, onActivated, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import showToast from '@/utils/toast-alert'
import InstitutionService from '../../services/InstitutionService'

const router = useRouter()
const route = useRoute()
const institutionService = new InstitutionService()
const isSubmitting = ref(false)
const isEditing = computed(() => !!route.params.id)
const pageTitle = computed(() => isEditing.value ? 'Editar Instituição' : 'Nova Instituição')

const initialFormValues = {
  id: '',
  name: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  email: ''
}

const formValues = ref({ ...initialFormValues })
const originalFormValues = ref({ ...initialFormValues })
const hasChanges = ref(false)

const form = ref<any>(null)

watch(
  () => ({ ...formValues.value }),
  () => {
    if (isEditing.value) {
      checkForChanges()
    }
  },
  { deep: true, immediate: true }
)

onMounted(async () => {
  if (isEditing.value) {
    await loadInstitution()
  } else {
    formValues.value = { ...initialFormValues }
    originalFormValues.value = { ...initialFormValues }
    hasChanges.value = false
  }
})

onActivated(() => {
  if (!isEditing.value) {
    formValues.value = { ...initialFormValues }
    originalFormValues.value = { ...initialFormValues }
    hasChanges.value = false
  }
})

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

watch(() => formValues.value.postalCode, async (novoCep, antigoCep) => {
  if (!novoCep || novoCep !== antigoCep) {
    formValues.value.address = '';
    formValues.value.city = '';
    formValues.value.state = '';
    
    if (form.value) {
      form.value.setFieldValue('address', '');
      form.value.setFieldValue('city', '');
      form.value.setFieldValue('state', '');
    }
  }
  
  if (!novoCep) return;
  
  const cepLimpo = String(novoCep).replace(/\D/g, '');
  if (cepLimpo && cepLimpo.length === 8) {
    const endereco = await buscarEndereco(cepLimpo);
    if (endereco) {
      formValues.value.address = endereco.logradouro || '';
      formValues.value.city = endereco.localidade || '';
      formValues.value.state = endereco.uf || '';
      
      if (form.value) {
        form.value.setFieldValue('address', endereco.logradouro || '');
        form.value.setFieldValue('city', endereco.localidade || '');
        form.value.setFieldValue('state', endereco.uf || '');
      }
    }
  }
})

async function loadInstitution() {
  try {
    const id = route.params.id as string
    const institution = await institutionService.getInstitutionById(id)
    if (institution) {
      const loadedValues = {
        id: institution.id || '',
        name: institution.name || '',
        address: institution.address || '',
        city: institution.city || '',
        state: institution.state || '',
        postalCode: institution.postalCode || '',
        phone: institution.phone || '',
        email: institution.email || ''
      }
      
      formValues.value = { ...loadedValues }
      originalFormValues.value = { ...loadedValues }
      hasChanges.value = false
    }
  } catch (error) {
    console.error('Erro ao carregar instituição:', error)
    showToast('Erro ao carregar instituição', 'top', 'danger')
  }
}

function checkForChanges() {
  if (!isEditing.value) return

  const hasNameChanged = formValues.value.name !== originalFormValues.value.name
  const hasAddressChanged = formValues.value.address !== originalFormValues.value.address
  const hasCityChanged = formValues.value.city !== originalFormValues.value.city
  const hasStateChanged = formValues.value.state !== originalFormValues.value.state
  const hasPostalCodeChanged = formValues.value.postalCode !== originalFormValues.value.postalCode
  const hasPhoneChanged = formValues.value.phone !== originalFormValues.value.phone
  const hasEmailChanged = formValues.value.email !== originalFormValues.value.email

  hasChanges.value = hasNameChanged || hasAddressChanged || hasCityChanged || 
                    hasStateChanged || hasPostalCodeChanged || hasPhoneChanged || 
                    hasEmailChanged
}

const saveButtonEnabled = computed(() => {
  if (!isEditing.value) {
    const anyFieldFilled = !!formValues.value.name || !!formValues.value.address || 
                         !!formValues.value.city || !!formValues.value.state || 
                         !!formValues.value.postalCode || !!formValues.value.phone || 
                         !!formValues.value.email
    return anyFieldFilled
  }
  
  return hasChanges.value
})

async function handleSubmit(values: any) {
  isSubmitting.value = true
  
  try {
    const institutionData = {
      id: isEditing.value ? route.params.id as string : undefined,
      name: values.name.trim(),
      address: values.address?.trim() || '',
      city: values.city?.trim() || '',
      state: values.state?.trim() || '',
      postalCode: values.postalCode?.trim() || '',
      phone: values.phone?.trim() || '',
      email: values.email?.trim() || '',
    }

    await institutionService.upsertInstitution(institutionData)
    
    showToast(
      `Instituição ${isEditing.value ? 'atualizada' : 'cadastrada'} com sucesso!`,
      'top',
      'success'
    )
    
    resetForm()
  } catch (error) {
    console.error('Erro ao salvar instituição:', error)
    showToast('Erro ao salvar instituição', 'top', 'danger')
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  router.back()
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
      <Form id="institution-form" ref="form" :key="formValues.id || 'new'" :initial-values="formValues" @submit="handleSubmit">
        <IonGrid>
          <div class="section-header">
            <h2>Informações Básicas</h2>
          </div>

          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="name" label="Nome da instituição" rules="required|min:3|max:100">
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
                  <label class="floating-label"><span>Nome da instituição </span><span class="required-text">(Obrigatório)</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="name">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <div class="section-header">
            <h2>Endereço</h2>
          </div>

          <IonRow>
            <IonCol size="12" size-md="6">
                <Field v-slot="{ field }" name="postalCode" label="CEP" rules="required|cep" >
                  <div class="floating-input">
                    <input 
                      v-bind="field" 
                      v-model="formValues.postalCode"
                      v-imask="{ mask: '00000-000' }"
                      type="text" 
                      class="floating-native" 
                      placeholder=" "
                      @input="field.onInput"
                    >
                    <label class="floating-label"><span>CEP </span><span class="required-text">(Obrigatório)</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="postalCode">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
            </IonCol>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="address" label="Endereço" rules="max:255">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.address"
                    type="text"
                    class="floating-native"
                    maxlength="255"
                    placeholder=" "
                    @input="field.onInput"
                  >
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
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="city" label="Cidade" rules="max:100">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.city"
                    type="text"
                    class="floating-native"
                    maxlength="100"
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
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="state" label="Estado" rules="max:2">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.state"
                    type="text"
                    class="floating-native"
                    maxlength="2"
                    placeholder=" "
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

          <div class="section-header">
            <h2>Contato</h2>
          </div>

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
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="email" label="E-mail" rules="email|max:255">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.email"
                    type="email"
                    class="floating-native"
                    maxlength="255"
                    placeholder=" "
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>E-mail</span></label>
                </div>
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

    <IonFooter>
      <IonToolbar>
        <IonGrid>
          <IonRow class="action-buttons-fixed">
            <IonCol size="6">
              <IonButton color="danger" expand="block" @click="resetForm">Cancelar</IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton expand="block" type="submit" form="institution-form" :disabled="!saveButtonEnabled">Salvar</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  </IonPage>
</template>

<style scoped>
.page-title {
  font-weight: bold; 
  color: var(--ion-color-secondary);
}

.section-header {
  margin: 16px 0 8px 0;
}

.section-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: var(--ion-color-secondary);
  margin: 0;
  border-bottom: 1px solid var(--ion-color-medium-shade);
  padding-bottom: 8px;
}

.floating-input {
  position: relative;
  margin-bottom: 16px;
  border: 1px solid var(--ion-color-primary);
  border-radius: 4px;
  margin-top: 24px;
  height: 56px;
}

.floating-native {
  width: 100%;
  height: 100%;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: var(--ion-color-dark-tint);
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
}

.floating-native:focus {
  background-color: transparent;
}

.floating-input:focus-within {
  border-color: var(--ion-color-secondary);
  box-shadow: none;
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

.top-label {
  top: 8px;
  transform: translateY(0);
}

.floating-native::placeholder {
  color: transparent;
}

.floating-native:focus ~ .floating-label,
.floating-native:not(:placeholder-shown) ~ .floating-label {
  top: -10px;
  transform: translateY(0);
  font-size: 0.75rem;
  color: var(--ion-color-primary);
  background: white;
  padding: 0 4px;
  z-index: 1;
}

.required-text {
  color: var(--ion-color-danger);
  font-size: 12px;
}

.error-message {
  color: var(--ion-color-danger);
  font-size: 0.8rem;
  margin-top: 4px;
  padding-left: 16px;
}

.select-input {
  display: flex;
  align-items: center;
  padding: 0;
}

.content-with-footer {
  --padding-bottom: 100px;
}

.toolbar-accent {
  height: 4px;
  background: var(--ion-color-primary);
}

.action-buttons-fixed {
  padding: 8px;
}
</style>
