<script setup lang="ts">
import { ref } from 'vue'
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue'
import { useForm } from 'vee-validate'
import { date, object, string } from 'yup'
import { hundredYearsAgo } from '@/utils/hundred-years-ago'
import { isValidDDD } from '@/utils/ddd-validator'
import EpInput from '@/components/EpInput.vue'
import EpTextarea from '@/components/EpTextarea.vue'
import EpJson from '@/components/EpJson.vue'
import type { Tables } from '@/types/database.types'
import showToast from '@/utils/toast-alert'

type TeacherPartial = Omit<Pick<Tables<'teacher'>, 'name' | 'birthdate' | 'email' | 'phone' | 'address' | 'specializations'>, 'birthdate'> & {
  birthdate: Date // Redefinindo o campo birthdate para ser do tipo Date
}

const formSchema = object({
  name: string().required('Nome é obrigatório')
    .min(12, 'O nome deve ter pelo menos 12 caracteres'),
  birthdate: date().required('Data de nascimento é obrigatória')
    .typeError('Data de nascimento inválida')
    .min(hundredYearsAgo(), 'A pessoa não pode ter mais de 100 anos'),
  email: string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: string()
    .required('Telefone é obrigatório')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido')
    .test('valid-ddd', 'DDD inválido', value => isValidDDD(value || '')),
  address: string().optional(),
  specializations: string().optional(),
})

const { values, errors, validate } = useForm<TeacherPartial>({
  validationSchema: formSchema,
})

const selectedSegment = ref('general-info')
const specializations = ref<string[]>([])
function handleEntriesUpdate(updatedEntries: never[]) {
  specializations.value = updatedEntries
}
async function registerTeacher() {
  const validationResult = await validate()

  if (!validationResult.valid) {
    const displayErrors = Object.values(errors.value).join(', ')
    showToast(displayErrors, 'top', 'warning')
  }
  else {
    const formData = {
      name: values.name,
      birthdate: values.birthdate,
      email: values.email,
      phone: values.phone,
      address: values.address,
      specializations: specializations.value,
    }
    console.log('Valores do formulário:', formData)
    showToast('Professor cadastrado com sucesso!')
  }
}

//* * Mask Inputs
const phoneMask = ref(['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/])
</script>

<template>
  <content-layout :show-footer="true">
    <template #header-buttons>
      <ion-buttons slot="start">
        <ion-back-button default-href="/" />
      </ion-buttons>
    </template>
    <template #description>
      Todos os campos são obrigatórios, a menos que indicado de outra forma.
    </template>
    <ion-segment v-model="selectedSegment">
      <ion-segment-button value="general-info">
        <ion-label style="font-size: calc(1rem - 2px);">
          Informações Gerais
        </ion-label>
      </ion-segment-button>
      <ion-segment-button value="additional-info">
        <ion-label style="font-size: calc(1rem - 2px);">
          Informações Adicionais
        </ion-label>
      </ion-segment-button>
    </ion-segment>
    <div v-show="selectedSegment === 'general-info'">
      <ep-input v-model="values.name" name="name" label="Nome" placeholder="Digite o nome do professor" />
      <ep-input v-model="values.birthdate" name="birthdate" label="Data de Nascimento" type="date" placeholder="YYYY-MM-DD" />
      <ep-input v-model="values.email" name="email" label="Email" placeholder="Digite o email" />
      <ep-input v-model="values.phone" name="phone" :mask="phoneMask" inputmode="tel" label="Telefone" placeholder="(99) 99999-9999" />
      <ep-textarea v-model="values.address" name="address" label="Endereço" placeholder="Digite o endereço" />
    </div>

    <div v-show="selectedSegment === 'additional-info'">
      <ep-json
        name="specializations"
        :fields="[
          { key: 'specialization', label: 'Formações', placeholder: 'Ex: Cursos, Especializações' },
        ]"
        @update:entries="handleEntriesUpdate"
      />
    </div>

    <template #footer>
      <ion-grid>
        <ion-row class="ion-justify-content-between">
          <ion-col>
            <ion-button expand="block" color="danger">
              Cancelar
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button expand="block" color="primary" @click="registerTeacher">
              Salvar
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </content-layout>
</template>

<style scoped>
ion-label h2 {
  margin: 0;
  font-weight: bold;
}

ion-searchbar {
  --background: var(--ion-color-light);
}
</style>
