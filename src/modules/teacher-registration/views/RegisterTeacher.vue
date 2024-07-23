<script setup lang="ts">
import { reactive } from 'vue'
import TeacherService from '../services/TeacherService'

const teacher = reactive({
  name: '',
  email: '',
  phone: '',
})

const teacherService = new TeacherService()

function submitForm() {
  teacherService.registerTeacher(teacher)
    .then((response: any) => {
      console.log('Teacher registered successfully', response)
    })
}
</script>

<template>
  <content-layout>
    <form @submit.prevent="submitForm">
        <ion-item>
          <ion-label position="floating">
            Name
          </ion-label>
          <ion-input v-model="teacher.name" required />
        </ion-item>
        <ion-item>
          <ion-label position="floating">
            Email
          </ion-label>
          <ion-input v-model="teacher.email" type="email" required />
        </ion-item>
        <ion-item>
          <ion-label position="floating">
            Phone
          </ion-label>
          <ion-input v-model="teacher.phone" required />
        </ion-item>
        <ion-button type="submit" expand="block">
          Register
        </ion-button>
      </form>
  </content-layout>
</template>
