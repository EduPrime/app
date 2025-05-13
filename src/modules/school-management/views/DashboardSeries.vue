<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import EduprimeList from '@/components/ListWithAction.vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { IonButton, IonCol, IonContent, IonIcon, IonModal, IonRow } from '@ionic/vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref } from 'vue'
import SeriesService from '../services/SeriesService'
import RegisterSeries from './RegisterSeries.vue'

const seriesService = new SeriesService()
const dataList = ref<Tables<'series'>[]>([])
const searchQuery = ref('')
const isModalAddSchool = ref(false)

const seeModal = ref({ modal: false, data: undefined })
const editModal = ref({ modal: false, data: undefined })
const deleteModal = ref({ modal: false, data: undefined })

function setModalAddSeries(open: boolean) {
  isModalAddSchool.value = open
  if (open) {
    isModalAddSchool.value = false
    setTimeout(() => (isModalAddSchool.value = true), 10)
  }
}

const filteredDataList = computed(() => {
  if (!searchQuery.value) {
    return dataList.value
  }

  return dataList.value.filter((series: any) =>
    series.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

async function loadSeries() {
  try {
    const series = await seriesService.getAllSeries() // getAll() pode retornar null
    dataList.value = series ?? [] // Se retornar null, atribuímos um array vazio
  }
  catch (error) {
    console.error('Erro ao carregar as séries:', error)
  }
}

// function navigateToRegister() {
//   router.push({ name: 'RegisterSeries' })
// }

onMounted(() => {
  loadSeries()
})
</script>

<template>
  <ContentLayout>
    <div class="ion-margin-top">
      <IonRow class="ion-align-items-center ion-justify-content-between">
        <IonCol size="10">
          <ion-searchbar v-model="searchQuery" placeholder="Buscar séries" />
        </IonCol>
        <IonCol size="2" class="ion-text-end">
          <IonButton id="add-btn" expand="block" class="ion-text-uppercase" @click="setModalAddSeries(true)">
            <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
            <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
            <span class="ion-hide-sm-down">Novo</span>
          </IonButton>
        </IonCol>
      </IonRow>
      <!-- <SeriesList :data-list="filteredDataList" /> -->
      <EduprimeList :data-list="filteredDataList" @update:delete="deleteModal = $event" @update:edit="editModal = $event" @update:see="($event) => { console.log($event); seeModal = $event; }" />

      <IonModal
        :is-open="isModalAddSchool"
        :expand-to-scroll="false"
        :initial-breakpoint="0.95"
        :breakpoints="[0, 0.7, 0.95, 1]"
        @ion-modal-did-dismiss="setModalAddSeries(false)"
      >
        <IonContent>
          <RegisterSeries :close-modal="() => setModalAddSeries(false)" />
        </IonContent>
      </IonModal>
    </div>
  </ContentLayout>
</template>

<style scoped>
ion-label h2 {
  margin: 0;
  font-weight: bold;
}

ion-searchbar {
  --background: var(--ion-color-light);
}

ion-segment {
  --background: rgba(var(--ion-color-tertiary-rgb), 0.15);
  --color: var(--ion-color-secondary);
}

.custom-button {
  max-width: 120px;
}
</style>
