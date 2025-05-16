<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/vue'
import { school } from 'ionicons/icons'
</script>

<template>
  <IonCard v-if="true">
    <IonCardHeader color="secondary">
      <div style="display: flex; align-items: center; height: 15px;">
        <IonIcon :icon="school" size="small" style="margin-right: 10px;" />
        <IonCardTitle style="font-size: medium;">
          Lista de registros
        </IonCardTitle>
      </div>
    </IonCardHeader>

    <div v-if="true">
      <IonCardContent class="" style="display: flex; flex-direction: column; gap: 15px;">
        content
      </IonCardContent>
    </div>
  </IonCard>
</template>
