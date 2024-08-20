<script setup lang="ts">
import { IonProgressBar } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import type { Institution } from '../types/Institution'
import InstitutionService from '../services/InstitutionService'
import ReadInstitution from './crud/ReadInstitution.vue'
import UpdateInstitution from './crud/UpdateInstitution.vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'

// Estados para os dados da instituição e carregamento
const institution = ref<Institution | null>(null)
const loading = ref(true)
const isEditing = ref(false)

// Estados para contagem de escolas, classes, séries e professores
const schoolCount = ref(10)
const classCount = ref(25)
const seriesCount = ref(7)
const teacherCount = ref(30)

// Instancia o serviço da instituição
const IService = new InstitutionService()

// Função para carregar a instituição
async function loadInstitution() {
  loading.value = true
  try {
    const institutions = await IService.getAll()
    institution.value = institutions?.at(0) ?? null
  }
  catch (error) {
    console.error('Erro ao carregar a instituição:', error)
  }
  finally {
    loading.value = false
  }
}

// Alterna para o modo de edição
function editInstitution() {
  isEditing.value = true
}

// Volta para o modo de visualização após salvar ou cancelar
function onSave() {
  isEditing.value = false
  loadInstitution() // Recarrega a instituição após a edição
}

// Carrega os dados da instituição quando o componente é montado
onMounted(() => {
  loadInstitution()
})
</script>

<template>
  <content-layout>
    <ion-progress-bar v-if="loading" type="indeterminate" />
    <read-institution
      v-if="!isEditing && institution"
      :institution="institution"
      :school-count="schoolCount"
      :class-count="classCount"
      :series-count="seriesCount"
      :teacher-count="teacherCount"
      @edit="editInstitution"
    />
    <update-institution
      v-else-if="isEditing && institution"
      :institution="institution"
      @saved="onSave"
      @cancel="onSave"
    />
  </content-layout>
</template>

<style scoped>
#create-button {
  margin: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title-container {
  display: flex;
  align-items: center;
}

.card-title-container ion-buttons {
  margin-left: 8px;
}
</style>
