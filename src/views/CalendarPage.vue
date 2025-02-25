<script lang="ts" setup>
import WeekDayPicker from '@/components/WeekDayPicker.vue'
import { ref } from 'vue'

const selectedDayInfo = ref()
const teacherid = ref('')
</script>

<template>
  <content-layout class="ion-no-padding" style="background-color: pink;">
    <WeekDayPicker v-model="selectedDayInfo" :teacher-id="teacherid" />
    <pre>
      selectedDayInfo: {{ selectedDayInfo }}
    </pre>
  </content-layout>
</template>
