<script setup lang="ts">
import { IonToast } from '@ionic/vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { files } from '../data/files'
import FilesList from '../components/FilesList.vue'
import FileUpload from '../components/FileUpload.vue'
import GedService from '../services/GedService'

const gedService = new GedService()
const documentFiles: Ref<any[]> = ref([])
function handleUploadSuccess(event: any) {
  console.log('Handle Upload Event: ', event)
  files.push(event)
}

async function getFilesList() {
  documentFiles.value = (await gedService.getFiles()).data ?? files
}
getFilesList()
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
    <file-upload bucket-name="ged" :max-file-size="500" @upload-success="handleUploadSuccess" />
    <files-list :files="documentFiles" />
    <ion-toast />
  </content-layout>
</template>
