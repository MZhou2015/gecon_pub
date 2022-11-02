<template>
  <div class="temp_gt">
    Hello
  <div class="container bg-light">
    <div class="row box2" >
       <div class="col-6 border bg-light p-3 text-danger" >Testing here </div>
       <div class="col-6">
        <button type="button" class="btn btn-primary btn-sm" @click="goRouter">Log in </button>
       </div>
    </div>
    <div class ="box1">
      <div v-for="(mv,index) in products" :key=index >{{mv}}</div>
      <div class="col border bg-light p-5">
        <h3 > Hi,  !</h3>
        <h3 >You are not logged in yet !</h3>
      </div>
      <div class="row" >
        {{$store.state.mycookies}}
      </div>
    </div>
    <div>
      <a href="http://localhost:5000/about" target="_blank">about</a><br />
      <a href="http://localhost:5000/gsapi/data" target="_blank">API datat</a><br />
        {{$store.state.uroot}}
    </div>
  </div>
</div><!-- End of  div temp_gt -->
</template>

<script>
// import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Gtlhome',
  data () {
    return {
      products: ''
    }
  },
  created () {
    // this.getCookie21('userID')
    this.msg = window.location.hostname
    console.log(this.msg)
    if (this.msg === 'localhost') {
      console.log('Run in Local')
    }
    this.getProdata('dfer')
  },
  computed: {
    // ...mapGetters(['user', 'xs'])
  },
  methods: {
    // ...mapActions(['getCookie21', 'setCookie21']),
    setCookie: function () {
      const val = {
        name: 'testing2',
        val: 56,
        ddy: 3
      }
      console.log(val)
      // this.setCookie21(val)
    },
    async getProdata (react) {
      // const headers = { 'Content-Type': 'application/json' }
      const rootUrl = this.$store.state.uroot
      const furl = rootUrl + '/gsapi/data'
      const d = new Date()
      let time = d.getTime()
      await fetch(furl, {'Content-Type': 'application/json'})
        .then(response => response.json())
        .then(data => { this.products = data })
      const dx = new Date()
      let time2 = dx.getTime()
      console.log('time usage', time2 - time)
    },
    goRouter: function () {
      this.$router.push('/login')
      // this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box1{
  background-color: #8f8969;
}
.box2{
  background-color: #a9caf0;
}
</style>
