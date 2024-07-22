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
const isActive = ref(false)

watch(
  () => route.path,
  (newPath) => {
    isActive.value = newPath === props.item.url
  },
  { immediate: true },
)

function handleClick() {
  // isDisabled.value = true
  isActive.value = true
  router.push(props.item.url)
}
</script>

<template>
  <div>
    <ion-accordion-group v-if="item.children && item.children.length" multiple>
      <ion-accordion>
        <ion-item slot="header" button lines="none" :disabled="isDisabled"  :class="isActive ? 'menu-active' : '' " @click="handleClick">
          <ion-icon slot="start" :color="item.color" :icon="item.icon" />
          <ion-label>{{ item.name }}</ion-label>
        </ion-item>
        <div slot="content">
          <nav-item v-for="(child, index) in item.children" :key="index" :item="child" />
        </div>
      </ion-accordion>
    </ion-accordion-group>
    <ion-item v-else button lines="none" :router-link="item.url" :disabled="isDisabled" :class="isActive ? 'menu-active' : '' " @click="handleClick">
      <ion-icon slot="start" :color="item.color" :icon="item.icon" />
      <ion-label>{{ item.name }}</ion-label>
    </ion-item>
  </div>
</template>

<style scoped>
.tree-view ion-item {
  --background : #00000000;
  --min-height: 32px;
  --padding-top: 0;
  --padding-bottom: 0;
  --inner-padding-top: 0;
  --inner-padding-bottom: 0;
  /* margin-bottom: 5px; */
}
.tree-view ion-item ion-icon{
  margin-inline-end: 15px;
}
ion-accordion div[slot="content"] ion-item{
  --padding-start: 25px;
}
ion-accordion div[slot="content"] ion-item::before{
  position: absolute;
  top: 0;
  left: 10px;
  height: 100%;
  width: 1px;
  content: "";
  background: var(--ion-color-lightaccent);
}
ion-accordion div[slot="content"]  ion-item.menu-active::after{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 5px;
  height: 7px;
  width: 7px;
  content: "";
  background: var(--ion-color-accent);
  border-radius: 50%;
  border: 2px solid var(--sidemenu-background);
}
ion-item.menu-active {
  --background: rgba(var(--ion-color-primary-rgb), .08) !important;
  font-weight: bold;
  --color: var(--ion-color-tertiary);
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
