<script setup lang="ts">
import showToast from '@/utils/toast-alert'
import { IonButton, IonIcon, IonInput, IonItem, IonList } from '@ionic/vue'
import { eye, lockClosed, mail } from 'ionicons/icons'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/AuthStore'
import { AuthService } from '@/services/AuthService'
import { resetRouter } from '@/utils/updateRoutes'
import { routes } from '@/router/index'
import { getCurrentInstance } from 'vue'


const email = ref<string>('')
const password = ref<string>('')
const user = ref<any>(null)
const router = useRouter()
const userStore = useAuthStore()
const authService = new AuthService()
const appInstance = getCurrentInstance()?.appContext.app

onMounted(async () => {
  try {
    const data = await authService.useSession()
    user.value = data?.user || null
  }
  catch (err) {
    console.log('Erro ao buscar sessão', (err as Error).message)
  }

})

const loading = ref<boolean>(false)

async function signIn() {
  loading.value = true
  try {
    const data = await authService.login(email.value, password.value)
    const orgs = await authService.listOrganizations()
    await authService.setActiveOrganization(orgs[0].id)
    showToast('Login realizado com sucesso', 'top', 'success')
    userStore.login(data)
    if (userStore.userLocal) {
      const localUserRole = JSON.parse(userStore.userLocal).role
      resetRouter(router, routes)
      if (localUserRole === 'PROFESSOR') {
        router.push('/home')
        window.location.reload()
      } else if (localUserRole === 'GESTORESCOLAR') {
        router.push('/student')
        window.location.reload()
      } else {
        router.push('/dashboard/Home')
        window.location.reload()
      }
    }
    // router.push(`/dashboard/${data?.id}`)
  }
  catch (error) {
    showToast('Falha ao fazer login', 'top', 'warning')
    console.error('Erro ao fazer login:', error as Error)
  }
  loading.value = false
}

const navigation = {
  goToSignUp() {
    router.replace('/signup')
  },
  resetPassword() {
    router.push('/forgot-password')
  },
}

// Buscar escolas ao montar o componente
onMounted(() => {
  //  fetchEscolas1960()
})
</script>

<template>
  <ion-content class="login-content">
    <ion-grid class="login-grid">
      <ion-row class="ion-justify-content-center ion-align-items-center full-height">
        <ion-col size="12" size-md="6" size-lg="4" class="login-form">
          <ion-img src="/assets/EduPrimeChat.png" alt="Logo" class="login-logo" />

          <IonItem>
            <IonInput v-model="email" label-placement="stacked" label="Email" placeholder="seuemail@dominio.com">
              <IonIcon slot="start" :icon="mail" aria-hidden="true" />
            </IonInput>
          </IonItem>
          <IonItem>
            <IonInput v-model="password" type="password" label-placement="stacked" label="Senha"
              placeholder="Digite sua senha">
              <IonIcon slot="start" :icon="lockClosed" aria-hidden="true" />
              <ion-input-password-toggle slot="end" />
            </IonInput>
          </IonItem>

          <ion-row class="ion-justify-content-start">
            <ion-col size="auto">
              <IonButton fill="clear" class="forgot-password-button" @click="navigation.resetPassword">
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

.forgot-password-button:hover::after {
  width: 100%;
  /* A linha expande para preencher a largura total */
}

.login-logo {
  display: block;
  margin: 0 auto 20px;
  width: 100%;
  height: auto;
}
</style>
