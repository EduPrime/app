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
    path: '/Institutions/schools/manage/:id',
    name: 'ManageSchools',
    component: DashboardSchools,
    meta: {
      moduleName: 'Institutions',
      moduleIcon: school,
      icon: school,
      name: 'Atual Escolas',
      order: 3,
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
      order: 4,
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
      order: 5,
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
    },
  },
]

export default routes
