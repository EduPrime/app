<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
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
    console.log('Novo valor para modelValue:', newVal)
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
    <ion-list v-if="qualifications.length > 0">
      <ion-label class="ion-text-wrap">
        <h2>Qualificações</h2>
      </ion-label>
      <ion-accordion-group expand="inset">
        <ion-accordion v-for="(qualification, index) in qualifications" :key="index">
          <ion-item slot="header" color="light">
            <ion-label>{{ qualification.course || 'Nova qualificação' }}</ion-label>
          </ion-item>
          <ion-list slot="content">
            <ion-item>
              <ion-label position="stacked">
                Qualificação
              </ion-label>
              <ion-input v-model="qualifications[index].course" />
            </ion-item>
            <ion-item>
              <ion-label position="stacked">
                Instituição
              </ion-label>
              <ion-input v-model="qualifications[index].institution" />
            </ion-item>
            <ion-item>
              <ion-grid>
                <ion-row>
                  <ion-col>
                    <ion-input :key="`start-${index}`" v-model="qualifications[index].start" name="start" label="Início" type="date" />
                  </ion-col>
                  <ion-col>
                    <ion-input :key="`end-${index}`" v-model="qualifications[index].end" name="end" label="Fim" type="date" />
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
          </ion-list>
        </ion-accordion>
      </ion-accordion-group>
    </ion-list>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button @click="addQualification">
        <ion-icon :icon="add" />
      </ion-fab-button>
    </ion-fab>
  </div>
</template>
