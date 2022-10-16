<template>
    <div class="webacc">
      General Entry ...
      <table class="table caption-top">
        <caption>This is caption-top example</caption>
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Second</th>
            <th scope="col">Third</th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Example 1</td>
                <td>option</td>
                <td>option</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Example 2</td>
                <td>option</td>
                <td>option</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'webAcc',
  data () {
    return {
      msg: 'Welcome to Navigation Bar'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
