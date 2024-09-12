<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InstitutionService from '../services/InstitutionService'
import ReadInstitution from './crud/ReadInstitution.vue'
import UpdateInstitution from './crud/UpdateInstitution.vue'
import showToast from '@/utils/toast-alert'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import InstitutionCards from '@/modules/institution/components/InstitutionCards.vue'
import type { Tables } from '@/types/database.types'

// Estados para os dados da instituição e carregamento
const institution = ref< Tables<'institution'> | null>()
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
  <ContentLayout>
    <InstitutionCards
      :school-count="schoolCount"
      :class-count="classCount"
      :series-count="seriesCount"
      :teacher-count="teacherCount"
    />
    <ReadInstitution
      v-if="!isEditing && institution"
      :key="institution.id + Date.now()"
      :institution="institution"
      @click="clickToEdit"
    />
    <UpdateInstitution
      v-else-if="isEditing && institution"
      :institution="institution"
      @cancel="isEditing = false"
      @save="updatedInstitution"
    />
  </ContentLayout>
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
