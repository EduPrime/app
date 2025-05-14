<script setup lang="ts">
import type { ServerFunction } from '@prisma/client'
import type { Tables } from '@/types/database.types'
import ListWithActionFunction from '@/components/ListWithActionFunction.vue'
import FunctionDetailView from '@/components/FunctionDetailView.vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonIcon, IonModal, IonPage, IonRow, IonSearchbar, IonText } from '@ionic/vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ServerFunctionService from '../services/ServerFunctionService'
import RegisterFunctionMobile from './RegisterFunctionMobile.vue'
import showToast from '@/utils/toast-alert'

const router = useRouter()
const route = router.currentRoute
const serverFunctionService = new ServerFunctionService()
const dataList = ref<ServerFunction[]>([])
const searchQuery = ref('')
const isModalAddFunction = ref(false)
const editingId = ref<string | undefined>(undefined)

const seeModal = ref({ modal: false, data: undefined as any })
const editModal = ref({ modal: false, data: undefined })
const deleteModal = ref<{ modal: boolean; data: ServerFunction | undefined }>({ modal: false, data: undefined })

const adaptedDataList = computed(() => {
  return dataList.value.map(item => ({
    id: item.id,
    name: item.name,
    abbreviation: item.abbreviation,
    description: item.description,
    createdAt: item.createdAt ? item.createdAt.toString() : undefined,
    updatedAt: item.updatedAt ? item.updatedAt.toString() : undefined,
    deletedAt: item.deletedAt ? item.deletedAt.toString() : undefined
  }))
})

const filteredDataList = computed(() => {
  // Primeiro filtra a lista se houver uma consulta de busca
  const filtered = searchQuery.value
    ? adaptedDataList.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        || (item.abbreviation && item.abbreviation.toLowerCase().includes(searchQuery.value.toLowerCase()))
      )
    : adaptedDataList.value
  
  // Depois ordena a lista alfabeticamente pelo nome
  return filtered.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
})

function setModalAddFunction(open: boolean) {
  isModalAddFunction.value = open
  if (open) {
    isModalAddFunction.value = false
    setTimeout(() => (isModalAddFunction.value = true), 10)
  }
}

function navigateToRegister() {
  if (isMobileDevice()) {
    editingId.value = undefined
    setModalAddFunction(true)
  } else {
    router.push({ name: 'RegisterFunction' })
  }
}

function editItem(id: string) {
  if (isMobileDevice()) {
    editingId.value = id
    setEditModal(true)
  } else {
    router.push({ name: 'RegisterFunction', params: { id } })
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

async function loadFunctions() {
  try {
    const functions = await serverFunctionService.getServerFunctions()
    dataList.value = functions || []
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
      await serverFunctionService.softDeleteServerFunction(deleteModal.value.data.id)
      loadFunctions()
      setDeleteModal(false)
    }
    catch (error: any) {
      console.error('Erro ao excluir função:', error)
      
      // Verifica se é o erro específico de servidores vinculados
      if (error.message && error.message.includes('servidores vinculados')) {
        showToast('Não é possível excluir: Existem servidores vinculados a essa função', 'top', 'warning')
      }
    }
  } else {
    console.error('ID da função não encontrado para exclusão:', deleteModal)
  }
}

onMounted(() => {
  loadFunctions()
})

// Observar mudanças na rota para recarregar a lista quando retornar do cadastro (Caso para RegisterFunction pós salvar nova função)
watch(
  () => route.value.query,
  (query) => {
    if (query.refresh) {
      loadFunctions()
    }
  },
  { deep: true }
)
</script>

<template>
  <IonPage>
    <ContentLayout>
      <div class="ion-margin-top">
        <IonRow class="ion-align-items-center ion-justify-content-between">
          <IonCol size="10">
            <IonSearchbar v-model="searchQuery" placeholder="Buscar função" />
          </IonCol>
          <IonCol size="2" class="ion-text-end">
            <IonButton id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister()">
              <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
              <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
              <span class="ion-hide-sm-down">Novo</span>
            </IonButton>
          </IonCol>
        </IonRow>

        <ListWithActionFunction
          :data-list="filteredDataList"
          @update:delete="(event) => {
            deleteModal = event;
            setDeleteModal(true);
          }" 
          @update:edit="(event) => { 
            
            if (isMobileDevice()) {
              editingId = event.data?.id
              setEditModal(true)
            } else {
              router.push({ name: 'RegisterFunction', params: { id: event.data?.id } })
            }
          }" 
          @update:see="(event) => { 
            if (isMobileDevice()) {
              seeModal = event
            } else {
              router.push({ name: 'FunctionDetails', params: { id: event.data?.id } })
            }
          }" 
        />

        <IonModal
          :is-open="isModalAddFunction"
          :expand-to-scroll="false"
          :initial-breakpoint="0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @ion-modal-did-dismiss="setModalAddFunction(false)"
        >
          <RegisterFunctionMobile 
            @saved="loadFunctions(); setModalAddFunction(false)" 
            @cancel="setModalAddFunction(false)" 
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
            <FunctionDetailView
              :items="seeModal.data" 
              name="Detalhes da função" 
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
            <RegisterFunctionMobile 
              :edit-id="editingId"
              @saved="loadFunctions(); setEditModal(false)" 
              @cancel="setEditModal(false)" 
            />
          </IonContent>
        </IonModal>

        <IonModal id="delete-modal" :is-open="deleteModal.modal" @ion-modal-did-dismiss="setDeleteModal(false)">
          <IonCard class="ion-no-margin">
            <IonCardHeader>
              <IonCardTitle>Excluir função</IonCardTitle>
              <IonText class="ion-padding-vertical">
                Tem certeza que deseja excluir esta função?
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
