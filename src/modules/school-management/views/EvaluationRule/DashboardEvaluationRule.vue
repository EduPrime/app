<script setup lang="ts">
import type { EvaluationRule } from '@prisma/client'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import showToast from '@/utils/toast-alert'
import EvaluationRuleList from '../EvaluationRule/EvaluationRuleList.vue'
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonIcon, IonModal, IonPage, IonRow, IonSearchbar, IonText, IonChip, IonItemDivider, IonLabel, IonList } from '@ionic/vue'
import { add, analytics, documentTextOutline } from 'ionicons/icons'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import EvaluationRuleService from '@/modules/school-management/services/EvaluationRuleService'
import RegisterEvaluationRuleMobile from './RegisterEvaluationRuleMobile.vue'
import EvaluationRuleDetailsMobile from './EvaluationRuleDetailsMobile.vue'

const router = useRouter()
const route = router.currentRoute
const evaluationRuleService = new EvaluationRuleService()
const dataList = ref<EvaluationRule[]>([])
const searchQuery = ref('')
const isModalAddEvaluationRule = ref(false)
const editingId = ref<string | undefined>(undefined)

const seeModal = ref({ modal: false, data: undefined as any })
const editModal = ref({ modal: false, data: undefined })
const deleteModal = ref<{ modal: boolean, data: EvaluationRule | undefined }>({ modal: false, data: undefined })

const adaptedDataList = computed(() => {
  return dataList.value.map(item => ({
    id: item.id,
    name: item.name,
    gradeType: item.gradeType,
    progressionType: item.progressionType,
    courseId: item.courseId,
    createdAt: item.createdAt ? item.createdAt.toString() : undefined,
    updatedAt: item.updatedAt ? item.updatedAt.toString() : undefined
  }))
})

const filteredDataList = computed(() => {
  const filtered = searchQuery.value
    ? adaptedDataList.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    : adaptedDataList.value

  return filtered.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
})

function setModalAddEvaluationRule(open: boolean) {
  isModalAddEvaluationRule.value = open
  if (open) {
    isModalAddEvaluationRule.value = false
    setTimeout(() => (isModalAddEvaluationRule.value = true), 10)
  }
}

function navigateToRegister() {
  if (isMobileDevice()) {
    editingId.value = undefined
    setModalAddEvaluationRule(true)
  }
  else {
    router.push({ name: 'RegisterEvaluationRule' })
  }
}

async function loadCompleteRuleDetails(ruleId: string) {
  try {
    const completeRule = await evaluationRuleService.getEvaluationRuleById(ruleId)
    if (completeRule) {
      return completeRule
    }
    return null
  } catch (error) {
    console.error('Erro ao carregar detalhes completos da regra:', error)
    return null
  }
}

async function setSeeModal(open: boolean) {
  if (open) {
    if (seeModal.value.data?.id && isMobileDevice()) {
      const completeRuleData = await loadCompleteRuleDetails(seeModal.value.data.id)
      if (completeRuleData) {
        seeModal.value.data = completeRuleData
      }
    }
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

async function loadEvaluationRules() {
  try {
    const rules = await evaluationRuleService.getEvaluationRules()
    dataList.value = rules || []
  }
  catch (error) {
    console.error('Erro ao carregar regras de avaliação:', error)
  }
}

function isMobileDevice() {
  return window.innerWidth <= 768
}

async function handleDelete() {
  if (deleteModal.value?.data?.id) {
    try {
      await evaluationRuleService.softDeleteEvaluationRule(deleteModal.value.data.id)
      loadEvaluationRules()
      setDeleteModal(false)
      showToast('Regra de Avaliação excluída com sucesso', 'top', 'success')
    }
    catch (error: any) {
      console.error('Erro ao excluir regra:', error)
      showToast('Erro ao excluir a regra de avaliação', 'top', 'danger')
    }
  }
  else {
    console.error('ID da regra não encontrado para exclusão:', deleteModal)
  }
}

onMounted(() => {
  loadEvaluationRules()
})

watch(
  () => route.value.query,
  (query) => {
    if (query.refresh) {
      loadEvaluationRules()
    }
  },
  { deep: true },
)
</script>

<template>
  <IonPage>
    <ContentLayout>
      <div class="ion-margin-top">
        <IonRow class="ion-align-items-center ion-justify-content-between">
          <IonCol size="10">
            <IonSearchbar v-model="searchQuery" placeholder="Buscar regra de avaliação" />
          </IonCol>
          <IonCol size="2" class="ion-text-end">
            <IonButton id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister()">
              <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
              <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
              <span class="ion-hide-sm-down">Novo</span>
            </IonButton>
          </IonCol>
        </IonRow>

        <EvaluationRuleList
          :data-list="filteredDataList"
          @update:delete="(event) => {
            deleteModal = event;
            setDeleteModal(true);
          }"
          @update:edit="(event) => {
            if (isMobileDevice()) {
              editingId = event.data?.id
              setEditModal(true)
            }
            else {
              router.push({ name: 'RegisterEvaluationRule', params: { id: event.data?.id } })
            }
          }"
          @update:see="async (event) => {
            if (isMobileDevice()) {
              if (event.data?.id) {
                const completeRuleData = await loadCompleteRuleDetails(event.data.id)
                if (completeRuleData) {
                  seeModal = { 
                    modal: event.modal, 
                    data: completeRuleData 
                  }
                } else {
                  seeModal = event
                }
              } else {
                seeModal = event
              }
            }
            else {
              router.push({ name: 'EvaluationRuleDetailsDesktop', params: { id: event.data?.id } })
            }
          }"
        />

        <IonModal
          :is-open="isModalAddEvaluationRule"
          :expand-to-scroll="false" 
          :initial-breakpoint="0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @ion-modal-did-dismiss="setModalAddEvaluationRule(false)"
        >
          <RegisterEvaluationRuleMobile
            :is-open="isModalAddEvaluationRule"
            @update:is-open="setModalAddEvaluationRule"
            @saved="loadEvaluationRules()"
            @cancel="setModalAddEvaluationRule(false)"
          />
        </IonModal>

        <IonModal
          :is-open="seeModal.modal"
          :expand-to-scroll="false"
          :initial-breakpoint="0.95"
          :breakpoints="[0, 0.7, 0.95, 1]" 
          @did-dismiss="setSeeModal(false)"
        >
          <EvaluationRuleDetailsMobile 
            v-if="seeModal.data"
            :items="seeModal.data"
            :name="'Detalhes da Regra de Avaliação'"
            @close="setSeeModal(false)"
            @edit="() => {
              setSeeModal(false);
              editingId = seeModal.data?.id;
              setEditModal(true);
            }"
          />
        </IonModal>

        <IonModal
          :is-open="editModal.modal"
          :expand-to-scroll="false"
          :initial-breakpoint="0.95"
          :breakpoints="[0, 0.7, 0.95, 1]"
          @did-dismiss="setEditModal(false)"
        >
          <RegisterEvaluationRuleMobile 
            :is-open="editModal.modal" 
            :editing-id="editingId" 
            @update:is-open="setEditModal" 
            @saved="loadEvaluationRules()"
            @cancel="setEditModal(false)"
          />
        </IonModal>

        <IonModal id="delete-modal" :is-open="deleteModal.modal" @did-dismiss="setDeleteModal(false)">
          <IonCard class="ion-no-margin">
            <IonCardHeader>
              <IonCardTitle>Excluir regra de avaliação</IonCardTitle>
              <IonText class="ion-padding-vertical">
                Tem certeza que deseja excluir esta regra de avaliação?
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
#delete-modal {
  --width: 300px;
  --height: auto;
  --border-radius: 10px;
  --box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
}

#delete-modal ion-card {
  margin: 0;
}

#delete-modal ion-card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.style-purple-lane {
  background: rgba(var(--ion-color-secondary-rgb), 0.15);
  color: var(--ion-color-secondary);
  padding: 10px;
  margin: 8px 2px;
  border-radius: 4px;
  font-weight: bold;
}

.abbreviation-tag {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
}
</style>
