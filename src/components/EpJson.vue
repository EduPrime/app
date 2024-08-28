<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonRow } from '@ionic/vue'
import { useField } from 'vee-validate'
import { ref } from 'vue'
import { maskito as vMaskito } from '@maskito/vue'
import type { Ref } from 'vue'
import { add } from 'ionicons/icons'

const props: any = defineProps({
  name: { type: String, required: true },
  fields: {
    type: Array,
    required: true,
    default: () => [{ key: 'subject', label: 'Assunto', placeholder: 'Ex: Matemática' }],
  },
  labelPosition: {
    type: String as () => 'stacked' | 'fixed' | 'start' | 'end' | 'floating' | undefined,
    default: 'stacked',
  },
  mask: {
    type: [String, Array],
    default: null,
  },
  maxlength: {
    type: Number,
    default: 255,
  },
})

const { errors }: any = useField(props.name)
const touched = ref(false)

function handleBlur() {
  touched.value = true
}

const entries = ref([
  props.fields.reduce((acc: any, field: { key: any }) => ({ ...acc, [field.key]: '' }), {}),
])

function addEntry() {
  entries.value.push(props.fields.reduce((acc: any, field: { key: any }) => ({ ...acc, [field.key]: '' }), {}))
}

function removeEntry(index: number) {
  entries.value.splice(index, 1)
}

const maskOptions: Ref<any> | string | null = props.mask
  ? ref({
    mask: props.mask ?? null,
    elementPredicate: (el: HTMLIonInputElement) => {
      return new Promise((resolve) => {
        requestAnimationFrame(async () => {
          const input = await el.getInputElement()
          resolve(input)
        })
      })
    },
  })
  : null

function getUnifiedJson() {
  return entries.value
}
</script>

<template>
  <ion-list>
    <!-- Botão para Adicionar Nova Entrada -->
    <ion-item lines="none">
      <ion-grid>
        <ion-row class="ion-justify-content-end">
          <ion-col size="auto">
            <ion-button color="primary" @click="addEntry">
              <ion-icon slot="start" :icon="add" />
              Adicionar
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>
    <ion-item-sliding v-for="(entry, entryIndex) in entries" :key="entryIndex">
      <ion-item>
        <ion-grid>
          <ion-row>
            <ion-col size="12">
              <ion-input
                v-for="(field, fieldIndex) in props.fields"
                :key="fieldIndex"
                v-model="entry[field.key]"
                v-maskito="maskOptions"
                :class="{ 'ion-invalid': errors.length > 0, 'ion-touched': touched, 'ion-valid': errors.length === 0 }"
                :label="field.label"
                :placeholder="field.placeholder"
                :label-placement="labelPosition"
                :maxlength="props.maxlength"
                @ion-blur="handleBlur"
              />
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option color="danger" @click="removeEntry(entryIndex)">
          Remover
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>

    <!-- Exibe o JSON Unificado -->
    <ion-item>
      <pre>{{ getUnifiedJson() }}</pre>
    </ion-item>
  </ion-list>
</template>

<style scoped lang="scss">
ion-input::part(native) .native-input {
  min-height: 44px;
}
.ion-text-end {
  text-align: end;
}
</style>
