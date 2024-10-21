<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import { supabase } from '../supabaseClient'

const email = ref<string>('')
const password = ref<string>('')
const user = ref<any>(null)
const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  user.value = session?.user || null
  user.value = session?.user
})

async function signIn() {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    console.error('Erro ao fazer login:', error.message)
  }
  else {
    userStore.setUser(data.session?.user)
    router.push(`/dashboard/${data.session?.user?.id}`)
  }
}

function goToSignUp() {
  router.replace('/signup')
}
</script>

<template>
  <ion-content class="login-content">
    <ion-grid class="login-grid">
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
</style>
