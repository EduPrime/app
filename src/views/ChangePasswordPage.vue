<script setup lang="ts">
import showToast from '@/utils/toast-alert'
import { IonButton, IonIcon, IonInput, IonItem, IonList, IonSpinner } from '@ionic/vue'
import { eye, key, lockClosed, mail } from 'ionicons/icons'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabaseClient'

const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref<boolean>(false)
const router = useRouter()

// Requisitos para a senha
const minLength = 8
const hasNumber = /\d/
const hasUpperCase = /[A-Z]/

// Observa os requisitos da senha
const passwordRequiriments = ref({
  minLength: false,
  hasNumber: false,
  hasUpperCase: false,
})

watch(newPassword, (password) => {
  passwordRequiriments.value.minLength = password.length >= minLength
  passwordRequiriments.value.hasNumber = hasNumber.test(password)
  passwordRequiriments.value.hasUpperCase = hasUpperCase.test(password)
})

// Função para verificar todos os requisitos da senha
function isPasswordValid() {
  return (
    passwordRequiriments.value.minLength
    && passwordRequiriments.value.hasNumber
    && passwordRequiriments.value.hasUpperCase
  )
}

async function changePassword() {
  if (newPassword.value !== confirmPassword.value) {
    showToast('As senhas não coincidem', 'top', 'warning')
    return
  }

  if (!isPasswordValid()) {
    showToast('A senha não atende aos requisitos. Verifique e tente novamente.', 'top', 'warning')
  }

  loading.value = true
  const { error } = await supabase.auth.updateUser({ password: newPassword.value })
  loading.value = false

  if (error) {
    showToast('Falha ao redefinir a senha', 'top', 'warning')
    console.error('Erro ao redefinir a senha:', error.message)
  }

  else {
    showToast('Senha redefinida com sucesso', 'top', 'success')
    router.push('/login')
  }
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
              <ion-img src="/assets/EduPrimeChatTitle.png" alt="Logo" class="change-password-logo" />
            </div>
          </ion-toolbar>

          <div class="form-header">
            <ion-text>
              <h1 class="form-title">
                Recuperação de Senha
              </h1>
              <p class="form-subtitle">
                Preencha com o código de autenticação e em seguida digite a sua nova senha
              </p>
            </ion-text>
          </div>
          <IonItem>
            <IonInput placeholder="Digite o código de autenticação">
              <IonIcon slot="start" :icon="key" aria-hidden="true" />
            </IonInput>
          </IonItem>

          <IonItem>
            <IonInput type="password" placeholder="Digite a nova senha">
              <IonIcon slot="start" :icon="lockClosed" aria-hidden="true" />
              <ion-input-password-toggle slot="end" />
            </IonInput>
          </IonItem>

          <IonItem>
            <IonInput type="password" placeholder="Confirme a nova senha">
              <IonIcon slot="start" :icon="lockClosed" aria-hidden="true" />
              <ion-input-password-toggle slot="end" />
            </IonInput>
          </IonItem>
          <!--       <ion-item>
            <div class="password-requiriments">
              <p :class="{ valid: passwordRequiriments.minLength }">
                - Pelo menos 8 caracteres
              </p>
              <p :class="{ valid: passwordRequiriments.hasNumber }">
                - Contém número
              </p>
              <p :class="{ valid: passwordRequiriments.hasUpperCase }">
                - Contém letra maiúscula
              </p>
            </div>
          </ion-item> -->

          <div class="button-container ion-margin-top">
            <!-- Bot�o de Sign Up -->
            <IonButton expand="block" class="change-password-button">
              Salvar
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
  align-items: flex-start; /* Alinha os títulos à esquerda */
  padding: 0 16px; /* Igual ao padding padrão dos IonItem */
  width: 100%; /* Garante alinhamento com IonItem */
  box-sizing: border-box; /* Inclui o padding na largura total */
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
  padding: 20px;
  border-radius: 10px;

}

ion-item {
  margin-bottom: 16px;
}

.reset-password-logo {
  display: block;
  margin: 0 auto 20px;
  width: 150px;
  height: auto;
}

.password-requiriments p {
  font-size: 0.85em;
  margin: 2px 0;
  color: #666;
}

.password-requiriments p.valid {
  color: green;
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

.change-password-logo {
  display: block;
  margin: 0 0 20px auto;
  width: 250px;
  height: auto;
}

.login-text {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  margin: 0;
  color: var(--ion-color-primary); /* Cor do texto */
  padding: 20px;
}

.login-button {
  padding: 0;
  height: auto;
  font-size: 0.9rem;
  text-transform: none;
  color: var(--ion-color-primary); /* Cor do botão */
  font-weight: bold;
  position: relative; /* Necessário para posicionar a linha */
}

.login-button::after {
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

.login-button:hover::after {
  width: 100%; /* Aumenta a largura da linha para completar o botão */
}

.button-container {
  margin-top: 20px;
}

.change-password-button {
  margin-top: 20px;
}

.cancel-button {
  margin-top: 10px;
}
</style>
