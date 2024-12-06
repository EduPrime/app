<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import OverlayModal from '@/components/theme/OverlayModal.vue'
import InfoCards from '@/modules/student-management/components/InfoCards.vue'
import ModalForm from '@/modules/student-management/components/ModalForm.vue'
import ModalList from '@/modules/student-management/components/ModalList.vue'
import { IonButton, IonIcon, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { add, chevronDownOutline } from 'ionicons/icons'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import EnrollmentService from '../services/EnrollmentService'
import RegisterModal from './RegisterModal.vue'

const router = useRouter()

// Estados para os dados da instituição e carregamento
const enrollmentService = new EnrollmentService()
const dataList = ref<Tables<'enrollment'>[]>([])
const schoolCount = ref(154)
const classCount = ref(25)
const approvalRate = ref(48)
const teacherCount = ref(30)
const searchQuery = ref('')

const filteredDataList = computed(() => {
  if (!searchQuery.value) {
    return dataList.value
  }

  return dataList.value.filter((enrollment: Tables<'enrollment'>) =>
    enrollment.name && enrollment.name.toLowerCase().includes(searchQuery.value.toLowerCase()), // Verifica se enrollment.name existe antes de usar toLowerCase()
  )
})

async function loadEnrollment() {
  try {
    const enrollments = await enrollmentService.getAll() // getAll() pode retornar null
    dataList.value = enrollments ?? [] // Se for null, atribuímos um array vazio
  }
  catch (error) {
    console.error('Erro ao carregar as matrículas:', error)
  }
}

function navigateToRegister() {
  router.push({ name: 'ModalRegister' })
}

const selectedAgeRange = ref<string | null>(null)

const ageRanges = [
  { label: 'Educação Infantil (0-5 anos)', value: '0-5' },
  { label: 'Ensino Fundamental (6-14 anos)', value: '6-14' },
  { label: 'Ensino Médio (15-17 anos)', value: '15-17' },
  { label: 'Outras idades (18+ anos)', value: '18+' },
]

const filteredDataByAge = computed(() => {
  if (!selectedAgeRange.value)
    return dataList.value

  const [minAge, maxAge] = selectedAgeRange.value.split('-').map(Number)
  return dataList.value.filter((enrollment: Tables<'enrollment'>) => {
    const age = enrollment.age
    return age >= minAge && (maxAge ? age <= maxAge : true)
  })
})

onMounted(() => {
  loadEnrollment()
})
</script>

<template>
  <ContentLayout>
    <InfoCards
      :student-count="schoolCount" :class-count="classCount" :approval-rate="approvalRate"
      :teacher-count="teacherCount"
    />
    <ion-toolbar>
      <ion-title>Solicitações de Matrícula ({{ filteredDataList.length }})</ion-title>
    </ion-toolbar>
    <ion-row class="ion-align-items-center ion-justify-content-between">
      <ion-col size="10">
        <IonSearchbar v-model="searchQuery" placeholder="Buscar alunos" />
      </ion-col>
      <ion-col size="2">
        <IonSelect v-model="selectedAgeRange" placeholder="Idade">
          <IonSelectOption
            v-for="range in ageRanges" :key="range.value"
            :value="range.value"
          >
            {{ range.label }}
          </IonSelectOption>
        </IonSelect>
      </ion-col>
      <ion-col size="2" class="ion-text-end">
        <IonButton id="add-btn" expand="block" class="ion-text-uppercase">
          <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
          <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
          <span class="ion-hide-sm-down">Novo</span>
        </IonButton>
      </ion-col>
    </ion-row>
    <ModalList :data-list="filteredDataList" />
    <OverlayModal
      action-name="Novo Cadastro" trigger="add-btn"
    >
      <ModalForm />
      <RegisterModal />
    </OverlayModal>
  </ContentLayout>
</template>

<style scoped>
ion-label h2 {
  margin: 0;
  font-weight: bold;
}

ion-searchbar {
  --background: var(--ion-color-light);

}

ion-select {
  --background: var(--ion-color-light);
  --color: white; /* Cor do texto selecionado */
  --padding-start: 16px;
  --border-radius: 8px;
  --icon-size: 24px;
  margin-left: 8px;
}

ion-select::part(icon) {
  color: var(--ion-color-dark);
  margin-right: 8px;
}

ion-select-option {
  padding: 8px 16px;
  font-size: 14px;
}
</style>
