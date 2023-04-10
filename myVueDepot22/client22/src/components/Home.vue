<template>
  <div class="temp_gt">
    <div class="container bg-light">
      <div class ="box1">
      <div v-for="(mv,index) in products" :key=index >{{mv}}</div>
      <div class="col border bg-light p-5">
        <h3 > Hi,</h3>
        <h3 >You are not logged in yet !</h3>
        Math Random: {{$store.state.a}} <br/>
        xchange Rate: {{$store.state.xrate}}
      </div>
      <div class="row homed" >
       <h5> {{$store.state.mycookies}}</h5>
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
import axios from 'axios'

export default {
  name: 'Gtlhome',
  data () {
    return {
      products: '',
      rnd: ''
    }
  },
  created () {
    // this.getCookie21('userID')
    this.msg = window.location.hostname
    console.log(this.msg)
    if (this.msg === 'localhost') {
      console.log('Run in Local')
    }
    this.$store.dispatch('randNum')
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
      const furl = rootUrl + '/db/api'
      const d = new Date()
      let time = d.getTime()
      const result = await axios.get(furl)
      this.products = result.data
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
.homed{
  padding: 8px  18px;
   background-color: #a9cad0;
}
</style>
