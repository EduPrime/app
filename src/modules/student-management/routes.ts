import { flame, flameOutline, people, book, pencil, clipboard, document, folder, list, create } from 'ionicons/icons';
import DashboardStudent from './views/DashboardStudent.vue';
import DashboardEnrollment from './views/DashboardEnrollment.vue';
import RegisterStudent from './views/RegisterStudent.vue';
import RegisterEnrollment from './views/RegisterEnrollment.vue';
import EditStudent from './views/EditStudent.vue'
import EditEnrollment from './views/EditEnrollment.vue'

const routes = [
  {
    path: '/Student',
    name: 'Student Registration',
    component: DashboardStudent,
    meta: {
      moduleName: 'Student',
      moduleIcon: folder,
      icon: folder,
      name: 'Aluno',
      order: 1,
      requiredRole: ['public', 'admin'],
    },
  },
  {
    path: '/Student/register',
    name: 'RegisterStudent',
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
    path: '/Student/edit/:id',
    name: 'EditStudent',
    component: EditStudent,
    meta: {
      moduleName: 'Student',
      icon: folder,
      name: 'Editar Cadastro',
      order: 3,
      requiredRole: ['public', 'admin'],
    },
  },
  {
    path: '/Student/enrollment',
    name: 'DashboardEnrollment',
    component: DashboardEnrollment,
    meta: {
      moduleName: 'Student',
      moduleIcon: create,
      icon: create,
      name: 'Matrícula',
      order: 2,
      requiredRole: ['public'],
    },
  },
  {
    path: '/Student/enrollment/register',
    name: 'RegisterEnrollment',
    component: RegisterEnrollment,
    meta: {
      moduleName: 'Student',
      icon: folder,
      name: 'Matricular Aluno',
      order: 3,
      requiredRole: ['public', 'admin'],
    },
  },
  {
    path: '/Student/enrollment/edit/:id',
    name: 'EditEnrollment',
    component: EditEnrollment,
    meta: {
      moduleName: 'Student',
      icon: folder,
      name: 'Editar Matricula',
      order: 4,
      requiredRole: ['public', 'admin'],
    },
  },
];

export default routes;
