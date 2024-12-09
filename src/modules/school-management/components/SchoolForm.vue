<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import EpInput from '@/components/EpInput.vue'
import { isValidDDD } from '@/utils/ddd-validator'
import showToast from '@/utils/toast-alert'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import InstitutionService from '../../institution/services/InstitutionService'
import SchoolService from '../../institution/services/SchoolService'
import School_settingsService from '../services/School_settingsService'

defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()

defineExpose({
  registerSchool,
})

const selectedSegment = ref('general-info')
const router = useRouter()
const route = useRouter()
const schoolData = ref< Tables<'school'> | []>([])
// const school_zone = ['Urbana', 'Rural']
const schoolId = computed(() => route.currentRoute.value.params.id) as { value: string }
const schoolService = new SchoolService()
const institutionService = new InstitutionService()
const school_settingsService = new School_settingsService()
const institutionId = ref('')
const institutionList = ref()
const formSchema = yup.object ({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(12, 'O nome deve ter pelo menos 12 caracteres'),
  phone: yup
    .string()
    .required('Telefone é obrigatório')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido')
    .test('valid-ddd', 'DDD inválido', value => isValidDDD(value || '')),
  // email: yup
  //   .string()
  //   .nullable()
  //   .email('Email inválido'),
  // website: yup
  //   .string()
  //   .nullable()
  //   .url('Deve ser uma URL válida'),
  // social_network: yup
  //   .string()
  //   .nullable()
  //   .url('Deve ser uma URL válida'),
  address: yup
    .string()
    .required('Endereço é obrigatório'),
  city: yup
    .string()
    .required('Cidade é obrigatória'),
  // school_zone: yup
  //   .string()
  //   .required('Zona da Escola é obrigatória'),
  state: yup
    .string()
    .max(2)
    .matches(/^[A-Z]{2}$/i, 'O campo deve conter exatamente 2 letras')
    .required('Estado é obrigatório'),
  postalcode: yup
    .string()
    .required('CEP é obrigatório')
    .matches(/^\d{5}-\d{3}$/, 'Código postal deve estar no formato 00000-000'),
  logourl: yup
    .string()
    .nullable()
    .url('Deve ser uma URL válida'),
  abbreviation: yup
    .string()
    .required('Abreviação é obrigatório')
    .max(10, 'Abreviação deve ter no máximo 10 caracteres'),
  school_days: yup
    .number()
    .transform((value, originalValue) => {
    // Verifica se o originalValue é uma string e tenta convertê-la em número
      if (typeof originalValue === 'string') {
        const trimmedValue = originalValue.trim()
        // Se a string não é vazia e pode ser convertida em um número, retorna o número
        const parsedValue = Number(trimmedValue)
        return isNaN(parsedValue) ? null : parsedValue // Se não for um número, retorna null
      }
      // Se não for uma string (como undefined, null, number), apenas retorna o valor original
      return originalValue
    })
    .required('Dias Letivos é obrigatório')
    .positive('Os dias letivos devem ser um número positivo')
    .integer('Os dias letivos devem ser um número inteiro')
    .min(1, 'Os dias letivos devem ser pelo menos 1 dia'),
  date_opening: yup.date()
    .required('Data de abertura do ano letivo é obrigatória')
    .typeError('Data de ano letivo inválida'),
  date_closing: yup.date()
    .required('Data de encerramento do ano letivo é obrigatória')
    .typeError('Data de ano letivo inválida'),
  date_start: yup.date()
    .required('Data de início do ano letivo é obrigatória')
    .typeError('Data de ano letivo inválida'),
  date_end: yup.date()
    .required('Data de término do ano letivo é obrigatória')
    .typeError('Data de ano letivo inválida'),

})

const { values, errors, validate, setFieldValue } = useForm<any>({
  validationSchema: formSchema,
})

async function registerSchool() {
  const validationResult = await validate()

  if (!validationResult.valid) {
    const displayErrors = Object.values(errors.value).join(', ')
    showToast(displayErrors, 'top', 'warning')
  }
  else {
    const formData = {
      institutionid: institutionId.value,
      // school_zone: values.school_zone,
      // email: values.email,
      // website: values.website,
      // social_network: values.social_network,
      name: values.name,
      phone: values.phone,
      address: values.address,
      city: values.city,
      state: values.state,
      postalcode: values.postalcode,
      logourl: values.logourl,
      abbreviation: values.abbreviation,
    }

    const schoolSettingsData = {
      school_days: values.school_days,
      date_opening: values.date_opening,
      date_closing: values.date_closing,
      date_start: values.date_start,
      date_end: values.date_end,
    }
    try {
      let result
      if (schoolId.value) {
        result = await schoolService.update(schoolId.value, formData)
        if (result) {
          const existingSettings = await school_settingsService.getBySchoolId(schoolId.value)

          if (existingSettings && existingSettings.length > 0) {
            await school_settingsService.updateSettings(schoolId.value, schoolSettingsData)
          }
          else {
            await school_settingsService.create({
              ...schoolSettingsData,
              school_id: schoolId.value,
              institution_id: institutionId.value,
            })
          }

          showToast('Escola atualizada com sucesso')
          setTimeout(() => {
            router.push('/Schools/list').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
      else {
        result = await schoolService.create(formData)
        if (result) {
          await school_settingsService.create({ ...schoolSettingsData, school_id: result.id, institution_id: institutionId.value })
          showToast('Escola cadastrada com sucesso!', 'top', 'success')
          setTimeout(() => {
            router.push('/Schools/list').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
    }
    catch (error) {
      console.error('Erro ao salvar escola:', error)
      showToast('Erro ao cadastrar escola. Tente novamente.', 'top', 'danger')
    }
  }
}

async function loadInstitution() {
  try {
    const institutions = await institutionService.getAll()

    if (institutions && institutions.length === 1) {
      institutionId.value = institutions[0].id
    }

    if (institutions) {
      institutionList.value = institutions.map((institution: any) => ({
        id: institution.id,
        name: institution.name,
      }))
    }
  }
  catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
}

async function getSchoolData() {
  if (schoolId.value) {
    const schoolDbData = await schoolService.getById(schoolId.value)
    if (schoolDbData) {
      institutionId.value = schoolDbData.institution_id
      setFieldValue('institutionId', schoolDbData.institution_id)
      setFieldValue('institution', schoolDbData.institution_id)
      setFieldValue('name', schoolDbData.name)
      setFieldValue('phone', schoolDbData.phone)
      // setFieldValue('email', schoolDbData.email)
      // setFieldValue('website', schoolDbData.website)
      // setFieldValue('social_network', schoolDbData.social_network)
      setFieldValue('address', schoolDbData.address)
      setFieldValue('city', schoolDbData.city)
      setFieldValue('state', schoolDbData.state)
      setFieldValue('postalcode', schoolDbData.postalcode)
      // setFieldValue('school_zone', schoolDbData.school_zone)
      setFieldValue('logourl', schoolDbData.logourl)
      // setFieldValue('school_zone', schoolDbData.school_zone)
      setFieldValue('abbreviation', schoolDbData.abbreviation)
    }
    else {
      console.error(`Dados da escola não encontrados para o ID: ${schoolId.value}`)
    }

    const schoolSettingsDataArray = await school_settingsService.getBySchoolId(schoolId.value)

    const schoolSettingsData = schoolSettingsDataArray && schoolSettingsDataArray[0]
    if (schoolSettingsData) {
      institutionId.value = schoolSettingsData.institutionid
      schoolId.value = schoolSettingsData.schoolid
      setFieldValue('institutionId', schoolSettingsData.institutionid)
      setFieldValue('institution', schoolSettingsData.institutionid)
      setFieldValue('school_days', schoolSettingsData.schooldays)
      setFieldValue('date_opening', schoolSettingsData.dateopening)
      setFieldValue('date_closing', schoolSettingsData.dateclosing)
      setFieldValue('date_start', schoolSettingsData.datestart)
      setFieldValue('date_end', schoolSettingsData.dateend)
    }
    else {
      console.error(`Dados de configurações da escola não encontrados para o ID: ${schoolId.value}`)
    }
  }
}

//* * Mask Inputs
const managerMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/, /\d/])
const stateMask = ref([/\w/, /\w/])
const abbreviationMask = ref([/\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/])
const postalCodeMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/])
const phoneMask = ref(['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/])
const areaMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/])

onMounted(async () => {
  await loadInstitution()
  /*   institutionId.value = (await institutionService.getAll())?.at(0)?.id */
  if (schoolId.value) {
    await getSchoolData()
    if (institutionId.value)
      setFieldValue('institutionId', institutionId.value)
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
    <IonSegmentButton value="school-settings">
      <IonLabel style="font-size: calc(1rem - 2px);">
        Ano Letivo
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
          :disabled="true"
          @ion-change="(e) => {
            setFieldValue('institutionId', e.detail.value)
          }"
        >
          <IonSelectOption v-for="institution in institutionList" :key="institution.id" :value="institution.id">
            {{ institution.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
    <EpInput v-model="values.name" name="name" label="Nome*" placeholder="Digite o nome da escola" />
    <EpInput v-model="values.abbreviation" name="abbreviation" :mask="abbreviationMask" label="Abreviação*" placeholder="Digite a abreviação" />
    <EpInput v-model="values.phone" name="phone" :mask="phoneMask" inputmode="tel" label="Telefone*" placeholder="(99) 99999-9999" />
    <!-- <EpInput v-model="values.email" name="email" label="Email" placeholder="educacao@email.com" /> -->
    <!-- <EpInput v-model="values.website" name="website" label="Site" placeholder="escolaeducacao.com.br" /> -->
    <!-- <EpInput v-model="values.social_network" name="social_network" label="Rede Social" placeholder="Digite o link da rede social" /> -->
    <EpInput v-model="values.logourl" name="logourl" label="URL do Logo" placeholder="Digite a URL do logo" />
  </div>

  <div v-show="selectedSegment === 'location'">
    <EpInput v-model="values.address" name="address" label="Endereço*" placeholder="Digite o endereço" />
    <EpInput v-model="values.city" name="city" label="Cidade*" placeholder="Digite a cidade" />
    <!-- <ion-list id="school_zone">
      <ion-item>
        <IonSelect
          v-model="values.school_zone"
          justify="space-between"
          label="Zona Escolar*"
          placeholder="Selecione a zona escolar"
          @ion-change="(e) => {
            setFieldValue('school_zone', e.detail.value)
          }"
        >
          <IonSelectOption v-for="school_zone in school_zone" :key="school_zone" :value="school_zone">
            {{ school_zone }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list> -->
    <EpInput v-model="values.state" :maxlength="2" name="state" :mask="stateMask" label="Estado*" placeholder="Digite o estado" />
    <EpInput v-model="values.postalcode" name="postalcode" :mask="postalCodeMask" inputmode="number" label="CEP*" placeholder="00000-000" />
  </div>

  <div v-show="selectedSegment === 'school-settings'">
    <EpInput v-model="values.school_days" name="school_days" label="Dias Letivos" placeholder="Digite os dias letivos" />
    <EpInput v-model="values.date_opening" name="date_opening" label="Data de Abertura" type="date" placeholder="Digite a data de abertura" />
    <EpInput v-model="values.date_closing" name="date_closing" label="Data de Encerramento" type="date" placeholder="Digite a data de encerramento" />
    <EpInput v-model="values.date_start" name="date_start" label="Data de Início" type="date" placeholder="Digite a data de início" />
    <EpInput v-model="values.date_end" name="date_end" label="Data de Término" type="date" placeholder="Digite a data de término" />
  </div>
</template>
