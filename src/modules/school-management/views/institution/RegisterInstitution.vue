<template>
  <IonPage>
    <ContentLayout>
      <div class="ion-padding">
        <IonRow class="ion-align-items-center ion-margin-bottom">
          <IonCol size="8">
            <IonTitle class="ion-no-padding">
              {{ isEditing ? 'Editar Instituição' : 'Nova Instituição' }}
            </IonTitle>
          </IonCol>
          <IonCol size="4" class="ion-text-end">
            <IonButton color="medium" fill="outline" class="ion-margin-end" @click="navigateBack">
              Cancelar
            </IonButton>
            <IonButton type="submit" :disabled="isSubmitting" @click="saveForm">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>

        <IonCard>
          <IonCardContent>
            <form @submit.prevent="saveForm">
              <IonGrid>
                <IonRow>
                  <IonCol size="12" size-md="8">
                    <IonItem>
                      <IonLabel position="stacked">Nome <IonText color="danger">*</IonText></IonLabel>
                      <IonInput
                        v-model="values.name"
                        type="text"
                        placeholder="Nome da instituição"
                        :maxlength="100"
                        required
                        @ion-change="validateName"
                      ></IonInput>
                      <IonNote v-if="errors.name" color="danger">{{ errors.name }}</IonNote>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <IonItem>
                      <IonLabel position="stacked">Endereço</IonLabel>
                      <IonInput
                        v-model="values.address"
                        type="text"
                        placeholder="Endereço da instituição"
                        :maxlength="255"
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12" size-md="6">
                    <IonItem>
                      <IonLabel position="stacked">Cidade</IonLabel>
                      <IonInput
                        v-model="values.city"
                        type="text"
                        placeholder="Cidade"
                        :maxlength="100"
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                  <IonCol size="12" size-md="2">
                    <IonItem>
                      <IonLabel position="stacked">Estado</IonLabel>
                      <IonInput
                        v-model="values.state"
                        type="text"
                        placeholder="UF"
                        :maxlength="2"
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                  <IonCol size="12" size-md="4">
                    <IonItem>
                      <IonLabel position="stacked">CEP</IonLabel>
                      <IonInput
                        v-model="values.postalCode"
                        type="text"
                        placeholder="CEP"
                        :maxlength="10"
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12" size-md="6">
                    <IonItem>
                      <IonLabel position="stacked">Telefone</IonLabel>
                      <IonInput
                        v-model="values.phone"
                        type="tel"
                        placeholder="Telefone de contato"
                        :maxlength="15"
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                  <IonCol size="12" size-md="6">
                    <IonItem>
                      <IonLabel position="stacked">E-mail</IonLabel>
                      <IonInput
                        v-model="values.email"
                        type="email"
                        placeholder="E-mail de contato"
                        :maxlength="255"
                        @ion-change="validateEmail"
                      ></IonInput>
                      <IonNote v-if="errors.email" color="danger">{{ errors.email }}</IonNote>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </form>
          </IonCardContent>
        </IonCard>

        <IonRow class="ion-margin-top">
          <IonCol class="ion-text-end">
            <IonButton color="medium" fill="outline" class="ion-margin-end" @click="navigateBack">
              Cancelar
            </IonButton>
            <IonButton type="submit" :disabled="isSubmitting" @click="saveForm">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>
      </div>
    </ContentLayout>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
} from '@ionic/vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import showToast from '@/utils/toast-alert'
import InstitutionService from '../../services/InstitutionService'

const router = useRouter()
const route = useRoute()
const institutionService = new InstitutionService()
const isSubmitting = ref(false)
const isEditing = computed(() => !!route.params.id)

const values = ref({
  name: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  email: ''
})

const errors = ref({
  name: '',
  email: ''
})

onMounted(async () => {
  if (isEditing.value) {
    await loadInstitution()
  }
})

async function loadInstitution() {
  try {
    const id = route.params.id as string
    const institution = await institutionService.getInstitutionById(id)
    if (institution) {
      values.value.name = institution.name || ''
      values.value.address = institution.address || ''
      values.value.city = institution.city || ''
      values.value.state = institution.state || ''
      values.value.postalCode = institution.postalCode || ''
      values.value.phone = institution.phone || ''
      values.value.email = institution.email || ''
    }
  } catch (error) {
    console.error('Erro ao carregar instituição:', error)
    showToast('Erro ao carregar instituição', 'top', 'danger')
  }
}

function validateName() {
  if (!values.value.name.trim()) {
    errors.value.name = 'Nome é obrigatório'
    return false
  }
  errors.value.name = ''
  return true
}

function validateEmail() {
  if (!values.value.email) {
    errors.value.email = ''
    return true
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(values.value.email)) {
    errors.value.email = 'E-mail inválido'
    return false
  }
  
  errors.value.email = ''
  return true
}

function validateForm() {
  const nameValid = validateName()
  const emailValid = validateEmail()
  return nameValid && emailValid
}

async function saveForm() {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    const payload = {
      id: isEditing.value ? route.params.id as string : undefined,
      name: values.value.name,
      address: values.value.address,
      city: values.value.city,
      state: values.value.state,
      postalCode: values.value.postalCode,
      phone: values.value.phone,
      email: values.value.email,
    }

    const result = await institutionService.upsertInstitution(payload)
    
    if (result) {
      showToast(`Instituição ${isEditing.value ? 'atualizada' : 'cadastrada'} com sucesso`, 'top', 'success')
      navigateBack(true)
    }
  } catch (error: any) {
    console.error('Erro ao salvar instituição:', error)
    showToast(error.message || 'Erro ao salvar instituição', 'top', 'danger')
  } finally {
    isSubmitting.value = false
  }
}

function navigateBack(refresh = false) {
  if (refresh) {
    router.push({ name: 'DashboardInstitution', query: { refresh: 'true' } })
  } else {
    router.push({ name: 'DashboardInstitution' })
  }
}
</script>

<style scoped>
ion-item {
  --padding-start: 0;
}
</style>
