<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { IonBackButton, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from '@ionic/vue'

import SchoolService from '../services/SchoolService'
import AcademicTemplateService from '../services/AcademicTemplateService'
import AcademicYearService from '../services/AcademicYearService'
import type { Tables } from '@/types/database.types'

// Serviços
const schoolService = new SchoolService()
const academicTemplateService = new AcademicTemplateService()
const academicYearService = new AcademicYearService()

// Refs para escolas e templates
const schools = ref<Tables<'school'>[] | null>(null)
const selectedSchool = ref<Tables<'school'> | null>(null)
const templates = ref<Tables<'academic_year_template'>[] | null>(null)
const selectedTemplate = ref<string | null>(null)
const templateDetails = ref<Tables<'academic_year_template'> | null>(null)

// Carregar detalhes do template selecionado
async function loadTemplateDetails() {
  if (selectedTemplate.value) {
    const foundTemplate: any = selectedTemplate.value ? templates.value?.find(template => template.id === selectedTemplate.value) || null : null
    templateDetails.value = foundTemplate || null
  }
  else {
    templateDetails.value = null
  }
}

// Carregar lista de escolas
async function loadSchools() {
  schools.value = await schoolService.getAll()
}

// Carregar lista de templates
async function loadTemplates() {
  templates.value = await academicTemplateService.getAll()
}

// Confirmar a aplicação do template
function confirmTemplate() {
  if (selectedSchool.value && selectedTemplate.value) {
    console.log(`Template ${templateDetails.value?.name} aplicado para a escola ${selectedSchool.value.name}`)
  }
}

watch(selectedSchool, async (newValue) => {
  if (newValue) {
    const academicYear = await academicYearService.getBySchoolId(newValue.id)
    if (academicYear && academicYear.length > 0) {
      // -1 pega o último array
      selectedTemplate.value = academicYear[academicYear.length - 1].template_id
      await loadTemplateDetails()
    }
    else {
      selectedTemplate.value = null
      templateDetails.value = null
    }
  }
})

onMounted(() => {
  loadSchools()
  loadTemplates()
})
</script>

<template>
  <content-layout :show-footer="true" :show-description="true">
    <template #header-buttons>
      <ion-buttons slot:start>
        <IonBackButton default-href="/" />
      </ion-buttons>
    </template>
    <template #description>
      alguma descrição
    </template>
    <h3 class="ion-text-end ion-text-uppercase">
      Definir Ano Letivo por Escola
    </h3>

    <!-- Seleção de Escola -->
    <IonItem>
      <IonLabel>Escolha a Escola</IonLabel>
      <IonSelect id="escolas" v-model="selectedSchool" placeholder="Selecione uma escola">
        <IonSelectOption v-for="school in schools" :key="school.id" :value="school">
          {{ school.name }}
        </IonSelectOption>
      </IonSelect>
    </IonItem>

    <!-- Seleção de Template -->
    <IonItem>
      <IonLabel>Modelo de Ano Letivo</IonLabel>
      <IonSelect id="templates" v-model="selectedTemplate" placeholder="Selecione um template" :disabled="!selectedSchool" @ion-change="loadTemplateDetails">
        <IonSelectOption v-for="template in templates" :key="template.id" :value="template.id">
          {{ template.name }}
        </IonSelectOption>
      </IonSelect>
    </IonItem>

    <!-- Detalhes do Template Selecionado -->
    <IonCard v-if="templateDetails">
      <IonCardHeader>
        <IonCardTitle>Template Selecionado: {{ templateDetails.name }}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>Ano de Referência: {{ templateDetails.ref_year }}</p>
        <p>Etapas:</p>
        <ul>
          <li v-for="stage in templateDetails.stages" :key="stage.stageNumber">
            Etapa {{ stage.stageNumber }}: {{ stage.startDate }} - {{ stage.endDate }} ({{ stage.teachingDays }} dias)
          </li>
        </ul>
      </IonCardContent>
    </IonCard>

    <!-- Botão de Confirmação -->
    <IonButton expand="full" :disabled="!selectedTemplate" @click="confirmTemplate">
      Usar este Template
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
            <IonButton expand="block" color="primary">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </template>
  </content-layout>
</template>
