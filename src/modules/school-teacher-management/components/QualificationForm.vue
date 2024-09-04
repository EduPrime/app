<script setup lang="ts">
import { ref, watch } from 'vue'
import { IonAccordion, IonAccordionGroup, IonFab, IonFabButton, IonIcon, IonInput, IonItem, IonLabel, IonList } from '@ionic/vue'
import { add } from 'ionicons/icons'

const props = defineProps<{
  modelValue: { institution: string, course: string, start: string | number | undefined, end: string | number | undefined }[]
}>()

const emit = defineEmits(['update:modelValue'])
const qualifications = ref(props.modelValue || [])

watch(
  () => props.modelValue,
  (newVal) => {
    qualifications.value = newVal || []
  },
  { deep: true, immediate: true },
)

watch(
  qualifications,
  () => {
    emit('update:modelValue', qualifications.value)
  },
  { deep: true },
)

function getDateYearsAgo(yearsAgo: number): string {
  const date = new Date()
  date.setFullYear(date.getFullYear() - yearsAgo)
  return date.toISOString().split('T')[0]
}

function addQualification() {
  qualifications.value.push({
    course: '',
    institution: '',
    start: getDateYearsAgo(6),
    end: getDateYearsAgo(2),
  })
}
</script>

<template>
  <div>
    <IonLabel class="ion-text-wrap">
      <h2>Qualificações</h2>
    </IonLabel>

    <IonList v-if="qualifications.length > 0">
      <IonAccordionGroup expand="inset">
        <IonAccordion v-for="(qualification, index) in qualifications" :key="index">
          <IonItem slot="header" color="light">
            <IonLabel>{{ qualification.course || 'Nova qualificação' }}</IonLabel>
          </IonItem>
          <IonList slot="content">
            <IonItem>
              <IonLabel position="stacked">
                Qualificação
              </IonLabel>
              <IonInput v-model="qualifications[index].course" />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">
                Instituição
              </IonLabel>
              <IonInput v-model="qualifications[index].institution" />
            </IonItem>
            <IonItem>
              <ion-grid>
                <ion-row>
                  <ion-col>
                    <IonInput :key="`start-${index}`" v-model="qualifications[index].start" name="start" label="Início" type="date" />
                  </ion-col>
                  <ion-col>
                    <IonInput :key="`end-${index}`" v-model="qualifications[index].end" name="end" label="Fim" type="date" />
                  </ion-col>
                </ion-row>
              </ion-grid>
            </IonItem>
          </IonList>
        </IonAccordion>
      </IonAccordionGroup>
    </IonList>

    <p v-else class="ion-text-center">
      As qualificações do professor não existem ainda, insira agora mesmo.
    </p>

    <ion-button id="add-btn" expand="block" class="ion-text-uppercase" @click="addQualification">
      <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
      <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
      <span class="ion-hide-sm-down">Qualificação</span>
    </ion-button>
  </div>
</template>
