<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import { date, object, string } from 'yup'
import SchoolService from '../services/SchoolService'
import SeriesService from '../services/SeriesService'
import { hundredYearsAgo } from '@/utils/hundred-years-ago'
import { isValidDDD } from '@/utils/ddd-validator'
import EpInput from '@/components/EpInput.vue'
import EpTextarea from '@/components/EpTextarea.vue'

import type { Tables } from '@/types/database.types'
import showToast from '@/utils/toast-alert'

defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()


const router = useRouter()
const route = useRouter()
const classData = ref< Tables<'classroom'> | []>([])
const schoolId = computed(() => route.currentRoute.value.params.id) as { value: string }
const formSchema = object({
  classroom: string()
    .required('Selecionar escola é obrigatório'),
})

const { values, errors, validate, setFieldValue } = useForm<SchoolPartial>({
  validationSchema: formSchema,
})

const selectedSegment = ref('general-info')
const schoolList = ref<{ id: string, name: string }[]>([])
const schoolService = new SchoolService()
const seriesService = new SeriesService()
const seriesList = ref()
const classesId = computed({
  get: () => values.classroom,
  set: newValue => setFieldValue('classroom', newValue),
})
function handleSchoolChange(event: { detail: { value: string } }) {
  setFieldValue('classroom', event.detail.value)
}

async function loadClassroom() {
  const series = await seriesService.getAll()
  console.log('Chegou', series);

  
  if (series) {
    seriesList.value = series.map(classroom => ({
        id: classroom.id,
        name: classroom.name,
    }))
  }
}


//* * Mask Inputs
const phoneMask = ref(['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/])

async function getSchoolData() {
  if (schoolId.value) {
    const schoolDbData = await schoolService.getById(schoolId.value)
    if (schoolDbData) {
        setFieldValue('school_id', schoolDbData.school_id)
    }
    else {
      console.error(`Dados da escola não encontrados para o ID: ${schoolId.value}`)
    }
  }
}
function applyPhoneMask(phone: string | null): string {
  if (!phone)
    return ''
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

onMounted(async () => {
  await loadClassroom()
  if (schoolId.value) {
    await getSchoolData()
  }
})
</script>

<template>
  <IonSegment v-model="selectedSegment">
    <IonSegmentButton value="general-info">
      <IonLabel style="font-size: calc(1rem - 2px);">
        Informações Gerais
      </IonLabel>
    </IonSegmentButton>
  </IonSegment>
  <div v-show="selectedSegment === 'general-info'">
    <ion-list id="schoolList">
      <ion-item>
        <IonSelect
          v-model="schoolId"
          justify="space-between"
          label="Escola do Professor"
          placeholder="Selecione a escola"
          @ion-change="handleSchoolChange"
        >
          <IonSelectOption v-for="classroom in seriesList" :key="classroom.id" :value="classroom.id">
            {{ classroom.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
  </div>
</template>
