<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import SchoolCards from '@/modules/school-management/components/SchoolCards.vue'
import EnrollmentList from '@/modules/student-management/components/EnrollmentList.vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import EnrollmentService from '../services/EnrollmentService'

const router = useRouter()

// Estados para os dados da instituição e carregamento
const enrollmentService = new EnrollmentService()
const dataList = ref<Tables<'enrollment'>[]>([])
const schoolCount = ref(154)
const classCount = ref(25)
const approvalRate = ref(48)
const teacherCount = ref(30)
const searchQuery = ref('')

const filteredDataList = computed(() => {
  if (!searchQuery.value) {
    return dataList.value
  }

  return dataList.value.filter((enrollment: Tables<'enrollment'>) =>
    enrollment.name && enrollment.name.toLowerCase().includes(searchQuery.value.toLowerCase()), // Verifica se enrollment.name existe antes de usar toLowerCase()
  )
})

async function loadEnrollment() {
  try {
    const enrollments = await enrollmentService.getAll() // getAll() pode retornar null
    dataList.value = enrollments ?? [] // Se for null, atribuímos um array vazio
  }
  catch (error) {
    console.error('Erro ao carregar as matrículas:', error)
  }
}

function navigateToRegister() {
  router.push({ name: 'EnrollmentRegister' })
}

onMounted(() => {
  loadEnrollment()
})
</script>

<template>
  <ContentLayout>
    <SchoolCards
      :student-count="schoolCount" :class-count="classCount" :approval-rate="approvalRate"
      :teacher-count="teacherCount"
    />
    <ion-toolbar>
      <ion-title>Alunos Matriculados ({{ filteredDataList.length }})</ion-title>
    </ion-toolbar>
    <ion-row class="ion-align-items-center ion-justify-content-between">
      <ion-col size="10">
        <ion-searchbar v-model="searchQuery" placeholder="Buscar alunos" />
      </ion-col>
      <ion-col size="2" class="ion-text-end">
        <ion-button id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister">
          <ion-icon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
          <ion-icon slot="start" :icon="add" class="ion-hide-sm-down" />
          <span class="ion-hide-sm-down">Novo</span>
        </ion-button>
      </ion-col>
    </ion-row>
    <EnrollmentList :data-list="filteredDataList" />
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
