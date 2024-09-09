<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
</script>

<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <template #start>
          <IonButtons>
            <IonMenuButton color="primary" />
            <IonBackButton default-href="/" />
          </IonButtons>
        </template>
        <IonTitle>{{ $route.params.id }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">
            {{ $route.params.id }}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="container">
        <strong class="capitalize">{{ $route.params.id }}</strong>
        <p>
          {{ $route.params.page ?? "" }}
        </p>
        <ion-text color="primary">
          <p>
            {{ $route.params.reportType ?? "" }}
          </p>
        </ion-text>
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
