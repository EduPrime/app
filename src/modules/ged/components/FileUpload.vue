<script setup lang="ts">
import { IonChip, IonListHeader, IonThumbnail } from '@ionic/vue'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import { Dashboard } from '@uppy/vue'
import { documentOutline } from 'ionicons/icons'
import { onMounted, ref } from 'vue'
import type { Meta, UppyFile } from '@uppy/core'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

const props = defineProps({
  bucketName: {
    type: String,
    required: true,
  },
  maxFileSize: {
    default: 500,
    type: Number,
    required: false,
  },
})
const emit = defineEmits(['uploadSuccess', 'uploadError'])
const fileItems = ref<any[]>([])
const uppy = new Uppy({
  restrictions: {
    maxNumberOfFiles: 10,
    allowedFileTypes: ['image/*', 'application/pdf'],
    maxFileSize: props.maxFileSize * (1024 * 1024),
  },
  autoProceed: false,
  debug: false,
}).use(Tus, {
  endpoint: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/upload/resumable`,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
  },
  uploadDataDuringCreation: true,
  chunkSize: 6 * 1024 * 1024,
  allowedMetaFields: ['bucketName', 'objectName', 'contentType', 'cacheControl'],
  onError: (error) => {
    console.log(`Failed because: ${error}`)
  },
})

onMounted(() => {
  uppy.on('file-added', (file) => {
    const supabaseMetadata = {
      bucketName: props.bucketName,
      objectName: `uploads/${file.name}`,
      contentType: file.type,
    }
    file.meta = {
      ...file.meta,
      ...supabaseMetadata,
    }
    console.log('file added', file)
  })
    .on('upload-progress', (file: any, progress) => {
      const item = fileItems.value.find((item: any) => item.file.id === file.id)
      if (item) {
        item.progress = progress.bytesUploaded / (progress.bytesTotal ?? 1) * 100
      }
    })
    .on('upload-error', (file: UppyFile<Meta, Record<string, never>> | undefined, error) => {
      const item = file ? fileItems.value.find((item: any) => item.file.id === file.id) : null
      if (item) {
        item.error = true
        item.errorMessage = 'Upload failed. Please try again.'
      }
      console.error('File upload error:', error)
      emit('uploadError', error)
    })
    .on('upload-success', async (file: UppyFile<Meta, Record<string, never>> | undefined, response) => {
      if (file) {
        const fileItem = {
          file,
          preview: URL.createObjectURL(file.data),
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 100,
          error: false,
          errorMessage: '',
        }
        fileItems.value.push(fileItem)
        const storage_path = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${props.bucketName}/uploads/${file.name}`
        const newDocumentRecord = {
          compression_applied: false,
          file_hash: null,
          file_name: file.name,
          is_current_version: true,
          is_deleted: false,
          metadata: null,
          mime_type: file.type,
          size: file.size,
          storage_path,
          upload_date: new Date().toISOString(),
          version: 1,
        }
        console.log('Upload Response: ', response)
        emit('uploadSuccess', newDocumentRecord)
      }
    })
})
</script>

<template>
  <div>
    <Dashboard :uppy="uppy" inline="true" />
    <div v-if="fileItems?.length">
      <IonListHeader color="primary">
        New Uploaded Files
      </IonListHeader>
      <div v-for="(item, index) in fileItems" :key="index" class="file-item">
        <ion-item>
          <IonThumbnail v-if="item.type.startsWith('image/')" slot="start" class="file-preview">
            <img :src="item.preview" alt="Preview" class="file-preview-image">
          </IonThumbnail>
          <ion-icon v-if="!item.type.startsWith('image/')" slot="start" :icon="documentOutline" />
          <ion-label class="file-details">
            <p class="file-name">
              <span>{{ item.name }}</span>
            </p>
            <IonChip color="success">
              {{ (item.size / (1024 * 1024)).toFixed(2) }} MB
            </IonChip>
          </ion-label>
        </ion-item>
      </div>
    </div>
  </div>
</template>
