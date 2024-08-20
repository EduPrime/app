<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonItem, IonLabel } from '@ionic/vue'
import InstitutionService from '../../services/InstitutionService'
import type { Institution } from '../../types/Institution'

const props = defineProps<{ institution: Institution | null }>()

// Definindo os eventos que o componente pode emitir
const emit = defineEmits<{
  (e: 'cancel'): void
}>()

const institutionService = new InstitutionService()

// Estado do formulário
const form = ref<Partial<Institution>>({
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
})

// Carrega os dados da instituição ao montar o componente
onMounted(() => {
  if (props.institution) {
    form.value = { ...props.institution }
  }
})

// Função para submissão do formulário
async function submitForm() {
  try {
    if (form.value.id) {
      await institutionService.update(form.value.id, form.value as Institution)
    }
    else {
      await institutionService.create(form.value as Institution)
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
          <ion-input v-model="form.name" placeholder="Nome da Instituição" required />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            Telefone
          </ion-label>
          <ion-input v-model="form.phone" placeholder="Telefone" type="tel" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            E-mail
          </ion-label>
          <ion-input v-model="form.email" placeholder="E-mail" type="email" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            Endereço
          </ion-label>
          <ion-input v-model="form.address" placeholder="Endereço" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            Cidade
          </ion-label>
          <ion-input v-model="form.city" placeholder="Cidade" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            UF
          </ion-label>
          <ion-input v-model="form.state" placeholder="Estado" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            CEP
          </ion-label>
          <ion-input v-model="form.postalCode" placeholder="CEP" type="text" />
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
