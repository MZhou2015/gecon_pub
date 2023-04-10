<template>
  <div class='temp_gt'>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#prosold" type="button" role="tab" >销售统计</a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#stock" type="button" role="tab" @click="chkStock('showstock')">库存</a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#makeup" type="button" role="tab" >整理产品库存</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent"><!--    begin of  one tab-content   -->
      <div class="tab-pane fade show active" id="prosold" role="tabpanel" aria-labelledby="home-tab">
        <label for="muser">Choose a Customer:</label>
        <select id="mcar" v-model="id" @change="userSales(id)">
        <option value="111">UFO Entertaiment</option>
        <option value="115">One time Customer(Karaoke )</option>
        <option value="35">Ideal Technology</option>
        <option value="24">Sunny electronics</option>
        <option value="999" selected>All</option>
</select> {{id}}
        <table><tr><th>Item</th><th>PTcode</th><th>Model</th><th>Name</th><th>一年内</th><th>3月内</th><th>1月内</th><th>10天内</th></tr>
          <tr v-for="(mk,index) in usalmx.dx" :key="'x' + index"  ><th>{{index + 1}}</th><td>{{mk[0]}}</td><td>{{mk[1]}}</td><td>{{mk[2]}}</td>
             <td>{{mk[3]}}</td><td>{{mk[4]}}</td><td>{{mk[5]}}</td><td>{{mk[6]}}</td>
          </tr></table>
      </div><!--    end of  one Block -->
      <div class="tab-pane fade" id="stock" role="tabpanel">
       Stock List
       <table><tr><th>Item</th><th>PTcode</th><th>Model</th><th>Name</th><th>库存</th><th>需订货</th></tr>
          <tr v-for="(mst,index) in stock.dx" :key="'s' + index"  ><th>{{index + 1}}</th><td>{{mst.ptcode}}</td><td>{{mst.model}}</td><td>{{mst.name}}</td>
             <td>{{mst.instock}}</td>
          </tr></table>
      </div><!--    end of  one Block -->
      <div class="tab-pane fade" id="makeup" role="tabpanel">
       <button type="button" class="btn btn-info btn-sm " @click="chkStock('makeup')">Stock Sell</button>
        <button type="button" class="btn btn-info btn-sm" @click="chkStock('ProSell')">Product Total Sell</button>
       <br> {{stock.msg}}
      </div><!--    end of  one Block -->
    </div><!--    end of  one tab-content   -->
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'users',
  data () {
    return {
      jsdd: null,
      id: 999
    }
  },
  created () {
    this.userSales(this.id)
  },
  computed: {
    ...mapGetters({usalmx: 'PRO/getuserpr', stock: 'PRO/stock'})
  },
  methods: {
    ...mapActions({userSales: 'PRO/sellrecord', chkStock: 'PRO/chkStock'})
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
table {
    width: 100%;
    background-color: #FDF5E6;
}
th {
    font: bold 16px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
    color: #221122;
    border-right: 1px solid #C1DAD7;
    border-bottom: 1px solid #C1DAD7;
    border-top: 1px solid #C1DAD7;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    padding: 6px 6px 6px 12px;
    background: #CD853F;
}
td {
    background-color: #7C9381;
    color: #343535;
    text-align:left;
    padding:4px;
    margin: 2px;
    border-right:  1px solid #C1DAD7;;
    border-bottom: 1px solid #C1DAD7;
 }
 button{
  margin: 15px;
 }
</style>
