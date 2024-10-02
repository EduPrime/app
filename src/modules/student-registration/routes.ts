import { flame, flameOutline, people } from 'ionicons/icons';
import StudentRegistration from './views/StudentRegistration.vue';

const routes = [
  {
    path: '/student-registration',
    name: 'Student Registration',
    component: StudentRegistration,
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
