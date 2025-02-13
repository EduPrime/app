<script setup lang="ts">
import { IonAlert, IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonRow, IonSelect, IonSelectOption } from '@ionic/vue'
import { checkmarkCircleOutline } from 'ionicons/icons'
import { onMounted, ref, watch } from 'vue'
import StudentService from '../services/StudentService'

interface Props {
  pageWidth: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'preference', 'postStatus'])

const next = ref(false)
const incompleteStep = ref(false)
const adicionalRequired = ref(false)
const duplicated = ref(false)
const finished = ref(false)

const codPreEnrollment = ref()
const shiftPreference = ref()

const result = ref()
const studentId = ref()
const someProblems = ref(false)

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
  cidade: undefined as string | undefined,
  endereco: undefined as string | undefined,
  address: undefined as string | undefined,
  CEP: undefined as string | number | undefined,
  gender: undefined as string | undefined,
  residenceZone: undefined as string | undefined,
  responsibleType: undefined as string | undefined,
  birthCertificate: undefined as string | number | undefined,
  rgNumber: undefined as string | number | undefined,
  cpf: undefined as string | number | undefined,
  foto: undefined as string | undefined,
  fone: undefined as string | number | undefined,
  disabilty: undefined as string | undefined,
  bairro: undefined as string | undefined,
  paiNome: undefined as string | undefined,
  paiCPF: undefined as string | number | undefined,
  paiFone: undefined as string | number | undefined,
  paiEmail: undefined as string | undefined,
  maeNome: undefined as string | undefined,
  maeCPF: undefined as string | number | undefined,
  maeFone: undefined as string | number | undefined,
  maeEmail: undefined as string | undefined,
  lancamentoRG: undefined as string | undefined,
  estadoRG: undefined as string | undefined,
  emissorRG: undefined as string | undefined,
  naturalidade: undefined as string | undefined,
  certificadoNascenca: undefined as string | undefined,
  guardiaoNome: undefined as string | undefined,
  guardiaoFone: undefined as string | number | undefined,
})

const postgrest = new StudentService()
const studentList = ref()

watch(result, async (value) => {
  finished.value = false

  if (value && value.status === 201) {
    studentId.value = value.data.at(0).id
    finished.value = true
  }
  else if (value && value.status === 409) {
    finished.value = false
    codPreEnrollment.value = `PRE-${generateRandomCode()}`
    if (value.error.code === '23505') {
      emits('postStatus', {
        loading: false,
      })
      duplicated.value = true
    }

    studentId.value = await postgrest.getStudentId(student.value)
  }
  else {
    someProblems.value = true
    finished.value = false
  }
})

watch(studentId, (value) => {
  if (value) {
    emits('update:modelValue', value)
  }
}, { immediate: true })

watch(shiftPreference, (value) => {
  if (value) {
    emits('preference', value)
  }
}, { immediate: true })

async function submitForm() {
  if (student.value.name && student.value.birthdate && student.value.phone && (student.value.cpf || student.value.rgNumber || student.value.birthCertificate)) {
    result.value = await postStudent(student.value)
    if (result.value && result.value.status === 201) {
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
    const data = await postgrest.insertStudent(studentObject)
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
  studentList.value = await postgrest.getStudents()
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
              {{ gender }}
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
            <IonSelectOption value="manha">
              Manhã
            </IonSelectOption>
            <IonSelectOption value="tarde">
              Tarde
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <!-- <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.foto" type="text" label="Foto" label-placement="floating" />
        </IonItem>
      </IonCol> -->

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.fone" type="text" label="Telefone" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.email" type="email" label="E-Mail" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonSelect v-model="student.disabilty" label="Deficiência" label-placement="floating">
            <IonSelectOption v-for="disabilty in disabilities" :key="disabilty" :value="disabilty">
              {{ disabilty }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.bairro" type="text" label="Bairro" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.cidade" type="text" label="Cidade" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.endereco" type="text" label="Endereço" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.CEP" type="text" label="CEP" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.cpf" type="text" label="CPF" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.paiNome" type="text" label="Nome do Pai" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.paiCPF" type="text" label="CPF do Pai" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.paiFone" type="text" label="Telefone do Pai" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.paiEmail" type="email" label="E-Mail do Pai" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.maeNome" type="text" label="Nome da Mãe" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.maeCPF" type="text" label="CPF da Mãe" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.maeFone" type="text" label="Telefone da Mãe" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.maeEmail" type="email" label="E-Mail da Mãe" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.lancamentoRG" type="text" label="Lançamento do RG" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.estadoRG" type="text" label="Estado do RG" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.emissorRG" type="text" label="Emissor do RG" label-placement="floating" />
        </IonItem>
      </IonCol>

      <!-- <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.naturalidade" type="text" label="Naturalidade" label-placement="floating" />
        </IonItem>
      </IonCol> -->

      <!-- <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.certificadoNascenca" type="text" label="Certidão de Nascimento" label-placement="floating" />
        </IonItem>
      </IonCol> -->

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.guardiaoNome" type="text" label="Nome do Guardião" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.guardiaoFone" type="text" label="Telefone do Guardião" label-placement="floating" />
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
            <p>Código de pré-matrícula: {{ codPreEnrollment }}</p>
            <div class="flex" style="min-height: 150px;">
              <IonIcon
                :icon="checkmarkCircleOutline" class="my-auto mx-auto"
                style="font-size: 130px; color:lawngreen;"
              />
            </div>
          </ion-card-content>
        </ion-card>
      </IonCol>
    </IonRow>
  </IonGrid>

  <IonAlert
    :is-open="duplicated" trigger="present-alert" header="Aluno já cadastrado"
    sub-header="Desculpe mas este aluno já foi cadastrado anteriormente."
    message="Caso deseje você pode clicar em 'atualizar' para atualizar os dados que já foram cadastrados anteriormente."
    :buttons="[{
      text: 'Atualizar cadastro',
      handler: () => {
        console.info('Função (Atualizar cadastro) ainda não implementada')
      },
    }, 'Continuar']" @did-dismiss="closeDialog()"
  />

  <IonAlert
    :is-open="someProblems" trigger="present-alert" header="Desculpe, ocorreu um erro ao salvar os dados"
    sub-header="Erro ao salvar os dados do aluno"
    message="Por favor, recarregue a página ou tente novamente mais tarde." :buttons="['Fechar']"
    @did-dismiss="someProblems = false"
  />

  <IonAlert
    :is-open="incompleteStep" trigger="present-alert" header="Preencha os campos obrigatórios para continuar"
    sub-header="Campos obrigatórios tem um asterisco (*)"
    :message="adicionalRequired ? `Preencha também Telefone e RG, CPF ou Certidão de Nascimento para efetuar a pré-matrícula` : `Os campos Nome e Data de Nascimento são obrigatórios`"
    :buttons="['Fechar']" @did-dismiss="incompleteStep = false"
  />
</template>

<style scoped>
ion-content {
  --padding-start: 16px;
  --padding-end: 16px;
}
</style>
