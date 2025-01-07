<script setup lang="ts">
import showToast from '@/utils/toast-alert'
import { IonButton, IonIcon, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonSpinner } from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '../services/AuthService'


const email = ref<string>('')
const loading = ref<boolean>(false)
const router = useRouter()
const authService = new AuthService()

async function resetPassword() {
  loading.value = true
  try {
    await authService.forgetPassword(email.value)
    showToast('Email de redefinição de senha enviado com sucesso', 'top', 'success')
    router.push('/login')
  }
  catch (error) {
    showToast('Falha ao enviar email de redefinição de senha', 'top', 'warning')
    console.error('Erro ao enviar email de redefinição de senha:', (error as Error).message)
  }
  loading.value = false
}

const navigation = {
  goToLogin() {
    router.push('/login')
  },
}
</script>

<template>
  <ion-content class="reset-password-content">
    <ion-grid class="reset-password-grid">
      <ion-row class="ion-justify-content-center ion-align-items-center full-height">
        <ion-col size="12" size-md="6" size-lg="4" class="reset-password-form">
          <ion-toolbar class="tollbar">
            <div class="logo-and-back">
              <ion-buttons slots="start">
                <ion-back-button class="custom-back-button" color="tertiary" default-href="/login" />
              </ion-buttons>
              <!-- Logo -->
              <ion-img src="/assets/EduPrimeChatTitle.png" alt="Logo" class="forgot-password-logo" />
            </div>
          </ion-toolbar>

          <div class="form-header">
            <ion-text>
              <h1 class="form-title">
                Recuperar Senha
              </h1>
              <p class="form-subtitle">
                Ao solicitar a recuperação de senha, você irá receber um e-mail com um código de autenticação
                temporário.
              </p>
            </ion-text>
          </div>

          <IonItem>
            <IonInput v-model="email" placeholder="E-mail para recuperação" />
          </IonItem>

          <div class="button-container ion-margin-top">
            <!-- Bot�o de Sign Up -->
            <IonButton expand="block" class="forgot-password-button" @click="resetPassword">
              Solicitar Recuperação
            </IonButton>

            <!-- Bot�o de Voltar para Login -->
            <IonButton expand="block" color="tertiary" class="cancel-button" @click="navigation.goToLogin">
              Cancelar
            </IonButton>
          </div>
          <ion-row class="ion-justify-content-center">
            <ion-text>
              <p class="login-text">
                Já possui uma conta?
                <IonButton fill="clear" class="login-button" @click="navigation.goToLogin">
                  Entrar
                </IonButton>
              </p>
            </ion-text>
          </ion-row>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<style scoped>
.form-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* Alinha os títulos à esquerda */
  padding: 0 16px;
  /* Igual ao padding padrão dos IonItem */
  width: 100%;
  /* Garante alinhamento com IonItem */
  box-sizing: border-box;
  /* Inclui o padding na largura total */
  margin-top: 20px;
}

.form-title {
  font-size: 1.8em;
  margin: 0;
  text-align: left;
}

.form-subtitle {
  font-size: 1rem;
  color: #666;
  margin: 5px 0 20px;
  text-align: left;
}

.reset-password-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.full-height {
  height: 100%;
}

.reset-password-grid {
  height: 100%;
}

.reset-password-form {
  background-color: #fff;
  border-radius: 10px;
}

.reset-password-logo {
  display: block;
  margin: 0 auto 20px;
  width: 150px;
  height: auto;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;
}

.logo-and-back {
  display: flex;
  align-items: center;
  gap: 10px;
}

.custom-back-button {
  background-color: pink;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  left: 16px;
}

.forgot-password-logo {
  display: block;
  margin: 0 0 20px auto;
  width: 250px;
  height: auto;
}

.button-container {
  margin-top: 20px;
}

.forgot-password-button {
  margin-top: 20px;
}

.cancel-button {
  margin-top: 10px;
}

.login-button {
  padding: 0;
  height: auto;
  font-size: 0.9rem;
  text-transform: none;
  color: var(--ion-color-primary);
  /* Cor do botão */
  font-weight: bold;
  position: relative;
  /* Necessário para posicionar a linha */
}

.login-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  /* Posiciona a linha logo abaixo do texto */
  left: 50%;
  /* Inicia a linha no centro horizontal do botão */
  width: 0;
  height: 2px;
  /* Espessura da linha */
  background-color: #4f2974;
  /* Cor da linha */
  transition: width 0.3s ease;
  /* Animação suave */
  transform: translateX(-50%);
  /* Centraliza horizontalmente */
  transform-origin: center;
  /* Faz a linha crescer para os dois lados */
}

.login-button:hover::after {
  width: 100%;
  /* Aumenta a largura da linha para completar o botão */
}

.login-text {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  margin: 0;
  color: var(--ion-color-primary);
  /* Cor do texto */
  padding: 20px;
}
</style>
