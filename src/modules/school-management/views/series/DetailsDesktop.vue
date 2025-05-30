<script setup lang="ts">
// import type { ServerFunction } from '@prisma/client'

import ContentLayout from '@/components/theme/ContentLayout.vue'
import { IonButton, IonCard, IonCol, IonGrid, IonPage, IonRow } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SeriesService from '../../services/SeriesService'

const route = useRoute()
const router = useRouter()
const seriesService = new SeriesService()
const seriesDetails = ref()
const loading = ref(true)

const disciplines = ref()

// const tenantId = ref()

async function loadDetails() {
  try {
    loading.value = true
    const id = route.params.id as string
    if (!id) {
      router.push({ name: 'RegisterSerie' })
      return
    }
    // series:seriesId(id, name)
    seriesDetails.value = await seriesService.getById(id, '*, course:courseId (name), institution:institutionId (name), school:schoolId (name)')
    disciplines.value = await seriesService.getDisciplinesOfSeries(id)
  }
  catch (error) {
    console.error('Erro ao carregar detalhes do curso:', error)
  }
  finally {
    loading.value = false
  }
}

function navigateToEdit() {
  if (seriesDetails.value?.id) {
    router.push({ name: 'RegisterSerie', params: { id: seriesDetails.value.id } })
  }
}

function goBack() {
  router.back()
}

onMounted(() => {
  loadDetails()
})
</script>

<template>
  <IonPage>
    <ContentLayout>
      <div v-if="loading" class="ion-text-center ion-padding">
        <p>Carregando detalhes do curso...</p>
      </div>
      <div v-else-if="seriesDetails" class="details-container">
        <h1 class="item-title">
          {{ seriesDetails?.name }}
        </h1>

        <div class="detail-section">
          <h2 class="section-title">
            Informações básicas
          </h2>
          <IonGrid>
            <IonRow>
              <IonCol v-if="seriesDetails && seriesDetails?.institution" size="12" size-md="12">
                <div class="detail-item">
                  <span class="detail-label">Instituição</span>
                  <span class="detail-value">{{ seriesDetails.institution?.name || '-' }}</span>
                </div>
              </IonCol>
              <!-- <IonCol v-if="seriesDetails && seriesDetails?.school" size="12" size-md="12">
                <div class="detail-item">
                  <span class="detail-label">Escola</span>
                  <span class="detail-value">{{ seriesDetails.school?.name || '-' }}</span>
                </div>
              </IonCol> -->

              <IonCol size="12" size-md="12">
                <div class="detail-item">
                  <span class="detail-label">Nome</span>
                  <span class="detail-value">{{ seriesDetails?.name || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="12">
                <h2 class="section-title">
                  Informações administrativas
                </h2>
              </IonCol>

              <IonCol v-if="seriesDetails?.course" size="12" size-md="12">
                <div class="detail-item">
                  <span class="detail-label">Curso</span>
                  <span class="detail-value">{{ seriesDetails.course?.name || '-' }}</span>
                </div>
              </IonCol>

              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Dias letivos</span>
                  <span class="detail-value">{{ seriesDetails?.schoolDays || '-' }}</span>
                </div>
              </IonCol>

              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Carga horária</span>
                  <span class="detail-value">{{ seriesDetails.workload ? `${seriesDetails.workload} Horas` : '-' }}</span>
                </div>
              </IonCol>

              <IonCol size="12" size-md="12" class="ion-no-padding ion-no-margin">
                <div v-if="disciplines && disciplines.length > 0" class="shadow-card" style=" align-items: center;">
                  <IonCard class=" ion-no-margin ">
                    <IonGrid>
                      <IonRow>
                        <IonCol size="6">
                          <IonText color="primary" style="font-weight: bold; font-size: 10pt">
                            Disciplina
                          </IonText>
                        </IonCol>
                        <IonCol size="6">
                          <IonText color="primary" style="font-weight: bold; font-size: 10pt">
                            Carga Horária
                          </IonText>
                        </IonCol>
                      </IonRow>
                      <IonRow v-for="(d, index) in disciplines" :key="index">
                        <IonCol size="6">
                          <IonText color="primary" style="font-size: 10pt; padding-top: 2px;">
                            {{ d.discipline.name }}
                          </IonText>
                        </IonCol>
                        <IonCol size="6">
                          <IonText color="primary" style="font-size: 10pt; padding-top: 2px;">
                            {{ d.workload || '-' }}
                          </IonText>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCard>
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
        <p>Curso não encontrada</p>
        <IonButton color="medium" @click="goBack()">
          Voltar
        </IonButton>
      </div>
    </ContentLayout>
  </IonPage>
</template>

<style scoped>
.details-container {
  padding: 16px;
  padding-bottom: 80px;
  /* Espaço para o footer fixo */
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

.item-title {
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

  .details-container {
    padding-bottom: 90px;
    /* Mais espaço no mobile */
  }
}
</style>
