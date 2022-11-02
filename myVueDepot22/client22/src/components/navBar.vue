<template>
    <div class="nav">
       <ul>
         <li><a href="./">DashBoard</a></li>
         <li><router-link to="./webacc" >Webaccounting</router-link>
            <ul>
                <li><router-link to="/finreport" >Finance Report</router-link></li>
                <li><router-link to="/generals" >General Entry</router-link></li>
            </ul>
          </li>
           <li><a href="/about">Investment</a>
             <ul>
                <li><router-link to="/statement" >Statements</router-link></li>
                <li><router-link to="/finreport" >Finance Report</router-link></li>
              </ul>
          </li>
          <li><router-link to="/orderlist" >Sales</router-link></li>
          <li><a href="/about">Logout</a></li>
       </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'navBar',
  data () {
    return {
      msg: 'Welcome to Navigation Bar',
      sdt: '2022-08-01'
    }
  },
  created () {
    var root = window.location
    var root3 = root.origin
    if (root.hostname === 'localhost') {
      root3 = 'http://localhost:5000'
    }
    console.log(root)
    this.$store.commit('uroot', root3)
    console.log('curroot', root3)
    this.$store.dispatch('userverify')
    this.$store.dispatch('getCookie')
  },
  mounted () {
    let ckie = this.$store.state.mycookies
    if (ckie.lastSession) this.sdt = ckie.lastSession
    this.initDate(this.sdt)
  },
  methods: {
    initDate: async function (ddt) {
      const rootURL = this.$store.state.uroot
      console.log(rootURL, ddt)
      const furl = rootURL + '/user/sdate?mdate=' + ddt
      const restt = await axios.get(furl)
      console.log(restt.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
    height: 32px;
    background: #bbaba1;
    padding-left: 40%;
    padding-right: 10%;
}
.nav ul {
    float: right;
    margin-top: 0px;
    margin-right: 10%;
    padding: 0px 14px;
    line-height: 32px;
 }
.nav ul li{
   float:left;
   list-style: none;
   position: relative;
   width: 140px;
}
.nav ul li ul{
    display: none;
    position: absolute;
    background-color: #dfdfdf;
    border-radius: 0px 0px 6px 6px;
    z-index: 1000;
 }
 .nav ul li:hover ul{
    display: block;
 }
 a {
    color: #29385d;
    font-size: 16px;
    font-weight: 650;
    text-decoration: none;
 }
 a:hover{
    color: #fafafa;
    background: #aca18f;
    font-size: 16px;
    font-weight: 650;
    width: 140px;
    text-decoration: none;
}
.nav ul li ul li a:hover{
    background-color: #dfdfdf;
    font-size: 16px;
    font-weight: 700;
    color: rgb(233, 132, 74);
 }
</style>
