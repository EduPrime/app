<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import { businessOutline, list, peopleOutline } from 'ionicons/icons'
import { defineEmits, ref, watch } from 'vue'

const emits = defineEmits(['update:modelValue'])

const chosenButton = ref('')

watch(chosenButton, (newValue) => {
  if (newValue && newValue.length > 0) {
    emits('update:modelValue', newValue)
  }
}, { immediate: true })
</script>

<template>
  <ion-grid class="ion-padding-bottom">
    <ion-row>
      <ion-col size="12" size-lg="6" class="button-col">
        <button class="ion-padding-horizontal filter-content-button text-button-start school-button" @click="chosenButton = 'school'">
          <IonIcon color="lightaccent" class="button-icon" :ios="businessOutline" :md="businessOutline" />
          <ion-text color="lightaccent" style="margin-top: auto; margin-bottom: auto;">
            Escola
          </ion-text>
        </button>
      </ion-col>
      <ion-col size="6" size-lg="3" class="button-col">
        <button class="ion-padding-horizontal filter-content-button text-button-start series-button" @click="chosenButton = 'series'">
          <IonIcon color="lightaccent" class="button-icon" :ios="list" :md="list" />
          <ion-text color="lightaccent" style="margin-top: auto; margin-bottom: auto;">
            Série
          </ion-text>
        </button>
      </ion-col>
      <ion-col size="6" size-lg="3" class="button-col">
        <button class="ion-padding-horizontal filter-content-button text-button-start shift-button" @click="chosenButton = 'shift'">
          <IonIcon color="lightaccent" class="button-icon" :ios="peopleOutline" :md="peopleOutline" />
          <ion-text color="lightaccent" style="margin-top: auto; margin-bottom: auto;">
            Turma
          </ion-text>
        </button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<style scoped>
  .button-col {
    padding: 0; display: flex; height: 44px;
  }
  .button-icon {
    margin-top: auto; margin-bottom: auto; margin-right: 8px;
  }

  .text-button-start {
    display: flex ; justify-content: start ;
  }

  .school-button {
    background-color: var(--ion-color-secondary); width: 100%; height: 100%; border-top-right-radius: 5px; border-top-left-radius: 5px;
  }

  .series-button {
    background-color: var(--ion-color-tertiary); width: 100%; height: 100%; border-bottom-left-radius: 5px;
  }

  .shift-button {
    background-color: var(--ion-color-primary); width: 100%; height: 100%; border-bottom-right-radius: 5px;
  }

  .school-button:active {
    background-color: var(--ion-color-secondary-tint);
  }

  .series-button:active {
    background-color: var(--ion-color-tertiary-tint);
  }

  .shift-button:active {
    background-color: var(--ion-color-primary-tint);
  }
</style>
