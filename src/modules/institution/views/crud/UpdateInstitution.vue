<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonItem, IonLabel } from '@ionic/vue'
import InstitutionService from '../../services/InstitutionService'
import type { Database, Enums, Tables } from '@/types/database.types'

const props = defineProps<{
  institution: Tables<'institution'> | undefined
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()

const institutionService = new InstitutionService()

const form = ref<Tables<'institution'>>()

onMounted(() => {
  if (props.institution) {
    form.value = { ...props.institution }
  }
})

async function submitForm() {
  try {
    let result: Database['public']['Tables']['institution']['Row'] | null = null
    if (form.value?.id) {
      result = await institutionService.update(form.value.id, form.value as Database['public']['Tables']['institution']['Update'])
    }
    if (result !== null) {
      console.log('Instituição salva com sucesso:', result)
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
  console.log('cancelEdit chamado')
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
          <ion-input v-model="form?.name ?? ''" placeholder="Nome da Instituição" required />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            Telefone
          </ion-label>
          <ion-input v-model="form?.phone ?? ''" placeholder="Telefone" type="tel" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            E-mail
          </ion-label>
          <ion-input v-model="form?.email ?? ''" placeholder="E-mail" type="email" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            Endereço
          </ion-label>
          <ion-input v-model="form?.address ?? ''" placeholder="Endereço" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            Cidade
          </ion-label>
          <ion-input v-model="form?.city ?? ''" placeholder="Cidade" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            UF
          </ion-label>
          <ion-input v-model="form?.state ?? ''" placeholder="Estado" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            CEP
          </ion-label>
          <ion-input v-model="form?.postalcode ?? ''" placeholder="CEP" type="text" />
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
