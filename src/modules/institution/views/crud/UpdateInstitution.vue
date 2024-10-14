<script setup lang="ts">
import type { Database, Tables } from '@/types/database.types'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonItem, IonLabel } from '@ionic/vue'
import { computed } from 'vue'
import InstitutionService from '../../services/InstitutionService'

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
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>Editar Instituição</IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      <form @submit.prevent="submitForm">
        <IonItem>
          <IonLabel position="stacked">
            Nome
          </IonLabel>
          <IonInput v-model="form.name" placeholder="Nome da Instituição" required />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            Telefone
          </IonLabel>
          <IonInput v-model="form.phone as string" placeholder="Telefone" type="tel" required />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            E-mail
          </IonLabel>
          <IonInput v-model="form.email as string" placeholder="E-mail" type="email" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            Endereço
          </IonLabel>
          <IonInput v-model="form.address as string" placeholder="Endereço" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            Cidade
          </IonLabel>
          <IonInput v-model="form.city as string" placeholder="Cidade" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            UF
          </IonLabel>
          <IonInput v-model="form.state as string" placeholder="Estado" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            CEP
          </IonLabel>
          <IonInput v-model="form.postalcode as string" placeholder="CEP" type="text" />
        </IonItem>

        <IonButton expand="block" type="submit">
          Salvar
        </IonButton>
        <IonButton expand="block" color="medium" @click="cancelEdit">
          Cancelar
        </IonButton>
      </form>
    </IonCardContent>
  </IonCard>
</template>

<style scoped>
ion-item {
  margin-bottom: 16px;
}

ion-button {
  margin-top: 20px;
}
</style>
