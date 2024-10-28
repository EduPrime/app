import type { App } from 'vue'
import routes from './routes'
import PreEnrollmentService from './services/PreEnrollmentService'
import PreEnrollment from './components/PreEnrollment.vue'

export default {
  install(app: App) {
    app.component('PreEnrollment', PreEnrollment)
    app.config.globalProperties.$preEnrollmentService = new PreEnrollmentService()
  },
  routes,
}
