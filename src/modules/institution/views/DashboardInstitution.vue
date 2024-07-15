<script setup lang="ts">
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { addIcons } from 'ionicons'
import { pencil, trash } from 'ionicons/icons'

// Registrar os ícones
addIcons({
  pencil,
  trash,
})

const schoolCount = ref(10)
const classCount = ref(25)
const seriesCount = ref(7)
const teacherCount = ref(30)

onMounted(() => {
  // Aqui você pode fazer chamadas de API para obter os dados reais
  // e atualizar os valores das refs schoolCount, classCount, seriesCount e teacherCount
})

const institutions = ref([
  {
    id: 1,
    name: 'Fundo Municipal de Educação do Município de Araripina',
    dateOfBirth: '30.12.2010',
    phoneNumber: '(87) 99159-9534',
    email: 'nancynalencar@gmail.com',
    address: 'Rua Francisco Pedro da Rocha, 184',
    city: 'Araripina',
    state: 'PE',
    postalCode: '56280-000',
  },
  // Adicione mais instituições aqui
])

function editInstitution(institution: any) {
  // Função para editar instituição
  console.log('Edit Institution', institution)
}

function deleteInstitution(institution: any) {
  // Função para deletar instituição
  console.log('Delete Institution', institution)
}
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary" />
        </ion-buttons>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Dashboard
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="6" size-lg="3">
              <ion-card color="primary">
                <ion-card-header>
                  <ion-card-title>Escolas</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <h1 class="ion-text-xxl">
                    {{ schoolCount }}
                  </h1>
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-md="6" size-lg="3">
              <ion-card color="secondary">
                <ion-card-header>
                  <ion-card-title>Turmas</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <h1 class="ion-text-xxl">
                    {{ classCount }}
                  </h1>
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-md="6" size-lg="3">
              <ion-card color="tertiary">
                <ion-card-header>
                  <ion-card-title>Séries</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <h1 class="ion-text-xxl">
                    {{ seriesCount }}
                  </h1>
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-md="6" size-lg="3">
              <ion-card color="success">
                <ion-card-header>
                  <ion-card-title>Docentes</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <h1 class="ion-text-xxl">
                    {{ teacherCount }}
                  </h1>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <ion-list>
        <ion-item>
          <ion-input placeholder="Search..." clear-input />
        </ion-item>

        <ion-button expand="block" color="primary" class="create-button">
          Create Institution
        </ion-button>

        <ion-card v-for="institution in institutions" :key="institution.id">
          <ion-card-header class="card-header">
            <div class="card-title-container">
              <ion-card-title>{{ institution.name }}</ion-card-title>
              <ion-buttons>
                <ion-button fill="clear" @click="editInstitution(institution)">
                  <ion-icon slot="icon-only" :icon="pencil" />
                </ion-button>
                <ion-button fill="clear" color="danger" @click="deleteInstitution(institution)">
                  <ion-icon slot="icon-only" :icon="trash" />
                </ion-button>
              </ion-buttons>
            </div>
            <ion-card-subtitle>{{ institution.dateOfBirth }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <p><strong>Phone Number:</strong> {{ institution.phoneNumber }}</p>
            <p><strong>Email:</strong> <a :href="`mailto:${institution.email}`">{{ institution.email }}</a></p>
            <p><strong>Address:</strong> {{ institution.address }}</p>
            <p><strong>City:</strong> {{ institution.city }}</p>
            <p><strong>State:</strong> {{ institution.state }}</p>
            <p><strong>Postal Code:</strong> {{ institution.postalCode }}</p>
          </ion-card-content>
        </ion-card>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

  <style scoped>
  #create-button {
    margin: 16px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-title-container {
    display: flex;
    align-items: center;
  }

  .card-title-container ion-buttons {
    margin-left: 8px;
  }
  </style>
