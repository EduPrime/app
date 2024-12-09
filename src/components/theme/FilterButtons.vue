<script setup lang="ts">
import SchoolService from '@/modules/school-management/services/SchoolService'
import { IonIcon } from '@ionic/vue'
import { businessOutline, list, peopleOutline, searchCircle } from 'ionicons/icons'
import { computed, defineEmits, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const emits = defineEmits(['update:modelValue'])

const schoolInput = ref('')
const seriesInput = ref('')
const shiftInput = ref('')
const showResults = ref(false)

// Adicionando a funcionalidade de pesquisa de escolas
const schoolService = new SchoolService()
const schoolList = ref([])

const filteredSchoolList = computed(() => {
  if (schoolInput.value.length < 3) {
    return []
  }

  return schoolList.value.filter((school: any) =>
    school.name.toLowerCase().includes(schoolInput.value.toLowerCase()),
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

onMounted(() => {
  loadSchools()
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function handleClickOutside(event: MouseEvent) {
  const inputWrapper = document.querySelector('.input-wrapper')
  if (inputWrapper && !inputWrapper.contains(event.target as Node)) {
    showResults.value = false
  }
}

function selectSchool(schoolName: string) {
  schoolInput.value = schoolName
  showResults.value = false
}

watch([schoolInput, seriesInput, shiftInput], ([newSchool, newSeries, newShift]) => {
  if (newSchool || newSeries || newShift) {
    emits('update:modelValue', { school: newSchool, series: newSeries, shift: newShift })
  }
}, { immediate: true })
</script>

<template>
  <ion-grid class="ion-padding-bottom">
    <ion-row>
      <ion-col size="12" size-lg="6" class="input-col">
        <div class="input-wrapper">
          <ion-searchbar v-model="schoolInput" color="secondary" :search-icon="businessOutline" class="filter-content-input text-input-start school-input" placeholder="Escola" @ion-focus="showResults = true" />
          <ion-list v-if="showResults && filteredSchoolList.length" class="results-list">
            <ion-item v-for="school in filteredSchoolList" :key="school.id" @click="selectSchool(school.name)">
              {{ school.name }}
            </ion-item>
          </ion-list>
        </div>
      </ion-col>
      <ion-col size="6" size-lg="3" class="input-col">
        <ion-input v-model="seriesInput" class="ion-padding-horizontal filter-content-input text-input-start series-input" placeholder="Série">
          <IonIcon slot="start" color="lightaccent" class="input-icon" :ios="list" :md="list" />
        </ion-input>
      </ion-col>
      <ion-col size="6" size-lg="3" class="input-col">
        <ion-input v-model="shiftInput" class="ion-padding-horizontal filter-content-input text-input-start shift-input" placeholder="Turma">
          <IonIcon slot="start" color="lightaccent" class="input-icon" :ios="peopleOutline" :md="peopleOutline" />
        </ion-input>
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

.shift-input {
  background-color: var(--ion-color-primary); width: 100%; height: 100%; border-bottom-right-radius: 5px;
}

/* Estilo para o texto dos placeholders */
.school-input::placeholder,
.series-input::placeholder,
.shift-input::placeholder {
  color: white; /* Cor do texto do placeholder */
  opacity: 1;   /* Garante que o placeholder seja visível */
}

/* Estilo para o texto digitado */
.school-input,
.series-input,
.shift-input {
  color: white; /* Cor do texto digitado */
}

/* Wrapper para o input e a lista de resultados */
.input-wrapper {
  position: relative;
  width: 100%;
}

/* Estilo para a lista de resultados */
.results-list {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  background-color: var(--ion-color-secondary);
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

ion-item {
  --background: var(--ion-color-secondary);
  color: white;
}

/* Estilo para o ion-searchbar */
ion-searchbar.school-input {
  --background: var(--ion-color-secondary);
  --color: white;
}
</style>
