<script setup lang="ts">
import { ref } from 'vue'
import { schools as schoolData } from '../data/schools'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import SchoolCards from '@/modules/institution/components/SchoolCards.vue'
import SchoolList from '@/modules/institution/components/SchoolList.vue'

const schoolCount = ref(154)
const classCount = ref(25)
const approvalRate = ref(48)
const teacherCount = ref(30)

const schools = ref(schoolData)
</script>

<template>
  <content-layout>
    <ion-grid>
      <school-cards :student-count="schoolCount" :class-count="classCount" :approval-rate="approvalRate" :teacher-count="teacherCount" />
      <school-list :schools="schools" @update:schools="schools = $event" />
    </ion-grid>
  </content-layout>
</template>

<style scoped>
#create-button {
  margin: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title-container {
  display: flex;
  align-items: center;
}

.card-title-container ion-buttons {
  margin-left: 8px;
}
</style>
