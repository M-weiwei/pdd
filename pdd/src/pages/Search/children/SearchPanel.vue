<template>
  <div class="search-panel">
    <!-- 导航 -->
    <div class="search-nav">
      <div class="search-input">
        <img src="../images/search.png"
             alt=""
             width="25">
        <input type="search"
               placeholder="搜索"
               ref="mysearch">
      </div>
      <button @click="isShowSearchPaner(false)">取消</button>
    </div>
    <!-- 内容 -->
    <div class="search-content">
      <div class="title">
        <img src="../images/hot.png"
             alt=""
             width="25">
        <span>热门搜索</span>
      </div>
      <ul>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    isShowSearchPaner: Function
  },
  data () {
    return {

    }
  },
  methods: {},
  mounted () {
    this.$refs.mysearch.focus()// 获取焦点
  }
}

</script>
<style lang='stylus' scoped>
.search-panel
  width 100%
  height 100%
  position fixed
  left 0
  top 0
  z-index 1000
  background-color #fff
  .search-nav
    width 100%
    height 60px
    padding 0 20px 0 20px
    border-bottom 1px solid #ddd
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    .search-input
      display flex
      align-items center
      width 80%
      height 38px
      border-radius 10px
      padding 0 10px
      background-color #ededed
      box-sizing border-box
      input
        width 90%
        height 90%
        padding-left 8px
        font-size 16px
        background transparent
        border none
        outline none
  .search-nav:after
    content ''
    display block
    width 20px
    height 100%
    border-right 1px solid transparent
  button
    font-size 16px
    background transparent
    color #aaa
    border none
  .search-content
    padding 30px 15px
    .title
      display flex
      align-items center
      color #aaa
      margin-bottom 10px
    ul
      display flex
      flex-wrap wrap
      li
        background #ededed
        color #aaa
        margin 5px 10px
        padding 5px
        border-radius 8px
        font-weight lighter
        font-size 12px
</style>
