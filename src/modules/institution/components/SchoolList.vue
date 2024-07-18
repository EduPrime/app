<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import { pencil, trash } from 'ionicons/icons'

interface School {
  name: string
  address: string
  showDetails: boolean
  series: Array<{
    name: string
    classes: Array<{
      name: string
      teacher: string
      schedule: string
      subjects: string[]
    }>
  }>
}

const props = defineProps<{
  schools: School[]
}>()

const emit = defineEmits(['update:schools'])

function toggleDetails(index: number) {
  const updatedSchools = [...props.schools]
  updatedSchools[index] = {
    ...updatedSchools[index],
    showDetails: !updatedSchools[index].showDetails,
  }
  emit('update:schools', updatedSchools)
}

function editSchool(school: School) {
  console.log('Editar', school)
}

function deleteSchool(school: School) {
  console.log('Excluir', school)
}
</script>

<template>
  <ion-list>
    <ion-item-sliding v-for="(school, index) in schools" :key="index">
      <ion-item button @click="toggleDetails(index)">
        <ion-label>
          <h2>{{ school.name }}</h2>
          <p>{{ school.address }}</p>
        </ion-label>
        <ion-buttons slot="end">
          <ion-button @click.stop="editSchool(school)">
            <ion-icon slot="icon-only" :icon="pencil" />
          </ion-button>
          <ion-button color="danger" @click.stop="deleteSchool(school)">
            <ion-icon slot="icon-only" :icon="trash" />
          </ion-button>
        </ion-buttons>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option @click="editSchool(school)">
          Editar
        </ion-item-option>
        <ion-item-option color="danger" @click="deleteSchool(school)">
          Excluir
        </ion-item-option>
      </ion-item-options>
      <ion-item v-if="school.showDetails">
        <ion-grid>
          <ion-row v-for="(serie, sIndex) in school.series" :key="sIndex">
            <ion-col size="12">
              <strong>{{ serie.name }}</strong>
            </ion-col>
            <ion-col v-for="(classItem, cIndex) in serie.classes" :key="cIndex" size="12">
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ classItem.name }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <p><strong>Professor:</strong> {{ classItem.teacher }}</p>
                  <p><strong>Horário:</strong> {{ classItem.schedule }}</p>
                  <p><strong>Disciplinas:</strong> {{ classItem.subjects.join(', ') }}</p>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
    </ion-item-sliding>
  </ion-list>
</template>

<style scoped>
ion-item:hover {
  --background: #f0f0f0;
  --ripple-color: #d0d0d0;
}

ion-item {
  --background: white;
  --border-radius: 8px;
  margin: 8px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}
</style>
