<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import EduprimeList from '@/components/ListWithAction.vue'
import EduprimeRegistredItems from '@/components/RegistredItems.vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { IonButton, IonContent, IonIcon, IonModal } from '@ionic/vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SchoolService from '../services/SchoolService'
import RegisterSchool from './RegisterSchool.vue'

const router = useRouter()

// Estados para os dados da instituição e carregamento
const schoolService = new SchoolService()
const dataList = ref<Tables<'school'>[]>([])
// const schoolData = ref<Array<{ school: Tables<'school'>, courses: Tables<'course'>[], series: Tables<'series'>[] }> | []>([])
// const schoolCount = ref(0)
// const classCount = ref(0)
// const approvalRate = ref(0)
// const teacherCount = ref(0)
const searchQuery = ref('')
const isModalAddSchool = ref(false)

const seeModal = ref({ modal: false, data: undefined as any })
const editModal = ref({ modal: false, data: undefined })
const deleteModal = ref({ modal: false, data: undefined })

function setModalAddSchool(open: boolean) {
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

const newItem = ref()
const searchResult = ref()

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

function isMobileDevice() {
  return window.innerWidth <= 768
}

function navigateToRegister() {
  switch (isMobileDevice()) {
    case true:
      // Se for um dispositivo móvel, defina o ID de edição como indefinido e mostre a folha móvel
      // editingId.value = undefined
      setModalAddSchool(true)
      break
    case false:
      // Caso contrário, navegue para a página de registro
      router.push({ name: 'RegisterSchool' })
  }
}

onMounted(() => {
  loadSchools()
})
</script>

<template>
  <ContentLayout>
    <!-- <SchoolCards
      :student-count="schoolCount"
      :teacher-count="teacherCount"
      :class-count="classCount"
      :approval-rate="approvalRate"
    /> -->
    <!--  -->
    <!--  -->

    <!-- <ion-toolbar>
      <ion-title>Escolas ativas ({{ filteredDataList.length }})</ion-title>
    </ion-toolbar> -->

    <div class="ion-margin-top">
      <SearchBox table="school" placeholder="Nome da escola" @update:search-result="searchResult = $event" @update:new-item="newItem = $event" />

      <ion-row class="ion-align-items-center ion-justify-content-between">
        <ion-col size="10">
          <ion-searchbar v-model="searchQuery" placeholder="Buscar escola" />
        </ion-col>
        <ion-col size="2" class="ion-text-end">
          <IonButton id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister">
            <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
            <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
            <span class="ion-hide-sm-down">Novo</span>
          </IonButton>
        </ion-col>
      </ion-row>

      <EduprimeList :data-list="filteredDataList" @update:delete="deleteModal = $event" @update:edit="editModal = $event" @update:see="($event) => { console.log($event); seeModal = $event; }" />

      <!-- <SchoolList :data-list="filteredDataList" /> -->
      <IonModal
        :is-open="isModalAddSchool"
        :expand-to-scroll="false"
        :initial-breakpoint="0.95"
        :breakpoints="[0, 0.7, 0.95, 1]"
        @ion-modal-did-dismiss="setModalAddSchool(false)"
      >
        <IonContent>
          <RegisterSchool :close-modal="() => setModalAddSchool(false)" />
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
          <EduprimeRegistredItems :items="seeModal.data" name="Detalhes da escola" @close="setSeeModal(false)" @edit="setEditModal(true)" />
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
