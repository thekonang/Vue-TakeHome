import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import {
  faUser,
  faFile,
  faScrewdriverWrench,
  faCircleQuestion,
  faHouse
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUser, faFile, faScrewdriverWrench, faCircleQuestion, faHouse)

const vuetify = createVuetify({
  components: {
    ...components
  },
  directives
})

app.use(router)
app.use(vuetify)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
