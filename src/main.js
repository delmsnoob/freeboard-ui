import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import store from '@/modules/modules.js'
import router from './router'

import MaterialKit from "./plugins/material-kit"

import VueSnackbar from 'vuejs-snackbar'
import Vuelidate from 'vuelidate'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import VueTimeago from 'vue-timeago'

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.use(MaterialKit)
Vue.use(VueMaterial)

Vue.use(VueSnackbar)
Vue.use(Vuelidate)

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en',
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn')
  }
})

const NavbarStore = {
  showNavbar: false
};

Vue.mixin({
  data() {
    return {
      NavbarStore
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
