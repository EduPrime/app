<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonToast } from '@ionic/vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { toastController } from '@ionic/core'
import { useRouter, useRoute } from 'vue-router'
import SchoolService from '../services/SchoolService'
import InstitutionService from '../services/InstitutionService'
import EpInput from '@/components/EpInput.vue'
import showToast from '@/utils/toast-alert'
import type { Tables } from '@/types/database.types'

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
const schoolId = computed(() => route.currentRoute.value.params.id) as { value: string }
const schoolService = new SchoolService()
const institutionService = new InstitutionService()
const institutionId = ref('')
const formSchema = yup.object ({
  name: yup
    .string()
    .required('Nome da escola é obrigatório')
    .min(12, 'O nome deve ter pelo menos 12 caracteres'),
})

const { values, errors, validate } = useForm<SchoolPartial>({
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
      name: values.name,
    }
    try {
      let result
      if (schoolId.value) {
        result = await schoolService.update(schoolId.value, formData)
        if (result) {
          showToast('Escola atualizada com sucesso')
          setTimeout(() => {
            router.push('/Institutions/schools')
          }, 2000)
        }
      } 
      else {
        result = await schoolService.create(formData)
        if (result) {
          showToast('Escola cadastrada com sucesso!', 'top', 'success')
          setTimeout(() => {
            router.push('/Institutions/schools')
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

onMounted(async () => {
  institutionId.value = (await institutionService.getAll())?.at(0)?.id
})

</script>

<template>

<div v-show="selectedSegment === 'general-info'">
  <ep-input v-model="values.name" name="name" label="Nome" placeholder="Digite o nome da escola" />
</div>

</template>