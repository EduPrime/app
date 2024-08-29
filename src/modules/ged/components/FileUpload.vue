<script setup lang="ts">
import { useDropzone } from 'vue3-dropzone'
import type { Ref } from 'vue'
import { defineEmits, defineProps, ref } from 'vue'
import { IonButton, IonIcon, IonProgressBar } from '@ionic/vue'
import { cloudUpload, cloudUploadOutline } from 'ionicons/icons'
import GedService from '../services/GedService'
// import { createClient } from '@supabase/supabase-js'

const props = defineProps({
  bucketName: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['uploadSuccess', 'uploadError'])
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)
const gedService = new GedService()
const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop })
const fileItems: Ref<any[]> = ref([])

async function uploadFile(item: any) {
  try {
    const { data, error } = await gedService.uploadFile(item.file, props.bucketName)

    if (error) {
      item.error = true
      item.errorMessage = 'Upload failed. Please try again.'
      console.error('File upload error:', error)
      emit('uploadError', error)
    }
    else {
      item.error = false
      item.errorMessage = ''
      emit('uploadSuccess', data)
    }
  }
  catch (error) {
    item.error = true
    item.errorMessage = 'Upload failed. Please try again.'
    console.error('File upload error:', error)
    emit('uploadError', error)
  }
}

async function saveFiles(files: any) {
  for (const file of files) {
    const preview = URL.createObjectURL(file)
    const fileItem = {
      file,
      preview,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      error: false,
      errorMessage: '',
    }
    fileItems.value.push(fileItem)
    uploadFile(fileItem)
  }
}

function retryUpload(item: any) {
  item.progress = 0
  item.error = false
  item.errorMessage = ''
  uploadFile(item)
}

function onDrop(acceptedFiles: any, rejectReasons: any) {
  saveFiles(acceptedFiles)
  if (rejectReasons.length) {
    console.log('Rejected files:', rejectReasons)
  }
}
</script>

<template>
  <div>
    <!-- Dropzone Area -->
    <div class="file-upload" v-bind="getRootProps()">
      <input v-bind="getInputProps()">
      <p v-if="isDragActive">
        <ion-icon :icon="cloudUploadOutline" />
        <br>
        Drop the files here ...
      </p>
      <p v-else>
        <ion-icon :icon="cloudUpload" />
        <br>
        Drag and drop some files here, or click to select files
      </p>
    </div>
    <ion-button expand="block" color="primary" @click="open">
      Open File Dialog
    </ion-button>
    <!-- File List and Previews -->
    <div v-if="fileItems.length" class="file-list">
      <div v-for="(item, index) in fileItems" :key="index" class="file-item">
        <ion-item>
          <ion-thumbnail class="file-preview">
            <img v-if="item.type.startsWith('image/')" :src="item.preview" alt="Preview" class="file-preview-image">
          </ion-thumbnail>
          <ion-label class="file-details">
            <span class="file-name">{{ item.name }}</span>
            <span class="file-size">{{ (item.size / 1024).toFixed(2) }} KB</span>
            <ion-progress-bar v-if="!item.error" :value="item.progress / 100" />
            <p v-if="item.error" class="error-message">
              {{ item.errorMessage }}
            </p>
          </ion-label>
          <ion-button v-if="item.error" slot="end" color="danger" size="small" @click="retryUpload(item)">
            Retry
          </ion-button>
        </ion-item>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-upload {
  padding: 20px;
  border: 2px dashed #ccc;
  text-align: center;
  background: #f9f9f9;
}

.file-upload p {
  margin: 20px 0;
}

.file-list {
  margin-top: 20px;
}

.file-preview {
  margin-right: 10px;
}

.file-preview-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.file-name {
  display: block;
  font-weight: bold;
}

.file-size {
  display: block;
  color: #888;
  margin-bottom: 5px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

ion-progress-bar {
  border-radius: 45px;
}
</style>
