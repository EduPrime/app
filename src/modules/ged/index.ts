import type { App } from 'vue'
import routes from './routes'
import GedService from './services/GedService'

export default {
  install(app: App) {
    app.component('UploadFiles')
    app.config.globalProperties.$gedService = new GedService()
  },
  routes,
}
