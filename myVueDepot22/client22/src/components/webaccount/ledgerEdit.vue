<template>
    <div class="template">
       <table class="gent">
        <caption> General Entry</caption>
        <thead>
          <tr><td>Account No.<select class="form1"  v-model='ltitle.acc'  v-on:change="newLedger" >
               <option v-for='(val, index) in $store.state.ACC.tbData' :value='val.acc' :key=index>{{val.accName}}</option>
                </select>
              </td>
              <td>Reference: <input type="text" v-model="ltitle.refer"></td>
              <td>Date: <input type="date" v-model="ltitle.date" ></td>
              <td>Customer:<select class="form1"  v-model='ltitle.cid' >
               <option v-for='(val, index) in $store.state.ACC.customers' :value='val.id' :key=index>{{val.company}}</option>
                </select> </td>
          </tr>
        <tr>
            <th scope="col">Account</th><th scope="col">Debit</th><th scope="col">Credit</th><th scope="col">Comment</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(Value, index) in mledger" :key=index >
              <td>{{Value.accName}}</td>
              <td><input type="text" v-model="Value.debit"></td>
              <td><input type="text" v-model="Value.credit"></td>
              <td><input type="text" v-model="Value.comment"></td>
             </tr>
             <tr><th>{{bal}} &nbsp;&nbsp;</th><th><button class="btn btn-secondary btn-sm"  @click="upDate" >Update</button></th><th>&nbsp;&nbsp;</th>
                 <th><button type="submit" class="btn btn-secondary btn-sm" @click="btnSubmit(mledger)">Submit</button></th></tr>
        </tbody>
    </table>
  {{msg}}
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'ledgerEdit',
  props: ['atrans'],
  data () {
    return {
      msg: '',
      element: [],
      ltt: {acc: 30200, refer: 'general entry', date: '2022-10-10', cid: 109},
      xledger: null,
      bal: '',
      mxup: {}
    }
  },
  created () {
    console.log(this.atrans)
    this.getCookie()
  },
  mounted () {
    this.xledger = this.ledgers
    let ckie = this.$store.state.mycookies
    if (ckie.lastSession) this.ltt.date = ckie.lastSession
  },
  computed: {
    ...mapGetters({mledger: 'ACC/xtledger'}),
    ltitle: function () {
      var lds = this.ltt
      if (this.atrans) {
        lds = this.atrans
      }
      return lds
    }
  },
  methods: {
    ...mapActions({ledgerPost: 'ACC/webaccPost', setCookie: 'setCookie', getCookie: 'getCookie'}),
    ...mapMutations({addledger: 'ACC/addledger'}),
    newLedger: function () {
      let result = this.$store.state.ACC.tbData.find(({ acc }) => acc === this.ltitle.acc) // get account Name
      let customer = this.$store.state.ACC.customers.find(({ id }) => id === this.ltitle.cid) // get account Name
      let tbup = {}
      tbup.acc = this.ltitle.acc
      tbup.accName = result.accName
      tbup.cid = this.ltitle.cid
      tbup.comment = customer.company
      tbup.ckm = 1
      var cc = 0
      var dc = 0
      var d = 0
      if (this.mledger) {
        this.mledger.forEach(xv => {
          dc += Number(xv.debit)
          cc += Number(xv.credit)
        })
        d = Number(dc - cc).toFixed(3)
      }
      if (d >= 0) {
        tbup.debit = 0.00
        tbup.credit = Math.abs(d)
      } else {
        tbup.debit = Math.abs(d)
        tbup.credit = 0.00
      }
      this.addledger(tbup)
    },
    btnSubmit: function (mlg) {
      console.log('Submited', mlg)
      var mx = []
      mlg.forEach(vxl => {
        let vk = {}
        vk.acc = vxl.acc
        vk.date = this.ltitle.date
        vk.refer = this.ltitle.refer
        vk.debit = vxl.debit
        vk.credit = vxl.credit
        vk.comment = vxl.comment
        vk.cid = this.ltitle.cid
        mx.push(vk)
      })
      console.log(mx)
      this.ledgerPost(mx)
      this.$store.commit('ACC/reSetled', null)
      this.msg = 'This ledger has been saved. please continu ...'
      this.bal = null
      this.setCookie(this.ltitle.date)
    },
    upDate: function () {
      let tld = []
      var cc = 0
      var dc = 0
      if (this.mledger) {
        tld = this.mledger.filter(vl => { return vl.debit > 0 || vl.credit > 0 })
        tld.forEach(kx => {
          dc += Number(kx.debit)
          cc += Number(kx.credit)
        })
      }
      this.bal = Number(dc - cc).toFixed(3)
      // console.log(tld)
      this.$store.commit('ACC/reSetled', tld)
      this.msg = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gent{
  width: 100%;
  padding: 8px;
  margin: 8px;
}
.gent th{
  background-color: #e6f6f8;
  text-align: center;
}
.gent td{
  height: 38px;
  text-align: center;
  background-color: #ebebeb;
}
input{
  width: 180px;
  height: 22px;
}
select {
  width: 160px;
}
</style>
