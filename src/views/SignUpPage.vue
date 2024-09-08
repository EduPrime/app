<script>
import { supabase } from '../supabaseClient'
import { useUserStore } from '@/store/user.js'

export default {
  data() {
    return {
      email: '',
      password: '',
      role: '',
      validRoles: ['adm', 'teacher', 'aluno'],
    }
  },
  methods: {
    onRoleChange(event) {
      this.role = event.detail.value
    },
    async signUp() {
      if (!this.role || !this.validRoles.includes(this.role)) {
        console.error(`Role is required and must be one of: ${this.validRoles.join(', ')}`)
        return
      }

      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
        options: {
          data: {
            role: this.role,
          },
        },
      })

      if (error) {
        console.error('Error creating user:', error.message)
      }
      else {
        const { user, session } = data
        if (user && session) {
          const userStore = useUserStore()
          userStore.setUser(user)
          sessionStorage.setItem('user', JSON.stringify(user))

          this.$router.replace(`/dashboard/${user.id}`)
        }
      }
    },
    goToLogin() {
      this.$router.replace('/login')
    },
  },
}
</script>

<template>
  <ion-content class="signup-content">
    <ion-grid class="signup-grid">
      <ion-row class="ion-justify-content-center ion-align-items-center full-height">
        <ion-col size="12" size-md="6" size-lg="4" class="signup-form">
          <!-- Imagem acima do formulário -->
          <ion-img src="/assets/logo.png" alt="Logo" class="signup-logo" />

          <!-- Formulário de cadastro -->
          <ion-item>
            <ion-input v-model="email" placeholder="Email" />
          </ion-item>
          <ion-item>
            <ion-input v-model="password" type="password" placeholder="Password" />
          </ion-item>
          <ion-item>
            <ion-select v-model="role" placeholder="Select a role" @ion-change="onRoleChange">
              <ion-select-option value="adm">
                Admin
              </ion-select-option>
              <ion-select-option value="teacher">
                Teacher
              </ion-select-option>
              <ion-select-option value="aluno">
                Aluno
              </ion-select-option>
            </ion-select>
          </ion-item>

          <!-- Botão de Sign Up -->
          <ion-button expand="block" @click="signUp">
            Sign Up
          </ion-button>

          <!-- Botão de Voltar para Login -->
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
