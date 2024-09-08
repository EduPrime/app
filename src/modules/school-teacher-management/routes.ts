import { calendar, chatbubbles, create, document, list, person, school, star } from 'ionicons/icons'
import ManageTeachers from './views/ManageTeachers.vue'
import RegisterTeacher from './views/RegisterTeacher.vue'
import EditTeacher from './views/EditTeacher.vue'
import TeacherSchedule from './views/RegisterTeacher.vue'
import TeacherDocs from './views/RegisterTeacher.vue'
import TeacherFeedback from './views/TeacherFeedback.vue'
import TeacherReports from './views/RegisterTeacher.vue'

const routes = [
  {
    path: '/teachers/manage',
    name: 'ManageTeachers',
    component: ManageTeachers,
    meta: {
      moduleName: 'Teachers',
      moduleIcon: list,
      icon: list,
      name: 'Gerenciar Professores',
      order: 1,
      showInTab: true,
    },
  },
  {
    path: '/teachers/register',
    name: 'RegisterTeacher',
    component: RegisterTeacher,
    meta: {
      moduleName: 'Teachers',
      moduleIcon: create,
      icon: create,
      name: 'Registrar Novo Professor',
      order: 2,
      showInTab: true,
    },
  },
  {
    path: '/teachers/edit/:id',
    name: 'EditTeacher',
    component: EditTeacher,
    meta: {
      moduleName: 'Teachers',
      moduleIcon: person,
      icon: person,
      name: 'Editar Professor',
      order: 3,
      showInTab: true,
    },
  },
  {
    path: '/teachers/schedule/:id',
    name: 'TeacherSchedule',
    component: TeacherSchedule,
    meta: {
      moduleName: 'Teachers',
      moduleIcon: calendar,
      icon: calendar,
      name: 'Grade de Aula',
      order: 4,
      showInTab: true,
    },
  },
  {
    path: '/teachers/documents/:id',
    name: 'TeacherDocs',
    component: TeacherDocs,
    meta: {
      moduleName: 'Teachers',
      moduleIcon: document,
      icon: document,
      name: 'Documentação',
      order: 5,
      showInTab: true,
    },
  },
  {
    path: '/teachers/feedback/:id',
    name: 'TeacherFeedback',
    component: TeacherFeedback,
    meta: {
      moduleName: 'Teachers',
      moduleIcon: star,
      icon: star,
      name: 'Avaliações e Feedback',
      order: 6,
      showInTab: true,
    },
  },
  {
    path: '/teachers/reports/:id',
    name: 'TeacherReports',
    component: TeacherReports,
    meta: {
      moduleName: 'Teachers',
      moduleIcon: school,
      icon: school,
      name: 'Relatórios e Monitoramento',
      order: 8,
      showInTab: true,
    },
  },
  {
    path: '/teachers/messages/:id',
    name: 'TeacherMessages',
    component: TeacherReports, // Troque por um componente real
    meta: {
      moduleName: 'Teachers',
      moduleIcon: chatbubbles,
      icon: chatbubbles,
      name: 'Mensagens',
      order: 9,
      showInTab: true,
    },
  },
]

export default routes
