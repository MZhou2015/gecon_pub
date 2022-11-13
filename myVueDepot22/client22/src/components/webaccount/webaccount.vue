<template>
  <div class="webacc">
    <div class="container myt">
      <ledgerEdit v-if="ge == 1" :atrans = transf />
      <button v-if="ge == 0" @click="ge = 1" class="btn btn-secondary btn-sm">Ledger Entry</button>
    </div>
    <!--     *****************************************************    -->
      <div class="tab11" >
        <ul class="nav nav-tabs" id="myTab" role="tablist">
         <li class="nav-item" role="presentation">
          <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</a>
         </li>
         <li class="nav-item" role="presentation">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#tdbank" type="button" role="tab" aria-controls="profile" aria-selected="false">TD Bank</a>
        </li>
        <li class="nav-item" role="presentation">
        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#ledgers" type="button" role="tab" aria-controls="contact" aria-selected="false">General Ledgers</a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <table class = "table ">
            <caption>Sales and Purchase Invoice</caption>
           <thead>
           <tr> <th scope="col">#</th> <th scope="col">Date</th> <th scope="col">Invoice No.</th><th scope="col">Type</th><th scope="col">amount</th>
                <th scope="col">Customer</th>     <th scope="col">Action</th>
               </tr>
             </thead>
           <tbody>
             <tr v-for="(mv,index) in $store.state.ACC.orders" :key=index  class="trans" ><td>{{index+1}}</td><td>{{mv.date}}</td><td>{{mv.reference}}</td>
                <td>{{mv.type}}</td><td>{{mv.amount}}</td><td>{{mv.company}}</td><td><button @click="btnEntry(mv)" class="btn btn-secondary btn-sm">Select</button></td></tr>
           </tbody>
          </table>
        </div>
        <div class="tab-pane fade" id="tdbank" role="tabpanel" aria-labelledby="profile-tab">
          <table class = "table ">  <!-- Show Bank account  activities  here    -->
            <caption>Bank Account Transations</caption>
           <thead>
           <tr>
            <th scope="col">#</th> <th scope="col">Date</th>  <th scope="col">description</th> <th scope="col">Debit</th>
            <th scope="col">Credit</th>  <th scope="col">Balance</th>   <th scope="col">Action</th>
           </tr>
             </thead>
             <tbody>
             <tr v-for="(mv,idx) in $store.state.ACC.midone" :key=idx  class="trans" ><td>{{idx+1}}</td><td>{{mv[0]}}</td><td>{{mv[1]}}</td>
                <td>{{mv[2]}}</td><td>{{mv[3]}}</td><td>{{mv[4]}}</td><td><button @click="btnEntry(mv)" class="btn btn-secondary btn-sm">Select</button></td></tr>
              </tbody>
           </table>
        </div> <!--    end of  Bank account list  -- -->
        <div class="tab-pane fade" id="ledgers" role="tabpanel" aria-labelledby="contact-tab">
          <table class = "table ">  <!-- Show General Ledger List  here    -->
            <caption>General Ledger List</caption>
           <thead>
           <tr>
            <th scope="col">#</th><th>Trans No.</th> <th scope="col">Date</th><th>Account</th>  <th scope="col">Reference</th> <th scope="col">Debit</th>
            <th scope="col">Credit</th><th>Comment</th>
           </tr>
             </thead>
             <tbody>
              <tr v-for="(mv,index) in $store.state.ACC.ledgerlist" :key=index  class="trans" ><td>{{index+1}}</td><td>{{mv.trans_no}}</td><td>{{mv.date}}</td><td>{{mv.acc_name}}</td><td>{{mv.referance}}</td>
                <td>{{mv.debit}}</td><td>{{mv.credit}}</td><td>{{mv.comment}}</td></tr>
           </tbody>
           </table>
        </div><!--    end of  Ledger list  -- -->
      </div>
    </div> <!-- end of Div  tab11 -->
    <!--    bootStrap    Tabs  list on above           -->
  </div>
</template>

<script>
import ledgerEdit from '../../components/webaccount/ledgerEdit'
import {mapActions, mapMutations} from 'vuex'

export default {
  name: 'webAcc',
  components: {
    ledgerEdit
  },
  data () {
    return {
      msg: 'Welcome to Navigation Bar',
      transf: null,
      ge: 0
    }
  },
  mounted () {
    this.$store.dispatch('ACC/myactive') // Get bank account activities
    this.accData('webacc') // get web account list
    this.accData('customer') // get user/customer list
    this.accData('invoice') // get sales or purchase invoice
    this.accData('ledger') // get general Ledgers
  },
  methods: {
    ...mapActions({accData: 'ACC/webaccounts'}),
    ...mapMutations({addledger: 'ACC/addledger'}),
    btnEntry: function (item) {
      this.ge = 1
      let aob = Array.isArray(item)
      console.log(item)
      console.log(aob)
      let mv = {}
      if (aob) {
        mv = {acc: 10180, accName: 'TD checking', date: item[0], debit: Number(item[3]), credit: Number(item[2]), comment: item[1], refer: 'general entry'}
        this.addledger(mv)
      } else {
        if (item.type === 'invs') {
          mv = {acc: 40100, accName: 'Sales for Inventry', date: item.date, debit: 0.00, credit: Number(item.amount), comment: item.company.trim(), refer: item.reference}
          this.addledger(mv)
          let gst = 0.05 * Number(item.amount).toFixed(2)
          mv = {acc: 20230, accName: 'GST Charge for Sales', date: item.date, debit: 0.00, credit: gst, comment: item.company.trim(), refer: item.reference}
          this.addledger(mv)
        }
        if (item.type === 'buy_local') {
          mv = {acc: 50215, accName: 'Purchase Local', date: item.date, debit: Number(item.amount), credit: 0.00, comment: item.company.trim(), refer: item.reference}
          this.addledger(mv)
          let gst = (0.05 * Number(item.amount)).toFixed(2)
          mv = {acc: 20210, accName: 'GST Paid on Purchase', date: item.date, debit: gst, credit: 0.00, comment: item.company.trim(), refer: item.reference}
          this.addledger(mv)
        }
        this.transf = {acc: 30200, refer: item.reference, date: item.date, cid: item.customer_id}
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.webacc{
  padding-bottom: 26px;
}
.myt{
  padding: 10px;
  text-align: right;
}
.trans {
 height: 12px;
}
caption {
    caption-side: top;
    text-align: center;
    background-color: #eded95;
  }
</style>
