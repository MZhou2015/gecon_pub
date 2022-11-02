import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import actions from './actions'
import ACC from './modules/account'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters: {
    uroot: (state) => {
      return state.uroot
    }
  },
  mutations: {
    uroot (state, mdat) {
      state.uroot = mdat
    },
    cookies (state, mdat) {
      state.mycookies = mdat
    }
  },
  actions,
  modules: {
    ACC
  }
})

export default store
