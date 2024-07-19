<!-- src/views/LoginPage.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuthRequest, postRequest } from '@/utils/ApiServices'

const router = useRouter()

const email = ref('')
const password = ref('')

async function login() {
  try {
    const response = await postRequest('/api/auth/local', {
      identifier: email.value,
      password: password.value,
    })

    const token = response.jwt

    const user = await getAuthRequest('/api/users/me?populate=*', token)

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify({ ...user, role: user.role }))

    router.push('/dashboard/Home')
  }
  catch (error) {
    console.error('An error occurred:', error)
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Login</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">
              Email
            </ion-label>
            <ion-input v-model="email" type="email" />
          </ion-item>
          <ion-item>
            <ion-label position="floating">
              Password
            </ion-label>
            <ion-input v-model="password" type="password" />
          </ion-item>
          <ion-button expand="full" style="max-width: 300px" @click="login">
            Login
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
