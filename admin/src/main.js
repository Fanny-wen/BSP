import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router/router'

Vue.config.productionTip = false

import http from './http'
import store from './store'
//加载到Vue原型
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
