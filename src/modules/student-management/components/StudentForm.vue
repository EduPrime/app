<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import ClassroomService from '@/modules/school-management/services/ClassroomService'
import SchoolService from '@/modules/school-management/services/SchoolService'
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
const schoolId = ref('')
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
const classroomList = ref()
const schoolList = ref()
const studentList = ref()
const studentId = computed(() => route.currentRoute.value.params.id) as { value: string }
const formSchema = yup.object({
  name: yup.string()
    .required('Nome da turma é obrigatório'),
    cpf: yup.string()
    .required('CPF é obrigatório')
    .test('valid-cpf', 'CPF inválido', value => isValidCPF(value || '')),
    email: yup
    .string()
    .email('Email inválido'),
    address: yup
    .string(),
    complement: yup
    .string(),
    neighborhood: yup
    .string(),
    number_address: yup.
    string(),
    city: yup.
    string(),
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
  place_of_birth: yup.string(),
    // .required('Naturalidade é obrigatória'),
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
    const [schools, classrooms, students] = await Promise.all([
      schoolService.getAll(),
      classroomService.getAll(),
      studentService.getAll(),
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
        setFieldValue('classroom_id', studentDbData.classroom_id),
        setFieldValue('classroomId', studentDbData.classroomId)
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
    <EpInput v-model="values.email" name="email" label="Email*" type="email" placeholder="Digite o email" />
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
