<script lang="ts" setup>
import BaseService from '@/services/BaseService'
import { IonCol, IonRow, IonSearchbar, IonSelect, IonSelectOption } from '@ionic/vue'

import { onMounted, ref, watch } from 'vue'

interface Props {
  table: string // nome da tabela
  placeholder: string // placeholder do input
  searchAreas?: string[] // atributos nos quais o valor vai ser pesquisado
  filterAreas?: { table: string, relationship: string, placeholder: string }[] // atributos nos quais o valor vai ser filtrado, máximo 2
  filterType: string // 'text' ou 'list'
}

const props = defineProps<Props>()
const emits = defineEmits(['update:searchResult', 'update:newItem'])
const data = ref()
const searchFilters = ref()

const dataFilter = ref()
const dataAltFilter = ref()

const selectedFilterItem = ref()
const selectedAltFilter = ref()

const baseService = new BaseService(props.table)

const searchQuery = ref('')

async function searchByQuery(query: string) {
  if (props.filterType === 'text') {
    const result = await baseService.searchByQuery(props.table, query, props.searchAreas)

    emits('update:searchResult', result)
    return result
  }
  else {
    if (props.filterAreas && selectedFilterItem.value) {
      searchFilters.value = []
      props.filterAreas.forEach((item, index) => {
        if (index === 0) {
          searchFilters.value.push({ relationship: item.relationship, value: selectedFilterItem.value })
        }
        else if (index === 1) {
          searchFilters.value.push({ relationship: item.relationship, value: selectedAltFilter.value })
        }
      })
      const result = await baseService.searchFilterByQuery(props.table, query, props.searchAreas, searchFilters.value)

      emits('update:searchResult', result)
      return result
    }
    else {
      const result = await baseService.searchByQuery(props.table, query, props.searchAreas)

      emits('update:searchResult', result)
      return result
    }
  }
}

watch(() => props.filterAreas, async (newValue) => {
  if (newValue && newValue.length > 0) {
    dataFilter.value = await baseService.searchByQuery(newValue[0].table, ' ')
    if (newValue.length > 1) {
      dataAltFilter.value = await baseService.searchByQuery(newValue[1].table, ' ')
    }
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
  <IonRow>
    <IonCol v-if="props.filterType === 'list' && props.filterAreas" size="12">
      <IonRow>
        <IonCol v-for="(item, index) in props.filterAreas" :key="index" size="12" :size-md="`${props.filterAreas.length === 1 ? 12 : 6}`">
          <div v-if="index === 0" style="padding-left: 6px; padding-right: 6px;">
            <IonSelect v-model="selectedFilterItem" class="select" :label="item.placeholder">
              <!-- dataFilter errado: [{ name: 'Errado', id: 'bd14f407-3758-4656-a299-e4cf3859dd29x' }] -->
              <IonSelectOption v-for="f in dataFilter" :key="f" :value="f.id">
                {{ f.name }}
              </IonSelectOption>
            </IonSelect>
          </div>
          <div v-else-if="index === 1" style="padding-left: 6px; padding-right: 6px;">
            <IonSelect v-model="selectedAltFilter" class="select" :label="item.placeholder">
              <IonSelectOption v-for="f in dataAltFilter" :key="f" :value="f.id">
                {{ f.name }}
              </IonSelectOption>
            </IonSelect>
          </div>
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

.select {
  padding-left: 14px;
  padding-right: 14px;
  border-radius: 3px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}
</style>
