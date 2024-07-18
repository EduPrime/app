// src/modules/institution/routes.ts
import { business, school } from 'ionicons/icons'
import RegisterInstitution from './views/RegisterInstitution.vue'
import DashboardInstitution from './views/DashboardInstitution.vue'
import DashboardSchools from './views/DashboardSchools.vue'

const routes = [
  {
    path: '/Institutions/',
    name: 'DashboardInstitution',
    component: DashboardInstitution,
    meta: {
      moduleName: 'Institutions',
      moduleIcon: business,
      icon: business,
      name: 'Instituição',
      order: 1,
    },
  },
  {
    path: '/Institutions/register',
    name: 'RegisterInstitution',
    component: RegisterInstitution,
    meta: {
      moduleName: 'Institutions',
      moduleIcon: business,
      icon: business,
      name: 'Cad Instituição',
      order: 2,
    },
  },
  {
    path: '/Institutions/schools',
    name: 'InstitutionListInstitutions',
    component: DashboardSchools,
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
