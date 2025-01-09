<script setup lang="ts">
import type { Course } from '@prisma/client'
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
const courseData = ref<Course>()
const courseId = computed(() => route.currentRoute.value.params.id) as { value: string }
const schoolService = new SchoolService()
const seriesService = new SeriesService()
const courseService = new CourseService()
const institutionService = new InstitutionService()
const teachingType = ['Complementar', 'Padrão']
const regimeType = ['Presencial', 'EAD', 'Semi-Presencial']
const courseModality = ['Ensino Regular', 'EJA', 'Educação Profissional', 'Educação Especial']
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
  courseStage: yup
    .number()
    .transform((value, originalValue) => {
    // Verifica se o originalValue é uma string e tenta convertê-la em número
      if (typeof originalValue === 'string') {
        const trimmedValue = originalValue.trim()
        // Se a string não é vazia e pode ser convertida em um número, retorna o número
        const parsedValue = Number(trimmedValue)
        return Number.isNaN(parsedValue) ? null : parsedValue // Se não for um número, retorna null
      }
      // Se não for uma string (como undefined, null, number), apenas retorna o valor original
      return originalValue
    })
    .required('Etapa Curso é obrigatória')
    .positive('A etapa curso deve ser um número positivo')
    .integer('A etapa curso deve ser um número inteiro'),
  teachingType: yup
    .string()
    .required('Tipo de Ensino é obrigatório'),
  regimeType: yup
    .string(),
  courseModality: yup
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
        return Number.isNaN(parsedValue) ? null : parsedValue // Se não for um número, retorna null
      }
      // Se não for uma string (como undefined, null, number), apenas retorna o valor original
      return originalValue
    })
    .required('Carga Horária é obrigatória')
    .positive('A carga horária deve ser um número positivo')
    .integer('A carga horária deve ser um número inteiro')
    .min(1, 'A carga horária deve ser pelo menos 1 hora'),
})

const { values, errors, validate, setFieldValue } = useForm<Course>({
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
      id: courseId.value,            
      name: values.name,
      schoolId: schoolId.value,
      status: values.status,
      metadata: values.metadata,
      createdAt: values.createdAt,
      deletedAt: values.deletedAt,
      updatedAt: values.updatedAt,
      userCreated: values.userCreated,
      updatedBy: values.updatedBy,
      tenantId: values.tenantId,      
      institutionId: institutionId.value,
      courseStage: values.courseStage,
      graduate: values.graduate,
      workload: values.workload,
      teachingType: values.teachingType,
      regimeType: values.regimeType,
      courseModality: values.courseModality,
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
    const mapData = (data: any[], targetList: any) => {
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

    if (institutions) {
      mapData(institutions, institutionList)
    }
    if (series) {
      mapData(series, seriesList)
    }
    if (courses) {
      mapData(courses, courseList)
    }
  }
  catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
}
async function getCourseData() {
  if (courseId.value) {
    const courseDbData = await courseService.getById(courseId.value)
    if (courseDbData) {
      institutionId.value = courseDbData.institutionId ?? ''
      /*  courseId.value = courseDbData.course_id */
      setFieldValue('institutionId', courseDbData.institutionId)
      setFieldValue('schoolId', courseDbData.schoolId)
      /* setFieldValue('courseId', courseDbData.courseId) */
      // setFieldValue('institution', courseDbData.institutionId)
      /*       setFieldValue('course', courseDbData.course_id) */
      setFieldValue('name', courseDbData.name)
      setFieldValue('courseStage', courseDbData.courseStage)
      /* setFieldValue('graduate', courseDbData.graduate) */
      setFieldValue('workload', courseDbData.workload)
      setFieldValue('teachingType', courseDbData.teachingType)
      setFieldValue('regimeType', courseDbData.regimeType)
      setFieldValue('courseModality', courseDbData.courseModality)
    }
    else {
      console.error(`Dados da série não encontrados para o ID: ${courseId.value}`)
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
/*   schoolId.value = (await schoolService.getAll())?.at(0)?.id */
  await loadInstitution()
  await loadCourse()
  if (courseId.value) {
    await getCourseData()
    if (institutionId.value)
      setFieldValue('institutionId', institutionId.value)
    if (courseId.value)
      setFieldValue('id', courseId.value)
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
      <IonSelect
        v-model="institutionId"
        :disabled="true"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
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
    </ion-list>

    <EpInput v-model="values.name" name="name" label="Nome*" placeholder="Digite o nome do curso" />

    <ion-list id="teachingType">
      <IonSelect
        v-model="values.teachingType"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
        justify="space-between"
        label="Tipo de Ensino*"
        placeholder="Selecione"
        @ion-change="(e) => setFieldValue('teachingType', e.target.value)"
      >
        <IonSelectOption v-for="teachingType in teachingType" :key="teachingType" :value="teachingType">
          {{ teachingType }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>

    <ion-list id="regimeType">
      <IonSelect
        v-model="values.regimeType"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
        justify="space-between"
        label="Tipo de Regime"
        placeholder="Selecione"
        @ion-change="(e) => setFieldValue('regimeType', e.target.value)"
      >
        <IonSelectOption v-for="regimeType in regimeType" :key="regimeType" :value="regimeType">
          {{ regimeType }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>

    <EpInput v-model="values.courseStage" name="courseStage" label="Etapa Curso*" placeholder="Digite a etapa do curso" />

    <EpInput v-model="values.workload" name="workload" label="Carga Horária*" placeholder="Digite a carga horária" />

    <ion-list id="courseModality">
      <IonSelect
        v-model="values.courseModality"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
        justify="space-between"
        label="Modalidade do Curso*"
        placeholder="Selecione"
        @ion-change="(e) => setFieldValue('courseModality', e.target.value)"
      >
        <IonSelectOption v-for="courseModality in courseModality" :key="courseModality" :value="courseModality">
          {{ courseModality }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>
  </div>
</template>
