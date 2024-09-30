<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import ClassroomService from '@/modules/school-management/services/ClassroomService'
import SchoolService from '@/modules/school-management/services/SchoolService'
import SeriesService from '@/modules/school-management/services/SeriesService'
import EnrollmentService from '@/modules/student-management/services/EnrollmentService'
import CourseService from '@/modules/school-management/services/CourseService'
import StudentService from '../services/StudentService'
import { hundredYearsAgo } from '@/utils/hundred-years-ago'
import { isValidDDD } from '@/utils/ddd-validator'
import { isValidCPF } from '@/utils/cpf-validator'
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
  registerEnrollment,
})

const router = useRouter()
const route = useRouter()
const responsibleType = ref(null)
const valuesType = ref({
  father_name: '',
  father_cpf: '',
  father_email: '',
  father_phone: '',
  mother_name: '',
  mother_cpf: '',
  mother_email: '',
  mother_phone: '',
})
const schoolId = ref('')
const seriesId = ref('')
const studentId = ref('')
const classroomId = ref('')
const courseId = ref('')
const enrollmentData = ref< Tables<'enrollment'> | []>([])
const gender = ['Masculino', 'Feminino']
const status = ['ACTIVE', 'INACTIVE', 'GRADUATED', 'SUSPENDED', 'TRANSFERRED'];
const residence_zone = ['Urbana', 'Rural'];
const marital_status = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Separado', 'União Estável', 'Não Informado'];
const selectedSegment = ref('general-info')
const classroomService = new ClassroomService()
const enrollmentService = new EnrollmentService()
const schoolService = new SchoolService()
const studentService = new StudentService()
const seriesService = new SeriesService()
const courseService = new CourseService()
const classroomList = ref()
const schoolList = ref()
const studentList = ref()
const enrollmentCode = ref('')
const seriesList = ref()
const courseList = ref()
const enrollmentId = computed(() => route.currentRoute.value.params.id) as { value: string }
const formSchema = yup.object({
    year_enrollment: yup
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
  date_enrollment: yup.date()
    .required('Data de matrícula é obrigatória')
    .typeError('Data de matrícula inválida'),
  observations: yup.string()
  .nullable(),
  enrollmentCode: yup.string()
  .nullable(),
  schoolId: yup.string()
    .required('Escola é obrigatória'),
  classroomId: yup.string()
    .required('Turma é obrigatória'),
  seriesId: yup.string()
    .required('Série é obrigatória'),
  studentId: yup.string()
    .required('Aluno é obrigatória'),
  courseId: yup.string()
    .required('Curso é obrigatório'),
})

const { values, errors, validate, setFieldValue } = useForm<EnrollmentPartial>({
  validationSchema: formSchema,
})

async function registerEnrollment() {
  const validationResult = await validate()

  if (!validationResult.valid) {
    const displayErrors = Object.values(errors.value).join(', ')
    showToast(displayErrors, 'top', 'warning')
  }
  else {
    const formData = {
      school_id: schoolId.value,
      classroom_id: classroomId.value,
      series_id: seriesId.value,
      student_id: studentId.value,
      course_id: courseId.value,
      date_enrollment: values.date_enrollment,
      observations: values.observations,
      year_enrollment: values.year_enrollment,
      enrollmentCode: enrollmentCode.value,

    }
    try {
      let result
      if (enrollmentId.value) {
        result = await enrollmentService.update(enrollmentId.value, formData)
        if (result) {
          showToast('Matricula atualizada com sucesso')
          setTimeout(() => {
            router.push('/Student/enrollment').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
      else {
        result = await enrollmentService.create(formData)
        if (result) {
          showToast('Matricula realizada com sucesso!', 'top', 'success')
          setTimeout(() => {
            router.push('/Student/enrollment').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
    }
    catch (error) {
      console.error('Erro ao salvar matricula(a):', error)
      showToast('Erro ao realizar matricula. Tente novamente.', 'top', 'danger')
    }
  }
}

async function loadEnrollment() {
  try {
    const [schools, classrooms, students, series, courses] = await Promise.all([
      schoolService.getAll(),
      classroomService.getAll(),
      studentService.getAll(),
      seriesService.getAll(),
      courseService.getAll(),
    ]);

    console.log('Chegou', students);

    // Função auxiliar para mapear os dados
    const mapData = (data, targetList) => {
      if (data) {
        targetList.value = data.map(item => ({
          id: item.id,
          name: item.name,
        }));
      }
    };

    mapData(schools, schoolList);
    mapData(classrooms, classroomList);
    mapData(students, studentList);
    mapData(series, seriesList);
    mapData(courses, courseList);

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}


//* * Mask Inputs
const phoneMask = ref(['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/])
const postalCodeMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/])
const numberAddressMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/])
const cpfMask = ref([/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]);


async function getEnrollmentData() {
  if (enrollmentId.value) {
    const enrollmentDbData = await enrollmentService.getById(enrollmentId.value)
    if (enrollmentDbData) {
        schoolId.value = enrollmentDbData.school_id,
        classroomId.value = enrollmentDbData.classroom_id,
        seriesId.value = enrollmentDbData.series_id,
        studentId.value = enrollmentDbData.student_id,
        courseId.value = enrollmentDbData.course_id,
        enrollmentCode.value = enrollmentDbData.enrollmentCode,
        setFieldValue('date_enrollment', enrollmentDbData.date_enrollment),
        setFieldValue('year_enrollment', enrollmentDbData.year_enrollment),
        setFieldValue('observations', enrollmentDbData.observations),
        setFieldValue('school_id', enrollmentDbData.school_id),
        setFieldValue('schoolId', enrollmentDbData.schoolId),
        setFieldValue('seriesId', enrollmentDbData.seriesId),
        setFieldValue('classroom_id', enrollmentDbData.classroom_id),
        setFieldValue('classroomId', enrollmentDbData.classroomId),
        setFieldValue('studentId', enrollmentDbData.studentId),
        setFieldValue('courseId', enrollmentDbData.courseId),
        setFieldValue('enrollmentCode', enrollmentDbData.enrollmentCode)
    }
    else {
      console.error(`Dados da matricula não encontrados para o ID: ${enrollmentId.value}`)
    }
  }
}

const generateCodeEnrollment = () => {
  // Verifica se o código de matrícula já foi gerado
  if (enrollmentCode.value) {
    return; // Se já existir, não gera um novo
  }

  if (!studentId.value) {
    alert('Por favor, selecione o nome do aluno.');
    return;
  }

  // Gera um código de matrícula caso não exista
  const numbersRandom = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
  enrollmentCode.value = `MAT-${numbersRandom}`;
};


watch(studentId, (newValue) => {
  if (!enrollmentCode.value && !enrollmentId.value) {
  generateCodeEnrollment()
  }
})

function applyPhoneMask(phone: string | null): string {
  if (!phone)
    return ''
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

onMounted(async () => {
  await loadEnrollment()
  if (enrollmentId.value) {
    await getEnrollmentData()
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
    
    <ion-list id="studentList">
        <ion-item>
            <IonSelect
            v-model="studentId"
            justify="space-between"
            label="Aluno*"
            placeholder="Selecione o aluno"
            @ionChange="(e) => {
              setFieldValue('studentId', e.detail.value)
              generateCodeEnrollment()
            }"
            
          >
            <IonSelectOption v-for="student in studentList" :key="student.id" :value="student.id">
              {{ student.name }}
            </IonSelectOption>
          </IonSelect>
        </ion-item>
      </ion-list>
      
      <ion-item>
      <ion-input
      label="Código do Aluno:"
      v-model="enrollmentCode"
      type="text"
      placeholder="Código gerado automaticamente"
      readonly
    />
    </ion-item>

      <EpInput v-model="values.year_enrollment" name="year_enrollment" label="Ano*" type="number" placeholder="Digite o ano da Matricula" />

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
      
      <ion-list id="classroomList">
        <ion-item>
            <IonSelect
            v-model="classroomId"
            justify="space-between"
            label="Turma*"
            placeholder="Selecione a turma"
            @ionChange="(e) => {
              setFieldValue('classroomId', e.detail.value)
            }"
            
          >
            <IonSelectOption v-for="classroom in classroomList" :key="classroom.id" :value="classroom.id">
              {{ classroom.name }}
            </IonSelectOption>
          </IonSelect>
        </ion-item>
      </ion-list>
      
      <EpInput v-model="values.date_enrollment" name="date_enrollment" label="Data da Matrícula*" type="date" placeholder="Digite a data de matrícula" />
      <EpInput v-model="values.observations" name="observations" label="Observações" type="textarea" placeholder="Digite observações sobre a matrícula" />

    </div>
</template>
