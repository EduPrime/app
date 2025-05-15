<script setup lang="ts">
import showToast from '@/utils/toast-alert'
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonSelect, IonSelectOption } from '@ionic/vue'
import { listSharp } from 'ionicons/icons'
import { Field, Form, useForm, validate } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import InstitutionService from '../../institution/services/InstitutionService'
import CourseService from '../services/CourseService'
import DisciplineService from '../services/DisciplineService'
import SeriesService from '../services/SeriesService'

defineProps<{
  closeModal: (status: boolean) => void
  editId?: string
}>()

defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()

const selectedSegment = ref('general')
const router = useRouter()
const route = useRouter()
const seriesId = computed(() => route.currentRoute.value.params.id) as { value: string }
const seriesService = new SeriesService()
const courseService = new CourseService()
const disciplineService = new DisciplineService()
const institutionService = new InstitutionService()
const institutionId = ref()
const schoolId = ref()
const institutionList = ref()
const disciplineList = ref()
const seriesList = ref()
const courseList = ref()
const courseId = ref()

const disciplines = ref<Array<{
  disciplineId: string
  seriesId: string
  name: string
  year: string
  workload: string
  createdAt: Date
  deletedAt: null | string
  updatedAt: null | string
  updatedBy: null | string
  tenantId: string
}>>([])

const formValues = ref({
  name: '',
  description: '',
  courseId: '',
  createdAt: new Date(),
  deletedAt: null,
  updatedAt: null,
  updatedBy: null,
  tenantId: null,
  userCreated: null,
  institutionId: '',
  ageRangeMin: '',
  ageRangeMax: '',
  standardAge: '',
  schoolDays: '',
  workload: '',
})
// Configura o formulário com os valores iniciais
const { values } = useForm({
  initialValues: formValues.value,
})

const isEditing = computed(() => Boolean(props.editId))
const modalTitle = computed(() => isEditing.value ? 'Editar Série' : 'Nova Série')

// Adiciona uma nova disciplina
function addDiscipline() {
  disciplines.value.push({
    disciplineId: '',
    seriesId: '',
    name: '',
    year: '',
    workload: '',
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: null,
    updatedBy: null,
    tenantId: '',
  })
}

// Remove uma disciplina pelo índice
function removeDiscipline(index: number) {
  disciplines.value.splice(index, 1)
}

async function saveSeriesAndDisciplines() {
  const series = {
    ...formValues.value,
    createdAt: formValues.value.createdAt.toISOString(),
  }

  const disciplinesToSave = disciplines.value.map(({ name, ...discipline }) => ({
    ...discipline,
    year: Number(discipline.year),
    workload: Number(discipline.workload),
    createdAt: new Date().toISOString(),
  }))

  try {
    const result = await seriesService.upsertSeriesWithDisciplines(series, disciplinesToSave)

    if (result) {
      showToast('Série e disciplinas salvas com sucesso!', 'top', 'success')
      router.push('/Series/list')
    }
  }
  catch (error) {
    console.error('Erro ao salvar série e disciplinas:', error)
    showToast('Erro ao salvar série e disciplinas. Tente novamente.', 'top', 'danger')
  }
}

// Sincroniza os valores do formulário com `formValues`
watch(values, (newValues) => {
  formValues.value = { ...newValues }
})

async function loadSeries() {
  try {
    const [institutions, series, courses, disciplinas] = await Promise.all([
      institutionService.getAll(),
      seriesService.getAllSeries(),
      courseService.getAllCourses(),
      disciplineService.getAllDiscipline(),
    ])

    institutionList.value = institutions?.map(item => ({ id: item.id, name: item.name })) || []
    seriesList.value = series?.map(item => ({ id: item.id, name: item.name })) || []
    courseList.value = courses?.map(item => ({ id: item.id, name: item.name })) || []
    disciplineList.value = disciplinas?.map(item => ({ id: item.id, name: item.name, workload: item.workload })) || []
  }
  catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
}
async function getSeriesData() {
  if (seriesId.value) {
    const seriesDbData = await seriesService.getById(seriesId.value)
    if (seriesDbData) {
      institutionId.value = seriesDbData.institutionId
      courseId.value = seriesDbData.courseId
      schoolId.value = seriesDbData.schoolId
      setFieldValue('institutionId', seriesDbData.institutionId)
      setFieldValue('schoolId', seriesDbData.schoolId)
      setFieldValue('institutionId', seriesDbData.institutionId)
      setFieldValue('schoolId', seriesDbData.schoolId)
      setFieldValue('courseId', seriesDbData.courseId)
      setFieldValue('name', seriesDbData.name)
      setFieldValue('courseStage', seriesDbData.courseStage)
      setFieldValue('graduate', seriesDbData.graduate)
      setFieldValue('workload', seriesDbData.workload)
      setFieldValue('schoolDays', seriesDbData.schoolDays)
    }
    else {
      console.error(`Dados da série não encontrados para o ID: ${seriesId.value}`)
    }
  }
}

async function loadInstitution() {
  try {
    const institutions = await institutionService.getAll()

    if (institutions && institutions.length === 1) {
      institutionId.value = institutions[0].id
      formValues.value.institutionId = institutions[0].id // Define o valor inicial
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

// Atualiza a carga horária com base na disciplina selecionada
function updateWorkload(index: number, selectedDiscipline: string) {
  const selected = disciplineList.value.find(d => d.name === selectedDiscipline)
  if (!selected) {
    console.warn(`Disciplina não encontrada: ${selectedDiscipline}`)
    return
  }

  disciplines.value[index].workload = selected.workload
  disciplines.value[index].disciplineId = selected.id
}

onMounted(async () => {
  await loadSeries()
  await loadInstitution()
  if (seriesId.value) {
    await getSeriesData()
    if (institutionId.value)
      setFieldValue('institutionId', institutionId.value)
    if (courseId.value)
      setFieldValue('courseId', courseId.value)
  }
})
</script>

<template>
  <IonPage>
    <IonContent class="ion-no-padding ion-no-margin">
      <Form class="ion-margin-horizontal" :initial-values="formValues" @submit="saveSeriesAndDisciplines">
        <div class="ion-margin style-purple-lane" style="display: flex; align-items: center;">
          <IonIcon :icon="listSharp" style="margin-right: 10px;" />
          {{ modalTitle }}
        </div>
        <IonSegment
          v-model="selectedSegment" mode="ios" :scrollable="false"
          style="margin: 20px 0 0 0; padding: 3px 0 3px 0; font-size: 10px;" :style="{}"
        >
          <IonSegmentButton value="general" content-id="general">
            <IonLabel>
              Informações Cadastrais
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="discipline-info" content-id="discipline-info">
            <IonLabel>Disciplinas</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonSegmentView>
          <IonSegmentContent id="general">
            <Field v-slot="{ field, errors }" name="name" rules="required">
              <IonInput
                v-model="formValues.name"
                v-bind="field"
                label="Nome"
                label-placement="stacked"
                fill="outline"
                placeholder="Digite o nome da série"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="institutionId">
              <IonSelect
                v-model="institutionId"
                :disabled="true"
                v-bind="field"
                label="Instituição"
                label-placement="stacked"
                fill="outline"
                placeholder="Selecione"
                cancel-text="Cancelar"
                justify="space-between"
              >
                <IonSelectOption v-for="institution in institutionList" :key="institution.id" :value="institution.id">
                  {{ institution.name }}
                </IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="courseId" rules="required">
              <IonSelect
                v-model="formValues.courseId"
                v-bind="field"
                label="Curso*"
                label-placement="stacked"
                fill="outline"
                placeholder="Selecione"
                cancel-text="Cancelar"
                justify="space-between"
              >
                <IonSelectOption v-for="course in courseList" :key="course.id" :value="course.id">
                  {{ course.name }}
                </IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="workload">
              <IonInput
                v-model="formValues.workload"
                v-bind="field"
                label="Carga horária"
                label-placement="stacked"
                fill="outline"
                placeholder="Digite a carga horária"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <IonRow>
              <IonCol size="6">
                <Field v-slot="{ field, errors }" name="schoolDays">
                  <IonInput
                    v-model="formValues.schoolDays"
                    v-bind="field"
                    label="Dias letivos"
                    label-placement="stacked"
                    fill="outline"
                    placeholder="Digite os dias letivos"
                  />
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>
              </IonCol>
              <IonCol size="6">
                <Field v-slot="{ field, errors }" name="standardAge">
                  <IonInput
                    v-model="formValues.standardAge"
                    v-bind="field"
                    label="Idade padrão"
                    label-placement="stacked"
                    fill="outline"
                    placeholder="Digite a idade padrão"
                  />
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>
              </IonCol>
            </IonRow>
            <IonLabel color="primary" class="ion-no-margin">
              Faixa etária
            </IonLabel>
            <IonRow>
              <IonCol size="6">
                <Field v-slot="{ field, errors }" name="ageRangeMin">
                  <IonInput
                    v-model="formValues.ageRangeMin"
                    v-bind="field"
                    label="Mínima"
                    label-placement="stacked"
                    fill="outline"
                    placeholder="Digite a idade mínima"
                  />
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>
              </IonCol>
              <IonCol size="6">
                <Field v-slot="{ field, errors }" name="ageRangeMax">
                  <IonInput
                    v-model="formValues.ageRangeMax"
                    v-bind="field"
                    label="Máxima"
                    label-placement="stacked"
                    fill="outline"
                    placeholder="Digite a idade máxima"
                  />
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>
              </IonCol>
            </IonRow>

            <Field v-slot="{ field, errors }" name="description">
              <IonInput
                v-model="formValues.description"
                v-bind="field"
                label="Descrição"
                label-placement="stacked"
                fill="outline"
                placeholder="Digite uma descrição"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </Field>
          </IonSegmentContent>
          <IonSegmentContent id="discipline-info">
            <IonList>
              <IonItem v-for="(discipline, index) in disciplines" :key="index">
                <IonGrid>
                  <IonRow>
                    <IonCol size="12">
                      <Field v-slot="{ field, errors }" name="discipline.name">
                        <IonSelect
                          v-model="discipline.name"
                          v-bind="field"
                          label="Disciplina"
                          label-placement="stacked"
                          placeholder="Selecione uma disciplina"
                          cancel-text="Cancelar"
                          fill="outline"
                          @ion-change="(e) => updateWorkload(index, e.detail.value)"
                        >
                          <IonSelectOption v-for="option in disciplineList" :key="option.id" :value="option.name">
                            {{ option.name }}
                          </IonSelectOption>
                        </IonSelect>
                        <span class="error-message">{{ errors[0] }}</span>
                      </Field>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="6">
                      <Field v-slot="{ field, errors }" name="workload" rules="required">
                        <IonInput
                          v-model="discipline.workload"
                          v-bind="field"
                          label-placement="stacked"
                          label="Carga horária"
                          placeholder="Digite a carga horária"
                          fill="outline"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                      </Field>
                    </IonCol>
                    <IonCol size="6">
                      <Field v-slot="{ field, errors }" name="year" rules="required">
                        <IonInput
                          v-model="discipline.year"
                          v-bind="field"
                          label-placement="stacked"
                          label="Ano"
                          placeholder="Digite o ano"
                          fill="outline"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                      </Field>
                    </IonCol>

                    <IonCol size="12" class="ion-text-end">
                      <IonButton color="danger" @click="removeDiscipline(index)">
                        Remover
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            </IonList>

            <IonButton expand="block" @click="addDiscipline">
              Adicionar Disciplina
            </IonButton>
          </IonSegmentContent>
        </IonSegmentView>
      </Form>
    </IonContent>
    <div>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonButton :disabled="false" color="danger" expand="full" @click="closeModal(false)">
              Cancelar
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton :disabled="false" color="secondary" expand="full" @click="saveSeriesAndDisciplines">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  </IonPage>
</template>

<style scoped>
.error-message {
  color: red;
  font-size: 0.9em;
}

.style-purple-lane {
  background: rgba(var(--ion-color-secondary-rgb), 0.15);
  color: var(--ion-color-secondary);
  padding: 2px 2px 2px 2px;
  margin: 8px 2px 8px 2px;
}

.title-identifier {
  background: rgba(var(--ion-color-secondary-rgb), 0.15);
  color: var(--ion-color-secondary);
  padding: 1px 0px 0px 5px;
  margin: 10px 2px 12px 2px;
}

ion-segment-content#general ion-input, ion-select {
  margin: 10px 0px 12px 0px;
  color: var(--ion-color-secondary);
}

ion-segment-content#complementary ion-input, ion-select {
  margin: 10px 0px 12px 0px;
  color: var(--ion-color-secondary);
}

.accordion-header-color {
  /* --background: var(--ion-color-secondary-tint); */
  --background: rgba(var(--ion-color-primary-rgb), 0.2);
  /* font-weight: bold; */
  padding: 0px;
  border-radius: 0px;
}
</style>
