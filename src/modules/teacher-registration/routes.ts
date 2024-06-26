import RegisterTeacher from './pages/RegisterTeacher.vue'

const routes = [
  {
    path: '/teachers/register',
    name: 'RegisterTeacher',
    component: RegisterTeacher,
  },
]
console.log('Teacher Registration Routes:', routes)
export default routes
