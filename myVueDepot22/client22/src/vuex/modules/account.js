import axios from 'axios'

const state = {
  midone: '',
  orders: { date: '2021-10-18', name: 'UFO', type: 'invs', list: [] },
  orderinfo: { isEdit: 1, odno: 101 },
  tbData: 'aa',
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
    xtledger: state => {
      return state.xtledger
    },
    accSum: state => {
      return state.accSum
    }
  },
  actions: {
    async myactive (context, idx) {
      // const furl = 'http://localhost:5000/account/bankacc'
      const fln =
        'https://mzhou2015.github.io/gecon_pub/data2022/pubdata/accact2.csv'
      const restt = await axios.get(fln)
      var mx = restt.data
      const myArray = mx.split(/\r\n|\n|\r/)
      var hm = []
      myArray.forEach(element => {
        let xa = element.split(',')
        let da = xa[0].split('/')
        xa[0] = da[2] + '-' + da[0] + '-' + da[1]
        hm.push(xa)
      })
      // console.log(hm)
      context.commit('getmiddata', hm)
    },
    async webaccPost (context, mdix) {
      const rootURL = context.rootGetters.uroot
      const pturl = rootURL + '/account/add'
      // const mydt = {username: 'pottt', age: 38}
      const result = await axios.post(pturl, mdix)
      console.log(mdix)
      console.log(rootURL, result.data)
    },
    async webaccounts (context, mdix) {
      const rootURL = context.rootGetters.uroot
      console.log(rootURL)
      const furl = rootURL + '/account/bankacc?type=' + mdix
      const restt = await axios.get(furl)
      var mx = restt.data
      switch (mdix) {
        case 'webacc':
          let mc = []
          mx.forEach(xv => {
            mc.push({ acc: xv.acc_no, accName: xv.acc_name })
          })
          // console.log(mc)
          context.commit('tbdata', mc)
          localStorage.setItem('accList', JSON.stringify(mc))
          console.log(mdix)
          break
        case 'customer':
          context.commit('customer', mx)
          localStorage.setItem('acustomerList', JSON.stringify(mx))
          break
        case 'invoice':
          var md = []
          mx.forEach(nk => {
            let dt = nk.date.split('T')[0]
            nk.date = dt
            md.push(nk)
          })
          context.commit('orders', md)
          break
        case 'ledger':
          console.log(mdix)
          context.commit('listLedger', mx)
          break
        default:
          let text = 'Looking forward to the Weekend'
          console.log(text)
      } // End of switch
    },
    async webaccApi (context, mdix) {
      const rootURL = context.rootGetters.uroot
      const furl =
        rootURL +
        '/account/finreport?type=' +
        mdix.type +
        '&dt1=' +
        mdix.dt1 +
        '&dt2=' +
        mdix.dt2 +
        '&acc=' +
        mdix.acc
      console.log(furl)
      const d = new Date()
      let time = d.getTime()
      console.log(time)
      const restt = await axios.get(furl)
      var mx = restt.data
      console.log(mdix)
      console.log(mx)
      const dx = new Date()
      let time2 = dx.getTime()
      console.log('time usage', time2 - time)
      context.commit('getSum', mx)
    },
    async bs3Api (context, mdix) {
      const rootURL = context.rootGetters.uroot
      const furl = rootURL + '/account/bs3?type=' + mdix.type + '&dt1=' + mdix.dt1 + '&dt2=' + mdix.dt2 + '&acc=' + mdix.acc
      console.log(furl)
      const d = new Date()
      let time = d.getTime()
      const restt = await axios.get(furl)
      var mx = restt.data
      console.log(mx)
      const dx = new Date()
      let time2 = dx.getTime()
      console.log('time usage', time2 - time)
      context.commit('getSum', mx)
    }
  },
  mutations: {
    getmiddata (state, data) {
      state.midone = data
    },
    getSum (state, mdat) {
      state.accSum = mdat
    },
    orders (state, mdat) {
      state.orders = mdat
    },
    tbdata (state, mdat) {
      state.tbData = mdat
    },
    customer (state, mdat) {
      state.customers = mdat
    },
    reSetled (state, mdat) {
      state.xtledger = mdat
    },
    listLedger (state, mdat) {
      state.ledgerlist = mdat
    },
    addledger (state, mdat) {
      if (state.xtledger) {
        state.xtledger.push(mdat)
      } else {
        state.xtledger = []
        state.xtledger.push(mdat)
      }
    },
    addledger3 (state, mdat) {
      state.xtledger = mdat
    }
  }
}
