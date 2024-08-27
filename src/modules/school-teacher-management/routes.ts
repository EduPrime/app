import { calendar, chatbubbles, create, document, list, notifications, person, school, star } from 'ionicons/icons'
import ManageTeachers from './views/RegisterTeacher.vue'
import RegisterTeacher from './views/RegisterTeacher.vue'
import TeacherProfile from './views/RegisterTeacher.vue'
import TeacherSchedule from './views/RegisterTeacher.vue'
import TeacherDocs from './views/RegisterTeacher.vue'
import TeacherFeedback from './views/RegisterTeacher.vue'
import TeacherNotifications from './views/RegisterTeacher.vue'
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
    },
  },
  {
    path: '/teachers/profile/:id',
    name: 'TeacherProfile',
    component: TeacherProfile,
    meta: {
      moduleName: 'Teachers',
      moduleIcon: person,
      icon: person,
      name: 'Perfil do Professor',
      order: 3,
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
    },
  },
  {
    path: '/teachers/notifications/:id',
    name: 'TeacherNotifications',
    component: TeacherNotifications,
    meta: {
      moduleName: 'Teachers',
      moduleIcon: notifications,
      icon: notifications,
      name: 'Notificações',
      order: 7,
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
    },
  },
  {
    path: '/teachers/messages/:id',
    name: 'TeacherMessages',
    component: TeacherProfile, // Troque por um componente real
    meta: {
      moduleName: 'Teachers',
      moduleIcon: chatbubbles,
      icon: chatbubbles,
      name: 'Mensagens',
      order: 9,
    },
  },
]

export default routes
