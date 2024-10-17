<script setup lang="ts">
import type { Tables } from '@/types/database.types'
import EpInput from '@/components/EpInput.vue'
import FilesList from '@/modules/ged/components/FilesList.vue'
import FileUpload from '@/modules/ged/components/FileUpload.vue'
import GedService from '@/modules/ged/services/GedService'
import { isValidCPF } from '@/utils/cpf-validator'
import { isValidDDD } from '@/utils/ddd-validator'
import showToast from '@/utils/toast-alert'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import StudentService from '../services/StudentService'

defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()

defineExpose({
  registerStudent,
})

const router = useRouter()
const route = useRouter()
const responsibleType = ref(null)
const docsType = ref(null)
const documentFiles = ref<Tables<'document'>[]>([])
const gedService = new GedService()
const bucketName = 'ged'

const valuesDeficiency = ref({
  deficiency_description: '',
})

const valuesResponsibles = ref({
  father_name: '',
  father_cpf: '',
  father_email: '',
  father_phone: '',
  mother_name: '',
  mother_cpf: '',
  mother_email: '',
  mother_phone: '',
})

const valuesDocs = ref({
  rg_number: '',
  rg_state: '',
  rg_issue_date: '',
  rg_issuer: '',
  new_birth_cert_number: '',
  old_birth_cert_term: '',
  old_birth_cert_book: '',
  old_birth_cert_sheet: '',
  old_birth_cert_date_issue: '',
  old_birth_cert_state: '',

})
const studentData = ref< Tables<'student'> | []>([])
const states = [
  'AC', // Acre
  'AL', // Alagoas
  'AP', // Amapá
  'AM', // Amazonas
  'BA', // Bahia
  'CE', // Ceará
  'DF', // Distrito Federal
  'ES', // Espírito Santo
  'GO', // Goiás
  'MA', // Maranhão
  'MT', // Mato Grosso
  'MS', // Mato Grosso do Sul
  'MG', // Minas Gerais
  'PA', // Pará
  'PB', // Paraíba
  'PR', // Paraná
  'PE', // Pernambuco
  'PI', // Piauí
  'RJ', // Rio de Janeiro
  'RN', // Rio Grande do Norte
  'RS', // Rio Grande do Sul
  'RO', // Rondônia
  'RR', // Roraima
  'SC', // Santa Catarina
  'SP', // São Paulo
  'SE', // Sergipe
  'TO', // Tocantins
]
const old_birth_cert_state = [...states]
const rg_state = [...states]
const gender = ['Masculino', 'Feminino']
const status = ['ACTIVE', 'INACTIVE', 'GRADUATED', 'SUSPENDED', 'TRANSFERRED']
const residence_zone = ['Urbana', 'Rural']
const race = ['Branca', 'Preta', 'Parda', 'Amarela', 'Indígena', 'Não declarada']
const deficiency = ['Visual', 'Auditiva', 'Física', 'Intelectual', 'Mental', 'Múltipla', 'Outros', 'Não possui']
const selectedSegment = ref('general-info')
const studentService = new StudentService()
const studentList = ref()
const studentId = computed(() => route.currentRoute.value.params.id) as { value: string }
const formSchema = yup.object({
  name: yup.string()
    .required('Nome do aluno é obrigatório'),
  father_name: yup.string()
    .nullable(),
  father_cpf: yup.string()
    .nullable()
    .test('valid-cpf', 'CPF inválido', (value) => {
      if (!value)
        return true // Ignorar se for nulo
      return isValidCPF(value)
    }),
  father_email: yup.string()
    .nullable()
    .email('O email fornecido não é válido')
    .matches(
      /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
      'O email deve seguir o formato padrão (exemplo@dominio.com)',
    )
    .max(255, 'O email deve ter no máximo 255 caracteres'),
  father_phone: yup.string()
    .nullable()
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone inválido, formato esperado: (XX) XXXXX-XXXX')
    .test('valid-ddd', 'DDD inválido', (value) => {
      if (!value)
        return true
      return isValidDDD(value)
    }),
  mother_name: yup.string()
    .nullable(),
  mother_cpf: yup.string()
    .nullable()
    .test('valid-cpf', 'CPF inválido', (value) => {
      if (!value)
        return true // Ignorar se for nulo
      return isValidCPF(value)
    }),
  mother_email: yup.string()
    .nullable()
    .email('O email fornecido não é válido')
    .matches(
      /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
      'O email deve seguir o formato padrão (exemplo@dominio.com)',
    )
    .max(255, 'O email deve ter no máximo 255 caracteres'),
  mother_phone: yup.string()
    .nullable()
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone inválido, formato esperado: (XX) XXXXX-XXXX')
    .test('valid-ddd', 'DDD inválido', (value) => {
      if (!value)
        return true
      return isValidDDD(value)
    }),
  cpf: yup.string()
    .nullable()
    .test('valid-cpf', 'CPF inválido', (value) => {
      if (!value)
        return true // Ignorar se for nulo
      return isValidCPF(value)
    }),
  rg_number: yup.string()
    .nullable()
    .max(30, 'O RG deve ter no máximo 25 caracteres'),
  rg_state: yup.string()
    .nullable(),
  rg_issue_date: yup.date()
    .nullable()
    .typeError('Data de emissão inválida'),
  rg_issuer: yup.string()
    .nullable(),
  email: yup
    .string()
    .nullable()
    .email('O email fornecido não é válido')
    .matches(
      /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
      'O email deve seguir o formato padrão (exemplo@dominio.com)',
    )
    .max(255, 'O email deve ter no máximo 255 caracteres'),
  address: yup
    .string()
    .nullable(),
  complement: yup
    .string()
    .nullable(),
  neighborhood: yup
    .string()
    .nullable(),
  number_address: yup
    .string()
    .nullable(),
  city: yup
    .string()
    .nullable(),
  gender: yup.string()
    .required('Gênero é obrigatório'),
  birthdate: yup.date()
    .required('Data de nascimento é obrigatória')
    .typeError('Data de nascimento inválida'),
  phone: yup.string()
    .required('Telefone é obrigatório')
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone inválido, formato esperado: (XX) XXXXX-XXXX')
    .test('valid-ddd', 'DDD inválido', value => isValidDDD(value || '')),
  place_of_birth: yup.string()
    .required('Naturalidade é obrigatória'),
  postalcode: yup
    .string()
    .required('CEP é obrigatório')
    .matches(/^\d{5}-\d{3}$/, 'Código postal deve estar no formato 00000-000'),
  residence_zone: yup.string()
    .required('Zona de residência é obrigatória'),
  responsibleType: yup.string()
    .required('Tipo de responsável é obrigatório'),
  docsType: yup.string()
    .required('Tipo de documento é obrigatório'),
  new_birth_cert_number: yup.string()
    .nullable()
    .min(32, 'O número da matrícula deve ter no mínimo 32 caracteres')
    .max(32, 'O número da matrícula deve ter no máximo 32 caracteres'),
  old_birth_cert_term: yup.string()
    .nullable()
    .max(30, 'O termo deve ter no máximo 30 caracteres'),
  old_birth_cert_sheet: yup.string()
    .nullable()
    .max(30, 'A folha deve ter no máximo 30 caracteres'),
  old_birth_cert_date_issue: yup.string()
    .nullable(),
  old_birth_cert_book: yup.string()
    .nullable()
    .max(30, 'O livro deve ter no máximo 30 caracteres'),
  old_birth_cert_state: yup.string()
    .nullable(),
  race: yup.string()
    .nullable()
    .required('Raça é obrigatória'),
  deficiency: yup.string()
    .nullable()
    .required('Necessário informar se possui necessidades'),
  deficiency_description: yup.string()
    .nullable(),
})

const { values, errors, validate, setFieldValue } = useForm<any>({
  validationSchema: formSchema,
})

async function registerStudent() {
  const validationResult = await validate()

  if (!validationResult.valid) {
    const displayErrors = Object.values(errors.value).join(', ')
    showToast(displayErrors, 'top', 'warning')
  }
  else {
    const formData = {
      name: values.name,
      gender: values.gender,
      status: values.status,
      address: values.address,
      phone: values.phone,
      email: values.email,
      birthdate: values.birthdate,
      place_of_birth: values.place_of_birth,
      postalcode: values.postalcode,
      residence_zone: values.residence_zone,
      number_address: values.number_address,
      complement: values.complement,
      neighborhood: values.neighborhood,
      city: values.city,
      cpf: values.cpf,
      rg_number: values.rg_number,
      rg_state: values.rg_state,
      rg_issue_date: values.rg_issue_date,
      rg_issuer: values.rg_issuer,
      new_birth_cert_number: values.new_birth_cert_number,
      old_birth_cert_book: values.old_birth_cert_book,
      old_birth_cert_date_issue: values.old_birth_cert_date_issue,
      old_birth_cert_sheet: values.old_birth_cert_sheet,
      old_birth_cert_state: values.old_birth_cert_state,
      old_birth_cert_term: values.old_birth_cert_term,
      father_name: values.father_name,
      father_cpf: values.father_cpf,
      father_email: values.father_email,
      father_phone: values.father_phone,
      mother_name: values.mother_name,
      mother_cpf: values.mother_cpf,
      mother_email: values.mother_email,
      mother_phone: values.mother_phone,
      responsibleType: values.responsibleType,
      docsType: values.docsType,
      race: values.race,
      deficiency: values.deficiency,
      deficiency_description: values.deficiency_description,

    }
    try {
      let result
      if (studentId.value) {
        result = await studentService.update(studentId.value, formData)
        if (result) {
          showToast('Aluno atualizado com sucesso')
          setTimeout(() => {
            router.push('/Student/').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
      else {
        result = await studentService.create(formData)
        if (result) {
          showToast('Aluno cadastrado com sucesso!', 'top', 'success')
          setTimeout(() => {
            router.push('/Student/').then(() => {
              location.reload()
            })
          }, 2000)
        }
      }
    }
    catch (error) {
      console.error('Erro ao salvar aluno(a):', error)
      showToast('Erro ao cadastrar aluno(a). Tente novamente.', 'top', 'danger')
    }
  }
}

async function loadStudent() {
  try {
    const [students] = await Promise.all([
      studentService.getAll(),
    ])

    console.log('Chegou', students)

    // Função auxiliar para mapear os dados
    const mapData = (data: any[], targetList: any) => {
      if (data) {
        targetList.value = data.map(item => ({
          id: item.id,
          name: item.name,
        }))
      }
    }

    if (students) {
      mapData(students, studentList)
    }
  }
  catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
}

//* * Mask Inputs
const phoneMask = ref(['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/])
const postalCodeMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/])
const cpfMask = ref([/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/])

async function getStudentData() {
  if (studentId.value) {
    const studentDbData = await studentService.getById(studentId.value)
    if (studentDbData) {
      setFieldValue('name', studentDbData.name)
      setFieldValue('birthdate', studentDbData.birthdate)
      setFieldValue('gender', studentDbData.gender)
      setFieldValue('email', studentDbData.email)
      setFieldValue('phone', studentDbData.phone)
      setFieldValue('address', studentDbData.address)
      setFieldValue('number_address', studentDbData.number_address)
      setFieldValue('status', studentDbData.status)
      setFieldValue('place_of_birth', studentDbData.place_of_birth)
      setFieldValue('complement', studentDbData.complement)
      setFieldValue('neighborhood', studentDbData.neighborhood)
      setFieldValue('postalcode', studentDbData.postalcode)
      setFieldValue('residence_zone', studentDbData.residence_zone)
      setFieldValue('city', studentDbData.city)
      setFieldValue('cpf', studentDbData.cpf)
      setFieldValue('father_name', studentDbData.father_name)
      setFieldValue('father_cpf', studentDbData.father_cpf)
      setFieldValue('father_email', studentDbData.father_email)
      setFieldValue('father_phone', studentDbData.father_phone)
      setFieldValue('mother_name', studentDbData.mother_name)
      setFieldValue('mother_cpf', studentDbData.mother_cpf)
      setFieldValue('mother_email', studentDbData.mother_email)
      setFieldValue('mother_phone', studentDbData.mother_phone)
      setFieldValue('responsibleType', studentDbData.responsibleType)
      setFieldValue('docsType', studentDbData.docsType)
      setFieldValue('old_birth_cert_book', studentDbData.old_birth_cert_book)
      setFieldValue('old_birth_cert_sheet', studentDbData.old_birth_cert_sheet)
      setFieldValue('old_birth_cert_term', studentDbData.old_birth_cert_term)
      setFieldValue('old_birth_cert_date_issue', studentDbData.old_birth_cert_date_issue)
      setFieldValue('old_birth_cert_state', studentDbData.old_birth_cert_state)
      setFieldValue('new_birth_cert_number', studentDbData.new_birth_cert_number)
      setFieldValue('rg_number', studentDbData.rg_number)
      setFieldValue('rg_state', studentDbData.rg_state)
      setFieldValue('rg_issue_date', studentDbData.rg_issue_date)
      setFieldValue('rg_issuer', studentDbData.rg_issuer)
      setFieldValue('race', studentDbData.race)
      setFieldValue('deficiency', studentDbData.deficiency)
      setFieldValue('deficiency_description', studentDbData.deficiency_description)
    }
    else {
      console.error(`Dados do aluno não encontrados para o ID: ${studentId.value}`)
    }
  }
}
function applyPhoneMask(phone: string | null): string {
  if (!phone)
    return ''
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

function handleUploadSuccess(file: any) {
  if (file && file.storage_path) {
    gedService.create(file)
    documentFiles.value.push(file)
  }
}

async function loadDocumentFiles() {
  documentFiles.value = await gedService.getAll() as Tables<'document'>[]
}
watch(responsibleType, (newValue, oldValue) => {
  // Se necessário, você pode limpar ou atualizar os campos
  if (newValue === 'Pai') {
    valuesResponsibles.value.mother_name = ''
    valuesResponsibles.value.mother_cpf = ''
    valuesResponsibles.value.mother_email = ''
    valuesResponsibles.value.mother_phone = ''
  }
  else if (newValue === 'Mãe') {
    valuesResponsibles.value.father_name = ''
    valuesResponsibles.value.father_cpf = ''
    valuesResponsibles.value.father_email = ''
    valuesResponsibles.value.father_phone = ''
  }
  else if (newValue === 'Ambos') {
  }
})

watch(docsType, (newValue, oldValue) => {
  // Se necessário, você pode limpar ou atualizar os campos
  if (newValue === 'RG') {
    valuesDocs.value.rg_number = ''
    valuesDocs.value.rg_state = ''
    valuesDocs.value.rg_issue_date = ''
    valuesDocs.value.rg_issuer = ''
  }
  else if (newValue === 'Certidão de Nascimento (Novo Formato)') {
    valuesDocs.value.new_birth_cert_number = ''
  }
  else if (newValue === 'Certidão de Nascimento (Antigo Formato)') {
    valuesDocs.value.old_birth_cert_book = ''
    valuesDocs.value.old_birth_cert_sheet = ''
    valuesDocs.value.old_birth_cert_term = ''
    valuesDocs.value.old_birth_cert_date_issue = ''
    valuesDocs.value.old_birth_cert_state = ''
  }
})

watch(() => values.deficiency, (newValue) => {
  if (newValue === 'Outros') {
    valuesDeficiency.value.deficiency_description = ''
  }
})

onMounted(async () => {
  await loadStudent()
  if (studentId.value) {
    await getStudentData()
    await loadDocumentFiles()
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
    <IonSegmentButton value="address-info">
      <IonLabel style="font-size: calc(1rem - 2px);">
        Endereço
      </IonLabel>
    </IonSegmentButton>
    <IonSegmentButton value="docs-info">
      <IonLabel style="font-size: calc(1rem - 2px);">
        Documentos
      </IonLabel>
    </IonSegmentButton>
  </IonSegment>
  <div v-show="selectedSegment === 'general-info'">
    <EpInput v-model="values.name" name="name" label="Nome do Aluno*" placeholder="Digite o nome do Aluno" />
    <EpInput v-model="values.email" name="email" label="Email" type="email" placeholder="Digite o email" />
    <EpInput v-model="values.birthdate" name="birthdate" label="Data de Nascimento*" type="date" placeholder="Digite a data de nascimento" />
    <EpInput v-model="values.phone" name="phone" :mask="phoneMask" inputmode="tel" label="Telefone*" placeholder="(99) 99999-9999" />

    <ion-list id="gender">
      <ion-item>
        <IonSelect
          v-model="values.gender"
          justify="space-between"
          label="Gênero*"
          placeholder="Selecione o gênero"
          @ion-change="(e) => {
            setFieldValue('gender', e.detail.value)
          }"
        >
          <IonSelectOption v-for="gender in gender" :key="gender" :value="gender">
            {{ gender }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <ion-list id="race">
      <ion-item>
        <IonSelect
          v-model="values.race"
          justify="space-between"
          label="Raça*"
          placeholder="Selecione a raça"
          @ion-change="(e) => {
            setFieldValue('race', e.detail.value)
          }"
        >
          <IonSelectOption v-for="race in race" :key="race" :value="race">
            {{ race }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <ion-list id="deficiency">
      <ion-item>
        <IonSelect
          v-model="values.deficiency"
          justify="space-between"
          label="Necessidade Especial*"
          placeholder="Selecione a necessidade"
          @ion-change="(e) => {
            setFieldValue('deficiency', e.detail.value)
          }"
        >
          <IonSelectOption v-for="deficiency in deficiency" :key="deficiency" :value="deficiency">
            {{ deficiency }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <!-- Outras deficiências -->
    <div v-show="values.deficiency === 'Outros'">
      <EpInput
        v-model="values.deficiency_description"
        name="deficiency_description"
        label="Descrição da Necessidade"
        placeholder="Digite a descrição da necessidade"
      />
    </div>

    <ion-list id="responsibleType">
      <ion-item>
        <IonSelect
          v-model="values.responsibleType"
          label="Responsável*"
          placeholder="Escolha o responsável"
          @ion-change="(e) => {
            setFieldValue('responsibleType', e.detail.value)
          }"
        >
          <IonSelectOption value="Pai">
            Pai
          </IonSelectOption>
          <IonSelectOption value="Mãe">
            Mãe
          </IonSelectOption>
          <IonSelectOption value="Ambos">
            Ambos
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <!-- Campos do Pai -->
    <div v-show="values.responsibleType === 'Pai' && values.responsibleType !== 'Ambos'">
      <EpInput
        v-model="values.father_name"
        name="father_name"
        label="Nome"
        placeholder="Digite o nome do pai"
      />
      <EpInput
        v-model="values.father_cpf"
        name="father_cpf"
        :mask="cpfMask"
        label="CPF"
        placeholder="000.000.000-00"
        inputmode="numeric"
      />
      <EpInput
        v-model="values.father_email"
        name="father_email"
        type="email"
        label="Email"
        placeholder="Digite o email do pai"
      />
      <EpInput
        v-model="values.father_phone"
        name="father_phone"
        :mask="phoneMask"
        inputmode="tel"
        label="Telefone"
        placeholder="(99) 99999-9999"
      />
    </div>

    <!-- Campos da Mãe -->
    <div v-show="values.responsibleType === 'Mãe' && values.responsibleType !== 'Ambos'">
      <EpInput
        v-model="values.mother_name"
        name="mother_name"
        label="Nome"
        placeholder="Digite o nome da mãe"
      />
      <EpInput
        v-model="values.mother_cpf"
        name="mother_cpf"
        :mask="cpfMask"
        label="CPF"
        placeholder="000.000.000-00"
        inputmode="numeric"
      />
      <EpInput
        v-model="values.mother_email"
        name="mother_email"
        type="email"
        label="Email"
        placeholder="Digite o email da mãe"
      />
      <EpInput
        v-model="values.mother_phone"
        name="mother_phone"
        :mask="phoneMask"
        inputmode="tel"
        label="Telefone"
        placeholder="(99) 99999-9999"
      />
    </div>
    <!-- Container flex para Pai e Mãe quando "Ambos" for selecionado -->
    <div v-show="values.responsibleType === 'Ambos'" class="responsible-container">
      <!-- Campos do Pai -->
      <ion-item>
        <div class="responsible-section">
          <h3>Pai</h3>
          <EpInput
            v-model="values.father_name"
            name="father_name"
            label="Nome"
            placeholder="Digite o nome do pai"
          />
          <EpInput
            v-model="values.father_cpf"
            name="father_cpf"
            :mask="cpfMask"
            label="CPF"
            placeholder="000.000.000-00"
            inputmode="numeric"
          />
          <EpInput
            v-model="values.father_email"
            name="father_email"
            type="email"
            label="Email"
            placeholder="Digite o email do pai"
          />
          <EpInput
            v-model="values.father_phone"
            name="father_phone"
            :mask="phoneMask"
            inputmode="tel"
            label="Telefone"
            placeholder="(99) 99999-9999"
          />
        </div>
      </ion-item>

      <!-- Separador visual -->
      <div class="separator" />

      <!-- Campos da Mãe -->
      <div class="responsible-section">
        <h3>Mãe</h3>
        <EpInput
          v-model="values.mother_name"
          name="mother_name"
          label="Nome"
          placeholder="Digite o nome da mãe"
        />
        <EpInput
          v-model="values.mother_cpf"
          name="mother_cpf"
          :mask="cpfMask"
          label="CPF"
          placeholder="000.000.000-00"
          inputmode="numeric"
        />
        <EpInput
          v-model="values.mother_email"
          name="mother_email"
          type="email"
          label="Email"
          placeholder="Digite o email da mãe"
        />
        <EpInput
          v-model="values.mother_phone"
          name="mother_phone"
          :mask="phoneMask"
          inputmode="tel"
          label="Telefone"
          placeholder="(99) 99999-9999"
        />
      </div>
    </div>
  </div>

  <div v-show="selectedSegment === 'address-info'">
    <EpInput v-model="values.postalcode" name="postalcode" :mask="postalCodeMask" inputmode="number" label="CEP*" placeholder="00000-000" />
    <EpInput v-model="values.city" name="city" label="Cidade" placeholder="Ex: São Paulo, Rio de Janeiro" />
    <EpInput v-model="values.place_of_birth" name="place_of_birth" label="Naturalidade*" placeholder="Digite o local de nascimento" />
    <EpInput v-model="values.address" name="address" label="Endereço" placeholder="Digite o nome da rua ou avenida" />
    <EpInput v-model="values.number_address" name="number_address" label="Número" placeholder="Digite o número da residência" />
    <EpInput v-model="values.complement" name="complement" label="Complemento" placeholder="Apartamento, bloco, etc." />
    <EpInput v-model="values.neighborhood" name="neighborhood" label="Bairro" placeholder="Digite o bairro" />

    <ion-list id="residence_zone">
      <ion-item>
        <IonSelect
          v-model="values.residence_zone"
          justify="space-between"
          label="Zona de Residência*"
          placeholder="Selecione a zona de residência"
          @ion-change="(e) => {
            setFieldValue('residence_zone', e.detail.value)
          }"
        >
          <IonSelectOption v-for="residence_zone in residence_zone" :key="residence_zone" :value="residence_zone">
            {{ residence_zone }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
  </div>

  <div v-show="selectedSegment === 'docs-info'" class="upload-container">
    <ion-list id="docsType">
      <ion-item>
        <IonSelect
          v-model="values.docsType"
          label="Documentos*"
          placeholder="Escolha o documento"
          @ion-change="(e) => {
            setFieldValue('docsType', e.detail.value)
          }"
        >
          <IonSelectOption value="RG">
            RG
          </IonSelectOption>
          <IonSelectOption value="CPF">
            CPF
          </IonSelectOption>
          <IonSelectOption value="Certidão de Nascimento (Novo Formato)">
            Certidão de Nascimento (Novo Formato)
          </IonSelectOption>
          <IonSelectOption value="Certidão de Nascimento (Antigo Formato)">
            Certidão de Nascimento (Antigo Formato)
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <!-- Campos do RG -->
    <div v-show="values.docsType === 'RG'">
      <EpInput
        v-model="values.rg_number"
        name="rg_number"
        label="RG"
        placeholder="Digite o número do RG"
      />
      <ion-list id="rg_state">
        <ion-item>
          <IonSelect
            v-model="values.rg_state"
            justify="space-between"
            label="Estado de Emissão"
            placeholder="Selecione o estado"
            @ion-change="(e) => {
              setFieldValue('rg_state', e.detail.value)
            }"
          >
            <IonSelectOption v-for="rg_state in rg_state" :key="rg_state" :value="rg_state">
              {{ rg_state }}
            </IonSelectOption>
          </IonSelect>
        </ion-item>
      </ion-list>
      <EpInput v-model="values.rg_issue_date" name="rg_issue_date" label="Data de Emissão" type="date" placeholder="Selecione a data de emissão" />
      <EpInput
        v-model="values.rg_issuer"
        name="rg_issuer"
        label="Órgão Emissor"
        placeholder="Digite o órgão emissor"
      />
    </div>

    <!-- Campos de CPF -->
    <div v-show="values.docsType === 'CPF'">
      <EpInput v-model="values.cpf" name="cpf" :mask="cpfMask" inputmode="numeric" label="CPF" placeholder="000.000.000-00" />
    </div>

    <!-- Campos da Certidão de Nascimento (Novo Formato) -->
    <div v-show="values.docsType === 'Certidão de Nascimento (Novo Formato)'">
      <EpInput
        v-model="values.new_birth_cert_number"
        name="new_birth_cert_number"
        label="Matrícula"
        placeholder="Digite a Matrícula da Certidão"
      />
    </div>

    <!-- Campos da Certidão de Nascimento (Antigo Formato) -->
    <div v-show="values.docsType === 'Certidão de Nascimento (Antigo Formato)'">
      <EpInput
        v-model="values.old_birth_cert_term"
        name="old_birth_cert_term"
        label="Termo"
        placeholder="Digite o número do termo da certidão"
      />
      <EpInput
        v-model="values.old_birth_cert_book"
        name="old_birth_cert_book"
        label="Livro"
        placeholder="Informe o número do livro do registro"
      />
      <EpInput
        v-model="values.old_birth_cert_sheet"
        name="old_birth_cert_sheet"
        label="Folha"
        placeholder="Indique a folha do livro onde está o registro"
      />
      <ion-list id="old_birth_cert_state">
        <ion-item>
          <IonSelect
            v-model="values.old_birth_cert_state"
            justify="space-between"
            label="Estado de Emissão"
            placeholder="Selecione o estado onde a certidão foi emitida"
            @ion-change="(e) => {
              setFieldValue('old_birth_cert_state', e.detail.value)
            }"
          >
            <IonSelectOption v-for="old_birth_cert_state in old_birth_cert_state" :key="old_birth_cert_state" :value="old_birth_cert_state">
              {{ old_birth_cert_state }}
            </IonSelectOption>
          </IonSelect>
        </ion-item>
      </ion-list>
      <EpInput v-model="values.old_birth_cert_date_issue" name="old_birth_cert_date_issue" label="Data de Emissão" type="date" placeholder="Selecione a data de emissão da certidão" />
    </div>
    <ion-item>
      <div v-if="values.docsType">
        <div class="file-upload-container">
          <FileUpload
            :bucket-name="bucketName"
            :max-file-size="500"
            @upload-success="handleUploadSuccess"
          />
        </div>
        <FilesList :files="documentFiles" />
      </div>
    </ion-item>
  </div>
</template>

<style lang="css">
.responsible-container {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Espaço entre Pai e Mãe */
}

.responsible-section {
  flex: 1;
  min-width: 45%; /* Garante que cada coluna ocupe 45% do espaço */
}

.separator {
  width: 2px;
  background-color: #ccc;
  height: 100%; /* Altura total da seção para atuar como divisória visual */
}

.file-upload-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 8px; /* Diminui o espaço superior */
}

.file-upload-container .uppy-Dashboard {
  width: 100%;
  max-width: 300px; /* Largura reduzida */
  height: 180px; /* Altura mínima reduzida */
  padding: 0; /* Remove preenchimento extra */
}

.file-upload-container .uppy-Dashboard-inner {
  height: 100px; /* Reduz a altura da área interna */
  padding: 4px; /* Diminui o preenchimento para deixar compacto */
}

.file-upload-container .uppy-Dashboard-tabs {
  display: none; /* Remove as abas desnecessárias */
}

.file-upload-container .uppy-Dashboard-dropFilesHereHint {
  display: none; /* Remove o texto de "arrastar arquivos" */
}

.file-upload-container .uppy-DashboardStatusBar {
  height: 18px; /* Reduz ainda mais a barra de status */
  font-size: 10px; /* Fonte menor para a barra de status */
  display: flex;
  justify-content: flex-start;
}

.upload-container ion-item {
  width: 100%;
  margin-bottom: 8px; /* Reduz a margem inferior */
}

.upload-container ion-select {
  width: 100%;
}

.upload-container .file-list-container {
  margin-top: 8px; /* Reduz o espaço acima da lista de arquivos */
}
</style>
