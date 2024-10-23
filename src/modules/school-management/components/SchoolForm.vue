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
const school_zone = ['Urbana', 'Rural']
const schoolId = computed(() => route.currentRoute.value.params.id) as { value: string }
const schoolService = new SchoolService()
const institutionService = new InstitutionService()
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
  email: yup
    .string()
    .nullable()
    .email('Email inválido'),
  website: yup
    .string()
    .nullable()
    .url('Deve ser uma URL válida'),
  social_network: yup
    .string()
    .nullable()
    .url('Deve ser uma URL válida'),
  address: yup
    .string()
    .required('Endereço é obrigatório'),
  city: yup
    .string()
    .required('Cidade é obrigatória'),
  school_zone: yup
    .string()
    .required('Zona da Escola é obrigatória'),
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
      institution_id: institutionId.value,
      school_zone: values.school_zone,
      email: values.email,
      website: values.website,
      social_network: values.social_network,
      name: values.name,
      phone: values.phone,
      address: values.address,
      city: values.city,
      state: values.state,
      postalcode: values.postalcode,
      logourl: values.logourl,
      abbreviation: values.abbreviation,
    }
    try {
      let result
      if (schoolId.value) {
        result = await schoolService.update(schoolId.value, formData)
        if (result) {
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
      setFieldValue('email', schoolDbData.email)
      setFieldValue('website', schoolDbData.website)
      setFieldValue('social_network', schoolDbData.social_network)
      setFieldValue('address', schoolDbData.address)
      setFieldValue('city', schoolDbData.city)
      setFieldValue('state', schoolDbData.state)
      setFieldValue('postalcode', schoolDbData.postalcode)
      setFieldValue('school_zone', schoolDbData.school_zone)
      setFieldValue('logourl', schoolDbData.logourl)
      setFieldValue('school_zone', schoolDbData.school_zone)
      setFieldValue('abbreviation', schoolDbData.abbreviation)
    }
    else {
      console.error(`Dados da escola não encontrados para o ID: ${schoolId.value}`)
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
    <EpInput v-model="values.email" name="email" label="Email" placeholder="educacao@email.com" />
    <EpInput v-model="values.website" name="website" label="Site" placeholder="escolaeducacao.com.br" />
    <EpInput v-model="values.social_network" name="social_network" label="Rede Social" placeholder="Digite o link da rede social" />
    <EpInput v-model="values.logourl" name="logourl" label="URL do Logo" placeholder="Digite a URL do logo" />
  </div>

  <div v-show="selectedSegment === 'location'">
    <EpInput v-model="values.address" name="address" label="Endereço*" placeholder="Digite o endereço" />
    <EpInput v-model="values.city" name="city" label="Cidade*" placeholder="Digite a cidade" />
    <ion-list id="school_zone">
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
    </ion-list>
    <EpInput v-model="values.state" :maxlength="2" name="state" :mask="stateMask" label="Estado*" placeholder="Digite o estado" />
    <EpInput v-model="values.postalcode" name="postalcode" :mask="postalCodeMask" inputmode="number" label="CEP*" placeholder="00000-000" />
  </div>
</template>
