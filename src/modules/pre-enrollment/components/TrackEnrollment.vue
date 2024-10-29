<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonText } from '@ionic/vue'
</script>

<template>
  <IonCard>
    <div style="display: flex;">
      <img
        src="../assets/images/default_user.png" width="70px" alt="" class="ion-padding-start ion-padding-top"
        style="display: block; object-fit: contain; margin-top: auto; margin-bottom: auto;"
      >
      <IonCardHeader class="ion-padding-top">
        <IonCardTitle>
          <IonText color="primary">
            Aluno Fulano de Tal
          </IonText>
        </IonCardTitle>
        <IonCardSubtitle>
          <IonText color="primary">
            Pré-Matrícula: 84653
          </IonText>
        </IonCardSubtitle>
      </IonCardHeader>
    </div>
    <IonCardContent>
      <IonItem>
        <div>
          <IonText color="primary">
            <p>
              Escola Municipal ABCD
            </p>
          </IonText>
        </div>
      </IonItem>
      <IonItem>
        <div>
          <IonText color="primary">
            <p>Ensino Fundamental I - 5° Ano</p>
          </IonText>
        </div>
      </IonItem>
      <IonItem>
        <div>
          <IonText color="primary">
            <p>Situação da pré-matrícula</p>
          </IonText>
        </div>
        <span style="display: flex; margin-left: auto">
          <IonCardSubtitle class="ion-padding-end">
            <IonText color="primary">
              Em Analise
            </IonText>

          </IonCardSubtitle>
          <div
            style="height: 16px; width: 16px; background-color:orange ; border-radius: 100%; margin-top: auto; margin-bottom: auto;"
          />
        </span>
      </IonItem>
    </IonCardContent>
  </IonCard>
</template>
