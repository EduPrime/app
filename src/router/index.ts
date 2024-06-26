import { createRouter, createWebHistory } from '@ionic/vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/dashboard/Home',
  },
  {
    path: '/dashboard/:id',
    component: () => import ('../views/HomePage.vue'),
  },
  {
    path: '/Booking',
    component: () => import ('../views/CalendarPage.vue'),
  },
  {
    path: '/files/:id',
    component: () => import ('../views/FolderPage.vue'),
  },
  {
    path: '/files/:id/:page',
    component: () => import ('../views/FolderPage.vue'),
  },
  {
    path: '/files/:id/:page/:reportType',
    component: () => import ('../views/FolderPage.vue'),
  },
  {
    path: '/users/:id',
    component: () => import ('../views/FolderPage.vue'),
  },
  {
    path: '/insights/:id',
    component: () => import ('../views/FolderPage.vue'),
  },
  {
    path: '/settings/:id',
    component: () => import ('../views/FolderPage.vue'),
  },
  {
    path: '/profile',
    component: () => import ('../views/ProfilePage.vue'),
  },
  {
    path: '/notifications',
    component: () => import ('../views/NotificationsPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
