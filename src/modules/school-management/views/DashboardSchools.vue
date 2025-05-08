<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import SearchBox from '@/components/SearchBox.vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import SchoolCards from '@/modules/school-management/components/SchoolCards.vue'
import SchoolList from '@/modules/school-management/components/SchoolList.vue'
import { IonCol, IonRow } from '@ionic/vue'
import { computed, onMounted, ref } from 'vue'
import SchoolService from '../services/SchoolService'

// const router = useRouter()

// Estados para os dados da instituição e carregamento
const schoolService = new SchoolService()
const dataList = ref<Tables<'school'>[]>([])
// const schoolData = ref<Array<{ school: Tables<'school'>, courses: Tables<'course'>[], series: Tables<'series'>[] }> | []>([])
const schoolCount = ref(0)
const classCount = ref(0)
const approvalRate = ref(0)
const teacherCount = ref(0)
const searchQuery = ref('')

//
const newItem = ref()
const searchResult = ref()
//
const filteredDataList = computed(() => {
  if (!searchQuery.value) {
    return dataList.value
  }

  return dataList.value.filter((classroom: Tables<'school'>) =>
    classroom.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

async function loadSchools() {
  try {
    const schools = await schoolService.getAll() // getAll() pode retornar null
    dataList.value = schools ?? [] // Se retornar null, atribuímos um array vazio
  }
  catch (error) {
    console.error('Erro ao carregar as escolas:', error)
  }
}

// function navigateToRegister() {
//   router.push({ name: 'RegisterSchool' })
// }

onMounted(() => {
  loadSchools()
})
</script>

<template>
  <ContentLayout>
    <SchoolCards
      :student-count="schoolCount"
      :teacher-count="teacherCount"
      :class-count="classCount"
      :approval-rate="approvalRate"
    />
    <!--  -->
    <!--  -->

    <ion-toolbar>
      <ion-title>Escolas ativas ({{ filteredDataList.length }})</ion-title>
    </ion-toolbar>

    <IonRow class="ion-align-items-center ion-justify-content-between">
      <IonCol size="11" size-md="10">
        <SearchBox table="school" placeholder="Nome da escola" @update:search-result="searchResult = $event" @update:new-item="newItem = $event" />
      </IonCol>
      <IonCol size="1" size-md="2" class="ion-text-end">
        <!-- @TODO: Posicionar o botão de adicionar aqui -->
      </IonCol>
    </IonRow>

    <SchoolList :data-list="searchResult" />
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
