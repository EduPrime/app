<template>
  <IonCard v-if="true">
    <IonCardHeader color="secondary">
      <div style="display: flex; align-items: center; height: 15px;">
        <IonIcon :icon="businessOutline" style="margin-right: 10px; font-size: 16pt;" />
        <IonCardTitle style="font-size: medium;">
          Lista de instituições ({{ props.dataList.length }})
        </IonCardTitle>
      </div>
    </IonCardHeader>

    <div v-if="true">
      <IonCardContent class="ion-no-padding">
        <IonList>
          <div v-if="innerWidth < 992">
            <IonItemSliding
              v-for="(item, index) in props.dataList" :key="index" ref="itemSliding"
              @ion-did-open="() => handleSwipeOpened(index)"
              @ion-did-close="() => handleSwipeClosed(index)"
            >
              <IonItem>
                <IonLabel color="primary" class="ion-no-margin institution-name" style="margin-top: 5px; margin-bottom: 5px;">
                  <h2>{{ item.name || 'Instituição sem nome' }}</h2>
                  <p>
                    <span v-if="item.city || item.state">{{ item.city || '' }}{{ item.state ? `/${item.state}` : '' }}</span>
                    <span v-if="item.phone"> - {{ item.phone }}</span>
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
              <IonLabel color="primary" class="ion-no-margin institution-name" style="margin-top: 5px; margin-bottom: 5px;">
                <h2>{{ item.name || 'Instituição sem nome' }}</h2>
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

<script setup lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
} from '@ionic/vue'
import { arrowBack, arrowForward, businessOutline, eye, pencilSharp, trashSharp } from 'ionicons/icons'
import { onMounted, onUnmounted, ref } from 'vue'

interface Props {
  dataList: {
    id: string
    name: string
    address?: string | null
    city?: string | null
    state?: string | null
    postalCode?: string | null
    phone?: string | null
    email?: string | null
    createdAt?: string
    updatedAt?: string | null
    deletedAt?: string | null
  }[]
}

const props = defineProps<Props>()
const emits = defineEmits(['update:see', 'update:edit', 'update:delete'])

const isOpen = ref<boolean[]>([])
const itemSliding = ref<(InstanceType<typeof IonItemSliding> | null)[]>([])

const innerWidth = ref(window.innerWidth)

function updateInnerWidth() {
  innerWidth.value = window.innerWidth
}

function handleSwipeOpened(index: number) {
  isOpen.value[index] = true
}

function handleSwipeClosed(index: number) {
  isOpen.value[index] = false
}

onMounted(() => {
  window.addEventListener('resize', updateInnerWidth)
  isOpen.value = Array.from<boolean>({ length: props.dataList.length }).fill(false)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateInnerWidth)
})
</script>

<style scoped>
.institution-name h2 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.institution-name p {
  font-size: 14px;
  color: var(--ion-color-medium);
}
</style>
