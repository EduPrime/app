<script setup lang="ts">
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import UserService from '../../services/UserService'

const route = useRoute()
const roleId = route.params.roleId as string

const permissions = ref([
  {
    table: 'teacher',
    can_insert: true,
    can_update: true,
    can_delete: true,
  },
  {
    table: 'student',
    can_insert: true,
    can_update: true,
    can_delete: true,
  },
  {
    table: 'institute',
    can_insert: true,
    can_update: true,
    can_delete: true,
  },
  {
    table: 'school',
    can_insert: true,
    can_update: true,
    can_delete: true,
  },
])

async function loadPermissions() {
  permissions.value = await UserService.getRolePermissions(roleId)
}

async function savePermissions() {
  await UserService.updateRolePermissions(roleId, permissions.value)
}

onMounted(loadPermissions)
</script>

<template>
  <ContentLayout>
    <ion-toolbar>
      <ion-searchbar placeholder="Search Table" />
    </ion-toolbar>
    <ion-card v-for="(permission, index) in permissions" :key="index">
      <ion-list-header>
        <b>{{ permission.table }}</b>
      </ion-list-header>
      <ion-item>
        <ion-checkbox slot="start" v-model="permission.can_insert">
          Insert
        </ion-checkbox>
        <ion-checkbox slot="start" v-model="permission.can_update">
          Update
        </ion-checkbox>
        <ion-checkbox slot="start" v-model="permission.can_delete">
          Delete
        </ion-checkbox>
      </ion-item>
    </ion-card>

    <ion-item lines="none">
      <ion-button slot="start" size="medium" @click="savePermissions">
        Save
      </ion-button>
    </ion-item>
  </ContentLayout>
</template>
