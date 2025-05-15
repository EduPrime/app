<script setup lang="ts">
import { IonButton, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonText, IonBadge } from '@ionic/vue'
import { schoolSharp, mailOutline, callOutline, homeOutline, calendarOutline, personOutline } from 'ionicons/icons'
import { ref } from 'vue'

interface Props {
  items: {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    address?: string | null
    birthdate?: string | null
    gender?: string | null
    status?: string | null
    updatedAt?: string
  }
  name?: string
}

const props = defineProps<Props>()
const emits = defineEmits(['close', 'edit'])

const metaIcon = ref(schoolSharp)

function formatDate(dateString: string | null | undefined) {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

function getStatusLabel(status: string | null | undefined) {
  if (!status) return { text: 'Não definido', color: 'medium' }
  
  const statusMap: Record<string, { text: string, color: string }> = {
    'ACTIVE': { text: 'Ativo', color: 'success' },
    'INACTIVE': { text: 'Inativo', color: 'medium' },
    'GRADUATED': { text: 'Formado', color: 'tertiary' },
    'SUSPENDED': { text: 'Suspenso', color: 'warning' },
    'TRANSFERRED': { text: 'Transferido', color: 'primary' }
  }
  
  return statusMap[status] || { text: status, color: 'medium' }
}

function getGenderLabel(gender: string | null | undefined) {
  if (!gender) return '-'
  return gender === 'M' ? 'Masculino' : 'Feminino'
}
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding">
      <!-- Título no mesmo estilo do formulário -->
      <div class="style-purple-lane" style="display: flex; align-items: center;">
        <IonIcon :icon="schoolSharp" style="margin-right: 10px;" />
        {{ props.name || 'Detalhes do Aluno' }}
      </div>

      <div class="student-detail-content">
        <!-- Informações pessoais header -->
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding"
        >
          <IonLabel color="primary" class="ion-no-margin">
            Informações pessoais
          </IonLabel>
        </IonItemDivider>
        
        <IonList>
          <!-- Status -->
          <div class="status-badge ion-margin-vertical ion-text-left">
            <IonBadge :color="getStatusLabel(props.items.status).color">
              {{ getStatusLabel(props.items.status).text }}
            </IonBadge>
          </div>
        
          <!-- Nome do aluno -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="personOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ props.items.name }}
            </IonText>
          </div>
          
          <!-- Email -->
          <div v-if="props.items.email" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="mailOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ props.items.email }}
            </IonText>
          </div>
          
          <!-- Telefone -->
          <div v-if="props.items.phone" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="callOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ props.items.phone }}
            </IonText>
          </div>
          
          <!-- Data de nascimento -->
          <div v-if="props.items.birthdate" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="calendarOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Data de Nascimento: {{ formatDate(props.items.birthdate) }}
            </IonText>
          </div>
          
          <!-- Gênero -->
          <div v-if="props.items.gender" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="personOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Gênero: {{ getGenderLabel(props.items.gender) }}
            </IonText>
          </div>
          
          <!-- Endereço -->
          <div v-if="props.items.address" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="homeOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <div class="address-text">{{ props.items.address }}</div>
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

.student-detail-content {
  padding: 16px 0;
}

.status-badge {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
}

.address-text {
  white-space: pre-line;
  line-height: 1.5;
}
</style>
