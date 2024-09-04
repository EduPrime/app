<script setup lang="ts">
import { ref } from 'vue'
import { IonAccordion, IonAccordionGroup, IonButton, IonInput, IonItem, IonLabel, IonList } from '@ionic/vue'

// Refs para os campos do novo modelo de ano letivo
const refYear = ref(new Date().getFullYear())
const modelName = ref('')
// Inicia com 4 etapas como modelo
const stages = ref([
  { id: Date.now() + 1, startDate: '2024-01-01', endDate: '2024-03-31', teachingDays: 60 },
  { id: Date.now() + 2, startDate: '2024-04-01', endDate: '2024-06-30', teachingDays: 65 },
  { id: Date.now() + 3, startDate: '2024-07-01', endDate: '2024-09-30', teachingDays: 55 },
  { id: Date.now() + 4, startDate: '2024-10-01', endDate: '2024-12-31', teachingDays: 50 },
])

// Função para adicionar uma nova etapa
function addStage() {
  stages.value.push({ id: Date.now(), startDate: '', endDate: '', teachingDays: 0 })
}

// Função para remover uma etapa
function removeStage(index: number) {
  stages.value.splice(index, 1)
}

// Função para salvar o novo modelo de ano letivo
function saveAcademicYearTemplate() {
  const newTemplate = {
    ref_year: refYear.value,
    name: modelName.value,
    stages: stages.value,
  }
  console.log('Novo modelo salvo:', newTemplate)
}
</script>

<template>
  <content-layout :show-footer="true">
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
        <IonAccordion v-for="(stage, index) in stages" :key="stage.id">
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

    <!-- Botão para adicionar uma nova etapa -->
    <IonButton expand="full" @click="addStage">
      Adicionar Etapa
    </IonButton>

    <!-- Botão para salvar o modelo -->
    <IonButton expand="full" color="primary" @click="saveAcademicYearTemplate">
      Salvar Modelo
    </IonButton>
  </content-layout>
</template>
