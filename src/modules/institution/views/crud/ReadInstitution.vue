<script setup lang="ts">
import type { Institution } from '@prisma/client'
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/vue'
import { pencil } from 'ionicons/icons'
import { computed, ref } from 'vue'

const props = defineProps<{
  institution: Institution
}>()
const emit = defineEmits<{
  (e: 'click'): void
}>()
const institution = computed(() => props.institution)
const isEditing = ref(false)

function editBtn() {
  emit('click')
  isEditing.value = true
}
</script>

<template>
  <IonCard v-if="institution && !isEditing">
    <IonCardHeader class="card-header">
      <div class="card-title-container">
        <IonCardTitle>{{ institution?.name }}</IonCardTitle>
        <IonButtons>
          <IonButton fill="clear" @click="editBtn">
            <IonIcon slot="icon-only" :icon="pencil" />
          </IonButton>
        </IonButtons>
      </div>
    </IonCardHeader>
    <IonCardContent>
      <p><strong>Telefone:</strong> {{ institution.phone }}</p>
      <p><strong>E-mail:</strong> <a :href="`mailto:${institution?.email}`">{{ institution.email }}</a></p>
      <p><strong>Endereço:</strong> {{ institution.address }}</p>
      <p><strong>Cidade:</strong> {{ institution.city }}</p>
      <p><strong>UF:</strong> {{ institution.state }}</p>
      <p><strong>CEP:</strong> {{ institution.postalCode }}</p>
    </IonCardContent>
  </IonCard>
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
