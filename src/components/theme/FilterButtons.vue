<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import { businessOutline, list, peopleOutline } from 'ionicons/icons'
import { defineEmits, ref, watch } from 'vue'

const emits = defineEmits(['update:modelValue'])

const schoolInput = ref('')
const seriesInput = ref('')
const shiftInput = ref('')

watch([schoolInput, seriesInput, shiftInput], ([newSchool, newSeries, newShift]) => {
  if (newSchool || newSeries || newShift) {
    emits('update:modelValue', { school: newSchool, series: newSeries, shift: newShift })
  }
}, { immediate: true })
</script>

<template>
  <ion-grid class="ion-padding-bottom">
    <ion-row>
      <ion-col size="12" size-lg="6" class="input-col">
        <ion-input v-model="schoolInput" class="ion-padding-horizontal filter-content-input text-input-start school-input" placeholder="Escola">
          <IonIcon slot="start" color="lightaccent" class="input-icon" :ios="businessOutline" :md="businessOutline" />
        </ion-input>
      </ion-col>
      <ion-col size="6" size-lg="3" class="input-col">
        <ion-input v-model="seriesInput" class="ion-padding-horizontal filter-content-input text-input-start series-input" placeholder="Série">
          <IonIcon slot="start" color="lightaccent" class="input-icon" :ios="list" :md="list" />
        </ion-input>
      </ion-col>
      <ion-col size="6" size-lg="3" class="input-col">
        <ion-input v-model="shiftInput" class="ion-padding-horizontal filter-content-input text-input-start shift-input" placeholder="Turma">
          <IonIcon slot="start" color="lightaccent" class="input-icon" :ios="peopleOutline" :md="peopleOutline" />
        </ion-input>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<style scoped>
  .input-col {
    padding: 0; display: flex; height: 44px;
  }
  .input-icon {
    margin-top: auto; margin-bottom: auto; margin-right: 8px;
  }

  .text-input-start {
    display: flex ; justify-content: start ;
  }

  .school-input {
    background-color: var(--ion-color-secondary); width: 100%; height: 100%; border-top-right-radius: 5px; border-top-left-radius: 5px;
  }

  .series-input {
    background-color: var(--ion-color-tertiary); width: 100%; height: 100%; border-bottom-left-radius: 5px;
  }

  .shift-input {
    background-color: var(--ion-color-primary); width: 100%; height: 100%; border-bottom-right-radius: 5px;
  }

  /* Estilo para o texto dos placeholders */
.school-input::placeholder,
.series-input::placeholder,
.shift-input::placeholder {
  color: white; /* Cor do texto do placeholder */
  opacity: 1;   /* Garante que o placeholder seja visível */
}

/* Estilo para o texto digitado */
.school-input,
.series-input,
.shift-input {
  color: white; /* Cor do texto digitado */
}
</style>
