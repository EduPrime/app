import { book, create, list, people, school } from 'ionicons/icons'
import DashboardClass from './views/DashboardClass.vue'
import DashboardCourse from './views/DashboardCourse.vue'
import DashboardSchools from './views/DashboardSchools.vue'
import DashboardSeries from './views/DashboardSeries.vue'
import EditClass from './views/EditClass.vue'
import EditCourse from './views/EditCourse.vue'
import EditSchools from './views/EditSchools.vue'
import EditSeries from './views/EditSeries.vue'
import RegisterClass from './views/RegisterClass.vue'
import RegisterCourse from './views/RegisterCourse.vue'
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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
  {
    path: '/Course/edit/:id',
    name: 'EditCourse',
    component: EditCourse,
    meta: {
      moduleName: 'Schools',
      icon: create,
      name: 'Editar curso',
      order: 11,
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
]

export default routes
