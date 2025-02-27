<script setup lang="ts">
import ScheduleService from '@/services/ScheduleService'
import SeriesService from '@/services/SeriesService'
import TeacherService from '@/services/TeacherService'

import { hexToRgb } from '@/utils/hex-to-rgb'

import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonModal } from '@ionic/vue'
import { arrowDown, arrowUp, businessOutline, peopleOutline } from 'ionicons/icons'
import { defineEmits, defineProps, onMounted, ref, watch } from 'vue'

// interface Props {
//   teacherId: string
// }

interface Occupation {
  school?: string
  series?: string[]
}

// const props = defineProps<Props>()

const teacherService = new TeacherService()
const seriesService = new SeriesService()
const scheduleService = new ScheduleService()
// const emits = defineEmits(['update:modelValue'])

const isFilterCollapse = ref(true)
const filteredOcupation = ref<Occupation>({})

const isModalSchool = ref(false)
const isModalSerie = ref(false)
const ocupation = ref<Occupation[]>()
const userid = ref(loadDataTeacher())
const teacherid = ref('')
const schools = ref<string[] | undefined>([])

const colorStyle = ref({
  primary: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-primary').trim(),
  secondary: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-secondary').trim(),
  tertiary: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim(),
})

const setFilterCollapse = (open: boolean) => (isFilterCollapse.value = open)
const setModalSchool = (open: boolean) => (isModalSchool.value = open)
const setModalSerie = (open: boolean) => (isModalSerie.value = open)

function setSchool(school: Occupation): void {
  filteredOcupation.value.school = school.school
  setModalSchool(false)
}

function setSerie(serie: Occupation): void {
  filteredOcupation.value.series = serie.series
  setModalSerie(false)
}

function loadDataTeacher() {
  const storedData = localStorage.getItem('userLocal')

  if (storedData) {
    return JSON.parse(storedData).id
  }
}

async function loadDataSchools() {
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

async function loadDataSeries() {
  try {
    const data = await seriesService.listSeriesAndSchools(schools.value ?? [])

    return data || []
  }
  catch (error) {
    console.error('Erro ao carregar os dados:', error)
  }
}
onMounted(async () => {
  userid.value = loadDataTeacher()
  teacherid.value = await loadDataSchools()
  schools.value = await loadDataSchedule()

  ocupation.value = await loadDataSeries()
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
    <IonItem style="--min-height: 57px;" color="primary" @click="setModalSchool(true)">
      <IonLabel>{{ filteredOcupation.school || 'Selecione uma escola' }}</IonLabel>
      <IonIcon slot="start" :icon="businessOutline" />
    </IonItem>
    <IonItem style="--min-height: 57px;" color="tertiary" @click="setModalSerie(true)">
      <IonLabel>{{ filteredOcupation.series ? filteredOcupation.series.join(', ') : 'Selecione uma série' }}</IonLabel>
      <IonIcon slot="start" :icon="peopleOutline" />
    </IonItem>
  </IonContent>
  <!-- <pre>
      filteredOcupation: {{ filteredOcupation }}
    </pre> -->
  <IonModal :is-open="isModalSchool" :initial-breakpoint="0.6" :breakpoints="[0, 0.6, 0.87]" @ion-modal-did-dismiss="setModalSchool(false)">
    <div class="block">
      <ion-list v-for="(sch, i) in ocupation" :key="i" :value="sch.school">
        <IonItem @click="setSchool(sch)">
          <IonLabel>{{ sch.school }}</IonLabel>
        </IonItem>
      </ion-list>
    </div>
  </IonModal>

  <IonModal :is-open="isModalSerie" :initial-breakpoint="0.6" :breakpoints="[0, 0.6, 0.87]" @ion-modal-did-dismiss="setModalSerie(false)">
    <div class="block">
      <ion-list v-for="(serie, i) in ocupation" :key="i" :value="serie.series ? serie.series[i] : ''">
        <IonItem @click="setSerie(serie)">
          <IonLabel>{{ serie.series ? serie.series[i] : '' }}</IonLabel>
        </IonItem>
      </ion-list>
    </div>
  </IonModal>

  <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: isFilterCollapse ? '0' : '5px' }">
    <ion-text v-show="!isFilterCollapse" color="secondary">
      <div class="ion-margin-horizontal">
        <span style="margin-right: 10px; color: var(--ion-color-accent)">{{ filteredOcupation.school }}</span>
        <small style="color: var(--ion-color-accent)">{{ filteredOcupation.series ? filteredOcupation.series.join(', ') : '' }}</small>
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
</style>
