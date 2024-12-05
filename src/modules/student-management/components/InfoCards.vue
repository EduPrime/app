<script setup lang="ts">
import ThemeFilterButtons from '@/components/theme/FilterButtons.vue'
import ThemeFilterExpansor from '@/components/theme/FilterExpansor.vue'
import SchoolService from '@/modules/school-management/services/SchoolService'
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { onMounted, ref, watch } from 'vue'

const schoolService = new SchoolService()

const studentCount = ref(0)
const teacherCount = ref(0)
const classCount = ref(0)
const approvalRate = ref(0)

async function loadCounters() {
  try {
    studentCount.value = await schoolService.getStudentCount()
    classCount.value = await schoolService.getClassCount()
    teacherCount.value = await schoolService.getTeacherCount()
    approvalRate.value = await schoolService.getApprovalRate()
  }
  catch (error) {
    console.error('Erro ao carregar os contadores:', error)
  }
}

onMounted(() => {
  loadCounters()
})
</script>

<template>
  <ThemeFilterExpansor title="Filtros" subtitle="Toque na seta ao lado para expandir os filtros">
    <ThemeFilterButtons v-model="chosenButton" />
  </ThemeFilterExpansor>
</template>

<style scoped>
ion-card {
  box-shadow: none;
  border-radius: 15px;
}

h1 {
  font-weight: 700;
}
</style>
