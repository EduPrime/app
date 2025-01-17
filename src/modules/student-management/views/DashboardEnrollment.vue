<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import SchoolCards from '@/modules/school-management/components/SchoolCards.vue'
import EnrollmentList from '@/modules/student-management/components/EnrollmentList.vue'
import { useAuthStore } from '@/store/AuthStore'
import { IonButton, IonCol, IonIcon, IonItem, IonRow, IonSelect, IonSelectOption } from '@ionic/vue'
import { businessOutline, menu } from 'ionicons/icons'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import EnrollmentService from '../services/EnrollmentService'

const router = useRouter()
const authStore = useAuthStore()
console.log(authStore.organization)
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
const students = ref([
  { name: 'João Otávio da Silva', age: 13, gender: 'masculino', pcd: true, selected: true },
  { name: 'Mariana Almeida Carvalho', age: 16, gender: 'feminino', pcd: false, selected: false },
  { name: 'Josué Amorim dos Santos', age: 14, gender: 'masculino', pcd: false, selected: false },
  { name: 'Antônio Jardel Alencar Souza', age: 10, gender: 'masculino', pcd: false, selected: false },
  { name: 'Itamar Batista Filho', age: 12, gender: 'masculino', pcd: false, selected: false },
  { name: 'Emanuela', age: 11, gender: 'feminino', pcd: false, selected: false },
])
function handleSelectAll($event) {
  students.value.forEach((element) => {
    element.selected = $event.detail.checked
  })
}
function navigateToRegister() {
  router.push({ name: 'EnrollmentRegister' })
}
const filter = ref('')
const filterBy = ref('name')
onMounted(() => {
  loadEnrollment()
})
</script>

<template>
  <ContentLayout show-footer classes="bg-light">
    <div class="header">
      <div>
        <div class="header-info">
          <div class="text-lg">
            Filtros
          </div>
          <div class="text-sm">
            Preencha os filtros abaixo para uma mais acertiva
          </div>
        </div>
        <IonItem color="primary">
          <ion-label>{{ authStore.organization.name }}</ion-label>
          <IonIcon slot="start" :icon="businessOutline" />
        </IonItem>
        <IonItem color="tertiary">
          <IonIcon slot="start" class="cursor-pointer" :icon="menu" @click="handleMenu" />
          <ion-label>
            1º Ano
          </ion-label>
        </IonItem>
      </div>
    </div>
    <ion-card class="requests mx-0">
      <div class="text-md">
        Solicitações de matrículas ({{ 99 }}+)
      </div>
      {{ filter }}
      <IonRow>
        <IonCol size="9">
          <ion-searchbar v-model="filter" placeholder="Filtrar" />
        </IonCol>
        <IonCol size="3">
          <IonSelect :value="filterBy" label="Filtrar por" label-placement="floating"
            @ion-change="($event) => filterBy = $event.detail.value">
            <IonSelectOption value="name">
              Nome
            </IonSelectOption>
            <IonSelectOption value="age">
              Idade
            </IonSelectOption>
          </IonSelect>
        </IonCol>
      </IonRow>
      <IonRow class="checkbox-row">
        <ion-checkbox @ion-change="handleSelectAll" />
        <IonIcon slot="end" name="filter" />
      </IonRow>

      <ion-list>
        <IonItem v-for="(student, index) in students" :key="index" :color="student.selected ? 'lightaccent' : ''"
          :class="{ selected: student.selected }">
          <ion-checkbox slot="start" v-model="student.selected" :checked="student.selected"
            @ion-change="($event) => student.selected = $event.detail.checked" />
          <ion-label>
            <div class="title">
              {{ student.name }}
            </div>
            <div class="description">
              {{ student.age }} anos, sexo {{ student.gender }}
            </div>
          </ion-label>
          <div v-if="student.pcd" slot="end" class="badge">
            PCD
          </div>
        </IonItem>
      </ion-list>
    </ion-card>
    <template #footer>
      <IonRow>
        <IonCol>
          <IonButton expand="block" color="accent">
            Cancelar
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton expand="block" color="primary">
            Matrícula
          </IonButton>
        </IonCol>
      </IonRow>
    </template>
  </ContentLayout>
</template>

<style scoped lang="scss">
ion-label h2 {
  margin: 0;
  font-weight: bold;
}

ion-searchbar {
  --background: var(--ion-color-light);
}

.mx-0 {
  margin-left: 0px;
  margin-right: 0px;
}

.header {
  padding-bottom: 16px;

  ion-label {
    font-size: 14px;
  }
}

.header-info {
  color: #72428E
}

.text-lg {
  font-size: 18px;
  font-weight: 500;
}

.text-md {
  padding-left: 10px;
  padding-top: 20px;
  padding-bottom: 8px;
}

.text-sm {
  font-size: 12px;
  margin: 10px 0px;
  font-weight: 300;
}

.cursor-pointer {
  cursor: pointer;
}

.selected {
  .title {
    font-weight: 700;
    color: #D0549F
  }

  .description {
    font-weight: 500;
    color: #D0549F
  }
}

.title {
  font-size: 12px;
}

.description {
  font-size: 10px;
}

.badge {
  background: #D0549F59;
  color: #D0549F;
  font-size: 10px;
  width: 37px;
  border-radius: 8px;
  text-align: center;
  padding: 3px 0px;
}

ion-checkbox {
  --size: 10px;
  --checkbox-background-checked: #D0549F;
  --border-color-checked: #D0549F
}

.checkbox-row {
  margin: 10px 16px 2px 16px;
  border-bottom: 1px solid #72428EB2;
  padding-bottom: 8px;
}
</style>
