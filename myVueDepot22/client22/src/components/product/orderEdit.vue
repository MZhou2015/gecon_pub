<template>
  <div class='temp_gt'>
    <!-- Order Edit tag  -->
    <div class="container">
      <div class="cap1">Order/Bill  Entry</div>
      <div>
        <table v-if="ors == 2"> <!-- ors == 2  for existing order edit or repost  -->
          <tr><th>Order No.</th><th>Customer</th><th>Reference No.</th><th>Type</th><th>&nbsp;</th><th>Date</th></tr>
          <tr><td>{{order.No}}</td><td>{{order.name}}</td><td>{{order.refNo}}</td><td>{{order.type}}</td><td>&nbsp;</td><td>{{order.date}}</td></tr>
          <tr><th>Item</th><th>PT Code</th><th>Model</th><th>Qty</th><th>Price</th><th>Total</th></tr>
          <tr v-for="(mx,idx) in order.list" :key=idx ><td>{{idx+1}} </td><td>{{mx.ptcode}} </td><td>{{mx.model}} </td><td>{{mx.quantity}} </td>
              <td>{{mx.price}} </td><td>{{mx.tot}} </td></tr>
          <tr><th  ></th><th><a class="btn btn-warning btn-sm" href="#/ledger/lg842" role="button">Re-Post</a></th><th>&nbsp;&nbsp;</th><th>&nbsp;&nbsp;</th>
            <th><a class="btn btn-outline-secondary btn-sm" href="prn_link" target="_blank"  role="button">Print</a></th><th> {{order.amt}} </th></tr>
         </table>
        <table class="owd" >
          <tr class="user" >
            <td>Select a Customer:&nbsp;&nbsp; <select class="input_normal" name="cust" v-model="order.cid" >
                 <option v-for='(value, akey) in $store.state.ACC.customers' :value='value.id' :key=akey >{{value.company}}</option>
                     </select></td><td colspan="2">&nbsp;&nbsp;</td>
          </tr>
        </table>  <!-- Order Entry Initial    -->
      </div>
      <!-- Start of Order Table -->
<table class="ordertab1">
  <!-- Table Header -->
  <thead>
  <tr>
    <!-- Type Column -->
    <th colspan="2">Type</th>
    <th>&nbsp;</th>
    <!-- Order Number Column -->
    <th>Order No.</th>
    <!-- Reference Column -->
    <th>Reference</th>
    <th colspan="2">&nbsp;</th>
    <!-- Date Column -->
    <th>Date</th>
  </tr>
   <!-- Type Selection Row -->
  <tr>
    <td colspan="2">
      <select class="input_normal" name="type" v-model="order.type">
        <!-- Sales Option -->
        <option value="sales_s">Sales</option>
        <!-- Local Purchase Option -->
        <option value="buy_local">buy_local</option>
        <!-- Purchase Option -->
        <option value="buy_s">Purchase</option>
        <!-- Invoice Option -->
        <option value="invs">Invoice</option>
        <!-- Quote Option -->
        <option value="quote">Quote</option>
      </select>
    </td>
    <td>&nbsp;</td>
    <!-- Order Number Input -->
    <td>{{order.orderNo}}</td>
    <!-- Reference Input -->
    <td><input v-model="order.refer" size="5px"></td>
    <td colspan="2">&nbsp;</td>
    <!-- Date Input -->
    <td><input name="dt" type="date" v-model="order.date"></td>
  </tr>
  </thead>
  <tbody>
  <!-- List Data Start -->
  <tr>
    <th>Item</th><th>Delete</th><th>PTcode</th><th>Name</th><th>Model</th><th>Qty</th><th>Price</th><th>Total</th>
  </tr>
   <tr v-for="(vy,inc) in mbd" :key="inc" >
       <td >{{inc + 1}}</td><td ><input type="checkbox" id="checkbox" v-model="vy.select"></td><td>{{vy.ptcode}} </td>
       <td>{{vy.name}}</td> <td>{{vy.model}}</td><td><input v-model="vy.quantity" size="5px" ></td>
       <td><input v-model="vy.price" size="12px"></td>
         <td> {{vy.price * vy.quantity }}</td>
         </tr>
         </tbody>
         <tfoot>
         <tr><th></th><th>&nbsp;&nbsp;</th>
            <th><button type="button" class="btn btn-outline-info btn-sm" @click="update_data(mbd)">Update</button></th><th></th><th></th>
            <th><button type="button" class="btn btn-outline-info btn-sm" @click="submit_data(order)">Submit</button></th><th>&nbsp;&nbsp;</th><th>{{order.amt}}</th></tr>
              <!-- list data end      -->
         </tfoot>
  </table>   <!-- End  Order Tag    -->
  </div><!-- End  div container    -->
  </div><!-- End  div temp_gt    -->
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'orderEdit',
  props: ['myorder'],
  data () {
    return {
      jsdd: null,
      ors: 1,
      order: {orderNo: 56835, refer: 230388, type: 'sales_s', cid: 111, amt: '', date: '2022-11-10'},
      orbdy: [{ptcode: 'E23032', name: 'InAndon Karaoke Player', model: 'KV-503Max', price: 385, quantity: 2, select: false}],
      mdate: ''
    }
  },
  created () {
    this.order = this.$store.state.PRO.orders
    if (this.order.status === 1) {
      const cdate = new Date()
      const iso = cdate.toISOString()
      const jd = iso.split('T')[0]
      this.order.date = jd
    }
    let toDate = new Date()
    let t = toDate.getTime()
    console.log(t)
  },
  mounted () {
    // let toDate = new Date()
    // let t = toDate.getTime()
    // console.log(t)
    if (this.myorder) {
      if (this.order.status === 3) this.$store.commit('PRO/resetOrderItems')
      this.$store.commit('PRO/resetOrderItems')
      this.$store.commit('PRO/addOrderitems', this.myorder.items)
      this.order = this.myorder
      this.$store.commit('PRO/orders', this.order)
    }
  },
  computed: {
    ...mapGetters({mbd: 'PRO/eorderItems'}),
    oitems: function () {
      let mld = this.orbdy
      return mld
    }
  },
  methods: {
    ...mapActions({orderPr: 'PRO/orderPro', orderPR2: 'PRO/orderPro2'}),
    update_data (mx) {
      var mdx = []
      var grt = 0
      mx.forEach((value, index) => {
        value.tt = value.quantity * value.price
        if (value.select === false) {
          mdx.push(value)
          grt += value.tt
        }
      })
      this.$store.state.PRO.orderItems = mdx
      this.order.amt = grt.toFixed(2)
      // this.$store.commit('customer/updatelist2', order)
    },
    submit_data (mx) {
      var mt = this.$store.state.PRO.orderItems
      const newItems = mt.map(({ ptcode, quantity, price }) => ({ ptcode, quantity, price }))
      const {amt, cid, date, orderNo, refer, status, type} = this.order
      const oinfo = {amt, cid, date, orderNo, refer, status, type}
      const docs = {handle: 'ordersubmit', order: oinfo, data: newItems}
      this.$store.commit('PRO/orders', { date: '2021-10-18', cid: 111, orderNo: 4265, refer: 230386, type: 'invs', status: 1 })
      this.orderPR2(docs)
      this.$store.state.PRO.orderItems = []
      console.log('Sub', 'grt')
    }
  }
}
</script>

<!-- Add'scoped' attribute to limit CSS to this component only -->
<style scoped>
caption {
  caption-side: top;
  text-align: center;
  background-color: #eded95;
}
table{
  width: 100%;
}
th{
  color: #4f6b72;
  padding: 6px 6px 6px 12px;
  background: #A4B4DD;
}
td{
  padding: 4px 8px;
}
input{
  width: 120px;
  height: 18px;
}
.user{
  color: #3e5f64;
  font-weight:550 ;
  text-align: left;
  background: #A4B49D;
}
.ordertab1 {
  border-collapse: collapse;
  font-size: 14px;
  width: 100%;
}

.ordertab1 thead th {
  background-color: #3f51b5;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  text-align: left;
}

.ordertab1 tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.ordertab1 tbody tr:hover {
  background-color: #ddd;
}

.ordertab1 tbody td {
  border: 1px solid #ddd;
  padding: 8px;
}

.ordertab1 tfoot td {
  background-color: #3f51b5;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  text-align: right;
}

.ordertab1 tfoot button {
  background-color: #3f51b5;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  padding: 10px;
}

.ordertab1 tfoot button:hover {
  background-color: #1a237e;
}
.ordertab1 td:first-child,
th:first-child {
  width: 5%;
}
.ordertab1 td:nth-child(2),
th:nth-child(2) {
  width: 5%;
}
</style>
