<script setup lang="ts">
import BaseService from '@/services/BaseService'
import { useAuthStore } from '@/store/autSthore'
import showToast from '@/utils/toast-alert'
import { IonButton, IonIcon, IonInput, IonItem, IonList } from '@ionic/vue'
import { eye, lockClosed, mail } from 'ionicons/icons'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

const email = ref<string>('')
const password = ref<string>('')
const user = ref(null)

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória').min(8, 'A senha deve ter pelo menos 8 caracteres'),
})
const authStore = useAuthStore()
const router = useRouter()

async function validateForm() {
  try {
    await schema.validate({ email: email.value, password: password.value }, { abortEarly: false })
    return true
  }
  catch (errors) {
    const validationErrors = errors.inner.map((err: any) => err.message).join(', ')
    showToast(`Erro na validação dos dados: ${validationErrors}`, 'top', 'warning')
    return false
  }
}

async function signIn() {
  if (await validateForm()) {
    try {
      await authStore.login(email.value, password.value)
      await validationBackend()
      showToast('Login realizado com sucesso', 'top', 'success')
      router.push('/dashboard/Home')
    }
    catch (error) {
      console.error('Error registering user:', error)
      showToast('Erro ao realizar login. Verifique suas credenciais e tente novamente.', 'top', 'danger')
    }
  }
}

async function validationBackend() {
  user.value = authStore.user
}

const navigation = {
  goToSignUp() {
    router.push('/signup')
  },
}

onMounted(() => {
  authStore.initializeAuthState()
})
</script>

<template>
  <ion-content class="login-content">
    <ion-row class="ion-justify-content-center ion-align-items-center full-height">
      <ion-col size="12" size-md="6" size-lg="4" class="login-form">
        <ion-img src="/assets/EduPrimeChat.png" alt="Logo" class="login-logo" />

        <IonItem>
          <IonInput v-model="email" label-placement="stacked" label="Email" placeholder="seuemail@dominio.com">
            <IonIcon slot="start" :icon="mail" aria-hidden="true" />
          </IonInput>
        </IonItem>
        <IonItem>
          <IonInput v-model="password" type="password" label-placement="stacked" label="Senha" placeholder="Digite sua senha">
            <IonIcon slot="start" :icon="lockClosed" aria-hidden="true" />
            <ion-input-password-toggle slot="end" />
          </IonInput>
        </IonItem>

        <ion-row class="ion-justify-content-start">
          <ion-col size="auto">
            <IonButton fill="clear" class="forgot-password-button">
              Esqueceu a senha?
            </IonButton>
          </ion-col>
        </ion-row>
        <IonButton expand="block" class="login-button" @click="signIn">
          Entrar
        </IonButton>

        <IonButton expand="block" class="register-button" color="tertiary" @click="navigation.goToSignUp">
          Registrar
        </IonButton>
      </ion-col>
    </ion-row>
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

.login-button {
  margin-top: 20px;
}

.register-button {
  margin-top: 10px;
}

.login-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}

.forgot-password-button {
  text-transform: none;
  box-shadow: none;
  position: relative;
  overflow: hidden;
}

.forgot-password-button::after {
  content: '';
  position: absolute;
  bottom: 0; /* Posiciona a linha logo abaixo do texto */
  left: 50%; /* Inicia a linha no centro horizontal do botão */
  width: 0;
  height: 2px; /* Espessura da linha */
  background-color: #4f2974; /* Cor da linha */
  transition: width 0.3s ease; /* Animação suave */
  transform: translateX(-50%); /* Centraliza horizontalmente */
  transform-origin: center; /* Faz a linha crescer para os dois lados */
}

.forgot-password-button:hover::after {
  width: 100%; /* A linha expande para preencher a largura total */
}

.login-logo {
  display: block;
  margin: 0 auto 20px;
  width: 100%;
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
