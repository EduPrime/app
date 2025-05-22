<script setup lang="ts">
import type { Classroom } from '@prisma/client'
import ClassroomDetailView from './ClassroomDetailView.vue'
import ListWithActionClassroom from './ListWithActionClassroom.vue'
import RegisterClassroomMobile from './RegisterClassroomMobile.vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import showToast from '@/utils/toast-alert'
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonIcon, IonModal, IonPage, IonRow, IonSearchbar, IonText } from '@ionic/vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ClassroomService from '../../services/ClassroomService'

const router = useRouter()
const route = router.currentRoute
const classroomService = new ClassroomService()
const dataList = ref<Classroom[]>([])
const searchQuery = ref('')
const isModalAddClassroom = ref(false)
const editingId = ref<string | undefined>(undefined)

const seeModal = ref({ modal: false, data: undefined as any })
const editModal = ref({ modal: false, data: undefined })
const deleteModal = ref<{ modal: boolean, data: Classroom | undefined }>({ modal: false, data: undefined })

const adaptedDataList = computed(() => {
  return dataList.value.map(item => ({
    id: item.id,
    name: item.name,
    abbreviation: item.abbreviation,
    room: item.room,
    period: item.period,
    year: item.year,
    maxStudents: item.maxStudents,
    totalStudents: item.totalStudents,
    pcdStudents: item.pcdStudents,
    startTime: item.startTime,
    endTime: item.endTime,
    dayofweek: item.dayofweek,
    series: (item as any).series,
    school: (item as any).school,
    createdAt: item.createdAt ? item.createdAt.toString() : undefined,
    updatedAt: item.updatedAt ? item.updatedAt.toString() : undefined,
    deletedAt: item.deletedAt ? item.deletedAt.toString() : undefined,
  }))
})

const filteredDataList = computed(() => {
  const filtered = searchQuery.value
    ? adaptedDataList.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        || (item.abbreviation && item.abbreviation.toLowerCase().includes(searchQuery.value.toLowerCase()))
        || (item.room && item.room.toLowerCase().includes(searchQuery.value.toLowerCase()))
        || ((item.series?.name || '').toLowerCase().includes(searchQuery.value.toLowerCase())),
      )
    : adaptedDataList.value

  return filtered.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
})

function setModalAddClassroom(open: boolean) {
  isModalAddClassroom.value = open
  if (open) {
    isModalAddClassroom.value = false
    setTimeout(() => (isModalAddClassroom.value = true), 10)
  }
}

function navigateToRegister() {
  if (isMobileDevice()) {
    editingId.value = undefined
    setModalAddClassroom(true)
  }
  else {
    router.push({ name: 'RegisterClassroom' })
  }
}

function setSeeModal(open: boolean) {
  if (open) {
    seeModal.value.modal = false
    setTimeout(() => (seeModal.value.modal = true), 10)
  }
  else {
    seeModal.value.modal = open
  }
}

function setEditModal(open: boolean) {
  if (open) {
    editModal.value.modal = false
    setTimeout(() => (editModal.value.modal = true), 10)
  }
  else {
    editModal.value.modal = open
    loadClassrooms()
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

async function loadClassrooms() {
  try {
    const classrooms = await classroomService.getClassrooms()
    dataList.value = classrooms || []
  }
  catch (error) {
    console.error('Erro ao carregar turmas:', error)
  }
}

function isMobileDevice() {
  return window.innerWidth <= 768
}

async function handleDelete() {
  if (deleteModal.value?.data?.id) {
    try {
      await classroomService.softDeleteClassroom(deleteModal.value.data.id)
      loadClassrooms()
      setDeleteModal(false)
      showToast('Turma excluída com sucesso', 'top', 'success')
    }
    catch (error: any) {
      console.error('Erro ao excluir turma:', error)

      if (error.message) {
        if (error.message.includes('alunos matriculados')) {
          showToast('Não é possível excluir: Existem alunos matriculados nesta turma', 'top', 'warning')
        } else if (error.message.includes('horários associados')) {
          showToast('Não é possível excluir: Existem horários associados a esta turma', 'top', 'warning')
        } else {
          showToast('Erro ao excluir: ' + error.message, 'top', 'danger')
        }
      } else {
        showToast('Erro desconhecido ao excluir turma', 'top', 'danger')
      }
    }
  }
  else {
    console.error('ID da turma não encontrado para exclusão:', deleteModal)
  }
}

onMounted(() => {
  loadClassrooms()
})

watch(
  () => route.value.query,
  (query) => {
    if (query.refresh) {
      loadClassrooms()
    }
  },
  { deep: true },
)
</script>

<template>
  <IonPage>
    <ContentLayout>
      <div class="ion-margin-top">
        <IonRow class="ion-align-items-center ion-justify-content-between">
          <IonCol size="10">
            <IonSearchbar v-model="searchQuery" placeholder="Buscar turma" />
          </IonCol>
          <IonCol size="2" class="ion-text-end">
            <IonButton id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister()">
              <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
              <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
              <span class="ion-hide-sm-down">Novo</span>
            </IonButton>
          </IonCol>
        </IonRow>

        <ListWithActionClassroom
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
              router.push({ name: 'RegisterClassroom', params: { id: event.data?.id } })
            }
          }"
          @update:see="(event) => {
            if (isMobileDevice()) {
              seeModal = event
              setSeeModal(true)
            }
            else {
              router.push({ name: 'ClassroomDetails', params: { id: event.data?.id } })
            }
          }"
        />

        <!-- Modais mobile -->
        <IonModal
          :is-open="isModalAddClassroom"
          :expand-to-scroll="false"
          :initial-breakpoint="0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @ion-modal-did-dismiss="setModalAddClassroom(false)"
        >
          <RegisterClassroomMobile
            @saved="loadClassrooms(); setModalAddClassroom(false)"
            @cancel="setModalAddClassroom(false)"
            @error="(message, color) => { showToast(message, 'top', color); }"
          />
        </IonModal>

        <IonModal
          :is-open="editModal.modal"
          :expand-to-scroll="false"
          :initial-breakpoint="0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @ion-modal-did-dismiss="setEditModal(false)"
        >
          <IonContent>
            <RegisterClassroomMobile
              :edit-id="editingId"
              @saved="loadClassrooms(); setEditModal(false)"
              @cancel="setEditModal(false)"
              @error="(message, color) => { showToast(message, 'top', color); }"
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
            <ClassroomDetailView
              :items="seeModal.data"
              name="Detalhes da turma"
              @close="setSeeModal(false)"
              @edit="() => {
                editingId = seeModal.data?.id;
                setSeeModal(false);
                setEditModal(true);
              }"
            />
          </IonContent>
        </IonModal>

        <IonModal id="delete-modal" :is-open="deleteModal.modal" @ion-modal-did-dismiss="setDeleteModal(false)">
          <IonCard class="ion-no-margin">
            <IonCardHeader>
              <IonCardTitle>Excluir turma</IonCardTitle>
              <IonText class="ion-padding-vertical">
                Tem certeza que deseja excluir esta turma?
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
  </IonPage>
</template>

<style scoped>
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
