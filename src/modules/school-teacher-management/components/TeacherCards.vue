<script setup lang="ts">
const props = defineProps<{
  schoolCount: number
  teacherCount: number
  seriesCount: number
  studentCount: number
}>()
</script>

<template>
  <ion-row>
    <ion-col size="6" size-md="6" size-lg="3">
      <ion-card color="primary">
        <ion-card-header>
          <ion-card-title>
            Escolas
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl">
            {{ props.schoolCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>

    <ion-col size="6" size-md="6" size-lg="3">
      <ion-card color="secondary">
        <ion-card-header>
          <ion-card-title>
            Docentes
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl">
            {{ props.teacherCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>

    <ion-col size="6" size-md="6" size-lg="3">
      <ion-card color="tertiary">
        <ion-card-header>
          <ion-card-title>
            Turmas
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl">
            {{ props.seriesCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>

    <ion-col size="6" size-md="6" size-lg="3">
      <ion-card color="lightaccent">
        <ion-card-header>
          <ion-card-title>
            Alunos
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl">
            {{ props.studentCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>
  </ion-row>
</template>

<style scoped>
ion-card {
  box-shadow: none;
  border-radius: 15px;
}

h1 {
  font-weight: 700;
}
</style>
