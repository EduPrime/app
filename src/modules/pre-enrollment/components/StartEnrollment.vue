<script setup lang="ts">
import { catchPageWidth } from '@/utils/useUtils'

import { IonButton, IonCol, IonGrid, IonIcon, IonRow, IonSpinner } from '@ionic/vue'

import { arrowBackOutline, checkmarkCircleOutline } from 'ionicons/icons'
import { defineEmits, defineProps, onMounted, ref, watch } from 'vue'

import PreEnrollmentService from '../services/PreEnrollmentService'

// componentes
import formPreEnrrolment from '../components/FormPreEnrrolment.vue'
import selectCourseSlider from '../components/SelectCourseSlider.vue'

import selectSchoolSlider from '../components/SelectSchoolSlider.vue'
import selectSeriesSlider from '../components/SelectSeriesSlider.vue'

interface Props {
  searchbox: string
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const supabase = new PreEnrollmentService()
const studentId = ref()
const pageWidth = ref()
const loading = ref(false)
const finished = ref(false)
const etapa = ref(1)

const selectedSchool = ref()
const selectedCourse = ref()
const selectedSeries = ref()
const shiftPreference = ref()

const preEnrollment = ref({
  school_id: undefined as string | undefined,
  course_id: undefined as string | undefined,
  series_id: undefined as string | undefined,
  student_id: undefined as string | undefined,
  observations: undefined as string | undefined,
  date_enrolment: new Date().toISOString().slice(0, 10),
})
watch(selectedSchool, (value) => {
  if (value) {
    preEnrollment.value.school_id = value.id
    loading.value = true
    finished.value = false

    // console.log('selectedSchool:', value)

    setTimeout(() => {
      finished.value = true
    }, 500) // 1 segundo antes de loading se tornar false

    setTimeout(() => {
      loading.value = false
      finished.value = true
    }, 1500) // 1 segundo depois de finished se tornar true

    etapa.value = 2
  }
})

watch(selectedCourse, (value) => {
  if (value) {
    preEnrollment.value.course_id = value.id
    loading.value = true
    finished.value = false

    setTimeout(() => {
      finished.value = true
    }, 500) // 1 segundo antes de loading se tornar false

    setTimeout(() => {
      loading.value = false
      finished.value = true
    }, 1500) // 1 segundo depois de finished se tornar true

    etapa.value = 3
  }
})

watch(selectedSeries, (value) => {
  if (value) {
    preEnrollment.value.series_id = value.id
    loading.value = true
    finished.value = false

    setTimeout(() => {
      finished.value = true
    }, 500) // 1 segundo antes de loading se tornar false

    setTimeout(() => {
      loading.value = false
      finished.value = true
    }, 1500) // 1 segundo depois de finished se tornar true

    etapa.value = 4
  }
})

watch(etapa, (value) => {
  if (value) {
    emits('update:modelValue', value)
  }
})

watch(studentId, (value) => {
  if (value) {
    preEnrollment.value.student_id = value
  }
})

watch(shiftPreference, (value) => {
  if (value) {
    preEnrollment.value.observations = `A preferência de turno é: ${value}`
  }
})
const teste = ref()
onMounted(async () => {
  pageWidth.value = catchPageWidth()
  teste.value = await supabase.getPreEnrollments()
})
</script>

<template>
  <pre>
    {{ new Date().toISOString().slice(0, 10) }}

    preEnrollment: {{ preEnrollment }}

    teste: {{ teste?.data }}
  </pre>
  <div class="ion-padding-bottom">
    <div style="min-height: 250px; " class="flex wrap">
      <container
        v-if="loading"
        style="height: 120px; width: 120px; background-color: white; margin: auto; border-radius: 100%;"
        class="flex"
      >
        <IonIcon
          v-if="finished" :icon="checkmarkCircleOutline" class="my-auto mx-auto"
          style="font-size: 80px; color:lawngreen;"
        />
        <IonSpinner v-else class="my-auto mx-auto" name="crescent" />
      </container>
      <!-- Etapa 1 -->
      <div v-else-if="etapa === 1" style="min-width: 100%;">
        <selectSchoolSlider v-model="selectedSchool" :query="props.searchbox" />
      </div>
      <!-- Etapa 2 -->
      <div v-else-if="etapa === 2">
        <IonButton
          color="light" :class="pageWidth?.pageWidth < 992 ? 'ion-margin-start' : 'ion-margin-bottom'"
          @click="etapa = (etapa - 1)"
        >
          <IonIcon :icon="arrowBackOutline" />
        </IonButton>
        <div>
          <selectCourseSlider v-model="selectedCourse" :school="selectedSchool?.id" />
        </div>
      </div>
      <div v-else-if="etapa === 3">
        <IonButton
          color="light" :class="pageWidth?.pageWidth < 992 ? 'ion-margin-start' : 'ion-margin-bottom'"
          @click="etapa = (etapa - 1)"
        >
          <IonIcon :icon="arrowBackOutline" />
        </IonButton>
        <div class="ion-padding-top">
          <selectSeriesSlider v-model="selectedSeries" :course="selectedCourse?.id" />
        </div>
      </div>
      <div v-else-if="etapa === 4" style="width: 100%;">
        <IonButton
          color="light" :class="pageWidth?.pageWidth < 992 ? 'ion-margin-start' : 'ion-margin-bottom'"
          @click="etapa = (etapa - 1)"
        >
          <IonIcon :icon="arrowBackOutline" />
        </IonButton>
        <div class="ion-padding-top ">
          <IonGrid style="padding: 0;">
            <IonRow>
              <IonCol style="padding: 0;" size="12">
                <formPreEnrrolment v-model="studentId" :page-width="pageWidth?.pageWidth" @preference="($event) => shiftPreference = $event" />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
ion-spinner {
    width: 80px;
    height: 80px;
}
</style>
