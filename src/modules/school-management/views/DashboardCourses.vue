<script setup lang="ts">
import type { Course } from '@prisma/client'
import CourseDetailView from '@/components/course/DetailsView.vue'
import ListWithActionCourse from '@/components/course/ListWithAction.vue'
import SearchBox from '@/components/SearchBox.vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import showToast from '@/utils/toast-alert'
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonModal, IonPage, IonText } from '@ionic/vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CourseService from '../services/CourseService'
import CourseMobile from './course/Register.vue'

const router = useRouter()
const route = router.currentRoute
const courseService = new CourseService()
const dataList = ref<Course[]>([])
const searchQuery = ref('')
const isModalAddCourse = ref(false)
const editingId = ref<string | undefined>(undefined)
const searchResult = ref()

const seeModal = ref({ modal: false, data: undefined as any })
const editModal = ref({ modal: false, data: undefined })
const deleteModal = ref<{ modal: boolean, data: Course | undefined }>({ modal: false, data: undefined })

const adaptedDataList = computed(() => {
  return dataList.value.map(item => ({
    id: item.id,
    name: item.name,
    abbreviation: item.abbreviation,
    description: item.description,
    createdAt: item.createdAt ? item.createdAt.toString() : undefined,
    updatedAt: item.updatedAt ? item.updatedAt.toString() : undefined,
    deletedAt: item.deletedAt ? item.deletedAt.toString() : undefined,
  }))
})

const filteredDataList = computed(() => {
  // Primeiro filtra a lista se houver uma consulta de busca
  const filtered = searchQuery.value
    ? adaptedDataList.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        || (item.abbreviation && item.abbreviation.toLowerCase().includes(searchQuery.value.toLowerCase())),
      )
    : adaptedDataList.value

  // Depois ordena a lista alfabeticamente pelo nome
  return filtered.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
})

function setModalAddCourse(open: boolean) {
  isModalAddCourse.value = open
  if (open) {
    isModalAddCourse.value = false
    setTimeout(() => (isModalAddCourse.value = true), 10)
  }
}

function navigateToRegister() {
  if (isMobileDevice()) {
    editingId.value = undefined
    setModalAddCourse(true)
  }
  else {
    router.push({ name: 'NewCourse' })
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

async function loadCourses() {
  try {
    const courses = await courseService.getItems()
    dataList.value = courses || []
  }
  catch (error) {
    console.error('Erro ao carregar funções:', error)
  }
}

function isMobileDevice() {
  return window.innerWidth <= 768
}

async function handleDelete() {
  if (deleteModal.value?.data?.id) {
    try {
      await courseService.softDeleteItem(deleteModal.value.data.id)
      loadCourses()
      setDeleteModal(false)
      showToast('Curso excluído com sucesso', 'top', 'success')
    }
    catch (error: any) {
      console.error('Erro ao excluir curso:', error)

      // @TODO: Adaptar a mensagem para series e/ou turmas vinculadas ao curso
      if (error.message && error.message.includes('series vinculadas')) {
        showToast('Não é possível excluir: Existem séries vinculados a esse curso', 'top', 'warning')
      }
    }
  }
  else {
    console.error('ID do curso não encontrado para exclusão:', deleteModal)
  }
}

onMounted(() => {
  loadCourses()
})

watch(
  () => route.value.query,
  (query) => {
    if (query.refresh) {
      loadCourses()
    }
  },
  { deep: true },
)
</script>

<template>
  <IonPage>
    <ContentLayout>
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

        <ListWithActionCourse
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
              router.push({ name: 'RegisterCourse', params: { id: event.data?.id } })
            }
          }"
          @update:see="(event) => {
            if (isMobileDevice()) {
              seeModal = event
            }
            else {
              router.push({ name: 'CourseDetails', params: { id: event.data?.id } })
            }
          }"
        />

        <IonModal
          :is-open="isModalAddCourse"
          :expand-to-scroll="false"
          :initial-breakpoint="0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @ion-modal-did-dismiss="setModalAddCourse(false)"
        >
          <CourseMobile
            @saved="loadCourses(); setModalAddCourse(false)"
            @cancel="setModalAddCourse(false)"
            @error="(message, color) => { showToast(message, 'top', color); }"
          />
        </IonModal>

        <IonModal
          :is-open="seeModal.modal"
          :expand-to-scroll="false"
          :initial-breakpoint="0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @did-dismiss="setSeeModal(false)"
        >
          <IonContent>
            <CourseDetailView
              :items="seeModal.data"
              name="Detalhes do curso"
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
            <CourseMobile
              :edit-id="editingId"
              @saved="loadCourses(); setEditModal(false)"
              @cancel="setEditModal(false)"
              @error="(message, color) => { showToast(message, 'top', color); }"
            />
          </IonContent>
        </IonModal>

        <IonModal id="delete-modal" :is-open="deleteModal.modal" @ion-modal-did-dismiss="setDeleteModal(false)">
          <IonCard class="ion-no-margin">
            <IonCardHeader>
              <IonCardTitle>Excluir curso</IonCardTitle>
              <IonText class="ion-padding-vertical">
                Tem certeza que deseja excluir este curso?
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
