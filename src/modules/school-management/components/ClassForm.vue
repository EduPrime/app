<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import EpInput from '@/components/EpInput.vue'
import TeacherService from '@/modules/school-teacher-management/services/TeacherService'
import showToast from '@/utils/toast-alert'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import ClassroomService from '../services/ClassroomService'
import Course_series_disciplineService from '../services/Course_series_disciplineService'
import CourseService from '../services/CourseService'
import InstitutionService from '../services/InstitutionService'
import School_courseService from '../services/School_courseService'
import SchoolService from '../services/SchoolService'
import SeriesService from '../services/SeriesService'

defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()

defineExpose({
  registerClass,
})

const router = useRouter()
const route = useRouter()
const seriesId = ref('')
const schoolId = ref('')
const institutionId = ref('')
const courseId = ref('')
const teacherId = ref('')
const school = ref('')
const classData = ref< Tables<'classroom'> | []>([])
const selectedSegment = ref('general-info')
const classList = ref<{ id: string, name: string }[]>([])
const period = ['Manhã', 'Tarde', 'Noite']
const status = ['Ativo', 'Inativo', 'Graduado', 'Suspenso', 'Transferido']
const day_of_week = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
const classroomService = new ClassroomService()
const schoolService = new SchoolService()
const seriesService = new SeriesService()
const institutionService = new InstitutionService()
const teacherService = new TeacherService()
const courseService = new CourseService()
const school_courseService = new School_courseService()
const series_course_disciplineService = new Course_series_disciplineService()
const seriesList = ref()
const classroomList = ref()
const institutionList = ref()
const schoolList = ref()
const teacherList = ref()
const courseList = ref()
const classId = computed(() => route.currentRoute.value.params.id) as { value: string }
const formSchema = yup.object({
  name: yup.string()
    .required('Nome da turma é obrigatório'),
  schoolId: yup.string()
    .required('Escola é obrigatória'),
  courseId: yup.string()
    .required('Curso é obrigatório'),
  seriesId: yup.string()
    .required('Série é obrigatória'),
  teacherId: yup.string()
    .required('Professor é obrigatório'),
  status: yup.string()
    .required('Tipo de Turma é obrigatório'),
  year: yup
    .number()
    .transform((value, originalValue) => {
    // Verifica se o valor original é uma string antes de usar trim
      if (typeof originalValue === 'string') {
        return originalValue.trim() === '' ? null : value
      }
      // Se não for uma string (como undefined, null, number), apenas retorna o valor original
      return originalValue
    })
    .required('Ano é obrigatório')
    .integer('O ano deve ser um número inteiro')
    .min(1900, 'O ano deve ser maior ou igual a 1900')
    .max(new Date().getFullYear(), 'O ano não pode ser maior que o ano atual'),
  abbreviation: yup.string()
    .optional()
    .nullable(),
  maxStudents: yup
    .number()
    .transform((value, originalValue) => {
    // Verifica se o valor original é uma string antes de usar trim
      if (typeof originalValue === 'string') {
        return originalValue.trim() === '' ? null : value
      }
      // Se não for uma string (como undefined, null, number), apenas retorna o valor original
      return originalValue
    })
    .required('Máximo de alunos é obrigatório')
    .positive('O número máximo de alunos deve ser positivo')
    .integer('O número máximo de alunos deve ser um número inteiro'),
  startTime: yup.string()
    .nullable(),
  startTimeInterval: yup.string()
    .nullable(),
  endTimeInterval: yup.string()
    .nullable(),
  endTime: yup.string()
    .nullable(),

})

const { values, errors, validate, setFieldValue } = useForm<any>({
  validationSchema: formSchema,
})

async function registerClass() {
  const validationResult = await validate()

  if (!validationResult.valid) {
    const displayErrors = Object.values(errors.value).join(', ')
    showToast(displayErrors, 'top', 'warning')
  }
  else {
    const formData = {
      name: values.name,
      institution_id: institutionId.value,
      school_id: schoolId.value,
      course_id: courseId.value,
      series_id: seriesId.value,
      teacher_id: teacherId.value,
      abbreviation: values.abbreviation,
      year: values.year,
      status: values.status,
      maxStudents: values.maxStudents,
      startTime: values.startTime,
      startTimeInterval: values.startTimeInterval,
      endTimeInterval: values.endTimeInterval,
      endTime: values.endTime,
      day_of_week: values.day_of_week,
      period: values.period,

    }
    try {
      let result
      if (classId.value) {
        result = await classroomService.update(classId.value, formData)
        if (result) {
          showToast('Escola atualizada com sucesso')
          setTimeout(() => {
            router.push('/Class/list').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
      else {
        result = await classroomService.create(formData)
        if (result) {
          showToast('Escola cadastrada com sucesso!', 'top', 'success')
          setTimeout(() => {
            router.push('/Class/list').then(() => {
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

async function loadClassroom() {
  try {
    const [institutions, schools, courses, teachers, series, classrooms] = await Promise.all([
      institutionService.getAll(),
      schoolService.getAll(),
      courseService.getAll(),
      teacherService.getAll(),
      seriesService.getAll(),
      classroomService.getAll(),
    ])

    console.log('Chegou', institutions)

    // Função auxiliar para mapear os dados
    const mapData = (data: any, targetList: { value: any[] }) => {
      if (data) {
        targetList.value = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          period: item.period,
          status: item.status,
          day_of_week: item.day_of_week,
        }))
      }
    }

    mapData(institutions, institutionList)
    mapData(schools, schoolList)
    mapData(courses, courseList)
    mapData(teachers, teacherList)
    mapData(series, seriesList)
    mapData(classrooms, classroomList)
  }
  catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
}

async function getClassData() {
  if (classId.value) {
    const classDbData = await classroomService.getById(classId.value)
    if (classDbData) {
      institutionId.value = classDbData.institution_id
      schoolId.value = classDbData.school_id
      courseId.value = classDbData.course_id
      seriesId.value = classDbData.series_id
      teacherId.value = classDbData.teacher_id
      setFieldValue('name', classDbData.name)
      setFieldValue('institutionId', classDbData.institution_id)
      setFieldValue('institution', classDbData.institution_id)
      setFieldValue('course', classDbData.course_id)
      setFieldValue('school_id', classDbData.school_id)
      setFieldValue('series_id', classDbData.series_id)
      setFieldValue('teacher', classDbData.teacher_id)
      setFieldValue('schoolId', classDbData.school_id)
      setFieldValue('courseId', classDbData.course_id)
      setFieldValue('seriesId', classDbData.series_id)
      setFieldValue('teacherId', classDbData.teacher_id)
      setFieldValue('abbreviation', classDbData.abbreviation)
      setFieldValue('year', classDbData.year)
      setFieldValue('status', classDbData.status)
      setFieldValue('maxStudents', classDbData.maxStudents)
      setFieldValue('startTime', classDbData.startTime)
      setFieldValue('startTimeInterval', classDbData.startTimeInterval)
      setFieldValue('endTimeInterval', classDbData.endTimeInterval)
      setFieldValue('endTime', classDbData.endTime)
      setFieldValue('day_of_week', classDbData.day_of_week)
      setFieldValue('period', classDbData.period)
    }
    else {
      console.error(`Dados da escola não encontrados para o ID: ${classId.value}`)
    }
  }
}

async function loadSchools() {
  const schools = await schoolService.getAll()
  schoolList.value = schools.map((school: any) => ({
    id: school.id,
    name: school.name,
  }))
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

async function loadCoursesBySchool(schoolId: string) {
  const courses = await school_courseService.getCoursesBySchool(schoolId)
  courseList.value = courses.map((course: any) => ({
    id: course.id,
    name: course.name,
  }))
}

watch(schoolId, async (newSchoolId) => {
  if (newSchoolId) {
    await loadCoursesBySchool(newSchoolId)
  }
})

async function loadSeriesByCourse(courseId: string) {
  const series = await series_course_disciplineService.getSeriesByCourse(courseId)
  seriesList.value = series.map((serie: any) => ({
    id: serie.id,
    name: serie.name,
  }))
}

watch(courseId, async (newCourseId) => {
  if (newCourseId) {
    await loadSeriesByCourse(newCourseId)
  }
})

onMounted(async () => {
  await loadInstitution()
  await loadSchools()
  await loadClassroom()
  if (classId.value) {
    await getClassData()
    if (institutionId.value)
      setFieldValue('institutionId', institutionId.value)
    if (schoolId.value)
      setFieldValue('schoolId', schoolId.value)
    if (courseId.value)
      setFieldValue('courseId', courseId.value)
    if (seriesId.value)
      setFieldValue('seriesId', seriesId.value)
    if (teacherId.value)
      setFieldValue('teacherId', teacherId.value)
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
    <IonSegmentButton value="class-info">
      <IonLabel style="font-size: calc(1rem - 2px);">
        Informações da turma
      </IonLabel>
    </IonSegmentButton>
  </IonSegment>
  <div v-show="selectedSegment === 'general-info'">
    <EpInput v-model="values.name" name="name" label="Nome da Turma*" placeholder="Digite o nome da turma" />
    <EpInput v-model="values.abbreviation" name="abbreviation" label="Abreviação" placeholder="Digite a abreviação" />
    <EpInput v-model="values.year" name="year" label="Ano*" type="number" placeholder="Digite o ano" />
    <ion-list id="periodList">
      <IonSelect
        v-model="values.status"
        cancel-text="Cancelar"
        fill="outline"
        label-placement="floating"
        justify="space-between"
        label="Tipo de Turma*"
        placeholder="Selecione o tipo de turma"
        @ion-change="(e) => setFieldValue('status', e.target.value)"
      >
        <IonSelectOption v-for="status in status" :key="status" :value="status">
          {{ status }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>
    <EpInput v-model="values.maxStudents" name="maxStudents" label="Máximo de Alunos*" type="number" placeholder="Digite o número máximo de alunos" />

    <ion-list id="institutionList">
      <IonSelect
        v-model="institutionId"
        :disabled="true"
        cancel-text="Cancelar"
        fill="outline"
        label-placement="floating"
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
    <ion-list id="schoolList">
      <IonSelect
        v-model="schoolId"
        cancel-text="Cancelar"
        fill="outline"
        label-placement="floating"
        justify="space-between"
        label="Escola*"
        placeholder="Selecione a escola"
        @ion-change="(e) => {
          setFieldValue('schoolId', e.detail.value)
        }"
      >
        <IonSelectOption v-for="school in schoolList" :key="school.id" :value="school.id">
          {{ school.name }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>
    <ion-list id="courseList">
      <IonSelect
        v-model="courseId"
        :disabled="!schoolId"
        cancel-text="Cancelar"
        fill="outline"
        label-placement="floating"
        justify="space-between"
        label="Curso*"
        placeholder="Selecione o curso"
        @ion-change="(e) => {
          setFieldValue('courseId', e.detail.value)
        }"
      >
        <IonSelectOption v-for="course in courseList" :key="course.id" :value="course.id">
          {{ course.name }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>
    <ion-list id="seriesList">
      <IonSelect
        v-model="seriesId"
        :disabled="!courseId"
        cancel-text="Cancelar"
        fill="outline"
        label-placement="floating"
        justify="space-between"
        label="Série*"
        placeholder="Selecione a série"
        @ion-change="(e) => {
          setFieldValue('seriesId', e.detail.value)
        }"
      >
        <IonSelectOption v-for="series in seriesList" :key="series.id" :value="series.id">
          {{ series.name }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>
    <ion-list id="teacherList">
      <IonSelect
        v-model="teacherId"
        cancel-text="Cancelar"
        fill="outline"
        label-placement="floating"
        justify="space-between"
        label="Professor*"
        placeholder="Selecione o professor"
        @ion-change="(e) => {
          setFieldValue('teacherId', e.detail.value)
        }"
      >
        <IonSelectOption v-for="teacher in teacherList" :key="teacher.id" :value="teacher.id">
          {{ teacher.name }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>
  </div>
  <div v-show="selectedSegment === 'class-info'">
    <EpInput v-model="values.startTime" name="startTime" label="Hora Inicial" type="time" placeholder="Digite a hora inicial" />
    <EpInput v-model="values.startTimeInterval" name="startTimeInterval" label="Intervalo Inicial" type="time" placeholder="Digite o intervalo inicial" />
    <EpInput v-model="values.endTimeInterval" name="endTimeInterval" label="Intervalo Final" type="time" placeholder="Digite o intervalo final" />
    <EpInput v-model="values.endTime" name="endTime" label="Hora Final" type="time" placeholder="Digite a hora final" />
    <ion-list id="daysOfWeek">
      <IonSelect
        v-model="values.day_of_week"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
        multiple
        justify="space-between"
        label="Dias da Semana"
        placeholder="Selecione os dias da semana"
        @ion-change="(e) => setFieldValue('day_of_week', e.target.value)"
      >
        <IonSelectOption v-for="day_of_week in day_of_week" :key="day_of_week" :value="day_of_week">
          {{ day_of_week }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>
    <ion-list id="periodList">
      <IonSelect
        v-model="values.period"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
        justify="space-between"
        label="Turno"
        placeholder="Selecione o turno"
        @ion-change="(e) => setFieldValue('period', e.target.value)"
      >
        <IonSelectOption v-for="period in period" :key="period" :value="period">
          {{ period }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>
  </div>
</template>
