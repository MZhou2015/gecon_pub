<template>
  <div id="app">
    <div class="hm1">
         <img src="./assets/store_logo.png">
    </div>
    <navBar/>
    <router-view/>
    <div class="footer">
       Copyright &copy; 2021 Gecon Technology Ltd. &nbsp;&nbsp;  All Rights Reserved <br />
    </div>
  </div>
</template>

<script>
import './assets/gcommon.css'
import navBar from './components/navBar'

export default {
  name: 'App',
  components: {
    navBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  padding-bottom: 20px;
}
.img {margin-bottom: 0px;}
.footer {
     position: absolute;
     bottom:0px;
     background-color:#56575c;
     width: 100%;
     height: 65px;
     text-align: center;
     font-size: 20px;
     color: #FFFDFD;
     padding-top: 25px;
}
</style>
