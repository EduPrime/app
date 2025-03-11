<script setup lang="ts">
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { IonButton, IonCol, IonIcon, IonItem, IonRow, IonSelect, IonSelectOption, IonText, toastController } from '@ionic/vue'
import dayjs from 'dayjs'
import { alarm, alertCircleOutline, arrowDownOutline, arrowUpOutline, businessOutline, menu } from 'ionicons/icons'
import { computed, onMounted, ref, watch } from 'vue'
import Pre_enrollmentService from '../services/Pre_enrollmentService'
import SchoolService from '../services/SchoolService'
import { useRouter } from 'vue-router'
import EnrollmentService from '../services/EnrollmentService'
import type { Enrollment } from '@prisma/client'
import StudentService from '../services/StudentService'


const router = useRouter()

const preEnrollmentService = new Pre_enrollmentService()
const schoolService = new SchoolService()
const enrollmentService = new EnrollmentService()
const studentService = new StudentService()

interface Student {
  pcd: boolean;
  name: string;
  age: number;
  shift: string;
  selected?: boolean;
  code: string;
  id: string;
  studentId: string;
  schoolId: string;
  courseId: string;
  seriesId: string;
  institutionId: string;
}

interface Classes {
  id: string;
  name: string;
  maxStudents: number;
  period: string;
  totalStudents: number;
  exceededStudents: number;
  pcdStudents: number;
}

const enrollment = ref<Enrollment>()

const prestudents = ref<Student[]>([])
const students = ref<Student[]>([])
const series = ref<any[]>([])
const filter = ref({
  direction: 'asc',
  by: 'name',
  value: '',
  serie: undefined,
  school: undefined,
})

const schools = ref<{ name: any; id: any }[]>([])
const finishEnrollmentOpened = ref(false)
const classes = ref<Classes[]>([])
const selectedClass = ref('')
const selectClassOpened = ref(false)

const turnos = {
  'MORNING': 'manhã',
  'AFTERNOON': 'tarde',
  'EVENING': 'noite'
}

async function loadEnrollment() {
  try {
    const enrollments = await preEnrollmentService.getFilteredWithStudents(filter.value)
    prestudents.value = enrollments.map(enrollment => ({
      pcd: enrollment.student?.disability ?? false,
      name: enrollment.student?.name ?? '',
      age: dayjs().diff(dayjs(enrollment.student?.birthdate), 'year') ?? 0,
      shift: enrollment.preferShift,
      code: enrollment.preenrollmentcode,
      id: enrollment.id,
      studentId: enrollment.studentId,
      schoolId: enrollment.schoolId,
      courseId: enrollment.courseId,
      seriesId: enrollment.seriesId,
      institutionId: enrollment.institutionId,
    }
    ))
    console.log('prestudents', prestudents.value)
  }

  catch (error) {
    console.error('Erro ao carregar as matrículas:', error)
    prestudents.value = []
  }
}

function filterByShift(shift: string) {
  students.value = prestudents.value.filter(student => student.shift === shift)
}

const selectedStudents = computed(() => students.value.filter(student => !!student.selected))

function handleSelectAll($event: any) {
  students.value.forEach((element) => {
    element.selected = $event?.detail?.checked ?? false
  })
}


watch(filter, async () => {

}, { deep: true })

onMounted(async () => {
  await getSchools()
  // await getSeries()
  // loadEnrollment()
})

async function getSchools() {
  console.log(filter.value)
  const data = await schoolService.getSchools()
  schools.value = data ?? []
}

async function getSeries() {
  try {
    const data = await preEnrollmentService.getSeries(filter.value)
    series.value = data
    filter.value.serie = data[0].id
    loadEnrollment()
  }
  catch {
    students.value = []
    series.value = []
    filter.value.serie = undefined
  }
}

const allSelected = computed(() => students.value.length === selectedStudents.value.length)

async function handleSelectClass() {
  if (filter.value.serie && filter.value.school) {
    console.log('filter.serie and filter.school', filter.value.serie, filter.value.school)
    classes.value = await preEnrollmentService.getClasses(filter.value.serie, filter.value.school)
  } else {
    console.error('Serie is undefined')
  }
  selectClassOpened.value = true
}

function selectClass(classroom: any) {
  selectedClass.value = classroom.id
  selectClassOpened.value = false
  finishEnrollmentOpened.value = true
}

const classInfo = computed(() => {
  const [classroom] = classes.value.filter(room => room.id === selectedClass.value)
  console.log(classroom)
  return classroom
})

async function presentToast() {
  const toast = await toastController.create({
    message: 'Aluno matriculado com sucesso',
    duration: 5000,
    position: 'top',
    color: 'primary',
  })
  await toast.present()
}

function getTurno(turno: string) {
  switch (turno) {
    case ('MORNING'):
      return 'manhã'
    case ('AFTERNOON'):
      return 'tarde'
    case ('EVENING'):
      return 'noite'
  }
}

async function lastStepEnrollment() {
  const enrollmentData = {
    id: self.crypto.randomUUID(),
    institutionId: selectedStudents.value[0].institutionId,
    schoolId: selectedStudents.value[0].schoolId,
    seriesId: selectedStudents.value[0].seriesId,
    classroomId: selectedClass.value,
    studentId: selectedStudents.value[0].studentId,
    courseId: selectedStudents.value[0].courseId,
    name: selectedStudents.value[0].name,
    dateEnrollment: new Date(),
    situation: "CURSANDO",
    enrollmentCode: selectedStudents.value[0].code.replace('pre-', ''),
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: null,
    updatedBy: null,
    tenantId: null,
    observations: null,
    status: "ACTIVE",
    preenrollmentId: selectedStudents.value[0].id,
  }
  await enrollmentService.createEnrollment(enrollmentData)
  await preEnrollmentService.update(selectedStudents.value[0].id, { situation: "CURSANDO" })
  await studentService.update(selectedStudents.value[0].studentId, { schoolId: selectedStudents.value[0].schoolId })
  loadEnrollment()

}
</script>

<template>
  <ion-page>
    <ContentLayout show-footer classes="bg-light">
      <div class="header">
        <div>
          <div class="header-info">
            <div class="text-lg">
              Filtros
            </div>
            <div class="text-sm">
              Preencha os filtros abaixo para uma busca mais assertiva
            </div>
          </div>

          <IonItem color="primary">
            <IonIcon slot="start" :icon="businessOutline" />
            <IonSelect class="hide-icon" :value="filter.school" label-placement="floating" @ion-change="($event) => {
              filter.school = $event.detail.value; getSeries()
            }">
              <IonSelectOption v-for="school, i in schools" :key="i" :value="school.id">
                {{ school.name }}
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem color="tertiary">
            <IonIcon slot="start" class="cursor-pointer" :icon="menu" />
            <IonSelect class="hide-icon" :value="filter.serie" label-placement="floating"
              @ion-change="($event) => { filter.serie = $event.detail.value; loadEnrollment() }">
              <IonSelectOption v-for="serie, i in series" :key="i" :value="serie.id">
                {{ serie.name }}
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem color="secondary">
            <IonIcon slot="start" class="cursor-pointer" :icon="alarm" />
            <IonSelect class="hide-icon" :value="prestudents.shift" label-placement="floating"
              @ion-change="($event) => { filterByShift($event.detail.value) }">
              <IonSelectOption v-for="shift, i in turnos" :key="i" :value="i">
                {{ shift }}
              </IonSelectOption>
            </IonSelect>
          </IonItem>
        </div>
      </div>
      <ion-card class="requests m-0">
        <div class="text-md" style="padding-top: 0px; font-size: 20px;">
          Solicitações de matrículas ({{ students.length }})
        </div>
        <IonRow>
          <IonCol class="p-0" size="8">
            <ion-searchbar v-model="filter.value" class="custom-search" placeholder="Filtrar" />
          </IonCol>
          <IonCol class="p-0" size="4">
            <IonSelect :toggle-icon="arrowDownOutline" :expanded-icon="arrowUpOutline" class="custom-select"
              :value="filter.by" @ion-change="($event) => filter.by = $event.detail.value">
              <IonSelectOption value="name">
                Nome
              </IonSelectOption>
              <IonSelectOption value="age">
                Idade
              </IonSelectOption>
            </IonSelect>
          </IonCol>
        </IonRow>
        <IonRow class="checkbox-row">
          <IonCol size="10">
            <ion-checkbox :checked="allSelected" @ion-change="handleSelectAll" />
          </IonCol>
          <IonCol size="auto">
            <IonRow>
              <IonIcon class="cursor-pointer" :color="filter.direction === 'asc' ? 'accent' : ''" :icon="arrowUpOutline"
                @click="filter.direction = 'asc'" />
              <IonIcon class="cursor-pointer" :color="filter.direction === 'desc' ? 'accent' : ''"
                :icon="arrowDownOutline" @click="filter.direction = 'desc'" />
            </IonRow>
          </IonCol>
        </IonRow>

        <ion-list>
          <IonItem v-for="(student, index) in students" :key="index" :color="student.selected ? 'lightaccent' : ''"
            :class="{ selected: student.selected }">
            <ion-checkbox slot="start" v-model="student.selected" :checked="student.selected"
              @ion-change="($event: any) => student.selected = $event.detail.checked" />
            <ion-label>
              <div class="title">
                {{ student.name }}
              </div>
              <div class="description">
                {{ student.age }} anos, {{ getTurno(student.shift) }}
              </div>
            </ion-label>
            <div v-if="student.pcd" slot="end" class="badge">
              PCD
            </div>
          </IonItem>
        </ion-list>
      </ion-card>

      <template #footer>
        <IonRow class="" style="padding-top: 0px; padding-bottom: 0px;">
          <IonCol>
            <IonButton :disabled="!selectedStudents.length" expand="block" color="accent"
              @click="handleSelectAll(false)">
              Cancelar
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton :disabled="!selectedStudents.length" expand="block" color="primary" @click="handleSelectClass">
              Matrícula
            </IonButton>
          </IonCol>
        </IonRow>
      </template>
    </ContentLayout>
    <ion-modal :is-open="finishEnrollmentOpened" :initial-breakpoint="0.9" :breakpoints="[0.9]" handle-behavior="cycle"
      @did-dismiss="finishEnrollmentOpened = false">
      <ion-content style="position: relative;" class="ion-padding">
        <IonRow style="margin-bottom: 12px;">
          <IonCol class="p-0" size="8">
            <IonSelect fill="outline" v-model="selectedClass" :toggle-icon="undefined" label-placement="floating"
              @ion-change="($event) => selectedClass = $event.detail.value">
              <IonSelectOption v-for="classroom, i in classes" :key="i" :value="classroom.id">
                {{ classroom.name }}
              </IonSelectOption>
            </IonSelect>
          </IonCol>
        </IonRow>

        <IonText color="primary" class="info">
          <IonItem v-if="classInfo?.exceededStudents" color="primary">
            <IonIcon slot="start" :icon="alertCircleOutline" />
            <IonLabel>
              <div style="font-size: 14px;">
                Atenção
              </div>
              <div>
                Lotação alcançada e excede em ({{ classInfo?.exceededStudents }}) alunos
              </div>
            </IonLabel>
          </IonItem>
          <ul style="padding-left: 25px;">
            <li>Turno {{ getTurno(classInfo?.period) }}</li>
            <li>{{ classInfo?.totalStudents }} alunos matriculados</li>
            <li>{{ classInfo?.maxStudents - classInfo?.totalStudents }} vagas disponíveis</li>
            <li>Excedente ({{ classInfo?.exceededStudents }})</li>
            <li>{{ classInfo?.pcdStudents }} PCD</li>
          </ul>
        </IonText>
        <IonRow style="position: absolute; bottom: 10%; width: 100%; left: 0px;">
          <IonCol>
            <IonButton expand="block" color="accent" @click="finishEnrollmentOpened = false">
              Cancelar
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="block" color="primary" @click="() => {
              finishEnrollmentOpened = false
              lastStepEnrollment()
              presentToast()
            }">
              Matrícula
            </IonButton>
          </IonCol>
        </IonRow>
      </ion-content>
    </ion-modal>
    <ion-modal :is-open="selectClassOpened" :initial-breakpoint="0.50" :breakpoints="[0, 0.25, 0.5, 0.75]"
      handle-behavior="cycle" @did-dismiss="selectClassOpened = false">
      <ion-content class="ion-padding">
        <p>Selecione uma turma:</p>
        <IonButton v-for="(classroom, i) in classes" :key="i" class="select-class-btn" @click="selectClass(classroom)">
          {{ classroom.name }} ({{ classroom.maxStudents }})
        </IonButton>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<style scoped lang="scss">
ion-label h2 {
  margin: 0;
  font-weight: bold;
}

ion-icon[slot=start] {
  margin-right: 12px !important;
}

ion-select.hide-icon::part(icon) {
  display: none;
}

ion-searchbar {
  --background: var(--ion-color-light);
}

ion-button.select-class-btn {
  --padding-top: 10px;
  --padding-bottom: 10px;
  height: 50px;
}

.m-0 {
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-top: 0px;
  padding: 20px 14px;
}

.header {
  padding: 16px 14px 24px 14px;

  ion-label {
    font-size: 14px;
  }

  background: #F9D3E333;
}

.header-info {
  color: #72428E
}

.text-lg {
  font-size: 18px;
  font-weight: 500;
}

.text-md {
  padding-top: 20px;
  padding-bottom: 16px;
}

.text-sm {
  font-size: 14px;
  margin: 10px 0px;
  font-weight: 300;
}

.cursor-pointer {
  cursor: pointer;
}

.selected {
  .title {
    font-weight: 700;
    color: #D0549F
  }

  .description {
    font-weight: 500;
    color: #D0549F
  }
}

.title {
  font-size: 12px;
}

.description {
  font-size: 10px;
}

.p-0 {
  padding: 0px;
}

.badge {
  background: #D0549F59;
  color: #D0549F;
  font-size: 10px;
  width: 37px;
  border-radius: 8px;
  text-align: center;
  padding: 3px 0px;
}

.info {
  ion-item {
    background-color: var(--ion-color-primary);
    padding: 10px 0px;
  }

  ion-icon {
    margin-inline-end: 14px
  }

  li {
    margin-bottom: 5px;
  }
}

ion-checkbox {
  --size: 10px;
  --checkbox-background-checked: #D0549F;
  --border-color-checked: #D0549F
}

.checkbox-row {
  margin: 10px 10px 2px 10px;
  border-bottom: 1px solid #72428EB2;
  padding-bottom: 8px;
  justify-content: space-between;
}

ion-searchbar.custom-search {
  --background: white;
  --color: var(--ion-color-primary);
  --placeholder-color: var(--ion-color-primary);
  --icon-color: var(--ion-color-primary);
  --clear-button-color: var(--ion-color-primary);
  --border-radius: 4px;
  padding: 0px 16px 0px 0px;
}

ion-select.custom-select {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  --border-radius: 4px;
  padding-left: 8px;
  padding-right: 8px;

}

ion-select.custom-select::part(icon) {
  position: absolute;
  right: 0px;
}

ion-searchbar.ios.custom-search {
  --cancel-button-color: var(--ion-color-primary);
}

ion-searchbar.md.custom-search {
  --cancel-button-color: var(--ion-color-primary);
}
</style>