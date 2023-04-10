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
  name: 'orderEnter',
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

</style>
