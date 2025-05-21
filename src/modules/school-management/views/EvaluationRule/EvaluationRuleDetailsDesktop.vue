<script setup lang="ts">
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EvaluationRuleService from '../../services/EvaluationRuleService'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import type { EvaluationRule } from '@prisma/client'
import type Decimal from 'decimal.js'

const route = useRoute()
const router = useRouter()
const evaluationRuleService = new EvaluationRuleService()
const evaluationRuleDetails = ref<any | null>(null)
const loading = ref(true)

const formatDecimal = (value: any, places = 2) => {
  if (value === null || value === undefined) return '-'
  return Number(value).toFixed(places)
}

const gradeTypeMap = computed(() => ({
  numeric: 'Numérica',
  conceptual: 'Conceitual',
  descriptive: 'Descritiva'
}))

const progressionTypeMap = computed(() => ({
  annual: 'Anual',
  semester: 'Semestral',
  quarterly: 'Trimestral',
  bimonthly: 'Bimestral',
  monthly: 'Mensal'
}))

const parallelMakeupMap = computed(() => ({
  none: 'Nenhuma',
  byStage: 'Por Etapa',
  byActivity: 'Por Atividade'
}))

const frequencyTypeMap = computed(() => ({
  byClass: 'Por Aula',
  byStage: 'Por Etapa',
  bySubject: 'Por Disciplina'
}))

const feedbackTypeMap = computed(() => ({
  none: 'Nenhum',
  manual: 'Manual',
  automatic: 'Automático'
}))

async function loadEvaluationRuleDetails() {
  try {
    loading.value = true
    const id = route.params.id as string
    if (!id) {
      router.push({ name: 'DashboardEvaluationRule' })
      return
    }
    
    const data = await evaluationRuleService.getEvaluationRuleById(id)
    evaluationRuleDetails.value = data
  } catch (error) {
    console.error('Erro ao carregar detalhes da regra de avaliação:', error)
  } finally {
    loading.value = false
  }
}

function navigateToEdit() {
  if (evaluationRuleDetails.value?.id) {
    router.push({ name: 'RegisterEvaluationRule', params: { id: evaluationRuleDetails.value.id } })
  }
}

function goBack() {
  router.back()
}

onMounted(() => {
  loadEvaluationRuleDetails()
})
</script>

<template>
  <IonPage>
    <ContentLayout>
      <div v-if="loading" class="ion-text-center ion-padding">
        <p>Carregando detalhes da regra de avaliação...</p>
      </div>
      <div v-else-if="evaluationRuleDetails" class="evaluation-rule-details-container">
        <h1 class="evaluation-rule-title">{{ evaluationRuleDetails.name }}</h1>
        
        <div class="detail-section">
          <h2 class="section-title">Informações Básicas</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Nome</span>
                  <span class="detail-value">{{ evaluationRuleDetails.name || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Tipo de Nota</span>
                  <div class="detail-value">
                    <span class="tag grade-type">
                      {{ evaluationRuleDetails.gradeType ? (gradeTypeMap as any)[evaluationRuleDetails.gradeType] || evaluationRuleDetails.gradeType : '-' }}
                    </span>
                  </div>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Tipo de Progressão</span>
                  <div class="detail-value">
                    <span class="tag progression-type">
                      {{ evaluationRuleDetails.progressionType ? (progressionTypeMap as any)[evaluationRuleDetails.progressionType] || evaluationRuleDetails.progressionType : '-' }}
                    </span>
                  </div>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Recuperação Paralela</span>
                  <div class="detail-value">
                    <span class="tag makeup-type">
                      {{ evaluationRuleDetails.parallelMakeupExam ? (parallelMakeupMap as any)[evaluationRuleDetails.parallelMakeupExam] || evaluationRuleDetails.parallelMakeupExam : '-' }}
                    </span>
                  </div>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div class="detail-section">
          <h2 class="section-title">Configurações de Notas</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="3">
                <div class="detail-item">
                  <span class="detail-label">Nota Máxima</span>
                  <span class="detail-value value-highlight">{{ formatDecimal(evaluationRuleDetails.maximumGrade) }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="3">
                <div class="detail-item">
                  <span class="detail-label">Nota Mínima</span>
                  <span class="detail-value value-highlight">{{ formatDecimal(evaluationRuleDetails.minimumGrade) }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="3">
                <div class="detail-item">
                  <span class="detail-label">Média para Aprovação</span>
                  <span class="detail-value value-highlight">{{ formatDecimal(evaluationRuleDetails.average) }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="3">
                <div class="detail-item">
                  <span class="detail-label">Casas Decimais</span>
                  <span class="detail-value">{{ evaluationRuleDetails.decimalPlaces !== undefined ? evaluationRuleDetails.decimalPlaces : '-' }}</span>
                </div>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Número de Atividades</span>
                  <span class="detail-value">{{ evaluationRuleDetails.numberActivities || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Frequência Mínima (%)</span>
                  <span class="detail-value">{{ formatDecimal(evaluationRuleDetails.attendancePercentage) }}%</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Ignorar Frequência para Aprovação</span>
                  <span class="detail-value">{{ evaluationRuleDetails.dontUseFrequencyToPass === true ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
        
        <div class="detail-section">
          <h2 class="section-title">Fórmulas e Tipos</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Fórmula da Média</span>
                  <span class="detail-value formula">{{ evaluationRuleDetails.averageFormula || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Fórmula da Recuperação</span>
                  <span class="detail-value formula">{{ evaluationRuleDetails.makeupFormula || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Tipo de Frequência</span>
                  <span class="detail-value">
                    {{ evaluationRuleDetails.frequencyType ? (frequencyTypeMap as any)[evaluationRuleDetails.frequencyType] || evaluationRuleDetails.frequencyType : '-' }}
                  </span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Tipo de Feedback</span>
                  <span class="detail-value">
                    {{ evaluationRuleDetails.feedbackType ? (feedbackTypeMap as any)[evaluationRuleDetails.feedbackType] || evaluationRuleDetails.feedbackType : '-' }}
                  </span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div class="detail-section">
          <h2 class="section-title">Informações do Sistema</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Data de Criação</span>
                  <span class="detail-value">
                    {{ evaluationRuleDetails.createdAt ? new Date(evaluationRuleDetails.createdAt).toLocaleString() : '-' }}
                  </span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Última Atualização</span>
                  <span class="detail-value">
                    {{ evaluationRuleDetails.updatedAt ? new Date(evaluationRuleDetails.updatedAt).toLocaleString() : '-' }}
                  </span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">ID da Regra</span>
                  <span class="detail-value system-id">{{ evaluationRuleDetails.id }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div class="fixed-footer">
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonButton color="danger" expand="full" @click="goBack()">Fechar</IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton color="secondary" expand="full" @click="navigateToEdit()">Editar</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>

      <div v-else class="ion-text-center ion-padding">
        <p>Regra de avaliação não encontrada</p>
        <IonButton color="medium" @click="goBack()">Voltar</IonButton>
      </div>
    </ContentLayout>
  </IonPage>
</template>

<style scoped>
.evaluation-rule-details-container {
  padding: 16px;
  padding-bottom: 80px; /* Espaço para o footer fixo */
}

.detail-section {
  margin-bottom: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: var(--ion-color-secondary);
  font-size: 1.2rem;
  margin-bottom: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.detail-item {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.9rem;
  color: var(--ion-color-secondary);
  font-weight: 500;
  margin-bottom: 4px;
}

.detail-value {
  font-size: 1rem;
}

.value-highlight {
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--ion-color-secondary);
}

.tag {
  background: rgba(var(--ion-color-secondary-rgb), 0.15);
  color: var(--ion-color-secondary);
  padding: 6px 12px;
  border-radius: 16px;
  display: inline-block;
  font-weight: 500;
  margin-top: 4px;
}

.formula {
  font-family: monospace;
  background-color: rgba(var(--ion-color-light-rgb), 0.5);
  padding: 8px;
  border-radius: 4px;
  display: block;
}

.system-id {
  font-family: monospace;
  font-size: 0.9rem;
  color: #777;
}

.evaluation-rule-title {
  margin-bottom: 16px;
  color: var(--ion-color-secondary);
  font-size: 1.5rem;
  font-weight: 600;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  padding: 12px 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

@media (max-width: 768px) {
  .detail-section {
    padding: 12px;
  }
  
  .evaluation-rule-details-container {
    padding-bottom: 90px; /* Mais espaço no mobile */
  }
}
</style>
