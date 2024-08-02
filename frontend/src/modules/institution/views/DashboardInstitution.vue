<script setup lang="ts">
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonList } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { addIcons } from 'ionicons'
import { pencil, trash } from 'ionicons/icons'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import InstitutionCards from '@/modules/institution/components/InstitutionCards.vue'
import { postgrest } from '@/services/postgrestClient' // Ajuste o caminho conforme necessário

// Registrar os ícones
addIcons({
  pencil,
  trash,
})

const items = ref<any[]>([])

const schoolCount = ref(10)
const classCount = ref(25)
const seriesCount = ref(7)
const teacherCount = ref(30)

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
])

function editInstitution(institution: any) {
  console.log('Edit Institution', institution)
}

function deleteInstitution(institution: any) {
  console.log('Delete Institution', institution)
}
async function fetchData() {
  const { data, error } = await postgrest.from('Institution').select('*')
  if (error) {
    console.error('Erro ao buscar dados:', error)
  }
  else {
    items.value = data
  }
}
onMounted(() => {
  fetchData()
})
</script>

<template>
  <content-layout>
    <institution-cards :school-count="schoolCount" :class-count="classCount" :series-count="seriesCount" :teacher-count="teacherCount" />
    <ion-list>
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
    {{ items }}
  </content-layout>
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
