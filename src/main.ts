import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
/** Font Icon imports */
import '@mdi/font/css/materialdesignicons.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUser,
  faFile,
  faScrewdriverWrench,
  faCircleQuestion,
  faHouse
} from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

/* add icons to the library */
library.add(faUser, faFile, faScrewdriverWrench, faCircleQuestion, faHouse)

/** Configue vue app */
const vuetify = createVuetify({
  components,
  directives
})
app.use(router)
app.use(vuetify)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('VueDatePicker', VueDatePicker)

app.mount('#app')
