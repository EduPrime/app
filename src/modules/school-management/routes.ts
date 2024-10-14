import { create, list, people, school } from 'ionicons/icons'
import DashboardClass from './views/DashboardClass.vue'
import DashboardSchools from './views/DashboardSchools.vue'
import DashboardSeries from './views/DashboardSeries.vue'
import EditClass from './views/EditClass.vue'
import EditSchools from './views/EditSchools.vue'
import EditSeries from './views/EditSeries.vue'
import RegisterClass from './views/RegisterClass.vue'
import RegisterSchool from './views/RegisterSchool.vue'
import RegisterSeries from './views/RegisterSeries.vue'

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
      icon: people,
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
  {
    path: '/Series/list',
    name: 'SeriesListSeries',
    component: DashboardSeries,
    meta: {
      moduleName: 'Schools',
      moduleIcon: school,
      icon: list,
      name: 'Séries',
      order: 7,
      requiredRole: ['public'],
    },
  },
  {
    path: '/Series/edit/:id',
    name: 'EditSeries',
    component: EditSeries,
    meta: {
      moduleName: 'Schools',
      icon: create,
      name: 'Editar série',
      order: 8,
      requiredRole: ['public'],
    },
  },
  {
    path: '/Series/register',
    name: 'RegisterSeries',
    component: RegisterSeries,
    meta: {
      moduleName: 'Schools',
      icon: create,
      name: 'Registrar série',
      order: 9,
      requiredRole: ['public'],
    },
  },
]

export default routes
