<template>
  <div class='temp_gt'>This is a test page!!</div>
</template>

<script>
export default {
  name: 'orderEdit',
  data () {
    return {
      jsdd: null
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
