import type { CustomRouteRecordRaw } from '@/router/RouterType'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { home } from 'ionicons/icons'
import { setActivePinia, getActivePinia } from 'pinia'
import { useAuthStore } from '@/store/AuthStore'
import { AuthService } from '@/services/AuthService'
import pinia from '@/store/pinia'
import { updateRoutes } from '@/utils/updateRoutes'


// Função para carregar dinamicamente todas as rotas dos módulos
const moduleRoutes: Record<string, any> = import.meta.glob('../modules/**/routes.ts', { eager: true })
const dynamicRoutes: CustomRouteRecordRaw[] = []

if (!getActivePinia()) {
  setActivePinia(pinia)
}

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
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
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
    path: '/dashboard/Home',
    component: () => import('../views/HomePage.vue'),
    meta: {
      icon: home,
      name: 'Main Dashboard',
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
  {
    path: '/Booking',
    component: () => import('../views/CalendarPage.vue'),
    meta: {
      // icon: calendar,
      name: 'Book Appointment',
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
  {
    path: '/files/:id',
    component: () => import('../views/FolderPage.vue'),
    meta: {
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
  {
    path: '/files/:id/:page',
    component: () => import('../views/FolderPage.vue'),
    meta: {
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
  {
    path: '/files/:id/:page/:reportType',
    component: () => import('../views/FolderPage.vue'),
    meta: {
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
  {
    path: '/users/:id',
    component: () => import('../views/FolderPage.vue'),
    meta: {
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
  {
    path: '/insights/:id',
    component: () => import('../views/FolderPage.vue'),
    meta: {
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
  {
    path: '/settings/:id',
    component: () => import('../views/FolderPage.vue'),
    meta: {
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
  {
    path: '/profile',
    component: () => import('../views/ProfilePage.vue'),
    meta: {
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
  {
    path: '/notifications',
    component: () => import('../views/NotificationsPage.vue'),
    meta: {
      requiredRole: ['ADMIN', 'GESTORESCOLAR', 'GESTORMUNICIPAL'],
    },
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/dashboard/Home',
  //   meta: {
  //     requiredRole: ['ADMIN', 'PROFESSOR'],
  //   },
  // },
]

export const routes = [...staticRoutes, ...dynamicRoutes]

const router = updateRoutes(routes)
export default router
