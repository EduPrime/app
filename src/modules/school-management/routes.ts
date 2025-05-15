import { book, create, list, people, person, school } from 'ionicons/icons'
import DashboardClass from './views/DashboardClass.vue'
import DashboardCourse from './views/DashboardCourse.vue'
import DashboardFunction from './views/DashboardFunction.vue'
import DashboardSchools from './views/DashboardSchools.vue'
import DashboardSeries from './views/DashboardSeries.vue'
import RegisterClass from './views/RegisterClass.vue'
import RegisterCourse from './views/RegisterCourse.vue'
import RegisterFunction from './views/RegisterFunction.vue'
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
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
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
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
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
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
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
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
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
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
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
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },
  {
    path: '/Course/list',
    name: 'CourseListCourse',
    component: DashboardCourse,
    meta: {
      moduleName: 'Schools',
      moduleIcon: school,
      icon: book,
      name: 'Cursos',
      order: 10,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },

  {
    path: '/Course/register',
    name: 'RegisterCourse',
    component: RegisterCourse,
    meta: {
      moduleName: 'Schools',
      icon: create,
      name: 'Registrar curso',
      order: 12,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },
  {
    path: '/Function/list',
    name: 'FunctionListFunction',
    component: DashboardFunction,
    meta: {
      moduleName: 'Schools',
      moduleIcon: school,
      icon: person,
      name: 'Funções de servidor',
      order: 13,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },
  {
    path: '/Function/register',
    name: 'RegisterFunction',
    component: RegisterFunction,
    meta: {
      moduleName: 'Schools',
      icon: create,
      name: 'Registrar função',
      order: 14,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },
]

export default routes
