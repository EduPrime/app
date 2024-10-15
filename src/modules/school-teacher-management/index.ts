import type { App } from 'vue'
import routes from './routes'
import TeacherService from './services/TeacherService'
import RegisterTeacher from './views/RegisterTeacher.vue'

export default {
  install(app: App) {
    app.component('RegisterTeacher', RegisterTeacher)
    app.config.globalProperties.$teacherService = new TeacherService()
  },
  routes,
}
