<script setup lang="ts">
import { IonToast } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import FilesList from '../components/FilesList.vue'
import FileUpload from '../components/FileUpload.vue'
import GedService from '../services/GedService'
import type { Tables } from '@/types/database.types'

const gedService = new GedService()
const bucketName = 'ged'
const documentFiles: Ref<Tables<'document'>[] | []> = ref([])
function handleUploadSuccess(file: any) {
  console.log('Handle Upload file: ', file)
  if (file && file.storage_path) {
    gedService.create(file)
  }
}

async function getFilesList() {
  documentFiles.value = await gedService.getAll() as Tables<'document'>[]
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
    <h3 class="ion-text-end">
      GED
    </h3>
    <file-upload :bucket-name="bucketName" :max-file-size="500" @upload-success="handleUploadSuccess" />
    <files-list :files="documentFiles" />
    <ion-toast />
  </content-layout>
</template>
