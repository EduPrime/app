<script setup lang="ts">
import { catchPageWidth } from '@/utils/useUtils'
import { IonCard, IonCardHeader, IonText } from '@ionic/vue'
// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref } from 'vue'

import SeriesService from '../services/SeriesService'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const props = defineProps<Props>()

const emits = defineEmits(['update:modelValue'])

//  const onSwiper = (swiper) => {
//      console.log(swiper);
//  };

//  const onSlideChange = () => {
//      console.log('slide change');
//  };

const modules = [Navigation, Pagination, Scrollbar, A11y]

//

interface Props {
  course: string
}

const postgrest = new SeriesService()

const pageWidth = catchPageWidth()
const gSeries = ref()
const boundledSeries = ref()

function groupCourses(courses: any[]): any[] {
  // Ordenar os cursos em ordem alfabética com base no nome
  const sortedCourses = courses.sort((a, b) => a.name.localeCompare(b.name))

  const boundled = []
  for (let i = 0; i < sortedCourses.length; i += 2) {
    boundled.push({ items: sortedCourses.slice(i, i + 2) })
  }
  return boundled
}

onMounted(async () => {
  gSeries.value = await postgrest.getSeries(props.course)
  boundledSeries.value = groupCourses(gSeries.value)
})
</script>

<template>
  <!-- @swiper="onSwiper"
        @slideChange="onSlideChange" -->
  <div :style="pageWidth?.pageWidth > 992 ? 'max-width: 992px' : 'width: 100vw;'">
    <Swiper
      :modules="modules" :slides-per-view="pageWidth?.pageWidth > 992 ? 2 : 1.4" :space-between="5"
      :scrollbar="{ draggable: true }"
    >
      <SwiperSlide v-for="series in boundledSeries" :key="series">
        <div>
          <IonCard
            v-for="serie in series.items" :key="serie"
            style=" margin-bottom: 25px; background-image: linear-gradient(to  right, var(--ion-color-tertiary) -50%, #fff 60%  );"
            @click="emits('update:modelValue', serie)"
          >
            <IonCardHeader>
              <div class="flex" style="height: 90px;">
                <span class="my-auto mx-auto" style="font-size: 22pt;">
                  <IonText color="primary" :style="serie.name.length < 8 ? 'font-weight: 700;' : 'font-weight: 500;'">
                    {{ serie.name }}
                  </IonText>
                </span>
              </div>
            </IonCardHeader>
          </IonCard>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<!-- <script>
       // import Swiper core and required modules
       import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

       // Import Swiper Vue.js components
       import { Swiper, SwiperSlide } from 'swiper/vue';

       // Import Swiper styles
       import 'swiper/css';
       import 'swiper/css/navigation';
       import 'swiper/css/pagination';
       import 'swiper/css/scrollbar';

       // Import Swiper styles
       export default {
         components: {
           Swiper,
           SwiperSlide,
         },
         setup() {
           const onSwiper = (swiper) => {
             console.log(swiper);
           };
           const onSlideChange = () => {
             console.log('slide change');
           };
           return {
             onSwiper,
             onSlideChange,
             modules: [Navigation, Pagination, Scrollbar, A11y],
           };
         },
       };
     </script> -->
