<template>
  <div class='temp_gt'>
      <table v-for=" (ml,idx) in malx" :key=idx >
        <caption>{{ml.subName}}</caption>
        <tr><th>Item</th><th>Select</th><th>PTcode</th><th>Name</th><th>Model</th><th>Price</th></tr>
        <tr v-for=" (mv,idx) in ml.bdy" :key=idx><td>{{idx + 1}}</td><td><input type = checkbox @click="chkItem(mv.ptcode)"></td>
        <td><router-link :to="'/proedit/'+ mv.ptcode" >{{mv.ptcode}}</router-link></td><td>{{mv.name}}</td>
               <td>{{mv.model}}</td><td>{{mv.price}}</td>
        </tr>
      </table>
  </div>
</template>

<script>
export default {
  name: 'producttable',
  props: ['malx', 'chkItem'],
  data () {
    return {
      jsdd: null
    }
  },
  created () {
    // this.getCookie21('userID')
  },
  methods: {
    xchkItem: function (item) {
      console.log(item)
    }
  }
}
</script>

<!-- Add'scoped' attribute to limit CSS to this component only -->
<style scoped>
caption {
  caption-side: top;
  text-align: center;
  font-size: 16px;
  padding: 3px;
  margin-bottom: 0px;
  color: #626247;
  font-weight: 550;
  background-color: #e4d86f;
  opacity: .8;
}
table {
  width: 100%;
  text-align: right;
  padding: 8px;
}
th{
  background-color: #cdcdaa ;
  color:#282882;
  padding-right: 30px;
}
td {
  padding: 2px 8px;
  padding-right: 20px;
}
td:first-child,
th:first-child {
  width: 5%;
}
td:nth-child(2),
th:nth-child(2) {
  width: 5%;
}
td:nth-child(3),
th:nth-child(3) {
  width: 10%;
}
td:nth-child(4),
th:nth-child(4) {
  width: 35%;
}
td:nth-child(5),
th:nth-child(5) {
  width: 25%;
}
</style>
