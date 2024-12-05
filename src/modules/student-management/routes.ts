import { create, documentText, folder, swapHorizontal } from 'ionicons/icons'
import DashboardEnrollment from './views/DashboardEnrollment.vue'
import DashboardModal from './views/DashboardModal.vue'
import DashboardPre_enrollment from './views/DashboardPre_enrollment.vue'
import DashboardStudent from './views/DashboardStudent.vue'
import EditEnrollment from './views/EditEnrollment.vue'
import EditModal from './views/EditModal.vue'
import EditPre_enrollment from './views/EditPre_enrollment.vue'
import EditStudent from './views/EditStudent.vue'
/* import MoveStudent from './views/MoveStudent.vue' */
import RegisterEnrollment from './views/RegisterEnrollment.vue'
import RegisterModal from './views/RegisterModal.vue'
/* import RegisterPre_enrollment from './views/RegisterPre_enrollment.vue' */
import RegisterStudent from './views/RegisterStudent.vue'

const routes = [
  {
    path: '/student',
    name: 'StudentList',
    component: DashboardStudent,
    meta: {
      moduleName: 'Student',
      moduleIcon: folder,
      icon: folder,
      name: 'Alunos',
      order: 1,
      requiredRole: ['public', 'admin'],
    },
  },
  {
    path: '/student/register',
    name: 'StudentRegister',
    component: RegisterStudent,
    meta: {
      moduleName: 'Student',
      icon: folder,
      name: 'Cadastrar Aluno',
      order: 2,
      requiredRole: ['public', 'admin'],
    },
  },
  {
    path: '/student/edit/:id',
    name: 'StudentEdit',
    component: EditStudent,
    meta: {
      moduleName: 'Student',
      icon: folder,
      name: 'Editar Aluno',
      order: 3,
      requiredRole: ['public', 'admin'],
    },
  },
  {
    path: '/student/enrollment',
    name: 'EnrollmentList',
    component: DashboardEnrollment,
    meta: {
      moduleName: 'Student',
      moduleIcon: create,
      icon: create,
      name: 'Matrículas',
      order: 2,
      requiredRole: ['public'],
    },
  },
  {
    path: '/student/enrollment/register',
    name: 'EnrollmentRegister',
    component: RegisterEnrollment,
    meta: {
      moduleName: 'Student',
      icon: create,
      name: 'Matricular Aluno',
      order: 3,
      requiredRole: ['public', 'admin'],
    },
  },
  {
    path: '/student/enrollment/edit/:id',
    name: 'EnrollmentEdit',
    component: EditEnrollment,
    meta: {
      moduleName: 'Student',
      icon: create,
      name: 'Editar Matrícula',
      order: 4,
      requiredRole: ['public', 'admin'],
    },
  },
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
  }, */
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
      requiredRole: ['public', 'admin'],
    },
  },
  /*   {
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
  }, */
  {
    path: '/student/pre-enrollment/edit/:id',
    name: 'Pre_enrollmentEdit',
    component: EditPre_enrollment,
    meta: {
      moduleName: 'Student',
      icon: documentText,
      name: 'Editar Pré-matrícula',
      order: 6,
      requiredRole: ['public', 'admin'],
    },
  },
  {
    path: '/student/modal',
    name: 'ModalList',
    component: DashboardModal,
    meta: {
      moduleName: 'Student',
      moduleIcon: create,
      icon: create,
      name: 'Modal',
      order: 7,
      requiredRole: ['public'],
    },
  },
  {
    path: '/student/modal/register',
    name: 'ModalRegister',
    component: RegisterModal,
    meta: {
      moduleName: 'Student',
      icon: create,
      name: 'Novo Modal',
      order: 8,
      requiredRole: ['public', 'admin'],
    },
  },
  {
    path: '/student/modal/edit/:id',
    name: 'ModalEdit',
    component: EditModal,
    meta: {
      moduleName: 'Student',
      icon: create,
      name: 'Editar Modal',
      order: 9,
      requiredRole: ['public', 'admin'],
    },
  },
]

export default routes
