<script setup lang="ts">
import ClassroomService from '@/services/ClassroomService'
import ScheduleService from '@/services/ScheduleService'

import TeacherService from '@/services/TeacherService'

import { hexToRgb } from '@/utils/hex-to-rgb'
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonModal, IonRow } from '@ionic/vue'
import { arrowDown, arrowUp, businessOutline, peopleOutline } from 'ionicons/icons'
import { defineEmits, defineProps, onMounted, ref, watch } from 'vue'

interface Props {
  discipline?: boolean
}

interface Occupation {
  schoolId?: string
  schoolName?: string
  classroomId?: string
  classroomName?: string
  seriesId?: string
  seriesName?: string
  disciplineId?: string
  disciplineName?: string
  classes?: { classroomId: string, classroomName: string, serieId: string, serieName: string }[]

}

const props = defineProps<Props>()
const emits = defineEmits(['update:filteredOcupation'])
const teacherService = new TeacherService()
const scheduleService = new ScheduleService()
const classroomService = new ClassroomService()
const isFilterCollapse = ref(true)
const filteredOcupation = ref<Occupation>({})
const filteredClasses = ref<{ classroomId: string, classroomName: string, serieId: string, serieName: string }[]>([])
const filteredDisciplines = ref<{ disciplineId: string, disciplineName: string }[]>([])

const isModalSchool = ref(false)
const isModalSerie = ref(false)
const isModalDiscipline = ref(false)
const ocupation = ref<Occupation[]>()
const userid = ref(loadDataUser())
const teacherid = ref('')
const scheduleClass = ref<string[] | undefined>([])

const colorStyle = ref({
  primary: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-primary').trim(),
  secondary: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-secondary').trim(),
  tertiary: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim(),
})

const setFilterCollapse = (open: boolean) => (isFilterCollapse.value = open)
const setModalSchool = (open: boolean) => (isModalSchool.value = open)
const setModalSerie = (open: boolean) => (isModalSerie.value = open)
const setModalDiscipline = (open: boolean) => (isModalDiscipline.value = open)

function setSchool(school: Occupation): void {
  // Atualiza a escola
  filteredOcupation.value.schoolName = school.schoolName
  filteredOcupation.value.schoolId = school.schoolId

  // Limpa turma e disciplina ao mudar de escola
  filteredOcupation.value.classroomId = undefined
  filteredOcupation.value.classroomName = undefined
  filteredOcupation.value.seriesId = undefined
  filteredOcupation.value.seriesName = undefined
  filteredOcupation.value.disciplineId = undefined
  filteredOcupation.value.disciplineName = undefined

  // Atualiza as turmas disponíveis para a nova escola
  filteredClasses.value = school.classes || []

  // Limpa a lista de disciplinas
  filteredDisciplines.value = []

  setModalSchool(false)
  emitFilteredOcupation()
}

async function setClasses(classItem: { classroomId: string, classroomName: string, serieId: string, serieName: string }): Promise<void> {
  // Atualiza a turma
  filteredOcupation.value.classroomId = classItem.classroomId
  filteredOcupation.value.classroomName = classItem.classroomName
  filteredOcupation.value.seriesId = classItem.serieId
  filteredOcupation.value.seriesName = classItem.serieName

  // Limpa disciplinas antes de carregar novas
  filteredOcupation.value.disciplineId = undefined
  filteredOcupation.value.disciplineName = undefined
  filteredDisciplines.value = []

  // Carrega disciplinas disponíveis para a turma selecionada
  filteredDisciplines.value = await loadDisciplines(classItem.classroomId) || []

  setModalSerie(false)
  emitFilteredOcupation()
}

function setDiscipline(discipline: { disciplineId: string, disciplineName: string }): void {
  filteredOcupation.value.disciplineId = discipline.disciplineId
  filteredOcupation.value.disciplineName = abbreviate(discipline.disciplineName, 17)
  setModalDiscipline(false)
  emitFilteredOcupation()
}

async function loadDisciplines(classroomId: string) {
  try {
    const data = await scheduleService.listDiscipline(teacherid.value, classroomId)

    return data || []
  }
  catch (error) {
    console.error('Erro ao carregar as disciplinas:', error)
  }
}

function emitFilteredOcupation() {
  emits('update:filteredOcupation', { ...filteredOcupation.value, teacherId: teacherid.value })
}

function abbreviate(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

function loadDataUser() {
  const storedData = localStorage.getItem('userLocal')

  if (storedData) {
    return JSON.parse(storedData).id
  }
}

async function loadDataTeacher() {
  try {
    const data = await teacherService.listTeacherId(userid.value)

    return data.id || ''
  }
  catch (error) {
    console.error('Erro ao carregar os dados:', error)
  }
}

async function loadDataSchedule() {
  try {
    const data = await scheduleService.listClassrooms(teacherid.value)
    return Array.from(data) || []
  }
  catch (error) {
    console.error('Erro ao carregar os dados:', error)
  }
}

async function loadDataSchoolClass() {
  try {
    const data = await classroomService.listSchoolsAndClass(scheduleClass.value ?? [])

    return data || []
  }
  catch (error) {
    console.error('Erro ao carregar os dados:', error)
  }
}

watch(() => filteredOcupation.value.classroomId, async (newClassroomId) => {
  if (newClassroomId) {
    filteredDisciplines.value = await loadDisciplines(newClassroomId) || []
  }
  else {
    filteredDisciplines.value = []
  }
})

onMounted(async () => {
  userid.value = loadDataUser()
  teacherid.value = await loadDataTeacher()
  scheduleClass.value = await loadDataSchedule()
  ocupation.value = await loadDataSchoolClass()
  // console.log('Ocupation:', ocupation.value)
})

// Your component logic goes here
</script>

<template>
  <IonContent v-show="isFilterCollapse" class="" style="--background: rgba(249, 211, 227, 0.3); height: 235px;" :style="`box-shadow: inset 0 0 10px ${hexToRgb(colorStyle.primary, '0.2')}`">
    <ion-text color="secondary">
      <h4>Filtros</h4>
      <p style="font-size: 14px;">
        Preencha os filtros abaixo para uma mais acertiva
      </p>
    </ion-text>
    <IonGrid class="ion-no-padding">
      <IonRow>
        <IonCol size="12">
          <IonItem class="ion-filter-item" color="secondary" @click="setModalSchool(true)">
            <IonLabel class="custom-ion-item-label">
              {{ filteredOcupation.schoolName || 'Selecione uma escola' }}
            </IonLabel>
            <IonIcon slot="start" :icon="businessOutline" />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow v-if="props.discipline">
        <IonCol size="6">
          <IonItem class="ion-filter-item" color="tertiary" @click="setModalSerie(true)">
            <IonLabel class="custom-ion-label">
              {{ filteredOcupation.classroomName || 'Turma' }}
            </IonLabel>
            <IonIcon slot="start" :icon="peopleOutline" class="custom-icon" />
          </IonItem>
        </IonCol>
        <IonCol size="6">
          <IonItem class="ion-filter-item" color="primary" @click="setModalDiscipline(true)">
            <IonLabel class="custom-ion-label">
              {{ filteredOcupation.disciplineName || 'Disciplina' }}
            </IonLabel>
            <IonIcon slot="start" :icon="peopleOutline" class="custom-icon" />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow v-else>
        <IonCol size="12">
          <IonItem class="ion-filter-item" color="tertiary" @click="setModalSerie(true)">
            <IonLabel>{{ filteredOcupation.classroomName || 'Selecione uma turma' }}</IonLabel>
            <IonIcon slot="start" :icon="peopleOutline" />
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  </IonContent>

  <IonModal :is-open="isModalSchool" :initial-breakpoint="0.6" :breakpoints="[0, 0.6, 0.87]" @ion-modal-did-dismiss="setModalSchool(false)">
    <div class="block">
      <ion-list v-for="(sch, i) in ocupation" :key="i" :value="sch.schoolName">
        <IonItem @click="setSchool(sch)">
          <IonLabel>{{ sch.schoolName }}</IonLabel>
        </IonItem>
      </ion-list>
    </div>
  </IonModal>

  <IonModal :is-open="isModalSerie" :initial-breakpoint="0.6" :breakpoints="[0, 0.6, 0.87]" @ion-modal-did-dismiss="setModalSerie(false)">
    <div class="block">
      <ion-list v-for="(classItem, i) in filteredClasses" :key="i" :value="classItem.classroomName">
        <IonItem @click="setClasses(classItem)">
          <IonLabel>{{ classItem.classroomName }}</IonLabel>
        </IonItem>
      </ion-list>
    </div>
  </IonModal>

  <IonModal :is-open="isModalDiscipline" :initial-breakpoint="0.6" :breakpoints="[0, 0.6, 0.87]" @ion-modal-did-dismiss="setModalDiscipline(false)">
    <div class="block">
      <ion-list v-for="(discipline, i) in filteredDisciplines" :key="i" :value="discipline.disciplineName">
        <IonItem @click="setDiscipline(discipline)">
          <IonLabel>{{ discipline.disciplineName }}</IonLabel>
        </IonItem>
      </ion-list>
    </div>
  </IonModal>

  <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: isFilterCollapse ? '0' : '5px' }">
    <ion-text v-show="!isFilterCollapse" color="secondary">
      <div class="ion-margin-horizontal">
        <span style="margin-right: 10px; color: var(--ion-color-accent)">{{ filteredOcupation.schoolName }}</span><br>

        <small style="color: var(--ion-color-accent)">{{ filteredOcupation.classroomName }} - {{ filteredOcupation.disciplineName }}</small>
      </div>
    </ion-text>
    <IonButton color="tertiary" :style="{ marginTop: isFilterCollapse ? '-20px' : '2px', marginLeft: isFilterCollapse ? '21.9em' : 'auto', marginRight: isFilterCollapse ? '10px' : '10px' }" @click="setFilterCollapse(!isFilterCollapse)">
      <IonIcon slot="icon-only" :icon="isFilterCollapse ? arrowUp : arrowDown" />
    </IonButton>
  </div>
</template>

<style scoped>
ion-content {
  --padding-start: 10px;
  --padding-end: 10px;
}
.ion-content {
  padding-left: 10px;
  padding-right: 10px;
}
ion-accordion-group {
  margin-inline: 0 !important;
  margin-top: 16px;
}

.ion-select-card-content {
  --border-color: var(--ion-color-secondary);
  --placeholder-color: var(--ion-color-secondary);
  --placeholder-opacity: 1;
  width: 100%;
}

.ion-select-card-content::part(text) {
  flex: 0 0 auto;
}

.ion-select-card-content::part(text) {
  color: var(--ion-color-secondary);
  background-color: rgba(79, 41, 116, 0.1);
  border-radius: 16px;
  padding: 2px 8px;
  display: inline-block;
}

.ion-select-card-content::part(icon) {
  color: var(--ion-color-secondary);
  opacity: 1;
}

ion-modal#copy-modal {
  --width: fit-content;
  /* --min-width: 350px; */
  --height: fit-content;
  --border-radius: 6px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#copy-modal h1 {
  margin: 20px 20px 10px 20px;
}

ion-modal#copy-modal ion-icon {
  margin-top: 6px;
  margin-right: 6px;

  width: 22px;
  height: 22px;

  padding: 0 4px;

  color: var(--ion-color-lightaccent-shade);
}

/*
.custom-floating-label::part(label) {
  transform: translateY(10%) scale(1);
} */

ion-select {

  --placeholder-color: var(--ion-color-primary);
  --placeholder-opacity: 1;
  --border-color: var(--ion-color-primary)
 }
 ion-select::part(text) {
    color: var(--ion-color-primary);
  }
  ion-select::part(icon) {
    color: var(--ion-color-primary);
    opacity: 1;
  }
  ion-select::part(label) {
    color: var(--ion-color-primary);
    opacity: 1;
  }
  .custom-ion-item-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ion-filter-item {
    --min-height: 57px;
  }
  .custom-ion-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .custom-icon {
    margin-right: 8px;
  }
</style>
