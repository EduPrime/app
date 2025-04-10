<script setup lang="ts">
import ClassroomService from '@/services/ClassroomService'
import EvaluationRuleService from '@/services/EvaluationRuleService'
import ScheduleService from '@/services/ScheduleService'

import TeacherService from '@/services/TeacherService'

import { hexToRgb } from '@/utils/hex-to-rgb'
import { IonButton, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonModal, IonRow } from '@ionic/vue'
import { apps, arrowDown, arrowUp, businessOutline, filterCircleOutline, peopleOutline } from 'ionicons/icons'
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
  courseIds?: string
  frequency?: string
  evaluation?: string
  classes?: { classroomId: string, classroomName: string, serieId: string, serieName: string, courseId: string }[]

}

const props = defineProps<Props>()
const emits = defineEmits(['update:filteredOcupation'])
const teacherService = new TeacherService()
const scheduleService = new ScheduleService()
const evaluationRuleService = new EvaluationRuleService()
const classroomService = new ClassroomService()
const isFilterCollapse = ref(true)
const filteredOcupation = ref<Occupation>({})
const filteredClasses = ref<{ classroomId: string, classroomName: string, serieId: string, serieName: string, courseId: string }[]>([])
const filteredDisciplines = ref<{ disciplineId: string, disciplineName: string }[]>([])
const filterEvaluationRule = ref<{ frequencyType?: string, gradeType?: string }>()

const pulseAtEnd = ref()
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
function setModalSchool(open: boolean) {
  isModalSchool.value = open
  if (open) {
    isModalSchool.value = false
    setTimeout(() => (isModalSchool.value = true), 10)
  }
}
function setModalSerie(open: boolean) {
  isModalSerie.value = open
  if (open) {
    setTimeout(() => (isModalSerie.value = true), 10)
  }
}
function setModalDiscipline(open: boolean) {
  isModalDiscipline.value = open
  if (open) {
    isModalDiscipline.value = false
    setTimeout(() => (isModalDiscipline.value = true), 10)
  }
}

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
  filteredOcupation.value.courseIds = undefined
  filteredOcupation.value.frequency = undefined
  filteredOcupation.value.evaluation = undefined

  // Atualiza as turmas disponíveis para a nova escola
  filteredClasses.value = school.classes || []

  // Limpa a lista de disciplinas
  filteredDisciplines.value = []

  setModalSchool(false)
  emitFilteredOcupation()
}

async function setClasses(classItem: { classroomId: string, classroomName: string, serieId: string, serieName: string, courseId: string }): Promise<void> {
  // Atualiza a turma
  filteredOcupation.value.classroomId = classItem.classroomId
  filteredOcupation.value.classroomName = classItem.classroomName
  filteredOcupation.value.seriesId = classItem.serieId
  filteredOcupation.value.seriesName = classItem.serieName
  filteredOcupation.value.courseIds = classItem.courseId

  // Limpa disciplinas antes de carregar novas
  filteredOcupation.value.disciplineId = undefined
  filteredOcupation.value.disciplineName = undefined
  filteredDisciplines.value = []
  filteredOcupation.value.frequency = undefined
  filteredOcupation.value.evaluation = undefined

  // Carrega disciplinas disponíveis para a turma selecionada
  filteredDisciplines.value = await loadDisciplines(classItem.classroomId) || []

  // Carrega regras de avaliação disponíveis para a turma selecionada
  filterEvaluationRule.value = await loadEvaluationRule(classItem.courseId) || {}

  // Adiciona o retorno de filterEvaluationRule às propriedades frequency e evaluation
  if (filterEvaluationRule.value) {
    filteredOcupation.value.frequency = filterEvaluationRule.value.frequencyType
    filteredOcupation.value.evaluation = filterEvaluationRule.value.gradeType
  }
  else {
    filteredOcupation.value.frequency = undefined
    filteredOcupation.value.evaluation = undefined
  }

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

async function loadEvaluationRule(courseId: string) {
  try {
    const data = await evaluationRuleService.getRulesFromCourse(courseId)

    return data || {}
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

function pulse() {
  pulseAtEnd.value = 'pulseButton'
  setTimeout(() => {
    pulseAtEnd.value = ''
  }, 1500)
}

watch(() => filteredOcupation.value.frequency, (newValue) => {
  if (newValue === 'disciplina') {
    pulse()
  }
}, { immediate: true, deep: true })

watch(() => filteredOcupation.value.classroomId, async (newClassroomId) => {
  if (newClassroomId) {
    filteredDisciplines.value = await loadDisciplines(newClassroomId) || []
  }
  else {
    filteredDisciplines.value = []
  }
})

watch(ocupation, async (newValue) => {
  if (Array.isArray(newValue) && newValue.length === 1) {
    newValue.forEach((element: any) => {
      setSchool(element)
    })
  }
}, { immediate: true })

onMounted(async () => {
  userid.value = loadDataUser()
  teacherid.value = await loadDataTeacher()
  scheduleClass.value = await loadDataSchedule()
  ocupation.value = await loadDataSchoolClass()
})

// Your component logic goes here
</script>

<template>
  <IonContent v-show="isFilterCollapse" class="" style="--background: rgba(249, 211, 227, 0.3); height: 235px;" :style="`box-shadow: inset 0 0 10px ${hexToRgb(colorStyle.primary, '0.2')}`">
    <ion-text color="secondary">
      <h4>Filtros</h4>
      <p style="font-size: 14px;">
        Preencha os filtros abaixo para realizar a busca.
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
      <IonRow v-if="props.discipline || filteredOcupation.frequency === 'disciplina'">
        <IonCol size="6">
          <IonItem class="ion-filter-item" color="tertiary" @click="setModalSerie(true)">
            <IonLabel class="custom-ion-label">
              {{ filteredOcupation.classroomName || 'Turma' }}
            </IonLabel>
            <IonIcon slot="start" :icon="peopleOutline" class="custom-icon" />
          </IonItem>
        </IonCol>
        <IonCol size="6">
          <IonItem class="ion-filter-item" :class="pulseAtEnd" color="primary" @click="setModalDiscipline(true)">
            <IonLabel class="custom-ion-label">
              {{ filteredOcupation.disciplineName || 'Disciplina' }}
            </IonLabel>
            <IonIcon slot="start" :icon="apps" class="custom-icon" />
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
      <ion-list v-for="(d, i) in filteredDisciplines" :key="i" :value="d.disciplineName">
        <IonItem @click="setDiscipline(d)">
          <IonLabel>{{ d.disciplineName }}</IonLabel>
        </IonItem>
      </ion-list>
    </div>
  </IonModal>

  <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: isFilterCollapse ? '0' : '5px' }">
    <ion-text v-show="!isFilterCollapse" color="secondary" class="ion-padding-vertical">
      <div v-if="filteredOcupation?.schoolName" class="ion-content">
        <span style="margin-right: 10px; margin-left: 2px; color: var(--ion-color-tertiary); font-weight: 700;">{{ filteredOcupation.schoolName }}</span><br>

        <IonChip color="tertiary" class="ion-no-margin">
          Turma: {{ filteredOcupation.classroomName }}
        </IonChip>
        <IonChip v-if="filteredOcupation?.disciplineName" color="tertiary" class="ion-no-margin" style="margin-left: 5px;">
          {{ filteredOcupation?.disciplineName?.slice(0, 15) }} <span v-if="filteredOcupation?.disciplineName?.length > 15">...</span>
        </IonChip>
      </div>
      <ion-text v-else color="secondary">
        <h3 class="ion-content" style="margin-bottom: 0; display: flex;">
          <IonIcon style="margin-top: auto; margin-bottom: auto;" :icon="filterCircleOutline" />
          <span style="margin-top: auto; margin-bottom: auto; margin-left: 2px">
            Filtros
          </span>
        </h3>
        <p class="ion-content" style="margin-top: 0;">
          Clique no botão para abrir os filtros
        </p>
      </ion-text>
    </ion-text>
    <IonButton color="tertiary" :style="{ marginTop: isFilterCollapse ? '-20px' : '2px', marginLeft: 'auto', marginRight: isFilterCollapse ? '10px' : '10px' }" @click="setFilterCollapse(!isFilterCollapse)">
      <IonIcon slot="icon-only" :icon="isFilterCollapse ? arrowUp : arrowDown" />
    </IonButton>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.pulseButton {
  z-index: 1;
  animation: pulse 0.8s ease-in-out infinite; /* Tempo de 1 segundo e animação contínua */
}

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
