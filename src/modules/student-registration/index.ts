import type { App } from 'vue'
import routes from './routes'
import StudentRegistrationService from './services/StudentRegistrationService'
import StudentRegistration from './components/StudentRegistration.vue'

export default {
  install(app: App) {
    app.component('StudentRegistration', StudentRegistration)
    app.config.globalProperties.$studentRegistrationService = new StudentRegistrationService()
  },
  routes,
}
