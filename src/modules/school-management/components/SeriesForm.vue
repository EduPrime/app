<script setup lang="ts">
import EpInput from '@/components/EpInput.vue'
import EpTextarea from '@/components/EpTextarea.vue'
import { isValidDDD } from '@/utils/ddd-validator'
import { hundredYearsAgo } from '@/utils/hundred-years-ago'
import showToast from '@/utils/toast-alert'
import { toastController } from '@ionic/core'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as yup from 'yup'
import type { Tables } from '@/types/database.types'
import InstitutionService from '../../institution/services/InstitutionService'
import SchoolService from '../../institution/services/SchoolService'
import SeriesService from '../../institution/services/SeriesService'
import CourseService from '../services/CourseService'

defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()

defineExpose({
  registerSeries,
})

const selectedSegment = ref('general-info')
const router = useRouter()
const route = useRouter()
const seriesData = ref< Tables<'series'> | []>([])
const seriesId = computed(() => route.currentRoute.value.params.id) as { value: string }
const schoolService = new SchoolService()
const seriesService = new SeriesService()
const courseService = new CourseService()
const institutionService = new InstitutionService()
const institutionId = ref('')
const school_Id = ref('')
const course_Id = ref('')
const timetable_Id = ref('')
const formSchema = yup.object ({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(12, 'O nome deve ter pelo menos 12 caracteres'),
})

const { values, errors, validate, setFieldValue } = useForm<SeriesPartial>({
  validationSchema: formSchema,
})

async function registerSeries() {
  const validationResult = await validate()

  if (!validationResult.valid) {
    const displayErrors = Object.values(errors.value).join(', ')
    showToast(displayErrors, 'top', 'warning')
  }
  else {
    const formData = {
      school_id: school_Id.value,
      course_id: course_Id.value,
      name: values.name,
    }
    console.log('FormData:', formData);
    try {
      let result
      if (seriesId.value) {
        result = await seriesService.update(seriesId.value, formData)
        if (result) {
          showToast('Escola atualizada com sucesso')
          setTimeout(() => {
            router.push('/Series/list').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
      else {
        result = await seriesService.create(formData)
        if (result) {
          showToast('Escola cadastrada com sucesso!', 'top', 'success')
          setTimeout(() => {
            router.push('/Series/list').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
    }
    catch (error) {
      console.error('Erro ao salvar escola:', error)
      showToast('Erro ao cadastrar escola. Tente novamente.', 'top', 'danger')
    }
  }
}

async function getSeriesData() {
  if (seriesId.value) {
    const seriesDbData = await seriesService.getById(seriesId.value)
    if (seriesDbData) {
      setFieldValue('school_Id', seriesDbData.school_Id),
      setFieldValue('course_Id', seriesDbData.course_Id),
      setFieldValue('name', seriesDbData.name)
    }
    else {
      console.error(`Dados da escola não encontrados para o ID: ${seriesId.value}`)
    }
  }
}

//* * Mask Inputs
const managerMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/, /\d/])
const stateMask = ref([/\w/, /\w/])
const abbreviationMask = ref([/\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/])
const postalCodeMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/])
const phoneMask = ref(['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/])
const areaMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/])

onMounted(async () => {
  school_Id.value = (await schoolService.getAll())?.at(0)?.id
  course_Id.value = (await courseService.getAll())?.at(0)?.id
  if (seriesId.value) {
    await getSeriesData()
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
    <IonSegmentButton value="location">
      <IonLabel style="font-size: calc(1rem - 2px);">
        Localização
      </IonLabel>
    </IonSegmentButton>
  </IonSegment>

  <div v-show="selectedSegment === 'general-info'">
    <EpInput v-model="values.name" name="name" label="Nome*" placeholder="Digite o nome da escola" />
  </div>
</template>
