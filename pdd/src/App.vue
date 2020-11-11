<template>
  <div id="app">
    <!-- 本地路由缓存 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <tab-bar v-show="$route.meta.showBottomTabBar"></tab-bar>
  </div>
</template>
<script>
import TabBar from './commponents/TabBar/TabBar.vue'
export default {
  data () {
    return {

    }
  },
  created () {
    this.$store.dispatch('getUserInfo')
  },
  components: {
    TabBar
  }
}
</script>

<style lang="stylus" scoped>
#app
  width 100%
  height 100%
  background-color #f5f5f5
</style>>
