// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './public/scss/_base.scss'
import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios) // this.axios  或者  this.$http
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.push('/main')
