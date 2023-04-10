import axios from 'axios'

const state = {
  midone: '',
  uid: 111,
  orders: { date: '2021-10-18', cid: 111, orderNo: 4265, refer: 230386, type: 'invs', status: 1 },
  orderrec: {},
  mplist: {most: {bdy: [], subId: 288}, rest: [1, 2]},
  customers: 'aa',
  orderInfo: {No: 4118, date: '2021-10-18', cid: 111, refer: 3586, type: 'sales_s'},
  orderItems: [],
  orderTab1: [],
  productInfo: [{ptcode: 'E23021', description: 'abcxxabc', specification: 'abcxxabc'}],
  userProducts: [12, 32],
  stock: [],
  order2: [{customer_id: 118, date: '2023-03-18', order_no: 118, reference: 118, type: 118}]
}
export default {
  namespaced: true,
  state,
  getters: {
    mplist: state => {
      return state.mplist
    },
    getuserpr: state => {
      return state.userProducts
    },
    xsales: state => {
      return state.orderrec
    },
    eorderItems: state => {
      return state.orderItems
    },
    orderInfo: state => {
      return state.orderInfo
    },
    orderTab1: state => {
      return state.orderTab1
    },
    proinfo: state => {
      return state.productInfo
    },
    stock: state => {
      return state.stock
    }
  },
  actions: {
    async productApi (context, mss) {
      const rootURL = context.rootGetters.uroot
      const pturl = rootURL + '/product/list?type=' + mss
      // const mydt = {username: 'pottt', age: 38}
      const result = await axios.get(pturl)
      // console.log(result.data)
      // console.log(pturl)
      context.commit('mplist', result.data)
    },
    async orderApi (context, mdix) {
      const rootURL = context.rootGetters.uroot
      const furl = rootURL + '/product/order?type=' + 'orderlist' + '&dt1=' + mdix.dt1 + '&dt2=' + mdix.dt2 + '&acc=' + mdix.acc
      // console.log(furl)
      const d = new Date()
      let time = d.getTime()
      const restt = await axios.get(furl)
      var mx = restt.data
      // console.log(mx)
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
      console.log(furl, jmk)
      const hdl = jmk.handle
      const frdd = new Date()
      const restt = await axios.post(furl, jmk)
      switch (hdl) {
        case 'items':
          console.log('Case:', hdl)
          context.commit('addOrderitems', restt.data)
          break
        case 'ordersubmit':
          console.log('Case:', hdl)
          break
        default:
          // code block
      }
      const todd = new Date()
      let elapsed = todd.getTime() - frdd.getTime()
      console.log(restt.data)

      console.log('elaspsed:', elapsed)
    },
    async orderPro2 (context, jmk2) {
      console.log(jmk2)
      const rootURL = context.rootGetters.uroot
      const furl = rootURL + '/gsapi/product/'
      console.log(furl, jmk2)
      const restt = await axios.post(furl, jmk2)
      console.log(restt.data)
    },
    async getApi2023 (context, mpara) {
      const rootURL = context.rootGetters.uroot
      const {type, no, status} = mpara
      console.log(type, no)
      const pturl = `${rootURL}/product/api22?type=${type}&status=${status}&or_no=${no}`
      try {
        const result = await axios.get(pturl)
        return result.data
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async getApi2023Mar (context, para) {
      const rootURL = context.rootGetters.uroot
      const { type, no } = para
      const apiUrl = `${rootURL}/gsapi/product/xc?type=${type}&or_no=${no}`

      const result = await axios.get(apiUrl)
      context.commit('mplist', result.data.output)
      console.log(apiUrl, 'result:', result.data)
    },
    async getApi22 (context, mpara) {
      const rootURL = context.rootGetters.uroot
      const { type, no } = mpara
      const pturl = `${rootURL}/product/api22?type=${type}&or_no=${no}`
      try {
        const result = await axios.get(pturl)
        console.log(result.data)
        switch (type) {
          case 'prohistory':
            context.commit('order1', result.data)
            break
          case 'prodetail':
            context.commit('proinfo', result.data)
            break
          case 'oneorder':
            context.commit('order2', result.data)
            break
          case 'oneItem':
            const ot = [result.data]
            context.commit('addOrderitems', ot)
            break
          default:
            console.error(`Invalid type: ${type}`)
            break
        }
      } catch (error) {
        console.error(error)
      }
    },
    async postUpdate22 (context, mpara) {
      const rootURL = context.rootGetters.uroot
      const pturl = rootURL + '/product/update'
      console.log(pturl, mpara)
      const restt = await axios.post(pturl, mpara)
      console.log(restt.data)
    },
    async sellrecord (context, mpara) {
      const rootURL = context.rootGetters.uroot
      const furl = rootURL + '/product/customer?uid=' + mpara
      console.log(furl)
      const record = await axios.get(furl)
      console.log(record.data)
      context.commit('userpr', record.data)
    },
    async chkStock (context, a) {
      const rootURL = context.rootGetters.uroot
      const furl = rootURL + '/product/stock?type=' + a
      console.log(furl)
      const record = await axios.get(furl)
      console.log(record.data)
      context.commit('stock', record.data)
    }
  },

  mutations: {
    mplist (state, data) {
      state.mplist = data
    },
    orderrec (state, mdat) {
      state.orderrec = mdat
    },
    resetOrderItems (state) {
      state.orderItems = []
    },
    addOrderitems (state, mdat) {
      let a = state.orderItems
      let mx = [...a, ...mdat]
      const result = mx.filter((curr, index, array) => {
        return array.findIndex((item) => item.ptcode === curr.ptcode) === index
      })
      state.orderItems = result
    },
    order1 (state, mdat) {
      state.orderTab1 = mdat
    },
    proinfo (state, mdat) {
      state.productInfo = mdat
    },
    orderinfo (state, mydat) {
      state.orderInfo = mydat
      console.log('commit', mydat)
    },
    userpr (state, mdat) {
      state.userProducts = mdat
    },
    stock (state, mdat) {
      state.stock = mdat
    },
    order2 (state, mydat) {
      state.order2 = mydat
    },
    orders (state, mydat) {
      state.orders = mydat
    }
  }
}
