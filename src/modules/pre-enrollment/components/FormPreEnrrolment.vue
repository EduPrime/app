<script setup lang="ts">
import { IonAlert, IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonRow, IonSelect, IonSelectOption } from '@ionic/vue'
import { checkmarkCircleOutline } from 'ionicons/icons'
import { onMounted, ref, watch } from 'vue'
import StudentService from '../services/StudentService'
import PreEnrollmentService from '../services/PreEnrollmentService'

interface Props {
  pageWidth: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'preference', 'postStatus', 'studentId'])

const next = ref(false)
const incompleteStep = ref(false)
const adicionalRequired = ref(false)
const duplicated = ref(false)
const finished = ref(false)

const shiftPreference = ref()
const preenrollmentcode = ref(`PRE-${generateRandomCode()}`)

const fileName = ref('')
const result = ref()
const studentId = ref()
const someProblems = ref(false)

const studentService = new StudentService()
const preenrollmentService = new PreEnrollmentService()
const studentList = ref()

const docModel = ref('')
const docs = [{ title: 'RG', value: 'rg' }, { title: 'CPF', value: 'cpf' }, { title: 'Certidão de Nascimento', value: 'certidao' }]
const states = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]
const genders = ['M', 'F']
const responsibles = ['Pai', 'Mãe', 'Ambos', 'Outro']
const residenceZone = ['Urbana', 'Rural']

const student = ref({
  name: undefined as string | undefined,
  birthdate: undefined as string | number | undefined,
  phone: undefined as string | number | undefined,
  email: undefined as string | undefined,
  city: undefined as string | undefined,
  address: undefined as string | undefined,
  postalCode: undefined as string | number | undefined,
  gender: undefined as string | undefined,
  residenceZone: undefined as string | undefined,
  responsibleType: undefined as string | undefined,
  birthCertificate: undefined as string | number | undefined,
  rgNumber: undefined as string | number | undefined,
  cpf: undefined as string | number | undefined,
  photo: undefined as Uint8Array | undefined,
  disability: undefined as string | undefined,
  neighborhood: undefined as string | undefined,
  fatherName: undefined as string | undefined,
  fatherCpf: undefined as string | number | undefined,
  fatherPhone: undefined as string | number | undefined,
  fatherEmail: undefined as string | undefined,
  motherName: undefined as string | undefined,
  motherCpf: undefined as string | number | undefined,
  motherPhone: undefined as string | number | undefined,
  motherEmail: undefined as string | undefined,
  rgIssuer: undefined as string | undefined,
  rgState: undefined as string | undefined,
  rgIssueDate: undefined as string | undefined,
  placeOfBirth: undefined as string | undefined,
  guardianName: undefined as string | undefined,
  guardianPhone: undefined as string | number | undefined,
  guardianCpf: undefined as string | number | undefined,
  guardianEmail: undefined as string | undefined,

})





watch(result, async (value) => {
  finished.value = false

  if (value && value.status === 201) {
    console.log('value.data', value.data)
    studentId.value = value.data.at(0).id
    finished.value = true
  }
  else if (value && value.status === 409) {
    finished.value = false
    preenrollmentcode.value = `PRE-${generateRandomCode()}`
    if (value.error.code === '23505') {
      emits('postStatus', {
        loading: false,
      })
      duplicated.value = true
    }

    studentId.value = await studentService.getStudentId(student.value)
  }
  else {
    someProblems.value = true
    finished.value = false
  }
})

watch(studentId, (value) => {
  if (value) {
    console.log('studentId.value', value)
    emits('studentId', value)
  }
}, { immediate: true })

watch(shiftPreference, (value) => {
  if (value) {
    console.log('shiftPreference.value', value)
    emits('preference', value)
  }
}, { immediate: true })

async function submitForm() {
  console.log('student.value', student.value)
  if (student.value.name && student.value.birthdate && student.value.phone && (student.value.cpf || student.value.rgNumber || student.value.birthCertificate)) {
    result.value = await postStudent(student.value)
    if (result.value && result.value.status === 201) {
      emits('studentId', result.value.data.at(0).id)
      emits('postStatus', { loading: true })
    }
    next.value = true
    adicionalRequired.value = false
  }
  else {
    emits('postStatus', { loading: false })
    incompleteStep.value = true
    adicionalRequired.value = true
  }
}

function generateRandomCode(): string {
  return Math.random().toString().slice(2, 10).padStart(8, '0')
}

function nextStep() {
  if (student.value.name && student.value.birthdate) {
    // return next.value = true
    submitForm()
  }
  else {
    incompleteStep.value = true
  }
}

async function postStudent(studentObject: any) {
  try {
    const data = await studentService.insertStudent(studentObject)
    return data
  }
  catch (error) {
    console.error(error)
  }
}

function closeDialog() {
  duplicated.value = false
  return emits('postStatus', {
    loading: true,
  })
}

onMounted(async () => {
  studentList.value = await studentService.getStudents()
})
const disabilities = [
  'TRANSTORNO_DO_ESPECTRO_AUTISTA',
  'TRANSTORNO_DESINTEGRATIVO_DA_INFANCIA_PSICOSE_INFANTIL',
  'TDAH',
  'SINDROME_DE_RETT',
  'SINDROME_DE_ASPERGER',
  'SURDOCEGUEIRA',
  'SURDEZ',
  'DEFICIENCIA_MULTIPLA',
  'DEFICIENCIA_MENTAL',
  'DEFICIENCIA_INTELECTUAL',
  'DEFICIENCIA_FISICA',
  'DEFICIENCIA_AUDITIVA',
  'CEGUEIRA',
  'BAIXA_VISAO',
  'AUTISMO_CLASSICO',
  'ALTAS_HABILIDADES_SUPERDOTACAO',
]
const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  // Converter a imagem para ArrayBuffer
  const arrayBuffer = await file.arrayBuffer()
  student.value.photo = new Uint8Array(arrayBuffer)
  fileName.value = file.name
}

</script>

<template>
  <IonGrid v-if="!finished" :class="Number(props.pageWidth) > 960 ? '' : 'ion-padding-horizontal'">
    <IonRow v-if="!next">
      <IonCol size="12">
        <IonItem>
          <IonInput v-model="student.name" type="text" label="Nome Completo*" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonSelect v-model="student.gender" label="Sexo" label-placement="floating">
            <IonSelectOption v-for="gender in genders" :key="gender" :value="gender">
              {{ gender === 'M' ? 'Masculino' : 'Feminino' }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.birthdate" type="date" label="Data de nascimento*" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonSelect v-model="shiftPreference" label="Preferência de turno" label-placement="floating">
            <IonSelectOption value="MORNING">
              Manhã
            </IonSelectOption>
            <IonSelectOption value="AFTERNOON">
              Tarde
            </IonSelectOption>
            <IonSelectOption value="EVENING">
              Noite
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <label for="upPhoto">{{ fileName || "Foto 📷 " }}</label>
          <input id="upPhoto" @change="handleFileChange" type="file" accept="image/*" hidden />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.phone" type="text" label="Telefone" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.email" type="email" label="E-Mail" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.neighborhood" type="text" label="Bairro" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.city" type="text" label="Cidade" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.address" type="text" label="Endereço" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.postalCode" type="text" label="CEP" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.cpf" type="text" label="CPF" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonSelect v-model="student.responsibleType" label="Responsável" label-placement="floating">
            <IonSelectOption value="MÃE">
              Mãe
            </IonSelectOption>
            <IonSelectOption value="PAI">
              Pai
            </IonSelectOption>
            <IonSelectOption value="AMBOS">
              Ambos
            </IonSelectOption>
            <IonSelectOption value="OUTRO">
              Guardião
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'PAI' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <IonInput v-model="student.fatherName" type="text" label="Nome do Pai" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'PAI' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <IonInput v-model="student.fatherCpf" type="text" label="CPF do Pai" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'PAI' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <IonInput v-model="student.fatherPhone" type="text" label="Telefone do Pai" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'PAI' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <IonInput v-model="student.fatherEmail" type="email" label="E-Mail do Pai" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'MÃE' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <IonInput v-model="student.motherName" type="text" label="Nome da Mãe" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'MÃE' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <IonInput v-model="student.motherCpf" type="text" label="CPF da Mãe" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'MÃE' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <IonInput v-model="student.motherPhone" type="text" label="Telefone da Mãe" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'MÃE' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <IonInput v-model="student.motherEmail" type="email" label="E-Mail da Mãe" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'OUTRO'">
        <IonItem>
          <IonInput v-model="student.guardianName" type="text" label="Nome do Guardião" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'OUTRO'">
        <IonItem>
          <IonInput v-model="student.guardianPhone" type="text" label="Telefone do Guardião"
            label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'OUTRO'">
        <IonItem>
          <IonInput v-model="student.guardianCpf" type="text" label="CPF do Guardião" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'OUTRO'">
        <IonItem>
          <IonInput v-model="student.guardianEmail" type="text" label="Email do Guardião" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonSelect v-model="student.residenceZone" label="Zona de Residência" label-placement="floating">
            <IonSelectOption v-for="zone in residenceZone" :key="zone" :value="zone.toUpperCase()">
              {{ zone }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonSelect v-model="student.disability" label="Deficiência" label-placement="floating">
            <IonSelectOption v-for="disability in disabilities" :key="disability" :value="disability">
              {{ disability.toLowerCase().replaceAll('_', ' ') }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.rgNumber" type="text" label="RG" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.rgIssueDate" type="date" label="Lançamento do RG" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonSelect v-model="student.rgState" label="Estado do RG" label-placement="floating">
            <IonSelectOption v-for="state in states" :key="state" :value="state">
              {{ state }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.rgIssuer" type="text" label="Emissor do RG" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonSelect v-model="student.placeOfBirth" label="Naturalidade" label-placement="floating">
            <IonSelectOption v-for="state in states" :key="state" :value="state">
              {{ state }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.birthCertificate" type="text" label="Certidão de Nascimento"
            label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol>
        <IonButton expand="full" color="tertiary" @click="nextStep()">
          Continuar
        </IonButton>
      </IonCol>
    </IonRow>

    <IonRow v-else>
      <!-- Second step fields here -->
    </IonRow>
  </IonGrid>

  <IonGrid v-else :class="Number(props.pageWidth) > 960 ? '' : 'ion-padding-horizontal'">
    <IonRow>
      <IonCol size="12">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Pré-Matrícula realizada com sucesso</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Os dados do aluno foram salvos com sucesso.</p>
            <div class="flex" style="min-height: 150px;">
              <IonIcon :icon="checkmarkCircleOutline" class="my-auto mx-auto"
                style="font-size: 130px; color:lawngreen;" />
            </div>
          </ion-card-content>
        </ion-card>
      </IonCol>
    </IonRow>
  </IonGrid>

  <IonAlert :is-open="duplicated" trigger="present-alert" header="Aluno já cadastrado"
    sub-header="Desculpe mas este aluno já foi cadastrado anteriormente."
    message="Caso deseje você pode clicar em 'atualizar' para atualizar os dados que já foram cadastrados anteriormente."
    :buttons="[{
      text: 'Atualizar cadastro',
      handler: () => {
        console.info('Função (Atualizar cadastro) ainda não implementada')
      },
    }, 'Continuar']" @did-dismiss="closeDialog()" />

  <IonAlert :is-open="someProblems" trigger="present-alert" header="Desculpe, ocorreu um erro ao salvar os dados"
    sub-header="Erro ao salvar os dados do aluno"
    message="Por favor, recarregue a página ou tente novamente mais tarde." :buttons="['Fechar']"
    @did-dismiss="someProblems = false" />

  <IonAlert :is-open="incompleteStep" trigger="present-alert" header="Preencha os campos obrigatórios para continuar"
    sub-header="Campos obrigatórios tem um asterisco (*)"
    :message="adicionalRequired ? `Preencha também Telefone e RG, CPF ou Certidão de Nascimento para efetuar a pré-matrícula` : `Os campos Nome e Data de Nascimento são obrigatórios`"
    :buttons="['Fechar']" @did-dismiss="incompleteStep = false" />
</template>

<style scoped>
ion-content {
  --padding-start: 16px;
  --padding-end: 16px;
}
</style>
