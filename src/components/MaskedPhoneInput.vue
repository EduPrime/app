<script setup lang="ts">
import { ref } from 'vue'
import { IonInput, IonItem, IonLabel } from '@ionic/vue'
import { maskitoPhoneOptionsGenerator } from '@maskito/phone'
import metadata from 'libphonenumber-js/min/metadata'

// Configuração da máscara de telefone
const phoneMaskOptions = maskitoPhoneOptionsGenerator({
  countryIsoCode: 'BR',
  metadata,
})

const phone = ref('')

function applyMask(event: any) {
  const inputElement = event.target as HTMLInputElement
  const valuePhone = inputElement.value
  const maskedValue = phoneMaskOptions.mask(valuePhone.replace(/\D/g, ''))
  phone.value = maskedValue
  inputElement.value = maskedValue
}
</script>

<template>
  <ion-item>
    <ion-label position="stacked">
      Telefone
    </ion-label>
    <ion-input
      v-model="phone"
      placeholder="Digite o telefone"
      @ion-input="applyMask"
    />
  </ion-item>
</template>

<style scoped>
/* Estilos opcionais */
</style>
