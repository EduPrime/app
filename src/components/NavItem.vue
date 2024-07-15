<script setup lang="ts">
import { ref, watch } from 'vue'
import { IonAccordion, IonAccordionGroup, IonIcon, IonItem, IonLabel } from '@ionic/vue'
import { useRoute, useRouter } from 'vue-router'

interface MenuItem {
  name: string
  icon: string
  color: string
  url: string
  children: MenuItem[]
}

const props = defineProps<{
  item: MenuItem
}>()

const route = useRoute()
const router = useRouter()
const isDisabled = ref(false)

watch(
  () => route.path,
  (newPath) => {
    isDisabled.value = newPath === props.item.url
  },
  { immediate: true },
)

function handleClick() {
  isDisabled.value = true
  router.push(props.item.url)
}
</script>

<template>
  <div>
    <ion-accordion-group v-if="item.children && item.children.length" multiple>
      <ion-accordion>
        <ion-item slot="header" button lines="none" :disabled="isDisabled" @click="handleClick">
          <ion-icon slot="start" :color="item.color" :icon="item.icon" />
          <ion-label>{{ item.name }}</ion-label>
        </ion-item>
        <div slot="content">
          <nav-item v-for="(child, index) in item.children" :key="index" :item="child" />
        </div>
      </ion-accordion>
    </ion-accordion-group>
    <ion-item v-else button lines="none" :router-link="item.url" :disabled="isDisabled" @click="handleClick">
      <ion-icon slot="start" :color="item.color" :icon="item.icon" />
      <ion-label>{{ item.name }}</ion-label>
    </ion-item>
  </div>
</template>

<style scoped>
ion-item {
  --min-height: 32px;
  --padding-top: 0;
  --padding-bottom: 0;
  --inner-padding-top: 0;
  --inner-padding-bottom: 0;
  margin-bottom: 5px;
}

ion-item::part(native) {
  max-height: 16px;
  font-size: 14px;
  border-radius: 8px;
}

ion-accordion::part(content) {
  padding-left: 25px;
}
</style>
