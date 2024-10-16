<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import EpInput from '@/components/EpInput.vue'
import showToast from '@/utils/toast-alert'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import InstitutionService from '../../institution/services/InstitutionService'
import SchoolService from '../../institution/services/SchoolService'
import SeriesService from '../../institution/services/SeriesService'
import CourseService from '../services/CourseService'

defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()

defineExpose({
  registerCourse,
})

const selectedSegment = ref('general-info')
const router = useRouter()
const route = useRouter()
const courseData = ref< Tables<'course'> | []>([])
const courseId = computed(() => route.currentRoute.value.params.id) as { value: string }
const schoolService = new SchoolService()
const seriesService = new SeriesService()
const courseService = new CourseService()
const institutionService = new InstitutionService()
const teaching_type = ['Complementar', 'Padrão']
const regime_type = ['Presencial', 'EAD', 'Semi-Presencial']
const course_modality = ['Ensino Regular', 'EJA', 'Educação Profissional', 'Educação Especial']
const institutionId = ref('')
const schoolId = ref('')
const institutionList = ref()
const seriesList = ref()
const serieId = ref('')
const courseList = ref()
const timetable_Id = ref('')
const formSchema = yup.object ({
  name: yup
    .string()
    .required('Nome é obrigatório'),
  institutionId: yup.string()
    .required('Instituição é obrigatória'),
  course_stage: yup
    .number()
    .transform((value, originalValue) => {
    // Verifica se o originalValue é uma string e tenta convertê-la em número
      if (typeof originalValue === 'string') {
        const trimmedValue = originalValue.trim()
        // Se a string não é vazia e pode ser convertida em um número, retorna o número
        const parsedValue = Number(trimmedValue)
        return isNaN(parsedValue) ? null : parsedValue // Se não for um número, retorna null
      }
      // Se não for uma string (como undefined, null, number), apenas retorna o valor original
      return originalValue
    })
    .required('Etapa Curso é obrigatória')
    .positive('A etapa curso deve ser um número positivo')
    .integer('A etapa curso deve ser um número inteiro'),
  teaching_type: yup
    .string()
    .required('Tipo de Ensino é obrigatório'),
  regime_type: yup
    .string(),
  course_modality: yup
    .string()
    .required('Modalidade de Curso é obrigatório'),
  workload: yup
    .number()
    .transform((value, originalValue) => {
    // Verifica se o originalValue é uma string e tenta convertê-la em número
      if (typeof originalValue === 'string') {
        const trimmedValue = originalValue.trim()
        // Se a string não é vazia e pode ser convertida em um número, retorna o número
        const parsedValue = Number(trimmedValue)
        return isNaN(parsedValue) ? null : parsedValue // Se não for um número, retorna null
      }
      // Se não for uma string (como undefined, null, number), apenas retorna o valor original
      return originalValue
    })
    .required('Carga Horária é obrigatória')
    .positive('A carga horária deve ser um número positivo')
    .integer('A carga horária deve ser um número inteiro')
    .min(1, 'A carga horária deve ser pelo menos 1 hora'),
})

const { values, errors, validate, setFieldValue } = useForm<any>({
  validationSchema: formSchema,
})

async function registerCourse() {
  const validationResult = await validate()

  if (!validationResult.valid) {
    const displayErrors = Object.values(errors.value).join(', ')
    showToast(displayErrors, 'top', 'warning')
  }
  else {
    const formData = {
      course_id: courseId.value,
      institution_id: institutionId.value,
      course_stage: values.course_stage,
      graduate: values.graduate,
      name: values.name,
      workload: values.workload,
      teaching_type: values.teaching_type,
      regime_type: values.regime_type,
      course_modality: values.course_modality,
    }
    console.log('FormData:', formData)
    try {
      let result
      if (courseId.value) {
        result = await courseService.update(courseId.value, formData)
        if (result) {
          showToast('Curso atualizado com sucesso')
          setTimeout(() => {
            router.push('/Course/list').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
      else {
        result = await courseService.create(formData)
        if (result) {
          showToast('Curso cadastrado com sucesso!', 'top', 'success')
          setTimeout(() => {
            router.push('/Course/list').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
    }
    catch (error) {
      console.error('Erro ao salvar série:', error)
      showToast('Erro ao cadastrar série. Tente novamente.', 'top', 'danger')
    }
  }
}

async function loadCourse() {
  try {
    const [institutions, series, courses] = await Promise.all([
      institutionService.getAll(),
      seriesService.getAll(),
      courseService.getAll(),
    ])

    console.log('Chegou', institutions, series, courses)

    // Função auxiliar para mapear os dados
    const mapData = (data, targetList) => {
      if (data) {
        targetList.value = data.map(item => ({
          id: item.id,
          name: item.name,
          course_stage: item.course_stage,
          graduate: item.graduate,
          workload: item.workload,
        }))
      }
    }

    mapData(institutions, institutionList)
    mapData(series, seriesList)
    mapData(courses, courseList)
  }
  catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
}
async function getCourseData() {
  if (courseId.value) {
    const courseDbData = await courseService.getById(courseId.value)
    if (courseDbData) {
      institutionId.value = courseDbData.institution_id
      courseId.value = courseDbData.course_id
      setFieldValue('institutionId', courseDbData.institutionId)
      setFieldValue('schoolId', courseDbData.schoolId)
      setFieldValue('courseId', courseDbData.courseId)
      setFieldValue('institution', courseDbData.institution_id)
      setFieldValue('course', courseDbData.course_id)
      setFieldValue('name', courseDbData.name)
      setFieldValue('course_stage', courseDbData.course_stage)
      setFieldValue('graduate', courseDbData.graduate)
      setFieldValue('workload', courseDbData.workload)
      setFieldValue('teaching_type', courseDbData.teaching_type)
      setFieldValue('regime_type', courseDbData.regime_type)
      setFieldValue('course_modality', courseDbData.course_modality)
    }
    else {
      console.error(`Dados da série não encontrados para o ID: ${courseId.value}`)
    }
  }
}

onMounted(async () => {
  schoolId.value = (await schoolService.getAll())?.at(0)?.id
  await loadCourse()
  if (courseId.value) {
    await getCourseData()
    if (institutionId.value)
      setFieldValue('institutionId', institutionId.value)
    if (courseId.value)
      setFieldValue('courseId', courseId.value)
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
    <ion-list id="institutionList">
      <ion-item>
        <IonSelect
          v-model="institutionId"
          justify="space-between"
          label="Instituição*"
          placeholder="Selecione a instituição"
          @ion-change="(e) => {
            setFieldValue('institutionId', e.detail.value)
          }"
        >
          <IonSelectOption v-for="institution in institutionList" :key="institution.id" :value="institution.id">
            {{ institution.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <EpInput v-model="values.name" name="name" label="Nome*" placeholder="Digite o nome do curso" />

    <ion-list id="teaching_type">
      <ion-item>
        <IonSelect
          v-model="values.teaching_type"
          justify="space-between"
          label="Tipo de Ensino*"
          placeholder="Selecione"
          @ion-change="(e) => setFieldValue('teaching_type', e.target.value)"
        >
          <IonSelectOption v-for="teaching_type in teaching_type" :key="teaching_type" :value="teaching_type">
            {{ teaching_type }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <ion-list id="regime_type">
      <ion-item>
        <IonSelect
          v-model="values.regime_type"
          justify="space-between"
          label="Tipo de Regime"
          placeholder="Selecione"
          @ion-change="(e) => setFieldValue('regime_type', e.target.value)"
        >
          <IonSelectOption v-for="regime_type in regime_type" :key="regime_type" :value="regime_type">
            {{ regime_type }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <EpInput v-model="values.course_stage" name="course_stage" label="Etapa Curso*" placeholder="Digite a etapa do curso" />

    <EpInput v-model="values.workload" name="workload" label="Carga Horária*" placeholder="Digite a carga horária" />

    <ion-list id="course_modality">
      <ion-item>
        <IonSelect
          v-model="values.course_modality"
          justify="space-between"
          label="Modalidade do Curso*"
          placeholder="Selecione"
          @ion-change="(e) => setFieldValue('course_modality', e.target.value)"
        >
          <IonSelectOption v-for="course_modality in course_modality" :key="course_modality" :value="course_modality">
            {{ course_modality }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
  </div>
</template>
