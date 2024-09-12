import { school } from 'ionicons/icons'
import DashboardSchools from './views/DashboardSchools.vue'
import EditSchools from './views/EditSchools.vue'
import RegisterSchool from './views/RegisterSchool.vue'

const routes = [
  {
    path: '/Schools/edit/:id',
    name: 'EditSchools',
    component: EditSchools,
    moduleName: 'Schools',
    moduleIcon: school,
  },
  {
    path: '/Schools/list',
    name: 'InstitutionListInstitutions',
    component: DashboardSchools,
    meta: {
      moduleName: 'Schools',
      moduleIcon: school,
      icon: school,
      name: 'Escolas',
      order: 4,
    },
  },
  {
    path: '/Schools/register',
    name: 'RegisterSchool',
    component: RegisterSchool,
    meta: {
      moduleName: 'Schools',
      moduleIcon: school,
      icon: school,
      name: 'Cad Escola',
      order: 5,
    },
  },
]

export default routes
