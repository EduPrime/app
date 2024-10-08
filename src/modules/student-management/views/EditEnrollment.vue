<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Database, Tables } from '@/types/database.types'
import EnrollmentForm from '../../student-management/components/EnrollmentForm.vue'

const enrollmentFormRef = ref<InstanceType<typeof EnrollmentForm> | null>(null)
const router = useRouter()
function handleCancel() {
  router.push({ name: 'EnrollmentList' })
}

function handleSave() {
  enrollmentFormRef.value?.registerEnrollment()
}
</script>

<template>
  <content-layout :show-footer="true">
    <template #header-buttons>
      <ion-buttons slot="start">
        <ion-back-button default-href="/" />
      </ion-buttons>
    </template>
    <template #description>
      Todos os campos são obrigatórios, a menos que indicado de outra forma.
    </template>
    <div id="enrollment-form">
      <EnrollmentForm ref="enrollmentFormRef" @cancel="handleCancel" @save="handleSave" />
    </div>

    <template #footer>
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
  </content-layout>
</template>

<style scoped>
ion-label h2 {
  margin: 0;
  font-weight: bold;
}

ion-searchbar {
  --background: var(--ion-color-light);
}
</style>
