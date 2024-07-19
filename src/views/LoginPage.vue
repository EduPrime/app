<!-- src/views/LoginPage.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Login</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="email" type="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input v-model="password" type="password"></ion-input>
          </ion-item>
          <ion-button expand="full" @click="login" style="max-width: 300px">Login</ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios';
import { getAuthRequest, postRequest } from "@/utils/ApiServices.ts";
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  setup() {
    const router = useRouter();

    return {
      router
    };
  },
  methods: {
    async login() {
      try {
        const response = await postRequest('/api/auth/local', {
          identifier: this.email,
          password: this.password,
        });

        const token = response.jwt;

        const user = await getAuthRequest('/api/users/me?populate=*', token);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ ...user, role: user.role }));

        this.router.push('/dashboard/Home');
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
  },
};
</script>
