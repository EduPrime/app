<template>
  <ion-content>
    <ion-item>
      <ion-input v-model="email" placeholder="Email"></ion-input>
    </ion-item>
    <ion-item>
      <ion-input type="password" v-model="password" placeholder="Senha"></ion-input>
    </ion-item>
    <ion-button @click="signIn">Entrar</ion-button>
    <br/>
    <br/>
    <ion-text>
      {{user}}
    </ion-text>
  </ion-content>
</template>

<script>
import {supabase} from '../supabaseClient'

export default {
  data() {
    return {
      email: '',
      password: '',
      user: {},
    }
  },
  methods: {
    async signIn() {
      const {error, data} = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password
      })
      if (error) {
        this.user = { error: error.message}
        console.error('Erro ao fazer login:', error.message)
      } else {
        this.user = data.user
        console.log('Login realizado com sucesso! ', data)
      }
    }
  }
}
</script>
