<script setup lang="ts">
import EpInput from '@/components/EpInput.vue'
import EpTextarea from '@/components/EpTextarea.vue'
import { isValidDDD } from '@/utils/ddd-validator'
import { hundredYearsAgo } from '@/utils/hundred-years-ago'
import showToast from '@/utils/toast-alert'
import { toastController } from '@ionic/core'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as yup from 'yup'
import type { Tables } from '@/types/database.types'
import InstitutionService from '../../institution/services/InstitutionService'
import SchoolService from '../../institution/services/SchoolService'
import SeriesService from '../../institution/services/SeriesService'
import CourseService from '../services/CourseService'

defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()

defineExpose({
  registerSeries,
})

const selectedSegment = ref('general-info')
const router = useRouter()
const route = useRouter()
const seriesData = ref< Tables<'series'> | []>([])
const seriesId = computed(() => route.currentRoute.value.params.id) as { value: string }
const schoolService = new SchoolService()
const seriesService = new SeriesService()
const courseService = new CourseService()
const institutionService = new InstitutionService()
const institutionId = ref('')
const schoolId = ref('')
const institutionList = ref()
const seriesList = ref()
const courseId = ref('')
const timetable_Id = ref('')
const formSchema = yup.object ({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(12, 'O nome deve ter pelo menos 12 caracteres'),
  institution: yup
    .string(),
})

const { values, errors, validate, setFieldValue } = useForm<SeriesPartial>({
  validationSchema: formSchema,
})

async function registerSeries() {
  const validationResult = await validate()

  if (!validationResult.valid) {
    const displayErrors = Object.values(errors.value).join(', ')
    showToast(displayErrors, 'top', 'warning')
  }
  else {
    const formData = {
      school_id: schoolId.value,
      course_id: courseId.value,
      institution_id: institutionId.value,
      name: values.name,
    }
    console.log('FormData:', formData);
    try {
      let result
      if (seriesId.value) {
        result = await seriesService.update(seriesId.value, formData)
        if (result) {
          showToast('Série atualizada com sucesso')
          setTimeout(() => {
            router.push('/Series/list').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
      else {
        result = await seriesService.create(formData)
        if (result) {
          showToast('Série cadastrada com sucesso!', 'top', 'success')
          setTimeout(() => {
            router.push('/Series/list').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
    }
    catch (error) {
      console.error('Erro ao salvar série:', error)
      showToast('Erro ao cadastrar série. Tente novamente.', 'top', 'danger')
    }
  }
}

async function loadSeries() {
  try {
    const [institutions, series] = await Promise.all([
      institutionService.getAll(),
      seriesService.getAll(),
    ]);

    console.log('Chegou', institutions);

    // Função auxiliar para mapear os dados
    const mapData = (data, targetList) => {
      if (data) {
        targetList.value = data.map(item => ({
          id: item.id,
          name: item.name,
        }));
      }
    };

    mapData(institutions, institutionList);
    mapData(series, seriesList);

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}
async function getSeriesData() {
  if (seriesId.value) {
    const seriesDbData = await seriesService.getById(seriesId.value)
    if (seriesDbData) {
      setFieldValue('institutionId', seriesDbData.institutionId),
      setFieldValue('schoolId', seriesDbData.schoolId),
      setFieldValue('courseId', seriesDbData.courseId),
      setFieldValue('name', seriesDbData.name)
    }
    else {
      console.error(`Dados da série não encontrados para o ID: ${seriesId.value}`)
    }
  }
}

onMounted(async () => {
  schoolId.value = (await schoolService.getAll())?.at(0)?.id
  institutionId.value = (await institutionService.getAll())?.at(0)?.id
  courseId.value = (await courseService.getAll())?.at(0)?.id
  await loadSeries()
  if (seriesId.value) {
    await getSeriesData()
  }
})
</script>

<template>
  <IonSegment v-model="selectedSegment">
    <IonSegmentButton value="general-info">
      <IonLabel style="font-size: calc(1rem - 2px);">
        Informações Gerais
      </IonLabel>
    </IonSegmentButton>
    <IonSegmentButton value="location">
      <IonLabel style="font-size: calc(1rem - 2px);">
        Localização
      </IonLabel>
    </IonSegmentButton>
  </IonSegment>

  <div v-show="selectedSegment === 'general-info'">
    <EpInput v-model="values.name" name="name" label="Nome*" placeholder="Digite o nome da escola" />
    <ion-list id="institutionList">
      <ion-item>
        <IonSelect
          v-model="values.institution"
          justify="space-between"
          label="Instituição*"
          placeholder="Selecione a instituição"
          @ion-change="handleSchoolChange"
        >
          <IonSelectOption v-for="institution in institutionList" :key="institution.id" :value="institution.id">
            {{ institution.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
  </div>
</template>
