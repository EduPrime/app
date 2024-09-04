<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { add } from 'ionicons/icons'
import { useRoute, useRouter } from 'vue-router'
import TeacherService from '../services/TeacherService'
import SchoolService from '../services/SchoolService'
import SeriesService from '../services/SeriesService'
import StudentService from '../services/StudentService'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import TeacherList from '@/modules/school-teacher-management/components/TeacherList.vue'
import TeacherCards from '@/modules/school-teacher-management/components/TeacherCards.vue'
import type { Tables } from '@/types/database.types'

const router = useRouter()
const route = useRoute()

const teacherService = new TeacherService()
const schoolService = new SchoolService()
const seriesService = new SeriesService()
const studentService = new StudentService()

const teacherData = ref< Tables<'teacher'> | []>([])
const schoolCount = ref(0)
const seriesCount = ref(0)
const studentCount = ref(0)
const teacherCount = ref(0)
const searchQuery = ref('')

onMounted(async () => {
  try {
    schoolCount.value = await schoolService.countEntries()
    teacherCount.value = await teacherService.countEntries()
    seriesCount.value = await seriesService.countEntries()
    studentCount.value = await studentService.countEntries()
  }
  catch (error) {
    console.error('Erro ao contar escolas:', error)
  }
})

const filteredTeacher = computed(() => {
  if (!searchQuery.value) {
    return teacherData.value
  }
  const result: any = teacherData.value
  return result.filter((t: { name: string, address: string }) =>
    t.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    || (t.address && t.address.toLowerCase().includes(searchQuery.value.toLowerCase())),
  )
})

async function loadTeachers() {
  try {
    const teachers: any = await teacherService.getAll('created_at', true)
    teacherData.value = teachers || []
  }
  catch (error) {
    console.error('Erro ao carregar os professores:', error)
  }
}

function navigateToRegister() {
  router.push({ name: 'RegisterTeacher' })
}
onMounted(() => {
  loadTeachers()
})
// force reload teachers when returning from RegisterTeacher
watch(
  () => route.name,
  (newName, oldName) => {
    if (newName === 'ManageTeachers' && oldName === 'RegisterTeacher') {
      loadTeachers()
    }
  },
)
</script>

<template>
  <ContentLayout>
    <TeacherCards
      :school-count="schoolCount" :series-count="seriesCount" :student-count="studentCount"
      :teacher-count="teacherCount"
    />
    <ion-toolbar>
      <ion-title>Professores ativos ({{ filteredTeacher.length }})</ion-title>
    </ion-toolbar>
    <ion-row class="ion-align-items-center ion-justify-content-between">
      <ion-col size="10">
        <ion-searchbar v-model="searchQuery" placeholder="Buscar professor" />
      </ion-col>
      <ion-col size="2" class="ion-text-end">
        <ion-button id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister">
          <ion-icon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
          <ion-icon slot="start" :icon="add" class="ion-hide-sm-down" />
          <span class="ion-hide-sm-down">Novo</span>
        </ion-button>
      </ion-col>
    </ion-row>
    <TeacherList :teachers="filteredTeacher" @update:teachers="loadTeachers" />
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
