<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SchoolService from '../services/SchoolService'

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
  <ion-row>
    <ion-col size="6" size-md="6" size-lg="3">
      <ion-card color="primary">
        <ion-card-header>
          <ion-card-title>
            Alunos
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl">
            {{ studentCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>

    <ion-col size="6" size-md="6" size-lg="3">
      <ion-card color="secondary">
        <ion-card-header>
          <ion-card-title>
            Docentes
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl">
            {{ teacherCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>

    <ion-col size="6" size-md="6" size-lg="3">
      <ion-card color="tertiary">
        <ion-card-header>
          <ion-card-title>
            Turmas
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl">
            {{ classCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>

    <ion-col size="6" size-md="6" size-lg="3">
      <ion-card color="lightaccent">
        <ion-card-header>
          <ion-card-title>
            Aprovação
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl">
            {{ approvalRate }}%
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>
  </ion-row>
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
