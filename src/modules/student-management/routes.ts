import { create } from 'ionicons/icons'
// import DashboardStudent from './views/DashboardStudent.vue'
// import EditStudent from './views/EditStudent.vue'
/* import MoveStudent from './views/MoveStudent.vue' */
/* import RegisterPre_enrollment from './views/RegisterPre_enrollment.vue' */
// import RegisterStudent from './views/RegisterStudent.vue'
import DashboardEnrollment from './views/DashboardEnrollment.vue'

const routes = [
  // {
  //  path: '',
  //  redirect: '/student',
  //  meta: {
  //    requiredRole: ['GESTORESCOLAR'],
  //  },
  // },
  // {
  //   path: '/student',
  //   name: 'StudentList',
  //   component: DashboardStudent,
  //   meta: {
  //     moduleName: 'Student',
  //     moduleIcon: folder,
  //     icon: folder,
  //     name: 'Alunos',
  //     order: 1,
  //     requiredRole: ['ADMIN', 'GESTORESCOLAR'],
  //   },
  // },
  // {
  //   path: '/student/register',
  //   name: 'StudentRegister',
  //   component: RegisterStudent,
  //   meta: {
  //     moduleName: 'Student',
  //     icon: folder,
  //     name: 'Cadastrar Aluno',
  //     order: 2,
  //     requiredRole: ['ADMIN', 'GESTORESCOLAR'],
  //   },
  // },
  // {
  //   path: '/student/edit/:id',
  //   name: 'StudentEdit',
  //   component: EditStudent,
  //   meta: {
  //     moduleName: 'Student',
  //     icon: folder,
  //     name: 'Editar Aluno',
  //     order: 3,
  //     requiredRole: ['ADMIN', 'GESTORESCOLAR'],
  //   },
  // },
  {
    path: '/student/enrollment',
    name: 'EnrollmentList',
    component: DashboardEnrollment,
    meta: {
      moduleName: 'Student',
      moduleIcon: create,
      icon: create,
      name: 'Solicitações de matrícula',
      order: 2,
      requiredRole: ['ADMIN', 'GESTORESCOLAR'],
    },
  },
  // {
  //   path: '/student/enrollment/register',
  //   name: 'EnrollmentRegister',
  //   component: RegisterEnrollment,
  //   meta: {
  //     moduleName: 'Student',
  //     icon: create,
  //     name: 'Matricular Aluno',
  //     order: 3,
  //     requiredRole: ['ADMIN', 'GESTORESCOLAR'],
  //   },
  // },
  // {
  //   path: '/student/enrollment/edit/:id',
  //   name: 'EnrollmentEdit',
  //   component: EditEnrollment,
  //   meta: {
  //     moduleName: 'Student',
  //     icon: create,
  //     name: 'Editar Matrícula',
  //     order: 4,
  //     requiredRole: ['ADMIN', 'GESTORESCOLAR'],
  //   },
  // },
  /*   {
    path: '/student/enrollment/move/:id',
    name: 'StudentMove',
    component: MoveStudent,
    meta: {
      moduleName: 'Student',
      icon: swapHorizontal,
      name: 'Enturmar Aluno',
      order: 5,
      requiredRole: ['public', 'admin'],
    },
  },
  {
    path: '/student/pre-enrollment',
    name: 'Pre_enrollmentList',
    component: DashboardPre_enrollment,
    meta: {
      moduleName: 'Student',
      moduleIcon: documentText,
      icon: documentText,
      name: 'Pré-matrícula',
      order: 5,
      requiredRole: ['ADMIN'],
    },
  },
  {
    path: '/student/pre-enrollment/register',
    name: 'Pre_enrollmentRegister',
    component: RegisterPre_enrollment,
    meta: {
      moduleName: 'Student',
      icon: documentText,
      name: 'Realizar Pré-matrícula',
      order: 6,
      requiredRole: ['public', 'admin'],
    },
  },
  {
    path: '/student/pre-enrollment/edit/:id',
    name: 'Pre_enrollmentEdit',
    component: EditPre_enrollment,
    meta: {
      moduleName: 'Student',
      icon: documentText,
      name: 'Editar Pré-matrícula',
      order: 6,
      requiredRole: ['ADMIN'],
    },
  }, */
]

export default routes
