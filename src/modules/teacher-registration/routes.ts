// src/modules/teacher-registration/routes.ts
import { person } from 'ionicons/icons'
import RegisterTeacher from './views/RegisterTeacher.vue'

const routes = [
  {
    path: '/teachers/register',
    name: 'RegisterTeacher',
    component: RegisterTeacher,
    meta: {
      moduleName: 'Teachers',
      moduleIcon: person,
      icon: person,
      name: 'Registrar Professor',
      order: 1,
    },
  },
  {
    path: '/teachers/list',
    name: 'ListTeachers',
    component: RegisterTeacher,
    meta: {
      moduleName: 'Teachers',
      moduleIcon: person,
      icon: person,
      name: 'Listar Professores',
      order: 2,
    },
  },
  {
    path: '/teachers/update',
    name: 'UpdateTeacher',
    component: RegisterTeacher,
    meta: {
      moduleName: 'Teachers',
      moduleIcon: person,
      icon: person,
      name: 'Atualizar Professor',
      order: 3,
    },
  },
  {
    path: '/teachers/delete',
    name: 'DeleteTeacher',
    component: RegisterTeacher,
    meta: {
      moduleName: 'Teachers',
      moduleIcon: person,
      icon: person,
      name: 'Deletar Professor',
      order: 4,
    },
  },
]

export default routes
