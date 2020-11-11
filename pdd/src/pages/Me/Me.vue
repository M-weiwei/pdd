<template>
  <div class="me">
    <div v-if="$store.state.userInfo.id">
      <me-top />
    </div>
    <select-login v-else />

  </div>
</template>
<script>
import SelectLogin from './../Login/SelectLogin'
import MeTop from './../Me/MeTop'
export default {
  components: {
    SelectLogin,
    MeTop
  }
}
</script>
<style lang="stylus" scoped>
.me
  width 100%
  height 100%
  background-color #f5f5f5
</style>
