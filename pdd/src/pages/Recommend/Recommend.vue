<template>
  <mescroll-vue class="recommend_container"
                ref="mescroll"
                :down="mescrollDown"
                :up="mescrollUp"
                @init="mescrollInit">
    <div class="recommend"
         v-if="userInfo.id&&recommendShopList.length>0">
      <shop-list v-for="(item,i) in recommendShopList"
                 :item=item
                 :key="i"
                 :clickCellBtn='dealWitchCellBtnClick' />
    </div>
    <select-login v-else />
  </mescroll-vue>
</template>
<script>
import SelectLogin from './../Login/SelectLogin'
import { mapState } from 'vuex'
import ShopList from './../../commponents/ShopList/ShopList'
import { Indicator } from 'mint-ui'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  data () {
    return {
      page: 1,
      count: 10,
      mescrollUp: { // 上拉加载的配置.
        callback: this.upCallback,
        dataList: [] // 列表数据
      },
      mescrollDown: {},
      mescroll: null // mescroll实例对象
    }
  },
  mounted () {
    Indicator.open('正在加载数据...')
  },
  computed: {
    ...mapState(['recommendShopList', 'userInfo'])
  },
  components: {
    ShopList,
    SelectLogin,
    MescrollVue

  },

  methods: {
    async dealWitchCellBtnClick (goods) {
      console.log(goods)
      const { data: res } = await this.$http.post('/api/add_shop_cart', { user_id: this.userInfo.id, goods_id: goods.goods_id, goods_name: goods.short_name, thumb_url: goods.thumb_url, price: goods.price })
      console.log(res)
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback (page, mescroll) {
      console.log(page)
      // 联网请求
      const Size = 10
      this.$store.dispatch('reqRecommendShopList', {
        app_name: 'rectab_sim_gyl',
        offset: (page.num - 1) * Size,
        count: Size,
        scb: (response) => {
          console.log(response)
          Indicator.close()
          const arr = response
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        },
        ecb: (e) => {
          mescroll.endErr()
        }
      })
      //   this.$http.get('xxxxxx', {
      //     params: {
      //       num: page.num, // 页码
      //       size: page.size // 每页长度
      //     }
      //   }).then((response) => {
      //     // 请求的列表数据
      //     const arr = response.data
      //     // 如果是第一页需手动置空列表
      //     if (page.num === 1) this.dataList = []
      //     // 把请求到的数据添加到列表
      //     this.dataList = this.dataList.concat(arr)
      //     // 数据渲染成功后,隐藏下拉刷新的状态
      //     this.$nextTick(() => {
      //       mescroll.endSuccess(arr.length)
      //     })
      //   }).catch((e) => {
      //     // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
      //     mescroll.endErr()
      //   })
    }

  }
}
</script>
<style lang="stylus" scoped>
.mescroll
  position fixed
  top 44px
  bottom 0
  height auto
  padding-bottom 50px
  .recommend
    display flex
    flex-direction row
    flex-wrap wrap
    background-color #f5f5f5
</style>
