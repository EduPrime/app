<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref, watch } from 'vue'

interface Props {
  tDate: string
}

const props = defineProps<Props>()

const targetDate = new Date(props.tDate) // Defina a data alvo aqui

const months = ref(0)
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const animateClass = ref('')

function updateCountdown() {
  const now = new Date()
  const timeDifference = targetDate.getTime() - now.getTime()

  const totalMinutes = Math.floor(timeDifference / (1000 * 60))
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)
  const totalMonths = Math.floor(totalDays / 30)

  months.value = totalMonths
  days.value = totalDays % 30
  hours.value = totalHours % 24
  minutes.value = totalMinutes % 60
}

let intervalId: ReturnType<typeof setInterval>

onMounted(() => {
  updateCountdown()
  intervalId = setInterval(updateCountdown, 60000) // Atualiza a cada minuto
})

onUnmounted(() => {
  clearInterval(intervalId)
})

watch([months, days, hours, minutes], () => {
  animateClass.value = 'animate'
  setTimeout(() => {
    animateClass.value = ''
  }, 500) // Duração da animação
})
</script>

<template>
  <div style="display: flex;">
    <div class="card-remaining-time">
      <div :class="animateClass" class="ion-text-center ion-font-weight-bold card-time-title">
        {{ months }}
      </div>
      <p class="card-time-subtitle ion-text-center">
        <span class="">Meses</span>
      </p>
    </div>
    <div class="card-remaining-time">
      <div :class="animateClass" class="ion-text-center ion-font-weight-bold card-time-title">
        {{ days }}
      </div>
      <p class="card-time-subtitle ion-text-center">
        <span class="ion-text-center">Dias</span>
      </p>
    </div>
    <div class="card-remaining-time">
      <div :class="animateClass" class="ion-text-center ion-font-weight-bold card-time-title">
        {{ hours }}
      </div>
      <p class="card-time-subtitle ion-text-center">
        <span class="ion-text-center">Horas
        </span>
      </p>
    </div>
    <div class="card-remaining-time">
      <div :class="animateClass" class="ion-text-center ion-font-weight-bold card-time-title">
        {{ minutes }}
      </div>
      <p class="card-time-subtitle ion-text-center">
        <span class="ion-text-center">Min</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.card-time-title {
  transition: all 0.5s ease;
}

.animate {
  animation: fadeInOut 0.5s;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  50% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(10px);
  }
}

.card-time-title {
  font-size: 1.4rem;
  font-weight: 900;
  margin-bottom: -10px;
  color: #EE7889;
}

.card-time-subtitle {
  font-size: 0.7rem;
  font-weight: lighter;
  color: #EE7889;
}

.card-remaining-time {
  width: 55px;
  background-color: white;
  padding-top: 8px;
  padding-bottom: 3px;
  border-radius: 0.3rem;
  margin-right: 10px;
  box-shadow: rgba(0, 0, 0, 0.137) 0px 0px 5px;
}
</style>
