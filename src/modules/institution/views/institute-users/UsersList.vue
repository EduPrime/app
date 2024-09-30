<script setup lang="ts">
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { add, eyeOutline, lockClosedOutline, pencilOutline } from 'ionicons/icons'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import UserService from '../../services/UserService'

const users = ref([
  {
    fullname: 'Test User',
    email: 'test@user.com',
    id: 'TestId',
  },
])
const router = useRouter()

async function loadUsers() {
  // const users = await UserService.getAllUserRolesForSchool('938c105e-2c5e-4a64-90a5-4b40120aa801')
  users.value = await UserService.getUsers()
}

function manageRoles(userId: string) {
  router.push({ name: 'UserPermissions', params: { userid: userId } })
}
function editUser(userId: string) {
  router.push({ name: 'UpdateUser', params: { userid: userId } })
}
function viewProfile(userId: string) {
  router.push({ name: 'ViewUser', params: { userid: userId } })
}
onMounted(loadUsers)
</script>

<template>
  <ContentLayout>
    <ion-toolbar>
      <ion-searchbar />
    </ion-toolbar>
    <ion-item lines="none">
      <ion-checkbox slot="start" />
      <ion-label slot="start">
        Select all
      </ion-label>
      <ion-button slot="end" size="medium" router-link="/Institutions/users/create">
        <ion-icon :icon="add" />
      </ion-button>
    </ion-item>
    <ion-item v-for="user in users" :key="user.id">
      <ion-checkbox slot="start" />
      <ion-label>
        <h2><b>{{ user.fullname }}</b></h2>
        <p>{{ user.email }}</p>
      </ion-label>
      <ion-buttons slot="end">
        <ion-button title="Manage Roles" @click="manageRoles(user.id)">
          <ion-icon slot="icon-only" :icon="lockClosedOutline" />
        </ion-button>
        <ion-button title="Edit User" @click="editUser(user.id)">
          <ion-icon slot="icon-only" :icon="pencilOutline" />
        </ion-button>
        <ion-button title="User Profile" @click="viewProfile(user.id)">
          <ion-icon slot="icon-only" :icon="eyeOutline" />
        </ion-button>
      </ion-buttons>
    </ion-item>
  </ContentLayout>
</template>
