<script setup lang="ts">
import EpInput from '@/components/EpInput.vue'
import ContentLayout from '@/components/theme/ContentLayout.vue'
import showToast from '@/utils/toast-alert'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
// import { useRoute } from 'vue-router'
import { object, string } from 'yup'
import SchoolService from '../../services/SchoolService'
import UserService from '../../services/UserService'

const formSchema = object({
  school: string().required('Please select School'),
  name: string()
    .required('Nome é obrigatório')
    .min(12, 'O nome deve ter pelo menos 12 caracteres'),
  email: string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: string().required('Password é obrigatório'),
  role: string().required('Please select User Role'),
})

const { values, errors, validate, setValues } = useForm<any>({
  validationSchema: formSchema,
})
const roles = ref()
const schools = ref()

async function loadSchools() {
  const schoolService = new SchoolService()
  schools.value = await schoolService.getAll()
}

async function loadRoles(event: any) {
  setValues({ school: event.detail.value })
  if (values) {
    // If need to fetch school based Roles.
    roles.value = (await UserService.getAllUserRolesForSchool(event.detail.value)).data ?? []
    // roles.value = await UserService.getAllRoles()
    /**
     * TODO: | Suggestion
     * We can have Roles Globally instead of School based, so we don't need to specify school based roles.
     * Temparory calling getAllRoles to fetch available roles.
     * For school roles we can fetch school roles also and can assign to new user.
     */
  }
  else {
    showToast('Please Select School first.', 'top', 'warning')
  }
}
async function createUserEntity() {
  const validationResult = await validate()

  if (!validationResult.valid) {
    const displayErrors = Object.values(errors.value).join(', ')
    showToast(displayErrors, 'top', 'warning')
  }
  else {
    const result = await UserService.createAuthUser(
      values.email,
      values.password,
      values.role,
      values.school,
    )
    if (result?.user) {
      showToast('User Created Successfully', 'top', 'success')
    }
  }
}

function onRoleSelect(event: any) {
  setValues({ role: event.detail.value })
}

onMounted(() => {
  loadSchools()
})
</script>

<template>
  <ContentLayout>
    <ion-label placement="stacked">
      School
    </ion-label>
    <ion-select v-if="schools" v-model="values.school" name="school" fill="outline" placeholder="Select School"
      @ion-change="loadRoles($event)">
      <ion-select-option v-for="(item, index) in schools " :key="index" :value="item.id">
        {{ item.name }}
      </ion-select-option>
    </ion-select>
    <EpInput v-model="values.name" name="name" label="Full Name" placeholder="Full Name" />
    <EpInput v-model="values.email" name="email" label="Email" placeholder="Email" />
    <EpInput v-model="values.password" name="password" label="Password" placeholder="Password" />
    <ion-label>Select Role</ion-label>
    <ion-select v-if="roles" v-model="values.role" fill="outline" name="role" placeholder="Select Role"
      @ion-change="onRoleSelect($event)">
      <ion-select-option v-for="(roleItem, index) in roles" :key="index" :value="roleItem.id">
        {{ roleItem.name }}
      </ion-select-option>
    </ion-select>
    <ion-toolbar>
      <ion-button slot="end" @click="createUserEntity">
        Submit
      </ion-button>
    </ion-toolbar>
  </ContentLayout>
</template>
