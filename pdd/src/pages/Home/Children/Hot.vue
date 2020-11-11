<template>
  <div class="hot">
    <!--轮播图-->
    <swiper ref="mySwiper"
            :options="swiperOptions"
            v-if="homecasual">
      <swiper-slide v-for="(item,i) in homecasual"
                    :key="i"><img :src="item.imgurl"
             alt=""
             width='100%'></swiper-slide>

      <div class="swiper-pagination"
           slot="pagination"></div>
    </swiper>
    <hot-nav></hot-nav>
    <!-- 广告位 -->
    <div class="hot-ad">
      <img src="./../imgs/hot_ad/home_ad.gif"
           style="width:100%"
           alt="">
    </div>
    <hot-shop-list></hot-shop-list>

  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import HotNav from './Hot/HotNav.vue'
import HotShopList from './Hot/HotShopList.vue'
import { mapState } from 'vuex'
export default {
  mounted () {
    this.swiper.slideTo(0, 1000, false)
    // 请求首页轮播图
    this.$store.dispatch('reqHomeCasual')
    // 请求导航栏
    this.$store.dispatch('reqHomeNav')
    this.$store.dispatch('reqHomeShopList')
  },
  data () {
    return {
      swiperOptions: {
        autoplay: true,
        loog: true,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    HotNav,
    HotShopList
  },
  directives: {
    swiper: directive
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    },
    ...mapState(['homecasual'])
  },
  methods: {

  }

}

</script>
<style lang='stylus' scoped>
.hot
  width 100%
  height 100%
  padding-top 46px
  .hot-ad
    margin 8px 0
    padding 5px
    background-color #fff
</style>
