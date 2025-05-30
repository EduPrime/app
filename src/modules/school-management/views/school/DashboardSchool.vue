<script setup lang="ts">
import type { School } from '@prisma/client'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import showToast from '@/utils/toast-alert'
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonIcon, IonModal, IonPage, IonRow, IonSearchbar, IonText } from '@ionic/vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import SchoolService from '../../services/SchoolService'
import ListWithActionSchool from './ListWithActionSchool.vue'
// Quando criado, descomentar:
// import SchoolDetailView from './SchoolDetailView.vue'
// import RegisterSchoolMobile from './RegisterSchoolMobile.vue'

const router = useRouter()
const route = router.currentRoute
const schoolService = new SchoolService()
const dataList = ref<School[]>([])
const searchQuery = ref('')
const isModalAddSchool = ref(false)
const editingId = ref<string | undefined>(undefined)

const seeModal = ref({ modal: false, data: undefined as any })
const editModal = ref({ modal: false, data: undefined })
const deleteModal = ref<{ modal: boolean, data: School | undefined }>({ modal: false, data: undefined })

const adaptedDataList = computed(() => {
  return dataList.value.map((item) => {
    return {
      id: item.id,
      name: item.name,
      INEPCode: item.INEPCode,
      corporateName: item.corporateName,
      acronym: item.acronym,
      address: item.address,
      addressNumber: item.addressNumber,
      additionalInfo: item.additionalInfo,
      neighborhood: item.neighborhood,
      city: item.city,
      state: item.state,
      postalCode: item.postalCode,
      phone: item.phone,
      operationalStatus: item.operationalStatus,
      createdAt: item.createdAt ? item.createdAt.toString() : undefined,
      updatedAt: item.updatedAt ? item.updatedAt.toString() : undefined,
      deletedAt: item.deletedAt ? item.deletedAt.toString() : undefined,
    }
  })
})

const filteredDataList = computed(() => {
  const filtered = searchQuery.value
    ? adaptedDataList.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        || (item.acronym && item.acronym.toLowerCase().includes(searchQuery.value.toLowerCase()))
        || (item.corporateName && item.corporateName.toLowerCase().includes(searchQuery.value.toLowerCase()))
        || (item.INEPCode && item.INEPCode.toLowerCase().includes(searchQuery.value.toLowerCase()))
        || (item.city && item.city.toLowerCase().includes(searchQuery.value.toLowerCase())),
      )
    : adaptedDataList.value

  return filtered.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
})

function setModalAddSchool(open: boolean) {
  isModalAddSchool.value = open
  if (open) {
    isModalAddSchool.value = false
    setTimeout(() => (isModalAddSchool.value = true), 10)
  }
}

function navigateToRegister() {
  if (isMobileDevice()) {
    editingId.value = undefined
    setModalAddSchool(true)
  }
  else {
    router.push({ name: 'RegisterSchool' })
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
    loadSchools()
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

async function loadSchools() {
  try {
    const data = await schoolService.getSchools()
    dataList.value = data || []
  }
  catch (error) {
    console.error('Erro ao carregar escolas:', error)
  }
}

function isMobileDevice() {
  return window.innerWidth <= 768
}

async function handleDelete() {
  if (deleteModal.value?.data?.id) {
    try {
      await schoolService.softDeleteSchool(deleteModal.value.data.id)
      loadSchools()
      setDeleteModal(false)
      showToast('Escola excluída com sucesso', 'top', 'success')
    }
    catch (error: any) {
      console.error('Erro ao excluir escola:', error)

      if (error.message) {
        if (error.message.includes('turmas associadas')) {
          showToast('Não é possível excluir: Existem turmas associadas a esta escola', 'top', 'warning')
        }
        else if (error.message.includes('professores associados')) {
          showToast('Não é possível excluir: Existem professores associados a esta escola', 'top', 'warning')
        }
        else {
          showToast(`Erro ao excluir: ${error.message}`, 'top', 'danger')
        }
      }
      else {
        showToast('Erro desconhecido ao excluir escola', 'top', 'danger')
      }
    }
  }
  else {
    console.error('ID da escola não encontrado para exclusão:', deleteModal)
  }
}

onMounted(() => {
  loadSchools()
})

watch(
  () => route.value.query,
  (query) => {
    if (query.refresh) {
      loadSchools()
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
            <IonSearchbar v-model="searchQuery" placeholder="Buscar escola" />
          </IonCol>
          <IonCol size="2" class="ion-text-end">
            <IonButton id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister()">
              <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
              <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
              <span class="ion-hide-sm-down">Novo</span>
            </IonButton>
          </IonCol>
        </IonRow>

        <ListWithActionSchool
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
              router.push({ name: 'RegisterSchool', params: { id: event.data?.id } })
            }
          }"
          @update:see="(event) => {
            if (isMobileDevice()) {
              seeModal = event
              setSeeModal(true)
            }
            else {
              router.push({ name: 'SchoolDetails', params: { id: event.data?.id } })
            }
          }"
        />

        <!-- Descomente quando os componentes forem criados
        <IonModal
          :is-open="isModalAddSchool"
          :expand-to-scroll="false"
          :initial-breakpoint="0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @ion-modal-did-dismiss="setModalAddSchool(false)"
        >
          <RegisterSchoolMobile
            @saved="loadSchools(); setModalAddSchool(false)"
            @cancel="setModalAddSchool(false)"
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
            <RegisterSchoolMobile
              :edit-id="editingId"
              @saved="loadSchools(); setEditModal(false)"
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
            <SchoolDetailView
              :items="seeModal.data"
              name="Detalhes da escola"
              @close="setSeeModal(false)"
              @edit="() => {
                editingId = seeModal.data?.id;
                setSeeModal(false);
                setEditModal(true);
              }"
            />
          </IonContent>
        </IonModal>
        -->

        <IonModal id="delete-modal" :is-open="deleteModal.modal" @ion-modal-did-dismiss="setDeleteModal(false)">
          <IonCard class="ion-no-margin">
            <IonCardHeader>
              <IonCardTitle>Excluir escola</IonCardTitle>
              <IonText class="ion-padding-vertical">
                Tem certeza que deseja excluir esta escola?
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
