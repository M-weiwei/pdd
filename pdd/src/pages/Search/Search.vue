<template>
  <div class="search">
    <!-- 搜索导航 -->
    <search-nav :isShowSearchPaner='isShowSearchPaner' />
    <div class="shop">
      <!-- 左边 -->
      <div class="menu_wrapper">
        <ul class="content">
          <!-- current -->
          <li class="menu-item "
              v-for="(goods,i) in searchgoods"
              :key="i"
              :class="{current:i===currentIndex}"
              @click="clickLeftIndex(i)"
              ref="menulist">
            <span>{{goods.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 右边 -->
      <div class="shop_wrapper">
        <ul ref='shopsParent'>
          <li class="shops-li"
              v-for="(goods,i1) in searchgoods"
              :key="i1">
            <div class="shop-title">
              <h4>{{goods.name}}</h4>
              <a href="">查看更多 ></a>
            </div>
            <ul class="phone_type"
                v-if="goods.tag==='phone'">
              <li v-for="(phone,i4) in goods.category"
                  :key="i4">
                <img :src="phone.icon"
                     alt="">
              </li>
            </ul>
            <ul class="shops-items">
              <li v-for="(item,i3) in goods.items"
                  :key="i3">
                <img :src="item.icon"
                     alt="">
                <span>{{item.title}}</span>
              </li>

            </ul>
          </li>
        </ul>
      </div>
    </div>
    <search-panel v-if="isShow"
                  :isShowSearchPaner='isShowSearchPaner' />
  </div>
</template>
<script>
import SearchNav from './children/SearchNav'
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import SearchPanel from './children/SearchPanel'
export default {
  data () {
    return {
      scrollY: 0, // 右侧列表滑动y轴坐标
      rightLiTops: [], // 每个板块头部位置
      isShow: false
    }
  },
  components: {
    SearchNav,
    SearchPanel
  },
  mounted () {
    this.$store.dispatch('reqSearchGoods')
  },
  computed: {
    ...mapState(['searchgoods']),
    currentIndex () {
      const { scrollY, rightLiTops } = this
      return rightLiTops.findIndex((liTop, index) => {
        this._leftScoll(index)
        return scrollY >= liTop && scrollY < rightLiTops[index + 1]
      })
    }
  },
  watch: {
    searchgoods () {
      this.$nextTick(() => {
        this._initBScrool()
        this._initRightLiTop()
      })
    }
  },
  methods: {
    _initBScrool () {
      // eslint-disable-next-line no-unused-vars
      this.leftScroll = new BScroll('.menu_wrapper', {
        scrollY: true,
        click: true
      })
      // eslint-disable-next-line no-unused-vars
      this.roghtScroll = new BScroll('.shop_wrapper', {
        scrollY: true,
        click: true,
        probeType: 3// 派发滚动监听
      })
      this.roghtScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(pos.y)
      })
    },
    // 每个板块头部位置
    _initRightLiTop () {
      const tempTop = []
      let top = 0
      tempTop.push(top)
      const allLis = this.$refs.shopsParent.getElementsByClassName('shops-li')
      Array.prototype.slice.call(allLis).forEach((element, i) => { // 转换为真数组
        if (i === allLis.length - 1) {
          element.style.paddingBottom = `${window.innerHeight - element.clientHeight - 50}px`
        }
        top += element.clientHeight// 每个板块的高度
        tempTop.push(top)
      })
      this.rightLiTops = tempTop
    },
    clickLeftIndex (i) {
      this.scrollY = this.rightLiTops[i]
      this.roghtScroll.scrollTo(0, -this.scrollY, 500)
    },
    _leftScoll (i) {
      const menulists = this.$refs.menulist
      const el = menulists[i]
      this.leftScroll.scrollToElement(el, 300, 0, -100)
    },
    isShowSearchPaner (flag) {
      this.isShow = flag
    }
  }
}
</script>
<style lang="stylus" scoped>
.search
  width 100%
  height 100%
  background-color #f5f5f5
  overflow hidden
  .shop
    display flex
    position absolute
    top 60px
    bottom 50px
    width 100%
    background-color #fff
    overflow hidden
    .menu_wrapper
      width 80px
      flex 0 0 80px
      background-color #e0e0e0
      .menu-item
        width 100%
        height 60px
        display flex
        justify-content center
        align-items center
        font-weight lighter
        color #666666
        background-color #fafafa
        position relative
      .current
        color #e02e24
      .current::before
        content ''
        background-color #e02e24
        width 4px
        height 30px
        position absolute
        left 0
    .shop_wrapper
      flex 1
      background-color #fff
      .shop-title
        display flex
        flex-direction row
        padding 0 10px
        height 44px
        align-items center
        justify-content space-between
        color #999
        a
          color #999
          font-weight lighter
          text-decoration none
      .shops-items
        display flex
        flex-wrap wrap
        li
          display flex
          flex-direction column
          width 33.3%
          height 90px
          justify-content center
          align-items center
          color #666
          font-weight lighter
          font-size 14px
          img
            width 60%
            height 60%
            margin-bottom 5px
      .phone_type
        width 100%
        display flex
        flex-direction row
        flex-wrap wrap
        border-bottom 1px solid #ccc
        li
          width 33.3%
          display flex
          justify-content center
          align-items center
          margin 5px 0
          img
            width 80%
</style>
