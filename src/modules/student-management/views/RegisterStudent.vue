<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import StudentForm from '../../student-management/components/StudentForm.vue'

const studentFormRef = ref<InstanceType<typeof StudentForm> | null>(null)
const router = useRouter()

function handleCancel() {
  router.push({ name: 'DashboardStudent' })
}

function handleSave() {
  studentFormRef.value?.registerStudent()
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
    <div id="student-form">
      <StudentForm ref="studentFormRef" @cancel="handleCancel" @save="handleSave" />
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
