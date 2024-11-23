<script setup lang="ts">
import { IonButtons, IonContent, IonIcon, IonTitle, IonToolbar } from '@ionic/vue'
import { arrowBack } from 'ionicons/icons'
import { defineEmits, defineProps, ref } from 'vue'

interface Props {
  actionName: string
  trigger: string
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const modal = ref<HTMLIonModalElement | null>(null)

function cancel() {
  if (modal.value) {
    modal.value.dismiss(null, 'cancel')
    emits('update:modelValue', true)
  }
}
</script>

<template>
  <ion-modal ref="modal" :trigger="props.trigger" width="100%" :initial-breakpoint="0.7">
    <IonContent>
      <IonToolbar class="ion-margin-bottom" style="box-shadow: 0 1.5px 4px rgba(0, 0, 0, 0.25);">
        <IonTitle>{{ props.actionName }} </IonTitle>
        <IonButtons slot="start">
          <ion-button id="cancelar" @click="cancel()">
            <IonIcon slot="icon-only" :ios="arrowBack" :md="arrowBack" />
          </ion-button>
        </IonButtons>
      </IonToolbar>
      <slot />
    </IonContent>
  </ion-modal>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.filter-content-button {
  font-size: 12pt;
  display: flex ;
  justify-content: start
}
</style>
