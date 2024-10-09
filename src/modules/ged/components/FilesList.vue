<script setup lang="ts">
import { IonItem, IonLabel, IonList, IonListHeader, IonAlert } from '@ionic/vue'
import { documentAttach, trash } from 'ionicons/icons'
import { ref, watch } from 'vue'
import type { Tables } from '@/types/database.types'
import GedService from '@/modules/ged/services/GedService'
import showToast from '@/utils/toast-alert'

// Serviço para lidar com a exclusão no backend
const gedService = new GedService()

const props = defineProps<{
  files: Tables<'document'>[] | []
}>()

const tableName = 'document'
const fields = ['id', 'file_name', 'mime_type', 'size', 'is_current_version', 'file_hash', 'storage_path', 'version', 'compression_applied', 'metadata', 'is_deleted', 'created_at', 'updated_at', 'deleted_at', 'user_created']

const emit = defineEmits(['update:files'])
const filesList = ref([...props.files])

watch(() => props.files, (newFiles) => {
  filesList.value = [...newFiles]
})

const isAlertOpen = ref(false)
const fileToDelete = ref<Tables<'document'> | null>(null)

function toggleDetails(index: number) {
  const updatedFiles = [...props.files]
  updatedFiles[index] = {
    ...updatedFiles[index],
  }
  filesList.value = updatedFiles
}

function openDeleteAlert(file: Tables<'document'>) {
  fileToDelete.value = file
  isAlertOpen.value = true
}

function handleAlertDismiss(ev: CustomEvent) {
  const role = ev.detail.role
  if (role === 'confirm' && fileToDelete.value) {
    deleteFile(fileToDelete.value)
  } else {
    handleCancel()
  }
}

async function deleteFile(file: Tables<'document'>) {
  try {
    const result = await gedService.softDelete(file.id) // Altere para o método correto no seu serviço
    if (result) {
      showToast(`Arquivo excluído com sucesso`)
      filesList.value = filesList.value.filter(f => f.id !== file.id)
      emit('update:files', filesList.value)
      isAlertOpen.value = false
      fileToDelete.value = null
    }
  } catch (error) {
    console.error('Erro ao excluir o arquivo:', error)
  }
}

function handleCancel() {
  isAlertOpen.value = false
  fileToDelete.value = null
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
    message="Tem certeza de que deseja excluir este arquivo?"
    :buttons="alertButtons"
    @did-dismiss="handleAlertDismiss"
    />

  <IonList>
    <IonListHeader color="light">
      Uploaded Files
    </IonListHeader>
    <ion-item-sliding v-for="(file, index) in filesList" :key="index">
      <IonItem button @click="toggleDetails(index)">
        <ion-icon slot="start" :icon="documentAttach" />
        <IonLabel>
          <h2>{{ file.file_name }}</h2>
          <p>{{ file.mime_type }} | {{ file.size }} KB </p>
        </IonLabel>
        <ion-buttons slot="end">
          <ion-button color="danger" @click.stop="openDeleteAlert(file)">
            <ion-icon slot="icon-only" :icon="trash" />
          </ion-button>
        </ion-buttons>
      </IonItem>
      <ion-item-options side="end">
        <ion-item-option color="danger" @click="openDeleteAlert(file)">
          Excluir
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </IonList>
</template>

<style scoped>
ion-item {
  --background: var(--ion-color-white);
  --border-radius: 8px;
}
</style>
