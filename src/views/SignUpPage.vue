<script setup lang="ts">
import { useUserStore } from '@/store/user'
import showToast from '@/utils/toast-alert'
import { IonSelect, IonSelectOption } from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabaseClient'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('')
const validRoles = ['admin', 'professor', 'aluno']
const router = useRouter()
const userStore = useUserStore()

function onRoleChange(event: CustomEvent) {
  role.value = event.detail.value
}

async function signUp() {
  if (!role.value || !validRoles.includes(role.value)) {
    console.error(`Role is required and must be one of: ${validRoles.join(', ')}`)
    return
  }

  // Verifica se as senhas correspondem
  if (password.value !== confirmPassword.value) {
    console.error('Senhas não correspondem')
    showToast('As senhas não correspondem. Tente novamente.', 'top', 'warning')
    return
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        role: role.value,
      },
    },
  })

  if (error) {
    console.error('Error creating user:', error.message)
    showToast('Email já cadastrado. Tente novamente.', 'top', 'warning')
  }
  else {
    const { user, session } = data
    if (user && session) {
      userStore.setUser(user)
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
          <!-- Imagem acima do formul�rio -->
          <ion-img src="/assets/logo.png" alt="Logo" class="signup-logo" />

          <!-- Formul�rio de cadastro -->

          <ion-item>
            <ion-input v-model="email" label="Email" label-placement="stacked" placeholder="seuemail@dominio.com" />
          </ion-item>
          <ion-item>
            <ion-input v-model="password" label="Senha" label-placement="stacked" type="password" placeholder="Escolha uma senha segura" />
          </ion-item>
          <ion-item>
            <ion-input v-model="confirmPassword" label="Confirmar senha" label-placement="stacked" type="password" placeholder="Insira a senha novamente para confirmação" />
          </ion-item>
          <ion-item>
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
          </ion-item>

          <!-- Bot�o de Sign Up -->
          <ion-button expand="block" @click="signUp">
            Registrar
          </ion-button>

          <!-- Bot�o de Voltar para Login -->
          <ion-button expand="block" fill="outline" @click="goToLogin">
            Voltar para Login
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<style scoped>
.signup-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.signup-logo {
  display: block;
  margin: 0 auto 20px;
  width: 150px;
  height: auto;
}
</style>
