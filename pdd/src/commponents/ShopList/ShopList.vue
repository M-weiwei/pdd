<template>
  <a class="recommend_item">
    <img v-lazy="item.thumb_url"
         alt=""
         width="100%"
         v-if="item.thumb_url">
    <h4 class="item-title">{{item.short_name}}</h4>
    <div class="item-bottom">
      <span class="item-price">￥{{item.price/100}}</span>
      <span class="item-sales">{{item.sales_tip}}</span>
      <button class="item-btn"
              @click="clickCellBtn(item)">加入购物车</button>
    </div>
  </a>
</template>

<script>

export default {
  props: {
    item: Object,
    clickCellBtn: {
      type: Function,
      default: () => { }
    }
  },
  data () {
    return {

    }
  },
  mounted () { }
}

</script>
<style lang='stylus' scoped>
.recommend_item:nth-child(2n-1)
  margin-right 1%
.recommend_item
  width 49.5%
  background-color #fff
  padding-bottom 15px
  margin-bottom 15px
  .item-title
    line-height 20px
    font-size 13px
    height 20px
    font-weight lighter
    margin 5px 0
    padding 0 5px
    overflow hidden
  .item-bottom
    display flex
    flex-direction row
    align-items center
    padding 0 6px
    .item-price
      flex 2
      color red
      font-size 12px
      font-weight bolder
    .item-sales
      flex 4
      color #666666
      font-size 10px
    .item-btn
      flex 3
      border 1px solid orangered
      height 25px
      border-radius 5px
      font-size 10px
      background-color transparent
      color red
</style>
