import { create, person, school, albums, business } from 'ionicons/icons'
import DashboardFunction from './views/DashboardFunction.vue'
import DashboardClassroom from './views/classroom/DashboardClassroom.vue'
import RegisterClassroom from './views/classroom/RegisterClassroom.vue'
import ClassroomDetailsDesktop from './views/classroom/ClassroomDetailsDesktop.vue'
// import DashboardSchools from './views/DashboardSchools.vue'
import FunctionDetailsDesktop from './views/FunctionDetailsDesktop.vue'
import RegisterFunction from './views/RegisterFunction.vue'
// import RegisterSchool from './views/RegisterSchool.vue'
import DashboardInstitution from './views/institution/DashboardInstitution.vue'
import RegisterInstitution from './views/institution/RegisterInstitution.vue'
import InstitutionDetailsDesktop from './views/institution/InstitutionDetailsDesktop.vue'

const routes = [
  // {
  //   path: '/Schools/list',
  //   name: 'InstitutionListInstitutions',
  //   component: DashboardSchools,
  //   meta: {
  //     moduleName: 'Schools',
  //     moduleIcon: school,
  //     icon: school,
  //     name: 'Escolas',
  //     order: 1,
  //     requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
  //   },
  // },
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
  //   path: '/Schools/register',
  //   name: 'RegisterSchool',
  //   component: RegisterSchool,
  //   meta: {
  //     moduleName: 'Schools',
  //     icon: create,
  //     name: 'Registrar escola',
  //     order: 3,
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
    path: '/Classroom/list',
    name: 'ClassroomListClassroom',
    component: DashboardClassroom,
    meta: {
      moduleName: 'Schools',
      moduleIcon: school,
      icon: albums,
      name: 'Turmas',
      order: 16,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },
  {
    path: '/Classroom/register/:id?',
    name: 'RegisterClassroom',
    component: RegisterClassroom,
    meta: {
      moduleName: 'Schools',
      icon: create,
      name: 'Registrar turma',
      order: 17,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },
  {
    path: '/Classroom/details/:id',
    name: 'ClassroomDetails',
    component: ClassroomDetailsDesktop,
    meta: {
      moduleName: 'Schools',
      icon: school,
      name: 'Detalhes da turma',
      order: 18,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },
  {
    path: '/Institution/list',
    name: 'DashboardInstitution',
    component: DashboardInstitution,
    meta: {
      moduleName: 'Schools',
      moduleIcon: school,
      icon: business,
      name: 'Instituições',
      order: 19,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },
  {
    path: '/Institution/register/:id?',
    name: 'RegisterInstitution',
    component: RegisterInstitution,
    meta: {
      moduleName: 'Schools',
      icon: create,
      name: 'Registrar instituição',
      order: 20,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },
  {
    path: '/Institution/details/:id',
    name: 'InstitutionDetails',
    component: InstitutionDetailsDesktop,
    meta: {
      moduleName: 'Schools',
      icon: business,
      name: 'Detalhes da instituição',
      order: 21,
      requiredRole: ['ADMIN', 'GESTORMUNICIPAL', 'GESTORESCOLAR'],
    },
  },
]

export default routes
