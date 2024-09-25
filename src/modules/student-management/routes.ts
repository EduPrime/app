import { flame, flameOutline, people } from 'ionicons/icons';
import DashboardStudent from './views/DashboardStudent.vue';
import RegisterStudent from './views/RegisterStudent.vue';
import EditStudent from './views/EditStudent.vue'

const routes = [
  {
    path: '/Student',
    name: 'Student Registration',
    component: DashboardStudent,
    meta: {
      moduleName: 'Matricula',
      moduleIcon: people,
      icon: people,
      name: 'Matricula',
      order: 1,
      requiredRole: ['public', 'admin'],
    },
  },
  {
    path: '/Student/register',
    name: 'RegisterStudent',
    component: RegisterStudent,
    meta: {
      moduleName: 'Realizar Matricula',
      icon: people,
      name: 'Realizar Matricula',
      order: 2,
      requiredRole: ['public', 'admin'],
    },
  },
  {
    path: '/Student/edit/:id',
    name: 'EditStudent',
    component: EditStudent,
    meta: {
      moduleName: 'Editar Matricula',
      icon: people,
      name: 'Editar Matricula',
      order: 3,
      requiredRole: ['public', 'admin'],
    },
  },
];

export default routes;
