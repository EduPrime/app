<script setup lang="ts">
import LayoutBlank from '@/layouts/blank.vue'
import LayoutDefault from '@/layouts/default.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <LayoutDefault v-if="route.meta.layout != 'blank'">
    <ion-router-outlet id="main-content" />
  </LayoutDefault>
  <LayoutBlank v-else>
    <ion-router-outlet id="main-content" />
  </LayoutBlank>
</template>
<!-- <pre>
  route: {{ route.meta.layout }}
</pre> -->
