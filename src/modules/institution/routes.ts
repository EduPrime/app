// src/modules/institution/routes.ts
import { business, layers, school } from 'ionicons/icons'
import RegisterInstitution from './views/RegisterInstitution.vue'
import RegisterSchool from './views/RegisterSchool.vue'
import DashboardInstitution from './views/DashboardInstitution.vue'
import DashboardSchools from './views/DashboardSchools.vue'
import AcademicYear from './views/AcademicYear.vue'
import RegisterAcademicTemplate from './views/RegisterAcademicTemplate.vue'

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
      showInTab: true,
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
      showInTab: true,
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
      showInTab: true,
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
      showInTab: true,
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
      order: 5,
      showInTab: true,
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
      order: 6,
      showInTab: true,
    },
  },
]

export default routes
