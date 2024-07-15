<script setup lang="ts">
import { ref } from 'vue'
import { IonSelect, IonSelectOption } from '@ionic/vue'

const form = ref({
  cnpj: '',
  companyName: '',
  tradeName: '',
  startDate: '',
  legalNature: '',
  registrationStatus: '',
  responsibleQualification: '',
  companySize: '',
  simpleOption: '',
  meiOption: '',
  address: '',
  neighborhood: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
  fax: '',
  email: '',
  logo: null as File | null,
  socialMedia: '',
})

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    form.value.logo = target.files[0]
  }
}

function registerInstitution() {
  console.log('Instituição registrada:', form.value)
  // Aqui você pode adicionar a lógica para enviar os dados para um backend ou API
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registrar Instituição</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">
          CNPJ
        </ion-label>
        <ion-input v-model="form.cnpj" placeholder="Digite o CNPJ" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Nome da Empresa
        </ion-label>
        <ion-input v-model="form.companyName" placeholder="Digite o nome da empresa" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Nome Fantasia
        </ion-label>
        <ion-input v-model="form.tradeName" placeholder="Digite o nome fantasia" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Data de Início das Atividades
        </ion-label>
        <ion-input v-model="form.startDate" type="date" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Responsável da Instituição
        </ion-label>
        <ion-input v-model="form.responsibleQualification" placeholder="Nome completo do responsável" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Endereço
        </ion-label>
        <ion-input v-model="form.address" placeholder="Digite o endereço" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Bairro
        </ion-label>
        <ion-input v-model="form.neighborhood" placeholder="Digite o bairro" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Cidade
        </ion-label>
        <ion-input v-model="form.city" placeholder="Digite a cidade" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Estado
        </ion-label>
        <ion-input v-model="form.state" placeholder="Digite o estado" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          CEP
        </ion-label>
        <ion-input v-model="form.zipCode" placeholder="Digite o CEP" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Telefone
        </ion-label>
        <ion-input v-model="form.phone" placeholder="Digite telefone " />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Email
        </ion-label>
        <ion-input v-model="form.email" type="email" placeholder="Digite o email" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Logotipo
        </ion-label>
        <input type="file" @change="handleFileUpload">
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Redes Sociais
        </ion-label>
        <ion-input v-model="form.socialMedia" placeholder="Digite as redes sociais" />
      </ion-item>

      <ion-button expand="block" @click="registerInstitution">
        Registrar
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<style scoped>
/* Estilos opcionais */
</style>
