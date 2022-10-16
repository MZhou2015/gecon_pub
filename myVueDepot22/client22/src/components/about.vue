<template>
  <div class="about">
    {{msg}} <br />
    Geocn Technology located in Vanocuver . We are specialist in AV Product and Karaoke equiptment more than 20 years.
     We carry a large selection of top quality Home Theatre System and audio video electronics product.<br />
     <router-link style="text-decoration:none; color: inherit;" to="/login" > &nbsp;&nbsp;&nbsp;&nbsp; </router-link>
     Location: 4511 Shell Road<br />
     Richmond  BC <br />
  </div>
</template>

<script>
// import ...
export default {
  name: 'About',
  data () {
    return {
      msg: 'About Gecon Technology'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about {color:#3a3a3a; background-color: #e8ebd1;}
router-link a{ text-decoration: none; color: rgb(167, 29, 29);}
</style>
