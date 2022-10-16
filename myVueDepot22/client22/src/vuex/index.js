import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import ACC from './modules/account'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  modules: {
    ACC
  }
})

export default store
