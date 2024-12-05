<script setup lang="ts">
import { IonAccordion, IonAccordionGroup, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/vue'
import { arrowDown, arrowUp } from 'ionicons/icons'
import { defineProps, ref } from 'vue'

interface Props {
  title: string
  subtitle: string
}

const props = defineProps<Props>()
const accordion = ref(false)

function handleAccordionChange(event: CustomEvent) {
  accordion.value = event.detail.value === 'first'
}
</script>

<template>
  <IonAccordionGroup @ion-change="handleAccordionChange">
    <IonAccordion value="first">
      <div slot="header" style="display: flex;" :style="accordion ? 'background-color: #F9D3E350;' : 'background-color: white'">
        <IonCardHeader style="margin-top: auto; margin-bottom: auto;">
          <IonCardTitle>
            {{ props.title }}
          </IonCardTitle>
          <IonCardSubtitle>
            {{ props.subtitle }}
          </IonCardSubtitle>
        </IonCardHeader>
        <div style="margin-top: auto; margin-bottom: auto; margin-left: auto;" class="ion-padding-horizontal">
          <ion-button :color="accordion ? 'tertiary' : 'primary'">
            <IonIcon :icon="accordion ? arrowUp : arrowDown" />
          </ion-button>
        </div>
      </div>
      <div id="accordionContent" slot="content" style="background-color: #F9D3E350; box-shadow: inset 0 -5px 6px rgba(0, 0, 0, 0.2);" class="ion-padding-horizontal ion-padding-bottom">
        <slot />
      </div>
    </IonAccordion>
  </IonAccordionGroup>
</template>
