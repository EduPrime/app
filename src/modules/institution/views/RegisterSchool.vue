<script setup lang="ts">
import { ref } from 'vue'
import { IonContent, IonLabel, IonPage, IonSegment, IonSegmentButton } from '@ionic/vue'

const selectedSegment = ref('general-info')

const form = ref({
  id: '',
  name: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  abbreviation: '',
  longitude: '',
  latitude: '',
  totalArea: '',
  builtArea: '',
  availableArea: '',
  acronym: '',
  logoUrl: '',
  managerId: '',
  managerPosition: '',
  operationLocation: '',
  numberOfFloors: '',
})

function registerSchool() {
  console.log('Escola registrada:', form.value)
}
</script>

<template>
  <content-layout :show-footer="true">
    <template #header-buttons>
      <ion-buttons slot="start">
        <ion-back-button default-href="/" />
      </ion-buttons>
    </template>
    <template #description>
      Todos os campos são obrigatórios, a menos que indicado de outra forma.
    </template>
    <h3 class="ion-text-end ion-text-uppercase">
      Inserir Escola
    </h3>

    <ion-segment v-model="selectedSegment">
      <ion-segment-button value="general-info">
        <ion-label style="font-size: calc(1rem - 2px);">
          Informações Gerais
        </ion-label>
      </ion-segment-button>
      <ion-segment-button value="location">
        <ion-label style="font-size: calc(1rem - 2px);">
          Localização
        </ion-label>
      </ion-segment-button>
      <ion-segment-button value="facilities">
        <ion-label style="font-size: calc(1rem - 2px);">
          Instalações
        </ion-label>
      </ion-segment-button>
    </ion-segment>

    <div v-show="selectedSegment === 'general-info'">
      <ion-item>
        <ion-label position="stacked">
          Nome
        </ion-label>
        <ion-input v-model="form.name" placeholder="Digite o nome da escola" />
      </ion-item>
      <ion-item>
        <ion-label position="stacked">
          Abreviação
        </ion-label>
        <ion-input v-model="form.abbreviation" placeholder="Digite a abreviação" />
      </ion-item>
      <ion-item>
        <ion-label position="stacked">
          ID do Gerente
        </ion-label>
        <ion-input v-model="form.managerId" placeholder="Digite o ID do gerente" />
      </ion-item>
      <ion-item>
        <ion-label position="stacked">
          Posição do Gerente
        </ion-label>
        <ion-input v-model="form.managerPosition" placeholder="Digite a posição do gerente" />
      </ion-item>
      <ion-item>
        <ion-label position="stacked">
          URL do Logo
        </ion-label>
        <ion-input v-model="form.logoUrl" placeholder="Digite a URL do logo" />
      </ion-item>
    </div>

    <div v-show="selectedSegment === 'location'">
      <ion-item>
        <ion-label position="stacked">
          Endereço
        </ion-label>
        <ion-input v-model="form.address" placeholder="Digite o endereço" />
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
        <ion-input v-model="form.postalCode" placeholder="Digite o CEP" />
      </ion-item>
      <ion-item>
        <ion-label position="stacked">
          Latitude
        </ion-label>
        <ion-input v-model="form.latitude" placeholder="Digite a latitude" />
      </ion-item>
      <ion-item>
        <ion-label position="stacked">
          Longitude
        </ion-label>
        <ion-input v-model="form.longitude" placeholder="Digite a longitude" />
      </ion-item>
    </div>

    <div v-show="selectedSegment === 'facilities'">
      <ion-item>
        <ion-label position="stacked">
          Número de Andares
        </ion-label>
        <ion-input v-model="form.numberOfFloors" placeholder="Digite o número de andares" />
      </ion-item>
      <ion-item>
        <ion-label position="stacked">
          Área Total
        </ion-label>
        <ion-input v-model="form.totalArea" placeholder="Digite a área total" />
      </ion-item>
      <ion-item>
        <ion-label position="stacked">
          Área Construída
        </ion-label>
        <ion-input v-model="form.builtArea" placeholder="Digite a área construída" />
      </ion-item>
      <ion-item>
        <ion-label position="stacked">
          Área Disponível
        </ion-label>
        <ion-input v-model="form.availableArea" placeholder="Digite a área disponível" />
      </ion-item>
      <ion-item>
        <ion-label position="stacked">
          Local de Operação
        </ion-label>
        <ion-input v-model="form.operationLocation" placeholder="Digite o local de operação" />
      </ion-item>
    </div>
    <template #footer>
      <ion-grid>
        <ion-row class="ion-justify-content-between">
          <ion-col>
            <ion-button expand="block" color="danger">
              Cancelar
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button expand="block" color="primary" @click="registerSchool">
              Salvar
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </content-layout>
</template>

<style scoped>
/* Estilos opcionais */
</style>

<style scoped>
/* Estilos opcionais */
</style>
