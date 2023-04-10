import axios from 'axios'

const state = {
  mxtrade: [],
  hisprice: []
}

export default {
  namespaced: true,
  state,
  getters: {
    mxtrade: state => {
      return state.mxtrade
    },
    hisprice: state => {
      return state.hisprice
    }
  },
  actions: {
    async tradeanaly (context, sy) {
      const rootURL = context.rootGetters.uroot
      const furl = rootURL + '/axios/ltc'
      const restt = await axios.get(furl)
      console.log(restt.data)
      console.log(furl)
      context.commit('upmxtrade', restt.data)
    },
    async price_history (context, symbol) {
      const rootURL = context.rootGetters.uroot
      const apiURL = rootURL + '/axios/priceApi?symbol='
      try {
        const response = await axios.get(`${apiURL}${symbol}`)
        context.commit('hisprice', response.data)
        console.log(response.data)
      } catch (error) {
        console.error(`invest 获取股票 ${symbol} 的价格数据时发生错误：`, error)
      }
    }
  },
  mutations: {
    upmxtrade (state, mdat) {
      state.mxtrade = mdat
    },
    hisprice (state, mdat) {
      state.hisprice = mdat
    }
  }
}
