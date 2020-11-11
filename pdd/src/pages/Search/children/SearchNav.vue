<template>
  <div class="searchnav">
    <a href=""
       class="search_nav_icon"
       @click.prevent="isShowSearchPaner(true)">
      <img src="../images/search.png"
           alt=""
           width="25">
      <span>搜索</span>
    </a>
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
  mounted () { }
}

</script>
<style lang='stylus' scoped>
.searchnav
  width 100%
  height 60px
  background-color #fff
  border-bottom 1px solid #ccc
  position fixed
  top 0
  left 0
  z-index 998
  display flex
  justify-content center
  align-items center
  .search_nav_icon
    text-decoration none
    color black
    width 90%
    height 70%
    border-radius 10px
    background-color #e8e8e8
    display flex
    justify-content center
    align-items center
    span
      color #aaa
      margin-left 6px
      font-size 18px
      font-weight lighter
</style>
