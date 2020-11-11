<template>
  <div class="bottom-tab">
    <span class="item-tab"
          @click="swichTo('/home')">
      <img :src="$route.path.includes('/home')?tabBarImgArr[0].selected:tabBarImgArr[0].normal"
           alt />
      <span :class="{ on: $route.path.includes('/home') }">首页</span>
    </span>
    <span class="item-tab"
          @click="swichTo('/recommend')">
      <img :src="'/recommend'===$route.path?tabBarImgArr[1].selected:tabBarImgArr[1].normal"
           alt />
      <span :class="{ on: '/recommend' === $route.path }">推荐</span>
    </span>
    <span class="item-tab"
          @click="swichTo('/search')">
      <img :src="'/search'===$route.path?tabBarImgArr[2].selected:tabBarImgArr[2].normal"
           alt />
      <span :class="{ on: '/search' === $route.path }">搜索</span>
    </span>
    <span class="item-tab"
          @click="swichTo('/chat')">
      <img :src="'/chat'===$route.path?tabBarImgArr[3].selected:tabBarImgArr[3].normal"
           alt />
      <span :class="{ on: '/chat' === $route.path }">购物车</span>
    </span>
    <span class="item-tab"
          @click="swichTo('/me')">
      <img :src="'/me'===$route.path?tabBarImgArr[4].selected:tabBarImgArr[4].normal"
           alt />
      <!-- 查看当前路由是否相等是则绑定class -->
      <span :class="{ on: '/me' === $route.path }">我的</span>
    </span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabBarImgArr: [
        {
          normal: require('../../../public/static/img/icon_home.png'),
          selected: require('../../../public/static/img/icon_home_selected.png')
        },
        {
          normal: require('../../../public/static/img/icon_intro.png'),
          selected: require('../../../public/static/img/icon_intro_selected.png')
        },
        {
          normal: require('../../../public/static/img/icon_search.png'),
          selected: require('../../../public/static/img/icon_search_selected.png')
        },
        {
          normal: require('../../../public/static/img/icon_chat.png'),
          selected: require('../../../public/static/img/icon_chat_selected.png')
        },
        {
          normal: require('../../../public/static/img/icon_mine.png'),
          selected: require('../../../public/static/img/icon_mine_selected.png')
        }
      ]
    }
  },
  methods: {
    swichTo (path) {
      // 路由切换
      this.$router.replace(path)
    }
  }
}
</script>
<style lang="stylus" scoped>
.bottom-tab
  width 100%
  height 50px
  position fixed
  left 0
  bottom 0
  background-color #fff
  display flex
  z-index 999
  .item-tab
    display flex
    flex 1
    flex-direction column
    align-items center
    justify-content center
    font-size 14px
    color #666
    img
      width 35%
      margin-bottom 2px
    .on
      color red
</style>
