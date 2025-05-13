<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/vue'
import { eye, pencilSharp, personSharp, trashSharp } from 'ionicons/icons'

interface Props {
  dataList: {
    id: string
    name: string
    abbreviation?: string | null
    description?: string | null
    createdAt?: string
    updatedAt?: string | null
    deletedAt?: string | null
  }[]
}

const props = defineProps<Props>()
const emits = defineEmits(['update:see', 'update:edit', 'update:delete'])
</script>

<template>
  <IonCard v-if="true">
    <IonCardHeader color="secondary">
      <div style="display: flex; align-items: center; height: 15px;">
        <IonIcon :icon="personSharp" style="margin-right: 10px; font-size: 16pt;" />
        <IonCardTitle style="font-size: medium;">
          Lista de funções ({{ props.dataList.length }})
        </IonCardTitle>
      </div>
    </IonCardHeader>

    <div v-if="true">
      <IonCardContent class="ion-no-padding">
        <IonList>
          <IonItemSliding v-for="(item, index) in props.dataList" :key="index">
            <IonItem>
              <IonLabel class="ion-no-margin function-name" style="margin-top: 5px; margin-bottom: 5px;">
                <h2>{{ item.name || 'Função sem nome' }}</h2>
                <p v-if="item.abbreviation">{{ item.abbreviation }}</p>
              </IonLabel>
            </IonItem>

            <IonItemOptions>
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
        </IonList>
      </IonCardContent>
    </div>
  </IonCard>
</template>

<style scoped>
.function-name h2 {
  text-align: left;
  font-size: 18px;
  font-weight: 500;
  color: var(--ion-color-primary);
  padding-bottom: 4px;
}

.function-name p {
  font-size: 14px;
  color: var(--ion-color-medium);
}
</style>
