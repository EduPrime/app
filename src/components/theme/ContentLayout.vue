<script setup lang="ts">
import { IonButtons, IonFooter, IonHeader, IonMenuButton, IonNote, IonTitle, IonToolbar } from '@ionic/vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  showFooter: {
    type: Boolean,
    default: false,
  },
  showDescription: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const metaName = ref((route.meta.name as string) || '')
const metaIcon = ref((route.meta.icon as string) || '')

function updateTitle() {
  document.title = metaName.value ? `${metaName.value} no EduPrime` : 'EduPrime'
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
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton color="primary" />
        </IonButtons>
        <slot name="header-buttons" />
        <!-- Removi o icone pois causava poluição visual <IonIcon v-if="metaIcon" slot="start" :icon="metaIcon" size="large" class="ion-margin-start" /> -->
        <IonTitle>{{ metaName }}</IonTitle>
        <slot name="header-right" />
      </IonToolbar>
    </IonHeader>

    <ion-content :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <slot name="header-buttons" />
          <IonTitle size="large">
            {{ metaName }}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="main-content-box" class="ion-margin">
        <ion-row v-if="props.showDescription" class="ion-margin">
          <ion-col style="background-color: #aa86ff; box-shadow: 5px 5px 0px 0px rgba(110, 68, 255, 0.4); border-radius: 3px;">
            <IonNote class="ion-padding" style="color: #ffffff; display: flex; align-items: center; justify-content: center;">
              <slot name="description" />
            </IonNote>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <slot />
          </ion-col>
        </ion-row>
      </div>
    </ion-content>

    <IonFooter v-if="props.showFooter" :translucent="true">
      <IonToolbar>
        <slot name="footer" />
      </IonToolbar>
    </IonFooter>
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
