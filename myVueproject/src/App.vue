<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button class="btn btn-primary">Ok</button>
    <button class="btn btn-success">danger</button>
    <button class="btn btn-danger">danger</button>
    <i class="fas fa-home"></i> gh
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
