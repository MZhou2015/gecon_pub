import axios from 'axios'

const state = {
  midone: '',
  orders: { date: '2021-10-18', name: 'UFO', type: 'invs', list: [] },
  orderrec: {},
  mplist: {most: {bdy: [], subId: 288}, rest: [1, 2]},
  customers: 'aa',
  xtledger: null,
  ledgerlist: [],
  totSales: 886,
  accSum: []
}
export default {
  namespaced: true,
  state,
  getters: {
    mplist: state => {
      return state.mplist
    },
    xsales: state => {
      return state.orderrec
    },
    accSum: state => {
      return state.accSum
    }
  },
  actions: {
    async productApi (context, mss) {
      const rootURL = context.rootGetters.uroot
      const pturl = rootURL + '/product/list?type=' + mss
      // const mydt = {username: 'pottt', age: 38}
      const result = await axios.get(pturl)
      console.log(result.data)
      console.log(pturl)
      context.commit('mplist', result.data)
    },
    async orderApi (context, mdix) {
      const rootURL = context.rootGetters.uroot
      const furl = rootURL + '/product/order?type=' + 'orderlist' + '&dt1=' + mdix.dt1 + '&dt2=' + mdix.dt2 + '&acc=' + mdix.acc
      console.log(furl)
      const d = new Date()
      let time = d.getTime()
      const restt = await axios.get(furl)
      var mx = restt.data
      console.log(mx)
      const custNm = JSON.parse(localStorage.getItem('acustomerList'))
      mx.rec10.forEach(element => {
        let result = custNm.filter(obj => {
          return obj.id === element.customer_id
        })
        let name = result[0].company.trim()
        element.Name = name
      })
      const dx = new Date()
      let time2 = dx.getTime()
      console.log('time usage', time2 - time)
      context.commit('orderrec', mx)
    },
    async orderPro (context, jmk) {
      const rootURL = context.rootGetters.uroot
      const furl = rootURL + '/product/order'
      const docs = {handle: 'fgt', data: 23568}
      console.log(furl, docs)
      const frdd = new Date()
      const restt = await axios.post(furl)
      const todd = new Date()
      let elapsed = todd.getTime() - frdd.getTime()
      console.log(restt.data)
      console.log('elaspsed:', elapsed)
    }
  },
  mutations: {
    mplist (state, data) {
      state.mplist = data
    },
    orderrec (state, mdat) {
      state.orderrec = mdat
    }
  }
}
