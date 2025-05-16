<script setup lang="ts">
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonText, IonBadge } from '@ionic/vue'
import { schoolSharp, mailOutline, callOutline, homeOutline, calendarOutline, personOutline, documentOutline, peopleOutline, mapOutline, locationOutline, flagOutline, businessOutline } from 'ionicons/icons'
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
    nationality?: string | null
    birthCity?: string | null
    birthState?: string | null
    ethnicity?: string | null
    documentType?: string | null
    documentNumber?: string | null
    zipCode?: string | null
    city?: string | null
    state?: string | null
    street?: string | null
    number?: string | null
    neighborhood?: string | null
    zone?: string | null
    complement?: string | null
    guardianName?: string | null
    guardianRelationship?: string | null
    guardianCpf?: string | null
    guardianPhone?: string | null
    guardianEmail?: string | null
    cpf?: string | null
    fatherName?: string | null
    fatherEmail?: string | null
    fatherCpf?: string | null
    fatherPhone?: string | null
    motherName?: string | null
    motherEmail?: string | null
    motherCpf?: string | null
    motherPhone?: string | null
    responsibleType?: string | null
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

// Função para obter dados do responsável baseado no responsibleType
function getResponsibleData() {

  console.log("props.items", props.items)

  console.log("props.items.responsibleType", props.items.responsibleType)
  
  if (!props.items) return {
    name: '-',
    relation: '-',
    cpf: '-',
    phone: '-',
    email: '-'
  }

  const getRelation = (type: string | null) => {
    const relationMap: Record<string, string> = {
      'PAI': 'Pai',
      'MAE': 'Mãe',
      'OUTRO': 'Outro'
    }
    return type ? relationMap[type] || type : 'Não definido'
  }

  // Obtém dados baseados no responsibleType
  const type = props.items.responsibleType || 'PAI'
  
  if (type === 'PAI' && props.items.fatherName) {
    return {
      name: props.items.fatherName || '-',
      relation: getRelation(type),
      cpf: props.items.fatherCpf || '-',
      phone: props.items.fatherPhone || '-',
      email: props.items.fatherEmail || '-'
    }
  } else if (type === 'MAE' && props.items.motherName) {
    return {
      name: props.items.motherName || '-',
      relation: getRelation(type),
      cpf: props.items.motherCpf || '-',
      phone: props.items.motherPhone || '-',
      email: props.items.motherEmail || '-'
    }
  } else {
    // Usa dados do guardião para outros casos
    return {
      name: props.items.guardianName || '-',
      relation: getRelation(type),
      cpf: props.items.guardianCpf || '-',
      phone: props.items.guardianPhone || '-',
      email: props.items.guardianEmail || '-'
    }
  }
}

console.log("props.items", props.items)
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
        <!-- Status -->
        <div class="status-badge ion-margin-vertical ion-text-center">
          <IonBadge :color="getStatusLabel(props.items.status).color">
            {{ getStatusLabel(props.items.status).text }}
          </IonBadge>
        </div>

        <!-- 1. INFORMAÇÕES CADASTRAIS -->
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding section-divider"
        >
          <IonLabel color="primary" class="ion-no-margin">
            <strong>1. Informações Cadastrais</strong>
          </IonLabel>
        </IonItemDivider>
        
        <IonList>
          <!-- Nome do aluno -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="personOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Nome:</strong> {{ props.items.name || '-' }}
            </IonText>
          </div>
          
          <!-- Data de nascimento -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="calendarOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Data de Nascimento:</strong> {{ formatDate(props.items.birthdate) }}
            </IonText>
          </div>
          
          <!-- Gênero -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="personOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Gênero:</strong> {{ getGenderLabel(props.items.gender) }}
            </IonText>
          </div>

          <!-- Nacionalidade -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="flagOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Nacionalidade:</strong> {{ props.items.nationality || '-' }}
            </IonText>
          </div>

          <!-- Cidade de nascimento -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="locationOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Cidade Natal:</strong> {{ props.items.birthCity || '-' }}
            </IonText>
          </div>

          <!-- Estado de nascimento -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="locationOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>UF Natal:</strong> {{ props.items.birthState || '-' }}
            </IonText>
          </div>

          <!-- Raça/Etnia -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="peopleOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Raça/Etnia:</strong> {{ props.items.ethnicity || '-' }}
            </IonText>
          </div>

          <!-- Documento -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="documentOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>{{ props.items.documentType || 'Documento' }}:</strong> {{ props.items.documentNumber || '-' }}
            </IonText>
          </div>
        </IonList>

        <!-- 2. ENDEREÇO -->
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding section-divider"
        >
          <IonLabel color="primary" class="ion-no-margin">
            <strong>2. Endereço</strong>
          </IonLabel>
        </IonItemDivider>

        <IonList>
          <!-- CEP -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="mapOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>CEP:</strong> {{ props.items.zipCode || '-' }}
            </IonText>
          </div>

          <!-- Cidade e UF -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="businessOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Cidade/UF:</strong> {{ props.items.city || '-' }}{{ props.items.state ? '/' + props.items.state : '' }}
            </IonText>
          </div>

          <!-- Logradouro e número -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="homeOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Logradouro:</strong> {{ props.items.street || '-' }}{{ props.items.number ? ', ' + props.items.number : '' }}
            </IonText>
          </div>

          <!-- Bairro -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="locationOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Bairro:</strong> {{ props.items.neighborhood || '-' }}
            </IonText>
          </div>

          <!-- Zona -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="locationOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Zona:</strong> {{ props.items.zone || '-' }}
            </IonText>
          </div>

          <!-- Complemento -->
          <div v-if="props.items.complement" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="homeOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <strong>Complemento:</strong> 
              <div class="address-text">{{ props.items.complement }}</div>
            </IonText>
          </div>
        </IonList>

        <!-- 3. INFORMAÇÕES DE CONTATO -->
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding section-divider"
        >
          <IonLabel color="primary" class="ion-no-margin">
            <strong>3. Informações de Contato</strong>
          </IonLabel>
        </IonItemDivider>

        <IonList>
          <!-- Telefone -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="callOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Telefone:</strong> {{ props.items.phone || '-' }}
            </IonText>
          </div>
          
          <!-- Email -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="mailOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Email:</strong> {{ props.items.email || '-' }}
            </IonText>
          </div>
        </IonList>

        <!-- 4. RESPONSÁVEL -->
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding section-divider"
        >
          <IonLabel color="primary" class="ion-no-margin">
            <strong>4. Responsável</strong>
          </IonLabel>
        </IonItemDivider>

        <IonList>
          <!-- Nome do responsável -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="personOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Nome:</strong> {{ getResponsibleData().name }}
            </IonText>
          </div>

          <!-- Tipo de responsável -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="peopleOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Tipo de Responsável:</strong> {{ getResponsibleData().relation }}
            </IonText>
          </div>

          <!-- CPF do responsável -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="documentOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>CPF:</strong> {{ getResponsibleData().cpf }}
            </IonText>
          </div>

          <!-- Telefone do responsável -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="callOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Telefone:</strong> {{ getResponsibleData().phone }}
            </IonText>
          </div>

          <!-- Email do responsável -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="mailOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              <strong>Email:</strong> {{ getResponsibleData().email }}
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

.section-divider {
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: rgba(var(--ion-color-light-rgb), 0.3);
  padding: 5px 0;
}
</style>
