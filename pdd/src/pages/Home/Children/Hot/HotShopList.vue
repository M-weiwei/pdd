<template>
  <div class="shop-content">
    <ul class="shop-list"
        v-for="(item,i) in homeShopList"
        :key="i">
      <li class="shop-list-item">
        <img :src="item.image_url"
             alt=""
             width="100%">
        <h3 class="shop-list-title">{{item.goods_name}}</h3>
        <div class="shop-list-bottom">
          <span class="item-price">￥{{item.normal_price/100}}</span>
          <span class="item-counter">{{item.sales_tip}}</span>
          <span class="item-user">
            <img :src="user.avatar"
                 alt=""
                 v-for="(user,i1) in item.bubble"
                 :key="i1">
          </span>
          <span class="item-buy">
            <button>去拼单 ></button>
          </span>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {

    }
  },
  methods: {},
  computed: {
    ...mapState(['homeShopList'])
  }
}

</script>
<style lang='stylus' scoped>
.shop-content
  margin-bottom 50px
  background-color #f5f5f5
  .shop-list
    .shop-list-item
      margin-bottom 10px
      background-color #fff
      display flex
      flex-direction column
      .shop-list-title
        line-height 22px
        height 44px
        width 94%
        margin-left 3%
        overflow hidden
      .shop-list-bottom
        margin 10px 0
        display flex
        justify-content space-around
        align-items center
        .item-price
          font-size 18px
          text-align center
          font-weight bolder
          color red
          flex 1
        .item-counter
          flex 2
          font-size 12px
          color #cccccc
        .item-user
          display flex
          justify-content center
          align-items center
          flex 1
          img
            width 30px
            border-radius 50%
          img:nth-child(2)
            margin-left -6px
        .item-buy
          flex 2
          button
            width 80%
            height 34px
            color #fff
            border none
            display flex
            justify-content center
            align-items center
            margin-left 10px
            border-radius 8px
            background-color red
</style>
