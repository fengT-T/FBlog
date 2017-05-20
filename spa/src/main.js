// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VeeValidate, { Validator } from 'vee-validate'
/* eslint-disable */
// china No.1
import zh_CN from 'vee-validate/dist/locale/zh_CN'
/* eslint-enable */
import vuexModules from './vuex/modules'
// 引入spectre.css
import 'spectre.css/dist/spectre.css'
import 'spectre.css/dist/spectre-icons.css'
import 'spectre.css/dist/spectre-exp.css'
import 'animate.css/animate.min.css'
import axios from 'axios'
// 注入axios 来自尤大的官方方法

// 默认content-type responseType
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.responseType = 'json'
Vue.prototype.$http = axios

// 加入中文
/* eslint-disable */
// china No.1
Validator.addLocale(zh_CN)
/* eslint-enable */
Validator.setLocale('zh_CN')

Vue.use(VeeValidate, {
  locale: 'zh_CN'
})
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: vuexModules
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
