<script setup lang="ts">
import showToast from '@/utils/toast-alert'
import { IonButton, IonIcon, IonInput, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/vue'
import { eye, lockClosed, mail } from 'ionicons/icons'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/AuthStore'
import { AuthService } from '@/services/AuthService'

const username = ref('')
const phone = ref('')
const cpf = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('')
const validRoles = ['admin', 'professor', 'aluno']
const router = useRouter()
const userStore = useAuthStore()
const authService = new AuthService()

const passwordsMatch = ref(true) // Variável para controlar se as senhas não coincidem

function onRoleChange(event: CustomEvent) {
  role.value = event.detail.value
}

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

watch(password, (newPassword) => {
  passwordRequiriments.value.minLength = newPassword.length >= minLength
  passwordRequiriments.value.hasNumber = hasNumber.test(newPassword)
  passwordRequiriments.value.hasUpperCase = hasUpperCase.test(newPassword)
})

watch(confirmPassword, (newConfirmPassword) => {
  passwordsMatch.value = !newConfirmPassword || password.value === newConfirmPassword
})

// Função para verificar todos os requisitos da senha
function isPasswordValid() {
  return (
    passwordRequiriments.value.minLength
    && passwordRequiriments.value.hasNumber
    && passwordRequiriments.value.hasUpperCase
  )
}

async function signUp() {
  if (!role.value || !validRoles.includes(role.value)) {
    console.error(`Role is required and must be one of: ${validRoles.join(', ')}`)
    return
  }

  if (passwordsMatch.value) {
    showToast('As senhas não correspondem. Verifique e tente novamente.', 'top', 'warning')
    console.error('Senhas não correspondem')
    return
  }

  if (!isPasswordValid()) {
    showToast('A senha não atende aos requisitos. Verifique e tente novamente.', 'top', 'warning')
    return
  }

  const { data, error } = await authService.register(
    username.value,
    email.value,
    password.value,
)

  if (error) {
    console.error('Error creating user:', error.message)
    showToast('Email já cadastrado. Tente novamente.', 'top', 'warning')
  }
  else {
    const { user, session } = data
    if (user && session) {
      userStore.login(user)
      localStorage.setItem('user', JSON.stringify(user))

      router.replace(`/dashboard/${user.id}`)
    }
  }
}

function goToLogin() {
  router.replace('/login')
}
</script>

<template>
  <ion-content class="signup-content">
    <ion-grid class="signup-grid">
      <ion-row class="ion-justify-content-center ion-align-items-center full-height">
        <ion-col size="12" size-md="6" size-lg="4" class="signup-form">
          <ion-toolbar class="tollbar">
            <div class="logo-and-back">
              <ion-buttons slots="start">
                <ion-back-button class="custom-back-button" color="tertiary" default-href="/login" />
              </ion-buttons>
              <!-- Logo -->
              <ion-img src="/assets/EduPrimeChatTitle.png" alt="Logo" class="signup-logo" />
            </div>
          </ion-toolbar>

          <!-- Formul�rio de cadastro -->

          <div class="form-header">
            <ion-text>
              <h1 class="form-title">
                Novo Cadastro
              </h1>
              <p class="form-subtitle">
                Preencha com suas informações
              </p>
            </ion-text>
          </div>
          <IonItem>
            <IonInput v-model="username" placeholder="Nome Completo" />
          </IonItem>
          <IonItem>
            <IonInput v-model="email" placeholder="Email" />
          </IonItem>
          <IonItem>
            <IonInput v-model="phone" placeholder="Telefone" />
          </IonItem>
          <IonItem>
            <IonInput v-model="cpf" placeholder="CPF" />
          </IonItem>
          <IonItem>
            <IonInput type="password" placeholder="Senha">
              <IonIcon slot="start" :icon="lockClosed" aria-hidden="true" />
              <ion-input-password-toggle slot="end" />
            </IonInput>
          </IonItem>
          <!--    <IonItem>
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
          </IonItem> -->
          <IonItem>
            <IonInput type="password" placeholder="Repita a Senha">
              <IonIcon slot="start" :icon="lockClosed" aria-hidden="true" />
              <ion-input-password-toggle slot="end" />
            </IonInput>
          </IonItem>

          <!--        <p v-if="!passwordsMatch" class="error-message">
            As senhas não correspondem.
          </p> -->
          <!--       <IonItem>
            <IonSelect v-model="role" fill="solid" cancel-text="Cancelar" label="Selecione um tipo de usuário" label-placement="floating" placeholder="Selecione um tipo de usuário" @ion-change="onRoleChange">
              <IonSelectOption value="admin">
                Admin
              </IonSelectOption>
              <IonSelectOption value="professor">
                Professor
              </IonSelectOption>
              <IonSelectOption value="aluno">
                Aluno
              </IonSelectOption>
            </IonSelect>
          </IonItem> -->
          <div class="button-container ion-margin-top">
            <!-- Bot�o de Sign Up -->
            <IonButton expand="block" class="signup-button" @click="signUp">
              Salvar
            </IonButton>

            <!-- Bot�o de Voltar para Login -->
            <IonButton expand="block" color="tertiary" class="cancel-button" @click="goToLogin">
              Cancelar
            </IonButton>
          </div>
          <ion-row class="ion-justify-content-center">
            <ion-text>
              <p class="login-text">
                Já possui uma conta?
                <IonButton fill="clear" class="login-button" @click="goToLogin">
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

.signup-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

.full-height {
  height: 100%;
}

.signup-grid {
  height: 100%;
}

.signup-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}

.signup-button {
  margin-top: 20px;
}

.cancel-button {
  margin-top: 10px;
}

.signup-logo {
  display: block;
  margin: 0 0 20px auto;
  width: 250px;
  height: auto;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;
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

.logo-and-back {
  display: flex;
  align-items: center;
  gap: 10px;
}

.password-requiriments p {
  font-size: 0.85em;
  margin: 2px 0;
  color: #666;
}

.password-requiriments p.valid {
  color: green;
}

.error-message {
  color: red;
  font-size: 0.85em;
  margin: 5px 0 0 15px;
}

.button-container {
  margin-top: 20px;
}
</style>
