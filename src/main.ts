import { createApp } from 'vue'
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonPage,
  IonRouterOutlet,
  IonSearchbar,
  IonSplitPane,
  IonText,
  IonTitle,
  IonToolbar,
  IonicVue,
} from '@ionic/vue'
import App from './App.vue'
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

const app = createApp(App)
  .use(IonicVue)
  .use(router)

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
app.component('ion-page', IonPage)
app.component('ion-button', IonButton)
app.component('ion-title', IonTitle)
app.component('ion-toolbar', IonToolbar)
app.component('ion-input', IonInput)

for (const path in modules) {
  const module: any = modules[path]
  if (module.default && typeof module.default.install === 'function') {
    app.use(module.default)
  }
}

router.isReady().then(() => {
  app.mount('#app')
})
