<script lang="ts" setup>
import BaseService from '@/services/BaseService'
import { IonCol, IonRow, IonSearchbar } from '@ionic/vue'

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
  <IonRow class="ion-align-items-center ion-justify-content-between">
    <IonCol size="11" size-md="10">
      <IonSearchbar v-model="searchQuery" :placeholder="`${props.placeholder}`" />
    </IonCol>
    <IonCol size="1" size-md="2" class="ion-text-end">
      <slot name="buttons" />
    </IonCol>
  </IonRow>
</template>

<style scoped>
.search-bar {
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
}
</style>
