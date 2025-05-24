<template>
  <div class="ion-padding">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton @click="emit('close')">
            <IonIcon :icon="chevronBack" slot="icon-only"></IonIcon>
          </IonButton>
        </IonButtons>
        <IonTitle>{{ name }}</IonTitle>
        <IonButtons slot="end">
          <IonButton @click="emit('edit')">
            <IonIcon :icon="create" slot="icon-only"></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonCard class="ion-margin-top">
      <IonCardHeader>
        <IonCardTitle>Informações da Instituição</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList lines="none">
          <IonItem>
            <IonLabel>
              <h2>Nome</h2>
              <p>{{ items?.name || 'Não informado' }}</p>
            </IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>
              <h2>Endereço</h2>
              <p>{{ items?.address || 'Não informado' }}</p>
            </IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>
              <h2>Cidade/Estado</h2>
              <p>
                {{ items?.city || 'Não informada' }}{{ items?.state ? `/${items.state}` : '' }}
              </p>
            </IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>
              <h2>CEP</h2>
              <p>{{ items?.postalCode || 'Não informado' }}</p>
            </IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>
              <h2>Telefone</h2>
              <p>{{ items?.phone || 'Não informado' }}</p>
            </IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>
              <h2>E-mail</h2>
              <p>{{ items?.email || 'Não informado' }}</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>

    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Dados de Sistema</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList lines="none">
          <IonItem>
            <IonLabel>
              <h2>Criado em</h2>
              <p>{{ items?.createdAt ? formatDate(items.createdAt) : 'Não informado' }}</p>
            </IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>
              <h2>Última atualização</h2>
              <p>{{ items?.updatedAt ? formatDate(items.updatedAt) : 'Não informado' }}</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  </div>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import { chevronBack, create } from 'ionicons/icons'

const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    default: 'Detalhes da Instituição',
  },
})

const emit = defineEmits(['close', 'edit'])

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
  } catch (error) {
    return dateString || 'Data inválida'
  }
}
</script>

<style scoped>
ion-item {
  --padding-start: 0;
}

ion-item h2 {
  font-size: 14px;
  font-weight: 500;
  color: var(--ion-color-medium);
}

ion-item p {
  font-size: 16px;
  margin-top: 4px;
  color: var(--ion-color-dark);
}
</style>
