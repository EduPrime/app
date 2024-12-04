<script setup lang="ts">
// import type CustomUser from '@/router/CustomUser'
import type { RouteRecordNormalized } from 'vue-router'
import NavItem from '@/components/NavItem.vue'
import { useUserStore } from '@/store/user'
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
import { supabase } from '../supabaseClient'

const userStore = useUserStore()
// const user: CustomUser = userStore.user as CustomUser

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

const isPublicPage = ref(route.path === '/login' || route.path === '/signup' || route.path === '/forgot-password' || route.path === '/change-password')

watch(route, (newRoute) => {
  isPublicPage.value = newRoute.path === '/login' || newRoute.path === '/signup' || newRoute.path === '/forgot-password' || newRoute.path === '/change-password'
})

onMounted(() => {
  updateSelectedTab(route.path)
})

watch(route, (newRoute) => {
  updateSelectedTab(newRoute.path)
})

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Erro ao deslogar:', error.message)
  }
  else {
    userStore.logout()

    router.push('/login')
  }
}
</script>

<template>
  <ion-app>
    <template v-if="isPublicPage">
      <!-- Router outlet com uma key para forçar re-renderização -->
      <ion-router-outlet :key="route.fullPath" />
    </template>

    <ion-split-pane v-if="!isPublicPage" content-id="main-content" :class="showTree ? '' : 'tree-hidden'">
      <ion-buttons class="tree-toggle-btn">
        <ion-button color="primary" @click="toggleTreeView">
          <template #icon-only>
            <ion-icon size="small" :icon="showTree ? chevronBackCircle : chevronForwardCircle" />
          </template>
        </ion-button>
      </ion-buttons>
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <div class="vertical-tabs">
            <ion-list>
              <ion-item lines="full" button class="vertical-tab-button" router-link="/" :detail="false">
                <ion-img src="/icons/icon-256.webp" alt="Gestão Pedagógica" />
              </ion-item>
              <ion-item
                v-for="(tab, index) in tabs" :key="index" lines="full" button
                class="vertical-tab-button" :detail="false"
                :class="selectedTab === index ? 'selected' : ''" :router-link="tab.children[0].url"
                @click="selectTab(index)"
              >
                <ion-icon :icon="tab.icon" />
              </ion-item>

              <!-- Profile and Notifications button -->
            </ion-list>
            <div class="bottom-items">
              <ion-item
                lines="full" button class="vertical-tab-button" router-link="/notifications"
                :detail="false"
              >
                <ion-icon :icon="notificationsOutline" />
              </ion-item>
              <ion-item lines="full" button class="vertical-tab-button" :detail="false" @click="logout">
                <ion-icon :icon="logOutOutline" />
              </ion-item>
              <ion-item
                lines="full" button class="vertical-tab-button" router-link="/profile"
                :detail="false"
              >
                <ion-icon :icon="personCircleOutline" />
              </ion-item>
            </div>
          </div>
          <div class="tree-view">
            <!-- v-if="showTree" -->
            <ion-item lines="none" class="app-title-item">
              {{ currentRouteName }}
              <!-- Mobile Screen Menu close button -->
              <template #end>
                <ion-menu-button color="primary" @click="toggleTreeView">
                  <ion-icon :icon="closeCircle" />
                </ion-menu-button>
              </template>
            </ion-item>

            <ion-searchbar v-if="tabs[selectedTab].children.length > 4" />
            <!--------------------------
              @TODO: Recursive method to implement nested components for nav-items
            ------------------------------>
            <NavItem
              v-for="(tab) in tabs[selectedTab].children" :key="`${tab.name}-${tab.icon}`"
              :item="tab"
            />
          </div>
        </ion-content>
      </ion-menu>

      <slot />
    </ion-split-pane>
  </ion-app>
</template>

<style lang="scss">
/* Global Styles */
ion-split-pane {
    --side-max-width: 350px;

    &.split-pane-visible {
        .tree-toggle-btn {
            display: flex;
            position: fixed;
            top: 0;
            left: 300px;
        }

        .tree-toggle-btn>ion-button {
            --width: 25px;
            --height: 25px;
            --min-width: 25px;
            --padding: 0;
        }

        &.tree-hidden {
            --side-min-width: 61px;
            --side-width: 61px;

            .tree-toggle-btn {
                top: 0;
                left: 30px;
            }

            .tree-view {
                display: none;
            }
        }
    }

    &:not(.split-pane-visible) .tree-toggle-btn {
        display: none;
    }

    .tree-toggle-btn>ion-button {
        --width: 25px;
        --height: 25px;
        --min-width: 25px;
        --padding: 0;
    }

    ion-menu {
        --border: 1px solid #0000001f;
        --width: 90%;
        --max-width: 350px;
    }

    ion-item.vertical-tab-button {
        width: 60px;
        --background: #00000000;
        --color: var(--ion-color-primary);

        ion-icon {
            color: var(--ion-color-primary);
        }

        &::part(native) {
            height: 60px;
            width: 60px;
        }

        &.selected {
            --background: var(--ion-color-primary);
            color: var(--ion-background-color);

            ion-icon {
                color: var(--ion-background-color);
            }
        }
    }

    .vertical-tabs ion-list {
        width: 61px;
        float: left;
        height: 100vh;
        overflow-y: auto;
        background: var(--module-panel-background);
        border-right: 1px solid #00000023;
    }

    .accordion-view {
        margin-left: 60px;

        ion-accordion::part(content) {
            padding-left: 25px;
        }
    }

    .tree-view {
        margin-left: 60px;
        padding: 15px;
        background: var(--sidemenu-background);
        height: 100%;
        overflow-y: auto;

        .tree-view-items ion-list {
            --background: transparent;

            ion-item {
                --background: transparent;
                --min-height: 32px;
                --padding-top: 0;
                --padding-bottom: 0;
                --inner-padding-top: 0;
                --inner-padding-bottom: 0;
                margin-bottom: 5px;

                &::part(native) {
                    max-height: 16px;
                    font-size: 14px;
                    border-radius: 8px;
                }
            }
        }
    }
}

ion-item.app-title-item {
    height: 60px;
    --background: transparent;
}

.bottom-items {
    position: absolute;
    bottom: 0;
    left: 0;
    height: auto;
}

.ion-accordion-toggle-icon {
    color: var(--ion-color-primary)
}

.side-menu {
    width: 350px;
}
</style>
