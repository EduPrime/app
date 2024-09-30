<script lang="ts" setup>
import ContentLayout from '@/components/theme/ContentLayout.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import RoleService from '../../services/RoleService'
import UserService from '../../services/UserService'

const user = ref({ name: '', email: '', role_id: '' })
const roles = ref([])
const route = useRoute()
const userId = route.params.id

async function fetchRoles() {
  const roleService = new RoleService()
  roles.value = await roleService.getAll()
}

async function fetchUser() {
  const userService = new UserService()
  user.value = await userService.getById(userId)
}

async function updateUser() {
  const userService = new UserService()
  await userService.update(userId, user.value)
  // Optionally navigate back to user list
}

onMounted(() => {
  fetchRoles()
  fetchUser()
})
</script>

<template>
  <ContentLayout>
    <div>
      <h1>Update User</h1>
      <!-- <ion-item>
        <ion-label>Role</ion-label>
        <ion-select v-model="roleId" placeholder="Select Role">
          <ion-select-option v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.name }}
          </ion-select-option>
        </ion-select>
      </ion-item>
      <ion-button expand="block" @click="assignRole">
        Assign Role
      </ion-button> -->
      <form @submit.prevent="updateUser">
        <ion-list>
          <ion-item>
            <ion-label position="stacked">
              Name
            </ion-label>
            <ion-input v-model="user.name" required />
          </ion-item>

          <ion-item>
            <ion-label position="stacked">
              Email
            </ion-label>
            <ion-input v-model="user.email" required />
          </ion-item>

          <ion-item>
            <ion-label position="stacked">
              Role
            </ion-label>
            <ion-select v-model="user.role_id" placeholder="Select Role" required>
              <ion-select-option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.name }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <ion-toolbar>
            <ion-button type="submit" @click="updateUser">
              Update User
            </ion-button>
          </ion-toolbar>
        </ion-list>
      </form>
    </div>
  </ContentLayout>
</template>
