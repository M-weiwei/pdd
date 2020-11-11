<template>
  <div class="me-setting">
    <div>
      <me-common-cell left-icon='itlike-3'
                      left-title='免密支付' />
      <me-common-cell left-icon='itlike-2'
                      left-title='免拼单设置' />
      <me-common-cell left-icon='itlike-1'
                      left-title='消息接收设置' />
    </div>
    <div style="margin-top:10px">
      <me-common-cell left-icon='itlike-4'
                      left-title='免密支付' />
      <me-common-cell left-icon='itlike-5'
                      left-title='免密支付' />
    </div>
    <div style="margin-top:10px">
      <me-common-cell left-icon='itlike-1'
                      left-title='免密支付' />
    </div>
    <div class="logout"
         @click="dealLogout()">退出登录</div>
  </div>
</template>

<script>
import MeCommonCell from './MeCommonCell'
import { MessageBox } from 'mint-ui'
import { mapActions } from 'vuex'
export default {
  data () {
    return {

    }
  },
  methods: {
    ...mapActions(['getLogout']),
    dealLogout () {
      MessageBox.confirm('您确定退出登录吗?').then(action => {
        if (action === 'confirm') {
          this.getLogout()
          this.$router.replace('/home')
        }
      })
    }
  },
  components: {
    MeCommonCell
  }
}

</script>
<style lang='stylus' scoped>
.logout
  width 100%
  height 44px
  margin-top 10px
  display flex
  justify-content center
  align-items center
  background-color #fff
</style>
