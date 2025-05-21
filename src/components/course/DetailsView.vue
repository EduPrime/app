<script setup lang="ts">
import BaseService from '@/services/BaseService'
import { IonButton, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonText } from '@ionic/vue'
import { businessOutline, calendarOutline, constructOutline, desktopOutline, documentTextOutline, layersOutline, peopleOutline, pricetagOutline, ribbonOutline, schoolOutline, settingsOutline, timeOutline, trailSign } from 'ionicons/icons'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  items: {
    id: string
    name: string
    status: string
    metadata: string | null
    createdAt: string
    deletedAt: string | null
    updatedAt: string | null
    userCreated: string | null
    updatedBy: string | null
    tenantId: string
    courseStage: number | string
    workload: number | string
    institutionId: string
    schoolId: string
    abbreviation: string | null
    description: string | null
    numberOfStages: string | null
    timeSerialization: string
    evaluationRuleId: string
    graduate: string
    teachingType: string
    regimeType: string
    courseModality: string
  }

  name?: string
}

const props = defineProps<Props>()

const emits = defineEmits(['close', 'edit'])
const baseService = new BaseService('course')
const route = useRoute()

const metaIcon = computed(() => (route.meta.icon as string) || '')
const institution = ref()
const school = ref()
const evaluationRules = ref()
//

watch(
  () => props.items,
  async () => {
    institution.value = await baseService.getByInCustomTable('institution', props.items.institutionId)
    school.value = await baseService.getByInCustomTable('school', props.items.schoolId)
    evaluationRules.value = await baseService.getByInCustomTable('evaluationRule', props.items.evaluationRuleId)
  },
  { deep: true, immediate: true },
)

// Mapeando atributos para um array de objetos com ícones
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding">
      <!-- Título no mesmo estilo exato do formulário -->
      <div class="style-purple-lane" style="display: flex; align-items: center;">
        <IonIcon :icon="metaIcon" style="margin-right: 10px;" />
        {{ props.name }}
      </div>

      <div class="function-detail-content">
        <!-- Informações gerais header -->
        <IonItemDivider
          style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
          class="ion-no-padding"
        >
          <IonLabel color="primary" class="ion-no-margin">
            Informações gerais
          </IonLabel>
        </IonItemDivider>

        <IonList>
          <!-- Tag com abreviação alinhada à esquerda -->

          <!-- Ícone e nome da função alinhados à esquerda -->
          <div style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="trailSign" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ props.items.name }}
            </IonText>
          </div>

          <div v-if="institution" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="businessOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ institution.name }}
            </IonText>
          </div>

          <div v-if="school" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="schoolOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ school.name }}
            </IonText>
          </div>

          <div v-if="evaluationRules" style="display: flex; align-items: center; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="constructOutline" />
            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              {{ evaluationRules.name }}
            </IonText>
          </div>

          <div v-if="props.items.abbreviation" style="display: flex; align-items: center; padding: 6px;" class="ion-text-left">
            <IonIcon slot="start" color="primary" style="padding-right: 10px;" :icon="pricetagOutline" />

            <IonText color="primary" style="font-size: 11pt; padding-top: 2px;">
              Abreviação
            </IonText>

            <IonChip color="primary">
              {{ props.items.abbreviation }}
            </IonChip>
          </div>

          <!-- Ícone e descrição da função alinhados à esquerda -->
          <div v-if="props.items.description" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="documentTextOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <div class="description-text">
                {{ props.items.description }}
              </div>
            </IonText>
          </div>

          <IonItemDivider
            style="border-color: rgba(var(--ion-color-primary-rgb), 0.25);"
            class="ion-no-padding ion-padding-top"
          >
            <IonLabel color="primary" class="ion-no-margin">
              Informações administrativass
            </IonLabel>
          </IonItemDivider>

          <!-- Ícone e descrição da função alinhados à esquerda -->
          <div v-if="props.items.graduate" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="ribbonOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <div class="description-text">
                {{ props.items.graduate }}
              </div>
            </IonText>
          </div>

          <!-- Ícone e descrição da função alinhados à esquerda -->
          <div v-if="props.items.teachingType" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="peopleOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <div class="description-text">
                {{ props.items.teachingType }}
              </div>
            </IonText>
          </div>
          <div v-if="props.items.courseModality" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="desktopOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <div class="description-text">
                {{ props.items.courseModality }}
              </div>
            </IonText>
          </div>

          <div v-if="props.items.regimeType" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="settingsOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <div class="description-text">
                {{ props.items.regimeType }}
              </div>
            </IonText>
          </div>

          <div v-if="props.items.timeSerialization" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="calendarOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <div class="description-text">
                {{ props.items.timeSerialization }}
              </div>
            </IonText>
          </div>

          <div v-if="props.items.workload" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="timeOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <div class="description-text">
                {{ props.items.workload }} horas
              </div>
            </IonText>
          </div>

          <div v-if="props.items.numberOfStages" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="layersOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <div class="description-text">
                Quantidade de etapas {{ props.items.numberOfStages }}
              </div>
            </IonText>
          </div>

          <div v-if="props.items.courseStage" style="display: flex; align-items: flex-start; padding: 6px;">
            <IonIcon slot="start" color="primary" style="padding-right: 10px; margin-top: 3px;" :icon="schoolOutline" />
            <IonText color="primary" style="font-size: 11pt;">
              <div class="description-text">
                Etapa do curso {{ props.items.courseStage }}
              </div>
            </IonText>
          </div>
        </IonList>
      </div>
    </IonContent>

    <div>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonButton :disabled="false" color="danger" expand="full" @click="emits('close', false)">
              Fechar
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton :disabled="false" color="secondary" expand="full" @click="emits('edit', true)">
              Editar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  </IonPage>
</template>

<style scoped>
.style-purple-lane {
  background: rgba(var(--ion-color-secondary-rgb), 0.15);
  color: var(--ion-color-secondary);
  padding: 2px;
  margin: 8px 2px;
  border-radius: 4px;
}

.function-detail-content {
  padding: 16px 0;
}

.abbreviation-tag {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
}

.description-text {
  white-space: pre-line;
  line-height: 1.5;
}
</style>
