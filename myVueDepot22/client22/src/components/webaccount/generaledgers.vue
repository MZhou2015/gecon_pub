<template>
    <div class="webacc">
      <ledgerEdit v-if="swl == 2" :atrans = transf />
      <table class="table caption-top" v-if="swl == 1">
        <caption>General Ledger for account {{accNo}}</caption>
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Trans No</th>
            <th scope="col">Date</th>
            <th scope="col">Referance</th>
            <th scope="col">Debit</th>
            <th scope="col">Credit</th>
            <th scope="col">Balance</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(mv,idx) in acclist" :key="'E' + idx"   class="trans" ><td>{{idx+1}}</td><td><router-link :to="'/generals/gl'+ mv.trans_no" >{{mv.trans_no}}</router-link></td><td class="aname">{{mv.date}}</td>
              <td class="aname">{{mv.referance}}</td><td class="anmb">{{mv.debit}}</td><td class="anmb">{{mv.credit}}</td><td>{{mv.credit}}</td></tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import ledgerEdit from '../../components/webaccount/ledgerEdit'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'general',
  components: {
    ledgerEdit
  },
  data () {
    return {
      msg: 'Welcome !',
      accNo: '10180',
      transf: null,
      swl: 1
    }
  },
  beforeRouteUpdate (to, from, next) {
    const strr = to.params.pid
    const lid = strr.slice(0, 2)
    if (lid === 'gl') this.swl = 2
    var trno = strr.slice(2)
    console.log(strr.slice(2))
    console.log('before update', strr, lid)
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
    ...mapGetters({acclist: 'ACC/accSum'})
  },
  methods: {
    ...mapActions({accountApi: 'ACC/webaccApi'})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
caption {
    caption-side: top;
    text-align: center;
    background-color: #eded95;
  }
  .aname{
    text-align: left;
  }
  .anmb{
    text-align: right;
  }
</style>
