// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from './store'
import {sync} from "vuex-router-sync";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueYoutube from 'vue-youtube'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueYoutube)
sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  router,
  store: store,
  components: {
    App,
  },
  template: '<App/>'
})
