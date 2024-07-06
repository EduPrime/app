import {createRouter, createWebHistory} from '@ionic/vue-router'
import type {RouteRecordRaw} from 'vue-router'
import {routes as dynamicRoutes} from 'virtual:routes'
import {oidcAuth} from "@/services/authService.ts";

const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import ('../views/HomePage.vue')
  },
  {
    path: '/login',
    component: () => import ('../views/LoginPage.vue')
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: () => import('../views/UserInfoPage.vue'),
  },
  {
    path: '/callback',
    name: 'Callback',
    component: () => import('../views/AuthCallback.vue'),
  },
  {
    path: '/dashboard/:id',
    component: () => import ('../views/HomePage.vue')
  },
  // {path: '/tenant-selection', component: TenantSelection, meta: { requiresAuth: true }},
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
const routes = [...staticRoutes, ...dynamicRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (oidcAuth.isAuthenticated) {
      next();
    } else {
      await oidcAuth.signIn();
    }
  } else {
    next();
  }
});

export default router
