import { createRouter, createWebHistory } from '@ionic/vue-router'
import { home } from 'ionicons/icons'
import type { RouteRecordRaw } from 'vue-router'

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
    path: '/dashboard/:id',
    component: () => import('../views/HomePage.vue'),
    meta: {
      icon: home,
      name: 'Main Dashboard',
    },
  },
  {
    path: '/Booking',
    component: () => import('../views/CalendarPage.vue'),
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

export default router
