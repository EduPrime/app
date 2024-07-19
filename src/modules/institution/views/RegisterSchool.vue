<script setup lang="ts">
import { useFieldArray, useForm } from 'vee-validate'
import { schoolSchema } from '../validators/validationSchemas'

interface SeriesFieldEntry {
  name: string
  classes: {
    name: string
    teacher: string
    schedule: string
    subjects: string[]
  }[]
}

const { handleSubmit, errors, values } = useForm<any>({
  validationSchema: schoolSchema,
})

const { fields } = useFieldArray<SeriesFieldEntry>('series')

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    values.logo = target.files[0]
  }
}

const registerSchool = handleSubmit((values: any) => {
  console.log('Escola registrada:', values)
  // Aqui você pode adicionar a lógica para enviar os dados para um backend ou API
})

const seriesErrors: any = (errors as any).series
</script>

<template>
  <content-layout>
    <template #header-buttons>
      <ion-buttons slot="start">
        <ion-back-button default-href="/" />
      </ion-buttons>
    </template>

    <form @submit="registerSchool">
      <ion-item>
        <ion-label position="stacked">
          Nome da Escola
        </ion-label>
        <ion-input v-model="values.name" placeholder="Digite o nome da escola" />
        <p v-if="errors.name">
          {{ errors.name }}
        </p>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Endereço
        </ion-label>
        <ion-input v-model="values.address" placeholder="Digite o endereço" />
        <p v-if="errors.address">
          {{ errors.address }}
        </p>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">
          Mostrar Detalhes
        </ion-label>
        <ion-checkbox v-model="values.showDetails" />
        <p v-if="errors.showDetails">
          {{ errors.showDetails }}
        </p>
      </ion-item>

      <div v-for="(serie, sIndex) in fields" :key="sIndex">
        <ion-item>
          <ion-label position="stacked">
            Nome da Série
          </ion-label>

          <ion-input v-model="serie.value.name" placeholder="Digite o nome da série" />
          <p v-if="seriesErrors?.[sIndex]?.name">
            {{ seriesErrors?.[sIndex]?.name }}
          </p>
        </ion-item>

        <div v-for="(classe, cIndex) in serie.value.classes" :key="cIndex">
          <ion-item>
            <ion-label position="stacked">
              Nome da Turma
            </ion-label>
            <ion-input v-model="classe.name" placeholder="Digite o nome da turma" />
            <p v-if="seriesErrors?.[sIndex]?.classes?.[cIndex]?.name">
              {{ seriesErrors?.[sIndex]?.classes?.[cIndex]?.name }}
            </p>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">
              Professor
            </ion-label>
            <ion-input v-model="classe.teacher" placeholder="Digite o nome do professor" />
            <p v-if="seriesErrors?.[sIndex]?.classes?.[cIndex]?.teacher">
              {{ seriesErrors?.[sIndex]?.classes?.[cIndex]?.teacher }}
            </p>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">
              Horário
            </ion-label>
            <ion-input v-model="classe.schedule" placeholder="Digite o horário" />
            <p v-if="seriesErrors?.[sIndex]?.classes?.[cIndex]?.schedule">
              {{ seriesErrors?.[sIndex]?.classes?.[cIndex]?.schedule }}
            </p>
          </ion-item>

          <div v-for="(subject, subIndex) in classe.subjects" :key="subIndex">
            <ion-item>
              <ion-label position="stacked">
                Assunto
              </ion-label>
              <ion-input v-model="classe.subjects[subIndex]" placeholder="Digite o assunto" />
              <p v-if="seriesErrors?.[sIndex]?.classes?.[cIndex]?.subjects?.[subIndex]">
                {{ seriesErrors?.[sIndex]?.classes?.[cIndex]?.subjects?.[subIndex] }}
              </p>
            </ion-item>
          </div>
        </div>
      </div>

      <ion-item>
        <ion-label position="stacked">
          Logotipo
        </ion-label>
        <input type="file" @change="handleFileUpload">
      </ion-item>

      <ion-button expand="block" type="submit">
        Registrar
      </ion-button>
    </form>
  </content-layout>
</template>

<style scoped>
/* Estilos opcionais */
</style>
