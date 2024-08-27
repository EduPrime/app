<script setup lang="ts">
import { defineEmits, onMounted, ref } from 'vue'
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonProgressBar } from '@ionic/vue'
import { pencil } from 'ionicons/icons'
import type { Database, Enums, Tables } from '@/types/database.types'

const props = defineProps<{
  institution: Tables<'institution'> | undefined
}>()
const emit = defineEmits<{
  (e: 'click'): void
}>()
const institution = ref< Tables<'institution'> | null>()
const isEditing = ref(false)

function editBtn() {
  emit('click')
  isEditing.value = true
  console.log('O botão foi clicado no componente filho!', props.institution)
}
</script>

<template>
  <ion-card v-if="institution && !isEditing">
    <ion-card-header class="card-header">
      <div class="card-title-container">
        <ion-card-title>{{ institution?.name }}</ion-card-title>
        <ion-buttons>
          <ion-button fill="clear" @click="editBtn">
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
      <p><strong>CEP:</strong> {{ institution.postalcode }}</p>
    </ion-card-content>
  </ion-card>
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
