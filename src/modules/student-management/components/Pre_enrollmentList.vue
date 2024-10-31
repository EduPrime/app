<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import showToast from '@/utils/toast-alert'
import { IonAlert } from '@ionic/vue'
import { pencil, trash } from 'ionicons/icons'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Pre_enrollmentService from '../services/Pre_enrollmentService'

const props = defineProps<{
  dataList: Tables<'pre_enrollment'>[]
}>()

// Instanciando o serviço da tabela
const service = new Pre_enrollmentService()

// Define o tipo dinamicamente para incluir os dados de student (name e address)
const dataList = ref()

// Nome da tabela e campos
const pre_enrollment = ref< Tables<'pre_enrollment'> | []>([])
const tableName = 'pre_enrollment'
const fields = ['course_id', 'created_at', 'date_enrollment', 'deleted_at', 'id', 'observations', 'pre_enrollment_code', 'school_id', 'series_id', 'situation', 'status', 'student_id', 'updated_at']
const router = useRouter()

watch(
  () => props.dataList,
  (newValue) => {
    dataList.value = newValue
    console.log('dataList foi atualizado:', { dataList })
  },
  { immediate: true },
)

// Função que busca os dados da tabela ao montar o componente
onMounted(async () => {
  try {
    // Chamada ao novo método para obter pré-matrículas com dados do aluno
    dataList.value = await service.getAllWithStudents()
  }
  catch (error) {
    console.error(`Erro ao buscar dados de ${tableName}:`, error)
  }
})

// Funções para editar, excluir e detalhes
function toggleDetails(index: number) {
  dataList.value[index] = {
    ...dataList.value[index],
    showDetails: !dataList.value[index].showDetails,
  }
}

function editItem(item: any) {
  router.push({ name: `Edit${tableName}`, params: { id: item.id.toString() } })
}

const isAlertOpen = ref(false)
const itemToDelete = ref<any | null>(null)

function openDeleteAlert(item: any) {
  itemToDelete.value = item
  isAlertOpen.value = true
}

function handleAlertDismiss(ev: CustomEvent) {
  const role = ev.detail.role
  if (role === 'confirm' && itemToDelete.value) {
    deleteItem(itemToDelete.value)
  }
  else {
    handleCancel()
  }
}

async function deleteItem(item: any) {
  try {
    const result = await service.softDelete(item.id)
    if (result) {
      showToast(`${tableName} excluído com sucesso`)
      dataList.value = dataList.value.filter((i: Tables<'pre_enrollment'>) => i.id !== item.id)
      isAlertOpen.value = false
      itemToDelete.value = null
    }
  }
  catch (error) {
    console.error('Erro ao excluir o item:', error)
  }
}

function handleCancel() {
  isAlertOpen.value = false
  itemToDelete.value = null
}

const alertButtons = [
  {
    text: 'Cancelar',
    role: 'cancel',
  },
  {
    text: 'Excluir',
    role: 'confirm',
  },
]
</script>

<template>
  <IonAlert
    :is-open="isAlertOpen"
    header="Confirmar Exclusão"
    message="Tem certeza de que deseja excluir este item?"
    :buttons="alertButtons"
    @did-dismiss="handleAlertDismiss"
  />
  <ion-list>
    <ion-item-sliding v-for="(item, index) in dataList" :key="index">
      <ion-item button @click="toggleDetails(index)">
        <ion-label>
          <h2>{{ item.student?.name || 'Item sem nome' }}</h2>
          <p>{{ item.student?.address || 'Sem endereço' }}</p>
        </ion-label>
        <ion-buttons slot="end">
          <ion-button @click.stop="editItem(item)">
            <ion-icon id="present-alert" slot="icon-only" :icon="pencil" />
          </ion-button>
          <ion-button color="danger" @click.stop="openDeleteAlert(item)">
            <ion-icon slot="icon-only" :icon="trash" />
          </ion-button>
        </ion-buttons>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option @click="editItem(item)">
          Editar
        </ion-item-option>
        <ion-item-option color="danger" @click="openDeleteAlert(item)">
          Excluir
        </ion-item-option>
      </ion-item-options>
      <ion-item v-if="item.showDetails">
        <ion-grid>
          <ion-row>
            <ion-col size="12">
              <strong>Detalhes:</strong>
            </ion-col>
            <ion-col v-for="(field, fieldIndex) in fields" :key="fieldIndex" size="12">
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ field }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <p><strong>{{ field }}:</strong> {{ item[field] }}</p>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
    </ion-item-sliding>
  </ion-list>
</template>

<style scoped>
ion-item {
  --background: var(--ion-color-white);
  --border-radius: 8px;
}
</style>
