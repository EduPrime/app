<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import SchoolCards from '@/modules/school-management/components/SchoolCards.vue'
import SeriesList from '@/modules/school-management/components/SeriesList.vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SeriesService from '../services/SeriesService'

const router = useRouter()

// Estados para os dados da instituição e carregamento
const seriesService = new SeriesService()
const dataList = ref<Tables<'series'>[]>([])
const schoolCount = ref(154)
const classCount = ref(25)
const approvalRate = ref(48)
const teacherCount = ref(30)
const searchQuery = ref('')

const filteredDataList = computed(() => {
  if (!searchQuery.value) {
    return dataList.value
  }

  return dataList.value.filter((series: Tables<'series'>) =>
    series.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

async function loadSeries() {
  try {
    const series = await seriesService.getAll() // getAll() pode retornar null
    dataList.value = series ?? [] // Se retornar null, atribuímos um array vazio
  }
  catch (error) {
    console.error('Erro ao carregar as séries:', error)
  }
}

function navigateToRegister() {
  router.push({ name: 'RegisterSeries' })
}

onMounted(() => {
  loadSeries()
})
</script>

<template>
  <ContentLayout>
    <SchoolCards
      :student-count="schoolCount" :class-count="classCount" :approval-rate="approvalRate"
      :teacher-count="teacherCount"
    />
    <ion-toolbar>
      <ion-title>Séries ativas ({{ filteredDataList.length }})</ion-title>
    </ion-toolbar>
    <ion-row class="ion-align-items-center ion-justify-content-between">
      <ion-col size="10">
        <ion-searchbar v-model="searchQuery" placeholder="Buscar séries" />
      </ion-col>
      <ion-col size="2" class="ion-text-end">
        <ion-button id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister">
          <ion-icon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
          <ion-icon slot="start" :icon="add" class="ion-hide-sm-down" />
          <span class="ion-hide-sm-down">Novo</span>
        </ion-button>
      </ion-col>
    </ion-row>
    <SeriesList :data-list="filteredDataList" />
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
</style>
