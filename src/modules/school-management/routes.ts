import { school } from 'ionicons/icons'
import DashboardSchools from './views/DashboardSchools.vue'
import EditSchools from './views/EditSchools.vue'
import RegisterSchool from './views/RegisterSchool.vue'
import DashboardClass from './views/DashboardClass.vue'
import RegisterClass from './views/RegisterClass.vue'

const routes = [
  {
    path: '/Schools/list',
    name: 'InstitutionListInstitutions',
    component: DashboardSchools,
    meta: {
      moduleName: 'Schools',
      moduleIcon: school,
      icon: school,
      name: 'Escolas',
      order: 1,
      requiredRole: ['public'],
    },
  },
  {
    path: '/Schools/edit/:id',
    name: 'EditSchools',
    component: EditSchools,
    moduleName: 'Schools',
    moduleIcon: school,
    meta: {
      requiredRole: ['public'],
    },
  },
  {
    path: '/Schools/register',
    name: 'RegisterSchool',
    component: RegisterSchool,
    meta: {
      requiredRole: ['public'],
    },
  },
  {
    path: '/Class/list',
    name: 'ClassListClass',
    component: DashboardClass,
    meta: {
      moduleName: 'Schools',
      moduleIcon: school,
      icon: school,
      name: 'Turmas',
      order: 1,
      requiredRole: ['public'],
    },
  },
  {
    path: '/Class/register',
    name: 'RegisterClass',
    component: RegisterClass,
    meta: {
      requiredRole: ['public'],
    },
  },
  {
    path: '/Class/edit/:id',
    name: 'EditSchools',
    component: EditSchools,
    meta: {
      requiredRole: ['public'],
    },
  },
]

export default routes
