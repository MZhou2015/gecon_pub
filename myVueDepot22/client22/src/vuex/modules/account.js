import axios from 'axios'

const state = {
  midone: 'xcxc',
  order: {date: '2021-10-18', No: 1000, refNo: 1000, amt: 100, customerId: 24, name: 'UFO', type: 'invs', list: []},
  orderinfo: {isEdit: 1, odno: 101},
  totSales: 886
}
export default {
  namespaced: true,
  state,
  actions: {
    async myactive (context, idx) {
      // const furl = 'http://localhost:5000/account/bankacc'
      const fln = 'https://mzhou2015.github.io/gecon_pub/data2022/pubdata/accact2.csv'
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
      console.log(hm)
      context.commit('getmiddata', hm)
    }
  },
  mutations: {
    getmiddata (state, data) {
      state.midone = data
    }
  }
}
