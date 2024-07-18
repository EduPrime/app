<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonRow, IonTitle, IonToolbar } from '@ionic/vue'
import { useRoute } from 'vue-router'

const route = useRoute()

function updateTitle() {
  document.title = `EduPrime - ${route.meta?.name}` as string || 'EduPrime'
}

onMounted(() => {
  updateTitle()
})

watch(() => route.meta.name, updateTitle)
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary" />
        </ion-buttons>
        <ion-grid>
          <ion-row>
            <ion-col size="auto">
              <ion-icon :icon="route.meta.icon" size="large" style="margin-left: 8px;" />
            </ion-col>
            <ion-col>
              <ion-title>{{ route.meta.name }}</ion-title>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            {{ route.meta.name }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <slot />
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-grid {
  display: flex;
  align-items: center;
}
</style>
