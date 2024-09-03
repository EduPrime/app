<script setup lang="ts">
import { computed } from 'vue'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonItem, IonLabel } from '@ionic/vue'
import InstitutionService from '../../services/InstitutionService'
import type { Database, Enums, Tables } from '@/types/database.types'

const props = defineProps<{
  institution: Tables<'institution'>
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()

const institutionService = new InstitutionService()
const form = computed(() => {
  return { ...props.institution }
})
async function submitForm() {
  try {
    let result: Tables<'institution'> | null = null
    if (form.value?.id) {
      result = await institutionService.update(form.value.id, form.value as Database['public']['Tables']['institution']['Update'])
    }
    if (result !== null) {
      console.info('Instituição salva com sucesso:', result)
      emit('save')
    }
    else {
      console.error('Falha ao salvar a instituição')
    }
  }
  catch (error) {
    console.error('Erro ao salvar a instituição:', error)
  }
}

function cancelEdit() {
  emit('cancel')
}
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Editar Instituição</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <form @submit.prevent="submitForm">
        <ion-item>
          <ion-label position="stacked">
            Nome
          </ion-label>
          <ion-input v-model="form.name" placeholder="Nome da Instituição" required />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            Telefone
          </ion-label>
          <ion-input v-model="form.phone as string" placeholder="Telefone" type="tel" required />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            E-mail
          </ion-label>
          <ion-input v-model="form.email as string" placeholder="E-mail" type="email" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            Endereço
          </ion-label>
          <ion-input v-model="form.address as string" placeholder="Endereço" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            Cidade
          </ion-label>
          <ion-input v-model="form.city as string" placeholder="Cidade" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            UF
          </ion-label>
          <ion-input v-model="form.state as string" placeholder="Estado" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            CEP
          </ion-label>
          <ion-input v-model="form.postalcode as string" placeholder="CEP" type="text" />
        </ion-item>

        <ion-button expand="block" type="submit">
          Salvar
        </ion-button>
        <ion-button expand="block" color="medium" @click="cancelEdit">
          Cancelar
        </ion-button>
      </form>
    </ion-card-content>
  </ion-card>
</template>

<style scoped>
ion-item {
  margin-bottom: 16px;
}

ion-button {
  margin-top: 20px;
}
</style>
