<template>
    <div class="webacc">
        <table class="tgc1">
        <caption>Recent Orders</caption>
        <tr><th>Item</th><th>Order No</th><th>Customer</th><th>Reference</th><th>Amount</th><th>Type</th><th>Date</th></tr>
        <tr  v-for="(mk,index) in mxs.rec10" :key="'x' + index"  ><th>{{index+1}}</th><td>{{mk.order_no}}</td><td>{{mk.Name}}</td><td>{{mk.reference}}</td>
            <td>{{mk.amount}}</td><td>{{mk.type}}</td><td>{{mk.date}}</td></tr>
      </table>
       <!--     *****************************************************    -->
     <div class="tab11" >
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <a class="nav-link active" id="home-tab" data-toggle="tab" href="#sales_s" type="button" role="tab" >Sales</a>
        </li>
         <li class="nav-item" role="presentation">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#invoice" type="button" role="tab" aria-controls="profile" aria-selected="false">Invoice</a>
        </li>
        <li class="nav-item" >
        <a class="nav-link" data-toggle="tab" href="#buy_local" type="button" role="tab" aria-selected="false">Buy Local</a>
        <li class="nav-item" >
        <a class="nav-link" data-toggle="tab" href="#purchase" type="button" role="tab" aria-selected="false">Purchase</a>
        </li>
        <li class="nav-item" >
        <a class="nav-link" data-toggle="tab" href="#quote" type="button" role="tab" aria-selected="false">Quote</a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="sales_s" role="tabpanel" aria-labelledby="home-tab">
          <table1 :mapp = jsdd :marx = mxs.sales />
        </div><!--    end of  one Block -->
        <div class="tab-pane fade" id="invoice" role="tabpanel" aria-labelledby="profile-tab">
          <table1 :mapp = jinv :marx = mxs.invoice />
        </div><!--    end of  one Block -->
        <div class="tab-pane fade" id="buy_local" role="tabpanel" aria-labelledby="profile-tab">
          <table1 :mapp = jbuy :marx = mxs.blocal />
        </div><!--    end of  one Block -->
        <div class="tab-pane fade" id="purchase" role="tabpanel" aria-labelledby="profile-tab">
          <table1 :mapp = jinv :marx = mxs.purchase />
        </div><!--    end of  one Block -->
        <div class="tab-pane fade" id="quote" role="tabpanel" aria-labelledby="profile-tab">
          <table1 :mapp = jbuy :marx = mxs.quote />
        </div><!--    end of  one Block -->
      </div>
     </div>
  </div>
</template>

<script>
import Table1 from '../../components/tablelist1'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'balance',
  components: {
    Table1
  },
  data () {
    return {
      jsdd: 'Sales List',
      jinv: 'Invoice List',
      jbuy: 'Buy Local',
      fdate: '2022-08-20'
    }
  },
  created () {
    console.log(this.fdate)
  },
  mounted () {
    let mytime = JSON.parse(localStorage.getItem('accountingDate'))
    this.saleList(mytime)
  },
  computed: {
    ...mapGetters({mxs: 'PRO/xsales'})
  },
  methods: {
    ...mapActions({saleList: 'PRO/orderApi'})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 caption {
  caption-side: top;
  text-align: center;
  background-color: #c59b3f;
  color: #5252a2;
  font-size: 20px;
  }
  table.tgc1 {
  width: 100%;
  background-color: #FDF5E6;
}
table.tgc1 td {
  background-color: #8Ca381;
  text-align: right;
  padding: 6px 18px;
  margin: 2px;
  border-right: 1px solid #C1DAD7;
  border-bottom: 1px solid #C1DAD7;
}
.tgc1 th{
  background: #CD853F;
  border-right: 1px solid #C1DAD7;
  border-bottom: 1px solid #C1DAD7;
}
.tgc1 caption {
  color: #212121;
  font-size: 16px;
  font-weight: 550;
  background-color: #a59b8f;
  padding-bottom: 3px;
  padding-top: 3px;

}
</style>
