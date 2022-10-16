<template>
  <div class="container bg-light">
    <div class ="box1">Hello  {{products}}</div>
    <div class="row sd1" >
      <div class="col border bg-light p-5">
        <h3 > Hi,  !</h3>
        <h3 >You are not logged in yet !</h3>
      </div>
    </div>
    <div class="row sd1" >
       <div class="col-6 border bg-light p-3 text-danger" >Testing here </div>
       <div class="col-6">
      <button type="button" class="btn btn-primary btn-sm" @click="goRouter">Log in </button>
      </div>
    </div>
      <div>
        <a href="http://localhost:5000/about" target="_blank">about</a><br />
        <a href="http://localhost:5000/gsapi/data" target="_blank">API datat</a>
      </div>
  </div>
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
      const furl = 'http://localhost:5000/gsapi/data'
      await fetch(furl, {'Content-Type': 'application/json'})
        .then(response => response.json())
        .then(data => { this.products = data })
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
  background-color: aquamarine;
}
</style>
