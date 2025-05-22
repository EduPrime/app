<script setup lang="ts">
import showToast from '@/utils/toast-alert'
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonItem,
  IonInput
} from '@ionic/vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ClassroomService from '../../services/ClassroomService'
import SeriesService from '../../services/SeriesService'
import SchoolService from '../../services/SchoolService'
import CourseService from '../../services/CourseService'
import type { Series, School, Course } from '@prisma/client'

const route = useRoute()
const router = useRouter()
const classroomService = new ClassroomService()
const seriesService = new SeriesService()
const schoolService = new SchoolService()
const courseService = new CourseService()

const initialFormValues = {
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
}

const formValues = ref({ ...initialFormValues })
const originalFormValues = ref({ ...initialFormValues })
const isEditing = ref(false)
const classroomId = computed(() => route.params.id as string | undefined)
const pageTitle = computed(() => isEditing.value ? 'Editar turma' : 'Nova turma')
const descriptionRef = ref<HTMLTextAreaElement | null>(null)
const hasChanges = ref(false)

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
  const cleanValue = value.replace(/[^0-9]/g, '')
  
  if (cleanValue.length >= 2) {
    const hours = cleanValue.substring(0, 2)
    const minutes = cleanValue.substring(2, 4)
    
    const hoursNum = parseInt(hours)
    if (hoursNum > 23) {
      return '23' + (minutes ? `:${minutes}` : ':')
    }
    
    return hours + (minutes ? `:${minutes}` : ':')
  }
  
  return cleanValue
}

function validateTimeRange(startTime: string, endTime: string): boolean {
  if (!startTime || !endTime) return true
  
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)
  
  const startTotalMinutes = startHour * 60 + startMinute
  const endTotalMinutes = endHour * 60 + endMinute
  
  return startTotalMinutes < endTotalMinutes
}

function validateIntervalTime(classStartTime: string, classEndTime: string, intervalStartTime?: string, intervalEndTime?: string) {
  if (!classStartTime || !classEndTime) return { startValid: true, endValid: true }
  
  const toMinutes = (time: string) => {
    if (!time) return 0
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }
  
  const classStartMinutes = toMinutes(classStartTime)
  const classEndMinutes = toMinutes(classEndTime)
  const intervalStartMinutes = toMinutes(intervalStartTime || '')
  const intervalEndMinutes = toMinutes(intervalEndTime || '')
  
  const startValid = !intervalStartTime || 
    (intervalStartMinutes >= classStartMinutes && intervalStartMinutes < classEndMinutes)
  
  const endValid = !intervalEndTime || 
    (intervalEndMinutes > classStartMinutes && intervalEndMinutes <= classEndMinutes)
  
  return { startValid, endValid }
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
  { value: 'ACTIVE', label: 'Ativo' },
  { value: 'INACTIVE', label: 'Inativo' },
]

async function loadDependencies() {
  try {
    const schoolData = await schoolService.getAll()
    schoolList.value = schoolData || []
    console.log('Escolas carregadas:', schoolList.value)
  } catch (error) {
    console.error('Erro ao carregar dependências:', error)
    showToast('Erro ao carregar escolas', 'top', 'danger')
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
    console.log('Cursos carregados:', courseList.value)
    
    if (!isEditing.value) {
      formValues.value.courseId = ''
      formValues.value.seriesId = ''
      seriesList.value = []
    }
  } catch (error) {
    console.error('Erro ao carregar cursos:', error)
    showToast('Erro ao carregar cursos', 'top', 'danger')
    courseList.value = []
  }
}

async function loadSeriesByCourseAndSchool(schoolId: string, courseId: string) {
  if (!schoolId || !courseId) {
    seriesList.value = []
    return
  }
  try {
    const series = await seriesService.getSeriesBySchoolAndCourse(schoolId, courseId)
    
    if (!series || series.length === 0) {
      console.log('Nenhuma série encontrada para esta escola e curso')
      const allSchoolSeries = await seriesService.getSeriesBySchool(schoolId)
      if (allSchoolSeries && allSchoolSeries.length > 0) {
        console.log('Carregando todas as séries da escola como fallback')
        seriesList.value = allSchoolSeries as Series[]
      } else {
        seriesList.value = []
      }
    } else {
      seriesList.value = series as Series[]
      console.log('Séries carregadas para o curso específico:', seriesList.value)
    }
    
    if (!isEditing.value) {
      formValues.value.seriesId = ''
    }
  } catch (error) {
    console.error('Erro ao carregar séries:', error)
    showToast('Erro ao carregar séries', 'top', 'danger')
    
    try {
      const fallbackSeries = await seriesService.getSeriesBySchool(schoolId)
      seriesList.value = (fallbackSeries || []) as Series[]
      console.log('Carregando todas as séries da escola como fallback após erro')
    } catch {
      seriesList.value = []
    }
  }
}

function checkForChanges() {
  if (!isEditing.value)
    return

  const currentValues = JSON.stringify(formValues.value)
  const originalValues = JSON.stringify(originalFormValues.value)
  hasChanges.value = currentValues !== originalValues
}

const saveButtonEnabled = computed(() => {
  if (!isEditing.value) {
    const enabled = !!formValues.value.name || !!formValues.value.abbreviation || 
                   !!formValues.value.seriesId || !!formValues.value.schoolId ||
                   !!formValues.value.courseId || !!formValues.value.maxStudents || 
                   !!formValues.value.year || !!formValues.value.period || 
                   !!formValues.value.regimeType || formValues.value.dayofweek.length > 0
    return enabled
  }

  return hasChanges.value
})

watch(() => formValues.value.schoolId, (newSchoolId) => {
  if (newSchoolId) {
    loadCoursesBySchool(newSchoolId)
  } else {
    courseList.value = []
    seriesList.value = []
    formValues.value.courseId = ''
    formValues.value.seriesId = ''
  }
})

watch(() => formValues.value.courseId, (newCourseId) => {
  if (newCourseId && formValues.value.schoolId) {
    loadSeriesByCourseAndSchool(formValues.value.schoolId, newCourseId)
  } else {
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

watch(
  () => ({ ...formValues.value }),
  () => {
    if (isEditing.value) {
      checkForChanges()
    }
  },
  { deep: true, immediate: true },
)

onMounted(async () => {
  await loadDependencies()

  if (classroomId.value) {
    isEditing.value = true
    const classroom = await classroomService.getClassroomById(classroomId.value)

    if (classroom) {
      const formatTime = (time: any) => {
        if (!time) return ''
        
        if (typeof time === 'string' && time.match(/^\d{1,2}:\d{2}$/)) {
          return time
        }
        
        try {
          const timeDate = new Date(time)
          if (!isNaN(timeDate.getTime())) {
            const hours = timeDate.getHours().toString().padStart(2, '0')
            const minutes = timeDate.getMinutes().toString().padStart(2, '0')
            return `${hours}:${minutes}`
          }
        } catch (e) {
          console.error('Erro ao formatar horário:', e)
        }
        
        return ''
      }

      console.log('Carregando classroom:', classroom)
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
    formValues.value = { ...initialFormValues }
    originalFormValues.value = { ...initialFormValues }
    hasChanges.value = false
  }
})

async function handleSubmit(values: any) {
  const daysOfWeek = Array.isArray(values.dayofweek) ? 
    values.dayofweek.map((day: string) => day.toUpperCase()) : 
    values.dayofweek;
  const convertTimeStringToTimestamp = (timeString: string | null): Date | null => {
    if (!timeString) return null;
    
    if (timeString.match(/^\d{1,2}:\d{2}$/)) {
      const [hours, minutes] = timeString.split(':').map(Number);
      
      const date = new Date();
      date.setHours(0, 0, 0, 0); 
      date.setUTCHours(hours);
      date.setUTCMinutes(minutes);
      date.setUTCSeconds(0);
      date.setUTCMilliseconds(0);
      
      return date;
    }
    
    return new Date(timeString);
  };
  
  const startTime = convertTimeStringToTimestamp(values.startTime);
  const startTimeInterval = convertTimeStringToTimestamp(values.startTimeInterval);
  const endTimeInterval = convertTimeStringToTimestamp(values.endTimeInterval);
  const endTime = convertTimeStringToTimestamp(values.endTime);
  
  const payload = {
    id: isEditing.value ? classroomId.value : undefined,
    name: values.name,
    abbreviation: values.abbreviation,
    seriesId: values.seriesId,
    maxStudents: values.maxStudents,
    exceededStudents: values.exceededStudents,
    totalStudents: values.totalStudents,
    pcdStudents: values.pcdStudents,
    startTime,
    startTimeInterval,
    endTimeInterval,
    endTime,
    dayofweek: daysOfWeek,
    room: values.room,
    regimeType: values.regimeType,
    period: values.period,
    status: values.status,
    year: values.year,
    isMultiSerialized: values.isMultiSerialized,
    schoolId: values.schoolId,
    courseId: values.courseId,
  }

  try {
    await classroomService.upsertClassroom(payload)

    const successMessage = isEditing.value
      ? 'Turma atualizada com sucesso'
      : 'Nova turma cadastrada com sucesso'

    showToast(successMessage, 'top', 'success')

    router.push({
      name: 'ClassroomListClassroom',
      query: { refresh: Date.now().toString() },
    })
  }
  catch (error: any) {
    console.error('Erro ao salvar turma:', error)

    if (error.message) {
      if (error.message.includes('Nome de turma já existente')) {
        showToast('Não foi possível salvar turma: Nome de turma já existente para esta série', 'top', 'warning')
      }
      else {
        showToast(`Erro ao salvar turma: ${error.message}`, 'top', 'danger')
      }
    }
    else {
      showToast('Erro ao salvar turma', 'top', 'danger')
    }
  }
}

function resetForm() {
  router.back()
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle class="page-title">
          {{ pageTitle }}
        </IonTitle>
      </IonToolbar>
      <div class="toolbar-accent" />
    </IonHeader>

    <IonContent :scroll-y="true" class="ion-padding content-with-footer">
      <Form id="classroom-form" :key="formValues.id || 'new'" :initial-values="formValues" @submit="handleSubmit">
        <IonGrid>
          <!-- Seção Informações Básicas -->
          <div class="section-header">
            <h2>Informações Básicas</h2>
          </div>
          
          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="name" label="Nome da turma" rules="required|min:3|max:180">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.name"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Nome da turma </span><span class="required-text">(Obrigatório)</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="name">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
            
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="abbreviation" rules="max:10">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.abbreviation"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    :maxlength="10"
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Abreviação</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="abbreviation">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <!-- Escola (primeiro campo) -->
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="schoolId" label="Escola" rules="required">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.schoolId"
                    interface="alert"
                    placeholder="Selecione uma escola"
                    class="select-native"
                    @ionChange="(e) => { field.onChange(e.detail.value) }"
                  >
                    <IonSelectOption v-for="school in schoolList" :key="school.id" :value="school.id">
                      {{ school.corporateName || school.name }}
                    </IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Escola</span><span class="required-text"> (Obrigatório)</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="schoolId">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>
          
          <!-- Curso (segundo campo) -->
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="courseId" label="Curso" rules="required">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.courseId"
                    interface="alert"
                    placeholder="Selecione um curso"
                    class="select-native"
                    @ionChange="(e) => { field.onChange(e.detail.value) }"
                    :disabled="!formValues.schoolId"
                  >
                    <IonSelectOption v-for="course in courseList" :key="course.id" :value="course.id">
                      {{ course.name }}
                    </IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Curso</span><span class="required-text"> (Obrigatório)</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="courseId">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>
          
          <!-- Série (terceiro campo) -->
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="seriesId" label="Série" rules="required">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.seriesId"
                    interface="alert"
                    placeholder="Selecione uma série"
                    class="select-native"
                    @ionChange="(e) => { field.onChange(e.detail.value) }"
                    :disabled="!formValues.courseId || !formValues.schoolId"
                  >
                    <IonSelectOption v-for="series in seriesList" :key="series.id" :value="series.id">
                      {{ series.name }}
                    </IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Série</span><span class="required-text"> (Obrigatório)</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="seriesId">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="year" label="Ano" rules="required|checandoNumero">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.year"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Ano</span><span class="required-text"> (Obrigatório)</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="year">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>

            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="period">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.period"
                    interface="alert"
                    placeholder="Selecione um período"
                    class="select-native"
                    @ionChange="(e) => { field.onChange(e.detail.value) }"
                  >
                    <IonSelectOption v-for="option in periodOptions" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Período</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="period">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="room">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.room"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Sala</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="room">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
            
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="regimeType">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.regimeType"
                    interface="alert"
                    placeholder="Selecione o regime de ensino"
                    class="select-native"
                    @ionChange="(e) => { field.onChange(e.detail.value) }"
                  >
                    <IonSelectOption v-for="option in regimeTypeOptions" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Regime de ensino</span></label>
                </div>
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
                  labelPlacement="end"
                >Turma multisseriada</IonCheckbox>
              </IonItem>
            </IonCol>
          </IonRow>

          <!-- Seção Capacidade e Ocupação -->
          <div class="section-header">
            <h2>Capacidade e Ocupação</h2>
          </div>
          
          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="maxStudents" label="Capacidade máxima" rules="required|checandoNumero|min:1">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.maxStudents"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Capacidade máxima</span><span class="required-text"> (Obrigatório)</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="maxStudents">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
            
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="totalStudents" rules="checandoNumero|min:0">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.totalStudents"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    @input="field.onInput"
                    :disabled="isEditing"
                  >
                  <label class="floating-label"><span>Total de alunos</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="totalStudents">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="exceededStudents" rules="checandoNumero|min:0">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.exceededStudents"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Vagas excedidas</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="exceededStudents">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
            
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="pcdStudents" rules="checandoNumero|min:0">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.pcdStudents"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Alunos PCD</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="pcdStudents">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <!-- Seção Horários -->
          <div class="section-header">
            <h2>Horários</h2>
          </div>

          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field, errors }" name="startTime" label="Horário de início" rules="required|formatoHora">
                <IonItem fill="outline" class="custom-item" :class="{ 'has-error': errors.length > 0 }">
                  <IonInput
                    v-bind="field"
                    v-model="formValues.startTime"
                    type="text"
                    placeholder="Ex: 08:00"
                    label="Horário de início"
                    labelPlacement="stacked"
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
                </IonItem>
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
            
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field, errors }" name="endTime" label="Horário de término" rules="required|formatoHora">
                <IonItem fill="outline" class="custom-item" :class="{ 'has-error': errors.length > 0 }">
                  <IonInput
                    v-bind="field"
                    v-model="formValues.endTime"
                    type="text"
                    placeholder="Ex: 12:00"
                    label="Horário de término"
                    labelPlacement="stacked"
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
                </IonItem>
                <ErrorMessage v-slot="{ message }" name="endTime">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field, errors }" name="startTimeInterval" label="Início do intervalo" rules="required|formatoHora">
                <IonItem fill="outline" class="custom-item" :class="{ 'has-error': errors.length > 0 }">
                  <IonInput
                    v-bind="field"
                    v-model="formValues.startTimeInterval"
                    type="text"
                    placeholder="Ex: 10:00"
                    label="Início do intervalo"
                    labelPlacement="stacked"
                    @ion-input="(e) => { 
                      const formatted = formatTimeInput(e.detail.value || '');
                      formValues.startTimeInterval = formatted;
                      field.onChange(formatted);
                    }"
                  >
                  </IonInput>
                </IonItem>
                <ErrorMessage v-slot="{ message }" name="startTimeInterval">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
                <div v-if="formValues.startTime && formValues.endTime && formValues.startTimeInterval && !validateIntervalTime(formValues.startTime, formValues.endTime, formValues.startTimeInterval, formValues.endTimeInterval).startValid" class="error-message">
                  Horário de início do intervalo deve estar dentro do período de aula
                </div>
                <div v-if="formValues.startTimeInterval && formValues.endTimeInterval && !validateTimeRange(formValues.startTimeInterval, formValues.endTimeInterval)" class="error-message">
                  Início do intervalo deve ser anterior ao fim do intervalo
                </div>
              </Field>
            </IonCol>
            
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field, errors }" name="endTimeInterval" label="Fim do intervalo" rules="required|formatoHora">
                <IonItem fill="outline" class="custom-item" :class="{ 'has-error': errors.length > 0 }">
                  <IonInput
                    v-bind="field"
                    v-model="formValues.endTimeInterval"
                    type="text"
                    placeholder="Ex: 10:20"
                    label="Fim do intervalo"
                    labelPlacement="stacked"
                    @ion-input="(e) => { 
                      const formatted = formatTimeInput(e.detail.value || '');
                      formValues.endTimeInterval = formatted;
                      field.onChange(formatted);
                    }"
                  >
                  </IonInput>
                </IonItem>
                <ErrorMessage v-slot="{ message }" name="endTimeInterval">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
                <div v-if="formValues.startTime && formValues.endTime && formValues.endTimeInterval && !validateIntervalTime(formValues.startTime, formValues.endTime, formValues.startTimeInterval, formValues.endTimeInterval).endValid" class="error-message">
                  Horário de fim do intervalo deve estar dentro do período de aula
                </div>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="dayofweek">
                <div class="days-selection">
                  <label class="days-label">Dias da semana</label>
                  <div class="days-grid">
                    <IonItem lines="none" class="checkbox-item" v-for="day in dayOfWeekOptions" :key="day.value">
                      <IonCheckbox 
                        :value="day.value"
                        :checked="formValues.dayofweek.includes(day.value)"
                        labelPlacement="end"
                        @ionChange="(e) => {
                          if (e.detail.checked) {
                            formValues.dayofweek.push(day.value);
                          } else {
                            formValues.dayofweek = formValues.dayofweek.filter(d => d !== day.value);
                          }
                          field.onChange(formValues.dayofweek);
                        }"
                      >{{ day.label }}</IonCheckbox>
                    </IonItem>
                  </div>
                </div>
                <ErrorMessage v-slot="{ message }" name="dayofweek">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <!-- Seção Status -->
          <div class="section-header">
            <h2>Status</h2>
          </div>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="status">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.status"
                    interface="alert"
                    placeholder="Selecione o status"
                    class="select-native"
                    @ionChange="(e) => { field.onChange(e.detail.value) }"
                  >
                    <IonSelectOption v-for="option in statusOptions" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Status</span></label>
                </div>
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

    <IonFooter>
      <IonToolbar>
        <IonGrid>
          <IonRow class="action-buttons-fixed">
            <IonCol size="6">
              <IonButton color="danger" expand="block" @click="resetForm">
                Cancelar
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton expand="block" type="submit" form="classroom-form" :disabled="!saveButtonEnabled">
                Salvar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  </IonPage>
</template>

<style scoped>
.page-title {
  font-weight: bold; color: var(--ion-color-secondary);
}

.toolbar-accent { 
  height: 4px; 
  background-color: var(--ion-color-primary); 
}

.section-header {
  margin-top: 24px;
  margin-bottom: 16px;
}

.section-header h2 {
  color: var(--ion-color-secondary);
  font-size: 1.1rem;
  font-weight: 600;
  border-bottom: 1px solid rgba(var(--ion-color-secondary-rgb), 0.3);
  padding-bottom: 8px;
}

.content-with-footer { 
  padding-bottom: 80px; 
}

.floating-input { 
  position: relative; 
  border: 1px solid var(--ion-color-primary); 
  border-radius: 4px; 
  margin-top: 16px; 
  height: 56px; 
}

.floating-native { 
  width: 100%; 
  height: 100%; 
  padding: 0 16px; 
  border: none; 
  outline: none; 
  background: transparent; 
  font-size: 1rem; 
  color: var(--ion-color-dark-tint); 
  display: flex; 
  align-items: center; 
}

.floating-native::placeholder { 
  color: transparent; 
}

.select-input {
  display: flex;
  align-items: center;
  padding: 0;
}

.select-native {
  width: 100%;
  max-width: 100%;
  --padding-start: 16px;
  --padding-end: 16px;
}

.time-input {
  display: flex;
  align-items: center;
}

.datetime-native {
  width: 100%;
  padding: 0 16px;
}

.checkbox-item {
  --background: transparent;
  --padding-start: 0;
  margin-top: 8px;
}

.days-selection {
  margin-top: 16px;
}

.days-label {
  color: var(--ion-color-medium-shade);
  font-size: 1rem;
  margin-bottom: 8px;
  display: block;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
}

.floating-label { 
  position: absolute; 
  top: 50%; 
  left: 16px; 
  transform: translateY(-50%); 
  background: white; 
  padding: 0 4px; 
  font-size: 1rem; 
  pointer-events: none; 
  transition: 0.2s ease all; 
  color: var(--ion-color-medium-shade); 
}

.top-label { 
  top: 8px; 
  transform: translateY(0); 
}

.floating-native:focus + .floating-label, 
.floating-native:not(:placeholder-shown) + .floating-label, 
.select-native:not(.select-placeholder) + .floating-label,
.datetime-native:not(.datetime-placeholder) + .floating-label {
  top: -8px; 
  transform: translateY(0); 
  font-size: 0.75rem; 
  color: var(--ion-color-primary); 
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

.action-buttons-fixed { 
  margin: 0; 
  padding: 8px; 
}
</style>
