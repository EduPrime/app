<script setup lang="ts">
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonItem,
  IonDatetime,
  IonLabel,
} from '@ionic/vue'
import { schoolOutline } from 'ionicons/icons'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import ClassroomService from '../../services/ClassroomService'
import SeriesService from '../../services/SeriesService'
import SchoolService from '../../services/SchoolService'
import type { Series, School } from '@prisma/client'

const props = defineProps<{
  editId?: string
}>()

const emits = defineEmits<{
  (e: 'saved'): void
  (e: 'cancel'): void
  (e: 'error', message: string, color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark'): void
}>()

const classroomService = new ClassroomService()
const seriesService = new SeriesService()
const schoolService = new SchoolService()

const seriesList = ref<Series[]>([])
const schoolList = ref<School[]>([])

const dayOfWeekOptions = [
  { value: 'monday', label: 'Segunda-feira' },
  { value: 'tuesday', label: 'Terça-feira' },
  { value: 'wednesday', label: 'Quarta-feira' },
  { value: 'thursday', label: 'Quinta-feira' },
  { value: 'friday', label: 'Sexta-feira' },
  { value: 'saturday', label: 'Sábado' },
  { value: 'sunday', label: 'Domingo' },
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

  const regexTime = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
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
  { value: 'NIGHT', label: 'Noite' },
  { value: 'FULLTIME', label: 'Integral' },
]

const regimeTypeOptions = [
  { value: 'Presencial', label: 'Presencial' },
  { value: 'Remoto', label: 'Remoto' },
  { value: 'Hibrido', label: 'Híbrido' },
]

const statusOptions = [
  { value: 'ACTIVE', label: 'Ativo' },
  { value: 'INACTIVE', label: 'Inativo' },
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
})

const originalFormValues = ref({ ...formValues.value })

const hasChanges = ref(false)
const isEditing = computed(() => Boolean(props.editId))
const modalTitle = computed(() => isEditing.value ? 'Editar turma' : 'Nova turma')

async function loadDependencies() {
  try {
    const seriesData = await seriesService.getAll()
    seriesList.value = seriesData || []

    const schoolData = await schoolService.getAll()
    schoolList.value = schoolData || []
  } catch (error) {
    console.error('Erro ao carregar dependências:', error)
  }
}

const saveButtonEnabled = computed(() => {
  if (!isEditing.value) {
    const enabled = !!formValues.value.name || !!formValues.value.abbreviation || 
                   !!formValues.value.seriesId || !!formValues.value.schoolId ||
                   !!formValues.value.maxStudents || !!formValues.value.year ||
                   !!formValues.value.period || !!formValues.value.regimeType ||
                   formValues.value.dayofweek.length > 0
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
        if (!time) return ''
        return new Date(time).toISOString()
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
      }

      formValues.value = { ...loadedValues }
      originalFormValues.value = { ...loadedValues }
      hasChanges.value = false
    }
  }
  else {
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
      year: '',
      isMultiSerialized: false,
      schoolId: '',
    }
    originalFormValues.value = { ...formValues.value }
    hasChanges.value = false
  }
})

async function handleSubmit(values: any) {
  const payload = {
    id: isEditing.value ? props.editId : undefined,
    name: values.name,
    abbreviation: values.abbreviation,
    seriesId: values.seriesId,
    maxStudents: values.maxStudents,
    exceededStudents: values.exceededStudents,
    totalStudents: values.totalStudents,
    pcdStudents: values.pcdStudents,
    startTime: values.startTime ? new Date(values.startTime) : null,
    startTimeInterval: values.startTimeInterval ? new Date(values.startTimeInterval) : null,
    endTimeInterval: values.endTimeInterval ? new Date(values.endTimeInterval) : null,
    endTime: values.endTime ? new Date(values.endTime) : null,
    dayofweek: values.dayofweek,
    room: values.room,
    regimeType: values.regimeType,
    period: values.period,
    status: values.status,
    year: values.year,
    isMultiSerialized: values.isMultiSerialized,
    schoolId: values.schoolId,
  }

  try {
    await classroomService.upsertClassroom(payload)
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
          <!-- Seção: Informações Básicas -->
          <div class="section-header">
            <h3>Informações Básicas</h3>
          </div>
          
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="name" rules="required|min:3|max:180">
                <IonInput
                  v-bind="field"
                  v-model="formValues.name"
                  label="Nome da turma"
                  label-placement="stacked"
                  fill="outline"
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
              <Field v-slot="{ field, errors }" name="abbreviation" rules="max:10">
                <IonInput
                  v-bind="field"
                  v-model="formValues.abbreviation"
                  label="Abreviação"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite a abreviação"
                  :maxlength="10"
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
              <Field v-slot="{ field, errors }" name="seriesId" rules="required">
                <IonSelect
                  v-bind="field"
                  v-model="formValues.seriesId"
                  interface="alert"
                  label="Série"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Selecione uma série"
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
              <Field v-slot="{ field, errors }" name="schoolId">
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
                  <IonSelectOption v-for="school in schoolList" :key="school.id" :value="school.id">
                    {{ school.corporateName }}
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
              <Field v-slot="{ field, errors }" name="year" rules="required|checandoNumero">
                <IonInput
                  v-bind="field"
                  v-model="formValues.year"
                  type="text"
                  label="Ano"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o ano"
                  :class="{ 'has-error': errors.length > 0 }"
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
              <Field v-slot="{ field, errors }" name="period">
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
              <Field v-slot="{ field, errors }" name="room">
                <IonInput
                  v-bind="field"
                  v-model="formValues.room"
                  label="Sala"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o número/nome da sala"
                  :class="{ 'has-error': errors.length > 0 }"
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
              <Field v-slot="{ field, errors }" name="regimeType">
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
                  labelPlacement="end"
                >Turma multisseriada</IonCheckbox>
              </IonItem>
            </IonCol>
          </IonRow>

          <!-- Seção: Capacidade e Ocupação -->
          <div class="section-header">
            <h3>Capacidade e Ocupação</h3>
          </div>
          
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="maxStudents" rules="required|checandoNumero|min:1">
                <IonInput
                  v-bind="field"
                  v-model="formValues.maxStudents"
                  type="text"
                  label="Capacidade máxima"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite a capacidade máxima"
                  :class="{ 'has-error': errors.length > 0 }"
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
              <Field v-slot="{ field, errors }" name="totalStudents" rules="checandoNumero|min:0">
                <IonInput
                  v-bind="field"
                  v-model="formValues.totalStudents"
                  type="text"
                  label="Total de alunos"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o total de alunos"
                  :class="{ 'has-error': errors.length > 0 }"
                  :disabled="isEditing"
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
              <Field v-slot="{ field, errors }" name="exceededStudents" rules="checandoNumero|min:0">
                <IonInput
                  v-bind="field"
                  v-model="formValues.exceededStudents"
                  type="text"
                  label="Vagas excedidas"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o número de vagas excedidas"
                  :class="{ 'has-error': errors.length > 0 }"
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
              <Field v-slot="{ field, errors }" name="pcdStudents" rules="checandoNumero|min:0">
                <IonInput
                  v-bind="field"
                  v-model="formValues.pcdStudents"
                  type="text"
                  label="Alunos PCD"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o número de alunos PCD"
                  :class="{ 'has-error': errors.length > 0 }"
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

          <!-- Seção: Horários -->
          <div class="section-header">
            <h3>Horários</h3>
          </div>
            
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="startTime" rules="formatoHora">
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
              <Field v-slot="{ field, errors }" name="endTime" rules="formatoHora">
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
              <Field v-slot="{ field, errors }" name="startTimeInterval" rules="formatoHora">
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
                ></IonInput>
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
              <Field v-slot="{ field, errors }" name="endTimeInterval" rules="formatoHora">
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
                ></IonInput>
                <ErrorMessage v-slot="{ message }" name="endTimeInterval">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <!-- Dias da semana -->
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="dayofweek">
                <div class="days-selection">
                  <IonLabel class="ion-padding-start">Dias da semana</IonLabel>
                  <div class="days-grid">
                    <IonItem lines="none" class="checkbox-item" v-for="day in dayOfWeekOptions" :key="day.value">
                      <IonCheckbox 
                        :value="day.value"
                        :checked="formValues.dayofweek.includes(day.value)"
                        labelPlacement="end"
                        @ion-change="(e) => {
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
              </Field>
            </IonCol>
          </IonRow>

          <!-- Seção: Status -->
          <div class="section-header">
            <h3>Status</h3>
          </div>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="status">
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
