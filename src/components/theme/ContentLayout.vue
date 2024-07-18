<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { IonCol, IonGrid, IonHeader, IonIcon, IonRow, IonTitle, IonToolbar } from '@ionic/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const metaName = ref((route.meta.name as string) || '')
const metaIcon = ref((route.meta.icon as string) || '')

function updateTitle() {
  document.title = `${metaName.value} no EduPrime` || 'EduPrime'
}

onMounted(() => {
  updateTitle()
})

watch(
  () => route.meta,
  (newMeta) => {
    metaName.value = (newMeta.name as string) || ''
    metaIcon.value = (newMeta.icon as string) || ''
    updateTitle()
  },
  { immediate: true },
)

console.log('Meta:', route.meta)
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
