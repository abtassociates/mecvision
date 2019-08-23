import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import i18n from '@/plugins/i18n'
import './registerServiceWorker'
import 'vue-croppa/dist/vue-croppa.css'
import Croppa from 'vue-croppa'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import router from './router'

Vue.use(Croppa)
Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.darken4, // #90A4AE
    secondary: colors.lightBlue.darken4, // #FFCDD2
    accent: colors.red.accent2 // #3F51B5
  },
  options: {
    customProperties: true
  }
})

Vue.config.productionTip = false

// Vue.prototype.$bus = new Vue()

export const eventBus = new Vue()

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
