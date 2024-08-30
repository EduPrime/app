<script setup lang="ts">
import { pencil, trash } from 'ionicons/icons'
import { useRouter } from 'vue-router'

interface Teacher {
  id: string
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
  teachers: Teacher[]
}>()

const emit = defineEmits(['update:teachers'])
const router = useRouter()

function toggleDetails(index: number) {
  const updatedTeachers = [...props.teachers]
  updatedTeachers[index] = {
    ...updatedTeachers[index],
    showDetails: !updatedTeachers[index].showDetails,
  }
  emit('update:teachers', updatedTeachers)
}

function editTeacher(teacher: Teacher) {
  console.log('Editar', teacher)
  router.push({ name: 'EditTeacher', params: { id: teacher.id.toString() } })
}

function deleteTeacher(teacher: Teacher) {
  console.log('Excluir', teacher)
}
</script>

<template>
  <ion-list>
    <ion-item-sliding v-for="(teacher, index) in teachers" :key="index">
      <ion-item button @click="toggleDetails(index)">
        <ion-label>
          <h2>{{ teacher.name }}</h2>
          <p>{{ teacher.address }}</p>
        </ion-label>
        <ion-buttons slot="end">
          <ion-button @click.stop="editTeacher(teacher)">
            <ion-icon slot="icon-only" :icon="pencil" />
          </ion-button>
          <ion-button color="danger" @click.stop="deleteTeacher(teacher)">
            <ion-icon slot="icon-only" :icon="trash" />
          </ion-button>
        </ion-buttons>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option @click="editTeacher(teacher)">
          Editar
        </ion-item-option>
        <ion-item-option color="danger" @click="deleteTeacher(teacher)">
          Excluir
        </ion-item-option>
      </ion-item-options>
      <ion-item v-if="teacher.showDetails">
        <ion-grid>
          <ion-row v-for="(serie, sIndex) in teacher.series" :key="sIndex">
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
ion-item {
  --background: var(--ion-color-white);
  --border-radius: 8px;
}
</style>
