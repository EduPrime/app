<script setup lang="ts">
import type { School } from '@prisma/client'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { IonButton, IonChip, IonCol, IonGrid, IonPage, IonRow, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/vue'
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SchoolService from '../../services/SchoolService'
import { home, business, construct, library, people, school } from 'ionicons/icons'

const route = useRoute()
const router = useRouter()
const schoolService = new SchoolService()
const schoolDetails = ref<School | null>(null)
const loading = ref(true)
const activeTab = ref('dadosGerais')

const tabs = [
  { id: 'dadosGerais', label: 'Dados Gerais', icon: home },
  { id: 'infraestrutura', label: 'Infraestrutura', icon: business },
  { id: 'dependencias', label: 'Dependências', icon: construct },
  { id: 'equipamentos', label: 'Equipamentos', icon: library },
  { id: 'rh', label: 'RH', icon: people },
  { id: 'dadosEnsino', label: 'Dados do Ensino', icon: school },
]

const pageTitle = computed(() => {
  return schoolDetails.value ? `Escola: ${schoolDetails.value.name}` : 'Detalhes da Escola'
})

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
      <div v-else-if="!schoolDetails" class="ion-text-center ion-padding">
        <p>Escola não encontrada</p>
        <IonButton color="medium" @click="goBack()">
          Voltar
        </IonButton>
      </div>
      <div v-else class="school-details-container">
        <div class="page-header">
          <h1 class="main-title">{{ pageTitle }}</h1>
          
          <IonToolbar class="tab-toolbar">
            <IonSegment :value="activeTab" @ionChange="ev => activeTab = ev.detail.value" class="custom-segment">
              <IonSegmentButton v-for="tab in tabs" :key="tab.id" :value="tab.id">
                <IonIcon :icon="tab.icon" />
                <IonLabel>{{ tab.label }}</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </div>

        <!-- Aba 1: Dados Gerais -->
        <div v-show="activeTab === 'dadosGerais'" class="tab-content">
          <!-- Informações Básicas -->
          <div class="detail-section">
            <h2 class="section-title">
              Informações básicas
            </h2>
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Nome</span>
                    <span class="detail-value">{{ schoolDetails?.name || '-' }}</span>
                  </div>
                </IonCol>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Sigla</span>
                    <div class="detail-value">
                      <span v-if="schoolDetails.acronym" class="abbreviation-tag">{{ schoolDetails?.acronym }}</span>
                      <span v-else>-</span>
                    </div>
                  </div>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Razão Social</span>
                    <span class="detail-value">{{ schoolDetails?.corporateName || '-' }}</span>
                  </div>
                </IonCol>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">CNPJ</span>
                    <span class="detail-value">{{ schoolDetails?.cnpj || '-' }}</span>
                  </div>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Código INEP</span>
                    <span class="detail-value">{{ schoolDetails?.INEPCode || '-' }}</span>
                  </div>
                </IonCol>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Status</span>
                    <div class="detail-value">
                      <IonChip
                        mode="md"
                        class="ion-no-margin"
                        :style="getStatusStyle(schoolDetails?.operationalStatus)"
                      >
                        {{ getStatusLabel(schoolDetails?.operationalStatus) }}
                      </IonChip>
                    </div>
                  </div>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Dependência Administrativa</span>
                    <span class="detail-value">{{ getAdministrativeDependencyLabel(schoolDetails?.administrativeDependency) }}</span>
                  </div>
                </IonCol>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Telefone</span>
                    <span class="detail-value">{{ schoolDetails?.phone || '-' }}</span>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
          
          <!-- Endereço -->
          <div class="detail-section">
            <h2 class="section-title">
              Endereço
            </h2>
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-md="8">
                  <div class="detail-item">
                    <span class="detail-label">Logradouro</span>
                    <span class="detail-value">{{ schoolDetails?.address || '-' }}</span>
                  </div>
                </IonCol>
                <IonCol size="12" size-md="4">
                  <div class="detail-item">
                    <span class="detail-label">Número</span>
                    <span class="detail-value">{{ schoolDetails?.addressNumber || '-' }}</span>
                  </div>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Complemento</span>
                    <span class="detail-value">{{ schoolDetails?.addressComplement || '-' }}</span>
                  </div>
                </IonCol>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Bairro</span>
                    <span class="detail-value">{{ schoolDetails?.neighborhood || '-' }}</span>
                  </div>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Cidade</span>
                    <span class="detail-value">{{ schoolDetails?.city || '-' }}</span>
                  </div>
                </IonCol>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Estado</span>
                    <span class="detail-value">{{ schoolDetails?.state || '-' }}</span>
                  </div>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">CEP</span>
                    <span class="detail-value">{{ schoolDetails?.postalCode || '-' }}</span>
                  </div>
                </IonCol>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Localização diferenciada</span>
                    <span class="detail-value">{{ schoolDetails?.unusualLocation ? 'Sim' : 'Não' }}</span>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          <!-- Configurações -->
          <div class="detail-section">
            <h2 class="section-title">
              Configurações
            </h2>
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Bloquear lançamentos no diário</span>
                    <span class="detail-value">{{ schoolDetails?.blockJournalEntries ? 'Sim' : 'Não' }}</span>
                  </div>
                </IonCol>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Utiliza regras alternativas</span>
                    <span class="detail-value">{{ schoolDetails?.usesAlternativeRules ? 'Sim' : 'Não' }}</span>
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" size-md="6">
                  <div class="detail-item">
                    <span class="detail-label">Rede de ensino</span>
                    <span class="detail-value">{{ schoolDetails?.educationNetwork ? 'Sim' : 'Não' }}</span>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
      </div>

      <!-- Aba 2: Infraestrutura -->
      <div v-show="activeTab === 'infraestrutura'" class="tab-content">
        <div class="detail-section">
          <h2 class="section-title">Infraestrutura</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Local de funcionamento</span>
                  <span class="detail-value">{{ 
                    schoolDetails?.operatingLocation === 'OWNED' ? 'Própria' : 
                    schoolDetails?.operatingLocation === 'RENTED' ? 'Alugada' : '-' 
                  }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Forma de ocupação do prédio</span>
                  <span class="detail-value">{{ 
                    schoolDetails?.buildingUsage === 'EXCLUSIVE' ? 'Exclusiva' : 
                    schoolDetails?.buildingUsage === 'SHARED' ? 'Compartilhada' : '-' 
                  }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Destinação do lixo</span>
                  <span class="detail-value">{{ 
                    schoolDetails?.wasteDisposal === 'INCINERATION' ? 'Incineração' :
                    schoolDetails?.wasteDisposal === 'LANDFILL' ? 'Aterro' :
                    schoolDetails?.wasteDisposal === 'COMPOSTING' ? 'Compostagem' :
                    schoolDetails?.wasteDisposal === 'RECYCLING' ? 'Reciclagem' :
                    schoolDetails?.wasteDisposal === 'OTHER' ? 'Outro' : '-'
                  }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div class="detail-section">
          <h2 class="section-title">Recursos e Funcionalidades</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Escola compartilhada</span>
                  <span class="detail-value">{{ schoolDetails?.sharedSchool ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Água potável disponível</span>
                  <span class="detail-value">{{ schoolDetails?.potableWaterAvailable ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Fonte de energia elétrica</span>
                  <span class="detail-value">{{ schoolDetails?.electricityAvailable ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Esgotamento sanitário adequado</span>
                  <span class="detail-value">{{ schoolDetails?.sewageAvailable ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Tratamento de resíduos pela escola</span>
                  <span class="detail-value">{{ schoolDetails?.wasteTreatmentBySchool ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Oferece alimentação escolar</span>
                  <span class="detail-value">{{ schoolDetails?.foodServiceAvailable ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Compartilha espaços com a comunidade</span>
                  <span class="detail-value">{{ schoolDetails?.communitySharedSpaces ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Utiliza equipamentos do entorno escolar</span>
                  <span class="detail-value">{{ schoolDetails?.usesSurroundingSpaces ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow v-if="schoolDetails?.sharedSchool && schoolDetails?.sharedSchoolINEPCode">
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Código INEP da escola compartilhada</span>
                  <span class="detail-value">{{ schoolDetails?.sharedSchoolINEPCode || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>

      <!-- Aba 3: Dependências -->
      <div v-show="activeTab === 'dependencias'" class="tab-content">
        <div class="detail-section">
          <h2 class="section-title">Dependências da Escola</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div class="detail-item">
                  <span class="detail-label">A escola possui dependências específicas</span>
                  <span class="detail-value">{{ schoolDetails?.specificFacilities ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
            </IonRow>
            
            <IonRow>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Salas de uso geral</span>
                  <span class="detail-value">{{ schoolDetails?.generalUseRooms?.join(', ') || '-' }}</span>
                </div>
              </IonCol>
              
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Laboratórios e áreas funcionais</span>
                  <span class="detail-value">{{ schoolDetails?.labsAndFunctionalAreas?.join(', ') || '-' }}</span>
                </div>
              </IonCol>
              
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Instalações de apoio</span>
                  <span class="detail-value">{{ schoolDetails?.supportFacilities?.join(', ') || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
        
        <div class="detail-section">
          <h2 class="section-title">Salas de Aula</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Salas de aula dentro do prédio</span>
                  <span class="detail-value">{{ schoolDetails?.insideClassrooms || '0' }}</span>
                </div>
              </IonCol>
              
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Salas de aula fora do prédio</span>
                  <span class="detail-value">{{ schoolDetails?.outsideClassrooms || '0' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>

      <!-- Aba 4: Equipamentos -->
      <div v-show="activeTab === 'equipamentos'" class="tab-content">
        <div class="detail-section">
          <h2 class="section-title">Recursos Tecnológicos</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Internet</span>
                  <span class="detail-value">{{ schoolDetails?.internetAvailable ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Rede local</span>
                  <span class="detail-value">{{ schoolDetails?.localNetworkAvailable ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <h3 class="subsection-title">Tipos de conexão</h3>
                  <div v-if="schoolDetails?.connectionType?.length" class="detail-list">
                    <div v-for="(type, index) in schoolDetails?.connectionType" :key="index" class="detail-list-item">
                      <IonIcon :icon="checkmarkCircleOutline" class="detail-icon" />
                      <span>{{ type }}</span>
                    </div>
                  </div>
                  <div v-else class="detail-empty">Nenhum tipo de conexão registrado</div>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <h3 class="subsection-title">Dispositivos utilizados pelos alunos</h3>
                  <div v-if="schoolDetails?.devicesUsedByStudents?.length" class="detail-list">
                    <div v-for="(device, index) in schoolDetails?.devicesUsedByStudents" :key="index" class="detail-list-item">
                      <IonIcon :icon="checkmarkCircleOutline" class="detail-icon" />
                      <span>{{ device }}</span>
                    </div>
                  </div>
                  <div v-else class="detail-empty">Nenhum dispositivo registrado</div>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Equipamentos para ensino/aprendizagem</span>
                  <span class="detail-value">{{ schoolDetails?.teachingEquipments?.join(', ') || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div class="detail-section">
          <h2 class="section-title">Quantidade de Equipamentos</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Computadores disponíveis (Desktop)</span>
                  <span class="detail-value">{{ schoolDetails?.availableDesktops || '0' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Computadores disponíveis (Notebooks)</span>
                  <span class="detail-value">{{ schoolDetails?.availableLaptops || '0' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div class="detail-item">
                  <span class="detail-label">Tablets disponíveis</span>
                  <span class="detail-value">{{ schoolDetails?.availableTablets || '0' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>

      <!-- Aba 5: RH -->
      <div v-show="activeTab === 'rh'" class="tab-content">
        <div class="detail-section">
          <h2 class="section-title">Recursos Humanos</h2>
          <p class="section-subtitle">Quantidade de profissionais por categoria</p>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Administração e suporte pedagógico</span>
                  <span class="detail-value">{{ schoolDetails?.administrationStaff || '0' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Docentes e suporte direto ao ensino</span>
                  <span class="detail-value">{{ schoolDetails?.teachingStaff || '0' }}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Serviços de apoio e segurança</span>
                  <span class="detail-value">{{ schoolDetails?.supportAndSecurityStaff || '0' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Saúde e nutrição</span>
                  <span class="detail-value">{{ schoolDetails?.healthAndNutritionStaff || '0' }}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Psicologia e assistência social</span>
                  <span class="detail-value">{{ schoolDetails?.psychologyAndSocialStaff || '0' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Gestão escolar</span>
                  <span class="detail-value">{{ schoolDetails?.schoolManagementStaff || '0' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>

      <!-- Aba 6: Dados do Ensino -->
      <div v-show="activeTab === 'dadosEnsino'" class="tab-content">
        <div class="detail-section">
          <h2 class="section-title">Dados do Ensino</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Modalidades de ensino</span>
                  <span class="detail-value">{{ schoolDetails?.cycles?.join(', ') || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Materiais pedagógicos</span>
                  <span class="detail-value">{{ schoolDetails?.materials?.join(', ') || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Órgãos colegiados</span>
                  <span class="detail-value">{{ schoolDetails?.collegiateBodyTypes?.join(', ') || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Critérios de seleção</span>
                  <span class="detail-value">{{ schoolDetails?.selectionCriteria?.join(', ') || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Línguas de instrução</span>
                  <span class="detail-value">{{ schoolDetails?.teachingLanguages?.join(', ') || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Oferece educação especializada</span>
                  <span class="detail-value">{{ schoolDetails?.hasSpecializedEducation ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Oferece educação indígena</span>
                  <span class="detail-value">{{ schoolDetails?.hasIndigenousEducation ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Projeto pedagógico atualizado</span>
                  <span class="detail-value">{{ schoolDetails?.hasPedagogicalProjectUpdated ? 'Sim' : 'Não' }}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow v-if="schoolDetails?.hasHigherEducationLink">
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Código da escola sede</span>
                  <span class="detail-value">{{ schoolDetails?.mainSchoolCode || '-' }}</span>
                </div>
              </IonCol>
              <IonCol size="12" size-md="6">
                <div class="detail-item">
                  <span class="detail-label">Código da instituição de ensino superior</span>
                  <span class="detail-value">{{ schoolDetails?.higherEducationInstitutionCode || '-' }}</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
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
  font-weight: 500;
}

.school-title {
  margin-bottom: 16px;
  color: var(--ion-color-secondary);
  font-size: 1.5rem;
  font-weight: 600;
}

.abbreviation-tag {
  display: inline-block;
  background-color: var(--ion-color-secondary-tint);
  color: var(--ion-color-secondary-contrast);
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 0.9rem;
  font-weight: 500;
}

.page-header {
  margin-bottom: 20px;
}

.main-title {
  margin-bottom: 15px;
  color: var(--ion-color-primary);
  font-size: 1.5rem;
  font-weight: 600;
}

.tab-toolbar {
  --background: transparent;
  --border-color: transparent;
  margin-bottom: 10px;
}

.custom-segment {
  --background: #f5f5f5;
  border-radius: 8px;
}

.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  padding: 10px 16px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

@media (max-width: 768px) {
  .detail-section {
    padding: 12px;
  }
  
  .school-details-container {
    padding-bottom: 100px; /* Mais espaço no mobile para o footer fixo */
  }
}
</style>
