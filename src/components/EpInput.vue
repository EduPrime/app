<script setup lang="ts">
import { IonInput, IonItem } from '@ionic/vue'
import { useField } from 'vee-validate'
import { onMounted, ref, watch } from 'vue'
import { maskito as vMaskito } from '@maskito/vue'
import { maskitoTransform } from '@maskito/core'
import type { TextFieldTypes } from '@ionic/core'

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
})

const { value, errors }: any = useField(props.name)
const touched = ref(false)

function handleBlur() {
  touched.value = true
}

const maskOptions: any = ref(props.mask
  ? {
      mask: props.mask,
      elementPredicate: (el: HTMLIonInputElement) => {
        return new Promise((resolve) => {
          requestAnimationFrame(async () => {
            const input = await el.getInputElement()
            resolve(input)
          })
        })
      },
    }
  : null)

function applyMask() {
  if (value.value && props.mask) {
    value.value = maskitoTransform(value.value, maskOptions.value)
  }
}

onMounted(() => {
  applyMask()
})

watch(value, () => {
  applyMask()
})
</script>

<template>
  <ion-item>
    <ion-input
      v-model="value" v-maskito="maskOptions"
      :class="{ 'ion-invalid': errors.length > 0, 'ion-touched': touched, 'ion-valid': errors.length === 0 }"
      :label="label" :placeholder="placeholder" :label-placement="labelPosition"
      :error-text="errors.length > 0 ? errors[0] : ''" :type="type || 'text'" @ion-blur="handleBlur"
    />
  </ion-item>
</template>

<style scoped lang="scss">
ion-input::part(native) .native-input {
  min-height: 44px;
}
</style>
