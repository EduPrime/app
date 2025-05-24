<script setup lang="ts">
import type { Institution } from '@prisma/client'
import InstitutionDetailView from './InstitutionDetailView.vue'
import ListWithActionInstitution from './ListWithActionInstitution.vue'
import RegisterInstitutionMobile from './RegisterInstitutionMobile.vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import showToast from '@/utils/toast-alert'
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonIcon, IonModal, IonPage, IonRow, IonSearchbar, IonText } from '@ionic/vue'
import { add, business } from 'ionicons/icons'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import InstitutionService from '../../services/InstitutionService'

const router = useRouter()
const route = router.currentRoute
const institutionService = new InstitutionService()
const dataList = ref<Institution[]>([])
const searchQuery = ref('')
const isModalAddInstitution = ref(false)
const editingId = ref<string | undefined>(undefined)
const seeModal = ref({ modal: false, data: undefined as any })
const editModal = ref({ modal: false, data: undefined })
const deleteModal = ref<{ modal: boolean, data: Institution | undefined }>({ modal: false, data: undefined })

function delayModalOpen(modalState: any) {
  modalState.modal = false
  setTimeout(() => (modalState.modal = true), 10)
}

const adaptedDataList = computed(() => {
  return dataList.value.map(item => ({
    id: item.id,
    name: item.name,
    address: item.address,
    city: item.city,
    state: item.state,
    postalCode: item.postalCode,
    phone: item.phone,
    email: item.email,
    metadata: item.metadata,
    createdAt: item.createdAt ? item.createdAt.toString() : undefined,
    updatedAt: item.updatedAt ? item.updatedAt.toString() : undefined,
    deletedAt: item.deletedAt ? item.deletedAt.toString() : undefined,
  }))
})

const filteredDataList = computed(() => {
  const filtered = searchQuery.value
    ? adaptedDataList.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        || (item.city && item.city.toLowerCase().includes(searchQuery.value.toLowerCase()))
        || (item.state && item.state.toLowerCase().includes(searchQuery.value.toLowerCase()))
        || (item.email && item.email.toLowerCase().includes(searchQuery.value.toLowerCase())),
      )
    : adaptedDataList.value

  return filtered.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
})

function setModalAddInstitution(open: boolean) {
  if (open) {
    delayModalOpen({ modal: isModalAddInstitution })
  } else {
    isModalAddInstitution.value = open
  }
}

function navigateToRegister() {
  if (isMobileDevice()) {
    editingId.value = undefined
    setModalAddInstitution(true)
  }
  else {
    router.push({ name: 'RegisterInstitution' })
  }
}

function setSeeModal(open: boolean) {
  if (open) {
    delayModalOpen(seeModal.value)
  } else {
    seeModal.value.modal = open
  }
}

function setEditModal(open: boolean) {
  if (open) {
    delayModalOpen(editModal.value)
  } else {
    editModal.value.modal = open
    loadInstitutions()
  }
}

function setDeleteModal(open: boolean) {
  if (open) {
    delayModalOpen(deleteModal.value)
  } else {
    deleteModal.value.modal = open
  }
}

async function loadInstitutions() {
  try {
    const institutions = await institutionService.getInstitutions()
    dataList.value = institutions || []
  }
  catch (error) {
    console.error('Erro ao carregar instituições:', error)
  }
}

function isMobileDevice() {
  return window.innerWidth <= 768
}

async function handleDelete() {
  if (deleteModal.value?.data?.id) {
    try {
      await institutionService.softDeleteInstitution(deleteModal.value.data.id)
      loadInstitutions()
      setDeleteModal(false)
      showToast('Instituição excluída com sucesso', 'top', 'success')
    }
    catch (error: any) {
      console.error('Erro ao excluir instituição:', error)

      if (error.message) {
        if (error.message.includes('escolas vinculadas')) {
          showToast('Não é possível excluir: Existem escolas vinculadas a essa instituição', 'top', 'warning')
        } else if (error.message.includes('cursos vinculados')) {
          showToast('Não é possível excluir: Existem cursos vinculados a essa instituição', 'top', 'warning')
        } else {
          showToast('Erro ao excluir: ' + error.message, 'top', 'danger')
        }
      } else {
        showToast('Erro desconhecido ao excluir instituição', 'top', 'danger')
      }
    }
  }
  else {
    console.error('ID da instituição não encontrado para exclusão:', deleteModal)
  }
}

onMounted(() => {
  loadInstitutions()
})

watch(
  () => route.value.query,
  (query) => {
    if (query.refresh) {
      loadInstitutions()
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
            <IonSearchbar v-model="searchQuery" placeholder="Buscar instituição" />
          </IonCol>
          <IonCol size="2" class="ion-text-end">
            <IonButton id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister()">
              <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
              <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
              <span class="ion-hide-sm-down">Novo</span>
            </IonButton>
          </IonCol>
        </IonRow>

        <ListWithActionInstitution
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
              router.push({ name: 'RegisterInstitution', params: { id: event.data?.id } })
            }
          }"
          @update:see="(event) => {
            if (isMobileDevice()) {
              seeModal = event
              setSeeModal(true)
            }
            else {
              router.push({ name: 'InstitutionDetails', params: { id: event.data?.id } })
            }
          }"
        />

        <IonModal
          :is-open="isModalAddInstitution"
          :expand-to-scroll="false"
          :initial-breakpoint="0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @ion-modal-did-dismiss="setModalAddInstitution(false)"
        >
          <RegisterInstitutionMobile
            @saved="loadInstitutions(); setModalAddInstitution(false)"
            @cancel="setModalAddInstitution(false)"
            @success="(message, color) => { showToast(message, 'top', color); }"
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
            <RegisterInstitutionMobile
              :edit-id="editingId"
              @saved="loadInstitutions(); setEditModal(false)"
              @cancel="setEditModal(false)"
              @success="(message, color) => { showToast(message, 'top', color); }"
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
            <InstitutionDetailView
              :items="seeModal.data"
              name="Detalhes da instituição"
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
              <IonCardTitle>Excluir instituição</IonCardTitle>
              <IonText class="ion-padding-vertical">
                Tem certeza que deseja excluir esta instituição?
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
