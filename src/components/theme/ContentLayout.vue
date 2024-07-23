<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { IonButtons, IonCol, IonGrid, IonHeader, IonIcon, IonMenuButton, IonRow, IonTitle, IonToolbar } from '@ionic/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const metaName = ref((route.meta.name as string) || '')
const metaIcon = ref((route.meta.icon as string) || '')

function updateTitle() {
  document.title = metaName.value ?  `${metaName.value} no EduPrime` : 'EduPrime'
}

onMounted(() => {
  updateTitle()
})

watch(
  () => route.fullPath, // Observa a rota completa para capturar todas as mudanças
  () => {
    metaName.value = (route.meta.name as string) || ''
    metaIcon.value = (route.meta.icon as string) || ''
    updateTitle()
  },
  { immediate: true },
)
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary" />
        </ion-buttons>
        <slot name="header-buttons" />
        <ion-icon v-if="metaIcon" :icon="metaIcon" slot="start" size="large" class="ion-margin-start" />
        <ion-title>{{ metaName }}</ion-title> 
        <slot name="header-right" />
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
        <slot name="header-buttons" />
          <ion-title size="large">
            {{ metaName }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="main-content-box" class="ion-padding-start ion-padding-end">
        <slot />
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-grid {
  display: flex;
  align-items: center;
}
ion-header.md{
  box-shadow: 0 4px 8px rgba(var(--ion-color-dark-rgb), 0.1);
  /* border-bottom:1px solid  #0000001f */
}
ion-title{
  font-weight: 800;
}
</style>
