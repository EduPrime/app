<script setup lang="ts">
import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/vue'
import { documentAttach, trash } from 'ionicons/icons'
import type { FileAttachment } from '../data/files'

const props = defineProps<{
  files: FileAttachment[]
}>()

const emit = defineEmits(['update:files'])
// const fileUploadProgress: Ref<any> = ref(0)
function toggleDetails(index: number) {
  const updatedFiles = [...props.files]
  updatedFiles[index] = {
    ...updatedFiles[index],
  }
  emit('update:files', updatedFiles)
}

function deleteFile(file: FileAttachment) {
  console.log('Excluir', file)
}
</script>

<template>
  <ion-list>
    <ion-list-header color="light">
      Uploaded Files
    </ion-list-header>
    <ion-item-sliding v-for="(file, index) in files" :key="index">
      <ion-item button @click="toggleDetails(index)">
        <ion-icon slot="start" :icon="documentAttach" />
        <ion-label>
          <h2>{{ file.name }}</h2>
          <p>{{ file.type }} | {{ file.size }} </p>
        </ion-label>
        <ion-buttons slot="end">
          <ion-button color="danger" @click.stop="deleteFile(file)">
            <ion-icon slot="icon-only" :icon="trash" />
          </ion-button>
        </ion-buttons>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option color="danger" @click="deleteFile(file)">
          Excluir
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>
</template>

<style scoped>
ion-item {
  --background: var(--ion-color-white);
  --border-radius: 8px;
}
</style>
