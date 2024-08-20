<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonProgressBar } from '@ionic/vue'
import { pencil } from 'ionicons/icons'
import type { Institution } from '../../types/Institution'
import InstitutionService from '../../services/InstitutionService'
import UpdateInstitution from './UpdateInstitution.vue'
import InstitutionCards from '@/modules/institution/components/InstitutionCards.vue'

const institution = ref<Institution | null>(null)
const loading = ref(true)
const isEditing = ref(false)
const schoolCount = ref(10)
const classCount = ref(25)
const seriesCount = ref(7)
const teacherCount = ref(30)

const IService = new InstitutionService()

async function loadInstitutions() {
  loading.value = true
  try {
    const institutions = await IService.getAll()
    institution.value = institutions?.at(0) ?? null
  }
  catch (error) {
    console.error('Erro ao carregar as instituições:', error)
  }
  finally {
    loading.value = false
  }
}

function editInstitution() {
  isEditing.value = true
}

function onSave() {
  isEditing.value = false
  loadInstitutions() // Recarrega os dados da instituição após a edição
}

onMounted(() => {
  loadInstitutions()
})
</script>

<template>
  <ion-progress-bar v-if="loading" type="indeterminate" />
  <institution-cards
    :school-count="schoolCount"
    :class-count="classCount"
    :series-count="seriesCount"
    :teacher-count="teacherCount"
  />
  <ion-card v-if="institution && !isEditing">
    <ion-card-header class="card-header">
      <div class="card-title-container">
        <ion-card-title>{{ institution?.name }}</ion-card-title>
        <ion-buttons>
          <ion-button fill="clear" @click="editInstitution">
            <ion-icon slot="icon-only" :icon="pencil" />
          </ion-button>
        </ion-buttons>
      </div>
    </ion-card-header>
    <ion-card-content>
      <p><strong>Telefone:</strong> {{ institution.phone }}</p>
      <p><strong>E-mail:</strong> <a :href="`mailto:${institution?.email}`">{{ institution.email }}</a></p>
      <p><strong>Endereço:</strong> {{ institution.address }}</p>
      <p><strong>Cidade:</strong> {{ institution.city }}</p>
      <p><strong>UF:</strong> {{ institution.state }}</p>
      <p><strong>CEP:</strong> {{ institution.postalCode }}</p>
    </ion-card-content>
  </ion-card>
  <update-institution v-if="isEditing" :institution="institution" @saved="onSave" />
</template>

  <style scoped>
  #create-button {
    margin: 16px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-title-container {
    display: flex;
    align-items: center;
  }

  .card-title-container ion-buttons {
    margin-left: 8px;
  }
  </style>
