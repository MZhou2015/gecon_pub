<template>
    <div class="webacc">
      <div class="container"> <ledgerEdit /> </div>
      <table class = "table ">
        <caption>Bank Account Transations</caption>
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">description</th>
            <th scope="col">Debit</th>
            <th scope="col">Credit</th>
            <th scope="col">Balance</th>
            <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(mv,idx) in $store.state.ACC.midone" :key=idx  class="trans" ><td>{{idx+1}}</td><td>{{mv[0]}}</td><td>{{mv[1]}}</td>
                <td>{{mv[2]}}</td><td>{{mv[3]}}</td><td>{{mv[4]}}</td><td><button>Select</button></td></tr>
              </tbody>
       </table>
  </div>
</template>

<script>
import ledgerEdit from '../../components/webaccount/ledgerEdit'

export default {
  name: 'webAcc',
  data () {
    return {
      msg: 'Welcome to Navigation Bar'
    }
  },
  mounted () {
    this.$store.dispatch('ACC/myactive')
  },
  components: {
    ledgerEdit
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.webacc{
  padding-bottom: 26px;
}
.trans {
 height: 12px;
}
caption {
    caption-side: top;
    text-align: center;
    background-color: #eded95;
  }
</style>
