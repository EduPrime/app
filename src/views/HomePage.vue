<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import * as echarts from 'echarts'
import { nextTick, onMounted, ref } from 'vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'

const chartsInitialized = ref(false)

onMounted(async () => {
  await nextTick()

  const initializeCharts = () => {
    if (chartsInitialized.value)
      return
    chartsInitialized.value = true

    const studentsChart = echarts.init(document.getElementById('students-chart') as HTMLElement)
    studentsChart.setOption({
      title: {
        text: 'Número Total de Alunos',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Total de Alunos',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Escola A' },
            { value: 735, name: 'Escola B' },
            { value: 580, name: 'Escola C' },
            { value: 484, name: 'Escola D' },
            { value: 300, name: 'Escola E' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    })

    const performanceChart = echarts.init(document.getElementById('performance-chart') as HTMLElement)
    performanceChart.setOption({
      title: {
        text: 'Desempenho Acadêmico Médio',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [85, 88, 90, 87, 85, 89, 92, 91, 85, 87, 88, 90],
          type: 'line',
          smooth: true,
        },
      ],
    })

    const attendanceChart = echarts.init(document.getElementById('attendance-chart') as HTMLElement)
    attendanceChart.setOption({
      title: {
        text: 'Taxa de Frequência',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        type: 'value',
        max: 100,
      },
      series: [
        {
          data: [95, 96, 94, 93, 95, 97, 98, 96, 95, 94, 93, 92],
          type: 'bar',
          color: '#73C9E6',
        },
      ],
    })

    const financialChart = echarts.init(document.getElementById('financial-chart') as HTMLElement)
    financialChart.setOption({
      title: {
        text: 'Indicadores Financeiros',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Receita', 'Despesas'],
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Receita',
          type: 'line',
          data: [12000, 15000, 17000, 14000, 18000, 21000, 23000, 22000, 19000, 21000, 23000, 24000],
        },
        {
          name: 'Despesas',
          type: 'line',
          data: [8000, 9000, 10000, 11000, 9500, 12000, 14000, 13000, 12000, 14000, 15000, 16000],
        },
      ],
    })
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      initializeCharts()
      observer.disconnect()
    }
  })

  observer.observe(document.getElementById('students-chart') as HTMLElement)
})
</script>

<template>
  <content-layout>
    <div id="container">
      <strong class="capitalize">Dashboard Home page</strong>
      <p class="ion-padding" />
      <div id="students-chart" class="chart" />
      <div id="performance-chart" class="chart" />
      <div id="attendance-chart" class="chart" />
      <div id="financial-chart" class="chart" />
    </div>
  </content-layout>
</template>

<style scoped>
#container {
  text-align: center;
  padding: 16px;
}

.chart {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
}
</style>
