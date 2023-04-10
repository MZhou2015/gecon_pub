<template>
<div class='temp_gt'>
  <orderEdit v-if="sw == 2" :myorder = additems />
  <div class="container my-5" v-if="sw == 1">
    <h2 class="text-center mb-5">Order Detail</h2>
    <div class="row">
      <div class="col-md-9 txa">
        <p><strong>Customer Name:</strong> {{ order.cname }}</p>
        <p><strong>Order No:</strong> {{ order.orderNo }}</p>
        <p><strong>Reference:</strong> {{ order.reference }}</p>
      </div>
      <div class="col-md-3 txa">
        <p><strong>Order Date:</strong> {{ order.date }}</p>
        <p><strong>Order Type:</strong> {{ order.type }}</p>
      </div>
    </div>
    <table class="table mt-5">
      <thead class="thead-light">
        <tr>
          <th>PTcode</th>
          <th>Model</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in order.items" :key="index" class="table-hover" :class="index % 2 === 0 ? 'even' : 'odd'">
          <td>{{ item.ptcode}}</td>
          <td>{{ item.model }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.quantity * item.price }}</td>
        </tr>
        <tr class="bottom">
          <th colspan="4" class="text-end"><strong>Total:</strong></th>
          <th><strong>{{ order.total }}</strong></th>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col-md-3 txa">
        <button type="button" class="btn btn-outline-secondary  btn-sm" @click="editOrder(2) ">Re-entery</button>
       </div>
      <div class="col-md-3 txa">
        <button type="button" class="btn btn-outline-danger  btn-sm" @click="showConfirmation(order.orderNo)" >Delete</button>
        </div>
      <div class="col-md-3 ">
      <button class="btn btn-outline-dark  btn-sm" >Print</button>
      </div>
      <div class="col-md-3 text-end">
      <button class="btn btn-outline-primary  btn-sm" @click="editOrder(3)">Edit</button>
      </div>
    </div>
  </div>
  <button class="btn btn-outline-primary  btn-sm" @click="editOrder2(8)">记录销售</button>
</div>
</template>

<script>
import orderEdit from '../../components/product/orderEdit'
import {mapActions} from 'vuex'

export default {
  name: 'OrderDetail',
  components: {
    orderEdit
  },
  data () {
    return {
      sw: 1,
      additems: null, // items insert to order Edit component
      order: {
        customer_id: null,
        cname: '',
        order_no: '',
        reference: '',
        type: '',
        date: '',
        items: [],
        total: 0
      }
    }
  },
  created () {
    this.initializeOrder()
  },
  methods: {
    ...mapActions({getMyApi: 'PRO/getApi2023', getData: 'PRO/getApi2023Mar', postUp22: 'PRO/postUpdate22'}),
    async initializeOrder () {
      const orderId = this.$route.params.oid
      const orderResponse = await this.getMyApi({type: 'oneorder', no: orderId, status: 100})
      const customerList = JSON.parse(localStorage.getItem('acustomerList')) || []
      if (!orderResponse || !customerList || customerList.length === 0) {
      // handle error or return null
        return
      }
      const order = orderResponse
      const items = order.map(y => {
        let parts = y.date.split('T')[0]
        y.date = parts
        return y
      })
      // console.log(items)
      const ox = items[0]
      const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0)
      const customerId = Number(ox.customer_id)
      const customer = customerList.find(person => person.id === customerId)
      if (!customer) {
      // handle error or return null
        return
      }
      const {company: cname} = customer
      const {reference, type, date} = items[0]
      const orderNo = ox.order_no
      const newOrder = {customerId, cname, orderNo, reference, type, date, items, total}
      this.order = newOrder
    },
    async getApiData (mif) {
      // mif = {type: 'oneorder', no: orderId}
      const apiResponse = await this.getMyApi(mif)
      console.log(apiResponse)
      return apiResponse
    },
    async editOrder (ms) {
      // Do something when "Edit" button is clicked

      const {orderNo, reference, type, date, customerId} = this.order
      // const result3 = this.getApiData({type: 'oneorder', no: orderNo, status: ms})
      // console.log('editOrder ms ', result3)
      const items = this.order.items
      const mx = items.map(item => ({
        ptcode: item.ptcode,
        name: item.name,
        model: item.model,
        price: item.price,
        quantity: item.quantity,
        select: false
      }))
      const myinfo = {orderNo, cid: customerId, refer: reference, type, date, status: ms, items: mx}
      console.log(myinfo)
      this.sw = 2
      this.additems = myinfo
      // this.$store.commit('PRO/orderinfo', myinfo)
    },
    showConfirmation (orid) {
      if (window.confirm('Are you sure you want to delete?')) {
        // 执行删除操作
        this.editOrder2({type: 'deleteOne', no: orid})
      }
    },
    async editOrder2 (ms) {
      const orid = this.order.orderNo
      let frDate = new Date()
      try {
        const mf = {type: 'oneorder', no: orid, status: 8}
        this.$store.commit('PRO/resetOrderItems')
        const orderResponse = await this.getMyApi(mf)
        // console.log(orderResponse)
        const mk = orderResponse
        const mx = mk.map(item => ({
          ptcode: item.ptcode,
          name: item.name,
          model: item.model,
          price: item.price,
          quantity: item.quantity,
          select: false
        }))
        const {orderNo, reference, date, customerId} = this.order
        const myinfo = {orderNo, cid: customerId, refer: reference, type: 'sales_s', date, status: ms, items: mx}
        this.$store.commit('PRO/orders', myinfo)
        const toDate = new Date()
        let t = toDate.getTime() - frDate.getTime()
        console.log('loading time usage:', t)
        this.additems = myinfo
        this.sw = 2
        // this.additems = myinfo // update order information and items
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.txa{
  text-align: left;
}
.txa p{
  color: darkblue;
}
th {
  text-align: center;
}

table {
  border: 1px solid #dee2e6;
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #dee2e6;
  padding: 0.75rem;
  vertical-align: top;
}

.table-hover:hover {
  background-color: #cbcad8;
}

.text-end {
  text-align: end;
}
.even {
  background-color: #f2f2f2;
}

.odd {
  background-color: #ffffff;
}
.bottom {
  background-color: #9ea0ad;
}
</style>
