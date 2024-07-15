// src/modules/institution/routes.ts
import { business, school } from 'ionicons/icons'
import RegisterInstitution from './views/RegisterInstitution.vue'

const routes = [
  {
    path: '/Institutions/register',
    name: 'RegisterInstitution',
    component: RegisterInstitution,
    meta: {
      moduleName: 'Institutions',
      moduleIcon: business,
      icon: business,
      name: 'Instituição',
      order: 2,
    },
  },
  {
    path: '/Institutions/schools',
    name: 'InstitutionListInstitutions',
    component: RegisterInstitution,
    meta: {
      moduleName: 'Institutions',
      moduleIcon: school,
      icon: school,
      name: 'Escolas',
      order: 1,
    },
  },
]

export default routes
