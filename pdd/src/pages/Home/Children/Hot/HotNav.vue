<template>
  <div>
    <div class="hot-nav">
      <div class="hot-nav-content">
        <div class="nav-content-inner">
          <a href=""
             class="inner-item"
             v-for="(item,i) in homenav"
             :key="i">
            <img :src="item.iconurl"
                 alt=""
                 srcset="">
            <span>{{item.icontitle}}</span>
          </a>

        </div>
      </div>
      <div class="hot-nav-bottom">
        <div class="hot-nav-bottom-inner"
             :style="innerBarStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 屏幕宽度
      screenW: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      //   滚动内容宽度
      scroolContentW: 720,
      //   滚动条背景宽度
      bgBarW: 100,
      // 滚动条宽度
      barX: 0,
      //   滚动起点
      stareX: 0,
      // 记录结束点
      endFlag: 0,
      // 移动距离点
      BarMoveWdith: 0
    }
  },
  mounted () {
    this.getBottomWidth()
    this.bindEvrnt()
  },
  methods: {
    getBottomWidth () {
      this.barX = this.bgBarW * (this.screenW / this.scroolContentW)
    },
    // 移动端事件监听
    bindEvrnt () {
      this.$el.addEventListener('touchstart', this.handleTouchStart, false)
      this.$el.addEventListener('touchmove', this.handleTouchMove, false)
      this.$el.addEventListener('touchend', this.handleTouchEnd, false)
    },
    // 开始触摸
    handleTouchStart (event) {
      const touch = event.touches[0]
      this.stareX = Number(touch.pageX)
    },
    // 开始移动
    handleTouchMove (event) {
      const touch = event.touches[0]
      const moveWidth = Number(touch.pageX) - this.stareX
      this.BarMoveWdith = -((this.bgBarW / this.scroolContentW) * moveWidth - this.endFlag)
      if (this.BarMoveWdith <= 0) {
        this.BarMoveWdith = 0
      } else if (this.BarMoveWdith >= this.bgBarW - this.barX) {
        this.BarMoveWdith = this.bgBarW - this.barX
      }
    },
    // 结束触摸
    handleTouchEnd () {
      this.endFlag = this.BarMoveWdith
    }
  },
  computed: {
    innerBarStyle () {
      return {
        //   动态绑定宽度
        width: `${this.barX}px`,
        left: `${this.BarMoveWdith}px`
      }
    },
    ...mapState(['homenav'])
  }

}

</script>
<style lang='stylus' scoped>
.hot-nav
  width 100%
  height 180px
  background-color #fff
  position relative
  padding-bottom 10px
  .hot-nav-content
    width 100%
    overflow-x scroll
    -webkit-overflow-scrolling touch
    .nav-content-inner
      width 720px
      height 180px
      display flex
      flex-wrap wrap
      .inner-item
        width 90px
        height 90px
        display flex
        flex-direction column
        justify-content center
        align-items center
        font-size 14px
        color #666666
        img
          width 40%
          margin-bottom 5px
  .hot-nav-content::-webkit-scrollbar
    display none
  .hot-nav-bottom
    width 100px
    height 2px
    position absolute
    background-color #ccc
    left 50%
    margin-left -50px
    bottom 8px
    .hot-nav-bottom-inner
      position absolute
      left 0
      height 100%
      background-color #ff5304
      width 0px
a
  text-decoration none
</style>
