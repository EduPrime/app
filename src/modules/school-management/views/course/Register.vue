<script setup lang="ts">
import type { Institutions } from '../../types/types'
import EvaluationRuleService from '@/services/EvaluationRuleService'
import showToast from '@/utils/toast-alert'
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
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
const initialFormValues = {
  id: '',
  name: '',
  abbreviation: '',
  // numberOfStages: '',
  description: '',
  timeSerialization: undefined,
  institutionId: null,
  // schoolId: undefined,
  evaluationRuleId: undefined,
  workerId: undefined,
  // courseStage: undefined,
  graduate: undefined,
  teachingType: undefined,
  regimeType: undefined,
  courseModality: null,
}

const formValues = ref({ ...initialFormValues })
const originalFormValues = ref({ ...initialFormValues })
const isEditing = ref(!!props.editId)
const itemId = computed(() => props.editId ?? route.params.id as string | undefined)
const pageTitle = computed(() => isEditing.value ? 'Editar curso' : 'Novo curso')
const descriptionRef = ref<HTMLTextAreaElement | null>(null)
const hasChanges = ref(false)
const institutions = ref<Institutions[]>({} as Institutions[])
const evaluationRules = ref()
const schools = ref()

// Curso para verificar se houve mudanças nos campos
function checkForChanges() {
  if (!isEditing.value)
    return

  const hasNameChanged = formValues.value.name !== originalFormValues.value.name
  const hasAbbreviationChanged = formValues.value.abbreviation !== originalFormValues.value.abbreviation
  const hasDescriptionChanged = formValues.value.description !== originalFormValues.value.description
  const hasSerializationChanged = formValues.value.timeSerialization !== originalFormValues.value.timeSerialization
  const hasRegimeTypeChanged = formValues.value.regimeType !== originalFormValues.value.regimeType
  const hasTeachingTypeChanged = formValues.value.teachingType !== originalFormValues.value.teachingType
  const hasGraduateChanged = formValues.value.graduate !== originalFormValues.value.graduate
  const hasInstitutionIdChanged = formValues.value.institutionId !== originalFormValues.value.institutionId
  const hasCourseModalityChanged = formValues.value.courseModality !== originalFormValues.value.courseModality
  const hasEvaluationRuleIdChanged = formValues.value.evaluationRuleId !== originalFormValues.value.evaluationRuleId

  hasChanges.value = hasNameChanged || hasTeachingTypeChanged || hasGraduateChanged || hasInstitutionIdChanged || hasCourseModalityChanged || hasEvaluationRuleIdChanged || hasAbbreviationChanged || hasDescriptionChanged || hasSerializationChanged || hasRegimeTypeChanged
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
      <Form id="course-form" :key="formValues.id || 'new'" :initial-values="formValues" @submit="handleSubmit">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="name" label="Nome do curso" rules="required|min:3|max:180">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.name"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Nome do curso </span><span class="required-text">(Obrigatório)</span></label>
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
              <Field v-slot="{ field }" name="abbreviation" label="Abreviação" rules="min:2|max:8">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.abbreviation"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    :maxlength="7"
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Abreviação</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="abbreviation">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" class="ion-margin-top">
              <Field v-slot="{ field, errors }" name="timeSerialization" rules="required">
                <IonSelect
                  v-model="formValues.timeSerialization"
                  v-bind="field"

                  label-placement="floating"
                  fill="outline"
                  :items="[
                    { value: 'Anual', name: 'Anual' },
                    { value: 'Creche', name: 'Creche' },
                  ]"
                >
                  <label slot="label"><span>Serialização </span><span class="required-text">(Obrigatório)</span></label>
                  <IonSelectOption
                    v-for="(periodo, index) in [
                      { value: 'Anual', name: 'Anual' },
                      { value: 'Creche', name: 'Creche' },
                    ]"
                    :key="index"
                    :value="periodo.value"
                  >
                    {{ periodo.name }}
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0]?.replace('timeSerialization', 'Serialização') }}</span>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" class="ion-margin-top">
              <Field v-slot="{ field, errors }" name="regimeType" rules="required">
                <IonSelect
                  v-model="formValues.regimeType"
                  v-bind="field"
                  label-placement="floating"
                  fill="outline"
                  :items="[
                    { value: 'Presencial', name: 'Presencial' },
                    { value: 'Semipresencial', name: 'Semipresencial' },
                    { value: 'EAD', name: 'Ensino a distância (EAD)' },
                  ]"
                >
                  <label slot="label"><span>Tipo de regime </span><span class="required-text">(Obrigatório)</span></label>

                  <IonSelectOption
                    v-for="(regime, index) in [
                      { value: 'Presencial', name: 'Presencial' },
                      { value: 'Semipresencial', name: 'Semipresencial' },
                      { value: 'EAD', name: 'Ensino a distância (EAD)' },
                    ]"
                    :key="index"
                    :value="regime.value"
                  >
                    {{ regime.name }}
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0]?.replace('regimeType', 'Tipo de regime') }}</span>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" class="ion-margin-top">
              <Field v-slot="{ field, errors }" name="teachingType" rules="required">
                <IonSelect
                  v-model="formValues.teachingType"
                  v-bind="field"
                  label-placement="floating"
                  fill="outline"
                  :items="[
                    { value: 'Regular', name: 'Regular' },
                    { value: 'Creche', name: 'Creche' },
                  ]"
                >
                  <label slot="label"><span>Tipo de ensino </span><span class="required-text">(Obrigatório)</span></label>

                  <IonSelectOption
                    v-for="(modality, index) in [
                      { value: 'Regular', name: 'Regular' },
                      { value: 'Creche', name: 'Creche' },
                    ]"
                    :key="index"
                    :value="modality.value"
                  >
                    {{ modality.name }}
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0]?.replace('teachingType', 'Tipo de ensino') }}</span>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" class="ion-margin-top">
              <Field v-slot="{ field, errors }" name="courseModality" rules="required">
                <IonSelect
                  v-model="formValues.courseModality"
                  v-bind="field"

                  label-placement="floating"
                  fill="outline"
                  :items="[
                    { value: 'Ensino Regular', name: 'Ensino regular' },
                    { value: 'Ensino Especial', name: 'Educação especial' },
                    { value: 'EJA', name: 'Educação para jovens e adultos (EJA)' },
                    { value: 'Ensino Profissionalizante', name: 'Educação Profissionalizante' },
                  ]"
                >
                  <label slot="label"><span>Modalidade de curso </span><span class="required-text">(Obrigatório)</span></label>

                  <IonSelectOption
                    v-for="(modality, index) in [
                      { value: 'Ensino Regular', name: 'Ensino regular' },
                      { value: 'Ensino Especial', name: 'Educação especial' },
                      { value: 'EJA', name: 'Educação para jovens e adultos (EJA)' },
                      { value: 'Ensino Profissionalizante', name: 'Educação Profissionalizante' },
                    ]"
                    :key="index"
                    :value="modality.value"
                  >
                    {{ modality.name }}
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0]?.replace('courseModality', 'Modalidade de curso') }}</span>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="description" label="Descrição do curso" rules="max:240">
                <div class="description-input">
                  <textarea
                    v-bind="field"
                    ref="descriptionRef"
                    v-model="formValues.description"
                    class="description-native"
                    placeholder=" "
                    maxlength="181"
                    @input="(event) => {
                      field.onInput(event);
                      trimDescription(event);
                      autoResizeTextarea();
                    }"
                  />
                  <label class="floating-label top-label"><span>Descrição do curso</span></label>
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
                  v-model="formValues.institutionId"
                  v-bind="field"
                  label="Instituição"
                  label-placement="floating"
                  fill="outline"
                  disabled
                  :items="institutions"
                >
                  <IonSelectOption
                    v-for="(institution, index) in institutions"
                    :key="index"
                    :value="institution.id"
                  >
                    {{ institution.name }}
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>
            </IonCol>
          </IonRow>

          <!-- @TODO: Adicionar regra de avaliação ( está estático ) -->
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="evaluationRuleId" rules="required">
                <IonSelect

                  v-model="formValues.evaluationRuleId"
                  v-bind="field"
                  label-placement="floating"
                  fill="outline"
                  :items="evaluationRules"
                >
                  <label slot="label"><span>Regra de avaliação </span><span class="required-text">(Obrigatório)</span></label>

                  <IonSelectOption
                    v-for="(rule, index) in evaluationRules"
                    :key="index"
                    :value="rule.id"
                  >
                    {{ rule.name }}
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0]?.replace('evaluationRuleId', 'Regra de avaliação') }}</span>
              </Field>
            </IonCol>
          </IonRow>
          <!-- @TODO: Adicionar regra de avaliação ( está estático ) -->

          <!-- <IonRow class="ion-margin-vertical">
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="schoolId" rules="">
                <IonSelect
                  v-model="formValues.schoolId"
                  v-bind="field"
                  label="Escola"
                  label-placement="floating"
                  fill="outline"
                  :items="evaluationRules"
                >
                  <IonSelectOption
                    v-for="(school, index) in schools"
                    :key="index"
                    :value="school.id"
                  >
                    {{ school.name }}
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>
            </IonCol>
          </IonRow> -->

          <!-- <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="numberOfStages" label="Número de etapas" rules="min:1|max:2">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.numberOfStages"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    :maxlength="2"
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Número de etapas</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="numberOfStages">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow> -->

          <!-- <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="courseStage" label="Etapa do curso" rules="min:1|max:2">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.courseStage"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    :maxlength="2"
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Etapa do curso</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="courseStage">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow> -->

          <!-- @TODO: Futuramente procurar uma forma de puxar as opções de seleção ( está estático ) -->

          <IonRow class="ion-margin-vertical">
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="graduate" rules="required">
                <IonSelect
                  v-model="formValues.graduate"
                  v-bind="field"

                  label-placement="floating"
                  fill="outline"
                  :items="['Infantil', 'Fundamental', 'Médio', 'Superior']"
                >
                  <label slot="label"><span>Nível de ensino </span><span class="required-text">(Obrigatório)</span></label>

                  <IonSelectOption
                    v-for="(school, index) in ['Infantil', 'Fundamental', 'Médio', 'Superior']"
                    :key="index"
                    :value="school"
                  >
                    {{ school }}
                  </IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0]?.replace('graduate', 'Nível de ensino') }}</span>
              </Field>
            </IonCol>
          </IonRow>
        </IonGrid>
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
            <IonButton color="danger" expand="full" @click="!route.path.includes('register') ? emits('close', false) : resetForm()">
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
  font-weight: bold; color: var(--ion-color-secondary);
}

.toolbar-accent { height: 4px; background-color: var(--ion-color-primary); }
.content-with-footer { padding-bottom: 80px; }
.floating-input { position: relative; border: 1px solid var(--ion-color-primary); border-radius: 4px; margin-top: 16px; height: 56px; }
.floating-native { width:100%; height:100%; padding:0 16px; border:none; outline:none; background:transparent; font-size:1rem; color:var(--ion-color-dark-tint); display:flex; align-items:center; }
.floating-native::placeholder { color:transparent; }
.description-input { position:relative; border:1px solid var(--ion-color-primary); border-radius:4px; margin-top:16px; min-height:80px; }
.description-native { width:100%; height:auto; padding:8px 16px 6px; border:none; outline:none; background:transparent; font-size:1rem; color:var(--ion-color-dark-tint); overflow:hidden; resize:none; }
.description-native::placeholder { color:transparent; }
.floating-label { position:absolute; top:50%; left:16px; transform:translateY(-50%); background:white; padding:0 4px; font-size:1rem; pointer-events:none; transition:0.2s ease all; color:var(--ion-color-medium-shade); }
.top-label { top:8px; transform:translateY(0); }
.floating-native:focus + .floating-label, .floating-native:not(:placeholder-shown) + .floating-label, .description-native:focus + .floating-label, .description-native:not(:placeholder-shown) + .floating-label { top:-8px; transform:translateY(0); font-size:0.75rem; color:var(--ion-color-primary); }
.required-text { color:var(--ion-color-danger); }
.error-message { color:var(--ion-color-danger); font-size:0.8rem; margin-top:4px; }
.action-buttons-fixed { margin: 0; padding: 8px; }

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
