<script setup lang="ts">
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ServerFunctionService from '../services/ServerFunctionService'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import type { ServerFunction } from '@prisma/client'

const route = useRoute()
const router = useRouter()
const serverFunctionService = new ServerFunctionService()
const functionDetails = ref<ServerFunction | null>(null)
const loading = ref(true)

async function loadFunctionDetails() {
  try {
    loading.value = true
    const id = route.params.id as string
    if (!id) {
      router.push({ name: 'FunctionListFunction' })
      return
    }
    
    const data = await serverFunctionService.getServerFunctionById(id)
    functionDetails.value = data
  } catch (error) {
    console.error('Erro ao carregar detalhes da função:', error)
  } finally {
    loading.value = false
  }
}

function navigateToEdit() {
  if (functionDetails.value?.id) {
    router.push({ name: 'RegisterFunction', params: { id: functionDetails.value.id } })
  }
}

function goBack() {
  router.back()
}

onMounted(() => {
  loadFunctionDetails()
})
</script>

<template>
  <IonPage>
    <ContentLayout>
      <div v-if="loading" class="ion-text-center ion-padding">
        <p>Carregando detalhes da função...</p>
      </div>
      <div v-else-if="functionDetails" class="function-details-container">
        <h1 class="function-title">{{ functionDetails.name }}</h1>
        
        <div class="detail-section">
          <h2 class="section-title">Informações básicas</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Nome</span>
                  <span class="detail-value">{{ functionDetails.name || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Abreviação</span>
                  <div class="detail-value">
                    <span v-if="functionDetails.abbreviation" class="abbreviation-tag">{{ functionDetails.abbreviation }}</span>
                    <span v-else>-</span>
                  </div>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <div class="detail-item">
                  <span class="detail-label">Descrição</span>
                  <span class="detail-value description">{{ functionDetails.description || '-' }}</span>
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
        <p>Função não encontrada</p>
        <IonButton color="medium" @click="goBack()">Voltar</IonButton>
      </div>
    </ContentLayout>
  </IonPage>
</template>

<style scoped>
.function-details-container {
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
  min-height: 100px;
}

.function-title {
  margin-bottom: 16px;
  color: var(--ion-color-secondary);
  font-size: 1.5rem;
  font-weight: 600;
}

.abbreviation-tag {
  background: rgba(var(--ion-color-secondary-rgb), 0.15);
  color: var(--ion-color-secondary);
  padding: 6px 12px;
  border-radius: 16px;
  display: inline-block;
  font-weight: 500;
  margin-top: 4px;
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
  
  .function-details-container {
    padding-bottom: 90px; /* Mais espaço no mobile */
  }
}
</style>
