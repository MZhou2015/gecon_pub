<template>
  <div class='webacc'>
    <ledgerEdit v-if='swl == 3' :atrans='transf' />
    <table class='table caption-top' v-if='swl == 1'>
      <caption>
        General Ledger for account  {{accNo}}
      </caption>
      <thead>
        <tr>
          <th scope='col'>#</th><th scope='col'>Trans No</th><th scope='col'>Date</th><th scope='col'>Referance</th>
          <th scope='col'>Debit</th><th scope='col'>Credit</th><th scope='col'>Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(mv, idx) in acclist' :key="'E' + idx" class='trans'>
          <td>{{ idx + 1 }}</td><td><router-link :to="'/generals/gl' + mv.trans_no">{{mv.trans_no}}</router-link></td>
          <td class='aname'>{{ mv.date }}</td><td class='aname'>{{ mv.referance }}</td><td class='anmb'>{{ mv.debit }}</td>
          <td class='anmb'>{{ mv.credit }}</td><td>{{ mv.credit }}</td>
        </tr>
      </tbody>
    </table>
    <!--  ************************************************************* -->
     <table class='table caption-top' v-if='swl == 2'>
      <caption>
        General Ledger for account  <br />Trans No: {{traNo}}
      </caption>
      <thead>
        <tr>
          <th scope='col'>#</th><th scope='col'>Account No</th><th scope='col'>Date</th><th scope='col'>Referance</th>
          <th scope='col'>Debit</th><th scope='col'>Credit</th><th scope='col'>Comment</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(mv, idx) in acclist' :key="'D' + idx" class='trans'>
          <td>{{ idx + 1 }}</td><td>{{mv.acc_no}}</td>
          <td class='aname'>{{ mv.date }}</td><td class='aname'>{{ mv.referance }}</td><td class='anmb'>{{ mv.debit }}</td>
          <td class='anmb'>{{ mv.credit }}</td><td>{{ mv.comment}}</td>
        </tr>
        <tr><td>&nbsp;&nbsp;</td><td> <button @click= "rePost()" >Re-Post </button></td><td>&nbsp;&nbsp;</td><td><router-link :to="'/generals/' + accNo" >Back</router-link></td></tr>
      </tbody>
     </table>
    {{swl}}
</div>
</template>

<script>
import ledgerEdit from '../../components/webaccount/ledgerEdit'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'general',
  components: {
    ledgerEdit
  },
  data () {
    return {
      msg: 'Welcome !',
      accNo: '10180',
      traNo: '1008',
      transf: null,
      swl: 1
    }
  },
  beforeRouteUpdate (to, from, next) {
    const strr = to.params.pid
    const lid = strr.slice(0, 2)
    let ms = 'aledger'
    let trno = '1008'
    if (lid === 'gl') {
      this.swl = 2
      trno = strr.slice(2)
      this.traNo = trno
    } else {
      this.swl = 1
      ms = 'accLedger'
      trno = strr
    }
    this.getAccList(ms, trno)
    next()
  },
  created () {
    console.log(this.$route.params.pid)
    this.accNo = this.$route.params.pid
    let mytime = JSON.parse(localStorage.getItem('accountingDate'))
    mytime.type = 'accLedger'
    mytime.acc = this.accNo
    const d = new Date()
    let time = d.getTime()
    console.log(time)
    this.accountApi(mytime)
  },
  computed: {
    ...mapGetters({ acclist: 'ACC/accSum' })
  },
  methods: {
    ...mapActions({ accountApi: 'ACC/webaccApi' }),
    getAccList: function (tp, item) {
      let mytime = JSON.parse(localStorage.getItem('accountingDate'))
      mytime.type = tp
      mytime.acc = item
      console.log(mytime, tp, item)
      this.accountApi(mytime)
    },
    rePost: function () {
      console.log('Repost')
      this.swl = 3
      let tit = this.acclist[0]
      this.transf = {acc: 30200, refer: tit.referance, date: tit.date, cid: tit.cid}
      let alst = this.acclist
      alst.forEach(element => {
        element.acc = element.acc_no
      })
      this.$store.commit('ACC/addledger3', alst)
      console.log(alst)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
caption {
  caption-side: top;
  text-align: center;
  background-color: #eded95;
}
.aname {
  text-align: left;
}
.anmb {
  text-align: right;
}
.webacc{
  padding-bottom: 25px;
}
</style>
