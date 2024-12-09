<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import EpInput from '@/components/EpInput.vue'
import ClassroomService from '@/modules/school-management/services/ClassroomService'
import CourseService from '@/modules/school-management/services/CourseService'
import SchoolService from '@/modules/school-management/services/SchoolService'
import SeriesService from '@/modules/school-management/services/SeriesService'
import EnrollmentService from '@/modules/student-management/services/EnrollmentService'
import Pre_enrollmentService from '@/modules/student-management/services/Pre_enrollmentService'
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
  registerPre_enrollment,
})

const router = useRouter()
const route = useRouter()
const responsibleType = ref(null)
const valuesDeficiency = ref({
  deficiency_description: '',
})
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
const pre_enrollmentData = ref< Tables<'preenrollment'> | []>([])
const gender = ['Masculino', 'Feminino']
const status = ['Ativo', 'Inativo']
const situation = ['Pendente', 'Cursando', 'Aprovado', 'Aprovado pelo Conselho', 'Aprovado com Dependência', 'Reprovado', 'Transferido', 'Abandono', 'Falecido']
const residence_zone = ['Urbana', 'Rural']
const marital_status = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Separado', 'União Estável', 'Não Informado']
const ethnicity = ['Branca', 'Preta', 'Parda', 'Amarela', 'Indígena', 'Não declarada']
const deficiency = ['Visual', 'Auditiva', 'Física', 'Intelectual', 'Mental', 'Múltipla', 'Outros', 'Não possui']
const period = ['Manhã', 'Tarde', 'Noite']
const selectedSegment = ref('general-info')
const classroomService = new ClassroomService()
const enrollmentService = new EnrollmentService()
const pre_enrollmentService = new Pre_enrollmentService()
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
    setFieldValue('date_enrollment', `${currentYear}-01-01`)
  }
}
const searchQuery = ref('')
const schoolList = ref()
const studentList = ref()
const pre_enrollment_code = ref('')
const seriesList = ref()
const courseList = ref()
const pre_enrollmentId = computed(() => route.currentRoute.value.params.id) as { value: string }
const formSchema = yup.object({
  date_enrollment: yup.date()
    .required('Data de pré-matrícula é obrigatória')
    .typeError('Data de pré-matrícula inválida'),
  observations: yup.string()
    .nullable(),
  pre_enrollment_code: yup.string()
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
  gender: yup.string()
    .required('Gênero é obrigatório'),
  birthdate: yup.date()
    .required('Data de nascimento é obrigatória')
    .typeError('Data de nascimento inválida'),
  ethnicity: yup.string()
    .nullable()
    .required('Etnia é obrigatória'),
  deficiency: yup.string()
    .nullable()
    .required('Necessário informar se possui necessidades'),
  deficiency_description: yup.string()
    .nullable(),
  period: yup.string()
    .nullable()
    .required('Período é obrigatório'),
})

const { values, errors, validate, setFieldValue } = useForm<any>({
  validationSchema: formSchema,
})

async function registerPre_enrollment() {
  const validationResult = await validate()

  if (!validationResult.valid) {
    const displayErrors = Object.values(errors.value).join(', ')
    showToast(displayErrors, 'top', 'warning')
  }
  else {
    try {
    // Garante que o código de matrícula seja único antes de salvar
      if (!pre_enrollmentId.value) {
        await ensureUniqueEnrollmentCode()
      }

      const formData = {
        schoolId: schoolId.value,
        classroomId: classroomId.value,
        seriesId: seriesId.value,
        studentId: studentId.value,
        courseId: courseId.value,
        datePreenrollment: values.date_enrollment,
        observations: values.observations,
        name: values.name,
        status: values.status,
        situation: values.situation,
        preenrollmentcode: pre_enrollment_code.value,
        gender: values.gender,
        birthdate: values.birthdate,
        ethnicity: values.ethnicity,
        deficiency: values.deficiency,
        deficiencyDescription: values.deficiency_description,
        period: values.period,
      }

      let result
      if (pre_enrollmentId.value) {
        result = await pre_enrollmentService.update(pre_enrollmentId.value, formData)
        if (result) {
          showToast('Pré-Matrícula atualizada com sucesso')
          setTimeout(() => {
            router.push('/Student/pre-enrollment').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
      else {
        result = await tryCreateEnrollment(formData)
        if (result) {
          showToast('Pré-Matrícula realizada com sucesso!', 'top', 'success')
          setTimeout(() => {
            router.push('/Student/pre-enrollment').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
    }
    catch (error) {
      console.error('Erro ao salvar pré-matrícula:', error)
      showToast('Erro ao realizar pré-matrícula. Tente novamente.', 'top', 'danger')
    }
  }
}

// Função que tenta criar a matrícula, garantindo unicidade do código
async function tryCreateEnrollment(formData: any) {
  try {
    return await pre_enrollmentService.create(formData)
  }
  catch (error: any) {
    // Se o erro for de duplicidade de código, tenta gerar um novo código
    if (error.code === '23505' && error.details?.includes('pre_enrollment_code')) {
      console.warn('Código de pré-matrícula duplicado detectado. Tentando gerar um novo código...')
      await ensureUniqueEnrollmentCode() // Gera um novo código
      formData.pre_enrollment_code = pre_enrollment_code.value // Atualiza o código no formData
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
    isUnique = await enrollmentService.isUniqueEnrollmentCode(pre_enrollment_code.value)
    attempts++
  }

  if (!isUnique) {
    throw new Error('Não foi possível gerar um código de pré-matrícula único após várias tentativas.')
  }
}

async function loadStudents() {
  try {
    const [students, enrollments] = await Promise.all([
      studentService.getAll(),
      enrollmentService.getAll(),
      pre_enrollmentService.getAll(),
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

  if (!pre_enrollmentId.value) { // Somente limpa o código de matrícula se for uma nova matrícula
    pre_enrollment_code.value = '' // Limpa o código de matrícula
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
      pre_enrollmentService.getAll(),
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

async function getPre_enrollmentData() {
  if (pre_enrollmentId.value) {
    const enrollmentDbData = await pre_enrollmentService.getById(pre_enrollmentId.value)
    if (enrollmentDbData) {
      schoolId.value = enrollmentDbData.school_id
      seriesId.value = enrollmentDbData.series_id
      studentId.value = enrollmentDbData.student_id
      courseId.value = enrollmentDbData.course_id
      pre_enrollment_code.value = enrollmentDbData.pre_enrollment_code ?? ''
      setFieldValue('date_enrollment', enrollmentDbData.date_enrollment)
      setFieldValue('observations', enrollmentDbData.observations)
      setFieldValue('school_id', enrollmentDbData.school_id)
      setFieldValue('schoolId', enrollmentDbData.school_id)
      setFieldValue('seriesId', enrollmentDbData.series_id)
      setFieldValue('studentId', enrollmentDbData.student_id)
      setFieldValue('courseId', enrollmentDbData.course_id)
      setFieldValue('status', enrollmentDbData.status)
      setFieldValue('situation', enrollmentDbData.situation)
      setFieldValue('pre_enrollment_code', enrollmentDbData.pre_enrollment_code)

      const student = await studentService.getById(enrollmentDbData.student_id)
      if (student) {
        setFieldValue('name', student.name)
        searchQuery.value = ''
      }
    }
    else {
      console.error(`Dados da matricula não encontrados para o ID: ${pre_enrollmentId.value}`)
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
  pre_enrollment_code.value = `MAT-${lettersRandom}${numbersRandom}-${currentYear}`
}

watch(studentId, (newValue) => {
  if (!pre_enrollment_code.value && !pre_enrollmentId.value) { // Gera código apenas para novas matrículas
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

watch(() => values.deficiency, (newValue) => {
  if (newValue === 'Outros') {
    valuesDeficiency.value.deficiency_description = ''
  }
})

onMounted(async () => {
  const defaultDate = `${currentYear}-01-01`
  setFieldValue('date_enrollment', defaultDate)
  await loadEnrollment()
  await loadStudents()
  if (pre_enrollmentId.value) {
    await getPre_enrollmentData()
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
        Informações da Pré-Matrícula
      </IonLabel>
    </IonSegmentButton>
    <IonSegmentButton value="pre-enrollment-info">
      <IonLabel style="font-size: calc(1rem - 2px);">
        Informações Pessoais
      </IonLabel>
    </IonSegmentButton>
  </IonSegment>
  <div v-show="selectedSegment === 'general-info'">
    <ion-list v-if="!pre_enrollmentId" id="studentList">
      <IonSearchbar
        v-model="searchQuery"
        placeholder="Pesquise o aluno..."
        :animated="true"
        :debounce="400"
      />
    </ion-list>

    <!-- Renderiza a lista de alunos apenas se houver resultados -->
    <div v-if="searchQuery.length >= 3 && filteredStudents.length > 0">
      <ul class="list-container">
        <li
          v-for="student in filteredStudents"
          :key="student.id"
          class="list-item"
          :class="{ 'enrolled-item': student.enrolled }"
          :title="student.enrolled ? 'Aluno já matriculado' : ''"
          @click="!student.enrolled && selectStudent(student)"
        >
          {{ student.name }}
          <span v-if="student.enrolled" class="enrolled-label">(Já matriculado)</span>
        </li>
      </ul>
    </div>

    <ion-list>
      <ion-item>
        <ion-input
          v-model="values.name"
          label="Nome do Aluno (Somente Leitura)"
          label-placement="floating"
          type="text"
          placeholder="Aluno Matriculado"
          readonly
          :disabled="true"
          class="readonly-input"
        />
      </ion-item>
    </ion-list>

    <ion-list id="schoolList">
      <IonSelect
        v-model="schoolId"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
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

    <ion-list v-if="schoolId" id="courseList">
      <IonSelect
        v-model="courseId"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
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

    <ion-list v-if="schoolId" id="seriesList">
      <IonSelect
        v-model="seriesId"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
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

    <ion-list v-if="schoolId" id="classroomList">
      <IonSelect
        v-model="classroomId"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
        justify="space-between"
        label="Turma*"
        placeholder="Selecione a turma"
        @ion-change="(e) => {
          setFieldValue('classroomId', e.detail.value)
        }"
      >
        <IonSelectOption v-for="classroom in classroomList" :key="classroom.id" :value="classroom.id">
          {{ classroom.name }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>

    <EpInput
      v-model="values.date_enrollment"
      name="date_enrollment"
      label="Data da Pré-Matrícula*"
      type="date"
      :max="maxDate"
      :min="minDate"
      placeholder="Digite a data de pré-matrícula"
      @change="enforceYear"
    />

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

    <ion-list id="periodList">
      <IonSelect
        v-model="values.period"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
        justify="space-between"
        label="Turno*"
        placeholder="Selecione o turno"
        @ion-change="(e) => setFieldValue('period', e.target.value)"
      >
        <IonSelectOption v-for="period in period" :key="period" :value="period">
          {{ period }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>

    <ion-list id="situation">
      <IonSelect
        v-model="values.situation"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
        justify="space-between"
        label="Situação da Pré-Matrícula*"
        placeholder="Selecione a situação"
        @ion-change="(e) => {
          setFieldValue('situation', e.detail.value)
        }"
      >
        <IonSelectOption v-for="situation in situation" :key="situation" :value="situation">
          {{ situation }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>

    <ion-item>
      <IonLabel position="stacked" color="medium">
        Código de Pré-Matrícula (Somente Leitura):
      </IonLabel>
      <ion-input
        v-model="pre_enrollment_code"
        type="text"
        placeholder="Código gerado após finalizar a pré-matrícula"
        :disabled="true"
        readonly
        class="readonly-input"
      />
    </ion-item>

    <EpInput v-model="values.observations" name="observations" label="Observações" placeholder="Digite observações sobre a pré-matrícula" />
  </div>

  <div v-show="selectedSegment === 'pre-enrollment-info'">
    <EpInput v-model="values.birthdate" name="birthdate" label="Data de Nascimento*" type="date" placeholder="Digite a data de nascimento" />

    <ion-list id="gender">
      <IonSelect
        v-model="values.gender"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
        justify="space-between"
        label="Gênero*"
        placeholder="Selecione o gênero"
        @ion-change="(e) => {
          setFieldValue('gender', e.detail.value)
        }"
      >
        <IonSelectOption v-for="gender in gender" :key="gender" :value="gender">
          {{ gender }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>

    <ion-list id="ethnicity">
      <IonSelect
        v-model="values.ethnicity"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
        justify="space-between"
        label="Etnia*"
        placeholder="Selecione a etnia"
        @ion-change="(e) => {
          setFieldValue('ethnicity', e.detail.value)
        }"
      >
        <IonSelectOption v-for="ethnicity in ethnicity" :key="ethnicity" :value="ethnicity">
          {{ ethnicity }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>

    <ion-list id="deficiency">
      <IonSelect
        v-model="values.deficiency"
        fill="outline"
        label-placement="floating"
        cancel-text="Cancelar"
        justify="space-between"
        label="Necessidade Especial*"
        placeholder="Selecione a necessidade"
        @ion-change="(e) => {
          setFieldValue('deficiency', e.detail.value)
        }"
      >
        <IonSelectOption v-for="deficiency in deficiency" :key="deficiency" :value="deficiency">
          {{ deficiency }}
        </IonSelectOption>
      </IonSelect>
    </ion-list>
    <!-- Outras deficiências -->
    <div v-show="values.deficiency === 'Outros'">
      <EpInput
        v-model="values.deficiency_description"
        name="deficiency_description"
        label="Descrição da Necessidade"
        placeholder="Digite a descrição da necessidade"
      />
    </div>
  </div>
</template>

<style scoped>
.readonly-item {
  --background: #e0e0e0; /* Cor de fundo mais clara para o item */
  border: 1px solid #d1d1d1; /* Borda para destacar */
  border-radius: 8px; /* Bordas arredondadas */
}

.readonly-input {
  --background: transparent;
  pointer-events: none; /* Desativa interações no campo */
}

ion-searchbar {
  --background: var(--ion-color-light);
}

/* Contêiner da lista */
.list-container {
  max-height: 200px; /* Altura máxima da lista */
  overflow-y: auto; /* Adiciona rolagem quando necessário */
  background-color: var(--ion-color-light); /* Cor de fundo */
  border: 1px solid #d1d1d1; /* Borda para definir a lista */
  border-radius: 8px; /* Bordas arredondadas */
  padding: 0;
  margin-top: 8px; /* Pequeno espaço entre a searchbar e a lista */
}

/* Cada item da lista */
.list-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #d1d1d1; /* Linha separadora entre os itens */
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
  background-color: #e0e0e0; /* Cor de fundo diferente */
  color: #757575; /* Cor de texto desabilitada */
  cursor: not-allowed; /* Cursor de n�o permitido */
}

.enrolled-label {
  font-size: 0.85rem;
  color: red; /* Texto em vermelho para indicar a matr�cula */
  margin-left: 8px;
}
</style>
