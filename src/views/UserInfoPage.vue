<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div v-if="user">
        <p>{{ user.profile.name }}</p>
        <p>{{ user.profile.email }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { oidcAuth } from '../services/authService.ts';

const user = ref(null);

onMounted(async () => {
  user.value = await oidcAuth.userProfile;
  console.log('test', user.value)
});
</script>
