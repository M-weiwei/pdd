<template>
  <div class="hello">
    <mt-button type="primary">primary</mt-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.hello
  background red
</style>
