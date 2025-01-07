<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import { IonBackButton, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from '@ionic/vue'

import { onMounted, ref, watch } from 'vue'
import AcademicTemplateService from '../services/AcademicTemplateService'
import AcademicYearService from '../services/AcademicYearService'
// Serviços
import SchoolService from '../services/SchoolService'

const schoolService = new SchoolService()
const academicTemplateService = new AcademicTemplateService()
const academicYearService = new AcademicYearService()

const schools = ref<Tables<'school'>[] | null>(null)
const selectedSchoolId = ref<string | null>(null)
const templates = ref<Tables<'academic_year_template'>[] | null>(null)
const selectedTemplate = ref<string | null>(null)
interface Stage {
  stageNumber: number
  startDate: string
  endDate: string
  teachingDays: number
}

interface AcademicYearTemplate {
  id: string
  name: string
  ref_year: number
  stages: Stage[]
}

const templateDetails = ref<AcademicYearTemplate | null>(null)

// Função para carregar detalhes do template selecionado
async function loadTemplateDetails() {
  if (selectedTemplate.value && templates.value) {
    // Passo 1: Criar uma refer�ncia tempor�ria � lista de templates
    const templatesList = templates.value as Array<any>

    // Passo 2: Fazer a busca no array de templates
    const foundTemplate = templatesList.find((template) => {
      return template.id === selectedTemplate.value
    })

    // Passo 3: Atribuir o template encontrado a templateDetails
    templateDetails.value = foundTemplate || null
  }
  else {
    templateDetails.value = null
  }
}

// Função para carregar lista de escolas
async function loadSchools() {
  schools.value = await schoolService.getAll()
}

// Função para carregar lista de templates
async function loadTemplates() {
  templates.value = await academicTemplateService.getAll()
}

// Função para confirmar a aplicação do template
function confirmTemplate() {
  if (selectedTemplate.value) {
    // console.log(`Template ${templateDetails.value?.name} aplicado para a escola ${selectedSchool.value.name}`)
  }
}

// Função para formatar a data no padrão brasileiro
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
}

// Função para calcular se é um dia útil
function isBusinessDay(dateString: string) {
  const date = new Date(dateString)
  const day = date.getUTCDay()
  return day !== 0 && day !== 6 // 0 = Domingo, 6 = Sábado
}

watch(selectedSchoolId, async (newValue: any) => {
  if (newValue) {
    const academicYear = await academicYearService.getBySchoolId(newValue?.id)
    if (academicYear) {
      selectedTemplate.value = academicYear.templateId
      await loadTemplateDetails()
    }
    else {
      selectedTemplate.value = null
      templateDetails.value = null
    }
  }
})

// Função montada ao inicializar o componente
onMounted(() => {
  loadSchools()
  loadTemplates()
})
</script>

<template>
  <content-layout :show-footer="true" :show-description="true">
    <template #header-buttons>
      <ion-buttons slot="start">
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
      <IonSelect id="escolas" v-model="selectedSchoolId" placeholder="Selecione uma escola">
        <IonSelectOption v-for="school in schools" :key="school.id" :value="school">
          {{ school.name }}
        </IonSelectOption>
      </IonSelect>
    </IonItem>

    <!-- Seleção de Template -->
    <IonItem>
      <IonLabel>Modelo de Ano Letivo</IonLabel>
      <IonSelect id="templates" v-model="selectedTemplate" placeholder="Selecione um template" :disabled="!selectedSchoolId" @ion-change="loadTemplateDetails">
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
            Etapa {{ stage.stageNumber }}:
            {{ formatDate(stage.startDate) }} - {{ formatDate(stage.endDate) }}
            ({{ stage.teachingDays }} dias {{ isBusinessDay(stage.startDate) ? 'úteis' : '' }})
          </li>
        </ul>
      </IonCardContent>
    </IonCard>

    <template #footer>
      <IonGrid>
        <IonRow class="ion-justify-content-between">
          <IonCol>
            <IonButton expand="block" color="danger">
              Cancelar
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="block" color="primary" @click="confirmTemplate">
              Salvar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </template>
  </content-layout>
</template>
