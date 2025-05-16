<script setup lang="ts">
import type { Student } from '@prisma/client'
import type { Tables } from '@/types/database.types'
import ListWithActionStudent from '@/components/ListWithActionStudent.vue'
import StudentDetailMobile from '@/components/StudentDetailMobile.vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonIcon, IonModal, IonPage, IonRow, IonSearchbar, IonText } from '@ionic/vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import RegisterStudentService from '../services/RegisterStudentService'
import RegisterStudentMobile from './RegisterStudentMobile.vue'
import showToast from '@/utils/toast-alert'

const router = useRouter()
const route = router.currentRoute
const registerStudentService = new RegisterStudentService()
const dataList = ref<Student[]>([])
const searchQuery = ref('')
const isModalAddStudent = ref(false)
const editingId = ref<string | undefined>(undefined)

const seeModal = ref({ modal: false, data: undefined as any })
const editModal = ref({ modal: false, data: undefined })
const deleteModal = ref<{ modal: boolean; data: Student | undefined }>({ modal: false, data: undefined })

const adaptedDataList = computed(() => {
  return dataList.value.map(item => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    address: item.address,
    birthdate: item.birthdate ? item.birthdate.toString() : undefined,
    gender: item.gender,
    status: item.status,
    // nationality: item.nationality,
    // birthCity: item.birthCity,
    // birthState: item.birthState,
    // ethnicity: item.ethnicity,
    cpf: item.cpf,
    documentType: item.docsType,
    zipCode: item.postalCode,
    city: item.city,
    state: item.citystate,
    street: item.address,
    number: item.numberAddress,
    neighborhood: item.neighborhood,
    zone: item.residenceZone,
    complement: item.complement,
    // Dados do responsável legal
    guardianName: item.guardianName,
    guardianCpf: item.guardianCpf,
    guardianPhone: item.guardianPhone,
    guardianEmail: item.guardianEmail,
    // Dados do pai
    fatherName: item.fatherName,
    fatherEmail: item.fatherEmail,
    fatherCpf: item.fatherCpf,
    fatherPhone: item.fatherPhone,
    // Dados da mãe
    motherName: item.motherName,
    motherEmail: item.motherEmail,
    motherCpf: item.motherCpf,
    motherPhone: item.motherPhone,
    // Tipo de responsável
    responsibleType: item.responsibleType,
    // Datas
    createdAt: item.createdAt ? item.createdAt.toString() : undefined,
    updatedAt: item.updatedAt ? item.updatedAt.toString() : undefined,
    deletedAt: item.deletedAt ? item.deletedAt.toString() : undefined
  }))
})

const filteredDataList = computed(() => {
  // Primeiro filtra a lista se houver uma consulta de busca
  const filtered = searchQuery.value
    ? adaptedDataList.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        || (item.email && item.email.toLowerCase().includes(searchQuery.value.toLowerCase()))
        || (item.phone && item.phone.toLowerCase().includes(searchQuery.value.toLowerCase()))
      )
    : adaptedDataList.value
  
  // Depois ordena a lista alfabeticamente pelo nome
  return filtered.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
})

function setModalAddStudent(open: boolean) {
  isModalAddStudent.value = open
  if (open) {
    isModalAddStudent.value = false
    setTimeout(() => (isModalAddStudent.value = true), 10)
  }
}

function navigateToRegister() {
  if (isMobileDevice()) {
    editingId.value = undefined
    setModalAddStudent(true)
  } else {
    router.push({ name: 'RegisterStudent' })
  }
}

function editItem(id: string) {
  if (isMobileDevice()) {
    editingId.value = id
    setEditModal(true)
  } else {
    router.push({ name: 'RegisterStudent', params: { id } })
  }
}

function setSeeModal(open: boolean) {
  if (open) {
    seeModal.value.modal = false
    setTimeout(() => (seeModal.value.modal = true), 10)
  }
  else {
    seeModal.value.modal = open
  }
}

function setEditModal(open: boolean) {
  if (open) {
    editModal.value.modal = false
    setTimeout(() => (editModal.value.modal = true), 10)
  }
  else {
    editModal.value.modal = open
  }
}

function setDeleteModal(open: boolean) {
  if (open) {
    deleteModal.value.modal = false
    setTimeout(() => (deleteModal.value.modal = true), 10)
  }
  else {
    deleteModal.value.modal = open
  }
}

async function loadStudents() {
  try {
    const students = await registerStudentService.getStudents()
    dataList.value = students || []
  }
  catch (error) {
    console.error('Erro ao carregar estudantes:', error)
  }
}

function isMobileDevice() {
  return window.innerWidth <= 768
}

async function handleDelete() {
  if (deleteModal.value?.data?.id) {
    try {
      await registerStudentService.softDeleteStudent(deleteModal.value.data.id)
      loadStudents()
      setDeleteModal(false)
    }
    catch (error: any) {
      console.error('Erro ao excluir estudante:', error)
      
      // Verifica se é o erro específico de matrículas vinculadas
      if (error.message && error.message.includes('matrículas vinculadas')) {
        showToast('Não é possível excluir: Existem matrículas vinculadas a esse estudante', 'top', 'warning')
      } else if (error.message && error.message.includes('pré-matrículas vinculadas')) {
        showToast('Não é possível excluir: Existem pré-matrículas vinculadas a esse estudante', 'top', 'warning')
      }
    }
  } else {
    console.error('ID do estudante não encontrado para exclusão:', deleteModal)
  }
}

onMounted(() => {
  loadStudents()
})

// Observar mudanças na rota para recarregar a lista quando retornar do cadastro
watch(
  () => route.value.query,
  (query) => {
    if (query.refresh) {
      loadStudents()
    }
  },
  { deep: true }
)
</script>

<template>
  <IonPage>
    <ContentLayout>
      <div class="ion-margin-top">
        <IonRow class="ion-align-items-center ion-justify-content-between">
          <IonCol size="10">
            <IonSearchbar v-model="searchQuery" placeholder="Buscar estudante" />
          </IonCol>
          <IonCol size="2" class="ion-text-end">
            <IonButton id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister()">
              <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
              <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
              <span class="ion-hide-sm-down">Novo</span>
            </IonButton>
          </IonCol>
        </IonRow>

        <ListWithActionStudent
          :data-list="filteredDataList"
          @update:delete="(event) => {
            deleteModal = event;
            setDeleteModal(true);
          }" 
          @update:edit="(event) => { 
            if (isMobileDevice()) {
              editingId = event.data?.id
              setEditModal(true)
            } else {
              router.push({ name: 'RegisterStudent', params: { id: event.data?.id } })
            }
          }" 
          @update:see="(event) => { 
            if (isMobileDevice()) {
              seeModal = event
            } else {
              router.push({ name: 'StudentDetails', params: { id: event.data?.id } })
            }
          }" 
        />

        <IonModal
          :is-open="isModalAddStudent"
          :expand-to-scroll="false"
          :initial-breakpoint="0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @ion-modal-did-dismiss="setModalAddStudent(false)"
        >
          <RegisterStudentMobile 
            @saved="loadStudents(); setModalAddStudent(false)" 
            @cancel="setModalAddStudent(false)" 
          />
        </IonModal>

        <IonModal
          :is-open="seeModal.modal"
          :expand-to-scroll="false"
          :initial-breakpoint="0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @did-dismiss="setSeeModal(false)"
        >
          <StudentDetailMobile
            :items="seeModal.data" 
            name="Detalhes do aluno" 
            @close="setSeeModal(false)" 
            @edit="() => {
              editingId = seeModal.data?.id;
              setSeeModal(false);
              setEditModal(true);
            }" 
          />
        </IonModal>

        <IonModal
          :is-open="editModal.modal"
          :expand-to-scroll="false"
          :initial-breakpoint="0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @ion-modal-did-dismiss="setEditModal(false)"
        >
          <RegisterStudentMobile 
            :edit-id="editingId"
            @saved="loadStudents(); setEditModal(false)" 
            @cancel="setEditModal(false)" 
          />
        </IonModal>

        <IonModal id="delete-modal" :is-open="deleteModal.modal" @ion-modal-did-dismiss="setDeleteModal(false)">
          <IonCard class="ion-no-margin">
            <IonCardHeader>
              <IonCardTitle>Excluir estudante</IonCardTitle>
              <IonText class="ion-padding-vertical">
                Tem certeza que deseja excluir este estudante?
              </IonText>
              <div style="display: flex;">
                <IonButton
                  size="small"
                  style="margin-left: auto; margin-right: 8px; text-transform: capitalize;"
                  color="medium"
                  @click="setDeleteModal(false)"
                >
                  Cancelar
                </IonButton>
                <IonButton
                  style="text-transform: capitalize;"
                  size="small"
                  color="danger"
                  @click="handleDelete()"
                >
                  Confirmar
                </IonButton>
              </div>
            </IonCardHeader>
          </IonCard>
        </IonModal>
      </div>
    </ContentLayout>
  </IonPage>
</template>

<style scoped>
ion-searchbar {
  --background: var(--ion-color-light);
}

ion-segment {
  --background: rgba(var(--ion-color-tertiary-rgb), 0.15);
  --color: var(--ion-color-secondary);
}

.custom-button {
  max-width: 120px;
}
#delete-modal {
  --width: 300px;
  --height: auto;
  --border-radius: 10px;
  --box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
}
</style>
