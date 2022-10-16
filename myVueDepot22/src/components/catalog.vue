<template>
  <div class="catalog">
   New router
   <i class="fa fa-phone-alt"></i> &nbsp; 604 879-6399 &nbsp; &nbsp;
    <router-link to="/" class="btn btn-primary"> Home</router-link>
    <router-link to="/Product" class="btn btn-success"> Product</router-link>
  </div>
</template>

<script>

export default {
  name: 'Catalog'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-weight: normal;
  font-size: 14px;
}
</style>
