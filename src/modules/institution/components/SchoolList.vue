<script setup lang="ts">
import { pencil, trash } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { IonAlert } from '@ionic/vue'
import { ref } from 'vue'
import SchoolService from '../services/SchoolService'
import showToast from '@/utils/toast-alert'
import type { Database, Tables } from '@/types/database.types'

const props = defineProps<{
  schools: School[]
}>()

const emit = defineEmits(['update:schools'])
const router = useRouter()
const school = ref< Tables<'school'> | []>([]) 
function toggleDetails(index: number) {
  const updatedSchools = [...props.schools]
  updatedSchools[index] = {
    ...updatedSchools[index],
    showDetails: !updatedSchools[index].showDetails,
  }
  emit('update:schools', updatedSchools)
}

function editSchool(school: School) {
  router.push({ name: 'EditSchools', params: { id: school.school.id.toString() } })
}

const isAlertOpen = ref(false)
const schoolToDelete = ref<School | null>(null)
function openDeleteAlert(school: School) {
  schoolToDelete.value = school
  isAlertOpen.value = true
}
function handleAlertDismiss(ev: CustomEvent) {
  const role = ev.detail.role
  if (role === 'confirm' && schoolToDelete.value) {
    deleteSchool(schoolToDelete.value)
  }
  else {
    handleCancel()
  }
}
async function deleteSchool(school: School) {
  const schoolService = new SchoolService()

  if (school.school.id) {
    const result = await schoolService.softDelete(school.school.id)
    if (result) {
      showToast(`${school.school.name} excluído com sucesso`)
      setTimeout(() => {
            router.push('/Institutions/schools').then(() => {
              location.reload()
            })
          }, 2000)
      emit('update:schools')
      isAlertOpen.value = false
      schoolToDelete.value = null
    }
  }
  else {
    console.error('Erro ao excluir a escola.')
  }
}

function handleCancel() {
  console.info('Exclusão cancelada')
  isAlertOpen.value = false
  schoolToDelete.value = null
}
const alertButtons = [
  {
    text: 'Cancelar',
    role: 'cancel',

  },
  {
    text: 'Excluir',
    role: 'confirm',

  },
]
</script>

<template>
  <ion-alert
    :is-open="isAlertOpen"
    header="Confirmar Exclusão"
    message="Tem certeza de que deseja excluir este item?"
    :buttons="alertButtons"
    @did-dismiss="handleAlertDismiss"
  />
  <ion-list>
    <ion-item-sliding v-for="(school, index) in schools" :key="index">
      <ion-item button @click="toggleDetails(index)">
        <ion-label>
          <h2>{{ school.school.name }}</h2>
          <p>{{ school.school.address }}</p>
        </ion-label>
        <ion-buttons slot="end">
          <ion-button @click.stop="editSchool(school)">
            <ion-icon id="present-alert" slot="icon-only" :icon="pencil" />
          </ion-button>
          <ion-button color="danger" @click.stop="openDeleteAlert(school)">
            <ion-icon slot="icon-only" :icon="trash" />
          </ion-button>
        </ion-buttons>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option @click="editSchool(school)">
          Editar
        </ion-item-option>
        <ion-item-option color="danger" @click="openDeleteAlert(school)">
          Excluir
        </ion-item-option>
      </ion-item-options>
      <ion-item v-if="school.showDetails">
        <ion-grid>
          <ion-row v-for="(serie, sIndex) in school.series" :key="sIndex">
            <ion-col size="12">
              <strong>{{ serie.name }}</strong>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
    </ion-item-sliding>
  </ion-list>
</template>

<style scoped>
ion-item {
  --background: var(--ion-color-white);
  --border-radius: 8px;
}
</style>