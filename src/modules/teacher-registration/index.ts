import type { App } from 'vue'
import RegisterTeacher from './views/RegisterTeacher.vue'
import TeacherService from './services/TeacherService'
import routes from './routes'

export default {
  install(app: App) {
    app.component('RegisterTeacher', RegisterTeacher)
    app.config.globalProperties.$teacherService = new TeacherService()
  },
  routes,
}
