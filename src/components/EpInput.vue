<template>
    <ion-item>
        <ion-input
            :class="{ 'ion-invalid': errors.length > 0, 'ion-touched': touched, 'ion-valid': errors.length == 0 }"
            :label="label" :placeholder="placeholder" :label-placement="labelPosition"
            :error-text="errors.length > 0 ? errors[0] : ''" v-model="value" :type="type || 'text'"
            @ion-blur="handleBlur" v-maskito="maskOptions" />
    </ion-item>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useField } from 'vee-validate';
import { IonItem, IonInput } from '@ionic/vue';
import { maskito as vMaskito } from '@maskito/vue';

const props = defineProps({
    name: { type: String, required: true },
    type: String,
    label: String,
    labelPosition: {
        type: String,
        default: 'stacked',
    },
    placeholder: String,
    mask: {
        type: [String, Array],
        default: null
    },
});

const { value, errors } = useField(props.name);
const touched = ref(false);

const handleBlur = () => {
    touched.value = true;
};

const maskOptions = props.mask ? ref({
    mask: props.mask ?? null,
    elementPredicate: (el) => {
        return new Promise((resolve) => {
            requestAnimationFrame(async () => {
                const input = await el.getInputElement();
                resolve(input);
            });
        });
    },
}) : null;
</script>

<style scoped lang="scss">
    ion-input::part(native) .native-input{
        min-height: 44px;
    }
</style>