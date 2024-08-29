<script setup lang="ts">
import { useRouter } from 'vue-router'
import TeacherService from '../services/TeacherService'
import TeacherForm from '../components/TeacherForm.vue'
import showToast from '@/utils/toast-alert'
import type { Tables } from '@/types/database.types'
// Inicialize o roteador para redirecionar após o sucesso
const router = useRouter()

type TeacherPartial = Omit<Pick<Tables<'teacher'>, 'name' | 'birthdate' | 'email' | 'phone' | 'address' | 'specializations' | 'school_id'>, 'birthdate'> & {
  birthdate: Date // Redefinindo o campo birthdate para ser do tipo Date
}
// Função chamada quando o formulário é submetido com sucesso
async function registerTeacher(formData: TeacherPartial) {
  try {
    const teacherService = new TeacherService()
    const newTeacher = await teacherService.create(formData)

    if (newTeacher) {
      showToast('Professor cadastrado com sucesso!')
      setTimeout(() => {
        router.push('/teachers/manage')
      }, 2000) // Redireciona após 2 segundos
    }
  }
  catch (error) {
    console.error('Erro ao salvar professor:', error)
    showToast('Erro ao cadastrar professor. Tente novamente.', 'top', 'danger')
  }
}

function handleCancel() {
  router.push('/teachers/manage')
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

    <!-- Conteúdo do formulário -->
    <teacher-form @submit="registerTeacher" @cancel="handleCancel" />

    <template #footer>
      <ion-grid>
        <ion-row class="ion-justify-content-between">
          <ion-col>
            <ion-button expand="block" color="danger" @click="handleCancel">
              Cancelar
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button expand="block" color="primary" @click="registerTeacher">
              Salvar
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </content-layout>
</template>
