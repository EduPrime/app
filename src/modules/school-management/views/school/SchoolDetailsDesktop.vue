<script setup lang="ts">
import type { School } from '@prisma/client'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { IonButton, IonChip, IonCol, IonGrid, IonPage, IonRow } from '@ionic/vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SchoolService from '../../services/SchoolService'

const route = useRoute()
const router = useRouter()
const schoolService = new SchoolService()
const schoolDetails = ref<School | null>(null)
const loading = ref(true)

function getAdministrativeDependencyLabel(dependency: string | null | undefined): string {
  if (!dependency)
    return '-'

  const dependencies: Record<string, string> = {
    FEDERAL: 'Federal',
    ESTADUAL: 'Estadual',
    MUNICIPAL: 'Municipal',
    PRIVADA: 'Privada',
  }

  return dependencies[dependency] || dependency
}

function getStatusLabel(status: boolean | null | undefined): string {
  if (status === undefined || status === null)
    return '-'

  return status ? 'Em funcionamento' : 'Inativo'
}

function getStatusStyle(status: boolean | null | undefined): Record<string, string> {
  if (status === undefined || status === null)
    return {}

  if (status) {
    return {
      background: 'rgba(56, 142, 60, 0.15)',
      color: '#388E3C',
      fontWeight: 'bold',
    }
  }
  else {
    return {
      background: 'rgba(211, 47, 47, 0.15)',
      color: '#D32F2F',
      fontWeight: 'bold',
    }
  }
}

async function loadSchoolDetails() {
  try {
    loading.value = true
    const id = route.params.id as string
    if (!id) {
      router.push({ name: 'SchoolListSchool' })
      return
    }

    const data = await schoolService.getSchoolById(id)
    schoolDetails.value = data

    if (!data) {
      console.error('Escola não encontrada')
    }
  }
  catch (error) {
    console.error('Erro ao carregar detalhes da escola:', error)
  }
  finally {
    loading.value = false
  }
}

function navigateToEdit() {
  if (schoolDetails.value?.id) {
    router.push({ name: 'RegisterSchool', params: { id: schoolDetails.value.id } })
  }
}

function goBack() {
  router.back()
}

onMounted(() => {
  loadSchoolDetails()
})

watch(
  () => route.params,
  () => {
    loadSchoolDetails()
  },
)
</script>

<template>
  <IonPage>
    <ContentLayout>
      <div v-if="loading" class="ion-text-center ion-padding">
        <p>Carregando detalhes da escola...</p>
      </div>
      <div v-else-if="schoolDetails" class="school-details-container">
        <h1 class="school-title">
          {{ schoolDetails.name }}
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
                  <span class="detail-value">{{ schoolDetails.name || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Sigla</span>
                  <div class="detail-value">
                    <span v-if="schoolDetails.acronym" class="abbreviation-tag">{{ schoolDetails.acronym }}</span>
                    <span v-else>-</span>
                  </div>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Razão Social</span>
                  <span class="detail-value">{{ schoolDetails.corporateName || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">CNPJ</span>
                  <span class="detail-value">{{ schoolDetails.cnpj || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Código INEP</span>
                  <span class="detail-value">{{ schoolDetails.INEPCode || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Status</span>
                  <div class="detail-value">
                    <IonChip
                      mode="md"
                      class="ion-no-margin"
                      :style="getStatusStyle(schoolDetails.operationalStatus)"
                    >
                      {{ getStatusLabel(schoolDetails.operationalStatus) }}
                    </IonChip>
                  </div>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Dependência Administrativa</span>
                  <span class="detail-value">{{ getAdministrativeDependencyLabel(schoolDetails.administrativeDependency) }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Telefone</span>
                  <span class="detail-value">{{ schoolDetails.phone || '-' }}</span>
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
              <IonCol size="12" size-md="8">
                <div class="detail-item">
                  <span class="detail-label">Logradouro</span>
                  <span class="detail-value">{{ schoolDetails.address || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Número</span>
                  <span class="detail-value">{{ schoolDetails.addressNumber || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Complemento</span>
                  <span class="detail-value">{{ schoolDetails.additionalInfo || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Bairro</span>
                  <span class="detail-value">{{ schoolDetails.neighborhood || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Cidade</span>
                  <span class="detail-value">{{ schoolDetails.city || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Estado</span>
                  <span class="detail-value">{{ schoolDetails.state || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">CEP</span>
                  <span class="detail-value">{{ schoolDetails.postalCode || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Localização diferenciada</span>
                  <span class="detail-value">{{ schoolDetails.unusualLocation ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div class="detail-section">
          <h2 class="section-title">
            Configurações
          </h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Bloquear lançamentos no diário</span>
                  <span class="detail-value">{{ schoolDetails.blockJournalEntries ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Utiliza regras alternativas</span>
                  <span class="detail-value">{{ schoolDetails.usesAlternativeRules ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Rede de ensino</span>
                  <span class="detail-value">{{ schoolDetails.educationNetwork ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div class="fixed-footer">
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonButton color="danger" expand="full" @click="goBack()">
                  Fechar
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton color="secondary" expand="full" @click="navigateToEdit()">
                  Editar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>

      <div v-else class="ion-text-center ion-padding">
        <p>Escola não encontrada</p>
        <IonButton color="medium" @click="goBack()">
          Voltar
        </IonButton>
      </div>
    </ContentLayout>
  </IonPage>
</template>

<style scoped>
.school-details-container {
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

.school-title {
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

  .school-details-container {
    padding-bottom: 90px; /* Mais espaço no mobile */
  }
}
</style>
