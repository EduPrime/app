<script lang="ts" setup>
import BaseService from '@/services/BaseService'
import { IonCol, IonRow, IonSearchbar, IonSelect, IonSelectOption } from '@ionic/vue'

import { onMounted, ref, watch } from 'vue'

interface Props {
  table: string // nome da tabela
  placeholder: string // placeholder do input
  searchAreas?: string[] // atributos nos quais o valor vai ser pesquisado
  filterAreas?: { table: string, placeholder: string }[] // atributos nos quais o valor vai ser filtrado, máximo 2
  filterType: string // 'text' ou 'list'
}

const props = defineProps<Props>()
const emits = defineEmits(['update:searchResult', 'update:newItem'])
const data = ref()
const dataFilter = ref()

const selectedFilterItem = ref()

const baseService = new BaseService(props.table)

const searchQuery = ref('')

async function searchByQuery(query: string) {
  if (props.filterType === 'list') {
    const result = await baseService.searchByQuery(props.table, query, props.searchAreas)

    emits('update:searchResult', result)
    return result
  } // else
}

watch(() => props.filterAreas, async (newValue) => {
  if (newValue && newValue.length > 0) {
    dataFilter.value = await baseService.searchByQuery(newValue[0].table, ' ')
  }
}, { immediate: true })

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
  selectedFilterItem: {{ selectedFilterItem }}
  <IonRow>
    <IonCol v-if="props.filterType === 'list' && props.filterAreas" size="12">
      <IonRow>
        <IonCol v-for="(item, index) in props.filterAreas" :key="index" size="12" :size-md="`${props.filterAreas.length === 1 ? 12 : 6}`">
          <IonSelect v-model="selectedFilterItem" :label="item.placeholder" label-placement="floating" fill="solid">
            <IonSelectOption v-for="f in dataFilter" :key="f" :value="f.id">
              {{ f.name }}
            </IonSelectOption>
          </IonSelect>
        </IonCol>
      </IonRow>
    </IonCol>

    <IonCol class="ion-no-padding ion-no-margin" size="12">
      <IonSearchbar id="eduprime-search-bar" v-model="searchQuery" :placeholder="`${props.placeholder}`" />
    </IonCol>
  </IonRow>
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
