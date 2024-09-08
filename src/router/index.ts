import { createRouter, createWebHistory } from '@ionic/vue-router'
import { home } from 'ionicons/icons'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../store/user'

// Função para carregar dinamicamente todas as rotas dos módulos
const moduleRoutes = import.meta.glob('../modules/**/routes.ts', { eager: true })

const dynamicRoutes: RouteRecordRaw[] = []

// Iterar sobre todos os módulos carregados e adicionar suas rotas ao array
for (const path in moduleRoutes) {
  const module: any = moduleRoutes[path]
  if (module.default) {
    dynamicRoutes.push(...module.default)
  }
}

const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/dashboard/Home',
    meta: {
      icon: home,
      name: 'Main Dashboard',
    },
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue'),
    name: 'Login',
  },
  {
    path: '/signup',
    component: () => import('@/views/SignUpPage.vue'),
    name: 'SignUp',
  },
  {
    path: '/dashboard/:id',
    component: () => import('../views/HomePage.vue'),
    meta: {
      icon: home,
      name: 'Main Dashboard',
      requiresAuth: true,
      requiredRole: ['adm', 'teacher'],
    },
  },
  {
    path: '/Booking',
    component: () => import('../views/CalendarPage.vue'),
    meta: {
      // icon: calendar,
      name: 'Book Appointment',
      requiresAuth: true,
      requiredRole: ['adm', 'teacher'],
    },
  },
  {
    path: '/files/:id',
    component: () => import('../views/FolderPage.vue'),
  },
  {
    path: '/files/:id/:page',
    component: () => import('../views/FolderPage.vue'),
  },
  {
    path: '/files/:id/:page/:reportType',
    component: () => import('../views/FolderPage.vue'),
  },
  {
    path: '/users/:id',
    component: () => import('../views/FolderPage.vue'),
  },
  {
    path: '/insights/:id',
    component: () => import('../views/FolderPage.vue'),
  },
  {
    path: '/settings/:id',
    component: () => import('../views/FolderPage.vue'),
  },
  {
    path: '/profile',
    component: () => import('../views/ProfilePage.vue'),
  },
  {
    path: '/notifications',
    component: () => import('../views/NotificationsPage.vue'),
  },
]

const routes = [...staticRoutes, ...dynamicRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userStore.user) {
      await userStore.fetchUser()
    }

    const user = userStore.user

    if (!user) {
      return next('/login')
    }
    else {
      const role = user?.user_metadata?.role

      if (to.meta.requiredRoles && !to.meta.requiredRoles.includes(role)) {
        return next('/login')
      }
    }
  }

  next()
})

export default router
