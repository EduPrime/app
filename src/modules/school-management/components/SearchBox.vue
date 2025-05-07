<script lang="ts" setup>
import BaseService from '@/services/BaseService'
import { IonButton, IonIcon, IonSearchbar } from '@ionic/vue'
import { add } from 'ionicons/icons'

import { onMounted, ref, watch } from 'vue'

interface Props {
  table: string
  placeholder: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:searchResult', 'update:newItem'])
const data = ref()

const baseService = new BaseService(props.table)

const searchQuery = ref('')

async function searchByQuery(query: string) {
  const result = await baseService.searchByQuery(props.table, query)
  console.log(result)

  emits('update:searchResult', result)
  return result
}

watch(searchQuery, async (newValue) => {
  if (newValue.length > 3) {
    await searchByQuery(searchQuery.value)
  }
  else {
    emits('update:searchResult', data.value)
  }
})

onMounted(async () => {
  data.value = await searchByQuery(' ')
})
</script>

<template>
  <ion-row class="ion-align-items-center ion-justify-content-between">
    <ion-col size="10">
      <IonSearchbar v-model="searchQuery" :placeholder="`${props.placeholder}`" />
    </ion-col>
    <ion-col size="2" class="ion-text-end">
      <IonButton id="add-btn" expand="block" class="ion-text-uppercase" @click="emits('update:newItem', true)">
        <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
        <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
        <span class="ion-hide-sm-down">Novo</span>
      </IonButton>
    </ion-col>
  </ion-row>
</template>

<style scoped>
.search-bar {
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
}
</style>
