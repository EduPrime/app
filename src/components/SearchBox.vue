<script lang="ts" setup>
import BaseService from '@/services/BaseService'
import { IonSearchbar } from '@ionic/vue'

import { onMounted, ref, watch } from 'vue'

interface Props {
  table: string
  placeholder: string
  filterArea?: string[]
  filterType: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:searchResult', 'update:newItem'])
const data = ref()

const baseService = new BaseService(props.table)

const searchQuery = ref('')

async function searchByQuery(query: string) {
  const result = await baseService.searchByQuery(props.table, query, props.filterArea)

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
  <IonSearchbar id="eduprime-search-bar" v-model="searchQuery" :placeholder="`${props.placeholder}`" />
</template>

<style scoped>
 #eduprime-search-bar {
  --background: white;
  --color: var(--ion-color-primary);
  --icon-color: var(--ion-color-primary);
  --placeholder-color: var(--ion-color-primary);
  --clear-button-color: var(--ion-color-primary);
  --border-radius: 4px;
  padding: 0 16px;
}
</style>
