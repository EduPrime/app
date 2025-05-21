<script setup lang="ts">
import showToast from '@/utils/toast-alert'
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
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
import EvaluationRuleService from '../../services/EvaluationRuleService'

const route = useRoute()
const router = useRouter()
const evaluationRuleService = new EvaluationRuleService()

const initialFormValues: {
  id: string;
  name: string;
  gradeType: string;
  progressionType: string;
  parallelMakeupExam: string;
  averageFormula: string;
  makeupFormula: string;
  maximumGrade: string;
  minimumGrade: string;
  numberActivities: string;
  average: string;
  frequencyType: string | null;
  feedbackType: string | null;
  attendancePercentage: string;
} = { 
  id: '', 
  name: '', 
  gradeType: '',
  progressionType: '',
  parallelMakeupExam: '',
  averageFormula: '',
  makeupFormula: '',
  maximumGrade: '',
  minimumGrade: '',
  numberActivities: '',
  average: '',
  frequencyType: null,
  feedbackType: null,
  attendancePercentage: ''
}

const formValues = ref({ ...initialFormValues })
const originalFormValues = ref({ ...initialFormValues })
const isEditing = ref(false)
const evaluationRuleId = computed(() => route.params.id as string | undefined)
const pageTitle = computed(() => isEditing.value ? 'Editar regra de avaliação' : 'Nova regra de avaliação')
const formulaRef = ref<HTMLTextAreaElement | null>(null)
const hasChanges = ref(false)

const decimalOptions = {
  mask: Number,
  thousandsSeparator: '',
  radix: ',',
  scale: 2,
  padFractionalZeros: true,
  normalizeZeros: false,
  lazy: false,
  mapToRadix: ['.'],
  prepare: (str: string) => {
    return str.replace('.', ',').replace(/[^\d,]/g, '')
  },
}

function checkForChanges() {
  if (!isEditing.value)
    return

  const hasNameChanged = formValues.value.name !== originalFormValues.value.name
  const hasGradeTypeChanged = formValues.value.gradeType !== originalFormValues.value.gradeType
  const hasProgressionTypeChanged = formValues.value.progressionType !== originalFormValues.value.progressionType
  const hasParallelMakeupExamChanged = formValues.value.parallelMakeupExam !== originalFormValues.value.parallelMakeupExam
  const hasAverageFormulaChanged = formValues.value.averageFormula !== originalFormValues.value.averageFormula
  const hasMakeupFormulaChanged = formValues.value.makeupFormula !== originalFormValues.value.makeupFormula
  const hasMaximumGradeChanged = formValues.value.maximumGrade !== originalFormValues.value.maximumGrade
  const hasMinimumGradeChanged = formValues.value.minimumGrade !== originalFormValues.value.minimumGrade
  const hasNumberActivitiesChanged = formValues.value.numberActivities !== originalFormValues.value.numberActivities
  const hasAverageChanged = formValues.value.average !== originalFormValues.value.average
  const hasFrequencyTypeChanged = formValues.value.frequencyType !== originalFormValues.value.frequencyType
  const hasFeedbackTypeChanged = formValues.value.feedbackType !== originalFormValues.value.feedbackType
  const hasAttendancePercentageChanged = formValues.value.attendancePercentage !== originalFormValues.value.attendancePercentage

  hasChanges.value = hasNameChanged || hasGradeTypeChanged || hasProgressionTypeChanged || 
                      hasParallelMakeupExamChanged || hasAverageFormulaChanged || 
                      hasMakeupFormulaChanged || hasMaximumGradeChanged || hasMinimumGradeChanged || 
                      hasNumberActivitiesChanged || hasAverageChanged || hasFrequencyTypeChanged || 
                      hasFeedbackTypeChanged || hasAttendancePercentageChanged
}

const saveButtonEnabled = computed(() => {
  if (!isEditing.value) {
    return !!formValues.value.name || !!formValues.value.gradeType || 
           !!formValues.value.progressionType || !!formValues.value.maximumGrade || 
           !!formValues.value.minimumGrade || !!formValues.value.average
  }

  return hasChanges.value
})

watchEffect(() => {
  if (formValues.value.averageFormula) {
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
  formValues.value = { ...initialFormValues }
  originalFormValues.value = { ...initialFormValues }
  hasChanges.value = false
  if (evaluationRuleId.value) {
    isEditing.value = true
    
    try {
      const rule = await evaluationRuleService.getEvaluationRuleById(evaluationRuleId.value)

      if (rule) {
        const loadedValues = {
          id: rule.id,
          name: rule.name,
          gradeType: rule.gradeType,
          progressionType: rule.progressionType,
          parallelMakeupExam: rule.parallelMakeupExam,
          averageFormula: rule.averageFormula || '',
          makeupFormula: rule.makeupFormula || '',
          maximumGrade: rule.maximumGrade.toString(),
          minimumGrade: rule.minimumGrade.toString(),
          numberActivities: rule.numberActivities.toString(),
          average: rule.average.toString(),
          frequencyType: rule.frequencyType,
          feedbackType: rule.feedbackType,
          attendancePercentage: rule.attendancePercentage.toString()
        }

        formValues.value = { ...loadedValues }
        originalFormValues.value = { ...loadedValues }
        hasChanges.value = false

        autoResizeTextarea()
      }
    } catch (error) {
      console.error('Erro ao carregar regra de avaliação:', error)
      showToast('Erro ao carregar regra de avaliação', 'top', 'danger')
    }
  } else {
    isEditing.value = false
  }
})

async function handleSubmit(values: any) {
  const payload = {
    id: isEditing.value ? evaluationRuleId.value : undefined,
    name: values.name,
    gradeType: values.gradeType,
    progressionType: values.progressionType,
    parallelMakeupExam: values.parallelMakeupExam,
    averageFormula: values.averageFormula,
    makeupFormula: values.makeupFormula,
    maximumGrade: values.maximumGrade,
    minimumGrade: values.minimumGrade,
    numberActivities: values.numberActivities,
    average: values.average,
    frequencyType: values.frequencyType,
    feedbackType: values.feedbackType,
    attendancePercentage: values.attendancePercentage
  }

  try {
    await evaluationRuleService.upsertEvaluationRule(payload)

    const successMessage = isEditing.value
      ? 'Regra de avaliação atualizada com sucesso'
      : 'Nova regra de avaliação cadastrada com sucesso'

    showToast(successMessage, 'top', 'success')

    router.push({
      name: 'EvaluationRuleListRule',
      query: { refresh: Date.now().toString() },
    })
  }
  catch (error: any) {
    console.error('Erro ao salvar regra de avaliação:', error)

    if (error.message) {
      if (error.message.includes('Nome de regra já existente')) {
        showToast('Não foi possível salvar nova regra: Nome de regra já existente', 'top', 'warning')
      }
      else {
        showToast(`Erro ao salvar regra de avaliação: ${error.message}`, 'top', 'danger')
      }
    }
    else {
      showToast('Erro ao salvar regra de avaliação', 'top', 'danger')
    }
  }
}

function resetForm() {
  router.back()
}

function trimFormula(event: Event) {
  const el = event.target as HTMLTextAreaElement
  if (el.value.length > 180)
    el.value = el.value.slice(0, 180)
}

function autoResizeTextarea() {
  const el = formulaRef.value
  if (el) {
    el.style.height = '80px'
    el.style.height = 'auto'
    el.style.height = `${Math.max(80, el.scrollHeight)}px`
  }
}
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
      <Form id="evaluation-rule-form" :key="formValues.id || 'new'" :initial-values="formValues" @submit="handleSubmit">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="name" label="Nome da regra" rules="required|min:3|max:180">
                <div class="floating-input">
                  <input
                    v-bind="field"
                    v-model="formValues.name"
                    type="text"
                    class="floating-native"
                    placeholder=" "
                    @input="field.onInput"
                  >
                  <label class="floating-label"><span>Nome da regra </span><span class="required-text">(Obrigatório)</span></label>
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
              <Field v-slot="{ field }" name="gradeType" label="Tipo de Nota" rules="required">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.gradeType"
                    interface="alert"
                    placeholder="Selecione o tipo de nota"
                    class="floating-native"
                    @ionChange="field.onChange"
                  >
                    <IonSelectOption value="NUMERIC">Numérica</IonSelectOption>
                    <IonSelectOption value="CONCEPTUAL">Conceitual</IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Tipo de Nota </span><span class="required-text">(Obrigatório)</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="gradeType">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="progressionType" label="Tipo de Progressão" rules="required">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.progressionType"
                    interface="alert"
                    placeholder="Selecione o tipo de progressão"
                    class="floating-native"
                    @ionChange="field.onChange"
                  >
                    <IonSelectOption value="AVERAGE">Média</IonSelectOption>
                    <IonSelectOption value="TOTAL">Total</IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Tipo de Progressão </span><span class="required-text">(Obrigatório)</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="progressionType">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="parallelMakeupExam" label="Recuperação Paralela" rules="required">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.parallelMakeupExam"
                    interface="alert"
                    placeholder="Permite recuperação paralela?"
                    class="floating-native"
                    @ionChange="field.onChange"
                  >
                    <IonSelectOption value="YES">Sim</IonSelectOption>
                    <IonSelectOption value="NO">Não</IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Recuperação Paralela </span><span class="required-text">(Obrigatório)</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="parallelMakeupExam">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="maximumGrade" label="Nota Máxima" rules="required|notaValida">
                <IonItem lines="none" class="custom-ion-item">
                  <IonInput
                    v-bind="field"
                    v-model="formValues.maximumGrade"
                    v-imask="decimalOptions"
                    class="input-rounded"
                    title="Nota Máxima"
                    label="Nota Máxima"
                    label-placement="floating"
                    placeholder="Digite a nota máxima"
                    @ion-change="field.onChange"
                  />
                </IonItem>
                <ErrorMessage v-slot="{ message }" name="maximumGrade">
                  <span class="error-message">{{ message }}</span>
                </ErrorMessage>
              </Field>
            </IonCol>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="minimumGrade" label="Nota Mínima" rules="required|notaValida">
                <IonItem lines="none" class="custom-ion-item">
                  <IonInput
                    v-bind="field"
                    v-model="formValues.minimumGrade"
                    v-imask="decimalOptions"
                    class="input-rounded"
                    title="Nota Mínima"
                    label="Nota Mínima"
                    label-placement="floating"
                    placeholder="Digite a nota mínima"
                    @ion-change="field.onChange"
                  />
                </IonItem>
                <ErrorMessage v-slot="{ message }" name="minimumGrade">
                  <span class="error-message">{{ message }}</span>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="numberActivities" label="Número de Atividades" rules="required|max:3">
                <IonItem lines="none" class="custom-ion-item">
                  <IonInput
                    v-bind="field"
                    v-model="formValues.numberActivities"
                    class="input-rounded"
                    title="Número de Atividades"
                    label="Número de Atividades"
                    label-placement="floating"
                    placeholder="Digite o número de atividades"
                    @ion-change="field.onChange"
                  />
                </IonItem>
                <ErrorMessage v-slot="{ message }" name="numberActivities">
                  <span class="error-message">{{ message }}</span>
                </ErrorMessage>
              </Field>
            </IonCol>
            <IonCol size="12" size-md="6">
              <Field v-slot="{ field }" name="average" label="Média" rules="required|notaValida">
                <IonItem lines="none" class="custom-ion-item">
                  <IonInput
                    v-bind="field"
                    v-model="formValues.average"
                    v-imask="decimalOptions"
                    class="input-rounded"
                    title="Média"
                    label="Média"
                    label-placement="floating"
                    placeholder="Digite a média"
                    @ion-change="field.onChange"
                  />
                </IonItem>
                <ErrorMessage v-slot="{ message }" name="average">
                  <span class="error-message">{{ message }}</span>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="attendancePercentage" label="Porcentagem de Frequência" rules="required|min:1|max:100">
                <IonItem lines="none" class="custom-ion-item">
                  <div class="percentage-input-container">
                    <IonInput
                      v-bind="field"
                      v-model="formValues.attendancePercentage"
                      class="input-rounded percentage-input"
                      title="Porcentagem de Frequência"
                      label="Porcentagem de Frequência"
                      label-placement="floating"
                      placeholder="Digite a porcentagem"
                      @ion-change="field.onChange"
                    />
                    <div class="percentage-symbol">%</div>
                  </div>
                </IonItem>
                <ErrorMessage v-slot="{ message }" name="attendancePercentage">
                  <span class="error-message">{{ message }}</span>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="frequencyType" label="Tipo de Frequência">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.frequencyType"
                    interface="alert"
                    placeholder="Selecione o tipo de frequência"
                    class="floating-native"
                    @ionChange="field.onChange"
                  >
                    <IonSelectOption value="DAILY">Diária</IonSelectOption>
                    <IonSelectOption value="SUBJECT">Por Disciplina</IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Tipo de Frequência</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="frequencyType">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="feedbackType" label="Tipo de Feedback">
                <div class="floating-input select-input">
                  <IonSelect
                    v-bind="field"
                    v-model="formValues.feedbackType"
                    interface="alert"
                    placeholder="Selecione o tipo de feedback"
                    class="floating-native"
                    @ionChange="field.onChange"
                  >
                    <IonSelectOption value="NUMERIC">Numérico</IonSelectOption>
                    <IonSelectOption value="CONCEPTUAL">Conceitual</IonSelectOption>
                    <IonSelectOption value="DESCRIPTIVE">Descritivo</IonSelectOption>
                  </IonSelect>
                  <label class="floating-label"><span>Tipo de Feedback</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="feedbackType">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="averageFormula" label="Fórmula para Média" rules="max:180">
                <div class="description-input">
                  <textarea
                    v-bind="field"
                    ref="formulaRef"
                    v-model="formValues.averageFormula"
                    class="description-native"
                    placeholder=" "
                    maxlength="181"
                    @input="(event) => {
                      field.onInput(event);
                      trimFormula(event);
                      autoResizeTextarea();
                    }"
                  />
                  <label class="floating-label top-label"><span>Fórmula para Média</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="averageFormula">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field }" name="makeupFormula" label="Fórmula para Recuperação" rules="max:180">
                <div class="description-input">
                  <textarea
                    v-bind="field"
                    v-model="formValues.makeupFormula"
                    class="description-native"
                    placeholder=" "
                    maxlength="181"
                    @input="(event) => {
                      field.onInput(event);
                      trimFormula(event);
                    }"
                  />
                  <label class="floating-label top-label"><span>Fórmula para Recuperação</span></label>
                </div>
                <ErrorMessage v-slot="{ message }" name="makeupFormula">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>
        </IonGrid>
      </Form>
    </IonContent>

    <IonFooter>
      <IonToolbar>
        <IonGrid>
          <IonRow class="action-buttons-fixed">
            <IonCol size="6">
              <IonButton color="danger" expand="block" @click="resetForm">
                Cancelar
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton expand="block" type="submit" form="evaluation-rule-form" :disabled="!saveButtonEnabled">
                Salvar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
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
.floating-label { position:absolute; top:50%; left:16px; transform:translateY(-50%); background:white; padding:0 4px; font-size:1rem; pointer-events:none; transition:0.2s ease all; color:var(--ion-color-medium-shade); white-space: nowrap; }
.top-label { top:8px; transform:translateY(0); }
.floating-native:focus + .floating-label, .floating-native:not(:placeholder-shown) + .floating-label, .description-native:focus + .floating-label, .description-native:not(:placeholder-shown) + .floating-label { top:-8px; transform:translateY(0); font-size:0.75rem; color:var(--ion-color-primary); }
.required-text { color:var(--ion-color-danger); }
.error-message { color:var(--ion-color-danger); font-size:0.8rem; margin-top:4px; }
.action-buttons-fixed { margin: 0; padding: 8px; }
.select-input ion-select { padding-left: 16px; }

/* Estilos para os inputs com IonInput */
.custom-ion-item {
  --border-color: var(--ion-color-primary);
  --border-radius: 4px;
  --border-width: 1px;
  --padding-start: 0;
  margin-top: 16px;
}

.input-rounded {
  --border-radius: 4px;
  --padding-start: 16px;
  --padding-end: 16px;
  --placeholder-color: var(--ion-color-medium-shade);
  font-size: 1rem;
}

.percentage-input-container {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.percentage-input {
  width: 100%;
  position: relative;
  --padding-end: 30px; /* Espaço para o símbolo % */
}

.percentage-symbol {
  position: absolute;
  right: 25px; /* Mais próximo do número */
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: var(--ion-color-dark-tint);
  pointer-events: none;
  font-weight: bold;
}
</style>
