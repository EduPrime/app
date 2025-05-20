<script setup lang="ts">
import { IonButton, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonText } from '@ionic/vue'
import { documentTextOutline, personSharp, textOutline } from 'ionicons/icons'
import { ref } from 'vue'

interface Props {
  items: {
    id?: string
    name: string
    abbreviation?: string
    description?: string
    updatedAt?: string
  }
  name?: string
}

const props = defineProps<Props>()
const emits = defineEmits(['close', 'edit'])

const metaIcon = ref(personSharp)
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding">
      <!-- Título no mesmo estilo exato do formulário -->
      <div class="style-purple-lane" style="display: flex; align-items: center;">
        <IonIcon :icon="personSharp" style="margin-right: 10px;" />
        {{ props.name }}
      </div>

      <div class="function-detail-content">
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
          <!-- Tag com abreviação alinhada à esquerda -->
          <div v-if="props.items.abbreviation" class="abbreviation-tag ion-margin-vertical ion-text-left">
            <IonChip color="primary">
              {{ props.items.abbreviation }}
            </IonChip>
          </div>

          <!-- Ícone e nome da função alinhados à esquerda -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="personSharp" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ props.items.name }}
            </IonText>
          </div>

          <!-- Ícone e descrição da função alinhados à esquerda -->
          <div v-if="props.items.description" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="documentTextOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <div class="description-text">
                {{ props.items.description }}
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

.function-detail-content {
  padding: 16px 0;
}

.abbreviation-tag {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
}

.description-text {
  white-space: pre-line;
  line-height: 1.5;
}
</style>
