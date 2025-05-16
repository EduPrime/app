<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/vue'
import { arrowBack, arrowForward, eye, pencilSharp, trashSharp } from 'ionicons/icons'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<Props>()
const emits = defineEmits(['update:see', 'update:edit', 'update:delete'])
const route = useRoute()

const metaIcon = computed(() => (route.meta.icon as string) || '')
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

const isOpen = ref<boolean[]>([])
const itemSliding = ref<(InstanceType<typeof IonItemSliding> | null)[]>([])

// Tornar innerWidth reativo para responder a mudanças na largura da tela
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

<template>
  <IonCard v-if="true">
    <IonCardHeader color="secondary">
      <div style="display: flex; align-items: center; height: 15px;">
        <IonIcon :icon="metaIcon" style="margin-right: 10px; font-size: 16pt;" />
        <IonCardTitle style="font-size: medium;">
          Lista de funções ({{ props.dataList.length }})
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
                <IonLabel color="primary" class="ion-no-margin course-name" style="margin-top: 5px; margin-bottom: 5px;">
                  <h2>{{ item.name || 'Função sem nome' }}</h2>
                  <p v-if="item.abbreviation">
                    {{ item.abbreviation }}
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
              <IonLabel color="primary" class="ion-no-margin course-name" style="margin-top: 5px; margin-bottom: 5px;">
                <h2>{{ item.name || 'Função sem nome' }}</h2>
                <p v-if="item.abbreviation">
                  {{ item.abbreviation }}
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
.course-name h2 {
  text-align: left;
  font-size: 18px;
  font-weight: 500;
  color: var(--ion-color-primary);
  padding-bottom: 4px;
}

.course-name p {
  font-size: 14px;
  color: var(--ion-color-medium);
}
</style>
