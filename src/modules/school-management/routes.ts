import { create, person, school, trailSign } from 'ionicons/icons'
import CourseDetailsDesktop from './views/course/DetailsDesktop.vue'
import RegisterCourse from './views/course/Register.vue'
import DashboardCorses from './views/DashboardCourses.vue'
import DashboardFunction from './views/DashboardFunction.vue'
import DashboardSchools from './views/DashboardSchools.vue'
import FunctionDetailsDesktop from './views/FunctionDetailsDesktop.vue'
import RegisterFunction from './views/RegisterFunction.vue'
import RegisterSchool from './views/RegisterSchool.vue'

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

  // {
  //   path: '/Schools/edit/:id',
  //   name: 'EditSchools',
  //   component: EditSchools,
  //   moduleName: 'Schools',
  //   moduleIcon: school,
  //   meta: {
  //     moduleName: 'Schools',
  //     icon: create,
  //     name: 'Editar escola',
  //     order: 2,
  //     requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
  //   },
  // },
  // {
  //   path: '/Class/list',
  //   name: 'ClassListClass',
  //   component: DashboardClass,
  //   meta: {
  //     moduleName: 'Schools',
  //     moduleIcon: school,
  //     icon: people,
  //     name: 'Turmas',
  //     order: 4,
  //     requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
  //   },
  // },
  // {
  //   path: '/Class/register',
  //   name: 'RegisterClass',
  //   component: RegisterClass,
  //   meta: {
  //     moduleName: 'Schools',
  //     icon: create,
  //     name: 'Registrar turma',
  //     order: 5,
  //     requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
  //   },
  // },
  // {
  //   path: '/Class/edit/:id',
  //   name: 'EditClass',
  //   component: EditClass,
  //   meta: {
  //     moduleName: 'Schools',
  //     icon: create,
  //     name: 'Editar turma',
  //     order: 6,
  //     requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
  //   },
  // },
  // {
  //   path: '/Series/list',
  //   name: 'SeriesListSeries',
  //   component: DashboardSeries,
  //   meta: {
  //     moduleName: 'Schools',
  //     moduleIcon: school,
  //     icon: list,
  //     name: 'Séries',
  //     order: 7,
  //     requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
  //   },
  // },
  // {
  //   path: '/Series/edit/:id',
  //   name: 'EditSeries',
  //   component: EditSeries,
  //   meta: {
  //     moduleName: 'Schools',
  //     icon: create,
  //     name: 'Editar série',
  //     order: 8,
  //     requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
  //   },
  // },
  // {
  //   path: '/Series/register',
  //   name: 'RegisterSeries',
  //   component: RegisterSeries,
  //   meta: {
  //     moduleName: 'Schools',
  //     icon: create,
  //     name: 'Registrar série',
  //     order: 9,
  //     requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
  //   },
  // },
  // {
  //   path: '/Course/list',
  //   name: 'CourseListCourse',
  //   component: DashboardCourse,
  //   meta: {
  //     moduleName: 'Schools',
  //     moduleIcon: school,
  //     icon: book,
  //     name: 'Cursos',
  //     order: 10,
  //     requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
  //   },
  // },
  // {
  //   path: '/Course/edit/:id',
  //   name: 'EditCourse',
  //   component: EditCourse,
  //   meta: {
  //     moduleName: 'Schools',
  //     icon: create,
  //     name: 'Editar curso',
  //     order: 11,
  //     requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
  //   },
  // },
  // {
  //   path: '/Course/register',
  //   name: 'RegisterCourse',
  //   component: RegisterCourse,
  //   meta: {
  //     moduleName: 'Schools',
  //     icon: create,
  //     name: 'Registrar curso',
  //     order: 12,
  //     requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
  //   },
  // },
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
    path: '/Function/register/:id?',
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

  {
    path: '/Course/register/:id?',
    name: 'NewCourse',
    component: RegisterCourse,
    meta: {
      moduleName: 'Schools',
      icon: create, // @TODO: Change icon
      name: 'Registrar curso',
      order: 14,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },

  {
    path: '/Function/details/:id',
    name: 'FunctionDetails',
    component: FunctionDetailsDesktop,
    meta: {
      moduleName: 'Schools',
      icon: person,
      name: 'Detalhes da função',
      order: 15,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },

  {
    path: '/Course/details/:id',
    name: 'CourseDetails',
    component: CourseDetailsDesktop,
    meta: {
      moduleName: 'Schools',
      icon: person, // @TODO: Change icon
      name: 'Detalhes do curso',
      order: 15,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },
  // {
  //   path: '/Courses/list',
  //   name: 'RegisterCourse',
  //   component: DashboardCurses,
  //   meta: {
  //     moduleName: 'Schools',
  //     icon: trailSign,
  //     name: 'Registrar curso',
  //     order: 16,
  //     requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
  //   },
  // },

  {
    path: '/Courses/list',
    name: 'RegisterCourse',
    component: DashboardCorses,
    meta: {
      moduleName: 'Schools',
      moduleIcon: school,
      icon: trailSign,
      name: 'Registrar curso',
      order: 16,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },
]

export default routes
