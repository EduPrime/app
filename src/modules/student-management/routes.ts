import { create, folder, swapHorizontal } from 'ionicons/icons'
import DashboardEnrollment from './views/DashboardEnrollment.vue'
import DashboardStudent from './views/DashboardStudent.vue'
import EditEnrollment from './views/EditEnrollment.vue'
import EditStudent from './views/EditStudent.vue'
import MoveStudent from './views/MoveStudent.vue'
import RegisterEnrollment from './views/RegisterEnrollment.vue'
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
  {
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
]

export default routes
