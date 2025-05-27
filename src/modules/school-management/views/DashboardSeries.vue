<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import EduprimeRegistredItems from '@/components/RegistredItems.vue'

import ListSeriesWithAction from '@/components/series/ListWithAction.vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import showToast from '@/utils/toast-alert'
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonIcon, IonModal, IonRow, IonText } from '@ionic/vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import SeriesService from '../services/SeriesService'
import RegisterSeries from './RegisterSeriesMobile.vue'

const router = useRouter()
const route = router.currentRoute
const seriesService = new SeriesService()
const dataList = ref<Tables<'series'>[]>([])
const searchQuery = ref('')
const isModalAddSchool = ref(false)

const seeModal = ref({ modal: false, data: undefined as any })
const editModal = ref({ modal: false, data: undefined })
const deleteModal = ref<{ modal: boolean, data: { id: string } | undefined }>({ modal: false, data: undefined })

const editingId = ref<string | undefined>(undefined)

function setModalAddSeries(open: boolean) {
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

function setDeleteModal(open: boolean) {
  if (open) {
    deleteModal.value.modal = false
    setTimeout(() => (deleteModal.value.modal = true), 10)
  }
  else {
    deleteModal.value.modal = open
  }
}

function isMobileDevice() {
  return window.innerWidth <= 768
}

function navigateToRegister() {
  if (isMobileDevice()) {
    editingId.value = undefined
    setModalAddSeries(true)
  }
  else {
    router.push({ name: 'RegisterSeries' })
  }
}

const filteredDataList = computed(() => {
  if (!searchQuery.value) {
    return dataList.value
  }

  return dataList.value.filter((series: any) =>
    series.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

async function loadSeries() {
  try {
    const series = await seriesService.getAllSeriesWithDetails()
    dataList.value = (series ?? []).map((item: Partial<Tables<'series'>>) => {
      const { course_stage, graduate, ...filteredItem } = item // Remove os campos indesejados

      return filteredItem as Tables<'series'>
    })
  }
  catch (error) {
    console.error('Erro ao carregar as séries:', error)
  }
}

// function navigateToRegister() {
//   router.push({ name: 'RegisterSeries' })
// }

async function handleDelete() {
  if (deleteModal.value?.data?.id) {
    try {
      await seriesService.softDeleteSeries(deleteModal.value.data.id)
      loadSeries()
      setDeleteModal(false)
    }
    catch (error: any) {
      console.error('Erro ao excluir função:', error)

      // Verifica se é o erro específico de servidores vinculados
      if (error.message && error.message.includes('servidores vinculados')) {
        showToast('Não é possível excluir: Existem servidores vinculados a essa função', 'top', 'warning')
      }
    }
  }
  else {
    console.error('ID da função não encontrado para exclusão:', deleteModal)
  }
}

onMounted(() => {
  loadSeries()
})

watch(
  () => route.value.query,
  (query) => {
    if (query.refresh) {
      loadSeries()
    }
  },
  { deep: true },
)
</script>

<template>
  <ContentLayout>
    <div class="ion-margin-top">
      <IonRow class="ion-align-items-center ion-justify-content-between">
        <IonCol size="10">
          <ion-searchbar v-model="searchQuery" placeholder="Buscar séries" />
        </IonCol>
        <IonCol size="2" class="ion-text-end">
          <IonButton id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister()">
            <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
            <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
            <span class="ion-hide-sm-down">Novo</span>
          </IonButton>
        </IonCol>
      </IonRow>

      <ListSeriesWithAction
        :data-list="filteredDataList"
        @update:delete="(event) => {
          deleteModal = event;
          setDeleteModal(true);
        }"
        @update:edit="(event) => {

          if (isMobileDevice()) {
            editingId = event.data?.id
            setEditModal(true)
          }
          else {
            router.push({ name: 'NewSerie', params: { id: event.data?.id } })
          }
        }"
        @update:see="(event) => {
          if (isMobileDevice()) {
            seeModal = event
          }
          else {
            router.push({ name: 'SerieDetails', params: { id: event.data?.id } })
          }
        }"
      />

      <!-- <EduprimeList
        :data-list="filteredDataList"
        @update:delete="(event) => {
          deleteModal = event;
          setDeleteModal(true);
        }"
        @update:edit="(event) => {

          if (isMobileDevice()) {
            editingId = event.data?.id
            setEditModal(true)
          }
          else {
            router.push({ name: 'RegisterSeries', params: { id: event.data?.id } })
          }
        }"
        @update:see="(event) => {
          if (isMobileDevice()) {
            seeModal = event
          }
          else {
            router.push({ name: 'RegistredItems', params: { id: event.data?.id } })
          }
        }"
      /> -->

      <IonModal
        :is-open="isModalAddSchool"
        :expand-to-scroll="false"
        :initial-breakpoint="0.95"
        :breakpoints="[0, 0.7, 0.95, 1]"
        @ion-modal-did-dismiss="setModalAddSeries(false)"
      >
        <IonContent>
          <RegisterSeries
            :close-modal="setModalAddSeries"
            @cancel="setModalAddSeries(false)"
            @saved="loadSeries(); setModalAddSeries(false)"
          />
        </IonContent>
      </IonModal>

      <IonModal
        :is-open="seeModal.modal"
        :expand-to-scroll="false"
        :initial-breakpoint="0.95"
        :breakpoints="[0, 0.7, 0.95, 1]"
        @did-dismiss="setSeeModal(false)"
      >
        <IonContent>
          <EduprimeRegistredItems
            :items="seeModal.data"
            type="settings"
            name="Detalhes da série"
            @close="setSeeModal(false)"
            @edit="() => {
              editingId = seeModal.data?.id;
              setSeeModal(false);
              setEditModal(true);
            }"
          />
        </IonContent>
      </IonModal>

      <IonModal
        :is-open="editModal.modal"
        :expand-to-scroll="false"
        :initial-breakpoint="0.95"
        :breakpoints="[0, 0.7, 0.95, 1]"
        @ion-modal-did-dismiss="setEditModal(false)"
      >
        <IonContent>
          <RegisterSeries
            :edit-id="editingId"
            :close-modal="setEditModal"
            @saved="loadSeries(); setEditModal(false)"
            @cancel="setEditModal(false)"
          />
        </IonContent>
      </IonModal>
      <IonModal id="delete-modal" :is-open="deleteModal.modal" @ion-modal-did-dismiss="setDeleteModal(false)">
        <IonCard class="ion-no-margin">
          <IonCardHeader>
            <IonCardTitle>Excluir Série</IonCardTitle>
            <IonText class="ion-padding-vertical">
              Tem certeza que deseja excluir esta série?
            </IonText>
            <div style="display: flex;">
              <IonButton
                size="small"
                style="margin-left: auto; margin-right: 8px; text-transform: capitalize;"
                color="medium"
                @click="setDeleteModal(false)"
              >
                Cancelar
              </IonButton>
              <IonButton
                style="text-transform: capitalize;"
                size="small"
                color="danger"
                @click="handleDelete()"
              >
                Confirmar
              </IonButton>
            </div>
          </IonCardHeader>
        </IonCard>
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
#delete-modal {
  --width: 300px;
  --height: auto;
  --border-radius: 10px;
  --box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
}
</style>
