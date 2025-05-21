<script setup lang="ts">
import { IonButton, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonText } from '@ionic/vue'
import { analytics, calculatorOutline, documentTextOutline, chevronUpOutline, basketOutline, checkmarkOutline, closeOutline, timeOutline, calendarOutline, idCardOutline } from 'ionicons/icons'
import { computed, ref } from 'vue'
import type { EvaluationRule } from '@prisma/client'

interface Props {
  items: EvaluationRule | any
  name?: string
}

const props = defineProps<Props>()
const emits = defineEmits(['close', 'edit'])

const metaIcon = ref(analytics)

const formatDecimal = (value: any, places = 2) => {
  if (value === null || value === undefined) return '-'
  return Number(value).toFixed(places)
}

const gradeTypeLabel = computed(() => {
  const map: Record<string, string> = {
    'numeric': 'Numérica',
    'conceptual': 'Conceitual',
    'descriptive': 'Descritiva',
    'NUMERIC': 'Numérica',
    'CONCEPTUAL': 'Conceitual'
  }
  return props.items.gradeType ? (map[props.items.gradeType] || props.items.gradeType) : '-'
})

const progressionTypeLabel = computed(() => {
  const map: Record<string, string> = {
    'annual': 'Anual',
    'semester': 'Semestral',
    'quarterly': 'Trimestral',
    'bimonthly': 'Bimestral',
    'monthly': 'Mensal',
    'AVERAGE': 'Média',
    'TOTAL': 'Total'
  }
  return props.items.progressionType ? (map[props.items.progressionType] || props.items.progressionType) : '-'
})

const parallelMakeupLabel = computed(() => {
  const map: Record<string, string> = {
    'none': 'Nenhuma',
    'byStage': 'Por Etapa',
    'byActivity': 'Por Atividade',
    'YES': 'Sim',
    'NO': 'Não'
  }
  return props.items.parallelMakeupExam ? (map[props.items.parallelMakeupExam] || props.items.parallelMakeupExam) : '-'
})

const frequencyTypeLabel = computed(() => {
  const map: Record<string, string> = {
    'byClass': 'Por Aula',
    'byStage': 'Por Etapa',
    'bySubject': 'Por Disciplina'
  }
  return props.items.frequencyType ? (map[props.items.frequencyType] || props.items.frequencyType) : '-'
})

const feedbackTypeLabel = computed(() => {
  const map: Record<string, string> = {
    'none': 'Nenhum',
    'manual': 'Manual',
    'automatic': 'Automático'
  }
  return props.items.feedbackType ? (map[props.items.feedbackType] || props.items.feedbackType) : '-'
})
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="style-purple-lane" style="display: flex; align-items: center;">
        <IonIcon :icon="analytics" style="margin-right: 10px;" />
        {{ props.name || 'Detalhes da Regra de Avaliação' }}
      </div>

      <div class="rule-detail-content">
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding"
        >
          <IonLabel color="primary" class="ion-no-margin">
            Informações Básicas
          </IonLabel>
        </IonItemDivider>
        
        <IonList>
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="documentTextOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ props.items.name }}
            </IonText>
          </div>
          
          <div class="tag-container ion-margin-vertical">
            <IonChip color="primary">
              <IonLabel>Tipo de Nota: {{ gradeTypeLabel }}</IonLabel>
            </IonChip>
          </div>
          
          <div class="tag-container ion-margin-vertical">
            <IonChip color="secondary">
              <IonLabel>Progressão: {{ progressionTypeLabel }}</IonLabel>
            </IonChip>
          </div>
          
          <div class="tag-container ion-margin-vertical">
            <IonChip color="tertiary">
              <IonLabel>Recuperação Paralela: {{ parallelMakeupLabel }}</IonLabel>
            </IonChip>
          </div>
        </IonList>
        
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding ion-margin-top"
        >
          <IonLabel color="primary" class="ion-no-margin">
            Configurações de Notas
          </IonLabel>
        </IonItemDivider>
        
        <IonList>
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="chevronUpOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Nota Máxima:</strong> {{ formatDecimal(props.items.maximumGrade) }}
            </IonText>
          </div>
          
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="basketOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Nota Mínima:</strong> {{ formatDecimal(props.items.minimumGrade) }}
            </IonText>
          </div>
          
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="calculatorOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Média p/ Aprovação:</strong> {{ formatDecimal(props.items.average) }}
            </IonText>
          </div>
          
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="calculatorOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Número de Atividades:</strong> {{ props.items.numberActivities || '-' }}
            </IonText>
          </div>
          
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="calculatorOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Frequência Mínima:</strong> {{ formatDecimal(props.items.attendancePercentage) }}%
            </IonText>
          </div>
          
          <div v-if="props.items.averageFormula" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="calculatorOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <strong>Fórmula para Média:</strong>
              <div class="formula-text">{{ props.items.averageFormula }}</div>
            </IonText>
          </div>
          
          <div v-if="props.items.makeupFormula" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="calculatorOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <strong>Fórmula para Recuperação:</strong>
              <div class="formula-text">{{ props.items.makeupFormula }}</div>
            </IonText>
          </div>

          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="calculatorOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Casas Decimais:</strong> {{ props.items.decimalPlaces !== undefined ? props.items.decimalPlaces : '-' }}
            </IonText>
          </div>

          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="props.items.dontUseFrequencyToPass === true ? checkmarkOutline : closeOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Ignorar Frequência para Aprovação:</strong> {{ props.items.dontUseFrequencyToPass === true ? 'Sim' : 'Não' }}
            </IonText>
          </div>
        </IonList>

        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding ion-margin-top"
        >
          <IonLabel color="primary" class="ion-no-margin">
            Tipos Adicionais
          </IonLabel>
        </IonItemDivider>

        <IonList>
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="calculatorOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Tipo de Frequência:</strong> {{ frequencyTypeLabel }}
            </IonText>
          </div>

          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="calculatorOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Tipo de Feedback:</strong> {{ feedbackTypeLabel }}
            </IonText>
          </div>
        </IonList>

        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding ion-margin-top"
        >
          <IonLabel color="primary" class="ion-no-margin">
            Informações do Sistema
          </IonLabel>
        </IonItemDivider>

        <IonList>
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="calendarOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Data de Criação:</strong> {{ props.items.createdAt ? new Date(props.items.createdAt).toLocaleString() : '-' }}
            </IonText>
          </div>

          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="timeOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Última Atualização:</strong> {{ props.items.updatedAt ? new Date(props.items.updatedAt).toLocaleString() : '-' }}
            </IonText>
          </div>

          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="idCardOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>ID da Regra:</strong> <span class="system-id">{{ props.items.id }}</span>
            </IonText>
          </div>
        </IonList>
      </div>
    </IonContent>
    
    <div>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonButton :disabled="false" color="danger" expand="full" @click="emits('close', false)">
              Fechar
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton :disabled="false" color="secondary" expand="full" @click="emits('edit', true)">
              Editar
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
  padding: 10px;
  margin: 8px 2px;
  border-radius: 4px;
  font-weight: bold;
}

.rule-detail-content {
  padding: 16px 0;
}

.tag-container {
  display: flex;
  justify-content: flex-start;
  margin: 6px 0;
}

.formula-text {
  white-space: pre-line;
  line-height: 1.5;
  background: rgba(var(--ion-color-light-rgb), 0.5);
  border-radius: 4px;
  padding: 8px;
  margin-top: 4px;
  font-family: monospace;
}

.system-id {
  font-family: monospace;
  font-size: 10pt;
  color: var(--ion-color-medium);
}
</style>
