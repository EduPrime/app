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
const series_Id = ref('')
const school_Id = ref('')
const classData = ref< Tables<'classroom'> | []>([])
const selectedSegment = ref('general-info')
const classList = ref<{ id: string, name: string }[]>([])
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
  year: yup.string()
  .required('Ano é obrigatório'),
  institution: yup.string()
  .required('Instituição é obrigatória'),
  school: yup.string()
  .required('Escola é obrigatória'),
  course: yup.string()
  .required('Curso é obrigatório'),
  serie: yup.string()
  .required('Série é obrigatória'),
  teacher: yup.string()
  .optional(),
  typeClass: yup.string()
  .required('Tipo de turma é obrigatório'),
  nameClass: yup.string()
  .required('Nome da turma é obrigatório'),
  abbreviation: yup.string()
  .optional(),
  maxStudents: yup.number()
  .required('Máximo de alunos é obrigattório')
  .positive('O número máximo de alunos deve ser positivo')
  .integer('O número máximo de alunos deve ser um número inteiro'),
  startTime: yup.string()
  .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora inicial deve estar no formato hh:mm')
  .required('Hora inicial é obrigatória'),
  startTimeInterval: yup.string()
  .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora inicial do intervalo deve estar no formato hh:mm')
  .required('Hora inicial do intervalo é obrigatória'),
  timeEndInterval: yup.string()
  .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora final do intervalo deve estar no formato hh:mm')
  .required('Hora final do intervalo é obrigatória'),
  endTime: yup.string()
  .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora final deve estar no formato hh:mm')
  .required('Hora final é obrigatória'),
  daysOfWeek: yup.string()
  .optional(),
  turn: yup.string()
  .required('Turno é obrigatório'),
  
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
      series_id: series_Id.value,
      school_id: school_Id.value,
      nameClass: values.nameClass,
      abbreviation: values.abbreviation,
      year: values.year,
      institution: values.institution,
      school: values.school,
      course: values.course,
      teacher: values.teacher,
      typeClass: values.typeClass,
      maxStudents: values.maxStudents,
      startTime: values.startTime,
      startTimeInterval: values.startTimeInterval,
      endTimeInterval: values.endTimeInterval,
      endTime: values.endTime,
      daysOfWeek: values.daysOfWeek,
      turn: values.turn,

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
const institutionId = computed({
  get: () => values.institution,
  set: newValue => setFieldValue('institution', newValue),
})
function handleSchoolChange(event: { detail: { value: string } }) {
  setFieldValue('name', event.detail.value)
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
        setFieldValue('nameClass', classDbData.nameClass),
        setFieldValue('school_Id', classDbData.school_Id),
        setFieldValue('series_Id', classDbData.series_Id),
        setFieldValue('abbreviation', classDbData.abbreviation),
        setFieldValue('year', classDbData.year),
        setFieldValue('institution', classDbData.institution),
        setFieldValue('course', classDbData.course),
        setFieldValue('teacher', classDbData.teacher),
        setFieldValue('typeClass', classDbData.typeClass),
        setFieldValue('maxStudents', classDbData.maxStudents),
        setFieldValue('startTime', classDbData.startTime),
        setFieldValue('startTimeInterval', classDbData.startTimeInterval),
        setFieldValue('endTimeInterval', classDbData.endTimeInterval),
        setFieldValue('endTime', classDbData.endTime),
        setFieldValue('daysOfWeek', classDbData.daysOfWeek),
        setFieldValue('turn', classDbData.turn)
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
  school_Id.value = (await schoolService.getAll())?.at(0)?.id
  series_Id.value = (await seriesService.getAll())?.at(0)?.id
  await loadClassroom()
  if (classId.value) {
    await getClassData()
  }
})

// onMounted(async () => {
//   await loadClassroom()
//   if (classId.value) {
//     await getClassData()
//   }
// })
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
        Infor. de funcionamento da turma
      </IonLabel>
    </IonSegmentButton>
  </IonSegment>
  <div v-show="selectedSegment === 'general-info'">
    <EpInput v-model="values.nameClass" name="nameClass" label="Nome da Turma*" placeholder="Digite o nome da turma" />
    <EpInput v-model="values.abbreviation" name="abbreviation" label="Abreviação" placeholder="Digite a abreviação" />
    <EpInput v-model="values.year" name="year" label="Ano*" type="number" placeholder="Digite o ano" />
    <ion-list id="periodList">
      <ion-item>
        <IonSelect
          v-model="classId"
          justify="space-between"
          label="Tipo de Turma"
          placeholder="Selecione o tipo de turma"
          @ion-change="handleSchoolChange"
        >
          <IonSelectOption v-for="classroom in classroomList" :key="classroom.id" :value="classroom.id">
            {{ classroom.status }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
    <EpInput v-model="values.maxStudents" name="maxStudents" label="Máximo de Alunos" type="number" placeholder="Digite o número máximo de alunos" />
    
    
    <ion-list id="institutionList">
      <ion-item>
        <IonSelect
          v-model="classId"
          justify="space-between"
          label="Instituição*"
          placeholder="Selecione a instituição"
          @ion-change="handleSchoolChange"
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
          v-model="classId"
          justify="space-between"
          label="Escola*"
          placeholder="Selecione a escola"
          @ion-change="handleSchoolChange"
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
          v-model="classId"
          justify="space-between"
          label="Curso*"
          placeholder="Selecione o curso"
          @ion-change="handleSchoolChange"
        >
          <IonSelectOption v-for="course in courseList" :key="course.id" :value="course.id">
            {{ course.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
    <ion-list id="courseList">
      <ion-item>
        <IonSelect
          v-model="classId"
          justify="space-between"
          label="Série*"
          placeholder="Selecione a série"
          @ion-change="handleSchoolChange"
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
          v-model="classId"
          justify="space-between"
          label="Professor"
          placeholder="Selecione o professor"
          @ion-change="handleSchoolChange"
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
    <EpInput v-model="values.daysOfWeek" name="daysOfWeek" label="Dias da Semana" placeholder="Digite os dias da semana" />
    <ion-list id="periodList">
      <ion-item>
        <IonSelect
          v-model="classId"
          justify="space-between"
          label="Turno"
          placeholder="Selecione o turno"
          @ion-change="handleSchoolChange"
        >
          <IonSelectOption v-for="classroom in classroomList" :key="classroom.id" :value="classroom.id">
            {{ classroom.period }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

  </div>
</template>
