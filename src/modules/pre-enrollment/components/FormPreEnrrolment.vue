<script setup lang="ts">
import { IonAlert, IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonRow, IonSelect, IonSelectOption } from '@ionic/vue'
// import GedService from '@/modules/ged/services/GedService'
// import FileUpload from '@/modules/ged/components/FileUpload.vue'

// import type { Tables } from '@/types/database.types'

import { checkmarkCircleOutline } from 'ionicons/icons'
import { onMounted, ref, watch } from 'vue'
import StudentService from '../services/StudentService'

// const gedService = new GedService()
// const documentFiles = ref<Tables<'document'>[]>([])

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
// const status = ['ACTIVE', 'INACTIVE', 'GRADUATED', 'SUSPENDED', 'TRANSFERRED']
const docs = [{ title: 'RG', value: 'rg' }, { title: 'CPF', value: 'cpf' }, { title: 'Certidão de Nascimento', value: 'certidao' }]
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
const genders = ['M', 'F']
const responsibles = ['Pai', 'Mãe', 'Ambos', 'Outro']
const residenceZone = ['Urbana', 'Rural']
// const races = ['Branca', 'Preta', 'Parda', 'Amarela', 'Indígena', 'Não declarada']
// const deficiencies = ['Visual', 'Auditiva', 'Física', 'Intelectual', 'Mental', 'Múltipla', 'Outros', 'Não possui']

const student = ref(
  {
    name: undefined as string | undefined,
    birthdate: undefined as string | number | undefined,
    phone: undefined as string | number | undefined,
    email: undefined as string | undefined,
    city: undefined as string | undefined,
    citystate: undefined as string | undefined,
    address: undefined as string | undefined,
    postalCode: undefined as string | number | undefined,
    // deficiency: undefined as string | undefined,
    // ethnicity: undefined as string | undefined,
    gender: undefined as string | undefined,
    residenceZone: undefined as string | undefined,
    responsibleType: undefined as string | undefined,
    birthCertificate: undefined as string | number | undefined,
    rgNumber: undefined as string | number | undefined,
    cpf: undefined as string | number | undefined,
  },
)

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
    someProblems.value = true // eu adicionei um valor ( true ) estava sem modificação de valor
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
    adicionalRequired.value = false
  }
  else {
    emits('postStatus', { loading: false })
    incompleteStep.value = true
    adicionalRequired.value = true
  }
}

// function handleUploadSuccess(file: any) {
//   if (file && file.storage_path) {
//     gedService.create(file)
//     documentFiles.value.push(file)
//   }
// }

// async function loadDocumentFiles() {
//   documentFiles.value = await gedService.getAll() as Tables<'document'>[]
// }

function generateRandomCode(): string {
  return Math.random().toString().slice(2, 10).padStart(8, '0')
}

function nextStep() {
  if (student.value.name && student.value.birthdate) {
    return next.value = true
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
  // await loadDocumentFiles()
})
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
          <IonSelect v-model="student.gender" label="Genero de nascimento" label-placement="floating">
            <IonSelectOption v-for="gender in genders" :key="gender" :value="gender">
              {{ gender }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <!-- <IonCol size="12" size-md="6">
        <IonItem>
          <IonSelect v-model="student.ethnicity" label="Etnia" label-placement="floating">
            <IonSelectOption v-for="race in races" :key="race" :value="race">
              {{ race }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol> -->

      <!-- <IonCol size="12" size-md="6">
        <IonItem>
          <IonSelect v-model="student.deficiency" label="Necessidade especial" label-placement="floating">
            <IonSelectOption v-for="deficiency in deficiencies" :key="deficiency" :value="deficiency">
              {{ deficiency
              }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol> -->

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonSelect v-model="student.responsibleType" label="Responsável" label-placement="floating">
            <IonSelectOption v-for="r in responsibles" :key="r" :value="r">
              {{ r }}
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
            <IonSelectOption value="noite">
              Noite
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <!-- <ion-item>
      <div >
        <div class="file-upload-container">
          <FileUpload
            :bucket-name="'ged'"
            :max-file-size="960"
            @upload-success="handleUploadSuccess"
          />
        </div>
        <FilesList :files="documentFiles" />
      </div>
    </ion-item> -->

      <IonCol>
        <IonButton expand="full" color="tertiary" @click="nextStep()">
          Continuar
        </IonButton>
      </IonCol>

      <!-- <ion-col size="12" size-md="6">
        <ion-item>
          <ion-select label="Documentos Selecionados" label-placement="floating">
            <ion-select-option value="rg">RG</ion-select-option>
            <ion-select-option value="cpf">CPF</ion-select-option>
            <ion-select-option value="certidao">Certidão de Nascimento</ion-select-option>
          </ion-select>
        </ion-item>

      </ion-col> -->
    </IonRow>

    <IonRow v-else>
      <IonCol size="12" :size-md="docModel ? '6' : '12'">
        <IonItem>
          <IonSelect v-model="docModel" label="Documento Selecionado" label-placement="floating">
            <IonSelectOption v-for="doc in docs" :key="doc.value" :value="doc.value">
              {{ doc.title
              }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <IonCol v-if="docModel" size="12" size-md="6">
        <IonItem>
          <IonInput
            v-if="docModel === 'cpf'" v-model="student.cpf" type="text" label="Numero do CPF"
            label-placement="floating"
          />
          <IonInput
            v-else-if="docModel === 'rg'" v-model="student.rgNumber" type="text" label="Numero do RG"
            label-placement="floating"
          />
          <IonInput
            v-else-if="docModel === 'certidao'" v-model="student.birthCertificate" type="text"
            label="Certidão de Nascimento" label-placement="floating"
          />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput
            v-model="student.phone" v-mask="'(##) #####-####'" type="text" label="Telefone"
            label-placement="floating"
          />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput v-model="student.email" type="email" label="E-Mail" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonInput
            v-model="student.postalCode" v-mask="'#####-###'" type="text" label="CEP"
            label-placement="floating"
          />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <IonSelect v-model="student.residenceZone" label="Zona Residencial" label-placement="floating">
            <IonSelectOption v-for="zone in residenceZone" :key="zone" :value="zone">
              {{ zone }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <IonCol size="8" size-md="10">
        <IonItem>
          <IonInput v-model="student.city" label="Cidade" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="4" size-md="2">
        <IonItem>
          <IonSelect v-model="student.citystate" label="Estado" label-placement="floating">
            <IonSelectOption v-for="state in states" :key="state" :value="state">
              {{ state }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonCol>

      <IonCol size="12">
        <IonItem>
          <IonInput v-model="student.address" label="Endereço" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12">
        <IonButton expand="full" color="primary" @click="next = false">
          Voltar
        </IonButton>
        <IonButton expand="full" color="tertiary" @click="submitForm">
          Salvar
        </IonButton>
      </IonCol>
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
  <!-- <pre>
  incompleteStep: {{ incompleteStep }}
</pre> -->

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
