<template>
  <div class='temp_gt'>
    <div class="pheader">Product List 产品管理</div>
    <orderEdit v-if="pt == 2" :myorder = additems />
    <div class="order" v-if="pt == 5">
      <table>
        <caption> Order History </caption>
        <tr><th>PItem</th><th>Order No</th><th>Model</th><th>Name</th><th>Price</th><th>Shipping</th></tr>
       <tr v-for="(mk,index) in mtb" :key="'x' + index"  ><td>{{index + 1}}</td><td>{{mk.order_no}}</td><td>{{mk.ptcode}}</td><td>{{mk.price}}</td>
        <td>{{mk.quantity}}</td><td>{{mk.type}}</td><td>{{mk.date.split('T')[0]}}</td></tr>
      </table>
    </div>
    <!-- Head of Product Page ... -->
    <div class="container">
      <div class="row">
        <div class="col-md-3 txa">
         <router-link to="/product" >产品库存清单</router-link>
        </div>
        <div class="col-md-3 txa">
         <router-link to="/product" >管理库存</router-link>
        </div>
        <div class="col-md-3 txa">
         <router-link to="/product" >每周销售</router-link>
        </div>
        <div class="col-md-3 txa">
         <button  class="btn  btn-outline-primary btn-sm " @click= orderrefresh()>Order Continu</button>
        </div>
      </div>
    </div>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item tla" role="presentation">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#most" type="button" role="tab" >Most Active</a>
      </li>
         <li class="nav-item tla" role="presentation" v-for="(mk,index) in this.prolist.rest" :key="'x' + index"  >
        <a class="nav-link" id="profile-tab" data-toggle="tab" :href="'#' + mk.itab" type="button" role="tab" aria-controls="profile" aria-selected="false">{{mk.cat}}</a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="most" role="tabpanel" aria-labelledby="home-tab">
        <proTable :malx = msitem :chkItem=chkItem />
      </div><!--    end of  one Block -->
      <div class="tab-pane fade" :id="mtk.itab" role="tabpanel" v-for="(mtk,index) in this.prolist.rest" :key="'j' + index"  >
        <proTable :malx = mtk.sub :chkItem=chkItem />
      </div><!--    end of  one Block -->
    </div>
  </div>
</template>

<script>
import proTable from '../../components/product/protable1'
import orderEdit from '../../components/product/orderEdit'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'product',
  components: {
    proTable,
    orderEdit
  },
  data () {
    return {
      jsdd: null,
      orderitems: [],
      additems: null, // items insert to order Edit component
      pt: 1
    }
  },
  beforeRouteUpdate (to, from, next) {
    const strr = to.params.oid
    console.log(strr)
  },
  created () {
    let mg = 'pl'
    this.pList(mg)
    console.log('param.pid', this.$route.params.oid)
    if (this.$route.params.oid) {
      let mpr = {type: 'invs', no: this.$route.params.oid}
      this.pt = 5
      this.getApi22(mpr)
    }
  },
  mounted () {
    this.accData('customer') // get user/customer list
  },
  computed: {
    ...mapGetters({prolist: 'PRO/mplist', orInfo: 'PRO/orderInfo', mtb: 'PRO/orderTab1'}),
    msitem: function () {
      let mld = []
      mld[0] = this.prolist.most
      return mld
    }
  },
  methods: {
    ...mapActions({pList: 'PRO/productApi', orderPr: 'PRO/orderPro', accData: 'ACC/webaccounts', getApi22: 'PRO/getApi22'}),
    /** *  向子组件 <proTable :malx = msitem :chkItem=chkItem /> 传一个方法，回传给父组件 "ptcode"一个数据
          并放到 变量 this.orderitems 中   ***/
    chkItem: function (item) { // chkItem is a function using  for component : proTable to tranfer data
      this.orderitems.push(item)
      console.log('add, ', this.additems, 'or', this.orderitems)
    },
    orderrefresh: function (item) {
      this.pt = 2
      let mt = this.orderitems.filter((el, index) => this.orderitems.indexOf(el) === index)
      this.orderitems = mt
      let n = this.orderitems.length
      console.log('add, ', this.additems, this.orderitems)
      console.log('n=', n)
      if (n === 1) {
        let cid = this.$store.state.PRO.uid
        let pno = this.orderitems + 'tc' + cid
        this.getApi22({type: 'oneItem', no: pno})
      }
      if (n > 1) {
        const docs = {handle: 'items', cid: this.orInfo.cid, data: mt}
        // this.$store.commit('PRO/addOrderitems', mt)
        this.orderPr(docs)
        this.orderitems = []
      }
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
.order{
  min-height: 120px;
  background-color: #dcdede;
}
table{
  width: 100%;
}
.pheader {
  text-align: center;
  background-color: #c59b3f;
  padding: 8px;
  margin-bottom: 6px;
  color: #5252a2;
  font-size: 20px;
  }
.tla{
    background-color: #cebdb7;
    border-radius: 10px 10px 0 0;
    margin-left: 5px;
    padding: 10px;
    font-weight: bold;
  }

  .nav-link.active {
    background-color: #fff;
    color: #333;
    border: none;
    border-radius: 10px 10px 0 0;
  }

  .nav-link {
    color: #fff;
    border: none;
    border-radius: 10px 10px 0 0;
  }

  .nav-item {
    margin-bottom: -1px;
  }
</style>
