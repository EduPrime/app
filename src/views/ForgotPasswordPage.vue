<script setup lang="ts">
import showToast from '@/utils/toast-alert'
import { IonSpinner } from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabaseClient'

const email = ref<string>('')
const loading = ref<boolean>(false)
const router = useRouter()

async function resetPassword() {
  loading.value = true
  const { error } = await supabase.auth.api.resetPasswordForEmail(email.value)
  loading.value = false

  if (error) {
    showToast('Falha ao enviar email de redefinição de senha', 'top', 'warning')
    console.error('Erro ao enviar email de redefinição de senha:', error.message)
  }
  else {
    showToast('Email de redefinição de senha enviado com sucesso', 'top', 'success')
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
            <ion-input v-model="email" label-placement="stacked" label="Email" placeholder="seuemail@dominio.com" />
          </ion-item>

          <ion-button expand="block" @click="resetPassword">
            <IonSpinner v-if="loading" slot="end" name="crescent" />
            Enviar link para redefinição
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
}s

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
</style>
