<script setup lang="ts">
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, IonBadge } from '@ionic/vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RegisterStudentService from '../services/RegisterStudentService'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import type { Student } from '@prisma/client'

const route = useRoute()
const router = useRouter()
const registerStudentService = new RegisterStudentService()
const studentDetails = ref<Student | null>(null)
const loading = ref(true)

async function loadStudentDetails() {
  try {
    loading.value = true
    const id = route.params.id as string
    if (!id) {
      router.push({ name: 'StudentListStudent' })
      return
    }
    
    const data = await registerStudentService.getStudentById(id)
    studentDetails.value = data
  } catch (error) {
    console.error('Erro ao carregar detalhes do aluno:', error)
  } finally {
    loading.value = false
  }
}

function navigateToEdit() {
  if (studentDetails.value?.id) {
    router.push({ name: 'RegisterStudent', params: { id: studentDetails.value.id } })
  }
}

function goBack() {
  router.back()
}

function formatDate(date: Date | null | undefined) {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-BR')
}

function getStatusLabel(status: string | null | undefined) {
  if (!status) return { text: 'Não definido', color: 'medium' }
  
  const statusMap: Record<string, { text: string, color: string }> = {
    'ACTIVE': { text: 'Ativo', color: 'success' },
    'INACTIVE': { text: 'Inativo', color: 'medium' },
    'GRADUATED': { text: 'Formado', color: 'tertiary' },
    'SUSPENDED': { text: 'Suspenso', color: 'warning' },
    'TRANSFERRED': { text: 'Transferido', color: 'primary' }
  }
  
  return statusMap[status] || { text: status, color: 'medium' }
}

onMounted(() => {
  loadStudentDetails()
})
</script>

<template>
  <IonPage>
    <ContentLayout>
      <div v-if="loading" class="ion-text-center ion-padding">
        <p>Carregando detalhes do aluno...</p>
      </div>
      <div v-else-if="studentDetails" class="student-details-container">
        <h1 class="student-title">{{ studentDetails.name }}</h1>
        
        <div class="detail-section">
          <h2 class="section-title">Informações pessoais</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Nome</span>
                  <span class="detail-value">{{ studentDetails.name || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Email</span>
                  <span class="detail-value">{{ studentDetails.email || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Telefone</span>
                  <span class="detail-value">{{ studentDetails.phone || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Status</span>
                  <div class="detail-value">
                    <IonBadge :color="getStatusLabel(studentDetails.status).color">
                      {{ getStatusLabel(studentDetails.status).text }}
                    </IonBadge>
                  </div>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Data de Nascimento</span>
                  <span class="detail-value">{{ formatDate(studentDetails.birthdate) }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Gênero</span>
                  <span class="detail-value">
                    <template v-if="studentDetails.gender">
                      {{ studentDetails.gender === 'M' ? 'Masculino' : 'Feminino' }}
                    </template>
                    <template v-else>-</template>
                  </span>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <div class="detail-item">
                  <span class="detail-label">Endereço</span>
                  <span class="detail-value description">{{ studentDetails.address || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <!-- Seção para dados acadêmicos - Se desejar expandir no futuro -->
        <div class="detail-section">
          <h2 class="section-title">Informações acadêmicas</h2>
          <p class="ion-padding-start">
            Nenhuma matrícula associada a este aluno.
          </p>
          <!-- Aqui você poderia adicionar mais detalhes sobre matrículas no futuro -->
        </div>

        <div class="fixed-footer">
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonButton color="danger" expand="full" @click="goBack()">Fechar</IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton color="secondary" expand="full" @click="navigateToEdit()">Editar</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>

      <div v-else class="ion-text-center ion-padding">
        <p>Aluno não encontrado</p>
        <IonButton color="medium" @click="goBack()">Voltar</IonButton>
      </div>
    </ContentLayout>
  </IonPage>
</template>

<style scoped>
.student-details-container {
  padding: 16px;
  padding-bottom: 80px; /* Espaço para o footer fixo */
}

.detail-section {
  margin-bottom: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: var(--ion-color-secondary);
  font-size: 1.2rem;
  margin-bottom: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.detail-item {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.9rem;
  color: var(--ion-color-secondary);
  font-weight: 500;
  margin-bottom: 4px;
}

.detail-value {
  font-size: 1rem;
}

.detail-value.description {
  white-space: pre-line;
  background-color: rgba(var(--ion-color-light-rgb), 0.5);
  padding: 12px;
  border-radius: 8px;
  min-height: 60px;
}

.student-title {
  margin-bottom: 16px;
  color: var(--ion-color-secondary);
  font-size: 1.5rem;
  font-weight: 600;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  padding: 12px 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

@media (max-width: 768px) {
  .detail-section {
    padding: 12px;
  }
  
  .student-details-container {
    padding-bottom: 90px; /* Mais espaço no mobile */
  }
}
</style>
