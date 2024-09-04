// src/modules/institution/routes.ts
import { business, layers, school } from 'ionicons/icons'
import RegisterInstitution from './views/RegisterInstitution.vue'
import RegisterSchool from './views/RegisterSchool.vue'
import DashboardInstitution from './views/DashboardInstitution.vue'
import DashboardSchools from './views/DashboardSchools.vue'
import AcademicYear from './views/AcademicYear.vue'

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
      order: 3,
    },
  },
  {
    path: '/Institutions/school/register',
    name: 'RegisterSchool',
    component: RegisterSchool,
    meta: {
      moduleName: 'Institutions',
      moduleIcon: school,
      icon: school,
      name: 'Cad Escola',
      order: 4,
    },
  },
  {
    path: '/Institutions/academic/years',
    name: 'RegisterSchool',
    component: AcademicYear,
    meta: {
      moduleName: 'Institutions',
      moduleIcon: layers,
      icon: layers,
      name: 'Ano Letivo',
      order: 5,
    },
  },
]

export default routes
