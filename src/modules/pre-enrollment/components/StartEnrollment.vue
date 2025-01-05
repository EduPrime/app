<script setup lang="ts">
import { catchPageWidth } from '@/utils/useUtils'

import { IonButton, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonHeader, IonIcon, IonRow, IonSpinner } from '@ionic/vue'

import { arrowBackOutline, checkmarkCircleOutline } from 'ionicons/icons'
import { onMounted, ref, watch } from 'vue'

// componentes
import formPreEnrrolment from '../components/FormPreEnrrolment.vue'

import selectCourseSlider from '../components/SelectCourseSlider.vue'
import selectSchoolSlider from '../components/SelectSchoolSlider.vue'

import selectSeriesSlider from '../components/SelectSeriesSlider.vue'
import PreEnrollmentService from '../services/PreEnrollmentService'

interface Props {
  searchbox: string
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const postgrest = new PreEnrollmentService()
const studentId = ref()
const pageWidth = ref()
const loading = ref(false)
const finished = ref(false)
const etapa = ref(1)

const selectedSchool = ref()
const selectedCourse = ref()
const selectedSeries = ref()
const shiftPreference = ref()
const insertedPreEnrollment = ref()

const postStatus = ref()

const preEnrollment = ref({
  schoolId: '',
  courseId: '',
  seriesId: '',
  studentId: '',
  observations: undefined as string | null | undefined,
  preenrollmentcode: undefined as string | null | undefined,
  datePreenrollment: new Date().toISOString().slice(0, 10),
})
watch(selectedSchool, (value) => {
  if (value) {
    preEnrollment.value.schoolId = value.id
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
    preEnrollment.value.courseId = value.id
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
    preEnrollment.value.seriesId = value.id
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
    // loading.value = true
    preEnrollment.value.studentId = value
  }
  else {
    // loading.value = false
  }
})

watch(shiftPreference, (value) => {
  if (value) {
    preEnrollment.value.observations = `A preferência de turno é: ${value}`
  }
})

// return emits('postStatus', {
//     duplicated: duplicated.value,
//     loading: true,
//   })

watch(postStatus, async (value) => {
  if (value && value.loading === true) {
    loading.value = true
    finished.value = false

    setTimeout(() => {
      finished.value = true
    }, 500) // 1 segundo antes de loading se tornar false

    preEnrollment.value.preenrollmentcode = await postgrest.generateUnicPreEnrollmentCode()

    if (
      preEnrollment.value.preenrollmentcode
      && preEnrollment.value.schoolId
      && preEnrollment.value.courseId
      && preEnrollment.value.seriesId
      && preEnrollment.value.studentId
    ) {
      insertedPreEnrollment.value = await postgrest.insertPreEnrollment(preEnrollment.value)
    }

    setTimeout(() => {
      loading.value = false
      finished.value = true
    }, 1500) // 1 segundo depois de finished se tornar true

    etapa.value = 5
  }
  else {
    loading.value = false
    etapa.value = 4
  }
})

const teste = ref()
onMounted(async () => {
  pageWidth.value = catchPageWidth()
  teste.value = await postgrest.getPreEnrollments()
})
</script>

<template>
  <IonButton v-if="postStatus?.loading" :class="pageWidth?.pageWidth < 992 ? 'ion-margin-start' : ''" color="light" @click="postStatus = undefined">
    <IonIcon :icon="arrowBackOutline" />
  </IonButton>

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
                <formPreEnrrolment v-model="studentId" :page-width="pageWidth?.pageWidth" @preference="($event) => shiftPreference = $event" @post-status="($event) => postStatus = $event" />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>
      <div v-else-if="etapa === 5" style="width: 100%;">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <ion-card>
                <IonCardHeader>
                  <IonCardTitle style="font-size: 16pt; font-weight: 800;">
                    Pré-Matrícula realizada com sucesso
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Os dados do aluno foram salvos com sucesso! Salve o código de pré-matrícula caso deseje acompanhar a situação.</p>

                  <p style="font-size: 14pt;" class="ion-padding-top">
                    Código da pré-matrícula: <span style="font-weight: 800;">

                      <!-- {{ insertedPreEnrollment.data.at(0).preenrollmentcode }} -->
                      {{ insertedPreEnrollment.data }}
                    </span>
                  </p>
                  <div class="flex" style="min-height: 150px;">
                    <IonIcon
                      :icon="checkmarkCircleOutline" class="my-auto mx-auto"
                      style="font-size: 130px; color:lawngreen;"
                    />
                  </div>
                </IonCardContent>
              </ion-card>
            </IonCol>
          </IonRow>
        </IonGrid>
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
