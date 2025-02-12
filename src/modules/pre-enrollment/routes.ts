import { flame, flameOutline } from 'ionicons/icons'
import PreEnrollment from './views/PreEnrollment.vue'

const routes = [
  {
    path: '/pre-enrollment',
    name: 'Pre Enrollment',
    component: PreEnrollment,
    meta: {
      moduleName: 'Pre Enrollment',
      moduleIcon: flameOutline,
      icon: flame,
      name: 'Pré-Matrículas',
      layout: 'blank',
      order: 4,
      requiredRole: ['ADMIN'],
    },
  },
]

export default routes
