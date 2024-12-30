<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonText } from '@ionic/vue'
import { computed, defineProps, ref, watch } from 'vue'

import PreEnrollmentService from '../services/PreEnrollmentService'

interface Props {
  query: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const query = computed(() => props.query)
const result = ref()
const postgrest = new PreEnrollmentService()

watch(query, async (value) => {
  if (value) {
    result.value = await postgrest.getPreEnrollmentByCode(value)
  }
  else {
    result.value = null
  }
})

watch(result, (value) => {
  if (value && value.pre_enrollment) {
    emits('update:modelValue', true)
  }
  else {
    emits('update:modelValue', false)
  }
})
</script>

<template>
  <IonCard v-if="result && result?.pre_enrollment">
    <div style="display: flex;">
      <img
        src="../assets/images/default_user.png" width="70px" alt="" class="ion-padding-start ion-padding-top"
        style="display: block; object-fit: contain; margin-top: auto; margin-bottom: auto;"
      >
      <IonCardHeader class="ion-padding-top">
        <IonCardTitle>
          <IonText color="primary">
            {{ result.student.name }}
          </IonText>
        </IonCardTitle>
        <IonCardSubtitle>
          <IonText color="primary">
            Pré-Matrícula:
            <b class="ion-text-uppercase">
              {{ result.pre_enrollment.pre_enrollment_code }}
            </b>
          </IonText>
        </IonCardSubtitle>
      </IonCardHeader>
    </div>
    <IonCardContent>
      <IonItem>
        <div>
          <IonText color="primary">
            <p>
              {{ result.school.name }}
            </p>
          </IonText>
        </div>
      </IonItem>
      <IonItem>
        <div>
          <IonText color="primary">
            <p>
              {{ result.course.name }}
            </p>
          </IonText>
        </div>
      </IonItem>
      <IonItem>
        <div>
          <IonText color="primary">
            <p>Situação da pré-matrícula</p>
          </IonText>
        </div>
        <span style="display: flex; margin-left: auto">
          <IonCardSubtitle class="ion-padding-end">
            <IonText color="primary">
              {{ result.pre_enrollment.status === 'Ativo' ? 'Em Analise' : 'Finalizado' }}
            </IonText>
          </IonCardSubtitle>
          <div
            :style="result.pre_enrollment.status === 'Ativo' ? 'background-color: orange' : 'background-color: gray'"
            style="height: 16px; width: 16px; border-radius: 100%; margin-top: auto; margin-bottom: auto;"
          />
        </span>
      </IonItem>
    </IonCardContent>
  </IonCard>

  <IonCard v-else-if="result">
    <IonCardHeader>
      <IonCardTitle>Nenhum cadastro encontrado</IonCardTitle>
      <IonCardSubtitle>Não foi possível encontrar cadastro {{ props.query ? `${props.query}` : '' }}</IonCardSubtitle>
    </IonCardHeader>

    <IonCardContent> Verifique se o código foi digitado corretamente ou selecione uma das opções abaixo </IonCardContent>
  </IonCard>
</template>
