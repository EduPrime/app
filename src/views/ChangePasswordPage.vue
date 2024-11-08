<script setup lang="ts">
import showToast from '@/utils/toast-alert'
import { IonSpinner } from '@ionic/vue'
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
          <ion-img src="/assets/logo.png" alt="Logo" class="reset-password-logo" />

          <ion-item>
            <ion-input v-model="newPassword" type="password" label-placement="stacked" label="Nova Senha" placeholder="Digite a nova senha" />
          </ion-item>

          <ion-item>
            <ion-input v-model="confirmPassword" type="password" label-placement="stacked" label="Confirme a Nova Senha" placeholder="Confirme a nova senha" />
          </ion-item>
          <ion-item>
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
          </ion-item>

          <ion-button expand="block" @click="changePassword">
            <IonSpinner v-if="loading" slot="end" name="crescent" />
            Redefinir Senha
          </ion-button>

          <ion-button expand="block" fill="outline" @click="navigation.goToLogin">
            Voltar ao Login
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<style scoped>
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
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
</style>
