<script setup lang="ts">
import { computed, ref } from 'vue'
import { add } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { schools as schoolData } from '../data/schools'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import SchoolCards from '@/modules/institution/components/SchoolCards.vue'
import SchoolList from '@/modules/institution/components/SchoolList.vue'

const router = useRouter()

const schoolCount = ref(154)
const classCount = ref(25)
const approvalRate = ref(48)
const teacherCount = ref(30)

const schools = ref(schoolData)
const searchQuery = ref('')
const filteredSchools = computed(() => {
  if (!searchQuery.value) {
    return schools.value
  }
  return schools.value.filter(school =>
    school.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    || school.address.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
function navigateToRegister() {
  router.push({ name: 'RegisterInstitution' })
}
</script>

<template>
  <content-layout>
      <school-cards :student-count="schoolCount" :class-count="classCount" :approval-rate="approvalRate"
        :teacher-count="teacherCount" />
     <ion-toolbar>
      <ion-title>Escolas ativas ({{ filteredSchools.length }})</ion-title>
      </ion-toolbar>
      <ion-row class="ion-align-items-center ion-justify-content-between">
        <ion-col size-sm="6" size-md="10" size-lg="10">
          <ion-searchbar v-model="searchQuery" placeholder="Buscar escola" />
        </ion-col>
        <ion-col size="2" class="ion-text-end">
          <ion-button id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister">
            <ion-icon slot="start" :icon="add" />
            Novo
          </ion-button>
        </ion-col>
      </ion-row>
      <school-list :schools="filteredSchools" @update:schools="schools = $event" />
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
