import type { CustomRouteRecordRaw } from '@/router/RouterType'
import { useAuthStore } from '@/store/autSthore'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { home } from 'ionicons/icons'

// Função para carregar dinamicamente todas as rotas dos módulos
const moduleRoutes: Record<string, any> = import.meta.glob('../modules/**/routes.ts', { eager: true })

const dynamicRoutes: CustomRouteRecordRaw[] = []

// this was an attempt to type the routes to be easier to develop
// for (const path in moduleRoutes) {
//   const module: any = moduleRoutes[path]
//   if (typeof module === 'function') {
//     const mod = await module()
//
//     if (mod.default) {
//       dynamicRoutes.push(...(mod.default as CustomRouteRecordRaw[]))
//     }
//   }
// }

for (const path in moduleRoutes) {
  const module: any = moduleRoutes[path]

  if (module.default) {
    dynamicRoutes.push(...module.default)
  }
}

const staticRoutes: Array<CustomRouteRecordRaw> = [
  {
    path: '',
    redirect: '/dashboard/Home',
    meta: {
      icon: home,
      name: 'Main Dashboard',
      requiredRole: ['public'],
    },
  },
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue'),
    name: 'Login',
    meta: {
      requiredRole: ['public'],
    },
  },
  {
    path: '/signup',
    component: () => import('../views/SignUpPage.vue'),
    name: 'SignUp',
    meta: {
      requiredRole: ['public'],
    },
  },
  {
    path: '/forgot-password',
    component: () => import('../views/ForgotPasswordPage.vue'),
    name: 'ForgotPassword',
    meta: {
      requiredRole: ['public'],
    },
  },
  {
    path: '/change-password',
    component: () => import('../views/ChangePasswordPage.vue'),
    name: 'ChangePassword',
    meta: {
      requiredRole: ['public'],

    },
  },
  {
    path: '/dashboard/:id',
    component: () => import('../views/HomePage.vue'),
    meta: {
      icon: home,
      name: 'Main Dashboard',
      requiredRole: ['adm', 'teacher'],
    },
  },
  {
    path: '/Booking',
    component: () => import('../views/CalendarPage.vue'),
    meta: {
      // icon: calendar,
      name: 'Book Appointment',
      requiredRole: ['public'],
    },
  },
  {
    path: '/files/:id',
    component: () => import('../views/FolderPage.vue'),
    meta: {
      requiredRole: ['adm', 'teacher', 'student'],
    },
  },
  {
    path: '/files/:id/:page',
    component: () => import('../views/FolderPage.vue'),
    meta: {
      requiredRole: ['adm', 'teacher'],
    },
  },
  {
    path: '/files/:id/:page/:reportType',
    component: () => import('../views/FolderPage.vue'),
    meta: {
      requiredRole: ['adm', 'teacher', 'student'],
    },
  },
  {
    path: '/users/:id',
    component: () => import('../views/FolderPage.vue'),
    meta: {
      requiredRole: ['adm', 'teacher', 'student'],
    },
  },
  {
    path: '/insights/:id',
    component: () => import('../views/FolderPage.vue'),
    meta: {
      requiredRole: ['adm', 'teacher', 'student'],
    },
  },
  {
    path: '/settings/:id',
    component: () => import('../views/FolderPage.vue'),
    meta: {
      requiredRole: ['adm', 'teacher', 'student'],
    },
  },
  {
    path: '/profile',
    component: () => import('../views/ProfilePage.vue'),
    meta: {
      requiredRole: ['adm', 'teacher', 'student'],
    },
  },
  {
    path: '/notifications',
    component: () => import('../views/NotificationsPage.vue'),
    meta: {
      requiredRole: ['adm', 'teacher', 'student'],
    },
  },
]

const routes = [...staticRoutes, ...dynamicRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  routes,
})

// Middleware para proteção de rotas
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  // Verifica se a rota exige autenticação
  if (to.meta.requiredRole && !authStore.token) {
    if (Array.isArray(to.meta.requiredRole) && to.meta.requiredRole.includes('public')) {
      // Permite acesso para rotas públicas
      next()
    }
    else {
      // Redireciona para login se não autenticado
      next('/login')
    }
  }
  else if (Array.isArray(to.meta.requiredRole) && to.meta.requiredRole.includes('public') && authStore.token) {
    // Se o usuário está logado e tenta acessar rotas públicas (ex: login), redireciona para o dashboard
    next('/dashboard/Home')
  }
  else {
    // Caso contrário, permite a navegação
    next()
  }
})

export default router
