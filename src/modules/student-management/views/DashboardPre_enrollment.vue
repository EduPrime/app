<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import SchoolCards from '@/modules/school-management/components/SchoolCards.vue'
import Pre_enrollmentList from '@/modules/student-management/components/Pre_enrollmentList.vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Pre_enrollmentService from '../services/Pre_enrollmentService'

const router = useRouter()

// Estados para os dados da instituição e carregamento
const pre_enrollmentService = new Pre_enrollmentService()
const dataList = ref<(Tables<'pre_enrollment'> & { student: { name: string, address: string } })[]>([])
const schoolCount = ref(154)
const classCount = ref(25)
const approvalRate = ref(48)
const teacherCount = ref(30)
const searchQuery = ref('')

// Função para garantir que os dados tenham 'name' e 'address'
function formatPreEnrollments(pre_enrollments: any[]): (Tables<'pre_enrollment'> & { student: { name: string, address: string } })[] {
  return pre_enrollments.map(enrollment => ({
    ...enrollment,
    student: {
      name: enrollment.student?.name ?? '',
      address: enrollment.student?.address ?? '',
    },
  }))
}

const filteredDataList = computed(() => {
  if (!searchQuery.value) {
    return dataList.value
  }

  return dataList.value.filter(pre_enrollment =>
    pre_enrollment.student?.name && pre_enrollment.student?.name.toLowerCase().includes(searchQuery.value.toLowerCase()), // Verifica se enrollment.name existe antes de usar toLowerCase()
  )
})

async function loadPre_enrollment() {
  try {
    const pre_enrollments = await pre_enrollmentService.getAllWithStudents() // getAll() pode retornar null
    dataList.value = formatPreEnrollments(pre_enrollments ?? []) // Se for null, atribuímos um array vazio
  }
  catch (error) {
    console.error('Erro ao carregar as pre-matrículas:', error)
  }
}

/* function navigateToRegister() {
  router.push({ name: 'Pre_enrollmentRegister' })
} */

onMounted(() => {
  loadPre_enrollment()
})
</script>

<template>
  <ContentLayout>
    <SchoolCards
      :student-count="schoolCount" :class-count="classCount" :approval-rate="approvalRate"
      :teacher-count="teacherCount"
    />
    <ion-toolbar>
      <ion-title>Pré-Matrículas ({{ filteredDataList.length }})</ion-title>
    </ion-toolbar>
    <ion-row class="ion-align-items-center ion-justify-content-between">
      <ion-col>
        <ion-searchbar v-model="searchQuery" placeholder="Buscar pré-matrículas" />
      </ion-col>
      <!--    <ion-col size="2" class="ion-text-end">
        <ion-button id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister">
          <ion-icon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
          <ion-icon slot="start" :icon="add" class="ion-hide-sm-down" />
          <span class="ion-hide-sm-down">Novo</span>
        </ion-button>
      </ion-col> -->
    </ion-row>
    <Pre_enrollmentList :data-list="filteredDataList" />
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
