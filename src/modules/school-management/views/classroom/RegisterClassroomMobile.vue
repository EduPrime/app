<script setup lang="ts">
import type { Course, School, Series } from '@prisma/client'
import showToast from '@/utils/toast-alert'
import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue'
import { schoolOutline } from 'ionicons/icons'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import ClassroomService from '../../services/ClassroomService'
import CourseService from '../../services/CourseService'
import SchoolService from '../../services/SchoolService'
import SeriesService from '../../services/SeriesService'

const props = defineProps<{
  editId?: string
}>()

const emits = defineEmits<{
  (e: 'saved'): void
  (e: 'cancel'): void
  (e: 'error', message: string, color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark'): void
  (e: 'success', message: string, color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark'): void
}>()

const classroomService = new ClassroomService()
const seriesService = new SeriesService()
const schoolService = new SchoolService()
const courseService = new CourseService()

const seriesList = ref<Series[]>([])
const schoolList = ref<School[]>([])
const courseList = ref<Course[]>([])

const dayOfWeekOptions = [
  { value: 'MONDAY', label: 'Segunda-feira' },
  { value: 'TUESDAY', label: 'Terça-feira' },
  { value: 'WEDNESDAY', label: 'Quarta-feira' },
  { value: 'THURSDAY', label: 'Quinta-feira' },
  { value: 'FRIDAY', label: 'Sexta-feira' },
  { value: 'SATURDAY', label: 'Sábado' },
  { value: 'SUNDAY', label: 'Domingo' },
]

function formatTimeInput(value: string): string {
  const cleanValue = value.replace(/\D/g, '')

  if (cleanValue.length >= 2) {
    const hours = cleanValue.substring(0, 2)
    const minutes = cleanValue.substring(2, 4)

    const hoursNum = Number.parseInt(hours)
    if (hoursNum > 23) {
      return `23${minutes ? `:${minutes}` : ':'}`
    }

    return hours + (minutes ? `:${minutes}` : ':')
  }

  return cleanValue
}

function validateTimeRange(startTime: string, endTime: string): boolean {
  if (!startTime || !endTime)
    return true

  const regexTime = /^(?:[01]?\d|2[0-3]):[0-5]\d$/
  if (!regexTime.test(startTime) || !regexTime.test(endTime))
    return true
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  const startTotalMinutes = startHour * 60 + startMinute
  const endTotalMinutes = endHour * 60 + endMinute

  return startTotalMinutes < endTotalMinutes
}

const periodOptions = [
  { value: 'MORNING', label: 'Manhã' },
  { value: 'AFTERNOON', label: 'Tarde' },
  { value: 'EVENING', label: 'Noite' },
  { value: 'INTEGRAL', label: 'Integral' },
]

const regimeTypeOptions = [
  { value: 'Presencial', label: 'Presencial' },
  { value: 'Semipresencial', label: 'Semipresencial' },
  { value: 'EAD', label: 'EAD' },
]

const statusOptions = [
  { value: 'ACTIVE', label: 'Ativa' },
  { value: 'INACTIVE', label: 'Inativa' },
  { value: 'GRADUATED', label: 'Formada' },
  { value: 'SUSPENDED', label: 'Suspensa' },
]

const formValues = ref({
  id: '',
  name: '',
  abbreviation: '',
  seriesId: '',
  maxStudents: '',
  exceededStudents: '',
  totalStudents: '',
  pcdStudents: '',
  startTime: '',
  startTimeInterval: '',
  endTimeInterval: '',
  endTime: '',
  dayofweek: [] as string[],
  room: '',
  regimeType: '',
  period: '',
  status: '',
  year: '',
  isMultiSerialized: false,
  schoolId: '',
  courseId: '',
})

const originalFormValues = ref({ ...formValues.value })

const hasChanges = ref(false)
const isEditing = computed(() => Boolean(props.editId))
const modalTitle = computed(() => isEditing.value ? 'Editar turma' : 'Nova turma')

async function loadDependencies() {
  try {
    const schoolData = await schoolService.getAvailableSchools()
    schoolList.value = schoolData || []
  }
  catch (error) {
    console.error('Erro ao carregar dependências:', error)
  }
}

async function loadCoursesBySchool(schoolId: string) {
  if (!schoolId) {
    courseList.value = []
    return
  }
  try {
    const courses = await courseService.getCoursesBySchool(schoolId)
    courseList.value = (courses || []) as Course[]

    if (!isEditing.value) {
      formValues.value.courseId = ''
      formValues.value.seriesId = ''
      seriesList.value = []
    }
  }
  catch (error) {
    console.error('Erro ao carregar cursos:', error)
    courseList.value = []
  }
}

async function loadSeriesByCourseAndSchool(schoolId: string, courseId: string) {
  if (!schoolId || !courseId) {
    seriesList.value = []
    return
  }
  try {
    const series = await seriesService.getSeriesByCourse(courseId)

    if (!series || series.length === 0) {
      seriesList.value = []
      showToast('Não há séries disponíveis para este curso', 'top', 'warning')
    }
    else {
      seriesList.value = series as Series[]
    }

    if (!isEditing.value) {
      formValues.value.seriesId = ''
    }
  }
  catch (error) {
    console.error('Erro ao carregar séries:', error)
    showToast('Erro ao carregar séries', 'top', 'danger')
    seriesList.value = []
  }
}

const saveButtonEnabled = computed(() => {
  if (!isEditing.value) {
    const enabled = !!formValues.value.name || !!formValues.value.abbreviation
      || !!formValues.value.seriesId || !!formValues.value.schoolId
      || !!formValues.value.maxStudents || !!formValues.value.year
      || !!formValues.value.period || !!formValues.value.regimeType
      || formValues.value.dayofweek.length > 0
    return enabled
  }
  return hasChanges.value
})

function checkForChanges() {
  if (!isEditing.value)
    return

  const currentValues = JSON.stringify(formValues.value)
  const originalValues = JSON.stringify(originalFormValues.value)
  hasChanges.value = currentValues !== originalValues
}

watch(
  () => ({ ...formValues.value }),
  () => {
    if (isEditing.value) {
      checkForChanges()
    }
  },
  { deep: true, immediate: true },
)

watch(() => formValues.value.schoolId, (newSchoolId) => {
  if (newSchoolId) {
    loadCoursesBySchool(newSchoolId)
  }
  else {
    courseList.value = []
    seriesList.value = []
    formValues.value.courseId = ''
    formValues.value.seriesId = ''
  }
})

watch(() => formValues.value.courseId, (newCourseId) => {
  if (newCourseId && formValues.value.schoolId) {
    loadSeriesByCourseAndSchool(formValues.value.schoolId, newCourseId)
  }
  else {
    seriesList.value = []
    formValues.value.seriesId = ''
  }
})

watch(() => formValues.value.seriesId, (newSeriesId) => {
  if (newSeriesId && !isEditing.value && !formValues.value.name) {
    const selectedSeries = seriesList.value.find(s => s.id === newSeriesId)
    if (selectedSeries) {
      const currentYear = new Date().getFullYear()
      formValues.value.name = `${selectedSeries.name} ${currentYear}`
      formValues.value.year = currentYear.toString()
    }
  }
})

onMounted(async () => {
  await loadDependencies()

  if (props.editId) {
    const classroom = await classroomService.getClassroomById(props.editId)

    if (classroom) {
      const formatTime = (time: Date | null | undefined) => {
        if (!time)
          return ''

        if (typeof time === 'string' && /^\d{1,2}:\d{2}$/.test(time)) {
          return time
        }

        try {
          const timeDate = new Date(time)
          if (!Number.isNaN(timeDate.getTime())) {
            const hours = timeDate.getHours().toString().padStart(2, '0')
            const minutes = timeDate.getMinutes().toString().padStart(2, '0')
            return `${hours}:${minutes}`
          }
        }
        catch (e) {
          console.error('Erro ao formatar horário:', e)
        }

        return ''
      }
      const loadedValues = {
        id: classroom.id,
        name: classroom.name,
        abbreviation: classroom.abbreviation || '',
        seriesId: classroom.seriesId,
        maxStudents: classroom.maxStudents?.toString() || '',
        exceededStudents: classroom.exceededStudents?.toString() || '',
        totalStudents: classroom.totalStudents?.toString() || '',
        pcdStudents: classroom.pcdStudents?.toString() || '',
        startTime: formatTime(classroom.startTime),
        startTimeInterval: formatTime(classroom.startTimeInterval),
        endTimeInterval: formatTime(classroom.endTimeInterval),
        endTime: formatTime(classroom.endTime),
        dayofweek: classroom.dayofweek || [],
        room: classroom.room || '',
        regimeType: classroom.regimeType || '',
        period: classroom.period || '',
        status: classroom.status || '',
        year: classroom.year?.toString() || '',
        isMultiSerialized: classroom.isMultiSerialized || false,
        schoolId: classroom.schoolId || '',
        courseId: (classroom as any).courseId || '',
      }

      formValues.value = { ...loadedValues }
      originalFormValues.value = { ...loadedValues }
      hasChanges.value = false
    }
  }
  else {
    const currentYear = new Date().getFullYear().toString()
    formValues.value = {
      id: '',
      name: '',
      abbreviation: '',
      seriesId: '',
      maxStudents: '',
      exceededStudents: '',
      totalStudents: '',
      pcdStudents: '',
      startTime: '',
      startTimeInterval: '',
      endTimeInterval: '',
      endTime: '',
      dayofweek: [],
      room: '',
      regimeType: '',
      period: '',
      status: '',
      year: currentYear,
      isMultiSerialized: false,
      schoolId: '',
      courseId: '',
    }
    originalFormValues.value = { ...formValues.value }
    hasChanges.value = false
  }
})

async function handleSubmit(values: any) {
  const convertTimeStringToTimestamp = (timeString: string | null): Date | null => {
    if (!timeString)
      return null

    if (typeof timeString === 'string' && /^\d{1,2}:\d{2}$/.test(timeString)) {
      const [hours, minutes] = timeString.split(':').map(Number)

      const date = new Date()
      date.setHours(0, 0, 0, 0)
      date.setUTCHours(hours)
      date.setUTCMinutes(minutes)
      date.setUTCSeconds(0)
      date.setUTCMilliseconds(0)

      return date
    }

    return new Date(timeString)
  }

  const startTime = convertTimeStringToTimestamp(values.startTime)
  const startTimeInterval = convertTimeStringToTimestamp(values.startTimeInterval)
  const endTimeInterval = convertTimeStringToTimestamp(values.endTimeInterval)
  const endTime = convertTimeStringToTimestamp(values.endTime)

  const payload = {
    id: isEditing.value ? props.editId : undefined,
    name: values.name,
    abbreviation: values.abbreviation,
    seriesId: values.seriesId,
    maxStudents: values.maxStudents ? Number.parseInt(values.maxStudents) : 0,
    exceededStudents: values.exceededStudents ? Number.parseInt(values.exceededStudents) : 0,
    totalStudents: values.totalStudents ? Number.parseInt(values.totalStudents) : 0,
    pcdStudents: values.pcdStudents ? Number.parseInt(values.pcdStudents) : 0,
    startTime,
    startTimeInterval,
    endTimeInterval,
    endTime,
    dayofweek: values.dayofweek,
    room: values.room,
    regimeType: values.regimeType,
    period: values.period,
    status: values.status,
    year: values.year ? Number.parseInt(values.year) : new Date().getFullYear(),
    isMultiSerialized: values.isMultiSerialized,
    schoolId: values.schoolId,
    courseId: values.courseId,
  }

  try {
    await classroomService.upsertClassroom(payload)

    const successMessage = isEditing.value
      ? 'Turma atualizada com sucesso'
      : 'Nova turma cadastrada com sucesso'

    emits('success', successMessage, 'success')
    handleSaved()
  }
  catch (error: any) {
    console.error('Erro ao salvar turma:', error)

    if (error.message) {
      if (error.message.includes('Nome de turma já existente')) {
        emits('error', 'Não foi possível salvar turma: Nome de turma já existente para esta série', 'warning')
      }
      else {
        emits('error', `Erro ao salvar turma: ${error.message}`, 'danger')
      }
    }
    else {
      emits('error', 'Erro ao salvar turma', 'danger')
    }
  }
}

function handleCancel() {
  emits('cancel')
}

function handleSaved() {
  emits('saved')
}
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding ion-no-padding">
      <div class="style-purple-lane" style="display: flex; align-items: center;">
        <IonIcon :icon="schoolOutline" style="margin-right: 10px;" />
        {{ modalTitle }}
      </div>
      <Form id="classroom-form-mobile" :key="formValues.id || 'new'" :initial-values="formValues" @submit="handleSubmit">
        <IonGrid>
          <div class="section-header">
            <h3>Informações Básicas</h3>
          </div>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="name" label="Nome da turma" rules="required|min:3|max:100">
                <IonInput
                  v-bind="field"
                  v-model="formValues.name"
                  label="Nome da turma"
                  label-placement="stacked"
                  fill="outline"
                  :maxlength="101"
                  placeholder="Digite o nome da turma"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="field.onInput"
                >
                  <div slot="label" class="required-field">
                    Nome da turma <span class="required-text">(Obrigatório)</span>
                  </div>
                </IonInput>
                <ErrorMessage v-slot="{ message }" name="name">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="abbreviation" label="Abreviação" rules="max:6">
                <IonInput
                  v-bind="field"
                  v-model="formValues.abbreviation"
                  label="Abreviação"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite a abreviação"
                  :maxlength="7"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="field.onInput"
                />
                <ErrorMessage v-slot="{ message }" name="abbreviation">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="schoolId" label="Escola" rules="required">
                <IonSelect
                  v-bind="field"
                  v-model="formValues.schoolId"
                  interface="alert"
                  label="Escola"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Selecione uma escola"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-change="(e) => { field.onChange(e.detail.value) }"
                >
                  <div slot="label" class="required-field">
                    Escola <span class="required-text">(Obrigatório)</span>
                  </div>
                  <IonSelectOption v-for="school in schoolList" :key="school.id" :value="school.id">
                    {{ school.name }}
                  </IonSelectOption>
                </IonSelect>
                <ErrorMessage v-slot="{ message }" name="schoolId">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="courseId" label="Curso" rules="required">
                <IonSelect
                  v-bind="field"
                  v-model="formValues.courseId"
                  interface="alert"
                  label="Curso"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Selecione um curso"
                  :disabled="!formValues.schoolId || courseList.length === 0"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-change="(e) => { field.onChange(e.detail.value) }"
                >
                  <div slot="label" class="required-field">
                    Curso <span class="required-text">(Obrigatório)</span>
                  </div>
                  <IonSelectOption v-for="course in courseList" :key="course.id" :value="course.id">
                    {{ course.name }}
                  </IonSelectOption>
                </IonSelect>
                <ErrorMessage v-slot="{ message }" name="courseId">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="seriesId" label="Série" rules="required">
                <IonSelect
                  v-bind="field"
                  v-model="formValues.seriesId"
                  interface="alert"
                  label="Série"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Selecione uma série"
                  :disabled="!formValues.courseId || seriesList.length === 0"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-change="(e) => { field.onChange(e.detail.value) }"
                >
                  <div slot="label" class="required-field">
                    Série <span class="required-text">(Obrigatório)</span>
                  </div>
                  <IonSelectOption v-for="series in seriesList" :key="series.id" :value="series.id">
                    {{ series.name }}
                  </IonSelectOption>
                </IonSelect>
                <ErrorMessage v-slot="{ message }" name="seriesId">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="year" label="Ano">
                <IonInput
                  v-bind="field"
                  v-model="formValues.year"
                  type="text"
                  label="Ano"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o ano"
                  :class="{ 'has-error': errors.length > 0 }"
                  disabled
                  @ion-input="field.onInput"
                >
                  <div slot="label" class="required-field">
                    Ano <span class="required-text">(Obrigatório)</span>
                  </div>
                </IonInput>
                <ErrorMessage v-slot="{ message }" name="year">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="period" label="Período" rules="required">
                <IonSelect
                  v-bind="field"
                  v-model="formValues.period"
                  interface="alert"
                  label="Período"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Selecione um período"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-change="(e) => { field.onChange(e.detail.value) }"
                >
                  <IonSelectOption v-for="option in periodOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </IonSelectOption>
                </IonSelect>
                <ErrorMessage v-slot="{ message }" name="period">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="room" label="Sala" rules="max:50">
                <IonInput
                  v-bind="field"
                  v-model="formValues.room"
                  label="Sala"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o número/nome da sala"
                  :class="{ 'has-error': errors.length > 0 }"
                  :maxlength="51"
                  @ion-input="field.onInput"
                />
                <ErrorMessage v-slot="{ message }" name="room">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="regimeType" label="Regime de ensino">
                <IonSelect
                  v-bind="field"
                  v-model="formValues.regimeType"
                  interface="alert"
                  label="Regime de ensino"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Selecione o regime"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-change="(e) => { field.onChange(e.detail.value) }"
                >
                  <IonSelectOption v-for="option in regimeTypeOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </IonSelectOption>
                </IonSelect>
                <ErrorMessage v-slot="{ message }" name="regimeType">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonItem lines="none" class="checkbox-item">
                <IonCheckbox
                  v-model="formValues.isMultiSerialized"
                  label-placement="end"
                >
                  Turma multisseriada
                </IonCheckbox>
              </IonItem>
            </IonCol>
          </IonRow>

          <div class="section-header">
            <h3>Capacidade e Ocupação</h3>
          </div>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="maxStudents" label="Capacidade máxima" rules="required|checandoNumero|valorMinimo:1|max:3">
                <IonInput
                  v-bind="field"
                  v-model="formValues.maxStudents"
                  type="text"
                  label="Capacidade máxima"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite a capacidade máxima"
                  :class="{ 'has-error': errors.length > 0 }"
                  :maxlength="4"
                  @ion-input="field.onInput"
                >
                  <div slot="label" class="required-field">
                    Capacidade máxima <span class="required-text">(Obrigatório)</span>
                  </div>
                </IonInput>
                <ErrorMessage v-slot="{ message }" name="maxStudents">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="totalStudents" label="Total de alunos" rules="checandoNumero|min:0|max:3">
                <IonInput
                  v-bind="field"
                  v-model="formValues.totalStudents"
                  type="text"
                  label="Total de alunos"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o total de alunos"
                  :class="{ 'has-error': errors.length > 0 }"
                  :maxlength="4"
                  @ion-input="field.onInput"
                />
                <ErrorMessage v-slot="{ message }" name="totalStudents">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="exceededStudents" label="Limite de excedentes" rules="checandoNumero|min:0|max:3">
                <IonInput
                  v-bind="field"
                  v-model="formValues.exceededStudents"
                  type="text"
                  label="Limite de excedentes"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o número do limite de excedentes"
                  :class="{ 'has-error': errors.length > 0 }"
                  :maxlength="4"
                  @ion-input="field.onInput"
                />
                <ErrorMessage v-slot="{ message }" name="exceededStudents">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="pcdStudents" label="Alunos PCD" rules="checandoNumero|min:0|max:3">
                <IonInput
                  v-bind="field"
                  v-model="formValues.pcdStudents"
                  type="text"
                  label="Alunos PCD"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o número de alunos PCD"
                  :class="{ 'has-error': errors.length > 0 }"
                  :maxlength="4"
                  @ion-input="field.onInput"
                />
                <ErrorMessage v-slot="{ message }" name="pcdStudents">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <div class="section-header">
            <h3>Horários</h3>
          </div>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="startTime" label="Horário de início" rules="formatoHora|required">
                <IonInput
                  v-bind="field"
                  v-model="formValues.startTime"
                  type="text"
                  label="Horário de início"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Ex: 08:00"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="(e) => {
                    const formatted = formatTimeInput(e.detail.value || '');
                    formValues.startTime = formatted;
                    field.onChange(formatted);
                  }"
                >
                  <div slot="label" class="required-field">
                    Horário de início <span class="required-text">(Obrigatório)</span>
                  </div>
                </IonInput>
                <ErrorMessage v-slot="{ message }" name="startTime">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
                <div v-if="formValues.startTime && formValues.endTime && !validateTimeRange(formValues.startTime, formValues.endTime)" class="error-message">
                  Horário de início deve ser anterior ao término
                </div>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="endTime" label="Horário de término" rules="formatoHora|required">
                <IonInput
                  v-bind="field"
                  v-model="formValues.endTime"
                  type="text"
                  label="Horário de término"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Ex: 12:00"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="(e) => {
                    const formatted = formatTimeInput(e.detail.value || '');
                    formValues.endTime = formatted;
                    field.onChange(formatted);
                  }"
                >
                  <div slot="label" class="required-field">
                    Horário de término <span class="required-text">(Obrigatório)</span>
                  </div>
                </IonInput>
                <ErrorMessage v-slot="{ message }" name="endTime">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="startTimeInterval" label="Início do intervalo" rules="formatoHora">
                <IonInput
                  v-bind="field"
                  v-model="formValues.startTimeInterval"
                  type="text"
                  label="Início do intervalo"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Ex: 10:00"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="(e) => {
                    const formatted = formatTimeInput(e.detail.value || '');
                    formValues.startTimeInterval = formatted;
                    field.onChange(formatted);
                  }"
                />
                <ErrorMessage v-slot="{ message }" name="startTimeInterval">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
                <div v-if="formValues.startTimeInterval && formValues.endTimeInterval && !validateTimeRange(formValues.startTimeInterval, formValues.endTimeInterval)" class="error-message">
                  Início do intervalo deve ser anterior ao fim do intervalo
                </div>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="endTimeInterval" label="Fim do intervalo" rules="formatoHora">
                <IonInput
                  v-bind="field"
                  v-model="formValues.endTimeInterval"
                  type="text"
                  label="Fim do intervalo"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Ex: 10:20"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="(e) => {
                    const formatted = formatTimeInput(e.detail.value || '');
                    formValues.endTimeInterval = formatted;
                    field.onChange(formatted);
                  }"
                />
                <ErrorMessage v-slot="{ message }" name="endTimeInterval">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="dayofweek" label="Dias da semana" rules="required">
                <div class="days-selection">
                  <IonLabel class="ion-padding-start">
                    Dias da semana
                  </IonLabel>
                  <div class="days-grid">
                    <IonItem v-for="day in dayOfWeekOptions" :key="day.value" lines="none" class="checkbox-item">
                      <IonCheckbox
                        :value="day.value"
                        :checked="formValues.dayofweek.includes(day.value)"
                        label-placement="end"
                        @ion-change="(e) => {
                          if (e.detail.checked) {
                            formValues.dayofweek.push(day.value);
                          }
                          else {
                            formValues.dayofweek = formValues.dayofweek.filter(d => d !== day.value);
                          }
                          field.onChange(formValues.dayofweek);
                        }"
                      >
                        {{ day.label }}
                      </IonCheckbox>
                    </IonItem>
                  </div>
                </div>
              </Field>
            </IonCol>
          </IonRow>

          <div class="section-header">
            <h3>Status</h3>
          </div>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="status" label="Status" rules="required">
                <IonSelect
                  v-bind="field"
                  v-model="formValues.status"
                  interface="alert"
                  label="Status"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Selecione o status"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-change="(e) => { field.onChange(e.detail.value) }"
                >
                  <IonSelectOption v-for="option in statusOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </IonSelectOption>
                </IonSelect>
                <ErrorMessage v-slot="{ message }" name="status">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>
        </IonGrid>
      </Form>
    </IonContent>

    <div>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonButton color="danger" expand="block" @click="handleCancel()">
              Cancelar
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton expand="block" type="submit" form="classroom-form-mobile" :disabled="!saveButtonEnabled">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  </IonPage>
</template>

<style scoped>
.style-purple-lane {
  background: rgba(var(--ion-color-secondary-rgb), 0.15);
  color: var(--ion-color-secondary);
  padding: 2px;
  margin: 8px 2px;
  border-radius: 4px;
}

.section-header {
  margin-top: 24px;
  margin-bottom: 16px;
}

.section-header h3 {
  color: var(--ion-color-secondary);
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  padding-left: 16px;
}

.required-text {
  color: var(--ion-color-danger);
}

.error-message {
  color: var(--ion-color-danger);
  font-size: 0.8rem;
  margin-top: 4px;
  padding-left: 16px;
}

ion-input.has-error,
ion-textarea.has-error,
ion-select.has-error {
  --border-color: var(--ion-color-danger);
}

.checkbox-item {
  --background: transparent;
  --padding-start: 16px;
  margin-top: 8px;
}

.days-selection {
  margin-top: 16px;
}

.days-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}
</style>
