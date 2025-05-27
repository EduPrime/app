<script setup lang="ts">
import type { Institutions } from '../../types/types'
import BaseService from '@/services/BaseService'
import EvaluationRuleService from '@/services/EvaluationRuleService'
import showToast from '@/utils/toast-alert'
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,

} from '@ionic/vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CourseService from '../../services/CourseService'
import InstitutionService from '../../services/InstitutionService'
import SchoolService from '../../services/SchoolService'

interface Props {
  editId?: string
}

const props = defineProps<Props>()
const emits = defineEmits(['close', 'saved'])
const route = useRoute()
const router = useRouter()
const courseService = new CourseService()
const institutionService = new InstitutionService()
const schoolService = new SchoolService()
const evaluationRuleService = new EvaluationRuleService()
const baseService = new BaseService()

const initialFormValues = {
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
}

const formValues = ref({ ...initialFormValues })
const originalFormValues = ref({ ...initialFormValues })
const isEditing = ref(!!props.editId)
const itemId = computed(() => props.editId ?? route.params.id as string | undefined)
const pageTitle = computed(() => isEditing.value ? 'Editar série' : 'Nova série')
const descriptionRef = ref<HTMLTextAreaElement | null>(null)
const hasChanges = ref(false)
const institutions = ref<Institutions[]>({} as Institutions[])
const evaluationRules = ref()
const schools = ref()
const disciplines = ref()

// Curso para verificar se houve mudanças nos campos
function checkForChanges() {
  if (!isEditing.value)
    return

  const hasNameChanged = formValues.value.name !== originalFormValues.value.name
  const hasDescriptionChanged = formValues.value.description !== originalFormValues.value.description
  const hasInstitutionChanged = formValues.value.institution !== originalFormValues.value.institution
  const hasAgeMaxChanged = formValues.value.ageRangeMax !== originalFormValues.value.ageRangeMax
  const hasAgeMinChanged = formValues.value.ageRangeMin !== originalFormValues.value.ageRangeMin
  const hasStandardAgeChanged = formValues.value.standardAge !== originalFormValues.value.standardAge
  const hasSchoolDaysChanged = formValues.value.schoolDays !== originalFormValues.value.schoolDays
  const hasWorkloadChanged = formValues.value.workload !== originalFormValues.value.workload

  hasChanges.value = hasNameChanged || hasDescriptionChanged || hasInstitutionChanged || hasAgeMaxChanged || hasAgeMinChanged || hasStandardAgeChanged || hasSchoolDaysChanged || hasWorkloadChanged
}

const saveButtonEnabled = computed(() => {
  if (!isEditing.value) {
    const enabled = !!formValues.value.name || !!formValues.value.abbreviation || !!formValues.value.description || !!formValues.value.timeSerialization || !!formValues.value.regimeType || !!formValues.value.teachingType || !!formValues.value.graduate || !!formValues.value.institutionId || !!formValues.value.evaluationRuleId || !!formValues.value.courseModality
    return enabled
  }

  return hasChanges.value
})

watchEffect(() => {
  if (formValues.value.description) {
    nextTick(() => {
      autoResizeTextarea()
    })
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
  if (itemId.value) {
    isEditing.value = true
    const item: any = await courseService.getById(itemId.value)

    if (item) {
      // Armazena os valores originais
      const loadedValues = {
        id: item.id,
        name: item.name,
        abbreviation: item.abbreviation || '', // @TODO: verificar do que se trata
        description: (item as any).description ?? '',
        regimeType: item.regimeType,
        graduate: item.graduate,
        teachingType: item.teachingType,
        courseModality: item.courseModality,
        institutionId: item.institutionId,
        numberOfStages: item.numberOfStages,
        timeSerialization: item.timeSerialization,
        courseStage: item.courseStage,
        // schoolId: item.schoolId,
        evaluationRuleId: item.evaluationRuleId,
        workerId: item.workerId,
      }

      formValues.value = { ...loadedValues }
      originalFormValues.value = { ...loadedValues }
      hasChanges.value = false

      autoResizeTextarea()
    }
  }
  else {
    formValues.value = { ...initialFormValues }

    originalFormValues.value = { ...initialFormValues }
    hasChanges.value = false
  }
})

async function handleSubmit(values: any) {
  const payload = {
    ...values,
    institutionId: institutions.value.at(0)?.id,
    id: isEditing.value ? itemId.value : undefined,
  }

  console.log('Payload', payload)

  try {
    await courseService.upsertItem(payload)

    const successMessage = isEditing.value
      ? 'Curso atualizado com sucesso'
      : 'Novo curso cadastrado com sucesso'

    showToast(successMessage, 'top', 'success')
    emits('saved', true)
    router.push({
      name: 'RegisterCourse',
      query: { refresh: Date.now().toString() },
    })
  }
  catch (error: any) {
    console.error('Erro ao salvar curso:', error)

    // Exibe mensagem específica dependendo do tipo de erro
    if (error.message) {
      if (error.message.includes('Nome do curso já existente')) {
        showToast('Não foi possível salvar o novo curso: Nome do curso já existente', 'top', 'warning')
      }
      else if (error.message.includes('Abreviação de curso já existente')) {
        showToast('Não foi possível salvar novo curso: Abreviação do curso já existente', 'top', 'warning')
      }
      else {
        showToast(`Erro ao salvar curso: ${error.message}`, 'top', 'danger')
      }
    }
    else {
      showToast('Erro ao salvar curso', 'top', 'danger')
    }
  }
}

function resetForm() {
  router.back()
}

function trimDescription(event: Event) {
  const el = event.target as HTMLTextAreaElement
  if (el.value.length > 180)
    el.value = el.value.slice(0, 180)
}
function autoResizeTextarea() {
  const el = descriptionRef.value
  if (el) {
    el.style.height = '80px'
    el.style.height = 'auto'
    el.style.height = `${Math.max(80, el.scrollHeight)}px`
  }
}

async function presetFirstInstitutionOnIonSelect() {
  // Carregar instituições e preencher o input de instituição(IonSelect) com o primeiro elemento da consulta
  const result = await institutionService.getInstitutions()
  institutions.value = result ?? []
  return result && result.length > 0 ? result[0].id : ''
}

onMounted(async () => {
  disciplines.value = await baseService.getListByCustomTable('discipline')
  formValues.value.institutionId = await presetFirstInstitutionOnIonSelect()
  evaluationRules.value = await evaluationRuleService.getAllRules()

  schools.value = await schoolService.getAllSchools()
})
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
      <Form
        id="course-form" :key="formValues.id || 'new'" class="ion-margin-horizontal" :initial-values="formValues"
        @submit="handleSubmit"
      >
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
            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field }" name="name" label="Nome da série" rules="min:2|max:120">
                  <div class="floating-input">
                    <input
                      v-bind="field" v-model="formValues.name" type="text" class="floating-native" placeholder=" "
                      :maxlength="7" @input="field.onInput"
                    >
                    <label class="floating-label"><span>Nome da série</span></label>
                  </div>
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
                <Field v-slot="{ field }" name="description" label="Descrição da série" rules="max:240">
                  <div class="description-input">
                    <textarea
                      v-bind="field" ref="descriptionRef" v-model="formValues.description"
                      class="description-native" placeholder=" " maxlength="181" @input="(event) => {
                        field.onInput(event);
                        trimDescription(event);
                        autoResizeTextarea();
                      }"
                    />
                    <label class="floating-label top-label"><span>Descrição da série</span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="description">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" class="ion-margin-vertical">
                <Field v-slot="{ field, errors }" name="institutionId" rules="">
                  <IonSelect
                    v-model="formValues.institutionId" v-bind="field" label="Instituição"
                    label-placement="floating" fill="outline" disabled :items="institutions"
                  >
                    <IonSelectOption v-for="(institution, index) in institutions" :key="index" :value="institution.id">
                      {{ institution.name }}
                    </IonSelectOption>
                  </IonSelect>
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field, errors }" name="courseId" rules="required">
                  <IonSelect
                    v-model="formValues.courseId" v-bind="field" label-placement="floating" fill="outline"
                    :items="courseList"
                  >
                    <label slot="label"><span>Curso </span><span class="required-text">(Obrigatório)</span></label>

                    <IonSelectOption v-for="(course, index) in courseList" :key="index" :value="course.id">
                      {{ course.name }}
                    </IonSelectOption>
                  </IonSelect>
                  <ErrorMessage v-slot="{ message }" name="name">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>
                  <span class="error-message">{{ errors[0]?.replace('courseId', 'Curso') }}</span>
                </Field>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <Field v-slot="{ field, errors }" name="workload" label="Carga horária">
                  <div class="floating-input">
                    <input
                      v-bind="field" v-model="formValues.workload" type="text" class="floating-native"
                      :maxlength="7" @input="field.onInput"
                    >
                    <label class="floating-label"><span>Carga horária </span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="name">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>

                  <span class="error-message">{{ errors[0] }}</span>
                </Field>
              </IonCol>

              <IonCol size="12" size-lg="6">
                <Field v-slot="{ field, errors }" name="schoolDays" label="Dias letivos">
                  <div class="floating-input">
                    <input
                      v-bind="field" v-model="formValues.schoolDays" type="text" class="floating-native"
                      :maxlength="7" @input="field.onInput"
                    >
                    <label class="floating-label"><span>Dias letivos </span> </label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="name">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>

                  <span class="error-message">{{ errors[0] }}</span>
                </Field>
              </IonCol>

              <IonCol size="12" size-lg="6">
                <Field v-slot="{ field, errors }" name="standardAge" label="Idade padrão">
                  <div class="floating-input">
                    <input
                      v-bind="field" v-model="formValues.standardAge" type="text" class="floating-native"
                      :maxlength="7" @input="field.onInput"
                    >
                    <label class="floating-label"><span>Idade padrão </span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="name">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>

                  <span class="error-message">{{ errors[0] }}</span>
                </Field>
              </IonCol>

              <IonCol size="12" size-lg="6">
                <Field v-slot="{ field, errors }" name="ageRangeMin" label="Idade mínima">
                  <div class="floating-input">
                    <input
                      v-bind="field" v-model="formValues.ageRangeMin" type="text" class="floating-native"
                      :maxlength="7" @input="field.onInput"
                    >
                    <label class="floating-label"><span>Idade mínima </span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="name">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>

                  <span class="error-message">{{ errors[0] }}</span>
                </Field>
              </IonCol>

              <IonCol size="12" size-lg="6">
                <Field v-slot="{ field, errors }" name="ageRangeMin" label="Idade mínima">
                  <div class="floating-input">
                    <input
                      v-bind="field" v-model="formValues.ageRangeMin" type="text" class="floating-native"
                      :maxlength="7" @input="field.onInput"
                    >
                    <label class="floating-label"><span>Idade mínima </span></label>
                  </div>
                  <ErrorMessage v-slot="{ message }" name="name">
                    <div class="error-message">
                      {{ message }}
                    </div>
                  </ErrorMessage>

                  <span class="error-message">{{ errors[0] }}</span>
                </Field>
              </IonCol>
            </IonRow>
          </IonSegmentContent>
          <IonSegmentContent id="discipline-info">
            <IonList>
              <IonItem v-for="(discipline, index) in disciplines" :key="index">
                <IonGrid>
                  <IonRow>
                    <IonCol size="12">
                      <Field v-slot="{ field, errors }" name="discipline.name" label="Disciplina" rules="required">
                        <IonSelect
                          v-model="discipline.name" v-bind="field" label="Disciplina" label-placement="stacked"
                          placeholder="Selecione uma disciplina" cancel-text="Cancelar" fill="outline"
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
                          v-model="discipline.workload" v-bind="field" label-placement="stacked"
                          label="Carga horária" placeholder="Digite a carga horária" fill="outline"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                      </Field>
                    </IonCol>
                    <IonCol size="6">
                      <Field v-slot="{ field, errors }" name="year" label="Ano" rules="required">
                        <IonInput
                          v-model="discipline.year" v-bind="field" label-placement="stacked" label="Ano"
                          placeholder="Digite o ano" fill="outline"
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

    <!-- <div>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonButton color="danger" expand="full" @click="resetForm">
              Fechar
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton color="secondary" expand="full" :disabled="!saveButtonEnabled" type="submit" form="course-form">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div> -->
    <div>
      <IonGrid>
        <IonRow class="action-buttons-fixed">
          <IonCol size="6">
            <IonButton
              color="danger" expand="full"
              @click="!route.path.includes('register') ? emits('close', false) : resetForm()"
            >
              Cancelar
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton color="secondary" expand="full" :disabled="!saveButtonEnabled" type="submit" form="course-form">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  </IonPage>
</template>

<style scoped>
.page-title {
  font-weight: bold;
  color: var(--ion-color-secondary);
}

.toolbar-accent {
  height: 4px;
  background-color: var(--ion-color-primary);
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

.description-input {
  position: relative;
  border: 1px solid var(--ion-color-primary);
  border-radius: 4px;
  margin-top: 16px;
  min-height: 80px;
}

.description-native {
  width: 100%;
  height: auto;
  padding: 8px 16px 6px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: var(--ion-color-dark-tint);
  overflow: hidden;
  resize: none;
}

.description-native::placeholder {
  color: transparent;
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

.floating-native:focus+.floating-label,
.floating-native:not(:placeholder-shown)+.floating-label,
.description-native:focus+.floating-label,
.description-native:not(:placeholder-shown)+.floating-label {
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
}

.action-buttons-fixed {
  margin: 0;
  padding: 8px;
}

ion-select {
  /* --label-color: var(--ion-color-primary); */
  /* --placeholder-opacity: 1; */
  /* width: 100%; */
  /* justify-content: center; */
  --border-color: var(--ion-color-secondary);
}

/*
  ion-select::part(placeholder),
  ion-select::part(text) {
    flex: 0 0 auto;
  } */

/* ion-select::part(text) {
    color: var(--ion-color-secondary);
  } */
/* ion-select::part(label) {
    color: var(--ion-color-primary);
  } */

ion-select::part(icon) {
  color: var(--ion-color-secondary);
  opacity: 1;
}
</style>
