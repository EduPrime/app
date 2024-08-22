import type { App } from 'vue'
import RegisterInstitution from './views/RegisterInstitution.vue'
import InstitutionService from './services/InstitutionService'
import routes from './routes'

export default {
  install(app: App) {
    app.component('RegisterInstitution', RegisterInstitution)
    app.config.globalProperties.$institutionService = new InstitutionService()
  },
  routes,
}
