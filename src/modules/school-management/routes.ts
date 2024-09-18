import { calendar, chatbubbles, create, document, list, person, school, star } from 'ionicons/icons'
import DashboardSchools from './views/DashboardSchools.vue'
import EditSchools from './views/EditSchools.vue'
import EditClass from './views/EditClass.vue'
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
      moduleName: 'Schools',
      icon: create,
      name: 'Editar escola',
      order: 2,
      requiredRole: ['public'],
    },
  },
  {
    path: '/Schools/register',
    name: 'RegisterSchool',
    component: RegisterSchool,
    meta: {
      moduleName: 'Schools',
      icon: create,
      name: 'Registrar escola',
      order: 3,
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
      order: 4,
      requiredRole: ['public'],
    },
  },
  {
    path: '/Class/register',
    name: 'RegisterClass',
    component: RegisterClass,
    meta: {
      moduleName: 'Schools',
      icon: create,
      name: 'Registrar turma',
      order: 5,
      requiredRole: ['public'],
    },
  },
  {
    path: '/Class/edit/:id',
    name: 'EditClass',
    component: EditClass,
    meta: {
      moduleName: 'Schools',
      icon: create,
      name: 'Editar turma',
      order: 6,
      requiredRole: ['public'],
    },
  },
]

export default routes
