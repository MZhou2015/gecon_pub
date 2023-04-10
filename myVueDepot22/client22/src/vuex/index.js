import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import actions from './actions'
import ACC from './modules/account'
import PRO from './modules/product'
import INV from './modules/invest'

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
    aRandom (state, mdat) {
      state.a = mdat
    },
    cookies (state, mdat) {
      state.mycookies = mdat
    },
    upxrate (state, xdat) {
      state.xrate = xdat
    }
  },
  actions,
  modules: {
    ACC,
    PRO,
    INV
  }
})

export default store
