<script setup lang="ts">
import showToast from '@/utils/toast-alert'
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonSelect, IonSelectOption } from '@ionic/vue'
import { listSharp } from 'ionicons/icons'
import { Field, Form, useForm } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import InstitutionService from '../../../institution/services/InstitutionService'
import CourseService from '../../services/CourseService'
import DisciplineService from '../../services/DisciplineService'
import SeriesService from '../../services/SeriesService'

const props = defineProps<{
  closeModal: (status: boolean) => void
  editId?: string
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'saved'): void
}>()

const selectedSegment = ref('general')
const seriesService = new SeriesService()
const courseService = new CourseService()
const disciplineService = new DisciplineService()
const institutionService = new InstitutionService()

const seriesId = computed(() => props.editId) // ID da série para edição
const isEditing = computed(() => Boolean(seriesId.value)) // Verifica se está no modo de edição
const modalTitle = computed(() => isEditing.value ? 'Editar Série' : 'Nova Série')

const institutionList = ref<Array<{ id: string, name: string }>>([])
const courseList = ref<Array<{ id: string, name: string }>>([])
const disciplineList = ref<Array<{ id: string, name: string, workload: number }>>([])
const hasChanges = ref(false)

const disciplines = ref<Array<{
  id: string | null
  disciplineId: string
  seriesId: string
  name: string
  year: number | null
  workload: number | null
  createdAt: Date
  deletedAt: null | string
  updatedAt: null | string
  updatedBy: null | string
  tenantId: string
}>>([])

const formValues = ref({
  id: '',
  name: '',
  description: '',
  courseId: '',
  institutionId: '',
  ageRangeMin: null,
  ageRangeMax: null,
  standardAge: null,
  schoolDays: null,
  workload: null,
})

const originalFormValues = ref<{
  name: string
  description: string
  courseId: string
  institutionId: string
  ageRangeMin: number | null
  ageRangeMax: number | null
  standardAge: number | null
  schoolDays: number
  workload: number
  disciplines: Array<{
    disciplineId: string
    seriesId: string
    name: string
    year: number
    workload: number
    createdAt: Date
    deletedAt: string | null
    updatedAt: string | null
    updatedBy: string | null
    tenantId: string
  }>
}>({
  ...formValues.value,
  schoolDays: formValues.value.schoolDays ?? 0,
  workload: formValues.value.workload ?? 0,
  disciplines: [],
})

// Adiciona uma nova disciplina
function addDiscipline() {
  disciplines.value.push({
    id: null,
    disciplineId: '',
    seriesId: '',
    name: '',
    workload: null,
    year: null,
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

// Atualiza a carga horária de uma disciplina
function updateWorkload(index: number, value: string) {
  const selectedDiscipline = disciplineList.value.find(d => d.name === value)
  if (selectedDiscipline) {
    disciplines.value[index].workload = selectedDiscipline.workload
  }
}

// Sincroniza os valores do formulário com `formValues`
const { values } = useForm({
  initialValues: formValues.value,
})

watch(values, (newValues) => {
  formValues.value = { ...newValues }
  checkForChanges()
}, { deep: true })

watch(disciplines, () => {
  checkForChanges()
}, { deep: true })

// Verifica se houve alterações no formulário
function checkForChanges() {
  const formChanged = JSON.stringify(formValues.value) !== JSON.stringify(originalFormValues.value)
  const disciplinesChanged = JSON.stringify(disciplines.value) !== JSON.stringify(originalFormValues.value.disciplines || [])
  hasChanges.value = formChanged || disciplinesChanged
}

// Carrega os dados da série para edição
async function loadSeriesData() {
  if (seriesId.value) {
    try {
      const seriesData = await seriesService.getSeriesWithDetailsById(seriesId.value)
      if (seriesData) {
        formValues.value = {
          id: seriesData.id,
          name: seriesData.name || '',
          description: seriesData.description || '',
          courseId: seriesData.courseId || '',
          institutionId: seriesData.institutionId || '',
          ageRangeMin: seriesData.ageRangeMin || null,
          ageRangeMax: seriesData.ageRangeMax || null,
          standardAge: seriesData.standardAge || null,
          schoolDays: seriesData.schoolDays || null,
          workload: seriesData.workload ?? undefined,
        }

        // Carrega as disciplinas associadas à série
        disciplines.value = seriesData.disciplines.map((discipline: { id: string, disciplineName: string, workload: number, year: number }) => ({
          id: discipline.id,
          name: discipline.disciplineName || '',
          workload: discipline.workload || '',
          year: discipline.year || '',
        }))
        originalFormValues.value = {
          ...formValues.value,
          schoolDays: formValues.value.schoolDays ?? 0, // Default to 0 if null
          workload: formValues.value.workload ?? 0, // Default to 0 if null or undefined
          disciplines: disciplines.value.map(discipline => ({
            ...discipline,
            year: discipline.year ?? 0, // Default to 0 if null
            workload: discipline.workload ?? 0, // Default to 0 if null
          })),
        }
        hasChanges.value = false // Garante que o botão "Salvar" esteja desabilitado inicialmente
      }
      else {
        console.error(`Série não encontrada para o ID: ${seriesId.value}`)
      }
    }
    catch (error) {
      console.error('Erro ao carregar dados da série:', error)
    }
  }
}

// Carrega as listas de instituições, cursos e disciplinas
async function loadDropdownData() {
  try {
    const [institutions, courses, disciplinas] = await Promise.all([
      institutionService.getAll(),
      courseService.getAllCourses(),
      disciplineService.getAllDiscipline(),
    ])

    institutionList.value = institutions?.map(item => ({ id: item.id, name: item.name })) || []
    courseList.value = courses?.map(item => ({ id: item.id, name: item.name })) || []
    disciplineList.value = disciplinas?.map(item => ({ id: item.id, name: item.name, workload: item.workload })) || []
  }
  catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
}

// Salva a série e as disciplinas
async function saveSeriesAndDisciplines() {
  const series = {
    ...formValues.value,
    createdAt: isEditing.value ? null : new Date().toISOString(),
    updatedAt: isEditing.value ? new Date().toISOString() : null,
    deletedAt: null, // Add default value for deletedAt
    updatedBy: null, // Add default value for updatedBy
    workload: formValues.value.workload ?? undefined, // Ensure workload is undefined if null
    schoolDays: formValues.value.schoolDays ?? 0, // Garante que schoolDays seja um número
  }

  // Prepara as disciplinas para envio, garantindo que `disciplineId` seja preenchido
  const disciplinesToSave = disciplines.value.map((discipline) => {
    const selectedDiscipline = disciplineList.value.find(d => d.name === discipline.name)
    if (!selectedDiscipline) {
      throw new Error(`Disciplina "${discipline.name}" não encontrada na lista de disciplinas disponíveis.`)
    }

    return {
      disciplineId: selectedDiscipline.id, // Garante que `disciplineId` seja preenchido
      seriesId: series.id, // Vincula o ID da série
      year: discipline.year ?? 0, // Default to 0 if null
      workload: discipline.workload ?? 0, // Default to 0 if null
      createdAt: (discipline.createdAt || new Date()).toISOString(), // Ensure string format
      updatedAt: isEditing.value ? new Date().toISOString() : null, // Ensure null if not editing
      deletedAt: discipline.deletedAt || null,
      tenantId: discipline.tenantId,
      updatedBy: null, // Add default value for updatedBy
    }
  })

  try {
    const result = await seriesService.upsertSeriesWithDisciplines(series, disciplinesToSave)
    if (result) {
      showToast('Série salva com sucesso!', 'top', 'success')
      emit('saved')
    }
  }
  catch (error) {
    console.error('Erro ao salvar série:', error)
    showToast('Erro ao salvar série. Tente novamente.', 'top', 'danger')
  }
}

onMounted(async () => {
  await loadDropdownData()
  if (isEditing.value) {
    await loadSeriesData()
  }
  else {
    // Preenche o institutionId no modo de criação
    formValues.value.institutionId = institutionList.value.length > 0 ? institutionList.value[0].id : ''
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
            <Field v-slot="{ field, errors }" name="name" label="Nome" rules="required">
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
                v-model="formValues.institutionId"
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

            <Field v-slot="{ field, errors }" name="courseId" label="Curso" rules="required">
              <IonSelect
                v-model="formValues.courseId"
                v-bind="field"
                label="Curso"
                label-placement="stacked"
                fill="outline"
                placeholder="Selecione"
                cancel-text="Cancelar"
                justify="space-between"
                aria-label="Curso"
              >
                <IonSelectOption v-for="course in courseList" :key="course.id" :value="course.id">
                  {{ course.name }}
                </IonSelectOption>
              </IonSelect>
              <span class="error-message">{{ errors[0] }}</span>
            </Field>

            <Field v-slot="{ field, errors }" name="workload" label="Carga horária" rules="required">
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
                <Field v-slot="{ field, errors }" name="schoolDays" label="Dias letivos" rules="required">
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
                      <Field v-slot="{ field, errors }" name="discipline.name" label="Disciplina" rules="required">
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
                      <Field v-slot="{ field, errors }" name="workload" label="Carga horária" rules="required">
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
                      <Field v-slot="{ field, errors }" name="year" label="Ano" rules="required">
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
            <IonButton :disabled="!hasChanges" color="secondary" expand="full" @click="saveSeriesAndDisciplines">
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
