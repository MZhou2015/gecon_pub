// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import jQuery from 'jquery'
global.jquery = jQuery
let Bootstrap = require('bootstrap')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  Bootstrap,
  components: { App },
  template: '<App/>'
})
