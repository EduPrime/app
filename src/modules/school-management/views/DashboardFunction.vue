<script setup lang="ts">
import type { ServerFunction } from '@prisma/client'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { IonAlert, IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/vue'
import { add, pencil, trash } from 'ionicons/icons'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ServerFunctionService from '../services/ServerFunctionService'

const router = useRouter()
const serverFunctionService = new ServerFunctionService()
const dataList = ref<ServerFunction[]>([])
const searchQuery = ref('')
const showDeleteAlert = ref(false)
const selectedItemId = ref<string>('')

const filteredDataList = computed(() => {
  if (!searchQuery.value) {
    return dataList.value
  }

  return dataList.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    || item.abbreviation.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

async function loadData() {
  try {
    const functions = await serverFunctionService.getServerFunctions()
    dataList.value = functions || []
  }
  catch (error) {
    console.error('Erro ao carregar funções:', error)
  }
}

function navigateToRegister() {
  router.push({ name: 'RegisterFunction' })
}

function editItem(id: string) {
  console.log('editItem', id)
  router.push({ name: 'RegisterFunction', params: { id } })
}

function confirmDelete(id: string) {
  selectedItemId.value = id
  showDeleteAlert.value = true
}

async function deleteItem() {
  if (selectedItemId.value) {
    try {
      await serverFunctionService.softDeleteServerFunction(selectedItemId.value)
      loadData() // Recarregar a lista após excluir
      showDeleteAlert.value = false
    }
    catch (error) {
      console.error('Erro ao excluir função:', error)
    }
  }
}

function formatDate(dateString: string | null) {
  if (!dateString)
    return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <ContentLayout>
    <IonToolbar>
      <IonTitle>Funções ativas ({{ filteredDataList.length }})</IonTitle>
    </IonToolbar>

    <IonRow class="ion-align-items-center ion-justify-content-between">
      <IonCol size="10">
        <IonSearchbar v-model="searchQuery" placeholder="Buscar função" />
      </IonCol>
      <IonCol size="2" class="ion-text-end">
        <IonButton id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister">
          <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
          <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
          <span class="ion-hide-sm-down">Novo</span>
        </IonButton>
      </IonCol>
    </IonRow>

    <IonCard>
      <IonCardContent>
        <IonGrid>
          <IonRow class="header-row">
            <IonCol size="4">
              Nome
            </IonCol>
            <IonCol size="3">
              Abreviação
            </IonCol>
            <IonCol size="2">
              Atualizado em
            </IonCol>
            <IonCol size="2">
              Ações
            </IonCol>
          </IonRow>

          <IonRow v-for="item in filteredDataList" :key="item.id" class="data-row">
            <IonCol size="4">
              {{ item.name }}
            </IonCol>
            <IonCol size="3">
              {{ item.abbreviation }}
            </IonCol>
            <IonCol size="2">
              {{ formatDate(item.updatedAt?.toString() ?? null) }}
            </IonCol>
            <IonCol size="2" class="ion-text-center">
              <IonButton fill="clear" color="primary" @click="editItem(item.id)">
                <IonIcon slot="icon-only" :icon="pencil" />
              </IonButton>
              <IonButton fill="clear" color="danger" @click="confirmDelete(item.id)">
                <IonIcon slot="icon-only" :icon="trash" />
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow v-if="filteredDataList.length === 0">
            <IonCol class="ion-text-center">
              <p>Nenhuma função encontrada</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>

    <IonAlert
      :is-open="showDeleteAlert"
      header="Confirmação"
      message="Tem certeza que deseja excluir esta função?"
      :buttons="[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { showDeleteAlert = false },
        },
        {
          text: 'Excluir',
          handler: () => { deleteItem() },
        },
      ]"
    />
  </ContentLayout>
</template>

<style scoped>
ion-searchbar {
  --background: var(--ion-color-light);
}

.header-row {
  font-weight: bold;
  background-color: var(--ion-color-light);
}

.data-row {
  border-bottom: 1px solid var(--ion-color-light);
}

.data-row:hover {
  background-color: rgba(var(--ion-color-light-rgb), 0.5);
}
</style>
