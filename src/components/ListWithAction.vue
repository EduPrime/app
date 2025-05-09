<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/vue'
import { eye, pencilSharp, school, trashSharp } from 'ionicons/icons'

const props = defineProps<{
  dataList: object[]
}>()
const emits = defineEmits(['update:see', 'update:edit', 'update:delete'])
</script>

<template>
  <IonCard v-if="true">
    <IonCardHeader color="secondary">
      <div style="display: flex; align-items: center; height: 15px;">
        <IonIcon :icon="school" style="margin-right: 10px; font-size: 16pt;" />
        <IonCardTitle style="font-size: medium;">
          Lista de registros
        </IonCardTitle>
      </div>
    </IonCardHeader>

    <div v-if="true">
      <IonCardContent class="ion-no-padding">
        <!-- listando -->

        <IonList>
          <IonItemSliding v-for="(item, index) in props.dataList" :key="index">
            <IonItem>
              <IonLabel class="ion-no-margin" style="margin-top: 5px; margin-bottom: 5px;">
                <h2>{{ item.name || 'Item sem nome' }}</h2>
                <p>{{ item.address || 'Sem endereço' }}</p>
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
