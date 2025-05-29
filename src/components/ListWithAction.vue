<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/vue'
import { apps, arrowBack, arrowForward, eye, pencilSharp, trashSharp } from 'ionicons/icons'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  dataList: {
    abbreviation?: string | null
    active?: boolean
    address?: string | null
    course_id?: string | null
    city?: string | null
    createdAt?: string
    deletedAt?: string | null
    email?: string | null
    id: string
    institution_id?: string | null
    logourl?: string | null
    name: string
    phone?: string | null
    postalcode?: string | null
    school_zone?: string | null
    social_network?: string | null
    state?: string | null
    updatedAt?: string | null
    user_created?: string | null
    website?: string | null
    serieDisciplines?: [
      {
        discipline?: string | null
        workload?: number | null
      },
    ]
  }[]
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
          Lista de registros ({{ props.dataList.length }})
        </IonCardTitle>
      </div>
    </IonCardHeader>

    <div v-if="true">
      <IonCardContent class="ion-no-padding">
        <!-- listando -->
        <!-- <pre>
          list: {{ list }}
        </pre> -->
        <IonList>
          <div v-if="innerWidth < 992">
            <IonItemSliding
              v-for="(item, index) in props.dataList" :key="index" ref="itemSliding"
            >
              <!-- @ion-drag="console.log('ion-drag')" -->
              <IonItem>
                <IonLabel color="primary" class="ion-no-margin" style="margin-top: 5px; margin-bottom: 5px;">
                  <h2>{{ item.name || 'Item sem nome' }}</h2>
                  <p v-if="item.address" style="color: rgba(var(--ion-color-primary-rgb), 0.6);">
                    {{ item.address || 'Sem endereço' }}
                  </p>
                </IonLabel>
                <IonIcon :icon="isOpen[index] ? arrowForward : arrowBack" style="font-size: 18pt;" />
              </IonItem>

              <IonItemOptions side="end" style="border-bottom: 1px solid rgba(var(--ion-color-primary-rgb), 0.2);">
                <!-- @ion-swipe="handleOpened(index)" -->

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

                <!-- <IonItemOption style="background-color: white; border-left: 1px solid var(--ion-color-primary);" @click="emits('update:see', { modal: true, data: item })">
                  <div style="width: 40px; display: flex; justify-content: center;">
                    <IonIcon color="tertiary" :icon="eye" style="font-size: 18pt;" />
                  </div>
                </IonItemOption>
                <IonItemOption style="background-color: white;" @click="emits('update:edit', { modal: true, data: item })">
                  <div style="width: 40px; display: flex; justify-content: center;">
                    <IonIcon color="primary" :icon="pencilSharp" style="font-size: 18pt;" />
                  </div>
                </IonItemOption>
                <IonItemOption style="background-color: white;" @click="emits('update:delete', { modal: true, data: item })">
                  <div style="width: 40px; display: flex; justify-content: center;">
                    <IonIcon color="danger" :icon="trashSharp" style="font-size: 18pt;" />
                  </div>
                </IonItemOption> -->
              </IonItemOptions>
            </IonItemSliding>
          </div>
          <div v-else>
            <IonItem v-for="(item, index) in props.dataList" :key="index">
              <IonLabel color="primary" class="ion-no-margin" style="margin-top: 5px; margin-bottom: 5px;">
                <h2>{{ item.name || 'Item sem nome' }}</h2>
                <p style="color: rgba(var(--ion-color-primary-rgb), 0.6);">
                  {{ item.address || 'Sem endereço' }}
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
