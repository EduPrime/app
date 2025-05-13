<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/vue'
import { eye, pencilSharp, school, trashSharp } from 'ionicons/icons'

interface Props {
  dataList: {
    abbreviation: string | null
    active: boolean
    address: string | null
    city: string | null
    createdAt: string
    deletedAt: string | null
    email: string | null
    id: string
    institution_id: string
    logourl: string | null
    name: string
    phone: string | null
    postalcode: string | null
    school_zone: string | null
    social_network: string | null
    state: string | null
    updatedAt: string | null
    user_created: string | null
    website: string | null
  }[]
}

const props = defineProps<Props>()
const emits = defineEmits(['update:see', 'update:edit', 'update:delete'])
</script>

<template>
  <IonCard v-if="true">
    <IonCardHeader color="secondary">
      <div style="display: flex; align-items: center; height: 15px;">
        <IonIcon :icon="school" style="margin-right: 10px; font-size: 16pt;" />
        <IonCardTitle style="font-size: medium;">
          Lista de registros ({{ props.dataList.length }})
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
