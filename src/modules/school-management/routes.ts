// src/modules/class-registration/routes.ts
import { school } from 'ionicons/icons'
import ClassRegistration from './views/ClassRegistration.vue'

const routes = [
  {
    path: '/class-registration',
    name: 'ClassRegistration',
    component: ClassRegistration,
    meta: {
      moduleName: 'ClassRegistration',
      moduleIcon: school,
      icon: school,
      name: 'Cadastro de Turmas',
      order: 1,
    },
  },
]

export default routes