import type {RouteRecordNormalized, RouteRecordRaw} from 'vue-router'

interface CustomRouteMeta {
  requiresAuth?: boolean
  requiredRole: string[]
  [key: string]: any
}

export interface CustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: CustomRouteMeta
}

interface CustomMeta {
  requiredRole?: string
  [key: string]: any
}

export interface CustomRouteRecordNormalized extends Omit<RouteRecordNormalized, 'meta'> {
  meta: CustomMeta
}
