<template>
  <ion-page>
    <ion-content>
      <p>Loading...</p>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { oidcAuth } from '../services/authService.ts';

onMounted(async () => {
  console.log('test', oidcAuth);
  user.value = await oidcAuth.userProfile;
  console.log('test', user)
});
</script>
