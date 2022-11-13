<template>
  <div class='temp_gt'>This is a test page!!
    {{myorder}}
  </div>
</template>

<script>
export default {
  name: 'productEdit',
  props: ['myorder'],
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
