<template>
  <div class='temp_gt'>This is a test page!!
  <resp-navbar />
  </div>
</template>

<script>
import respNavbar from '../respNavbar'

export default {
  name: 'invbal',
  components: {
    respNavbar
  },
  data () {
    return {
      jsdd: null
    }
  },
  created () {
    // this.getCookie21('userID')
  }
}
</script>

<!-- Add'scoped' attribute to limit CSS to this component only -->
<style scoped>
caption {
  caption-side: top;
  text-align: center;
  background-color: #eded95;
}
</style>
