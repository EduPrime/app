<script setup lang="ts">
import {
  barChart,
  barChartOutline,
  calendarOutline,
  chevronBackCircle,
  chevronForwardCircle,
  closeCircle,
  document,
  fileTray,
  folder,
  folderOutline,
  handLeft,
  image,
  logOutOutline,
  notificationsOutline,
  peopleOutline,
  person,
  personCircleOutline,
  videocam,
} from 'ionicons/icons'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import type CustomUser from '@/router/CustomUser'
import type { RouteRecordNormalized } from 'vue-router'
import NavItem from './components/NavItem.vue'

const tabs = ref([
  {
    name: 'Files',
    icon: folderOutline,
    color: 'tertiary',
    url: '/files',
    order: 3,
    children: [
      {
        name: 'Calendar',
        icon: calendarOutline,
        color: 'tertiary',
        url: '/Booking',
        children: [],
        order: 1,
      },
      {
        name: 'Documents',
        icon: folder,
        color: 'tertiary',
        url: '/files/documents',
        children: [
          {
            name: 'Reports',
            icon: fileTray,
            color: 'tertiary',
            url: '/files/documents/reports',
            children: [
              {
                name: 'Annual Report',
                icon: barChart,
                color: 'tertiary',
                url: '/files/documents/reports/annual',
                children: [],
                order: 1,
              },
              {
                name: 'Monthly Report',
                icon: barChartOutline,
                color: 'tertiary',
                url: '/files/documents/reports/monthly',
                children: [],
                order: 2,
              },
            ],
            order: 1,
          },
          {
            name: 'Invoices',
            icon: document,
            color: 'tertiary',
            url: '/files/documents/invoices',
            children: [],
            order: 2,
          },
          {
            name: 'Contracts',
            icon: handLeft,
            color: 'tertiary',
            url: '/files/documents/contracts',
            children: [],
            order: 3,
          },
        ],
        order: 2,
      },
      {
        name: 'Images',
        icon: image,
        color: 'tertiary',
        url: '/files/images',
        children: [],
        order: 3,
      },
      {
        name: 'Videos',
        icon: videocam,
        color: 'tertiary',
        url: '/files/videos',
        children: [],
        order: 4,
      },
    ],
  },
  {
    name: 'Users',
    icon: peopleOutline,
    color: 'success',
    url: '/users',
    order: 4,
    children: [
      {
        name: 'Admin',
        icon: person,
        color: 'success',
        url: '/users/admin',
        children: [
          {
            name: 'Add User',
            icon: person,
            color: 'success',
            url: '/users/editor',
            children: [],
            order: 1,
          },
          {
            name: 'List users',
            icon: person,
            color: 'success',
            url: '/users/viewer',
            children: [],
            order: 2,
          },
        ],
        order: 1,
      },
      {
        name: 'Editor',
        icon: person,
        color: 'success',
        url: '/users/editor',
        children: [],
        order: 2,
      },
      {
        name: 'Viewer',
        icon: person,
        color: 'success',
        url: '/users/viewer',
        children: [],
        order: 3,
      },
    ],
  },
])

const selectedTab = ref(0)
const showTree = ref(true)
function toggleTreeView() {
  showTree.value = !showTree.value
}
function selectTab(index: number) {
  selectedTab.value = index
}

const router = useRouter()
const route = useRoute()
const dynamicTabs: any[] = []

const currentRouteName = computed(() => {
  return route.meta.name || 'EduPrime'
})

function hasShowFlag(route: RouteRecordNormalized) {
  return route.meta.showInTab ?? true
}

function hasRequiredAttributes(route: RouteRecordNormalized) {
  return route.meta && route.meta.moduleName && route.meta.moduleIcon && route.meta.requiredRole
}

// function checkUserAuthorization(route: CustomRouteRecordNormalized) {
//   console.log(route.meta.requiredRole?.includes('public'))
//   return route.meta.requiredRole?.includes(user.user_metadata.role) || route.meta.requiredRole?.includes('public')
// }

router.getRoutes().forEach((route) => {
  if (hasRequiredAttributes(route) && hasShowFlag(route)) {
    let moduleTab = dynamicTabs.find(tab => tab.name === route.meta.moduleName)
    if (!moduleTab) {
      moduleTab = {
        name: route.meta.moduleName,
        icon: route.meta.moduleIcon,
        color: 'primary', // ou qualquer cor padrão que você preferir
        url: `/${(route.meta.moduleName as string).toLowerCase()}`,
        order: route.meta.order || 0,
        children: [],
      }
      dynamicTabs.push(moduleTab)
    }
    moduleTab.children.push({
      name: route.meta.name,
      icon: route.meta.icon,
      color: 'tertiary',
      url: route.path,
      children: route.children || [],
      order: route.meta.order || 0,
    })
  }
})

function updateSelectedTab(path: string) {
  tabs.value.forEach((tab, index) => {
    tab.children.forEach((child) => {
      if (child.url === path) {
        selectedTab.value = index
      }
    })
    if (path.startsWith(tab.url)) {
      selectedTab.value = index
    }
  })
}

dynamicTabs.sort((a, b) => a.order - b.order)
dynamicTabs.forEach((tab) => {
  tab.children.sort((a: { order: number }, b: { order: number }) => a.order - b.order)
})

tabs.value.push(...dynamicTabs)
tabs.value.sort((a, b) => a.order - b.order)

const isPublicPage = ref(route.path === '/login' || route.path === '/signup')

watch(route, (newRoute) => {
  isPublicPage.value = newRoute.path === '/login' || newRoute.path === '/signup'
})

onMounted(() => {
  updateSelectedTab(route.path)
})

watch(route, (newRoute) => {
  updateSelectedTab(newRoute.path)
})

async function logout() {
  const error: any = 0
  if (error) {
    console.error('Erro ao deslogar:', error.message)
  }
  else {
    router.push('/login')
  }
}
</script>

<template>
  <LayoutBlank v-if="route.meta.layout === 'blank'">
    <ion-router-outlet id="main-content" />
  </LayoutBlank>
  <LayoutDefault v-else>
    <ion-router-outlet id="main-content" />
  </LayoutDefault>
</template>
<!-- <pre>
  route: {{ route.meta.layout }}
</pre> -->
