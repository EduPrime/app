<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  studentCount: number
  teacherCount: number
  classCount: number
  approvalRate: number
}>()
</script>

<template>
  <ion-row>
    <ion-col size="12" size-md="6" size-lg="3">
      <ion-card color="primary">
        <ion-card-header>
          <ion-card-title class="ion-text-uppercase ion-text-wrap ion-text-center ion-text-sm">
            Alunos
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl ion-text-center">
            {{ props.studentCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>

    <ion-col size="12" size-md="6" size-lg="3">
      <ion-card color="secondary">
        <ion-card-header>
          <ion-card-title class="ion-text-xs ion-text-center">
            Docentes
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl ion-text-center">
            {{ props.teacherCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>

    <ion-col size="12" size-md="6" size-lg="3">
      <ion-card color="tertiary">
        <ion-card-header>
          <ion-card-title class="ion-text-uppercase ion-text-wrap ion-text-center ion-text-sm">
            Turmas
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl ion-text-center">
            {{ props.classCount }}
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>

    <ion-col size="12" size-md="6" size-lg="3">
      <ion-card color="success">
        <ion-card-header>
          <ion-card-title class="ion-text-xs-center ion-text-center">
            Aprovação
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h1 class="ion-text-xxl ion-text-center">
            {{ props.approvalRate }}%
          </h1>
        </ion-card-content>
      </ion-card>
    </ion-col>
  </ion-row>
</template>
