<script setup lang="ts">
import { ref } from 'vue'
import { IonLabel, IonSegment, IonSegmentButton, IonToast } from '@ionic/vue'
import { useForm } from 'vee-validate'
import { toastController } from '@ionic/core'
import type { ObjectSchema } from 'yup'
import { date, object, string } from 'yup'
import EpInput from '@/components/EpInput.vue'
import EpTextarea from '@/components/EpTextarea.vue'
import EpJson from '@/components/EpJson.vue'
import type { Tables } from '@/types/database.types'

  type TeacherPartial = Omit<Pick<Tables<'teacher'>, 'name' | 'birthdate' | 'email' | 'phone' | 'address' | 'specializations'>, 'birthdate'> & {
    birthdate: Date // Redefinindo o campo birthdate para ser do tipo Date
  }
const formSchema: ObjectSchema<TeacherPartial> = object({
  name: string().required('Nome é obrigatório'),
  birthdate: date().required('Data de nascimento é obrigatória').typeError('Data de nascimento inválida'),
  email: string().email('Email inválido').required('Email é obrigatório'),
  phone: string()
    .required('Telefone é obrigatório')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
  address: string().required('Endereço é obrigatório'),
  specializations: string().required('Especializações são obrigatórias'),
})
const { values, errors } = useForm<TeacherPartial>({
  validationSchema: formSchema,
})

const selectedSegment = ref('general-info')
async function registerTeacher() {
  console.log('Values : ', values)
  console.log('Errors : ', errors.value)
  let displayErrors: string = ''
  if (typeof errors.value === 'object') {
    displayErrors = Object.values(errors.value).join(', ')
  }
  else {
    displayErrors = errors.value
  }
  const toast: any = await toastController.create({
    header: 'Erros',
    message: displayErrors,
    duration: 2500,
    position: 'bottom',
    color: 'dark',
  })
  await toast.present()
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
      <ep-input name="name" label="Nome" placeholder="Digite o nome do professor" />
      <ep-input name="birthdate" label="Data de Nascimento" type="date" placeholder="YYYY-MM-DD" />
      <ep-input name="email" label="Email" placeholder="Digite o email" />
      <ep-input name="phone" :mask="phoneMask" inputmode="tel" label="Telefone" placeholder="(99) 99999-9999" />
      <ep-textarea name="address" label="Endereço" placeholder="Digite o endereço" />
    </div>

    <div v-show="selectedSegment === 'additional-info'">
      <ep-json
        name="specializations"
        :fields="[
          { key: 'specialization', label: 'Formações', placeholder: 'Ex: Cursos, Especializações' },
        ]"
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
    <ion-toast />
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
