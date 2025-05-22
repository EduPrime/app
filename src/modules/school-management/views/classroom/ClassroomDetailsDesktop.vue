<script setup lang="ts">
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, IonChip, IonIcon } from '@ionic/vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ClassroomService from '../../services/ClassroomService'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import type { Classroom } from '@prisma/client'
import { schoolOutline, timeOutline, calendarOutline, peopleOutline, locationOutline } from 'ionicons/icons'

const route = useRoute()
const router = useRouter()
const classroomService = new ClassroomService()
const classroomDetails = ref<Classroom | null>(null)
const loading = ref(true)

const seriesData = ref<any>(null)
const schoolData = ref<any>(null)

function formatTime(time: string | null | undefined): string {
  if (!time) return '-';
  try {
    const date = new Date(time);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return '-';
  }
}

function getDayOfWeekLabel(day: string): string {
  const days: Record<string, string> = {
    MONDAY: 'Segunda-feira',
    TUESDAY: 'Terça-feira',
    WEDNESDAY: 'Quarta-feira',
    THURSDAY: 'Quinta-feira',
    FRIDAY: 'Sexta-feira',
    SATURDAY: 'Sábado',
    SUNDAY: 'Domingo'
  };
  return days[day] || day;
}

function getPeriodLabel(period: string | null | undefined): string {
  if (!period) return '-';
  
  const periods: Record<string, string> = {
    MORNING: 'Manhã',
    AFTERNOON: 'Tarde',
    NIGHT: 'Noite',
    FULLTIME: 'Integral'
  };
  
  return periods[period] || period;
}

async function loadClassroomDetails() {
  try {
    loading.value = true
    const id = route.params.id as string
    if (!id) {
      router.push({ name: 'ClassroomListClassroom' })
      return
    }
    
    const data = await classroomService.getClassroomById(id)
    classroomDetails.value = data

    console.log("classroomDetails.value", classroomDetails.value)
    
    if (data) {
      seriesData.value = (data as any).series
      schoolData.value = (data as any).school
    }
  } catch (error) {
    console.error('Erro ao carregar detalhes da turma:', error)
  } finally {
    loading.value = false
  }
}

function navigateToEdit() {
  if (classroomDetails.value?.id) {
    router.push({ name: 'RegisterClassroom', params: { id: classroomDetails.value.id } })
  }
}

function goBack() {
  router.back()
}

onMounted(() => {
  loadClassroomDetails()
})

watch(
  () => route.params,
  () => {
    loadClassroomDetails()
  }
)
</script>

<template>
  <IonPage>
    <ContentLayout>
      <div v-if="loading" class="ion-text-center ion-padding">
        <p>Carregando detalhes da turma...</p>
      </div>
      <div v-else-if="classroomDetails" class="classroom-details-container">
        <h1 class="classroom-title">{{ classroomDetails.name }}</h1>
        
        <div class="detail-section">
          <h2 class="section-title">Informações básicas</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Nome</span>
                  <span class="detail-value">{{ classroomDetails.name || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Abreviação</span>
                  <div class="detail-value">
                    <span v-if="classroomDetails.abbreviation" class="abbreviation-tag">{{ classroomDetails.abbreviation }}</span>
                    <span v-else>-</span>
                  </div>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Série</span>
                  <span class="detail-value">{{ seriesData?.name || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Escola</span>
                  <span class="detail-value">{{ schoolData?.name || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Ano</span>
                  <span class="detail-value">{{ classroomDetails.year || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Período</span>
                  <span class="detail-value">{{ getPeriodLabel(classroomDetails.period) }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Sala</span>
                  <span class="detail-value">{{ classroomDetails.room || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div class="detail-section">
          <h2 class="section-title">Capacidade e Ocupação</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Capacidade máxima</span>
                  <span class="detail-value">{{ classroomDetails.maxStudents || 0 }} alunos</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Alunos matriculados</span>
                  <span class="detail-value">{{ classroomDetails.totalStudents || 0 }} alunos</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Alunos PCD</span>
                  <span class="detail-value">{{ classroomDetails.pcdStudents || 0 }} alunos</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Vagas excedidas</span>
                  <span class="detail-value">{{ classroomDetails.exceededStudents || 0 }} alunos</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Regime de ensino</span>
                  <span class="detail-value">{{ classroomDetails.regimeType || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Multisseriada</span>
                  <span class="detail-value">{{ classroomDetails.isMultiSerialized ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div class="detail-section">
          <h2 class="section-title">Horários</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Horário de início</span>
                  <span class="detail-value">{{ formatTime(classroomDetails.startTime?.toString()) }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Horário de término</span>
                  <span class="detail-value">{{ formatTime(classroomDetails.endTime?.toString()) }}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Intervalo - início</span>
                  <span class="detail-value">{{ formatTime(classroomDetails.startTimeInterval?.toString()) }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Intervalo - término</span>
                  <span class="detail-value">{{ formatTime(classroomDetails.endTimeInterval?.toString()) }}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow v-if="classroomDetails.dayofweek && classroomDetails.dayofweek.length > 0">
              <IonCol size="12">
                <div class="detail-item">
                  <span class="detail-label">Dias da semana</span>
                  <div class="detail-value days-list">
                    <IonChip v-for="day in classroomDetails.dayofweek" :key="day" color="primary" class="day-chip">
                      {{ getDayOfWeekLabel(day) }}
                    </IonChip>
                  </div>
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
        <p>Turma não encontrada</p>
        <IonButton color="medium" @click="goBack()">Voltar</IonButton>
      </div>
    </ContentLayout>
  </IonPage>
</template>

<style scoped>
.classroom-details-container {
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

.classroom-title {
  margin-bottom: 16px;
  color: var(--ion-color-secondary);
  font-size: 1.5rem;
  font-weight: 600;
}

.abbreviation-tag {
  background: rgba(var(--ion-color-secondary-rgb), 0.15);
  color: var(--ion-color-secondary);
  padding: 6px 12px;
  border-radius: 16px;
  display: inline-block;
  font-weight: 500;
  margin-top: 4px;
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

.days-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.day-chip {
  margin: 0;
}

@media (max-width: 768px) {
  .detail-section {
    padding: 12px;
  }
  
  .classroom-details-container {
    padding-bottom: 90px; /* Mais espaço no mobile */
  }
}
</style>
