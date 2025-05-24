<script setup lang="ts">
import type { Institution } from '@prisma/client'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { IonButton, IonCol, IonGrid, IonPage, IonRow } from '@ionic/vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InstitutionService from '../../services/InstitutionService'

const route = useRoute()
const router = useRouter()
const institutionService = new InstitutionService()
const institutionDetails = ref<Institution | null>(null)
const loading = ref(true)

async function loadInstitutionDetails() {
  try {
    loading.value = true
    const id = route.params.id as string
    if (!id) {
      router.push({ name: 'DashboardInstitution' })
      return
    }

    const data = await institutionService.getInstitutionById(id)
    institutionDetails.value = data
  }
  catch (error) {
    console.error('Erro ao carregar detalhes da instituição:', error)
  }
  finally {
    loading.value = false
  }
}

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '-'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  catch (error) {
    console.error('Erro ao formatar data:', error)
    return '-'
  }
}

function navigateToEdit() {
  if (institutionDetails.value?.id) {
    router.push({ name: 'RegisterInstitution', params: { id: institutionDetails.value.id } })
  }
}

function goBack() {
  router.back()
}

onMounted(() => {
  loadInstitutionDetails()
})

watch(
  () => route.params,
  () => {
    loadInstitutionDetails()
  },
)
</script>

<template>
  <IonPage>
    <ContentLayout>
      <div v-if="loading" class="ion-text-center ion-padding">
        <p>Carregando detalhes da instituição...</p>
      </div>
      <div v-else-if="institutionDetails" class="institution-details-container">
        <h1 class="institution-title">
          {{ institutionDetails.name }}
        </h1>

        <div class="detail-section">
          <h2 class="section-title">
            Informações básicas
          </h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Nome</span>
                  <span class="detail-value">{{ institutionDetails.name || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">E-mail</span>
                  <span class="detail-value">{{ institutionDetails.email || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Telefone</span>
                  <span class="detail-value">{{ institutionDetails.phone || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">CEP</span>
                  <span class="detail-value">{{ institutionDetails.postalCode || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div class="detail-section">
          <h2 class="section-title">
            Endereço
          </h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div class="detail-item">
                  <span class="detail-label">Endereço completo</span>
                  <span class="detail-value">{{ institutionDetails.address || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Cidade</span>
                  <span class="detail-value">{{ institutionDetails.city || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Estado</span>
                  <span class="detail-value">{{ institutionDetails.state || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div class="detail-section">
          <h2 class="section-title">
            Informações do sistema
          </h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Data de criação</span>
                  <span class="detail-value">{{ formatDate(institutionDetails.createdAt) }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Última atualização</span>
                  <span class="detail-value">{{ formatDate(institutionDetails.updatedAt) }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
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
        <p>Instituição não encontrada</p>
        <IonButton color="medium" @click="goBack()">
          Voltar
        </IonButton>
      </div>
    </ContentLayout>
  </IonPage>
</template>

<style scoped>
.institution-details-container {
  padding: 16px;
  padding-bottom: 80px; /* Espaço para o footer fixo */
}

.institution-title {
  margin-bottom: 16px;
  color: var(--ion-color-secondary);
  font-size: 1.5rem;
  font-weight: 600;
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
  
  .institution-details-container {
    padding-bottom: 90px; /* Mais espaço no mobile */
  }
}
</style>
