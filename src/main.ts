import { createApp } from 'vue'
import { IonApp, IonContent, IonIcon, IonImg, IonItem, IonList, IonMenu, IonRouterOutlet, IonSearchbar, IonSplitPane, IonText, IonicVue } from '@ionic/vue'
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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css'

/* Theme variables */
import './theme/variables.css'

const app = createApp(App)
  .use(IonicVue)
  .use(router)

app.component('ion-app', IonApp)
app.component('ion-content', IonContent)
app.component('ion-icon', IonIcon)
app.component('ion-item', IonItem)
app.component('ion-list', IonList)
app.component('ion-menu', IonMenu)
app.component('ion-router-outlet', IonRouterOutlet)
app.component('ion-split-pane', IonSplitPane)
app.component('ion-text', IonText)
app.component('ion-searchbar', IonSearchbar)
app.component('ion-img', IonImg)

router.isReady().then(() => {
  app.mount('#app')
})
