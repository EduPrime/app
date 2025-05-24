<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton @click="cancelForm">
            <IonIcon :icon="chevronBack" slot="icon-only"></IonIcon>
          </IonButton>
        </IonButtons>
        <IonTitle>{{ isEditing ? 'Editar Instituição' : 'Nova Instituição' }}</IonTitle>
        <IonButtons slot="end">
          <IonButton @click="saveForm" :disabled="isSubmitting">
            <IonIcon :icon="checkmark" slot="icon-only"></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <form @submit.prevent="saveForm">
        <IonList>
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

          <IonItem>
            <IonLabel position="stacked">Endereço</IonLabel>
            <IonInput
              v-model="values.address"
              type="text"
              placeholder="Endereço da instituição"
              :maxlength="255"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Cidade</IonLabel>
            <IonInput
              v-model="values.city"
              type="text"
              placeholder="Cidade"
              :maxlength="100"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Estado</IonLabel>
            <IonInput
              v-model="values.state"
              type="text"
              placeholder="UF"
              :maxlength="2"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">CEP</IonLabel>
            <IonInput
              v-model="values.postalCode"
              type="text"
              placeholder="CEP"
              :maxlength="10"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Telefone</IonLabel>
            <IonInput
              v-model="values.phone"
              type="tel"
              placeholder="Telefone de contato"
              :maxlength="15"
            ></IonInput>
          </IonItem>

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
        </IonList>
      </form>
    </IonContent>

    <IonFooter>
      <IonToolbar>
        <IonRow>
          <IonCol>
            <IonButton expand="block" color="medium" @click="cancelForm">Cancelar</IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="block" @click="saveForm" :disabled="isSubmitting">Salvar</IonButton>
          </IonCol>
        </IonRow>
      </IonToolbar>
    </IonFooter>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import { checkmark, chevronBack } from 'ionicons/icons'
import { onMounted, ref, computed } from 'vue'
import InstitutionService from '../../services/InstitutionService'

const props = defineProps({
  editId: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['saved', 'cancel', 'success', 'error'])

const institutionService = new InstitutionService()
const isSubmitting = ref(false)
const isEditing = computed(() => !!props.editId)

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
  if (props.editId) {
    await loadInstitution()
  }
})

async function loadInstitution() {
  try {
    const institution = await institutionService.getInstitutionById(props.editId)
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
    emit('error', 'Erro ao carregar instituição', 'danger')
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
      id: isEditing.value ? props.editId : undefined,
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
      emit('success', `Instituição ${isEditing.value ? 'atualizada' : 'cadastrada'} com sucesso`, 'success')
      emit('saved')
    }
  } catch (error: any) {
    console.error('Erro ao salvar instituição:', error)
    emit('error', error.message || 'Erro ao salvar instituição', 'danger')
  } finally {
    isSubmitting.value = false
  }
}

function cancelForm() {
  emit('cancel')
}
</script>

<style scoped>
ion-item {
  --padding-start: 0;
}
</style>
