<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SchoolForm from '../../school-management/components/SchoolForm.vue'
import type { School, SchoolSettings } from '@prisma/client'

const school = ref<School>({
  id: '',
  name: '',
  address: null,
  city: null,
  state: null,
  postalCode: null,
  phone: null,
  institutionId: '',
  active: null,
  abbreviation: null,
  longitude: null,
  latitude: null,
  totalArea: null,
  builtArea: null,
  availableArea: null,
  acronym: null,
  blockDiaryEntries: null,
  operationalStatus: null,
  administrativeDependency: null,regulation: null,
  logoUrl: null,
  access: null,
  managerid: null,
  managerPosition: null,
  operationLocation: null,
  condition: null,
  sharedSchooLinePCode: null,
  creationDecree: null,
  numberOfFloors: null,
  floorType: null,
  energyMeter: null,
  hasExternalArea: null,
  metadata: null,
  createdAt: null,
  deletedAt: null,
  updatedAt: null,
  updatedBy: null,
  tenantId: null,
  userCreated: null,
  })
const schoolSettings = ref<SchoolSettings>({
  id: '',
  createdAt: new Date(),
  dateOpening: null,
  dateClosing: null,
  schoolDays: null,
  dateStart: null,
  dateEnd: null,
  institutionId: '',
  schoolId: '',
  updatedAt: null,
  updatedBy: null,
  tenantId: null,
  userCreated: null,
  deletedAt: null
})
const schoolFormRef = ref<InstanceType<typeof SchoolForm> | null>(null)
const router = useRouter()
function handleCancel() {
  router.push({ name: 'InstitutionListInstitutions' })
}

function handleSave() {
  schoolFormRef.value?.registerSchool()
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
    <div id="school-form">
      <SchoolForm :school="school" :schoolSettings="schoolSettings" ref="schoolFormRef" @cancel="handleCancel" @save="handleSave" />
    </div>

    <template #footer>
      <ion-grid>
        <ion-row class="ion-justify-content-between">
          <ion-col>
            <ion-button expand="block" color="danger" @click="handleCancel">
              Cancelar
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button expand="block" color="primary" @click="handleSave">
              Salvar
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </content-layout>
</template>

<style scoped>
ion-label h2 {
  margin: 0;
  font-weight: bold;
}

ion-searchbar {
  --background: var(--ion-color-light);
}
</style>
