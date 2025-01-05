import {
  IonApp,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonicVue,
  IonImg,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonSearchbar,
  IonSplitPane,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import { createApp } from 'vue'
import App from './App.vue'
import ContentLayout from './components/theme/ContentLayout.vue'

import router from './router'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'

import '@ionic/vue/css/typography.css'
/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'

import '@ionic/vue/css/display.css'
/* Theme variables */
import './theme/variables.css'
// Dynamically import modules
const modules = import.meta.glob('./modules/*/index.ts', { eager: true })

const pinia = createPinia()
const installPersistedStatePlugin = createPersistedStatePlugin()
pinia.use(context => installPersistedStatePlugin(context))

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(pinia)


app.component('ion-app', IonApp)
app.component('ion-content', IonContent)
app.component('ion-icon', IonIcon)
app.component('ion-item', IonItem)
app.component('ion-label', IonLabel)
app.component('ion-list', IonList)
app.component('ion-menu', IonMenu)
app.component('ion-router-outlet', IonRouterOutlet)
app.component('ion-split-pane', IonSplitPane)
app.component('ion-text', IonText)
app.component('ion-searchbar', IonSearchbar)
app.component('ion-img', IonImg)
app.component('ion-header', IonHeader)
app.component('ion-footer', IonFooter)
app.component('ion-page', IonPage)
app.component('ion-button', IonButton)
app.component('ion-title', IonTitle)
app.component('ion-toolbar', IonToolbar)
app.component('ion-input', IonInput)
app.component('ion-back-button', IonBackButton)
app.component('ion-buttons', IonButtons)
app.component('ion-menu-button', IonMenuButton)
app.component('ion-grid', IonGrid)
app.component('ion-row', IonRow)
app.component('ion-col', IonCol)
app.component('ion-item-sliding', IonItemSliding)
app.component('ion-item-option', IonItemOption)
app.component('ion-item-options', IonItemOptions)
app.component('ion-card', IonCard)
app.component('ion-card-header', IonCardHeader)
app.component('ion-card-title', IonCardTitle)
app.component('ion-card-content', IonCardContent)
app.component('ion-card-subtitle', IonCardSubtitle)
app.component('content-layout', ContentLayout)

for (const path in modules) {
  const module: any = modules[path]
  if (module.default && typeof module.default.install === 'function') {
    app.use(module.default)
  }
}

router.isReady().then(() => {
  app.mount('#app')
})
