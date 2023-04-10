<template>
    <div class='temp_gt'>
        <table>
          <caption>{{mapp}}</caption>
            <thead>
              <tr><th>Item</th><th >Order_No</th><th >Customer</th> <th>Invoice No.</th><th>Amount</th><th>Date</th></tr>
              <tr v-for=" (mv,idx) in marx" :key=idx ><td>{{idx+1}}</td><td><router-link :to="'/order/'+ mv.order_no" >{{mv.order_no}}</router-link></td>
              <td>{{mv.company}}</td>
              <td>{{mv.reference}}</td><td>{{mv.amount}}</td><td>{{mv.date}}</td></tr>
            </thead>
       </table>
    </div>
</template>

<script>
export default {
  name: 'Table1',
  props: ['mapp', 'marx'],
  data () {
    return {
      jsdd: null
    }
  },
  created () {
    // this.getCookie21('userID')
  }
}
</script>

<!-- Add'scoped' attribute to limit CSS to this component only -->
<style scoped>
caption {
  caption-side: top;
  text-align: center;
  color: #212121;
  font-size: 16px;
  font-weight: 550;
  background-color: #c5bd8f;
  padding-bottom: 3px;
  padding-top: 3px;
}
table {
  width: 100%;
}
td {
  background-color: #dee9e9;
  border-bottom: 1px solid #d1cAa7;
  padding: 6px 18px;
  margin: 2px;
}
</style>
