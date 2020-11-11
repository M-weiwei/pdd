<template>
  <div class="cell"
       @click="clickCell(leftTitle)">
    <div class="cell-left"
         :style="{color:leftTitleColor}">
      <i :class="leftIcon"
         v-show="leftIcon"></i>
      <span v-show="leftTitle">{{leftTitle}}</span>
    </div>
    <div class="cell-right"
         :style="{color:rightTitleColor}">
      <span>{{rightTitle}}</span>
      <i class="itlike-uniE909"
         v-show="isShowRightArrow"></i>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    leftTitle: { type: String, default: '' },
    leftIcon: { type: String, default: '' },
    rightTitle: { type: String, default: '' },
    leftTitleColor: { type: String, default: '' },
    rightTitleColor: { type: String, default: '' },
    isShowRightArrow: { type: Boolean, default: true },
    clickCell: { type: Function, default: () => { } }
  },
  data () {
    return {

    }
  },
  methods: {}
}

</script>
<style lang='stylus' scoped>
.cell
  height 44px
  display flex
  justify-content space-between
  align-items center
  padding 0 10px
  border-bottom 1px solid #ececec
  background-color #fff
  .cell-left, .cell-right
    display flex
    align-items center
    i
      margin-right 5px
</style>
