<script setup lang="ts">
import { ref } from 'vue'

import {
  barChart,
  barChartOutline,
  calendarOutline,
  document,
  fileTray,
  folder,
  folderOutline,
  handLeft,
  image,
  notificationsOutline,
  peopleOutline,
  person,
  personCircleOutline,
  settingsOutline,
  sparkles,
  sparklesOutline,
  videocam,
} from 'ionicons/icons'
import NavItem from './components/NavItem.vue'

const tabs = ref([
  {
    name: 'Files',
    icon: folderOutline,
    color: 'tertiary',
    url: '/files',
    children: [
      {
        name: 'Calendar',
        icon: calendarOutline,
        color: 'tertiary',
        url: '/Booking',
        children: [],
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
              },
              {
                name: 'Monthly Report',
                icon: barChartOutline,
                color: 'tertiary',
                url: '/files/documents/reports/monthly',
                children: [],
              },
            ],
          },
          {
            name: 'Invoices',
            icon: document,
            color: 'tertiary',
            url: '/files/documents/invoices',
            children: [],
          },
          {
            name: 'Contracts',
            icon: handLeft,
            color: 'tertiary',
            url: '/files/documents/contracts',
            children: [],
          },
        ],
      },
      {
        name: 'Images',
        icon: image,
        color: 'tertiary',
        url: '/files/images',
        children: [],
      },
      {
        name: 'Videos',
        icon: videocam,
        color: 'tertiary',
        url: '/files/videos',
        children: [],
      },
    ],
  },
  {
    name: 'Users',
    icon: peopleOutline,
    color: 'success',
    url: '/users',
    children: [
      {
        name: 'Admin',
        icon: person,
        color: 'success',
        url: '/users/admin',
        children: [{
          name: 'Add User',
          icon: person,
          color: 'success',
          url: '/users/editor',
          children: [],
        }, {
          name: 'List users',
          icon: person,
          color: 'success',
          url: '/users/viewer',
          children: [],
        }],
      },
      {
        name: 'Editor',
        icon: person,
        color: 'success',
        url: '/users/editor',
        children: [],
      },
      {
        name: 'Viewer',
        icon: person,
        color: 'success',
        url: '/users/viewer',
        children: [],
      },
    ],
  },
  {
    name: 'Insights',
    icon: sparklesOutline,
    color: 'warning',
    url: '/insights',
    children: [
      {
        name: 'Dashboard',
        icon: sparkles,
        color: 'warning',
        url: '/insights/dashboard',
        children: [],
      },
      {
        name: 'Analytics',
        icon: sparkles,
        color: 'warning',
        url: '/insights/analytics',
        children: [],
      },
      {
        name: 'Reports',
        icon: sparkles,
        color: 'warning',
        url: '/insights/reports',
        children: [],
      },
    ],
  },
  {
    name: 'Settings',
    icon: settingsOutline,
    color: 'secondary',
    url: '/settings',
    children: [
      {
        name: 'General',
        icon: settingsOutline,
        color: 'secondary',
        url: '/settings/general',
        children: [],
      },
      {
        name: 'Profile',
        icon: settingsOutline,
        color: 'secondary',
        url: '/settings/profile',
        children: [],
      },
      {
        name: 'Security',
        icon: settingsOutline,
        color: 'secondary',
        url: '/settings/security',
        children: [],
      },
    ],
  },
])

const selectedTab = ref(0)

function selectTab(index: number) {
  selectedTab.value = index
}
</script>

<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <div class="vertical-tabs">
            <ion-list>
              <ion-item lines="full" button class="vertical-tab-button" router-link="/">
                <ion-img
                  src="/icons/icon-256.webp"
                  alt="Gestão Pedagógica"
                />
              </ion-item>
              <ion-item
                v-for="(tab, index) in tabs" :key="index" lines="full" button class="vertical-tab-button"
                :class="selectedTab === index ? 'selected' : ''" @click="selectTab(index)"
              >
                <ion-icon :icon="tab.icon" color="dark" />
              </ion-item>

              <!-- Profile and Notifications button -->
            </ion-list>
            <div class="bottom-items">
              <ion-item lines="full" button class="vertical-tab-button" router-link="/notifications">
                <ion-icon :icon="notificationsOutline" color="dark" />
              </ion-item>
              <ion-item lines="full" button class="vertical-tab-button" router-link="/profile">
                <ion-icon :icon="personCircleOutline" color="dark" />
              </ion-item>
            </div>
          </div>
          <div class="tree-view">
            <ion-item lines="none" class="app-title-item">
              EduPrime
            </ion-item>

            <ion-searchbar />
            <!--------------------------
              @TODO: Recursive method to implement nested components for nav-items
            ------------------------------>
            <nav-item v-for="(tab, index) in tabs[selectedTab].children" :key="index" :item="tab" />
          </div>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content" />
    </ion-split-pane>
  </ion-app>
</template>

<style>
/* Global Styles */
ion-menu {
  --width: 90%;
}

/* Page Styles */
.vertical-tabs ion-list {
  width: 60px;
  float: left;
  height: 100vh;
  overflow-y: auto;
}

ion-item.vertical-tab-button {
  width: 60px;
}

ion-item.vertical-tab-button::part(native) {
  height: 60px;
  width: 60px;
}

ion-item.vertical-tab-button.selected {
  --background: var(--ion-background-color);
}

.accordion-view {
  margin-left: 60px;
}

ion-accordion::part(content) {
  padding-left: 25px;
}

.tree-view {
  margin-left: 60px;
  padding: 15px;
}

.tree-view .tree-view-items ion-list {
  background: #00000000;
}

.tree-view .tree-view-items ion-item {
  --min-height: 32px;
  --padding-top: 0;
  --padding-bottom: 0;
  --inner-padding-top: 0;
  --inner-padding-bottom: 0;
  margin-bottom: 5px;
}

.tree-view .tree-view-items ion-item::part(native) {
  max-height: 16px;
  font-size: 14px;
  border-radius: 8px;
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
.ion-accordion-toggle-icon{
  color: var(--ion-color-primary)
}
</style>
