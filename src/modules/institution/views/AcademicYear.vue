<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { IonBackButton, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from '@ionic/vue'

import SchoolService from '../services/SchoolService'
import AcademicTemplateService from '../services/AcademicTemplateService'
import type { Tables } from '@/types/database.types'

const schools = ref<Tables<'school'>[] | null>()
const schoolService = new SchoolService()
const academicTemplateService = new AcademicTemplateService()
const selectedSchool = ref(null)
const templates = ref<Tables<'academic_year_template'>[] | null>(null)
const selectedTemplate = ref(null)
const templateDetails = ref<Tables<'academic_year_template'> | null>(null)

async function loadTemplateDetails() {
  if (selectedTemplate.value) {
    const foundTemplate: any = templates.value?.find(template => template.id === selectedTemplate.value) || null
    templateDetails.value = foundTemplate || null
  }
  else {
    templateDetails.value = null
  }
}

async function loadSchools() {
  schools.value = await schoolService.getAll()
}

async function loadTemplates() {
  templates.value = await academicTemplateService.getAll()
}

function confirmTemplate() {
  if (selectedSchool.value && selectedTemplate.value) {
    console.log(`Template ${templateDetails.value?.name} aplicado para a escola ${selectedSchool.value}`)
  }
}

onMounted(() => {
  loadSchools()
  loadTemplates()
})
</script>

<template>
  <content-layout :show-footer="true" :show-description="true">
    <template #header-buttons>
      <ion-buttons slot="start">
        <ion-back-button default-href="/" />
      </ion-buttons>
    </template>
    <template #description>
      alguma descrição
    </template>
    <h3 class="ion-text-end ion-text-uppercase">
      Definir Ano Letivo por Escola
    </h3>

    <!-- Seleção de Escola -->
    <ion-item>
      <ion-label>Escolha a Escola</ion-label>
      <ion-select id="escolas" v-model="selectedSchool" placeholder="Selecione uma escola">
        <ion-select-option v-for="school in schools" :key="school.id" :value="school.id">
          {{ school.name }}
        </ion-select-option>
      </ion-select>
    </ion-item>

    <!-- Seleção de Template -->
    <ion-item>
      <ion-label>Modelo de Ano Letivo</ion-label>
      <ion-select id="templates" v-model="selectedTemplate" placeholder="Selecione um template" :disabled="!selectedSchool" @ion-change="loadTemplateDetails">
        <ion-select-option v-for="template in templates" :key="template.id" :value="template.id">
          {{ template.name }}
        </ion-select-option>
      </ion-select>
    </ion-item>

    <!-- Detalhes do Template Selecionado -->
    <ion-card v-if="templateDetails">
      <ion-card-header>
        <ion-card-title>Template Selecionado: {{ templateDetails.name }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <p>Ano de Referência: {{ templateDetails.ref_year }}</p>
        <p>Etapas:</p>
        <ul>
          <li v-for="stage in templateDetails.stages" :key="stage.stageNumber">
            Etapa {{ stage.stageNumber }}: {{ stage.startDate }} - {{ stage.endDate }} ({{ stage.teachingDays }} dias)
          </li>
        </ul>
      </ion-card-content>
    </ion-card>

    <!-- Botão de Confirmação -->
    <ion-button expand="full" :disabled="!selectedTemplate" @click="confirmTemplate">
      Usar este Template
    </ion-button>

    <template #footer>
      <ion-grid>
        <ion-row class="ion-justify-content-between">
          <ion-col>
            <ion-button expand="block" color="danger">
              Cancelar
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button expand="block" color="primary">
              Salvar
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </content-layout>
</template>
