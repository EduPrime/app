<script setup lang="ts">
import { IonToast } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import FilesList from '../components/FilesList.vue'
import FileUpload from '../components/FileUpload.vue'
import GedService from '../services/GedService'
import type { Tables } from '@/types/database.types'

const gedService = new GedService()
const bucketName = 'ged'
const documentFiles = ref()
function handleUploadSuccess(event: any) {
  console.log('Handle Upload Event: ', event)
  // files.push(event)
}

async function getFilesList() {
  documentFiles.value = await gedService.getAll() as Partial<Tables<'document'>>[]
}
onMounted(async () => {
  getFilesList()
})
</script>

<template>
  <content-layout>
    <template #header-buttons>
      <ion-buttons slot="start">
        <ion-back-button default-href="/" />
      </ion-buttons>
    </template>
    <template #description>
      Upload File documents
    </template>
    <h3 class="ion-text-end ion-text-uppercase">
      GED
    </h3>
    <file-upload
      :bucket-name="bucketName"
      :max-file-size="500"
      @upload-success="handleUploadSuccess"
    />
    <files-list :files="documentFiles" />
    <ion-toast />
  </content-layout>
</template>
