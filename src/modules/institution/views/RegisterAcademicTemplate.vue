<script setup lang="ts">
import { ref } from 'vue'
import { IonAccordion, IonAccordionGroup, IonButton, IonCol, IonInput, IonItem, IonLabel, IonList, IonRow } from '@ionic/vue'

// Refs para os campos do novo modelo de ano letivo
const refYear = ref(new Date().getFullYear()) // Pega o ano atual
const modelName = ref('')
const stages = ref([{ startDate: '', endDate: '', teachingDays: 0 }]) // Inicia com uma etapa

// Função para adicionar uma nova etapa
function addStage() {
  stages.value.push({ startDate: '', endDate: '', teachingDays: 0 })
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
//   console.log('Novo modelo salvo:', newTemplate)
  // Adicionar lógica de chamada à API para salvar o novo modelo
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

    <!-- Etapas do Ano Letivo -->
    <IonList v-if="stages.length > 0">
      <IonAccordionGroup expand="inset">
        <IonAccordion v-for="(stage, index) in stages" :key="index">
          <template #header>
            <IonItem color="light">
              <IonLabel>Etapa {{ index + 1 }}</IonLabel>
            </IonItem>
          </template>
          <template #content>
            <IonList>
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
          </template>
        </IonAccordion>
      </IonAccordionGroup>
    </IonList>

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

<style scoped>
/* Estilos adicionais */
</style>
