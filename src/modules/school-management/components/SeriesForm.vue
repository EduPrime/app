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
const course_stage = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4', 'Etapa 5', 'Etapa 6'];
const graduate = ['Sim', 'Não'];
const institutionId = ref('')
const schoolId = ref('')
const institutionList = ref()
const seriesList = ref()
const serieId = ref('')
const courseList = ref()
const courseId = ref('')
const timetable_Id = ref('')
const formSchema = yup.object ({
  name: yup
    .string()
    .required('Nome é obrigatório'),
  institutionId: yup.string()
    .required('Instituição é obrigatória'),
  courseId: yup.string()
    .required('Curso é obrigatório'),
  course_stage: yup
    .string()
    .required('Etapa Curso é obrigatório'),
  graduate: yup
    .string()
    .required('Concluinte é obrigatório'),
  workload: yup
  .number()
  .transform((value, originalValue) => {
    // Verifica se o originalValue é uma string e tenta convertê-la em número
    if (typeof originalValue === 'string') {
      const trimmedValue = originalValue.trim();
      // Se a string não é vazia e pode ser convertida em um número, retorna o número
      const parsedValue = Number(trimmedValue);
      return isNaN(parsedValue) ? null : parsedValue; // Se não for um número, retorna null
    }
    // Se não for uma string (como undefined, null, number), apenas retorna o valor original
    return originalValue;
  })
  .required('Carga Horária é obrigatória')
  .positive('A carga horária deve ser um número positivo')
  .integer('A carga horária deve ser um número inteiro')
  .min(1, 'A carga horária deve ser pelo menos 1 hora'),
  school_days: yup
  .number()
  .transform((value, originalValue) => {
    // Verifica se o originalValue é uma string e tenta convertê-la em número
    if (typeof originalValue === 'string') {
      const trimmedValue = originalValue.trim();
      // Se a string não é vazia e pode ser convertida em um número, retorna o número
      const parsedValue = Number(trimmedValue);
      return isNaN(parsedValue) ? null : parsedValue; // Se não for um número, retorna null
    }
    // Se não for uma string (como undefined, null, number), apenas retorna o valor original
    return originalValue;
  })
  .required('Dias Letivos é obrigatório')
  .positive('Os dias letivos devem ser um número positivo')
  .integer('Os dias letivos devem ser um número inteiro')
  .min(1, 'Os dias letivos devem ser pelo menos 1 dia'),
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
      course_stage: values.course_stage,
      graduate: values.graduate,
      name: values.name,
      workload: values.workload,
      school_days: values.school_days,
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
    const [institutions, series, courses] = await Promise.all([
      institutionService.getAll(),
      seriesService.getAll(),
      courseService.getAll(),
    ]);

    console.log('Chegou', institutions, series, courses);

    // Função auxiliar para mapear os dados
    const mapData = (data, targetList) => {
      if (data) {
        targetList.value = data.map(item => ({
          id: item.id,
          name: item.name,
          course_stage: item.course_stage,
          graduate: item.graduate,
          workload: item.workload,
          school_days: item.school_days,
        }));
      }
    };

    mapData(institutions, institutionList);
    mapData(series, seriesList);
    mapData(courses, courseList);

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}
async function getSeriesData() {
  if (seriesId.value) {
    const seriesDbData = await seriesService.getById(seriesId.value)
    if (seriesDbData) {
      institutionId.value = seriesDbData.institution_id,
      courseId.value = seriesDbData.course_id,
      schoolId.value = seriesDbData.school_id,
      setFieldValue('institutionId', seriesDbData.institutionId),
      setFieldValue('schoolId', seriesDbData.schoolId),
      setFieldValue('courseId', seriesDbData.courseId),
      setFieldValue('institution', seriesDbData.institution_id),
      setFieldValue('course', seriesDbData.course_id),
      setFieldValue('name', seriesDbData.name),
      setFieldValue('course_stage', seriesDbData.course_stage),
      setFieldValue('graduate', seriesDbData.graduate),
      setFieldValue('workload', seriesDbData.workload),
      setFieldValue('school_days', seriesDbData.school_days)
    }
    else {
      console.error(`Dados da série não encontrados para o ID: ${seriesId.value}`)
    }
  }
}

onMounted(async () => {
  schoolId.value = (await schoolService.getAll())?.at(0)?.id
  await loadSeries()
  if (seriesId.value) {
    await getSeriesData()
    if (institutionId.value) setFieldValue('institutionId', institutionId.value)
    if (courseId.value) setFieldValue('courseId', courseId.value)
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
  </IonSegment>

  <div v-show="selectedSegment === 'general-info'">
    <ion-list id="institutionList">
      <ion-item>
        <IonSelect
          v-model="institutionId"
          justify="space-between"
          label="Instituição*"
          placeholder="Selecione a instituição"
          @ionChange="(e) => {
            setFieldValue('institutionId', e.detail.value)
          }"
          >
          <IonSelectOption v-for="institution in institutionList" :key="institution.id" :value="institution.id">
            {{ institution.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
    
    <ion-list id="courseList">
      <ion-item>
        <IonSelect
          v-model="courseId"
          justify="space-between"
          label="Curso*"
          placeholder="Selecione o curso"
          @ionChange="(e) => {
            setFieldValue('courseId', e.detail.value)
          }"
          
        >
          <IonSelectOption v-for="course in courseList" :key="course.id" :value="course.id">
            {{ course.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
    
    <EpInput v-model="values.name" name="name" label="Nome*" placeholder="Digite o nome da série" />
    
    <ion-list id="course_stage">
      <ion-item>
        <IonSelect
          v-model="values.course_stage"
          justify="space-between"
          label="Etapa Curso*"
          placeholder="Selecione"
          @ionChange="(e) => setFieldValue('course_stage', e.target.value)"
        >
          <IonSelectOption v-for="course_stage in course_stage" :key="course_stage" :value="course_stage">
            {{ course_stage }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <ion-list id="graduate">
      <ion-item>
        <IonSelect
          v-model="values.graduate"
          justify="space-between"
          label="Concluinte*"
          placeholder="Selecione"
          @ionChange="(e) => setFieldValue('graduate', e.target.value)"
        >
          <IonSelectOption v-for="graduate in graduate" :key="graduate" :value="graduate">
            {{ graduate }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <EpInput v-model="values.workload" name="workload" label="Carga Horária*" placeholder="Digite a carga horária" />
    <EpInput v-model="values.school_days" name="school_days" label="Dias Letivos*" placeholder="Digite os dias letivos" />
  </div>
</template>
