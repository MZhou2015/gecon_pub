<template>
    <div class="webacc">
       <!--     *****************************************************    -->
     <div class="tab11" >
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</a>
        </li>
         <li class="nav-item" role="presentation">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#balance" type="button" role="tab" @click="getbalance('balance')">Balance Sheet</a>
        </li>
        <li class="nav-item" role="presentation">
        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#income" type="button" role="tab" @click="getbalance('income')">Income statement</a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <table class = "table nvt">
            <caption>Date Setting</caption>
            <tbody>
             <tr  class="trans" ><td>Start Date:</td><td><input type="date" v-model="fdate" ></td><td>End Date:</td><td><input type="date" v-model="endDate"></td>
                <td><button @click="setting" class="btn btn-secondary btn-sm">&nbsp; Set &nbsp;</button></td></tr>
           </tbody>
          </table>
        </div>
        <div class="tab-pane fade" id="balance" role="tabpanel" aria-labelledby="profile-tab">
          <table class = "table ">  <!-- Show Bank account  activities  here    -->
            <caption><span>Balance &nbsp;&nbsp;Sheet</span> <br /> {{endDate}}</caption>
           <thead>
           <tr><th scope="col">Assets</th><th colspan="4">&nbsp;&nbsp;</th></tr>
             </thead>
             <tbody>
             <tr v-for="(mv,idx) in bisheet.blk1" :key="'A' + idx"  class="trans" ><td>{{idx+1}}</td><td><router-link :to="'/generals/'+ mv.accNo" >{{mv.accNo}}</router-link></td><td class="aname">{{mv.accname}}</td>
                <td>{{mv.sum}}</td><td>{{mv.type}}</td></tr>
                <tr><th>&nbsp;&nbsp;</th><th scope="col">Assets Total</th><th colspan="2">&nbsp;&nbsp;</th><th>{{bisheet.tasset}}</th></tr>
             <tr v-for="(mv,idx) in bisheet.blk2" :key="'L' + idx"  class="trans" ><td>{{idx+1}}</td><td><router-link :to="'/generals/'+ mv.accNo" >{{mv.accNo}}</router-link></td><td class="aname">{{mv.accname}}</td>
                <td>{{mv.sum}}</td><td>{{mv.type}}</td></tr>
                <tr><th>&nbsp;&nbsp;</th><th>Total in Liabilities:</th><th colspan="2">&nbsp;&nbsp;</th><th>{{bisheet.tliab}}</th></tr>
              <tr v-for="(mv,idx) in bisheet.blk3" :key=idx  class="trans" ><td>{{idx+1}}</td><td><router-link :to="'/generals/'+ mv.accNo" >{{mv.accNo}}</router-link></td><td class="aname">{{mv.accname}}</td>
                <td>{{mv.sum}}</td><td>{{mv.type}}</td></tr>
                <tr><th>&nbsp;&nbsp;</th><th>Total in Equity:</th><th colspan="2">&nbsp;&nbsp;</th><th>{{bisheet.tequity}}</th></tr>
                <tr><th>&nbsp;&nbsp;</th><th>&nbsp;</th><th colspan="2">&nbsp;&nbsp;</th><th>&nbsp;</th></tr>
                <tr><th>&nbsp;&nbsp;</th><th>Total Liability and Equity:</th><th colspan="2">&nbsp;&nbsp;</th><th>{{bisheet.tle}}</th></tr>
              </tbody>
           </table>
        </div> <!--    end of  Bank account list  -- -->
        <div class="tab-pane fade" id="income" role="tabpanel" >
          <table class = "table ">  <!-- Show Income Statement   here    -->
            <caption><span>Income &nbsp;&nbsp;Statement</span> <br /> from {{fdate}} to {{endDate}}</caption>
           <thead>
           <tr><th scope="col">Income</th><th colspan="4">&nbsp;&nbsp;</th></tr>
             </thead>
             <tbody>
               <tr v-for="(mv,idx) in bisheet.blk4" :key="'I' + idx"   class="trans" ><td>{{idx+1}}</td><td><router-link :to="'/generals/'+ mv.accNo" >{{mv.accNo}}</router-link></td><td class="aname">{{mv.accname}}</td>
                <td>{{mv.sum}}</td><td>{{mv.type}}</td></tr>
                <tr><th>&nbsp;&nbsp;</th><th>Total in income:</th><th colspan="2">&nbsp;&nbsp;</th><th>{{bisheet.tincome}}</th></tr>
              <tr><th scope="col">Expanse</th><th colspan="4">&nbsp;&nbsp;</th></tr>
              <tr v-for="(mv,idx) in bisheet.blk5" :key="'E' + idx"   class="trans" ><td>{{idx+1}}</td><td><router-link :to="'/generals/'+ mv.accNo" >{{mv.accNo}}</router-link></td><td class="aname">{{mv.accname}}</td>
                <td>{{mv.sum}}</td><td>{{mv.type}}</td></tr>
                <tr><th>&nbsp;&nbsp;</th><th>Total in Expanse:</th><th colspan="2">&nbsp;&nbsp;</th><th>{{bisheet.texpanse}}</th></tr>
                <tr><th>&nbsp;&nbsp;</th><th>&nbsp;&nbsp;</th><th colspan="4">&nbsp;&nbsp;</th></tr>
                <tr><th>&nbsp;&nbsp;</th><th>Net Income:</th><th colspan="2">&nbsp;&nbsp;</th><th>{{bisheet.net}}</th></tr>
              </tbody>
           </table>
        </div> <!--    end of  Bank account list  -- -->
       </div>
     </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'balance',
  data () {
    return {
      jsdd: null,
      fdate: '2022-10-01',
      endDate: '2022-10-26',
      bisheet: ''
    }
  },
  created () {
    let mytime = JSON.parse(localStorage.getItem('accountingDate'))
    this.fdate = mytime.dt1
    this.endDate = mytime.dt2
    mytime.type = 'bs3'
    mytime.acc = 'All'
    this.bs3Api(mytime)
  },
  mounted () {
    console.log(this.fdate)
    if (this.$store.state.ACC.tbData === 'aa') {
      let acl = JSON.parse(localStorage.getItem('accList'))
      this.$store.commit('ACC/tbdata', acl)
    }
    if (this.$store.state.ACC.customers === 'aa') {
      let acl = JSON.parse(localStorage.getItem('acustomerList'))
      this.$store.commit('ACC/customer', acl)
    }
  },
  computed: {
    ...mapGetters({accsummary: 'ACC/accSum'})
  },
  methods: {
    ...mapActions({accountApi: 'ACC/webaccApi', bs3Api: 'ACC/bs3Api'}),
    getbalance: function (mthd) {
      let totasset = 0
      let totliab = 0
      let totequity = 0
      let totexpanse = 0
      let totincome = 0
      let blk1 = []
      let blk2 = []
      let blk3 = []
      let blk4 = []
      let blk5 = []
      const bal = this.accsummary.return.inlist
      bal.forEach(element => {
        if (element.accNo < 19999) {
          totasset += Number(element.sum)
          blk1.push(element)
        }
        if (element.accNo > 19900 && element.accNo < 29999) {
          totliab += Number(element.sum)
          blk2.push(element)
        }
        if (element.accNo > 29999 && element.accNo < 39999) {
          totequity += Number(element.sum)
          blk3.push(element)
        }
      })
      const net = this.accsummary.return.netincome
      totequity += Number(net)
      blk3.push({accNo: 39000, sum: net})
      const state = this.accsummary.statement.inlist
      state.forEach(element => {
        if (element.accNo > 39999 && element.accNo < 49999) {
          totincome += Number(element.sum)
          blk4.push(element)
        }
        if (element.accNo > 49999) {
          totexpanse += Number(element.sum)
          blk5.push(element)
        }
      })
      totexpanse = totexpanse.toFixed(2)
      let totle = totliab + totequity
      let netincome = Number(totincome - totexpanse).toFixed(2)

      this.bisheet = {
        tasset: totasset,
        tliab: totliab,
        tequity: totequity,
        tincome: totincome,
        texpanse: totexpanse,
        tle: totle,
        net: netincome,
        blk1: blk1,
        blk2: blk2,
        blk3: blk3,
        blk4: blk4,
        blk5: blk5
      }
      console.log(mthd, this.fdate, this.endDate)
    },
    setting: function () {
      let ddtime = {dt1: this.fdate, dt2: this.endDate}
      localStorage.setItem('accountingDate', JSON.stringify(ddtime))
      let param = {dt1: this.fdate, dt2: this.endDate, type: 'bs3', acc: 'All'}
      console.log('alldates', this.fdate, this.endDate)
      this.bs3Api(param)
    },
    accApi: function () {
      console.log('alldates', this.fdate, this.endDate)
    }
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
  span{
    font-size: 24px;
    font-weight: 550;
  }
  .aname{
    text-align: left;
  }
</style>
