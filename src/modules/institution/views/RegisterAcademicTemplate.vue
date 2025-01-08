<script setup lang="ts">
import { debounce } from '@/utils/debounce'
import showToast from '@/utils/toast-alert'
import { IonAccordion, IonAccordionGroup, IonBackButton, IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonList, IonRow } from '@ionic/vue'

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AcademicTemplateService from '../services/AcademicTemplateService'

const router = useRouter()
const academicTemplateService = new AcademicTemplateService()

const refYear = ref(new Date().getFullYear())
const modelName = ref('')

const stages = ref< { startDate: string, endDate: string, teachingDays: number }[]>([])

function addStage() {
  stages.value.push({ startDate: '', endDate: '', teachingDays: 0 })
}

function removeStage(index: number) {
  stages.value.splice(index, 1)
}

async function saveAcademicYearTemplate() {
  try {
    const newTemplate = {
      refYear: refYear.value,
      name: modelName.value || 'Modelo de Ano Letivo', // Verifica se tem nome
      stages: stages.value,
      stageCount: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      updatedBy: null,
      userCreated: null,
      metadata: null,
      tenantId: null,
      id: self.crypto.randomUUID()
    }
    const result = await academicTemplateService.create(newTemplate)
    if (result) {
      showToast('Modelo de Ano Letivo criado com sucesso!')

      setTimeout(() => {
        router.push('/Institutions/academic/years')
      }, 2000)
    }
  }
  catch (error) {
    console.error('Erro ao criar Modelo de Ano Letivo:', error)
    showToast('Erro ao criar o Modelo de Ano Letivo. Tente novamente.', 'top', 'danger')
  }
}
const calculateBusinessDays = debounce(async (startDate: string, endDate: string, index: number) => {
  if (startDate && endDate) {
    const teachingDays = await academicTemplateService.getBusinessDays(startDate, endDate)
    stages.value[index].teachingDays = teachingDays || 0
  }
}, 950)

watch(stages, (newStages) => {
  newStages.forEach((stage, index) => {
    if (stage.startDate && stage.endDate) {
      calculateBusinessDays(stage.startDate, stage.endDate, index)
    }
  })
}, { deep: true })
</script>

<template>
  <content-layout :show-footer="true">
    <template #header-buttons>
      <ion-buttons slot="start">
        <IonBackButton default-href="/" />
      </ion-buttons>
    </template>

    <h3 class="ion-text-center ion-text-uppercase">
      Criar Novo Modelo de Ano Letivo
    </h3>

    <!-- Campo para Ano de Referência -->
    <IonItem>
      <IonLabel position="stacked">
        Ano de Referência
      </IonLabel>
      <IonInput v-model="refYear" type="number" placeholder="Digite o ano de referência" />
    </IonItem>

    <!-- Campo para Nome do Modelo -->
    <IonItem>
      <IonLabel position="stacked">
        Nome do Modelo
      </IonLabel>
      <IonInput v-model="modelName" placeholder="Digite o nome do modelo" />
    </IonItem>

    <IonList v-if="stages.length > 0">
      <IonAccordionGroup expand="inset">
        <IonAccordion v-for="(stage, index) in stages" :key="index">
          <IonItem slot="header" color="light">
            <IonLabel>Etapa {{ index + 1 }}</IonLabel>
          </IonItem>
          <IonList slot="content">
            <!-- Data de Início -->
            <IonItem>
              <IonLabel position="stacked">
                Data de Início
              </IonLabel>
              <IonInput v-model="stage.startDate" type="date" placeholder="Selecione a data de início" />
            </IonItem>

            <!-- Data de Fim -->
            <IonItem>
              <IonLabel position="stacked">
                Data de Fim
              </IonLabel>
              <IonInput v-model="stage.endDate" type="date" placeholder="Selecione a data de fim" />
            </IonItem>

            <!-- Número de Dias Letivos -->
            <IonItem>
              <IonLabel position="stacked">
                Dias Letivos
              </IonLabel>
              <IonInput v-model.number="stage.teachingDays" type="number" placeholder="Digite o número de dias letivos" />
            </IonItem>

            <!-- Botão para remover a etapa -->
            <IonItem>
              <IonButton color="danger" expand="full" @click="removeStage(index)">
                Remover Etapa
              </IonButton>
            </IonItem>
          </IonList>
        </IonAccordion>
      </IonAccordionGroup>
    </IonList>

    <p v-else class="ion-text-center">
      Não há etapas ainda, adicione uma nova etapa.
    </p>

    <IonButton v-if="modelName" expand="full" @click="addStage">
      Adicionar Etapa
    </IonButton>

    <template #footer>
      <IonGrid>
        <IonRow class="ion-justify-content-between">
          <IonCol>
            <IonButton expand="block" color="danger">
              Cancelar
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="block" color="primary" @click="saveAcademicYearTemplate">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </template>
  </content-layout>
</template>
