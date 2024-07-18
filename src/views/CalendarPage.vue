<script lang="ts" setup>
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons'
import type { Moment } from 'moment'
import moment from 'moment'
import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const getSwiper: Ref<any> = ref(null)
const currentDate = ref(moment())
const monthYear = ref(new Date().toISOString())
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

loadVisibleMonth()
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Book Appointment</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item button lines="none">
        <ion-label position="stacked">
          Select Date
        </ion-label>
      </ion-item>

      <ion-toolbar>
        <ion-datetime-button slot="start" datetime="datetime" presentation="year-month" />
        <ion-modal :keep-contents-mounted="true">
          <ion-datetime
            id="datetime" :value="monthYear" presentation="month-year"
            @ion-change="onMonthYearChange"
          />
        </ion-modal>
        <ion-buttons slot="end">
          <ion-button @click="prevMonth">
            <ion-icon slot="icon-only" :icon="arrowBackOutline" />
          </ion-button>
          <ion-button @click="nextMonth">
            <ion-icon slot="icon-only" :icon="arrowForwardOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <swiper
        :options="slideOpts" :slides-per-view="1" :space-between="8" @ion-slide-will-change="handleSlideChange"
        @swiper="onSwiper" @touch-end="(swiper: any) => checkNextSlide(swiper)"
      >
        <swiper-slide v-for="(week, index) in weeksInMonth" :key="index">
          <div class="date-selector">
            <div v-for="day in week" :key="day.date.format('YYYY-MM-DD')" class="day-chip">
              <ion-chip
                :disabled="isDateDisabled(day.date)" shape="rounded"
                :color="getColorForDate(day.date)" @click="() => selectDate(day.date)"
              >
                <div>
                  <div class="day-name">
                    {{ day.weekday }}
                  </div>
                  <div class="day-number">
                    {{ day.date.date() }}
                  </div>
                </div>
              </ion-chip>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <ion-list>
        <ion-list-header>Events on {{ selectedDate.format('YYYY-MM-DD') }}</ion-list-header>
        <ion-item v-for="event in eventsForSelectedDate" :key="event.title">
          <ion-label>{{ event.title }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
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
    margin-top: 25px;
    font-weight: normal;
    font-size: 13px;
    margin-bottom: 15px;
}

.day-number {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 25px;
}
</style>
