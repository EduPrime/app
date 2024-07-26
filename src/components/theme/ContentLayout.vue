<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { IonButtons, IonFooter, IonHeader, IonIcon, IonMenuButton, IonNote, IonTitle, IonToolbar } from '@ionic/vue'
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
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary" />
        </ion-buttons>
        <slot name="header-buttons" />
        <ion-icon v-if="metaIcon" slot="start" :icon="metaIcon" size="large" class="ion-margin-start" />
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

      <div id="main-content-box" class="ion-margin">
        <ion-row v-if="props.showDescription" class="ion-margin">
          <ion-col style="background-color: #aa86ff; box-shadow: 5px 5px 0px 0px rgba(110, 68, 255, 0.4); border-radius: 3px;">
            <ion-note class="ion-padding" style="color: #ffffff; display: flex; align-items: center; justify-content: center;">
              <slot name="description" />
            </ion-note>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <slot />
          </ion-col>
        </ion-row>
      </div>
    </ion-content>

    <ion-footer v-if="props.showFooter" :translucent="true">
      <ion-toolbar>
        <slot name="footer">
          <ion-title>Footer</ion-title>
        </slot>
      </ion-toolbar>
    </ion-footer>
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
