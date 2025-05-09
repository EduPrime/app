<script setup lang="ts">
import type { TextFieldTypes } from '@ionic/core'
import type { Ref } from 'vue'
import { IonItem, IonTextarea } from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'
import { useField } from 'vee-validate'

import { ref } from 'vue'

const props: any = defineProps({
  name: { type: String, required: true },
  type: String as () => TextFieldTypes,
  label: String,
  labelPosition: {
    type: String as () => 'stacked' | 'fixed' | 'start' | 'end' | 'floating' | undefined,
    default: 'stacked',
  },
  placeholder: String,
  mask: {
    type: [String, Array],
    default: null,
  },
  maxlength: {
    type: Number,
    default: 255,
  },
})

const { value, errors }: any = useField(props.name)
const touched = ref(false)

function handleBlur() {
  touched.value = true
}
function customFormatter(inputLength: number, maxLength: number): string {
  return `${maxLength - inputLength} `
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
</script>

<template>
  <IonItem>
    <IonTextarea
      v-model="value"
      v-maskito="maskOptions"
      :class="{ 'ion-invalid': errors.length > 0, 'ion-touched': touched, 'ion-valid': errors.length === 0 }"
      :label="label"
      :placeholder="placeholder"
      :label-placement="labelPosition"
      :error-text="errors.length > 0 ? errors[0] : ''"
      :counter="true"
      :maxlength="props.maxlength"
      :counter-formatter="customFormatter"
      auto-grow
      @ion-blur="handleBlur"
    />
  </IonItem>
</template>

<style scoped lang="scss">
ion-input::part(native) .native-input {
    min-height: 44px;
}
</style>
