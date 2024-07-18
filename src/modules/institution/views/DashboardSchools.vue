<script setup lang="ts">
import { ref } from 'vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import SchoolCards from '@/modules/institution/components/SchoolCards.vue'
import SchoolList from '@/modules/institution/components/SchoolList.vue'

const schoolCount = ref(154)
const classCount = ref(25)
const approvalRate = ref(48)
const teacherCount = ref(30)

const schools = ref([
  {
    name: 'Escola Mercúrio',
    address: 'Rua A, Bairro B',
    showDetails: false,
    series: [
      {
        name: 'Educação Infantil',
        classes: [
          { name: 'Creche - Turma A', teacher: 'Marie Curie', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Brincadeiras Educativas', 'Artes'] },
          { name: 'Creche - Turma B', teacher: 'Isaac Newton', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Brincadeiras Educativas', 'Artes'] },
        ],
      },
      {
        name: 'Ensino Fundamental I',
        classes: [
          { name: '1º ano - Turma A', teacher: 'Albert Einstein', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Português', 'Matemática', 'Ciências'] },
          { name: '1º ano - Turma B', teacher: 'Richard Feynman', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Português', 'Matemática', 'Ciências'] },
        ],
      },
    ],
  },
])
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
