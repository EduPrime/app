<script setup lang="ts">
import LayoutBlank from '@/layouts/blank.vue'
import LayoutDefault from '@/layouts/default.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <LayoutBlank v-if="route.meta.layout === 'blank'">
    <ion-router-outlet id="main-content" />
  </LayoutBlank>
  <LayoutDefault v-else>
    <ion-router-outlet id="main-content" />
  </LayoutDefault>
</template>
<!-- <pre>
  route: {{ route.meta.layout }}
</pre> -->
