<script setup lang="ts">
import { IonButton, IonCardHeader, IonCol, IonIcon, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonText, IonGrid } from '@ionic/vue'
import { bookOutline, business, businessOutline, callOutline, checkmarkCircleOutline, documentOutline, fileTrayOutline, globeOutline, locationOutline, mailOutline, mapOutline, personOutline, pinOutline, schoolOutline } from 'ionicons/icons'

import { ref } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  items: {
    status?: string
    name: string
    email?: string
    website?: string
    address?: string
    phone?: string
    cnpj?: string
    regulation?: string
    INEPCode?: string
    IESCode?: string
    city?: string
    state?: string
    postalCode?: string
    neighborhood?: string

  }
  type?: string
  name?: string
}

const props = defineProps<Props>()
const emits = defineEmits(['close', 'edit'])

const route = useRoute()
const metaIcon = ref((route.meta.icon as string) || '')

//  metaName.value = (route.meta.name as string) || ''
//     metaIcon.value = (route.meta.icon as string) || ''

function formatCnpj(cnpj?: string): string {
  if (!cnpj) return '';
  // Remove non-digits and format as 00.000.000/0000-00
  const digits = cnpj.replace(/\D/g, '');
  if (digits.length === 14) {
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  return cnpj;
}

function formatPostalCode(postalCode?: string): string {
  if (!postalCode) return '';
  // Remove non-digits and format as 00000-000
  const digits = postalCode.replace(/\D/g, '');
  if (digits.length === 8) {
    return digits.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
  return postalCode;
}
</script>

<template>
  <IonPage>
    <div class="ion-padding-top ion-padding-horizontal" style="margin-top: 8px;">
      <IonCardHeader
        id="accordionContentHeader" class="ion-no-padding" style="padding: 8px; margin-bottom: 10px;"
        :translucent="true"
      >
        <div style="display: flex; align-items: center; height: 15px;">
          <IonIcon :icon="metaIcon" style="margin-right: 10px;" />
          {{ props.name }}
        </div>
      </IonCardHeader>
    </div>

    <div class="ion-content" style=" overflow-y: auto; height: 100%;">
      <IonRow>
        <IonCol size="12">
          <IonItemDivider
            style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
            class="ion-no-padding"
          >
            <IonLabel color="primary" class="ion-no-margin">
              Informações cadastrais
            </IonLabel>
          </IonItemDivider>
          <IonList>
            <div v-if="props.items.status" style="display: flex; align-items: center; padding: 6px;">
              <IonIcon
                slot="start" color="primary" style="padding-right: 10px;"
                :icon="checkmarkCircleOutline"
              />
              <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
                {{ props.items.status }}
              </IonText>
            </div>

            <div v-if="props.items.name" style="display: flex; align-items: center; padding: 6px;">
              <IonIcon
                slot="start" color="primary" style="padding-right: 10px;"
                :icon="props.type && props.type === 'person' ? personOutline : business"
              />
              <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
                {{ props.items.name }}
              </IonText>
            </div>

            <div v-if="props.items.cnpj" style="display: flex; align-items: center; padding: 6px;">
              <IonIcon
                slot="start" color="primary" style="padding-right: 10px;"
                :icon="fileTrayOutline"
              />
              <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
                {{ formatCnpj(props.items.cnpj) }}
              </IonText>
            </div>
            <div v-if="props.items.phone" style="display: flex; align-items: center; padding: 6px;">
              <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="callOutline" />
              <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
                {{ props.items.phone }}
              </IonText>
            </div>

            <div v-if="props.items.email" style="display: flex; align-items: center; padding: 6px;">
              <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="mailOutline" />
              <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
                {{ props.items.email }}
              </IonText>
            </div>
            <div v-if="props.items.website" style="display: flex; align-items: center; padding: 6px;">
              <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="globeOutline" />
              <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
                {{ props.items.website }}
              </IonText>
            </div>

            <div v-if="props.items.regulation" style="display: flex; align-items: center; padding: 6px;">
              <IonIcon
                slot="start" color="primary" style="padding-right: 10px;"
                :icon="documentOutline"
              />
              <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
                {{ props.items.regulation }}
              </IonText>
            </div>

            <div v-if="props.items.INEPCode" style="display: flex; align-items: center; padding: 6px;">
              <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="schoolOutline" />
              <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
                {{ props.items.INEPCode }}
              </IonText>
            </div>

            <div v-if="props.items.IESCode" style="display: flex; align-items: center; padding: 6px;">
              <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="bookOutline" />
              <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
                {{ props.items.IESCode }}
              </IonText>
            </div>
          </IonList>
        </IonCol>
        <IonCol size="12">
          <IonItemDivider
            style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
            class="ion-no-padding"
          >
            <IonLabel color="primary" class="ion-no-margin">
              Endereço
            </IonLabel>
          </IonItemDivider>
          <IonList>
            <div v-if="props.items.address" style="display: flex; align-items: center; padding: 6px;">
              <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="mapOutline" />
              <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
                {{ props.items.address }}
              </IonText>
            </div>
            <div
              v-if="(props.items.city && props.items.state) || props.items.city"
              style="display: flex; align-items: center; padding: 6px;"
            >
              <IonIcon
                slot="start" color="primary" style="padding-right: 10px;"
                :icon="locationOutline"
              />
              <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
                {{ props.items.city }}
                <span v-if="props.items.state">
                  - {{ props.items.state }}
                </span>
              </IonText>
            </div>

            <div v-if="props.items.postalCode" style="display: flex; align-items: center; padding: 6px;">
              <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="pinOutline" />
              <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
                {{ formatPostalCode(props.items.postalCode) }}
              </IonText>
            </div>

            <div v-if="props.items.neighborhood" style="display: flex; align-items: center; padding: 6px;">
              <IonIcon
                slot="start" color="primary" style="padding-right: 10px;"
                :icon="businessOutline"
              />
              <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
                {{ props.items.neighborhood }}
              </IonText>
            </div>
          </IonList>
        </IonCol>
      </IonRow>
    </div>
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
.my-auto {
    margin-bottom: auto;
    margin-top: auto;
}

.ion-content {
    padding-left: 8px;
    padding-right: 8px;
}

ion-card-header#accordionContentHeader {
    --background: rgba(var(--ion-color-secondary-rgb), 0.15);
    --color: var(--ion-color-secondary);
}
</style>
