<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/vue'
import { apps, arrowBack, arrowForward, eye, pencilSharp, trashSharp } from 'ionicons/icons'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

interface EvaluationRuleItem {
  id: string;
  name: string;
  gradeType: string;
  progressionType: string;
  courseId: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Props {
  dataList: EvaluationRuleItem[]
}

const props = defineProps<Props>()
const emits = defineEmits(['update:see', 'update:edit', 'update:delete'])

const route = useRoute()
const isOpen = ref<boolean[]>([])
const itemSliding = ref<(InstanceType<typeof IonItemSliding> | null)[]>([])

const innerWidth = window.innerWidth
</script>

<template>
  <IonCard v-if="true">
    <IonCardHeader color="secondary">
      <div style="display: flex; align-items: center; height: 15px;">
        <IonIcon :icon="route?.meta?.icon ?? apps" style="margin-right: 10px; font-size: 16pt;" />
        <IonCardTitle style="font-size: medium;">
          Lista de regras de avaliação ({{ props.dataList.length }})
        </IonCardTitle>
      </div>
    </IonCardHeader>

    <div v-if="true">
      <IonCardContent class="ion-no-padding">
        <IonList>
          <div v-if="innerWidth < 992">
            <IonItemSliding
              v-for="(item, index) in props.dataList" :key="index" ref="itemSliding"
            >
              <IonItem>
                <IonLabel color="primary" class="ion-no-margin" style="margin-top: 5px; margin-bottom: 5px;">
                  <h2>{{ item.name || 'Regra sem nome' }}</h2>
                  <p style="color: rgba(var(--ion-color-primary-rgb), 0.6);">
                    Tipo: {{ item.gradeType }} | Progressão: {{ item.progressionType }}
                  </p>
                </IonLabel>
                <IonIcon :icon="isOpen[index] ? arrowForward : arrowBack" style="font-size: 18pt;" />
              </IonItem>

              <IonItemOptions side="end" style="border-bottom: 1px solid rgba(var(--ion-color-primary-rgb), 0.2);">
                <IonItemOption color="tertiary" @click="emits('update:see', { modal: true, data: item })">
                  <div style="width: 40px; display: flex; justify-content: center;">
                    <IonIcon :icon="eye" style="font-size: 18pt;" />
                  </div>
                </IonItemOption>
                <IonItemOption color="primary" @click="emits('update:edit', { modal: true, data: item })">
                  <div style="width: 40px; display: flex; justify-content: center;">
                    <IonIcon :icon="pencilSharp" style="font-size: 18pt;" />
                  </div>
                </IonItemOption>
                <IonItemOption color="danger" @click="emits('update:delete', { modal: true, data: item })">
                  <div style="width: 40px; display: flex; justify-content: center;">
                    <IonIcon :icon="trashSharp" style="font-size: 18pt;" />
                  </div>
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </div>
          <div v-else>
            <IonItem v-for="(item, index) in props.dataList" :key="index">
              <IonLabel color="primary" class="ion-no-margin" style="margin-top: 5px; margin-bottom: 5px;">
                <h2>{{ item.name || 'Regra sem nome' }}</h2>
                <p style="color: rgba(var(--ion-color-primary-rgb), 0.6);">
                  Tipo: {{ item.gradeType }} | Progressão: {{ item.progressionType }}
                </p>
              </IonLabel>
              <div style="display: flex; min-height: 100%;">
                <IonItemOption style="background-color: white;" @click="emits('update:see', { modal: true, data: item })">
                  <div style="width: 40px; display: flex; justify-content: center;">
                    <IonIcon color="tertiary" :icon="eye" size="large" />
                  </div>
                </IonItemOption>
                <IonItemOption style="background-color: white;" @click="emits('update:edit', { modal: true, data: item })">
                  <div style="width: 40px; display: flex; justify-content: center;">
                    <IonIcon color="primary" :icon="pencilSharp" size="large" />
                  </div>
                </IonItemOption>
                <IonItemOption style="background-color: white;" @click="emits('update:delete', { modal: true, data: item })">
                  <div style="width: 40px; display: flex; justify-content: center;">
                    <IonIcon color="danger" :icon="trashSharp" size="large" />
                  </div>
                </IonItemOption>
              </div>
            </IonItem>
          </div>
        </IonList>
      </IonCardContent>
    </div>
  </IonCard>
</template>

<style scoped>
</style>
