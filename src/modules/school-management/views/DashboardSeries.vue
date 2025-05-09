<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import ContentLayout from '@/components/theme/ContentLayout.vue'
// import SchoolCards from '@/modules/school-management/components/SchoolCards.vue'
import SeriesList from '@/modules/school-management/components/SeriesList.vue'
import { IonButton, IonCol, IonContent, IonIcon, IonModal, IonRow } from '@ionic/vue'
import { set } from 'better-auth/*'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SeriesService from '../services/SeriesService'
import RegisterSeries from './RegisterSeries.vue'

const router = useRouter()

// Estados para os dados da instituição e carregamento
const seriesService = new SeriesService()
const dataList = ref<Tables<'series'>[]>([])
const schoolCount = ref(154)
const classCount = ref(25)
const approvalRate = ref(48)
const teacherCount = ref(30)
const searchQuery = ref('')
const isModalAddSchool = ref(false)

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

// function navigateToRegister() {
//   router.push({ name: 'RegisterSeries' })
// }

onMounted(() => {
  loadSeries()
})
</script>

<template>
  <ContentLayout>
    <!-- <SchoolCards
      :student-count="schoolCount" :class-count="classCount" :approval-rate="approvalRate"
      :teacher-count="teacherCount"
    /> -->
    <ion-toolbar>
      <!-- <ion-title>Séries ativas ({{ filteredDataList.length }})</ion-title> -->
    </ion-toolbar>
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
    <SeriesList :data-list="filteredDataList" />

    <IonModal
      :is-open="isModalAddSchool"
      :expand-to-scroll="false"
      :initial-breakpoint="0.95"
      :breakpoints="[0, 0.7, 0.95, 1]"
      @ion-modal-did-dismiss="setModalAddSeries(false)"
    >
      <IonContent>
        <RegisterSeries />
      </IonContent>
    </IonModal>
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
