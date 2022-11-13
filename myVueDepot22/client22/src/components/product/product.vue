<template>
  <div class='temp_gt'>
    <orderEdit v-if="pt == 1" :myorder = orderitems />
    <button  class="btn btn-secondary btn-sm " @click= orderrefresh()>Order Continu</button>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#most" type="button" role="tab" >Most Active</a>
      </li>
         <li class="nav-item" role="presentation" v-for="(mk,index) in this.prolist.rest" :key="'x' + index"  >
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
import orderEdit from '../../components/product/productEdit'
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
      pt: 1
    }
  },
  created () {
    let mg = 'pl'
    this.pList(mg)
    console.log(mg)
  },
  computed: {
    ...mapGetters({prolist: 'PRO/mplist'}),
    msitem: function () {
      let mld = []
      mld[0] = this.prolist.most
      console.log(mld)
      return mld
    }

  },
  methods: {
    ...mapActions({pList: 'PRO/productApi', orderPr: 'PRO/orderPro'}),
    chkItem: function (item) {
      this.orderitems.push(item)
    },
    orderrefresh: function (item) {
      let mt = this.orderitems.filter((el, index) => this.orderitems.indexOf(el) === index)
      this.orderitems = mt
      this.orderPr('hkhk')
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
</style>
