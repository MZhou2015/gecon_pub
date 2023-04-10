<template>
  <div class='temp_modal'>
    <slot></slot>
    <br /><br />
    <button @click="close()">close</button><button @click="save(sw)">save</button>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['close', 'save', 'sw'],
  data () {
    return {
      jsdd: null
    }
  },
  created () {
    // this.getCookie21('userID')
  },
  methods: {
    getLength: function () {
      let len
      len = this.$refs.myInput2
      console.log(len)
    }
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
.temp_modal{
  width: 500px;
  min-height: 120px;
  padding: 12px;
  border: 1px solid #323255;
}
</style>
