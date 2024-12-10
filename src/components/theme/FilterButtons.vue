<script setup lang="ts">
import ClassroomService from '@/modules/school-management/services/ClassroomService'
import SchoolService from '@/modules/school-management/services/SchoolService'
import SeriesService from '@/modules/school-management/services/SeriesService'
import { IonIcon } from '@ionic/vue'
import { businessOutline, list, peopleOutline } from 'ionicons/icons'
import { computed, defineEmits, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const emits = defineEmits(['update:modelValue'])

const schoolInput = ref('')
const seriesInput = ref('')
const classroomInput = ref('')
const showSchoolResults = ref(false)
const showSeriesResults = ref(false)
const showClassroomResults = ref(false)

// Adicionando a funcionalidade de pesquisa de escolas, séries e turmas
const schoolService = new SchoolService()
const seriesService = new SeriesService()
const classroomService = new ClassroomService()

const schoolList = ref([])
const seriesList = ref([])
const classroomList = ref([])

const filteredSchoolList = computed(() => {
  if (schoolInput.value.length < 3) {
    return []
  }
  return schoolList.value.filter((school: any) =>
    school.name.toLowerCase().includes(schoolInput.value.toLowerCase()),
  )
})

const filteredSeriesList = computed(() => {
  if (seriesInput.value.length < 3) {
    return []
  }
  return seriesList.value.filter((series: any) =>
    series.name.toLowerCase().includes(seriesInput.value.toLowerCase()),
  )
})

const filteredClassroomList = computed(() => {
  if (classroomInput.value.length < 3) {
    return []
  }
  return classroomList.value.filter((classroom: any) =>
    classroom.name.toLowerCase().includes(classroomInput.value.toLowerCase()),
  )
})

async function loadSchools() {
  try {
    const schools = await schoolService.getAll()
    schoolList.value = schools ?? []
  }
  catch (error) {
    console.error('Erro ao carregar as escolas:', error)
  }
}

async function loadSeries() {
  try {
    const series = await seriesService.getAll()
    seriesList.value = series ?? []
  }
  catch (error) {
    console.error('Erro ao carregar as séries:', error)
  }
}

async function loadClassrooms() {
  try {
    const classrooms = await classroomService.getAll()
    classroomList.value = classrooms ?? []
  }
  catch (error) {
    console.error('Erro ao carregar as turmas:', error)
  }
}

onMounted(() => {
  loadSchools()
  loadSeries()
  loadClassrooms()
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function handleClickOutside(event: MouseEvent) {
  const inputWrapper = document.querySelectorAll('.input-wrapper')
  let clickedInside = false

  inputWrapper.forEach((wrapper) => {
    if (wrapper.contains(event.target as Node)) {
      clickedInside = true
    }
  })

  if (!clickedInside) {
    showSchoolResults.value = false
    showSeriesResults.value = false
    showClassroomResults.value = false
  }
}

function selectSchool(schoolName: string) {
  schoolInput.value = schoolName
  showSchoolResults.value = false
}

function selectSeries(seriesName: string) {
  seriesInput.value = seriesName
  showSeriesResults.value = false
}

function selectClassroom(classroomName: string) {
  classroomInput.value = classroomName
  showClassroomResults.value = false
}

watch([schoolInput, seriesInput, classroomInput], ([newSchool, newSeries, newClassroom]) => {
  if (newSchool || newSeries || newClassroom) {
    emits('update:modelValue', { school: newSchool, series: newSeries, classroom: newClassroom })
  }
}, { immediate: true })
</script>

<template>
  <ion-grid class="ion-padding-bottom">
    <ion-row>
      <ion-col size="12" size-lg="6" class="input-col">
        <div class="input-wrapper">
          <ion-searchbar v-model="schoolInput" color="secondary" :search-icon="businessOutline" class="filter-content-input text-input-start school-input" placeholder="Escola" @ion-focus="showSchoolResults = true" />
          <ion-list v-if="showSchoolResults && filteredSchoolList.length > 0" class="results-list school-results">
            <ion-item v-for="school in filteredSchoolList" :key="school.id" @click="selectSchool(school.name)">
              {{ school.name }}
            </ion-item>
          </ion-list>
        </div>
      </ion-col>
      <ion-col size="6" size-lg="3" class="input-col">
        <div class="input-wrapper">
          <ion-searchbar v-model="seriesInput" color="tertiary" :search-icon="list" class="filter-content-input text-input-start series-input" placeholder="Série" @ion-focus="showSeriesResults = true" />
          <ion-list v-if="showSeriesResults && filteredSeriesList.length > 0" class="results-list series-results">
            <ion-item v-for="series in filteredSeriesList" :key="series.id" @click="selectSeries(series.name)">
              {{ series.name }}
            </ion-item>
          </ion-list>
        </div>
      </ion-col>
      <ion-col size="6" size-lg="3" class="input-col">
        <div class="input-wrapper">
          <ion-searchbar v-model="classroomInput" color="primary" :search-icon="peopleOutline" class="filter-content-input text-input-start classroom-input" placeholder="Turma" @ion-focus="showClassroomResults = true" />
          <ion-list v-if="showClassroomResults && filteredClassroomList.length > 0" class="results-list classroom-results">
            <ion-item v-for="classroom in filteredClassroomList" :key="classroom.id" @click="selectClassroom(classroom.name)">
              {{ classroom.name }}
            </ion-item>
          </ion-list>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<style scoped>
.input-col {
  padding: 0; display: flex; height: 44px;
}
.input-icon {
  margin-top: auto; margin-bottom: auto; margin-right: 8px;
}

.text-input-start {
  display: flex ; justify-content: start ;
}

.school-input {
  background-color: var(--ion-color-secondary); width: 100%; height: 100%; border-top-right-radius: 5px; border-top-left-radius: 5px;
}

.series-input {
  background-color: var(--ion-color-tertiary); width: 100%; height: 100%; border-bottom-left-radius: 5px;
}

.classroom-input {
  background-color: var(--ion-color-primary); width: 100%; height: 100%; border-bottom-right-radius: 5px;
}

/* Estilo para o texto dos placeholders */
.school-input::placeholder,
.series-input::placeholder,
.classroom-input::placeholder {
  color: white; /* Cor do texto do placeholder */
  opacity: 1;   /* Garante que o placeholder seja visível */
}

/* Estilo para o texto digitado */
.school-input,
.series-input,
.classroom-input {
  color: white; /* Cor do texto digitado */
}

/* Wrapper para o input e a lista de resultados */
.input-wrapper {
  position: relative;
  width: 100%;;
}

/* Estilo para a lista de resultados */
.results-list {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.school-results {
  background-color: var(--ion-color-secondary);
}

.series-results {
  background-color: var(--ion-color-tertiary);
}

.classroom-results {
  background-color: var(--ion-color-primary);
}

ion-item {
  --background: transparent;
  color: white;
}

/* Estilo para o ion-searchbar */
ion-searchbar.school-input {
  --background: var(--ion-color-secondary);
  --color: white;
}
</style>
