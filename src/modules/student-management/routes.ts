import { flame, flameOutline, people } from 'ionicons/icons';
import DashboardStudent from './views/DashboardStudent.vue';

const routes = [
  {
    path: '/student',
    name: 'Student Registration',
    component: DashboardStudent,
    meta: {
      moduleName: 'Matricular Aluno',
      moduleIcon: people,
      icon: people,
      name: 'Matricular Aluno',
      order: 2,
      requiredRole: ['public', 'admin'],
    },
  },
];

export default routes;
