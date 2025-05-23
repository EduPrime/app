<script setup lang="ts">
import { IonButton, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonText } from '@ionic/vue'
import { schoolOutline, businessOutline, locationOutline, peopleOutline, timeOutline, calendarOutline } from 'ionicons/icons'
import { ref } from 'vue'

interface Props {
  items: {
    id?: string
    name: string
    abbreviation?: string | null
    room?: string | null
    period?: string | null
    year: number
    maxStudents: number
    exceededStudents?: number
    totalStudents?: number
    pcdStudents?: number
    startTime?: string | null
    startTimeInterval?: string | null
    endTimeInterval?: string | null
    endTime?: string | null
    dayofweek?: string[] | null
    series?: { name: string, abbreviation?: string } | null
    school?: { corporateName: string, name?: string } | null
    regimeType?: string | null
    isMultiSerialized?: boolean | null
    updatedAt?: string
  }
  name?: string
}

const props = defineProps<Props>()
const emits = defineEmits(['close', 'edit'])

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
    EVENING: 'Noite',
    INTEGRAL: 'Integral'
  };
  
  return periods[period] || period;
}

console.log("props", props)
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="style-purple-lane" style="display: flex; align-items: center;">
        <IonIcon :icon="schoolOutline" style="margin-right: 10px;" />
        {{ props.name }}
      </div>

      <div class="classroom-detail-content">
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding"
        >
          <IonLabel color="primary" class="ion-no-margin">
            Informações gerais
          </IonLabel>
        </IonItemDivider>
        
        <IonList>
          <div v-if="props.items.abbreviation" class="abbreviation-tag ion-margin-vertical ion-text-left">
            <IonChip color="primary">
              {{ props.items.abbreviation }}
            </IonChip>
          </div>
        
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="schoolOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ props.items.name }}
            </IonText>
          </div>
          
          <div v-if="props.items.series" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="businessOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Série: {{ props.items.series.name }}
            </IonText>
          </div>
          
          <div v-if="props.items.school" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="businessOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Escola: {{ props.items.school.name || props.items.school.corporateName }}
            </IonText>
          </div>
          
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="locationOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Sala: {{ props.items.room || '-' }}
            </IonText>
          </div>
          
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="calendarOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Ano: {{ props.items.year }}
            </IonText>
          </div>
          
          <div v-if="props.items.period" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="timeOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Período: {{ getPeriodLabel(props.items.period) }}
            </IonText>
          </div>
          
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="schoolOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Regime: {{ props.items.regimeType || '-' }}
            </IonText>
          </div>
          
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="schoolOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Multisseriada: {{ props.items.isMultiSerialized ? 'Sim' : 'Não' }}
            </IonText>
          </div>
        </IonList>
        
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding ion-margin-top"
        >
          <IonLabel color="primary" class="ion-no-margin">
            Capacidade e ocupação
          </IonLabel>
        </IonItemDivider>
        
        <IonList>
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="peopleOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Estudantes: {{ props.items.totalStudents || 0 }}/{{ props.items.maxStudents }}
            </IonText>
          </div>
          
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="peopleOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Alunos PCD: {{ props.items.pcdStudents || 0 }}
            </IonText>
          </div>
          
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="peopleOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Limite de excedentes: {{ props.items.exceededStudents || 0 }}
            </IonText>
          </div>
        </IonList>
        
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding ion-margin-top"
        >
          <IonLabel color="primary" class="ion-no-margin">
            Horários
          </IonLabel>
        </IonItemDivider>
        
        <IonList>
          <div v-if="props.items.startTime || props.items.endTime" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="timeOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Horário: {{ formatTime(props.items.startTime) }} - {{ formatTime(props.items.endTime) }}
            </IonText>
          </div>
          
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="timeOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Intervalo: {{ formatTime(props.items.startTimeInterval) || '-' }} - {{ formatTime(props.items.endTimeInterval) || '-' }}
            </IonText>
          </div>
          
          <div v-if="props.items.dayofweek && props.items.dayofweek.length > 0" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="calendarOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <div>Dias:</div>
              <div v-for="(day, index) in props.items.dayofweek" :key="index" class="day-item">
                {{ getDayOfWeekLabel(day) }}
              </div>
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
  padding: 2px;
  margin: 8px 2px;
  border-radius: 4px;
}

.classroom-detail-content {
  padding: 16px 0;
}

.abbreviation-tag {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
}

.day-item {
  margin-left: 12px;
  margin-top: 4px;
}
</style>
