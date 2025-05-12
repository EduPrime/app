<script setup lang="ts">
import { IonCol, IonIcon, IonItemDivider, IonLabel, IonList, IonRow, IonText } from '@ionic/vue'
import { bookOutline, business, callOutline, checkmarkCircleOutline, documentOutline, fileTrayOutline, globeOutline, locationOutline, mailOutline, mapOutline, schoolOutline } from 'ionicons/icons'

interface Props {
  items: object
  type: string
}

const props = defineProps<Props>()
</script>

<template>
  <IonRow>
    <IonCol size="12">
      <IonItemDivider class="ion-no-padding">
        <IonLabel class="ion-no-margin">
          Informações cadastrais
        </IonLabel>
      </IonItemDivider>
      <IonList>
        <div v-if="props.items.status" style="display: flex; align-items: center; padding: 6px;">
          <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="checkmarkCircleOutline" />
          <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
            {{ props.items.status }}
          </IonText>
        </div>

        <div v-if="props.items.name" style="display: flex; align-items: center; padding: 6px;">
          <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="business" />
          <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
            {{ props.items.name }}
          </IonText>
        </div>

        <div v-if="props.items.cnpj" style="display: flex; align-items: center; padding: 6px;">
          <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="fileTrayOutline" />
          <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
            {{ props.items.cnpj }}
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
          <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="documentOutline" />
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
      <IonItemDivider class="ion-no-padding">
        <IonLabel class="ion-no-margin">
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
        <div v-if="(props.items.city && props.items.state) || props.items.city" style="display: flex; align-items: center; padding: 6px;">
          <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="locationOutline" />
          <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
            {{ props.items.city }}
            <span v-if="props.items.state">
              - {{ props.items.state }}
            </span>
          </IonText>
        </div>
      </IonList>
    </IonCol>
  </IonRow>
  <pre>
        props.items: {{ props.items }}
    </pre>
  <IonList />
</template>

<style scoped>
 .my-auto {
    margin-bottom: auto;
    margin-top: auto;
 }
</style>
