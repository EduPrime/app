<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { add } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import SchoolCards from '@/modules/institution/components/SchoolCards.vue'
import SchoolList from '@/modules/institution/components/SchoolList.vue'
import type { Database, Enums, Tables } from '@/types/database.types'
import SchoolService from '../services/SchoolService'

const router = useRouter()

// Estados para os dados da instituição e carregamento
const schoolService = new SchoolService()
const schoolData = ref<Array<{ school: Tables<'school'>; courses: Tables<'course'>[]; series: Tables<'series'>[] }> | []>([])
const schoolCount = ref(154)
const classCount = ref(25)
const approvalRate = ref(48)
const teacherCount = ref(30)
const searchQuery = ref('')

const filteredSchool = computed( () => {
  if (!searchQuery.value) {
    return schoolData.value
  }

  const result = schoolData.value
  return result.filter(({ school }) =>
    school.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (school.address && school.address.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
})

async function loadSchools() {
  try {
    const schools = await schoolService.getAll()
    if (schools && schools.length) {
      const schoolsWithCourses = await Promise.all(schools.map(async (school) => {
        const data = await schoolService.getBySchoolId(school.id)
        
        return {
          school,
          courses: data?.courses || [],
          series: data?.series || [],
          classroom: data?.classroom || [],
        }
      }))
      schoolData.value = schoolsWithCourses
    }
  } catch (error) {
    console.error('Erro ao carregar as escolas:', error)
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
  <content-layout>
    <school-cards
      :student-count="schoolCount" :class-count="classCount" :approval-rate="approvalRate"
      :teacher-count="teacherCount"
    />
    <ion-toolbar>
      <ion-title>Escolas ativas ({{ filteredSchool.length }})</ion-title>
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
    <ion-row v-for="school in filteredSchool" :key="schoolData">
      <ion-col size="12">
      </ion-col>
    </ion-row> 
    <school-list :schools="filteredSchool" @update:schools="schoolData = $event" />
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