<script setup lang="ts">
import BaseService from '@/services/BaseService'
import { useAuthStore } from '@/store/autSthore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

const email = ref<string>('admin@example.com')
const password = ref<string>('complexAdminFakePass123')
const user = ref(null)
const institution = ref<any[]>([])
const showLoginForm = ref(true)

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().min(8, 'A senha deve ter pelo menos 8 caracteres').required('Senha é obrigatória'),
})
const authStore = useAuthStore()
async function validateForm() {
  try {
    await schema.validate({ email: email.value, password: password.value }, { abortEarly: false })
    return true
  }
  catch (errors) {
    console.error('Validation errors:', errors)
    return false
  }
}

async function signIn() {
  if (await validateForm()) {
    await authStore.login(email.value, password.value)
    await validationBackend()
    showLoginForm.value = false
  }
}
const router = useRouter()

function goToSignUp() {
  router.replace('/signup')
}

async function validationBackend() {
  user.value = authStore.user
  const apiService = new BaseService('institution')
  institution.value = await apiService.getAll()
}
</script>

<template>
  <ion-content class="login-content">
    <ion-grid v-if="showLoginForm" class="login-grid">
      <ion-row class="ion-justify-content-center ion-align-items-center full-height">
        <ion-col size="12" size-md="6" size-lg="4" class="login-form">
          <ion-img src="/assets/logo.png" alt="Logo" class="login-logo" />

          <ion-item>
            <ion-input v-model="email" placeholder="Email" />
          </ion-item>
          <ion-item>
            <ion-input v-model="password" type="password" placeholder="Senha" />
          </ion-item>

          <ion-button expand="block" @click="signIn">
            Entrar
          </ion-button>

          <ion-button expand="block" fill="outline" @click="goToSignUp">
            Registrar
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-grid v-else class="user-info-grid">
      <ion-row class="ion-justify-content-center ion-align-items-center full-height">
        <ion-col size="12" size-md="6" size-lg="4" class="user-info">
          <h2>Bem-vindo, {{ user }}</h2>
          <p>Instituição: {{ institution }}</p>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<style scoped>
.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.full-height {
  height: 100%;
}

.login-grid {
  height: 100%;
}

.login-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.login-logo {
  display: block;
  margin: 0 auto 20px;
  width: 150px;
  height: auto;
}

.user-info-grid {
  height: 100%;
}

.user-info {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
