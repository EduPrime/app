<script setup lang="ts">
import type ModalForm from '../../student-management/components/ModalForm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const modalFormRef = ref<InstanceType<typeof ModalForm> | null>(null)
const router = useRouter()

function handleCancel() {
  router.push({ name: 'ModalList' })
}

function handleSave() {
  modalFormRef.value?.registerModal()
}
</script>

<template>
  <ion-grid>
    <ion-row class="ion-justify-content-between">
      <ion-col>
        <ion-button expand="block" color="danger" @click="handleCancel">
          Cancelar
        </ion-button>
      </ion-col>
      <ion-col>
        <ion-button expand="block" color="primary" @click="handleSave">
          Salvar
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
