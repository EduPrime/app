<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import EduprimeList from '@/components/ListWithAction.vue'
import EduprimeRegistredItems from '@/components/RegistredItems.vue'
import SearchBox from '@/components/SearchBox.vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { IonButton, IonContent, IonIcon, IonModal } from '@ionic/vue'
import { add } from 'ionicons/icons'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CourseService from '../services/CourseService'
// import RegisterSchool from './RegisterSchool.vue'  @TODO: usar como referencia para criar o registro de cursos

const router = useRouter()

//

const searchResult = ref()

// Estados para os dados da instituição e carregamento
const courseService = new CourseService()
const dataList = ref<Tables<'course'>[]>([])

// const searchQuery = ref('')
const isModalAddSchool = ref(false)

const seeModal = ref({ modal: false, data: undefined as any })
const editModal = ref({ modal: false, data: undefined })
const deleteModal = ref({ modal: false, data: undefined })

function setModalAddCourse(open: boolean) {
  isModalAddSchool.value = open
  if (open) {
    isModalAddSchool.value = false
    setTimeout(() => (isModalAddSchool.value = true), 10)
  }
}

function setSeeModal(open: boolean) {
  seeModal.value.modal = open
  if (open) {
    seeModal.value.modal = false
    setTimeout(() => (seeModal.value.modal = true), 10)
  }
}

function setEditModal(open: boolean) {
  editModal.value.modal = open
  if (open) {
    editModal.value.modal = false
    setTimeout(() => (editModal.value.modal = true), 10)
  }
}

// const newItem = ref()
// const searchResult = ref()

async function loardCourses() {
  try {
    const courses = await courseService.getAll() // getAll() pode retornar null
    dataList.value = courses ?? [] // Se retornar null, atribuímos um array vazio
  }
  catch (error) {
    console.error('Erro ao carregar os cursos:', error)
  }
}

function isMobileDevice() {
  return window.innerWidth <= 768
}

function navigateToRegister() {
  switch (isMobileDevice()) {
    case true:
      // Se for um dispositivo móvel, defina o ID de edição como indefinido e mostre a folha móvel
      // editingId.value = undefined
      setModalAddCourse(true)
      break
    case false:
      // Caso contrário, navegue para a página de registro
      router.push({ name: 'RegisterCourse' })
  }
}

onMounted(() => {
  loardCourses()
})
</script>

<template>
  <ContentLayout>
    <!-- <pre>
        searchResult: {{ searchResult?.at(0) }}
    </pre> -->
    <div class="ion-margin-top">
      <SearchBox
        table="course"
        placeholder="Busque o curso"
        :search-areas="['name']"
        filter-type="text"
        @update:search-result="searchResult = $event"
      >
        <IonButton id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister">
          <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
          <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
          <span class="ion-hide-sm-down">Novo</span>
        </IonButton>
      </SearchBox>
      <!-- :filter-areas="[{ table: 'institution', relationship: 'institutionId', placeholder: 'Instituição' }]" -->

      <EduprimeList :data-list="searchResult" @update:delete="deleteModal = $event" @update:edit="editModal = $event" @update:see="($event) => { console.log($event); seeModal = $event; }" />

      <!-- <SchoolList :data-list="filteredDataList" /> -->
      <IonModal
        :is-open="isModalAddSchool"
        :expand-to-scroll="false"
        :initial-breakpoint="0.95"
        :breakpoints="[0, 0.7, 0.95, 1]"
        @ion-modal-did-dismiss="setModalAddCourse(false)"
      >
        <IonContent>
          <RegisterSchool :close-modal="() => setModalAddCourse(false)" />
        </IonContent>
      </IonModal>
      <!-- Dismiss não funionou, estudar uma solução para isso -->

      <IonModal
        :is-open="seeModal.modal"
        :expand-to-scroll="false"
        :initial-breakpoint="0.95"
        :breakpoints="[0, 0.7, 0.95, 1]"
        @did-dismiss="setSeeModal(false)"
      >
        <IonContent>
          <EduprimeRegistredItems :items="seeModal.data" name="Detalhes do curso" @close="setSeeModal(false)" @edit="setEditModal(true)" />
        </IonContent>
      </IonModal>
    </div>
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

ion-segment {
  --background: rgba(var(--ion-color-tertiary-rgb), 0.15);
  --color: var(--ion-color-secondary);
}

.custom-button {
  max-width: 120px;
}
</style>
