<script lang="ts" setup>
import type { Moment } from 'moment'
import {
  IonButton,
  IonButtons,
  IonChip,
  IonDatetime,
  IonDatetimeButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonToolbar,
} from '@ionic/vue'
import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons'

import { DateTime } from 'luxon'
import moment from 'moment'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, defineEmits, ref, watch } from 'vue'

import 'swiper/css'

const emits = defineEmits(['update:modelValue'])

const getSwiper: any = ref(null)
const currentDate = ref(moment())
const monthYear = ref(new Date()
  .toISOString())
const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const weeksInMonth = ref<any[]>([])
const selectedDate = ref(moment())
const events = ref([
  { date: '2024-06-01', type: 'holiday', title: 'Holiday' },
  { date: '2024-06-05', type: 'event', title: 'Event' },
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

// const dismiss = () => modal.value.$el.dismiss()

// Variável para armazenar o valor de mês e ano selecionado
const monthYearValue = ref(`${new Date().toISOString().slice(0, 8)}01`)

// Função para atualizar o valor de mês e ano selecionado
function updateDate(event: any) {
  monthYearValue.value = event.detail.value
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
}

function selectDate(date: Moment) {
  selectedDate.value = date
  monthYearValue.value = `${date.format('YYYY-MM-DD')}`
  monthYear.value = date.format('YYYY-MM-DD')
}

function getColorForDate(date: Moment) {
  const formattedDate = date.format('YYYY-MM-DD')
  if (formattedDate === selectedDate.value.format('YYYY-MM-DD')) {
    return 'primary'
  }
  else if (events.value.some(event => event.date === formattedDate)) {
    const event = events.value.find(event => event.date === formattedDate)
    switch (event?.type) {
      case 'holiday':
        return 'danger'
      case 'event':
        return 'secondary'
      default:
        return ''
    }
  }
  else {
    return ''
  }
}

function isDateDisabled(date: Moment) {
  const formattedDate = date.format('YYYY-MM-DD')
  const event = events.value.find(event => event.date === formattedDate)
  return event?.type === 'disabled'
}

function onMonthYearChange(event: any) {
  const selectedDate = moment(event.detail.value)
  currentDate.value = selectedDate.startOf('month')
  loadVisibleMonth()
}

function updateDatetimeButton() {
  monthYear.value = currentDate.value.format('YYYY-MM-DD')
}

const eventsForSelectedDate = computed(() => {
  const formattedDate = selectedDate.value.format('YYYY-MM-DD')
  return events.value.filter(event => event.date === formattedDate)
})

function handleSlideChange(event: any) {
  const swiper: any = event.target.swiper
  const activeIndex = swiper.activeIndex
  if (activeIndex === swiper.slides.length - 1) {
    nextMonth()
  }
  else if (activeIndex === 0) {
    prevMonth()
  }
}
function onSwiper(swiper: any) {
  console.log(swiper)
  getSwiper.value = swiper
}
function checkNextSlide(swiper: any) {
  if (swiper.isEnd) {
    nextMonth()
  }
}

function translateDay(day: string) {
  switch (day) {
    case 'SUN':
      return 'Dom'
    case 'MON':
      return 'Seg'
    case 'TUE':
      return 'Ter'
    case 'WED':
      return 'Qua'
    case 'THU':
      return 'Qui'
    case 'FRI':
      return 'Sex'
    case 'SAT':
      return 'Sab'
    default:
      return ''
  }
}

loadVisibleMonth()

function luxonFormatDate(dateString: string) {
  const date = DateTime.fromISO(dateString)
  return date.setLocale('pt-BR').toFormat('MMMM yyyy')
}

watch(monthYearValue, (newValue: any, oldValue: any) => {
  if (newValue.slice(0, 7) !== oldValue.slice(0, 7)) {
    const date = DateTime.fromISO(newValue)
    currentDate.value = moment(date.toISODate())
    monthYear.value = newValue

    loadVisibleMonth()
  }
})

watch(selectedDate, (newValue: any) => {
  if (newValue) {
    emits('update:modelValue', {
      selectedDate: newValue.format('YYYY-MM-DD'),
      dayEvents: eventsForSelectedDate.value,
    })
  }
})
</script>

<template>
  <ion-grid class="ion-no-padding">
    <ion-row>
      <!-- aqui vai o filtro ou algo assim <ion-col size="12" size-xl="6"></ion-col> -->
      <ion-col size="12" size-xl="6">
        <ion-row>
          <ion-col style="display: flex;" class="ion-justify-content-start ion-align-items-center" size="7">
            <IonButton id="open-custom-dialog" expand="block">
              {{ luxonFormatDate(monthYearValue) }}
            </IonButton>

            <IonModal id="month-year-modal" ref="modal" trigger="open-custom-dialog">
              <div class="wrapper">
                <h1>Selecione o ano e mês</h1>
                <IonDatetime v-model="monthYearValue" done-text="Confirmar" cancel-text="Cancelar"
                  presentation="month-year" datetime="datetime" display-format="MMMM YYYY" :show-default-buttons="true"
                  @ion-change="updateDate" />
                <!-- dismiss() -->
              </div>
            </IonModal>
          </ion-col>
          <ion-col style="display: flex;" class=" ion-align-items-center ion-justify-content-end" size="5">
            <IonButtons style="scale: 0.9;" class="ion-justify-content-end">
              <IonButton color="tertiary" class="navigation-btn" @click="prevMonth">
                <IonIcon slot="icon-only" :icon="arrowBackOutline" />
              </IonButton>
              <IonButton color="tertiary" class="navigation-btn" style="margin-left: 10px;" @click="nextMonth">
                <IonIcon slot="icon-only" :icon="arrowForwardOutline" />
              </IonButton>
            </IonButtons>
          </ion-col>
          <ion-col size="12">
            <Swiper :options="slideOpts" :slides-per-view="1" :space-between="8"
              @ion-slide-will-change="handleSlideChange" @swiper="onSwiper"
              @touch-end="(swiper: any) => checkNextSlide(swiper)">
              <SwiperSlide v-for="(week, index) in weeksInMonth" :key="index">
                <div class="date-selector">
                  <div v-for="day in week" :key="day.date.format('YYYY-MM-DD')"
                    :style="day.weekday !== 'SUN' ? '' : 'display: none;'" class="day-chip">
                    <!-- <div class="ion-padding">
                        {{ day.date.format('YYYY-MM-DD') }}
                        <br>
                        {{ monthYearValue }}
                      </div> -->

                    <IonChip :disabled="isDateDisabled(day.date)" shape="rounded" :color="getColorForDate(day.date)"
                      @click="() => selectDate(day.date)">
                      <div>
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
</template>

<style scoped>
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
  margin-top: 20px;
  font-weight: normal;
  font-size: 12px;
  margin-bottom: 12px;
}

.day-number {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 20px;
}

.navigation-btn {
  background-color: var(--ion-color-lightaccent);
  border-radius: 100%
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