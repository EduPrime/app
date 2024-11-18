import type { App } from 'vue'
import AppFooter from './components/AppFooter.vue'
import RemainingTime from './components/RemainingTime.vue'
import StartEnrollment from './components/StartEnrollment.vue'

import routes from './routes'
import PreEnrollmentService from './services/PreEnrollmentService'

export default {
  install(app: App) {
    app.component('StartEnrollment', StartEnrollment)
    app.component('AppFooter', AppFooter)
    app.component('RemainingTime', RemainingTime)
    app.config.globalProperties.$preEnrollmentService = new PreEnrollmentService()
  },
  routes,
}
