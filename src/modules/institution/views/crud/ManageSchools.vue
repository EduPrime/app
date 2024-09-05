<script setup lang="ts">
import { computed } from 'vue'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonItem, IonLabel } from '@ionic/vue'
import SchoolService from '../../services/SchoolService'
import type { Database, Enums, Tables } from '@/types/database.types'

const props = defineProps<{
    school: Tables<'school'>
}>()

const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'salve'): void
}>()

const schoolService = new SchoolService()
const form = computed(() => {
    return { ...props.institution }
})
async function submitForm() {
    try {
        let result: Tables<'school'> | null = null
        if (form.value?.id) {
            result = await schoolService.update(form.value.id, form.value as Database['public']['Tables']['school']['Update'])
        }
        if (result !== null) {
            console.log('Escola salva com sucesso:', result)
            emit('save')
        }
        else {
            console.error('Falha ao salvar a escola')
        }
    }
    catch (error) {
        console.error('Erro ao salvar a escola:', error)
    }
}

function cancelEdit() {
    console.log('cancelEdit chamado')
    emit('cancel')('cancel')
}
</script>

<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>Editar Escola</ion-card-title>
        </ion-card-header>

        <ion-card-content>
            <form @submit.prevent="submitForm">
                <ion-item>
                    <ion-label position="stacked">
                        Nome
                    </ion-label>
                    <ion-input v-model="form.name" placeholder="Nome da Instituição" required />
                </ion-item>
            </form>
        </ion-card-content>
    </ion-card>
</template>