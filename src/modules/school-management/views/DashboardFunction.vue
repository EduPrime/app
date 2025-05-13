<script setup lang="ts">
import type { ServerFunction } from '@prisma/client'
import type { Tables } from '@/types/database.types'
import ListWithActionFunction from '@/components/ListWithActionFunction.vue'
import FunctionDetailView from '@/components/FunctionDetailView.vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { IonButton, IonCol, IonContent, IonIcon, IonModal, IonPage, IonRow, IonSearchbar } from '@ionic/vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ServerFunctionService from '../services/ServerFunctionService'
import RegisterFunctionMobile from './RegisterFunctionMobile.vue'

const router = useRouter()
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
  if (!searchQuery.value) {
    return adaptedDataList.value
  }

  return adaptedDataList.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    || (item.abbreviation && item.abbreviation.toLowerCase().includes(searchQuery.value.toLowerCase())),
  )
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
  if (deleteModal.value.data?.id) {
    try {
      await serverFunctionService.softDeleteServerFunction(deleteModal.value.data.id)
      loadFunctions()
      deleteModal.value.modal = false
    }
    catch (error) {
      console.error('Erro ao excluir função:', error)
    }
  }
}

onMounted(() => {
  loadFunctions()
})
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
          @update:delete="deleteModal = $event" 
          @update:edit="(event) => { 
            
            if (isMobileDevice()) {
              
              
              editingId = event.data?.id
              
              
              setEditModal(true)
            } else {
              
              router.push({ name: 'RegisterFunction', params: { id: event.data?.id } })
            }
          }" 
          @update:see="($event) => { seeModal = $event }" 
        />

        <IonModal
          :is-open="isModalAddFunction"
          :expand-to-scroll="false"
          :initial-breakpoint="isMobileDevice() ? 0.7 : 0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @ion-modal-did-dismiss="setModalAddFunction(false)"
        >
          <IonContent>
            <RegisterFunctionMobile 
              @saved="loadFunctions(); setModalAddFunction(false)" 
              @cancel="setModalAddFunction(false)" 
            />
          </IonContent>
        </IonModal>

        <IonModal
          :is-open="seeModal.modal"
          :expand-to-scroll="false"
          :initial-breakpoint="isMobileDevice() ? 0.7 : 0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @did-dismiss="setSeeModal(false)"
        >
          <IonContent>
            <FunctionDetailView
              :items="seeModal.data" 
              name="Detalhes da função" 
              @close="setSeeModal(false)" 
              @edit="setEditModal(true)" 
            />
          </IonContent>
        </IonModal>

        <IonModal
          :is-open="editModal.modal"
          :expand-to-scroll="false"
          :initial-breakpoint="isMobileDevice() ? 0.7 : 0.95"
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

        <IonModal
          :is-open="deleteModal.modal"
          :expand-to-scroll="false"
          :initial-breakpoint="0.3"
          :breakpoints="[0, 0.3, 0.5]"
          @ion-modal-did-dismiss="deleteModal.modal = false"
        >
          <IonContent class="ion-padding">
            <h2>Confirmação</h2>
            <p>Tem certeza que deseja excluir esta função?</p>
            <IonRow>
              <IonCol>
                <IonButton color="medium" expand="block" @click="deleteModal.modal = false">Cancelar</IonButton>
              </IonCol>
              <IonCol>
                <IonButton color="danger" expand="block" @click="handleDelete()">Excluir</IonButton>
              </IonCol>
            </IonRow>
          </IonContent>
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
</style>
