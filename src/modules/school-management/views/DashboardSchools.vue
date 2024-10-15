<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import SchoolCards from '@/modules/school-management/components/SchoolCards.vue'
import SchoolList from '@/modules/school-management/components/SchoolList.vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SchoolService from '../services/SchoolService'

const router = useRouter()

// Estados para os dados da instituição e carregamento
const schoolService = new SchoolService()
const dataList = ref< Tables<'school'> | []>([])
const schoolData = ref<Array<{ school: Tables<'school'>, courses: Tables<'course'>[], series: Tables<'series'>[] }> | []>([])
const schoolCount = ref(154)
const classCount = ref(25)
const approvalRate = ref(48)
const teacherCount = ref(30)
const searchQuery = ref('')

const filteredDataList = computed(() => {
  if (!searchQuery.value) {
    return dataList.value
  }

  return dataList.value.filter((classroom: any) =>
    classroom.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

async function loadSchools() {
  try {
    dataList.value = await schoolService.getAll()
  }
  catch (error) {
    console.error('Erro ao carregar as salas de aula:', error)
  }
}

function navigateToRegister() {
  router.push({ name: 'RegisterSchool' })
}

onMounted(() => {
  loadSchools()
})
</script>

<template>
  <ContentLayout>
    <SchoolCards
      :student-count="schoolCount" :class-count="classCount" :approval-rate="approvalRate"
      :teacher-count="teacherCount"
    />
    <ion-toolbar>
      <ion-title>Escolas ativas ({{ filteredDataList.length }})</ion-title>
    </ion-toolbar>
    <ion-row class="ion-align-items-center ion-justify-content-between">
      <ion-col size="10">
        <ion-searchbar v-model="searchQuery" placeholder="Buscar escola" />
      </ion-col>
      <ion-col size="2" class="ion-text-end">
        <ion-button id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister">
          <ion-icon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
          <ion-icon slot="start" :icon="add" class="ion-hide-sm-down" />
          <span class="ion-hide-sm-down">Novo</span>
        </ion-button>
      </ion-col>
    </ion-row>
    <SchoolList :data-list="filteredDataList" />
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
