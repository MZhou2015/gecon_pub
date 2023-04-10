<template>
  <div class='temp_gt'>
    <div class="container">
      <div class="fm">
      <label for="customer-select">Select a Customer:</label>
      <select  id="customer-select" v-model="order.cid">
        <option v-for="(value, akey) in $store.state.ACC.customers" :value="value.id" :key="akey">{{value.company}}</option>
      </select>
      <label for="name">Search by name:</label><input type="text" id="name" />
       <button class="btn btn-outline-secondary btn-sm">Search</button>
    </div>
        <div class="row">
          <div class="col-md-6 txa"><p>Audio Mixer</p><p>Amplifier</p><p>Karaoke KOD Player</p><p>Microphone</p>
          </div>
          <div class="col-md-6 txa"><p>Speaker</p><p>Cable and Wire</p><p>Hard Disk</p><p>Accessory and Spare</p></div>
        </div>
    </div>
    <proTable :malx = msitem :chkItem=chkItem />
  </div>
</template>

<script>
import proTable from '../../components/product/protable1'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'orderEnter',
  components: {
    proTable
  },
  data () {
    return {
      order: {cid: 111},
      orderitems: []
    }
  },
  created () {
    // this.getCookie21('userID')
    this.getApi23({type: 'mostactive', no: 1234})
  },
  computed: {
    ...mapGetters({prolist: 'PRO/mplist', orInfo: 'PRO/orderInfo', mtb: 'PRO/orderTab1'}),
    msitem: function () {
      let mld = []
      mld[0] = this.prolist.most
      console.log(mld)
      return mld
    }
  },
  methods: {
    ...mapActions({pList: 'PRO/productApi', orderPr: 'PRO/orderPro', accData: 'ACC/webaccounts', getApi23: 'PRO/getApi2023Mar'}),
    /** *  向子组件 <proTable :malx = msitem :chkItem=chkItem /> 传一个方法，回传给父组件 "ptcode"一个数据
          并放到 变量 this.orderitems 中   ***/
    chkItem: function (item) { // chkItem is a function using  for component : proTable to tranfer data
      this.orderitems.push(item)
      console.log('add, ', this.additems, 'or', this.orderitems)
    },
    xchkItem: function (item) {
      console.log(item)
    }
  }
}
</script>

<!-- Add'scoped' attribute to limit CSS to this component only -->
<style scoped>
.fm select{
  width: 220px;
  height: 25px;
  margin-right: 18px;
}
.fm input {
  width: 120px;
  height: 25px;
  margin-right: 18px;
}
.fm label {
  color: #223344;
  margin-right: 8px;
  margin-left: 8px;
}
.fm{
  padding: 8px;
}
</style>
