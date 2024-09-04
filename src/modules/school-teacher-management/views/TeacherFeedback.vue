<script setup lang="ts">
import { onMounted, ref } from 'vue'

import SchoolService from '../services/SchoolService'
import ContentLayout from '@/components/theme/ContentLayout.vue'

const schoolService = new SchoolService()

const courseData = ref()
async function pegaCourseByID(id: string) {
  try {
    const course = await schoolService.getCoursesAndSeriesBySchoolId(id)
    console.log('Curso:', course)
  }
  catch (error) {
    console.error('Erro ao carregar o curso:', error)
  }
}

onMounted(async () => {
  courseData.value = await pegaCourseByID('db120d49-3e60-4e25-ad35-5e4586614b07')
  console.log('CourseData:', courseData.value)
})
</script>

<template>
  <ContentLayout>
    Teste
    <p id="escolas" />
    <pre>
    {{ courseData }}
</pre>
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
