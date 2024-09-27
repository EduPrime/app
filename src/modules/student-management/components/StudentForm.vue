<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import ClassroomService from '@/modules/school-management/services/ClassroomService'
import SchoolService from '@/modules/school-management/services/SchoolService'
import SeriesService from '@/modules/school-management/services/SeriesService'
import StudentService from '../services/StudentService'
import { hundredYearsAgo } from '@/utils/hundred-years-ago'
import { isValidDDD } from '@/utils/ddd-validator'
import { isValidCPF } from '@/utils/cpf-validator'
import EpInput from '@/components/EpInput.vue'
import EpTextarea from '@/components/EpTextarea.vue'
import showToast from '@/utils/toast-alert'
import { toastController } from '@ionic/core'
import type { Tables } from '@/types/database.types'

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
const valuesType = ref({
  father_name: '',
  father_cpf: '',
  father_email: '',
  father_phone: '',
  mother_name: '',
  mother_cpf: '',
  mother_email: '',
  mother_phone: '',
})
const schoolId = ref('')
const seriesId = ref('')
const classroomId = ref('')
const studentData = ref< Tables<'student'> | []>([])
const gender = ['Masculino', 'Feminino']
const status = ['ACTIVE', 'INACTIVE', 'GRADUATED', 'SUSPENDED', 'TRANSFERRED'];
const residence_zone = ['Urbana', 'Rural'];
const marital_status = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Separado', 'União Estável', 'Não Informado'];
const selectedSegment = ref('general-info')
// const studentList = ref<{ id: string, name: string }[]>([])
const classroomService = new ClassroomService()
const schoolService = new SchoolService()
const studentService = new StudentService()
const seriesService = new SeriesService()
const classroomList = ref()
const schoolList = ref()
const studentList = ref()
const seriesList = ref()
const studentId = computed(() => route.currentRoute.value.params.id) as { value: string }
const formSchema = yup.object({
    name: yup.string()
    .required('Nome do aluno é obrigatório'),
    father_name: yup.string()
    .nullable(),
    father_cpf: yup.string()
  .nullable()
  .test('valid-cpf', 'CPF inválido', value => {
    if (!value) return true; // Ignorar se for nulo
    return isValidCPF(value);
  }),
    father_email: yup.string()
    .nullable()
    .email('O email fornecido não é válido')
    .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        'O email deve seguir o formato padrão (exemplo@dominio.com)'
    )
    .max(255, 'O email deve ter no máximo 255 caracteres'),
    father_phone: yup.string()
    .nullable()
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone inválido, formato esperado: (XX) XXXXX-XXXX')
    .test('valid-ddd', 'DDD inválido', value => {
      if (!value) return true;
      return isValidDDD(value);
    }),
    mother_name: yup.string()
    .nullable(),
    mother_cpf: yup.string()
  .nullable()
  .test('valid-cpf', 'CPF inválido', value => {
    if (!value) return true; // Ignorar se for nulo
    return isValidCPF(value);
  }),
    mother_email: yup.string()
    .nullable()
    .email('O email fornecido não é válido')
    .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        'O email deve seguir o formato padrão (exemplo@dominio.com)'
    )
    .max(255, 'O email deve ter no máximo 255 caracteres'),
    mother_phone: yup.string()
    .nullable()
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone inválido, formato esperado: (XX) XXXXX-XXXX')
    .test('valid-ddd', 'DDD inválido', value => {
      if (!value) return true;
      return isValidDDD(value);
    }),
    cpf: yup.string()
    .required('CPF é obrigatório')
    .test('valid-cpf', 'CPF inválido', value => isValidCPF(value || '')),
    email: yup
    .string()
    .nullable()
    .email('O email fornecido não é válido')
    .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        'O email deve seguir o formato padrão (exemplo@dominio.com)'
    )
    .max(255, 'O email deve ter no máximo 255 caracteres'),
    address: yup
    .string(),
    complement: yup
    .string()
    .nullable(),
    neighborhood: yup
    .string()
    .nullable(),
    number_address: yup.
    string()
    .nullable(),
    city: yup.
    string()
    .nullable(),
    status: yup.string()
    .required('Status é obrigatório'),
  gender: yup.string()
    .required('Gênero é obrigatório'),
  marital_status: yup.string()
    .required('Estado civil é obrigatório'),
  birthdate: yup.date()
    .required('Data de nascimento é obrigatória')
    .typeError('Data de nascimento inválida'),
  phone: yup.string()
    .required('Telefone é obrigatório')
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone inválido, formato esperado: (XX) XXXXX-XXXX')
    .test('valid-ddd', 'DDD inválido', value => isValidDDD(value || '')),
  // place_of_birth: yup.string(),
  //   // .required('Naturalidade é obrigatória'),
    postalcode: yup
    .string()
    .required('CEP é obrigatório')
    .matches(/^\d{5}-\d{3}$/, 'Código postal deve estar no formato 00000-000'),
  residence_zone: yup.string()
    .required('Zona de residência é obrigatória'),
  schoolId: yup.string()
    .required('Escola é obrigatória'),
  classroomId: yup.string()
    .required('Turma é obrigatória'),
  seriesId: yup.string()
    .required('Série é obrigatória'),
    responsibleType: yup.string()
    .required('Tipo de responsável é obrigatório'),
})

const { values, errors, validate, setFieldValue } = useForm<StudentPartial>({
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
      school_id: schoolId.value,
      classroom_id: classroomId.value,
      series_id: seriesId.value,
      gender: values.gender,
      status: values.status,
      address: values.address,
      phone: values.phone,
      email: values.email,
      birthdate: values.birthdate,
      marital_status: values.marital_status,
      place_of_birth: values.place_of_birth,
      postalcode: values.postalcode,
      residence_zone: values.residence_zone,
      number_address: values.number_address,
      complement: values.complement,
      neighborhood: values.neighborhood,
      city: values.city,
      cpf: values.cpf,
      father_name: values.father_name,
      father_cpf: values.father_cpf,
      father_email: values.father_email,
      father_phone: values.father_phone,
      mother_name: values.mother_name,
      mother_cpf: values.mother_cpf,
      mother_email: values.mother_email,
      mother_phone: values.mother_phone,
      responsibleType: values.responsibleType,

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
    const [schools, classrooms, students, series] = await Promise.all([
      schoolService.getAll(),
      classroomService.getAll(),
      studentService.getAll(),
      seriesService.getAll(),
    ]);

    console.log('Chegou', students);

    // Função auxiliar para mapear os dados
    const mapData = (data, targetList) => {
      if (data) {
        targetList.value = data.map(item => ({
          id: item.id,
          name: item.name,
        }));
      }
    };

    mapData(schools, schoolList);
    mapData(classrooms, classroomList);
    mapData(students, studentList);
    mapData(series, seriesList);

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}


//* * Mask Inputs
const phoneMask = ref(['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/])
const postalCodeMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/])
const numberAddressMask = ref([/\d/, /\d/, /\d/, /\d/, /\d/])
const cpfMask = ref([/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]);


async function getStudentData() {
  if (studentId.value) {
    const studentDbData = await studentService.getById(studentId.value)
    if (studentDbData) {
        schoolId.value = studentDbData.school_id,
        classroomId.value = studentDbData.classroom_id,
        seriesId.value = studentDbData.series_id,
        setFieldValue('name', studentDbData.name),
        setFieldValue('birthdate', studentDbData.birthdate),
        setFieldValue('gender', studentDbData.gender),
        setFieldValue('email', studentDbData.email),
        setFieldValue('phone', studentDbData.phone),
        setFieldValue('address', studentDbData.address),
        setFieldValue('number_address', studentDbData.number_address),
        setFieldValue('status', studentDbData.status),
        setFieldValue('marital_status', studentDbData.marital_status),
        setFieldValue('place_of_birth', studentDbData.place_of_birth),
        setFieldValue('complement', studentDbData.complement),
        setFieldValue('neighborhood', studentDbData.neighborhood),
        setFieldValue('postalcode', studentDbData.postalcode),
        setFieldValue('residence_zone', studentDbData.residence_zone),
        setFieldValue('city', studentDbData.city),
        setFieldValue('cpf', studentDbData.cpf),
        setFieldValue('school_id', studentDbData.school_id),
        setFieldValue('schoolId', studentDbData.schoolId),
        setFieldValue('seriesId', studentDbData.seriesId),
        setFieldValue('classroom_id', studentDbData.classroom_id),
        setFieldValue('classroomId', studentDbData.classroomId),
        setFieldValue('father_name', studentDbData.father_name),
        setFieldValue('father_cpf', studentDbData.father_cpf),
        setFieldValue('father_email', studentDbData.father_email),
        setFieldValue('father_phone', studentDbData.father_phone),
        setFieldValue('mother_name', studentDbData.mother_name),
        setFieldValue('mother_cpf', studentDbData.mother_cpf),
        setFieldValue('mother_email', studentDbData.mother_email),
        setFieldValue('mother_phone', studentDbData.mother_phone),
        setFieldValue('responsibleType', studentDbData.responsibleType)
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

watch(responsibleType, (newValue, oldValue) => {
  // Se necessário, você pode limpar ou atualizar os campos
  if (newValue === 'Pai') {
    valuesType.value.mother_name = '';
    valuesType.value.mother_cpf = '';
    valuesType.value.mother_email = '';
    valuesType.value.mother_phone = '';
  } else if (newValue === 'Mãe') {
    valuesType.value.father_name = '';
    valuesType.value.father_cpf = '';
    valuesType.value.father_email = '';
    valuesType.value.father_phone = '';
  } else if (newValue === 'Ambos') {
  }
});

onMounted(async () => {
  await loadStudent()
  if (studentId.value) {
    await getStudentData()
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
        Informações de Endereço
      </IonLabel>
    </IonSegmentButton>
    <IonSegmentButton value="school-info">
      <IonLabel style="font-size: calc(1rem - 2px);">
        Informações Escolar
      </IonLabel>
    </IonSegmentButton>
  </IonSegment>
  <div v-show="selectedSegment === 'general-info'">
    <EpInput v-model="values.name" name="name" label="Nome do Aluno*" placeholder="Digite o nome do Aluno" />
    <EpInput v-model="values.cpf" name="cpf" :mask="cpfMask" inputmode="numeric" label="CPF*" placeholder="000.000.000-00" />
    <EpInput v-model="values.email" name="email" label="Email" type="email" placeholder="Digite o email" />
    <EpInput v-model="values.birthdate" name="birthdate" label="Data de Nascimento*" type="date" placeholder="Digite a data de nascimento" />
    <EpInput v-model="values.phone" name="phone" :mask="phoneMask" inputmode="tel" label="Telefone*" placeholder="(99) 99999-9999" />
    
    <ion-list id="gender">
      <ion-item>
        <IonSelect
          v-model="values.gender"
          justify="space-between"
          label="Sexo*"
          placeholder="Selecione o sexo"
          @ionChange="(e) => {
            setFieldValue('gender', e.detail.value)
          }"
          
        >
          <IonSelectOption v-for="gender in gender" :key="gender" :value="gender">
            {{ gender }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <ion-list id="marital_status">
      <ion-item>
        <IonSelect
          v-model="values.marital_status"
          justify="space-between"
          label="Estado Civil*"
          placeholder="Selecione o estado civil"
          @ionChange="(e) => {
            setFieldValue('marital_status', e.detail.value)
          }"
          
        >
          <IonSelectOption v-for="marital_status in marital_status" :key="marital_status" :value="marital_status">
            {{ marital_status }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <ion-list id="responsibleType">
      <ion-item>
        <IonSelect
          v-model="values.responsibleType"
          label="Responsável*"
          placeholder="Escolha o responsável"
          @ionChange="(e) => {
            setFieldValue('responsibleType', e.detail.value)
          }"
        >
          <IonSelectOption value="Pai">Pai</IonSelectOption>
          <IonSelectOption value="Mãe">Mãe</IonSelectOption>
          <IonSelectOption value="Ambos">Ambos</IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>

    <!-- Campos do Pai -->
    <div v-show="values.responsibleType === 'Pai' || values.responsibleType === 'Ambos'">
      <EpInput
        v-model="values.father_name"
        name="father_name"
        label="Nome do Pai"
        placeholder="Digite o nome do pai"
      />
      <EpInput
        v-model="values.father_cpf"
        name="father_cpf"
        :mask="cpfMask"
        label="CPF do Pai"
        placeholder="000.000.000-00"
        inputmode="numeric"
      />
      <EpInput
        v-model="values.father_email"
        name="father_email"
        type="email"
        label="Email do Pai"
        placeholder="Digite o email do pai"
      />
      <EpInput
        v-model="values.father_phone"
        name="father_phone"
        :mask="phoneMask"
        inputmode="tel"
        label="Telefone do Pai"
        placeholder="(99) 99999-9999"
      />
    </div>

    <!-- Campos da Mãe -->
    <div v-show="values.responsibleType === 'Mãe' || values.responsibleType === 'Ambos'">
      <EpInput
        v-model="values.mother_name"
        name="mother_name"
        label="Nome da Mãe"
        placeholder="Digite o nome da mãe"
      />
      <EpInput
        v-model="values.mother_cpf"
        name="mother_cpf"
        :mask="cpfMask"
        label="CPF da Mãe"
        placeholder="000.000.000-00"
        inputmode="numeric"
      />
      <EpInput
        v-model="values.mother_email"
        name="mother_email"
        type="email"
        label="Email da Mãe"
        placeholder="Digite o email da mãe"
      />
      <EpInput
        v-model="values.mother_phone"
        name="mother_phone"
        :mask="phoneMask"
        inputmode="tel"
        label="Telefone da Mãe"
        placeholder="(99) 99999-9999"
      />
    </div>

</div>

<div v-show="selectedSegment === 'address-info'">
    <EpInput v-model="values.postalcode" name="postalcode" :mask="postalCodeMask" inputmode="number" label="CEP*" placeholder="00000-000" />
    <EpInput v-model="values.city" name="city" label="Cidade" placeholder="Digite a cidade" />
    <EpInput v-model="values.address" name="address" label="Endereço" placeholder="Digite o endereço" />
    <EpInput v-model="values.number_address" name="number_address" :mask="numberAddressMask" label="Número" placeholder="Digite o número" />
    <EpInput v-model="values.complement" name="complement" label="Complemento" placeholder="Digite o complemento" />
    <EpInput v-model="values.neighborhood" name="neighborhood" label="Bairro" placeholder="Digite o bairro" />

    <ion-list id="residence_zone">
        <ion-item>
            <IonSelect
            v-model="values.residence_zone"
            justify="space-between"
            label="Zona de Residência*"
            placeholder="Selecione a zona de residência"
            @ionChange="(e) => {
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

<div v-show="selectedSegment === 'school-info'">

    
    <ion-list id="schoolList">
        <ion-item>
            <IonSelect
            v-model="schoolId"
            justify="space-between"
            label="Escola*"
            placeholder="Selecione a escola"
            @ionChange="(e) => {
              setFieldValue('schoolId', e.detail.value)
            }"
            
          >
            <IonSelectOption v-for="school in schoolList" :key="school.id" :value="school.id">
              {{ school.name }}
            </IonSelectOption>
          </IonSelect>
        </ion-item>
      </ion-list>
      
      <ion-list id="seriesList">
      <ion-item>
        <IonSelect
          v-model="seriesId"
          justify="space-between"
          label="Série*"
          placeholder="Selecione a série"
          @ionChange="(e) => {
            setFieldValue('seriesId', e.detail.value)
          }"
          
        >
          <IonSelectOption v-for="series in seriesList" :key="series.id" :value="series.id">
            {{ series.name }}
          </IonSelectOption>
        </IonSelect>
      </ion-item>
    </ion-list>
      
      <ion-list id="classroomList">
        <ion-item>
            <IonSelect
            v-model="classroomId"
            justify="space-between"
            label="Turma*"
            placeholder="Selecione a turma"
            @ionChange="(e) => {
              setFieldValue('classroomId', e.detail.value)
            }"
            
          >
            <IonSelectOption v-for="classroom in classroomList" :key="classroom.id" :value="classroom.id">
              {{ classroom.name }}
            </IonSelectOption>
          </IonSelect>
        </ion-item>
      </ion-list>
      
      <ion-list id="status">
        <ion-item>
          <IonSelect
            v-model="values.status"
            justify="space-between"
            label="Status da Matricula*"
            placeholder="Selecione o status"
            @ionChange="(e) => {
              setFieldValue('status', e.detail.value)
            }"
            
          >
            <IonSelectOption v-for="status in status" :key="status" :value="status">
              {{ status }}
            </IonSelectOption>
          </IonSelect>
        </ion-item>
      </ion-list>
  </div>
</template>
