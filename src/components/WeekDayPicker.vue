<script lang="ts" setup>
import type { Swiper as SwiperType } from 'swiper'
import { hexToRgb } from '@/utils/hex-to-rgb'

import { IonAlert, IonButton, IonButtons, IonChip, IonDatetime, IonIcon, IonModal, IonText } from '@ionic/vue'

import { arrowBackOutline, arrowForwardOutline, time } from 'ionicons/icons'
import { DateTime } from 'luxon'
import moment, { type Moment } from 'moment'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, defineEmits, defineProps, onMounted, ref, watch } from 'vue'
import ScheduleService from '../services/ScheduleService'

import StageService from '../services/StageService'
import 'swiper/css'

// @TODO: Quando possível implementar a prop feriados para receber o valor de forma dinamica e aposentar a variável ref() events
//
interface Props {
  // feriados: { date: string; type: string; title: string }[]
  teacherId: string | undefined
  currentClassroom: string
  currentDiscipline?: string
  frequency?: string
  originPage?: string
  hasUnsavedChangesToAlert?: boolean | false
}

const props = defineProps<Props>()

const emits = defineEmits(['update:modelValue', 'update:invalidDay'])

const scheduleService = new ScheduleService()
const stageService = new StageService()
const validDays = ref()
const pulseAtEnd = ref('')
const currentWeekday = ref()

// variáveis de controle para IonAlert de mudança não salvas
const isAlertOpen = ref(false)
const dateToAlert = ref<Moment | undefined>(moment())
const weekToAlert = ref('')

const getSwiper = ref()
const currentDate = ref(moment())
const monthYear = ref(new Date().toISOString())
const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const weeksInMonth = ref<{ date: Moment, weekday: string }[][]>([])
const blockedDays = ref<{ date: string, inside: boolean }[]>([])
const selectedDate = ref<Moment | undefined>(moment())
const events = ref([
  { date: '2024-06-01', type: 'holiday', title: 'Holiday' },
  { date: '2024-06-05', type: 'event', title: 'Event' },
  { date: '2025-04-01', type: 'holiday', title: 'Carnaval' },
  { date: '2024-06-08', type: 'disabled', title: 'Event' },
  { date: '2024-06-10', type: 'event', title: 'Event' },
  { date: '2024-06-25', type: 'disabled', title: 'Event' },
  { date: '2024-06-26', type: 'holiday', title: 'Some Day' },
])

const slideOpts = {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 1,
}

const modal = ref()

// Variável para armazenar o valor de mês e ano selecionado
const monthYearValue = ref(`${new Date().toISOString().slice(0, 8)}01`)

const colorStyle = ref({
  primary: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-primary').trim(),
  secondary: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-secondary').trim(),
  tertiary: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim(),
})

onMounted(() => {
  const parsed = Number.parseInt(currentDate.value.format('DD').toString())
  getSwiper.value.slideTo(Math.ceil(parsed / 7) - 1)
})

async function getValidDaysInScheduleService() {
  try {
    if (props.teacherId && props.currentClassroom) {
      const data = await scheduleService.getSchedule(props.teacherId, props.currentClassroom, props.currentDiscipline ?? undefined)

      return data
    }
  }
  catch (error) {
    console.error('Erro ao carregar os dados:', error)
  }
}

// Função para atualizar o valor de mês e ano selecionado
function updateDate(event: CustomEvent) {
  monthYearValue.value = event.detail.value
  selectedDate.value = undefined
}

function loadVisibleMonth() {
  const startOfMonth = currentDate.value.clone().startOf('month')
  const endOfMonth = currentDate.value.clone().endOf('month')
  const daysInMonth = []
  for (let date = startOfMonth.clone(); date.isBefore(endOfMonth) || date.isSame(endOfMonth); date.add(1, 'day')) {
    daysInMonth.push({
      date: date.clone(),
      weekday: weekDays[date.day()],
    })
  }

  weeksInMonth.value = []
  for (let i = 0; i < daysInMonth.length; i += 7) {
    weeksInMonth.value.push(daysInMonth.slice(i, i + 7))
  }
  updateDatetimeButton()
}

function prevMonth() {
  if (getSwiper.value.activeIndex === 0) {
    currentDate.value = currentDate.value.clone().subtract(1, 'month').startOf('month')
    loadVisibleMonth()
    getSwiper.value.slideTo(getSwiper.value.slides.length - 1)
  }
  else {
    getSwiper.value.slidePrev()
  }
  monthYearValue.value = monthYear.value
}

function nextMonth() {
  if (getSwiper.value.activeIndex === getSwiper.value.slides.length - 1) {
    currentDate.value = currentDate.value.clone().add(1, 'month').startOf('month')
    loadVisibleMonth()
    getSwiper.value.slideTo(0)
  }
  else {
    getSwiper.value.slideNext()
  }
  monthYearValue.value = monthYear.value
}

function selectDate(date: Moment, weekday: string) {
  selectedDate.value = date
  monthYearValue.value = `${date.format('YYYY-MM-DD')}`
  monthYear.value = date.format('YYYY-MM-DD')
  currentWeekday.value = weekday
}

function getColorForDate(date: Moment) {
  const formattedDate = date.format('YYYY-MM-DD')
  if (formattedDate === selectedDate.value?.format('YYYY-MM-DD')) {
    return ''
  }

  if (events.value.some(event => event.date === formattedDate)) {
    const event = events.value.find(event2 => event2.date === formattedDate)
    switch (event?.type) {
      case 'holiday':
        return 'danger'
      case 'event':
        return 'secondary'
      default:
        return ''
    }
  }
  return 'primary'
}

function updateDatetimeButton() {
  monthYear.value = currentDate.value.format('YYYY-MM-DD')
}

const eventsForSelectedDate = computed(() => {
  const formattedDate = selectedDate.value?.format('YYYY-MM-DD')
  return events.value.filter(event => event.date === formattedDate)
})

function handleSlideChange(event: { target: { swiper: { activeIndex: number | string, slides: [] } } }) {
  const swiper = event.target.swiper
  const activeIndex = swiper.activeIndex
  if (activeIndex === swiper.slides.length - 1) {
    nextMonth()
  }
  else if (activeIndex === 0) {
    prevMonth()
  }
}
function onSwiper(swiper: SwiperType) {
  // console.log(swiper)
  getSwiper.value = swiper
}

// Era usado para mudar o mês quando chegava ao vim do slide ( clicando )
// function checkNextSlide(swiper: any) {
//   if (swiper.isEnd) {
//     nextMonth()
//   }
// }

function translateDay(day: string) {
  switch (day) {
    case 'SUN':
      return 'DOM'
    case 'MON':
      return 'SEG'
    case 'TUE':
      return 'TER'
    case 'WED':
      return 'QUA'
    case 'THU':
      return 'QUI'
    case 'FRI':
      return 'SEX'
    case 'SAT':
      return 'SAB'
    default:
      return ''
  }
}

loadVisibleMonth()

function luxonFormatDate(dateString: string) {
  const date = DateTime.fromISO(dateString)
  return date.setLocale('pt-BR').toFormat('MMMM yyyy')
}

// function preSelectDateUsingUpdateDate() {
//   switch (props.hasUnsavedChangesToAlert) {
//     case true:
//       setAlertOpen(true)
//       break
//     case false:
//       // Call updateDate with the appropriate event or data
//       const event = { detail: { value: monthYearValue.value } } // Create a mock event
//       updateDate(event as CustomEvent)
//       break
//   }
// }

function preSelectDate(d: Moment, w: string) {
  switch (props.hasUnsavedChangesToAlert) {
    case true:
      setAlertOpen(true)
      dateToAlert.value = d
      weekToAlert.value = w
      break
    case false:
      selectDate(d, w)
      break
  }
}

function setAlertOpen(open: boolean) {
  isAlertOpen.value = open
  if (open) {
    isAlertOpen.value = false
    setTimeout(() => (isAlertOpen.value = true), 10)
  }
}

watch(monthYearValue, (newValue, oldValue) => {
  if (newValue.slice(0, 7) !== oldValue.slice(0, 7)) {
    const date = DateTime.fromISO(newValue)
    currentDate.value = moment(date.toISODate())
    monthYear.value = newValue

    loadVisibleMonth()
  }
})

function pulse() {
  pulseAtEnd.value = 'pulseButton'
  setTimeout(() => {
    pulseAtEnd.value = ''

    // Nome da classe que você deseja adicionar
  }, 2000) // 2000 milissegundos = 2 segundos de delay
}

function getDayName(sDate: Date | string | Moment | undefined) {
  return new Date(`${sDate}`).getDay()
}

async function insideStage() {
  const dates = weeksInMonth.value.flatMap(week => week.map(day => day.date.toISOString()))

  const boolDates = await stageService.isInsideStage(dates, props.originPage)
  console.log('boolDate', boolDates)
  blockedDays.value = boolDates
}

watch(weeksInMonth, async () => {
  await insideStage()
}, { immediate: true, deep: true })

watch(selectedDate, (newValue) => {
  if (newValue) {
    emits('update:modelValue', {
      selectedDate: newValue.format('YYYY-MM-DD'),
      dayEvents: eventsForSelectedDate.value,
      weekday: currentWeekday.value,
    })
    emits('update:invalidDay', false)
  }
})

watch(
  () => [props.teacherId, props.currentClassroom, props.currentDiscipline],
  async ([newTeacherId, newCurrentClassroom]) => {
    selectedDate.value = undefined

    if (newTeacherId && newCurrentClassroom) {
      validDays.value = await getValidDaysInScheduleService()
      if (validDays.value.find((i: { weekday: string }) => i.weekday.slice(0, 3) === weekDays[getDayName(selectedDate.value)])) {
        emits('update:invalidDay', false)
      }
      else {
        emits('update:invalidDay', true)
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <ion-grid class="ion-no-padding">
    <ion-row>
      <ion-col size="12" size-xl="6">
        <ion-row>
          <ion-col
            style="display: flex; padding-left: 10px;" class="ion-justify-content-start ion-align-items-center"
            size="7"
          >
            <IonChip
              id="open-custom-dialog" color="primary" class="ion-padding-horizontal ion-no-margin"
              shape="rounded"
            >
              <IonText
                style="height: 28px; display: flex; padding-bottom: 2px; font-size: medium; font-weight: medium;"
                class="ion-justify-content-center ion-align-items-center"
              >
                {{ luxonFormatDate(monthYearValue) }}
              </IonText>
            </IonChip>

            <IonModal id="month-year-modal" ref="modal" trigger="open-custom-dialog">
              <div class="wrapper">
                <h1>Selecione o ano e mês</h1>
                <IonDatetime
                  v-model="monthYearValue" done-text="Confirmar" cancel-text="Cancelar"
                  presentation="month-year" datetime="datetime" display-format="MMMM YYYY" :show-default-buttons="true"
                  @ion-change="updateDate"
                />
                <!-- dismiss() -->
              </div>
            </IonModal>
          </ion-col>
          <ion-col
            style="display: flex; padding-right: 5px;" class="ion-align-items-center ion-justify-content-end"
            size="5"
          >
            <IonButtons style="scale: 0.9;" class="ion-justify-content-end">
              <IonButton
                color="primary" class="navigation-btn"
                :style="`background-color:  ${hexToRgb(colorStyle.primary, '0.1')};`" @click="prevMonth"
              >
                <IonIcon slot="icon-only" :icon="arrowBackOutline" />
              </IonButton>
              <IonButton
                color="primary" class="navigation-btn" :class="pulseAtEnd" style="margin-left: 10px;"
                :style="`background-color:  ${hexToRgb(colorStyle.primary, pulseAtEnd ? '0.5' : '0.1')};`"
                @click="nextMonth"
              >
                <IonIcon slot="icon-only" :icon="arrowForwardOutline" />
              </IonButton>
            </IonButtons>
          </ion-col>
          <ion-col size="12">
            <!-- isso fazia com que quando clicasse em páginas do slide com menos de 7 itens scrollar automático
             porem não registrava o dia que clicou ( estudar maneira de trocar o array do mês ao tentar scrollar para o lado )
              @touch-end="(swiper: any) => checkNextSlide(swiper)" -->
            <Swiper
              :options="slideOpts" :slides-per-view="1" :space-between="8"
              @ion-slide-will-change="handleSlideChange" @swiper="onSwiper" @reach-end="() => pulse()"
            >
              <SwiperSlide v-for="(week, index) in weeksInMonth" :key="index">
                <div class="date-selector">
                  <div v-for="(day, i) in week" :key="day.date.format('YYYY-MM-DD')" class="day-chip">
                    <!-- valor padrão de disabled :disabled="isDateDisabled(day.date)" shape="rounded" -->
                    <!-- :style="day.weekday !== 'SUN' ? '' : 'display: none;'" -->
                    <IonChip
                      :id="`${props.originPage}-${day.date.format('MM-DD')}`" class="ion-no-padding"
                      style="padding: 10px; margin: 0px"
                      :disabled="!(blockedDays.find(date => date.date === day.date.format('YYYY-MM-DD'))?.inside)
                        || (props?.frequency === 'disciplina' && !props.currentDiscipline)
                        || (!validDays || validDays && validDays?.filter((d: any) => d.weekday.slice(0, 3) === day.weekday).length === 0)"
                      :style="i === 0 ? 'margin-left: 10px;' : undefined" :color="getColorForDate(day.date)"
                      @click="() => preSelectDate(day.date, day.weekday)"
                    >
                      <div>
                        <IonIcon
                          :style="{
                            visibility: day.date.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'visible' : 'hidden',
                          }" :icon="time"
                        />
                        <div class="day-name">
                          {{ translateDay(day.weekday) }}
                        </div>
                        <div class="day-number ">
                          {{ day.date.date() }}
                        </div>
                      </div>
                    </IonChip>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </ion-col>
        </ion-row>
      </ion-col>
    </ion-row>
  </ion-grid>

  <IonAlert
    id="alertChangeDateWithoutSave" class="custom-alert" :is-open="isAlertOpen"
    :on-did-dismiss="() => { setAlertOpen(false) }" header="Alterações não salvas!"
    sub-header="Ao trocar de dia no calendário, todas as alterações realizadas serão perdidas!"
    message="Deseja continuar sem salvar?" :buttons="[
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'alert-button-cancel',
        handler: () => {
          console.log('Confirm Cancel');
          setAlertOpen(false)
        },
      },
      {
        text: 'Confirmar',
        cssClass: 'alert-button-confirm',
        handler: () => {
          console.log('Confirm Ok');
          if (dateToAlert && weekToAlert) {
            selectDate(dateToAlert, weekToAlert)
          }
          else {
            console.error('dateToAlert or weekToAlert is undefined')
          }
        },
      },
    ]"
  />
</template>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
}

.pulseButton {
  animation: pulse 1s ease-in-out infinite;
  /* Tempo de 1 segundo e animação contínua */
}

.date-selector {
  display: flex;
  justify-content: flex-start;
  padding: 4px;
}

.day-chip {
  text-align: center;
  flex-basis: 13%;
}

ion-chip {
  border-radius: 45px;
}

.day-name {
  width: 24px;
  margin-top: 5px;
  font-size: 10px;
  font-weight: lighter;
  margin-bottom: 12px;
}

.day-number {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 20px;
}

.navigation-btn {
  border-radius: 100%
}

ion-chip {
  --background: var(--ion-color-tertiary);
  --color: var(--ion-color-lightaccent);
}

ion-modal#month-year-modal {
  --width: fit-content;
  --min-width: 250px;
  --height: fit-content;
  --border-radius: 6px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#month-year-modal h1 {
  margin: 20px 20px 10px 20px;
}

ion-modal#month-year-modal ion-icon {
  margin-right: 6px;

  width: 48px;
  height: 48px;

  padding: 4px 0;

  color: #aaaaaa;
}

ion-modal#month-year-modal .wrapper {
  margin-bottom: 10px;
}
</style>
