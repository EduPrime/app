import type { App } from 'vue'
import routes from './routes'
import InstitutionService from './services/InstitutionService'
import RegisterInstitution from './views/RegisterInstitution.vue'

export default {
  install(app: App) {
    app.component('RegisterInstitution', RegisterInstitution)
    app.config.globalProperties.$institutionService = new InstitutionService()
  },
  routes,
}
