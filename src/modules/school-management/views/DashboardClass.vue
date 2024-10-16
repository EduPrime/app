<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import ClassroomList from '@/modules/school-management/components/ClassroomList.vue'
import SchoolCards from '@/modules/school-management/components/SchoolCards.vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ClassroomService from '../services/ClassroomService'

const router = useRouter()

// Estados para os dados da instituição e carregamento
const classroomService = new ClassroomService()
const dataList = ref<Tables<'classroom'>[]>([])
const schoolCount = ref(154)
const classCount = ref(25)
const approvalRate = ref(48)
const teacherCount = ref(30)
const searchQuery = ref('')

const filteredDataList = computed(() => {
  if (!searchQuery.value) {
    return dataList.value
  }

  return dataList.value.filter((classroom: Tables<'classroom'>) =>
    classroom.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

async function loadClassrooms() {
  try {
    const classrooms = await classroomService.getAll() // getAll() pode retornar null
    dataList.value = classrooms ?? [] // Se retornar null, atribuímos um array vazio
  }
  catch (error) {
    console.error('Erro ao carregar as salas de aula:', error)
  }
}

function navigateToRegister() {
  router.push({ name: 'RegisterClass' })
}

onMounted(() => {
  loadClassrooms()
})
</script>

<template>
  <ContentLayout>
    <SchoolCards
      :student-count="schoolCount" :class-count="classCount" :approval-rate="approvalRate"
      :teacher-count="teacherCount"
    />
    <ion-toolbar>
      <ion-title>Turmas ativas ({{ filteredDataList.length }})</ion-title>
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
    <ClassroomList :data-list="filteredDataList" />
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
