import Vue from 'vue'
import App from './App'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from '@/util/axiosutil'
import store from '@/vuex'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
