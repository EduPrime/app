import type { CustomRouteRecordRaw } from '@/router/RouterType'
// src/modules/institution/routes.ts
import { business, layers } from 'ionicons/icons'
import AcademicYear from './views/AcademicYear.vue'
import DashboardInstitution from './views/DashboardInstitution.vue'
import RegisterAcademicTemplate from './views/RegisterAcademicTemplate.vue'
import RegisterInstitution from './views/RegisterInstitution.vue'

const routes: Array<CustomRouteRecordRaw> = [
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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
  {
    path: '/Institutions/academic/years',
    name: 'AcademicYear',
    component: AcademicYear,
    meta: {
      moduleName: 'Institutions',
      moduleIcon: layers,
      icon: layers,
      name: 'Ano Letivo',
      order: 6,
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],

    },
  },
  {
    path: '/Institutions/academic/addTemplate',
    name: 'RegisterAcademicTemplate',
    component: RegisterAcademicTemplate,
    meta: {
      moduleName: 'Institutions',
      moduleIcon: layers,
      icon: layers,
      name: 'Modelo ano letivo',
      order: 7,
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
]

export default routes
