<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { IonButtons, IonCol, IonGrid, IonHeader, IonIcon, IonMenuButton, IonRow, IonTitle, IonToolbar } from '@ionic/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const metaName = (route.meta.name as string) || ''
const metaIcon = (route.meta.icon as string) || ''

function updateTitle() {
  document.title = `${metaName} no EduPrime` || 'EduPrime'
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
        <slot name="header-buttons" />
        <ion-grid>
          <ion-row>
            <ion-col size="auto">
              <ion-icon :icon="metaIcon" size="large" style="margin-left: 8px;" />
            </ion-col>
            <ion-col>
              <ion-title>{{ metaName }}</ion-title>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
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
</style>
