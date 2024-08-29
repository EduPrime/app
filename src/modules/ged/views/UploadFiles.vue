<script setup lang="ts">
import { IonToast } from '@ionic/vue'
import { files } from '../data/files'
import FilesList from '../components/FilesList.vue'
import FileUpload from '../components/FileUpload.vue'

function handleUploadSuccess(event: any) {
  console.log('Handle Upload Event: ', event)
}
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
    <file-upload bucket-name="files" :max-file-size="500" @upload-success="handleUploadSuccess" />
    <files-list :files="files" />
    <ion-toast />
  </content-layout>
</template>
