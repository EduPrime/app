<script setup lang="ts">
import ThemeFilterButtons from '@/components/theme/FilterButtons.vue'
import ThemeFilterExpansor from '@/components/theme/FilterExpansor.vue'
import ThemeOverlayModal from '@/components/theme/OverlayModal.vue'

import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { ref, watch } from 'vue'

const chosenButton = ref<string | null>(null)
const modalClean = ref(false)

watch(chosenButton, (newValue) => {
  if (newValue && ['school', 'series', 'shift'].includes(newValue)) {
    openModal('open-modal')
    modalClean.value = false
  }
}, { immediate: true })

watch(modalClean, (newValue) => {
  if (newValue) {
    chosenButton.value = null
  }
}, { immediate: true })

function openModal(val: string) {
  const triggerButton = document.getElementById(val)
  if (triggerButton) {
    triggerButton.click()
  }
}
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <IonHeader :translucent="true">
        <IonToolbar>
          <template #start>
            <IonButtons>
              <IonMenuButton color="primary" />
              <IonBackButton default-href="/" />
            </IonButtons>
          </template>
          <IonTitle>Profile {{ chosenButton }} {{ modalClean }}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <ThemeFilterExpansor title="Filtros" subtitle="Toque na ceta ao lado para expandir os filtros">
        <ThemeFilterButtons v-model="chosenButton" />
      </ThemeFilterExpansor>

      <br>
      <ion-button id="open-modal" expand="block">
        Open Sheet Modal
      </ion-button>

      <ThemeOverlayModal v-model="modalClean" trigger="open-modal" :action-name="`Selecione ${chosenButton === 'school' ? 'uma Escola' : chosenButton === 'series' ? 'uma Série' : 'um Turno'}`">
        <!-- Ver somente se school -->
        <div v-if="chosenButton === 'school'">
          <ion-searchbar placeholder="Search" @click="$refs.modal.setCurrentBreakpoint(0.75)" />
          <ion-list>
            <IonItem v-for="i in 5" :key="i">
              <IonLabel>
                <h2>Item Title {{ i }}</h2>
                <p>Item description</p>
              </IonLabel>
            </IonItem>
          </ion-list>
        </div>

        <!-- Ver somente se series -->
        <div v-else-if="chosenButton === 'series'" />

        <!-- Ver somente se shift -->
        <div v-else-if="chosenButton === 'shift'" />
      </ThemeOverlayModal>
    </IonContent>
  </IonPage>
</template>
