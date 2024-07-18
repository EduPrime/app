<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  schoolCount: number
  classCount: number
  seriesCount: number
  teacherCount: number
}>()
</script>

<template>
  <ion-row>
    <ion-col size="12" size-md="6" size-lg="3">
      <ion-card color="primary">
        <ion-card-header>
          <ion-card-title>Escolas</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl">
            {{ props.schoolCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>

    <ion-col size="12" size-md="6" size-lg="3">
      <ion-card color="secondary">
        <ion-card-header>
          <ion-card-title>Turmas</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl">
            {{ props.classCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>

    <ion-col size="12" size-md="6" size-lg="3">
      <ion-card color="tertiary">
        <ion-card-header>
          <ion-card-title>Séries</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl">
            {{ props.seriesCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>

    <ion-col size="12" size-md="6" size-lg="3">
      <ion-card color="success">
        <ion-card-header>
          <ion-card-title>Docentes</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl">
            {{ props.teacherCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>
  </ion-row>
</template>
