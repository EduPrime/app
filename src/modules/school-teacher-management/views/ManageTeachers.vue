<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { add } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import TeacherService from '../services/TeacherService'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import TeacherList from '@/modules/school-teacher-management/components/TeacherList.vue'
import TeacherCards from '@/modules/school-teacher-management/components/TeacherCards.vue'
import type { Database, Enums, Tables } from '@/types/database.types'

const router = useRouter()

const teacherService = new TeacherService()
const teacherData = ref< Tables<'teacher'> | []>([])
const schoolCount = ref(154)
const classCount = ref(25)
const approvalRate = ref(48)
const teacherCount = ref(30)
const searchQuery = ref('')

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
    const teachers: any = await teacherService.getAll()
    teacherData.value = teachers || []
  }
  catch (error) {
    console.error('Erro ao carregar os professores:', error)
  }
}

function navigateToRegister() {
  router.push({ name: 'RegisterSchool' })
}
onMounted(() => {
  loadTeachers()
})
</script>

<template>
  <content-layout>
    <teacher-cards
      :student-count="schoolCount" :class-count="classCount" :approval-rate="approvalRate"
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
    <teacher-list :schools="filteredTeacher" @update:schools="teacherData = $event" />
  </content-layout>
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
