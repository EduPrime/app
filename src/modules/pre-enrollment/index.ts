import type { App } from 'vue'
import PreEnrollment from './components/PreEnrollment.vue'
import routes from './routes'
import PreEnrollmentService from './services/PreEnrollmentService'

export default {
  install(app: App) {
    app.component('PreEnrollment', PreEnrollment)
    app.config.globalProperties.$preEnrollmentService = new PreEnrollmentService()
  },
  routes,
}
