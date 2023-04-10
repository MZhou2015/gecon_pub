<template>
  <div class='temp_gt'>
    <div v-if="sw == 1">
      <table>
        <caption>Product Detail Infomation</caption>
        <tr><th>PTcode</th><th>Model</th><th>Name</th><th>Cost avg</th><th>Shipping</th><th>Catalog</th></tr>
        <tr class="text_center"><td>{{mtc[0].ptcode}}</td><td>{{mtc[0].model}}</td><td>{{mtc[0].name}}</td><td>$ {{mtc[0].cost_CAD}}</td><td>{{mtc[0].shipping}}</td>
             <td>{{mtc[0].cat_name}}</td></tr>
      </table>
      <table>
        <caption> Sales Order List</caption>
        <tr><th>Item</th><th>Order No</th><th>Customer</th><th>Qty</th><th>Price</th><th>Unit Profit</th><th>Total Sales&nbsp;</th><th>Date</th></tr>
        <tr class="text_or" v-for="(mk,index) in mtb.buys" :key="'x' + index"  ><td>{{index + 1}}</td><td>{{mk.order_no}}</td><td>{{mk.company}}</td><td>{{mk.quantity}}</td>
        <td>{{mk.price_CAD}}</td><td>{{Number(mk.price_CAD - mk.cost_RMB).toFixed(2)}}</td><td>{{mk.quantity*mk.price_CAD}}</td><td>{{mk.date.split('T')[0]}}</td></tr>
      </table>
      <button @click="getApi22({type: 'prodetail', no: ptcode}); sw =2">product info</button>
      <table>
        <caption> Purchase Order List</caption>
        <tr><th>Item</th><th>Order No</th><th>Supplier</th><th>Qty</th><th>Cost RMB</th><th>Cost CAD</th><th>Total Cost RBM</th><th>Date</th></tr>
        <tr class="text_or" v-for="(mk,index) in mtb.locals" :key="'x' + index"  ><td>{{index + 1}}</td><td>{{mk.order_no}}</td><td>{{mk.company}}</td>
        <td>{{mk.quantity}}</td><td>{{mk.cost_RMB}}</td><td>$ {{mk.price_CAD}}</td>
        <td> {{mk.quantity*mk.cost_RMB}}&#20803;</td><td>{{mk.date.split('T')[0]}}</td></tr>
      </table>
    </div><!-- Case 1 for Order history list for one product above   -->
    <div  v-if="sw == 2"> <!-- Case 2 for product Detail   -->
      <table>
        <caption>Product Detail Infomation</caption>
        <tr><th>PTcode</th><th>Model</th><th>Name</th><th>Price</th><th>Shipping</th><th>Catalog</th><th>Remark</th><th>Edit</th></tr>
        <tr><td>{{mtc[0].ptcode}}</td><td>{{mtc[0].model}}</td><td>{{mtc[0].name}}</td><td>$ {{mtc[0].price}}</td><td>{{mtc[0].shipping}}</td>
             <td>{{mtc[0].catalog}}</td><td>{{mtc[0].remark}}</td><td><button @click="m =2">Edit</button></td></tr>
      </table>
      <div class="prod" >
       <!-- <div class="box"></div>  -->
       <Modal v-if="m == 2" :close = closemd :save = saved :sw = m ><br />Model: <input type="text" v-model= "mtc[0].model"><br /> Name: <input type="text" ref="myInput2" v-model = "mtc[0].name">
          <br />Price: <input type="text" v-model= "mtc[0].price"><br /> Shipping: <input type="text" v-model= "mtc[0].shipping">
       </Modal>
       <Modal v-if="m == 3" :close = closemd :save = saved :sw = m ><br />Brief: <textarea
                ref="htmlInput"
                rows="4"
                v-model="mtc[0].brief"></textarea><br /> Rprice: <input type="text" v-model= "mtc[0].rprice">
                <br /> Image: <input type="text" v-model= "mtc[0].image" >
       </Modal>
      </div>
      <div> <!--  more  Product information  ... -->
       <table>
        <tr><th>Brief</th><th>Image</th><th>Retail Price</th><th>&nbsp;</th></tr>
         <tr><td>{{mtc[0].brief}}</td><td> <img :src="img_url +mtc[0].image" ></td><td>$ {{mtc[0].rprice}}</td><td><button @click="m =3">Edit</button></td></tr>
         <tr><th>Description</th><td colspan="2">
          <ul><li v-for ="(item, index) in features" :key="index">{{item}}</li></ul></td>
          <td><button @click="m =2">Edit</button></td></tr>
         <tr><th>Specification</th><td colspan="2">
           <ul><li v-for ="(item, index) in specif" :key="index">{{item}}</li></ul></td>
           <td><button @click="m =2">Edit</button></td></tr>
         <tr><th>Note</th><td colspan="2">{{mtc[0].note}}</td><td><button @click="m =2">Edit</button></td></tr>
         </table>
       </div><!-- End of  more  Product info  -->
    </div><!-- End of Case 2  -->
 </div>
</template>

<script>
import Modal from '../../components/modal'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'productEdit',
  components: {
    Modal
  },
  data () {
    return {
      jsdd: null,
      img_url: 'https://mzhou2015.github.io/gecon_pub/src/vxdagi/image/',
      sw: 1,
      m: 1,
      ptcode: 'E23024'
    }
  },
  created () {
    this.ptcode = this.$route.params.ptcode
    console.log('param.pid', this.$route.params.ptcode)
    this.getApi22({type: 'prodetail', no: this.ptcode})
  },
  mounted () {
    let mpr = {type: 'prohistory', no: this.ptcode}
    this.getApi22(mpr)
  },
  computed: {
    ...mapGetters({mtb: 'PRO/orderTab1', mtc: 'PRO/proinfo'}),
    features: function () {
      let fld = this.mtc[0].description.split('xx')
      return fld
    },
    specif: function () {
      let fld = this.mtc[0].specification.split('xx')
      return fld
    }
  },
  methods: {
    ...mapActions({getApi22: 'PRO/getApi22', postUp22: 'PRO/postUpdate22'}),
    closemd: function (item) {
      this.m = 1
    },
    saved: function (w) {
      let udp = {}
      let query = ''
      switch (w) {
        case 2:
          udp = {
            ptcode: this.mtb[0].ptcode,
            model: this.mtb[0].model,
            name: this.mtb[0].name,
            price: this.mtb[0].price,
            shipping: this.mtb[0].shipping
          }
          query = ` model ='${udp.model}', name ='${udp.name}' WHERE ptcode = '${udp.ptcode}' `
          console.log(query)
          break
        case 3:
          udp = {
            ptcode: this.mtb[0].ptcode,
            brief: this.mtb[0].brief,
            image: this.mtb[0].image,
            rprice: this.mtb[0].rprice
          }
          query = ` brief ='${udp.brief}', image ='${udp.image} , rprice ='${udp.rprice}' WHERE ptcode = '${udp.ptcode}' `
          break
        default:
      // code block
      }
      console.log(w)
      console.log(udp)
      let tData = {handle: 'Update', tquery: query}
      this.postUp22(tData)
    }
  }
}
</script>

<!-- Add'scoped' attribute to limit CSS to this component only -->
<style scoped>
caption {
  caption-side: top;
  text-align: center;
  background-color: #a1a168;
  color: #353565;
  font-weight: 550;
}
table{
  width: 100%;
}
th{
  background-color: #eaeaea;
  padding: 3px 12px;
}
td{
  color: #353565;
  padding: 3px 12px;
  text-align: left;
}
.text_center td{
  text-align: center;
}
img{
  width: 280px;
}
ul{
  text-align: left;
}
input{
  margin: 8px;
}
.box{
  background-color: #a1a168;
  width: 80px;
  height: 80px;
}
.prod{
  position: fixed;
  left: 34%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #eaeaea;
}
.text_or td:first-child,
 td:nth-child(2)
{
  width: 10%;
  text-align: center;
  color: #111124;
  font-weight: 600;
}
.text_or td:nth-child(3)
{
  width: 20%;
  text-align: center;
  font-weight: 350;
}
.text_or td:nth-child(4),
td:nth-child(5),td:nth-child(6)
{
  width: 10%;
  text-align: center;
  font-weight: 350;
}
.text_or td:nth-child(7), td:nth-child(8)
{
  width: 15%;
  text-align: center;
  font-weight: 350;
}
</style>
