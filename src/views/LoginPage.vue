<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button @click="login">Login</ion-button>
      <ion-button @click="logout">Logout</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { oidcAuth } from '../services/authService.ts';

const login = async () => {
  await oidcAuth.signIn();
};

const logout = async () => {
  await oidcAuth.signOut();
};
</script>
