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
import { Decimal } from '@prisma/client/runtime/library'

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
const seriesId = computed(() => route.currentRoute.value.params.id) as { value: string }
const schoolService = new SchoolService()
const seriesService = new SeriesService()
const courseService = new CourseService()
const institutionService = new InstitutionService()
const course_stage = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4', 'Etapa 5', 'Etapa 6']
const graduate = ['Sim', 'Não']
const institutionId = ref()
const schoolId = ref()
const institutionList = ref()
const seriesList = ref()
const courseList = ref()
const courseId = ref()
const formSchema = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório'),
  institutionId: yup.string()
    .required('Instituição é obrigatória'),
  courseId: yup.string()
    .required('Curso é obrigatório'),
  courseStage: yup
    .string()
    .required('Etapa Curso é obrigatório'),
  graduate: yup
    .string()
    .required('Concluinte é obrigatório'),
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
  schoolDays: yup
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
    .required('Dias Letivos é obrigatório')
    .positive('Os dias letivos devem ser um número positivo')
    .integer('Os dias letivos devem ser um número inteiro')
    .min(1, 'Os dias letivos devem ser pelo menos 1 dia'),
})

interface SeriesForm {
  name: string
  institutionId: string | null
  courseId: string
  courseStage: string
  graduate: string
  workload: Decimal | null
  schoolDays: string
  schoolId: string | null
}

const { values, errors, validate, setFieldValue } = useForm<SeriesForm>({
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
      id: seriesId.value,
      schoolId: schoolId.value,
      courseId: courseId.value,
      institutionId: institutionId.value,
      courseStage: values.courseStage,
      graduate: values.graduate,
      name: values.name,
      workload: values.workload,
      schoolDays: values.schoolDays,
      timetableId: null,
      metadata: null,
      createdAt: null,
      updatedAt: null,
      deletedAt: null,
      updatedBy: null,
      userCreated: null,
      tenantId: null,
    }
    console.log('FormData:', formData)
    try {
      let result
      if (seriesId.value) {
        result = await seriesService.update(seriesId.value, formData)
        if (result) {
          showToast('Série atualizada com sucesso')
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
          showToast('Série cadastrada com sucesso!', 'top', 'success')
          setTimeout(() => {
            router.push('/Series/list').then(() => {
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

async function loadSeries() {
  try {
    const [institutions, series, courses] = await Promise.all([
      institutionService.getAll(),
      seriesService.getAll(),
      courseService.getAll(),
    ])

    console.log('Chegou', institutions, series, courses)

    // Função auxiliar para mapear os dados
    const mapData = (data: any, targetList: any) => {
      if (data) {
        targetList.value = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          courseStage: item.courseStage,
          graduate: item.graduate,
          workload: item.workload,
          schoolDays: item.schoolDays,
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
async function getSeriesData() {
  if (seriesId.value) {
    const seriesDbData = await seriesService.getById(seriesId.value)
    if (seriesDbData) {
      institutionId.value = seriesDbData.institutionId
      courseId.value = seriesDbData.courseId
      schoolId.value = seriesDbData.schoolId
      setFieldValue('institutionId', seriesDbData.institutionId)
      setFieldValue('schoolId', seriesDbData.schoolId)
      setFieldValue('courseId', seriesDbData.courseId)
      setFieldValue('name', seriesDbData.name)
      setFieldValue('courseStage', seriesDbData.courseStage)
      setFieldValue('graduate', seriesDbData.graduate)
      setFieldValue('workload', seriesDbData.workload)
      setFieldValue('schoolDays', seriesDbData.schoolDays)
    }
    else {
      console.error(`Dados da série não encontrados para o ID: ${seriesId.value}`)
    }
  }
}

async function loadInstitution() {
  try {
    const institutions = await institutionService.getAll()

    if (institutions && institutions.length === 1) {
      institutionId.value = institutions[0].id
    }

    if (institutions) {
      institutionList.value = institutions.map((institution: any) => ({
        id: institution.id,
        name: institution.name,
      }))
    }
  }
  catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
}

onMounted(async () => {
  schoolId.value = (await schoolService.getAll())?.at(0)?.id
  await loadSeries()
  await loadInstitution()
  if (seriesId.value) {
    await getSeriesData()
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
      <IonSelect v-model="institutionId" :disabled="true" fill="outline" cancel-text="Cancelar"
        label-placement="floating" justify="space-between" label="Instituição*" placeholder="Selecione" @ion-change="(e) => {
          setFieldValue('institutionId', e.detail.value)
        }">
        <IonSelectOption v-for="institution in institutionList" :key="institution.id" :value="institution.id">
          {{ institution.name }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>

    <ion-list id="courseList">
      <IonSelect v-model="courseId" fill="outline" cancel-text="Cancelar" label-placement="floating"
        justify="space-between" label="Curso*" placeholder="Selecione" @ion-change="(e) => {
          setFieldValue('courseId', e.detail.value)
        }">
        <IonSelectOption v-for="course in courseList" :key="course.id" :value="course.id">
          {{ course.name }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>

    <EpInput v-model="values.name" name="name" label="Nome*" placeholder="Digite o nome da série" />

    <ion-list id="course_stage">
      <IonSelect v-model="values.courseStage" fill="outline" cancel-text="Cancelar" label-placement="floating"
        justify="space-between" label="Etapa Curso*" placeholder="Selecione"
        @ion-change="(e) => setFieldValue('courseStage', e.target.value)">
        <IonSelectOption v-for="stage in course_stage" :key="stage" :value="stage">
          {{ stage }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>

    <ion-list id="graduate">
      <IonSelect v-model="values.graduate" fill="outline" cancel-text="Cancelar" label-placement="floating"
        justify="space-between" label="Concluinte*" placeholder="Selecione"
        @ion-change="(e) => setFieldValue('graduate', e.target.value)">
        <IonSelectOption v-for="graduate in graduate" :key="graduate" :value="graduate">
          {{ graduate }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>

    <EpInput v-model="values.workload" name="workload" label="Carga Horária*" placeholder="Digite a carga horária" />
    <EpInput v-model="values.schoolDays" name="schoolDays" label="Dias Letivos*" placeholder="Digite os dias letivos" />
  </div>
</template>
