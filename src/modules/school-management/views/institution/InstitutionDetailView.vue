<script setup lang="ts">
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
} from '@ionic/vue'
import {
  businessOutline,
  calendarOutline,
  callOutline,
  locationOutline,
  mailOutline,
  mapOutline,
  timeOutline,
} from 'ionicons/icons'

interface Props {
  items: {
    id?: string
    name: string
    address?: string
    city?: string
    state?: string
    postalCode?: string
    phone?: string
    email?: string
    createdAt?: string
    updatedAt?: string
  }
  name?: string
}

const props = defineProps<Props>()
const emits = defineEmits(['close', 'edit'])
function formatDate(dateString: string) {
  try {
    const date = new Date(dateString)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  catch (error) {
    console.error('Erro ao formatar data:', error)
    return dateString || 'Data inválida'
  }
}
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding">
      <!-- Título no mesmo estilo do formulário -->
      <div class="style-purple-lane" style="display: flex; align-items: center;">
        <IonIcon :icon="businessOutline" style="margin-right: 10px;" />
        {{ props.name }}
      </div>

      <div class="institution-detail-content">
        <!-- Informações gerais header -->
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding"
        >
          <IonLabel color="primary" class="ion-no-margin">
            Informações gerais
          </IonLabel>
        </IonItemDivider>

        <IonList>
          <!-- Nome da instituição -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="businessOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ props.items.name || 'Não informado' }}
            </IonText>
          </div>

          <!-- Endereço da instituição -->
          <div v-if="props.items.address" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="locationOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              {{ props.items.address }}
            </IonText>
          </div>

          <!-- Cidade e Estado -->
          <div v-if="props.items.city || props.items.state" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="mapOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ props.items.city || 'Não informada' }}{{ props.items.state ? ` - ${props.items.state}` : '' }}
            </IonText>
          </div>

          <!-- CEP -->
          <div v-if="props.items.postalCode" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="mailOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              CEP: {{ props.items.postalCode }}
            </IonText>
          </div>
        </IonList>

        <!-- Informações de contato header -->
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding ion-margin-top"
        >
          <IonLabel color="primary" class="ion-no-margin">
            Informações de contato
          </IonLabel>
        </IonItemDivider>

        <IonList>
          <!-- Telefone -->
          <div v-if="props.items.phone" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="callOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ props.items.phone }}
            </IonText>
          </div>

          <!-- E-mail -->
          <div v-if="props.items.email" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="mailOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ props.items.email }}
            </IonText>
          </div>
        </IonList>

        <!-- Informações do sistema header -->
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding ion-margin-top"
        >
          <IonLabel color="primary" class="ion-no-margin">
            Informações do sistema
          </IonLabel>
        </IonItemDivider>

        <IonList>
          <!-- Data de criação -->
          <div v-if="props.items.createdAt" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="calendarOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Criado em: {{ formatDate(props.items.createdAt) }}
            </IonText>
          </div>

          <!-- Data de atualização -->
          <div v-if="props.items.updatedAt" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="timeOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Atualizado em: {{ formatDate(props.items.updatedAt) }}
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

.institution-detail-content {
  padding: 16px 0;
}

.abbreviation-tag {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
}

ion-chip {
  --background: rgba(var(--ion-color-primary-rgb), 0.15);
  --color: var(--ion-color-primary);
}

.description-text {
  white-space: pre-line;
  line-height: 1.5;
}
</style>
