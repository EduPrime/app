<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import EpInput from '@/components/EpInput.vue'
import ClassroomService from '@/modules/school-management/services/ClassroomService'
import CourseService from '@/modules/school-management/services/CourseService'
import SchoolService from '@/modules/school-management/services/SchoolService'
import SeriesService from '@/modules/school-management/services/SeriesService'
import EnrollmentService from '@/modules/student-management/services/EnrollmentService'
import showToast from '@/utils/toast-alert'
import { IonLabel, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import StudentService from '../services/StudentService'

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
const enrollmentData = ref<Tables<'enrollment'> | []>([])
const gender = ['Masculino', 'Feminino']
const status = ['Ativo', 'Inativo']
const situation = ['Pendente', 'Cursando', 'Aprovado', 'Aprovado pelo Conselho', 'Aprovado com Dependência', 'Reprovado', 'Transferido', 'Abandono', 'Falecido']
const residence_zone = ['Urbana', 'Rural']
const marital_status = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Separado', 'União Estável', 'Não Informado']
const selectedSegment = ref('general-info')
const classroomService = new ClassroomService()
const enrollmentService = new EnrollmentService()
const schoolService = new SchoolService()
const studentService = new StudentService()
const seriesService = new SeriesService()
const courseService = new CourseService()
const classroomList = ref()
const currentYear = 2025
const minDate = `${currentYear}-01-01`
const maxDate = `${currentYear}-12-31`
function enforceYear() {
  const selectedDate = new Date(values.date_enrollment)
  if (selectedDate.getFullYear() !== currentYear) {
    setFieldValue('dateEnrollment', `${currentYear}-01-01`)
  }
}
const searchQuery = ref('')
const schoolList = ref()
const studentList = ref()
const enrollmentCode = ref('')
const seriesList = ref()
const courseList = ref()
const enrollmentId = computed(() => route.currentRoute.value.params.id) as { value: string }
const formSchema = yup.object({
  dateEnrollment: yup.date()
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
  // status: yup.string()
  // .required('Status é obrigatório'),
  situation: yup.string()
    .required('Situação é obrigatória'),
  // studentId: yup.string()
  //   .required('Aluno é obrigatória'),
  courseId: yup.string()
    .required('Curso é obrigatório'),
  name: yup.string()
    .required('Aluno não selecionado ou não cadastrado'),
})

const { values, errors, validate, setFieldValue } = useForm<any>({
  validationSchema: formSchema,
})

async function registerEnrollment() {
  const validationResult = await validate()

  if (!validationResult.valid) {
    const displayErrors = Object.values(errors.value).join(', ')
    showToast(displayErrors, 'top', 'warning')
  }
  else {
    try {
      // Garante que o código de matrícula seja único antes de salvar
      if (!enrollmentId.value) {
        await ensureUniqueEnrollmentCode()
      }

      const formData = {
        schoolId: schoolId.value,
        classroomId: classroomId.value,
        seriesId: seriesId.value,
        studentId: studentId.value,
        courseId: courseId.value,
        dateEnrollment: values.dateEnrollment,
        observations: values.observations,
        name: values.name,
        status: values.status,
        situation: values.situation,
        enrollmentCode: enrollmentCode.value,
      }

      let result
      if (enrollmentId.value) {
        result = await enrollmentService.update(enrollmentId.value, formData)
        if (result) {
          showToast('Matrícula atualizada com sucesso')
          setTimeout(() => {
            router.push('/Student/enrollment').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
      else {
        result = await tryCreateEnrollment(formData)
        if (result) {
          showToast('Matrícula realizada com sucesso!', 'top', 'success')
          setTimeout(() => {
            router.push('/Student/enrollment').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
    }
    catch (error) {
      console.error('Erro ao salvar matrícula:', error)
      showToast('Erro ao realizar matrícula. Tente novamente.', 'top', 'danger')
    }
  }
}

// Função que tenta criar a matrícula, garantindo unicidade do código
async function tryCreateEnrollment(formData: any) {
  try {
    return await enrollmentService.create(formData)
  }
  catch (error: any) {
    // Se o erro for de duplicidade de código, tenta gerar um novo código
    if (error.code === '23505' && error.details?.includes('enrollmentCode')) {
      console.warn('Código de matrícula duplicado detectado. Tentando gerar um novo código...')
      await ensureUniqueEnrollmentCode() // Gera um novo código
      formData.enrollmentCode = enrollmentCode.value // Atualiza o código no formData
      return tryCreateEnrollment(formData) // Tenta novamente
    }
    throw error // Se for outro erro, lança o erro original
  }
}

// Função que garante que o código seja único ANTES de tentar salvar no banco
async function ensureUniqueEnrollmentCode() {
  let isUnique = false
  let attempts = 0 // Limitar o número de tentativas para evitar loops infinitos

  while (!isUnique && attempts < 10) {
    // Gera um novo código aleatório
    await generateCodeEnrollment()
    // Verifica se o código já existe
    isUnique = await enrollmentService.isUniqueEnrollmentCode(enrollmentCode.value)
    attempts++
  }

  if (!isUnique) {
    throw new Error('Não foi possível gerar um código de matrícula único após várias tentativas.')
  }
}

async function loadStudents() {
  try {
    const [students, enrollments] = await Promise.all([
      studentService.getAll(),
      enrollmentService.getAll(),
    ])

    const enrolledStudentIds = enrollments ? enrollments.map(enrollment => enrollment.student_id) : []

    studentList.value = (students ?? []).map(student => ({
      ...student,
      enrolled: enrolledStudentIds.includes(student.id),
    }))
    filteredStudents.value = studentList.value // Inicialmente, todos os alunos estão filtrados
  }
  catch (error) {
    console.error('Erro ao carregar os alunos:', error)
  }
}

const filteredStudents = ref<{ id: string, name: string, enrolled: boolean }[]>([])

watch(searchQuery, (newQuery) => {
  const query = newQuery.toLowerCase()
  if (query.length >= 3) {
    filteredStudents.value = studentList.value.filter((student: any) =>
      student.name.toLowerCase().includes(query),
    ).slice(0, 5) // Limita a 5 resultados
  }
  else {
    filteredStudents.value = [] // Se a consulta estiver vazia, limpa a lista filtrada
  }
})

function selectStudent(student: any) {
  studentId.value = student.id

  if (!enrollmentId.value) { // Somente limpa o código de matrícula se for uma nova matrícula
    enrollmentCode.value = '' // Limpa o código de matrícula
    // generateCodeEnrollment()  // Gera um novo código de matrícula
  }
  searchQuery.value = ''
  setFieldValue('name', student.name)
  searchQuery.value = ''
}

async function loadEnrollment() {
  try {
    const [schools, classrooms, students, series, courses] = await Promise.all([
      schoolService.getAll(),
      classroomService.getAll(),
      studentService.getAll(),
      seriesService.getAll(),
      courseService.getAll(),
      enrollmentService.getAll(),
    ])
    console.log('Chegou', students)

    // Função auxiliar para mapear os dados
    const mapData = (data: any, targetList: any) => {
      if (data) {
        targetList.value = data.map((item: any) => ({
          id: item.id,
          name: item.name,
        }))
      }
    }

    mapData(schools, schoolList)
    mapData(classrooms, classroomList)
    mapData(students, studentList)
    mapData(series, seriesList)
    mapData(courses, courseList)
  }
  catch (error) {
    console.error('Erro ao carregar dados:', error)
    showToast('Erro ao carregar dados. Verifique sua conexão e tente novamente.', 'top', 'danger')
  }
}

async function getEnrollmentData() {
  if (enrollmentId.value) {
    const enrollmentDbData = await enrollmentService.getById(enrollmentId.value)
    if (enrollmentDbData) {
      schoolId.value = enrollmentDbData.schoolId
      classroomId.value = enrollmentDbData.classroomId
      seriesId.value = enrollmentDbData.seriesId
      studentId.value = enrollmentDbData.studentId
      courseId.value = enrollmentDbData.courseId
      enrollmentCode.value = enrollmentDbData.enrollmentCode ?? ''
      setFieldValue('dateEnrollment', enrollmentDbData.dateEnrollment)
      setFieldValue('observations', enrollmentDbData.observations)
      setFieldValue('schoolId', enrollmentDbData.schoolId)
      setFieldValue('seriesId', enrollmentDbData.seriesId)
      setFieldValue('classroomId', enrollmentDbData.classroomId)
      setFieldValue('studentId', enrollmentDbData.studentId)
      setFieldValue('courseId', enrollmentDbData.courseId)
      setFieldValue('name', enrollmentDbData.name)
      setFieldValue('status', enrollmentDbData.status)
      setFieldValue('situation', enrollmentDbData.situation)
      setFieldValue('enrollmentCode', enrollmentDbData.enrollmentCode)

      const student = await studentService.getById(enrollmentDbData.studentId)
      if (student) {
        setFieldValue('name', student.name)
        searchQuery.value = ''
      }
    }
    else {
      console.error(`Dados da matricula não encontrados para o ID: ${enrollmentId.value}`)
    }
  }
}

// Gera um código de matrícula único
async function generateCodeEnrollment() {
  if (!studentId.value) {
    alert('Por favor, selecione o nome do aluno.')
    return
  }

  const lettersRandom = Array.from({ length: 3 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('')
  const numbersRandom = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join('')
  const currentYear = new Date().getFullYear()
  enrollmentCode.value = `MAT-${lettersRandom}${numbersRandom}-${currentYear}`
}

watch(studentId, (newValue) => {
  if (!enrollmentCode.value && !enrollmentId.value) { // Gera código apenas para novas matrículas
    // generateCodeEnrollment()
  }
})

// Carregamento diferido para séries, turmas e cursos
watch(schoolId, async (newSchoolId) => {
  if (newSchoolId) {
    try {
      classroomList.value = await classroomService.getBySchoolId(newSchoolId)
      seriesList.value = await seriesService.getBySchoolId(newSchoolId)
      courseList.value = await courseService.getBySchoolId(newSchoolId)
    }
    catch (error) {
      console.error('Erro ao carregar turmas e séries para o escritório:', error)
      showToast('Erro ao carregar dados. Tente novamente.', 'top', 'danger')
    }
  }
  else {
    classroomList.value = []
    seriesList.value = []
    courseList.value = []
  }
})

onMounted(async () => {
  const defaultDate = `${currentYear}-01-01`
  setFieldValue('date_enrollment', defaultDate)
  await loadEnrollment()
  await loadStudents()
  if (enrollmentId.value) {
    await getEnrollmentData()
    if (schoolId.value)
      setFieldValue('schoolId', schoolId.value)
    if (courseId.value)
      setFieldValue('courseId', courseId.value)
    if (seriesId.value)
      setFieldValue('seriesId', seriesId.value)
    if (classroomId.value)
      setFieldValue('classroomId', classroomId.value)
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
    <ion-list v-if="!enrollmentId" id="studentList">
      <IonSearchbar v-model="searchQuery" placeholder="Pesquise o aluno..." :animated="true" :debounce="400" />
    </ion-list>

    <!-- Renderiza a lista de alunos apenas se houver resultados -->
    <div v-if="searchQuery.length >= 3 && filteredStudents.length > 0">
      <ul class="list-container">
        <li v-for="student in filteredStudents" :key="student.id" class="list-item"
          :class="{ 'enrolled-item': student.enrolled }" :title="student.enrolled ? 'Aluno já matriculado' : ''"
          @click="!student.enrolled && selectStudent(student)">
          {{ student.name }}
          <span v-if="student.enrolled" class="enrolled-label">(Já matriculado)</span>
        </li>
      </ul>
    </div>

    <ion-item>
      <IonLabel position="stacked" color="medium">
        Nome do Aluno (Somente Leitura):
      </IonLabel>
      <ion-input v-model="values.name" type="text" placeholder="Aluno Matriculado" readonly :disabled="true"
        class="readonly-input" />
    </ion-item>

    <ion-list id="schoolList">
      <ion-item>
        <IonSelect v-model="schoolId" justify="space-between" label="Escola*" placeholder="Selecione a escola"
          @ion-change="(e) => {
            setFieldValue('schoolId', e.detail.value)
          }">
          <IonSelectOption v-for="school in schoolList" :key="school.id" :value="school.id">
            {{ school.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <ion-list v-if="schoolId" id="courseList">
      <ion-item>
        <IonSelect v-model="courseId" justify="space-between" label="Curso*" placeholder="Selecione o curso"
          @ion-change="(e) => {
            setFieldValue('courseId', e.detail.value)
          }">
          <IonSelectOption v-for="course in courseList" :key="course.id" :value="course.id">
            {{ course.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <ion-list v-if="schoolId" id="seriesList">
      <ion-item>
        <IonSelect v-model="seriesId" justify="space-between" label="Série*" placeholder="Selecione a série"
          @ion-change="(e) => {
            setFieldValue('seriesId', e.detail.value)
          }">
          <IonSelectOption v-for="series in seriesList" :key="series.id" :value="series.id">
            {{ series.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <ion-list v-if="schoolId" id="classroomList">
      <ion-item>
        <IonSelect v-model="classroomId" justify="space-between" label="Turma*" placeholder="Selecione a turma"
          @ion-change="(e) => {
            setFieldValue('classroomId', e.detail.value)
          }">
          <IonSelectOption v-for="classroom in classroomList" :key="classroom.id" :value="classroom.id">
            {{ classroom.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <EpInput v-model="values.dateEnrollment" name="dateEnrollment" label="Data da Matrícula*" type="date" :max="maxDate"
      :min="minDate" placeholder="Digite a data de matrícula" @change="enforceYear" />

    <!-- <ion-list id="status">
      <ion-item>
        <IonSelect
        v-model="values.status"
        justify="space-between"
        label="Status da Matrícula*"
        placeholder="Selecione o status"
        @ionChange="(e) => {
          setFieldValue('status', e.detail.value)
        }"

            >
            <IonSelectOption v-for="status in status" :key="status" :value="status">
              {{ status }}
            </IonSelectOption>
          </IonSelect>
        </ion-item>
      </ion-list> -->

    <ion-list id="situation">
      <ion-item>
        <IonSelect v-model="values.situation" justify="space-between" label="Situação da Matrícula*"
          placeholder="Selecione a situação" @ion-change="(e) => {
            setFieldValue('situation', e.detail.value)
          }">
          <IonSelectOption v-for="situation in situation" :key="situation" :value="situation">
            {{ situation }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <ion-item>
      <IonLabel position="stacked" color="medium">
        Código de Matrícula (Somente Leitura):
      </IonLabel>
      <ion-input v-model="enrollmentCode" type="text" placeholder="Código gerado após finalizar a matrícula"
        :disabled="true" readonly class="readonly-input" />
    </ion-item>

    <EpInput v-model="values.observations" name="observations" label="Observações"
      placeholder="Digite observações sobre a matrícula" />
  </div>
</template>

<style scoped>
.readonly-item {
  --background: #e0e0e0;
  /* Cor de fundo mais clara para o item */
  border: 1px solid #d1d1d1;
  /* Borda para destacar */
  border-radius: 8px;
  /* Bordas arredondadas */
}

.readonly-input {
  --background: transparent;
  pointer-events: none;
  /* Desativa interações no campo */
}

ion-searchbar {
  --background: var(--ion-color-light);
}

/* Contêiner da lista */
.list-container {
  max-height: 200px;
  /* Altura máxima da lista */
  overflow-y: auto;
  /* Adiciona rolagem quando necessário */
  background-color: var(--ion-color-light);
  /* Cor de fundo */
  border: 1px solid #d1d1d1;
  /* Borda para definir a lista */
  border-radius: 8px;
  /* Bordas arredondadas */
  padding: 0;
  margin-top: 8px;
  /* Pequeno espaço entre a searchbar e a lista */
}

/* Cada item da lista */
.list-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #d1d1d1;
  /* Linha separadora entre os itens */
}

/* Efeito de hover para os itens */
.list-item:hover {
  background-color: var(--ion-color-primary);
  color: white;
}

/* Remove a borda do último item */
.list-item:last-child {
  border-bottom: none;
}

/* Estilo para os alunos matriculados */
.enrolled-item {
  background-color: #e0e0e0;
  /* Cor de fundo diferente */
  color: #757575;
  /* Cor de texto desabilitada */
  cursor: not-allowed;
  /* Cursor de n�o permitido */
}

.enrolled-label {
  font-size: 0.85rem;
  color: red;
  /* Texto em vermelho para indicar a matr�cula */
  margin-left: 8px;
}
</style>
