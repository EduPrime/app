<script setup lang="ts">
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/vue'
import { analyticsOutline } from 'ionicons/icons'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue'
import EvaluationRuleService from '@/modules/school-management/services/EvaluationRuleService'

const props = defineProps<{
  editingId?: string
}>()

const emits = defineEmits<{
  (e: 'saved'): void
  (e: 'cancel'): void
  (e: 'error', message: string, color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark'): void
}>()

const evaluationRuleService = new EvaluationRuleService()

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
  }
}

const descriptionRef = ref<HTMLTextAreaElement | null>(null)
const initialFormValues = {
  id: '',
  name: '',
  courseId: '',
  gradeType: '',
  progressionType: '',
  parallelMakeupExam: '',
  maximumGrade: '',
  minimumGrade: '',
  average: '',
  description: ''
}

const formValues = ref({...initialFormValues})

const originalFormValues = ref({ ...formValues.value })
const hasChanges = ref(false)

const isEditMode = computed(() => !!props.editingId)
const modalTitle = computed(() => isEditMode.value ? 'Editar Regra de Avaliação' : 'Nova Regra de Avaliação')

const saveButtonEnabled = computed(() => {
  if (!isEditMode.value) {
    const enabled = !!formValues.value.name || !!formValues.value.courseId || 
                   !!formValues.value.gradeType || !!formValues.value.progressionType ||
                   !!formValues.value.maximumGrade || !!formValues.value.minimumGrade ||
                   !!formValues.value.average
    return enabled
  }
  return hasChanges.value
})

function checkForChanges() {
  if (!isEditMode.value)
    return
  const isDirty = Object.keys(formValues.value).some(key => {
    // @ts-ignore
    return formValues.value[key] !== originalFormValues.value[key]
  })
  
  hasChanges.value = isDirty
}

async function loadData() {
  if (!props.editingId) {
    formValues.value = {...initialFormValues}
    originalFormValues.value = {...initialFormValues}
    return
  }
  
  try {
    const isLoading = ref(true)
    const rule = await evaluationRuleService.getEvaluationRuleById(props.editingId)
    if (rule) {
      const loadedValues = {
        id: rule.id,
        name: rule.name,
        courseId: rule.courseId,
        gradeType: rule.gradeType,
        progressionType: rule.progressionType,
        parallelMakeupExam: rule.parallelMakeupExam,
        maximumGrade: rule.maximumGrade ? rule.maximumGrade.toString() : '',
        minimumGrade: rule.minimumGrade ? rule.minimumGrade.toString() : '',
        average: rule.average ? rule.average.toString() : '',
        description: (rule as any).description || ''
      }
      
      formValues.value = { ...loadedValues }
      originalFormValues.value = { ...loadedValues }
    } else {
      emits('error', 'Regra de avaliação não encontrada', 'warning')
      formValues.value = {...initialFormValues}
    }
    
    isLoading.value = false
  } catch (error: any) {
    emits('error', error.message || 'Erro ao carregar regra de avaliação', 'danger')
  }
}

function autoResizeTextarea() {
  const el = descriptionRef.value
  if (el) {
    el.style.height = '80px'
    el.style.height = 'auto'
    el.style.height = `${Math.max(80, el.scrollHeight)}px`
  }
}

function handleSubmit(values: any) {
  saveRule()
}

function handleCancel() {
  emits('cancel')
}

function handleSaved() {
  emits('saved')
}

function trimDescription(event: any) {
  const el = event.target as HTMLTextAreaElement
  if (el.value.length > 250)
    el.value = el.value.slice(0, 250)
}

async function saveRule() {
  try {
    const isLoading = ref(true)
    
    await evaluationRuleService.upsertEvaluationRule(formValues.value)
    
    isLoading.value = false
    handleSaved()
  } catch (error: any) {
    emits('error', error.message || 'Erro ao salvar regra de avaliação', 'danger')
  }
}

onMounted(() => {
  loadData()
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
    if (isEditMode.value) {
      checkForChanges()
    }
  },
  { deep: true, immediate: true }
)

checkForChanges()
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding ion-no-padding">
      <div class="style-purple-lane" style="display: flex; align-items: center;">
        <IonIcon :icon="analyticsOutline" style="margin-right: 10px;" />
        {{ modalTitle }}
      </div>
      <Form id="evaluation-rule-form-mobile" :key="formValues.id || 'new'" :initial-values="formValues" @submit="handleSubmit">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="name" label="Nome da regra" rules="required|min:3|max:180">
                <IonInput
                  v-bind="field"
                  v-model="formValues.name"
                  label="Nome da regra"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite o nome da regra"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="field.onInput"
                >
                  <div slot="label" class="required-field">
                    Nome da regra <span class="required-text">(Obrigatório)</span>
                  </div>
                </IonInput>
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
              <Field v-slot="{ field, errors }" name="gradeType" label="Tipo de Nota" rules="required">
                <IonSelect
                  v-bind="field"
                  v-model="formValues.gradeType"
                  label="Tipo de Nota"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Selecione o tipo de nota"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-change="field.onChange"
                >
                  <div slot="label" class="required-field">
                    Tipo de Nota <span class="required-text">(Obrigatório)</span>
                  </div>
                  <IonSelectOption value="NUMERIC">Numérica</IonSelectOption>
                  <IonSelectOption value="CONCEPTUAL">Conceitual</IonSelectOption>
                </IonSelect>
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
              <Field v-slot="{ field, errors }" name="progressionType" label="Tipo de Progressão" rules="required">
                <IonSelect
                  v-bind="field"
                  v-model="formValues.progressionType"
                  label="Tipo de Progressão"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Selecione o tipo de progressão"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-change="field.onChange"
                >
                  <div slot="label" class="required-field">
                    Tipo de Progressão <span class="required-text">(Obrigatório)</span>
                  </div>
                  <IonSelectOption value="AVERAGE">Média</IonSelectOption>
                  <IonSelectOption value="TOTAL">Total</IonSelectOption>
                </IonSelect>
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
              <Field v-slot="{ field, errors }" name="parallelMakeupExam" label="Recuperação Paralela" rules="required">
                <IonSelect
                  v-bind="field"
                  v-model="formValues.parallelMakeupExam"
                  label="Recuperação Paralela"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Possui recuperação paralela?"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-change="field.onChange"
                >
                  <div slot="label" class="required-field">
                    Recuperação Paralela <span class="required-text">(Obrigatório)</span>
                  </div>
                  <IonSelectOption value="YES">Sim</IonSelectOption>
                  <IonSelectOption value="NO">Não</IonSelectOption>
                </IonSelect>
                <ErrorMessage v-slot="{ message }" name="parallelMakeupExam">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="maximumGrade" label="Nota Máxima" rules="required|notaValida">
                <IonInput
                  v-bind="field"
                  v-model="formValues.maximumGrade"
                  v-imask="decimalOptions"
                  label="Nota Máxima"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite a nota máxima"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-change="field.onChange"
                >
                  <div slot="label" class="required-field">
                    Nota Máxima <span class="required-text">(Obrigatório)</span>
                  </div>
                </IonInput>
                <ErrorMessage v-slot="{ message }" name="maximumGrade">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="minimumGrade" label="Nota Mínima" rules="required|notaValida">
                <IonInput
                  v-bind="field"
                  v-model="formValues.minimumGrade"
                  v-imask="decimalOptions"
                  label="Nota Mínima"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite a nota mínima"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-change="field.onChange"
                >
                  <div slot="label" class="required-field">
                    Nota Mínima <span class="required-text">(Obrigatório)</span>
                  </div>
                </IonInput>
                <ErrorMessage v-slot="{ message }" name="minimumGrade">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="average" label="Média" rules="required|notaValida">
                <IonInput
                  v-bind="field"
                  v-model="formValues.average"
                  v-imask="decimalOptions"
                  label="Média"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite a média"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-change="field.onChange"
                >
                  <div slot="label" class="required-field">
                    Média <span class="required-text">(Obrigatório)</span>
                  </div>
                </IonInput>
                <ErrorMessage v-slot="{ message }" name="average">
                  <div class="error-message">
                    {{ message }}
                  </div>
                </ErrorMessage>
              </Field>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <Field v-slot="{ field, errors }" name="description" label="Descrição" rules="max:250">
                <IonTextarea
                  v-bind="field"
                  v-model="formValues.description"
                  label="Descrição"
                  label-placement="stacked"
                  fill="outline"
                  placeholder="Digite uma descrição"
                  :rows="5"
                  :class="{ 'has-error': errors.length > 0 }"
                  @ion-input="field.onInput"
                  @input="trimDescription"
                  ref="descriptionRef"
                >
                  <div slot="label">
                    Descrição da regra
                  </div>
                </IonTextarea>
                <ErrorMessage v-slot="{ message }" name="description">
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
    <div>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonButton color="danger" expand="block" @click="handleCancel()">
              Cancelar
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton expand="block" type="submit" form="evaluation-rule-form-mobile" :disabled="!saveButtonEnabled">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  </IonPage>
</template>

<style scoped>
.style-purple-lane {
  background: rgba(var(--ion-color-secondary-rgb), 0.15);
  color: var(--ion-color-secondary);
  padding: 2px;
  margin: 8px 2px;
  border-radius: 4px;
}

.required-text {
  color: var(--ion-color-danger);
}

.error-message {
  color: var(--ion-color-danger);
  font-size: 0.8rem;
  margin-top: 4px;
  padding-left: 16px;
}

ion-input.has-error,
ion-select.has-error,
ion-textarea.has-error {
  --border-color: var(--ion-color-danger);
}
</style>
