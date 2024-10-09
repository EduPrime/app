<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import ClassroomService from '../services/ClassroomService'
import SchoolService from '../services/SchoolService'
import SeriesService from '../services/SeriesService'
import InstitutionService from '../services/InstitutionService'
import CourseService from '../services/CourseService'
import TeacherService from '@/modules/school-teacher-management/services/TeacherService'
import { hundredYearsAgo } from '@/utils/hundred-years-ago'
import { isValidDDD } from '@/utils/ddd-validator'
import EpInput from '@/components/EpInput.vue'
import EpTextarea from '@/components/EpTextarea.vue'
import showToast from '@/utils/toast-alert'
import { toastController } from '@ionic/core'
import type { Tables } from '@/types/database.types'

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
const periods = ['Manhã', 'Tarde', 'Noite'];
const status = ['Ativo', 'Inativo', 'Graduado', 'Suspenso', 'Transferido'];
const day_of_weeks = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const classroomService = new ClassroomService()
const schoolService = new SchoolService()
const seriesService = new SeriesService()
const institutionService = new InstitutionService()
const teacherService = new TeacherService()
const courseService = new CourseService()
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
  institutionId: yup.string()
    .required('Instituição é obrigatória'),
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
      return originalValue.trim() === '' ? null : value;
    }
    // Se não for uma string (como undefined, null, number), apenas retorna o valor original
    return originalValue;
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
      return originalValue.trim() === '' ? null : value;
    }
    // Se não for uma string (como undefined, null, number), apenas retorna o valor original
    return originalValue;
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

const { values, errors, validate, setFieldValue } = useForm<ClassPartial>({
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
      nameClass: values.nameClass,
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
    ]);

    console.log('Chegou', institutions);

    // Função auxiliar para mapear os dados
    const mapData = (data, targetList) => {
      if (data) {
        targetList.value = data.map(item => ({
          id: item.id,
          name: item.name,
          period: item.period,
          status: item.status,
          day_of_week: item.day_of_week,
        }));
      }
    };

    mapData(institutions, institutionList);
    mapData(schools, schoolList);
    mapData(courses, courseList);
    mapData(teachers, teacherList);
    mapData(series, seriesList);
    mapData(classrooms, classroomList);

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}


//* * Mask Inputs
const phoneMask = ref(['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/])

async function getClassData() {
  if (classId.value) {
    const classDbData = await classroomService.getById(classId.value)
    if (classDbData) {
        institutionId.value = classDbData.institution_id,
        schoolId.value = classDbData.school_id,
        courseId.value = classDbData.course_id,
        seriesId.value = classDbData.series_id,
        teacherId.value = classDbData.teacher_id,
        setFieldValue('name', classDbData.name),
        setFieldValue('institutionId', classDbData.institutionId),
        setFieldValue('institution', classDbData.institution_id),
        setFieldValue('course', classDbData.course_id),
        setFieldValue('school_id', classDbData.school_id),
        setFieldValue('series_id', classDbData.series_id),
        setFieldValue('teacher', classDbData.teacher_id),
        setFieldValue('schoolId', classDbData.schoolId),
        setFieldValue('courseId', classDbData.courseId),
        setFieldValue('seriesId', classDbData.seriesId),
        setFieldValue('teacherId', classDbData.teacherId),
        setFieldValue('nameClass', classDbData.nameClass),
        setFieldValue('abbreviation', classDbData.abbreviation),
        setFieldValue('year', classDbData.year),
        setFieldValue('status', classDbData.status),
        setFieldValue('maxStudents', classDbData.maxStudents),
        setFieldValue('startTime', classDbData.startTime),
        setFieldValue('startTimeInterval', classDbData.startTimeInterval),
        setFieldValue('endTimeInterval', classDbData.endTimeInterval),
        setFieldValue('endTime', classDbData.endTime),
        setFieldValue('day_of_week', classDbData.day_of_week),
        setFieldValue('period', classDbData.period)
    }
    else {
      console.error(`Dados da escola não encontrados para o ID: ${classId.value}`)
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
  if (classId.value) {
    await getClassData()
    if (institutionId.value) setFieldValue('institutionId', institutionId.value)
    if (schoolId.value) setFieldValue('schoolId', schoolId.value)
    if (courseId.value) setFieldValue('courseId', courseId.value)
    if (seriesId.value) setFieldValue('seriesId', seriesId.value)
    if (teacherId.value) setFieldValue('teacherId', teacherId.value)
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
      <ion-item>
        <IonSelect
          v-model="values.status"
          justify="space-between"
          label="Tipo de Turma*"
          placeholder="Selecione o tipo de turma"
          @ionChange="(e) => setFieldValue('status', e.target.value)"
        >
          <IonSelectOption v-for="status in status" :key="status" :value="status">
            {{ status }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
    <EpInput v-model="values.maxStudents" name="maxStudents" label="Máximo de Alunos*" type="number" placeholder="Digite o número máximo de alunos" />
    
    
    <ion-list id="institutionList">
      <ion-item>
        <IonSelect
          v-model="institutionId"
          justify="space-between"
          label="Instituição*"
          placeholder="Selecione a instituição"
          @ionChange="(e) => {
            setFieldValue('institutionId', e.detail.value)
          }"
          
        >
          <IonSelectOption v-for="institution in institutionList" :key="institution.id" :value="institution.id">
            {{ institution.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
    <ion-list id="schoolList">
      <ion-item>
        <IonSelect
          v-model="schoolId"
          justify="space-between"
          label="Escola*"
          placeholder="Selecione a escola"
          @ionChange="(e) => {
            setFieldValue('schoolId', e.detail.value)
          }"
          
        >
          <IonSelectOption v-for="school in schoolList" :key="school.id" :value="school.id">
            {{ school.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
    <ion-list id="courseList">
      <ion-item>
        <IonSelect
          v-model="courseId"
          justify="space-between"
          label="Curso*"
          placeholder="Selecione o curso"
          @ionChange="(e) => {
            setFieldValue('courseId', e.detail.value)
          }"
          
        >
          <IonSelectOption v-for="course in courseList" :key="course.id" :value="course.id">
            {{ course.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
    <ion-list id="seriesList">
      <ion-item>
        <IonSelect
          v-model="seriesId"
          justify="space-between"
          label="Série*"
          placeholder="Selecione a série"
          @ionChange="(e) => {
            setFieldValue('seriesId', e.detail.value)
          }"
          
        >
          <IonSelectOption v-for="series in seriesList" :key="series.id" :value="series.id">
            {{ series.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
    <ion-list id="teacherList">
      <ion-item>
        <IonSelect
          v-model="teacherId"
          justify="space-between"
          label="Professor*"
          placeholder="Selecione o professor"
          @ionChange="(e) => {
            setFieldValue('teacherId', e.detail.value)
          }"
          
        >
          <IonSelectOption v-for="teacher in teacherList" :key="teacher.id" :value="teacher.id">
            {{ teacher.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
  </div>
  <div v-show="selectedSegment === 'class-info'">
    <EpInput v-model="values.startTime" name="startTime" label="Hora Inicial" type="time" placeholder="Digite a hora inicial" />
    <EpInput v-model="values.startTimeInterval" name="startTimeInterval" label="Intervalo Inicial" type="time" placeholder="Digite o intervalo inicial" />
    <EpInput v-model="values.endTimeInterval" name="endTimeInterval" label="Intervalo Final" type="time" placeholder="Digite o intervalo final" />
    <EpInput v-model="values.endTime" name="endTime" label="Hora Final" type="time" placeholder="Digite a hora final" />
    <ion-list id="daysOfWeek">
      <ion-item>
        <IonSelect
          v-model="values.day_of_week"
          multiple
          justify="space-between"
          label="Dias da Semana"
          placeholder="Selecione os dias da semana"
          @ionChange="(e) => setFieldValue('day_of_week', e.target.value)"
        >
          <IonSelectOption v-for="day_of_week in day_of_weeks" :key="day_of_week" :value="day_of_week">
            {{ day_of_week }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
    <ion-list id="periodList">
      <ion-item>
        <IonSelect
          v-model="values.period"
          justify="space-between"
          label="Turno"
          placeholder="Selecione o turno"
          @ionChange="(e) => setFieldValue('period', e.target.value)"
        >
          <IonSelectOption v-for="period in periods" :key="period" :value="period">
            {{ period }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

  </div>
</template>
