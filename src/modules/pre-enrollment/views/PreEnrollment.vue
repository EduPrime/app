<script setup lang="ts">
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { IonButton, IonCol, IonIcon, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/vue'
import { add } from 'ionicons/icons'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// Importar o serviço e o componente gerados
import PreEnrollment from '../components/PreEnrollment.vue'
import SchoolList from '../components/SchoolList.vue'
import PreEnrollmentService from '../services/PreEnrollmentService'

// Instanciar o serviço
const preEnrollmentService = new PreEnrollmentService()

const router = useRouter()

// Variáveis reativas
const dataList = ref([])
const searchQuery = ref('')

// Carregar dados ao montar o componente
onMounted(async () => {
  await loadData()
})

// Função para carregar os dados usando o serviço
async function loadData() {
  try {
    const data = await preEnrollmentService.getAll()
    dataList.value = data || []
    console.log('Dados carregados:', data)
  }
  catch (error) {
    console.error('Erro ao carregar os dados:', error)
  }
}

// Função para navegar para a página de registro
function navigateToRegister() {
  router.push({ name: 'RegisterPreEnrollment' })
}

// Computed para filtrar os dados com base na busca
const filteredData = computed(() => {
  if (!searchQuery.value) {
    return dataList.value
  }
  return dataList.value.filter((item: any) =>
    JSON.stringify(item).toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
</script>

<template>
  <ContentLayout>
    <IonToolbar>
      <IonTitle>Pre Enrollment ({{ filteredData.length }})</IonTitle>
    </IonToolbar>
    <IonRow class="ion-align-items-center ion-justify-content-between">
      <IonCol size="12">
        <SchoolList />
      </IonCol>
      <IonCol size="10">
        <IonSearchbar v-model="searchQuery" placeholder="Buscar" />
      </IonCol>
      <IonCol size="2" class="ion-text-end">
        <IonButton id="add-btn" expand="block" class="ion-text-uppercase" @click="navigateToRegister">
          <IonIcon slot="icon-only" :icon="add" class="ion-hide-sm-up" />
          <IonIcon slot="start" :icon="add" class="ion-hide-sm-down" />
          <span class="ion-hide-sm-down">Novo</span>
        </IonButton>
      </IonCol>
    </IonRow>
    <!-- Lista de itens utilizando o componente gerado -->
    <PreEnrollment :items="filteredData" @update:items="loadData" />
  </ContentLayout>
</template>

<style scoped>
/* Seus estilos aqui */
</style>
