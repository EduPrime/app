<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Institution } from '../types/Institution'
import InstitutionService from '../services/InstitutionService'
import ReadInstitution from './crud/ReadInstitution.vue'
import UpdateInstitution from './crud/UpdateInstitution.vue'
import showToast from '@/utils/toast-alert'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import InstitutionCards from '@/modules/institution/components/InstitutionCards.vue'

// Estados para os dados da instituição e carregamento
const institution = ref<Institution | null>(null)
const loading = ref(true)
const isEditing = ref(false)

// Estados para contagem de escolas, classes, séries e professores
const schoolCount = ref(10)
const classCount = ref(25)
const seriesCount = ref(7)
const teacherCount = ref(30)

const IService = new InstitutionService()

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
function clickToEdit() {
  console.log('O botão foi clicado no componente filho!')
  isEditing.value = true
}

function updatedInstitution() {
  loadInstitution()
  showToast('Instituição atualizada com sucesso!')
  isEditing.value = false
}
onMounted(() => {
  loadInstitution()
})
</script>

<template>
  <content-layout>
    <institution-cards
      :school-count="schoolCount"
      :class-count="classCount"
      :series-count="seriesCount"
      :teacher-count="teacherCount"
    />
    <read-institution
      v-if="!isEditing && institution"
      :key="institution.id + Date.now()"
      :institution="institution"
      @click="clickToEdit"
    />
    <update-institution
      v-else-if="isEditing && institution"
      :institution="institution"
      @cancel="isEditing = false"
      @save="updatedInstitution"
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
