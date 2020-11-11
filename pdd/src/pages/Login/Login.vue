<template>

  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img src="./images/lk_logo_sm.png"
               alt=""
               width="250">
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a href="javascript:;"
             :class="{current:loginMode}"
             @click="deaLoginMode(true)">验证码登录</a>
          <a href="javascript:;"
             :class="{current:!loginMode}"
             @click="deaLoginMode(false)">密码登录</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current:loginMode}">
            <section class="login-message">
              <input type="tel"
                     maxlength="11"
                     placeholder="手机号"
                     v-model="phone">
              <button class="get-verification"
                      :class="{phone_right:phoneRiht}"
                      v-if="!countDown"
                      @click.prevent="geVerifyCode()">
                获取验证码
              </button>
              <button disabled="disabled"
                      class="get-verification"
                      v-else>
                已发送({{countDown}}s)
              </button>
            </section>
            <section class="login-verification">
              <input type="tel"
                     maxlength="8"
                     placeholder="验证码"
                     v-model="code">
            </section>
            <section class="login-hint">
              温馨提示：未注册撩课帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current:!loginMode}">
            <section>
              <section class="login-message">
                <input type="text"
                       maxlength="11"
                       placeholder="用户名/手机/邮箱"
                       v-model="user_name">
              </section>
              <section class="login-verification">
                <input type="password"
                       maxlength="8"
                       placeholder="密码"
                       v-if="pwdMode"
                       v-model="pwd">
                <input type="text"
                       maxlength="8"
                       placeholder="密码"
                       v-else
                       v-model="pwd">
                <div class="switch-show">
                  <img :class="{on:pwdMode}"
                       src="./images/hide_pwd.png"
                       alt=""
                       width="20"
                       @click="dealPwdMode(false)">
                  <img :class="{on:!pwdMode}"
                       src="./images/show_pwd.png"
                       alt=""
                       width="20"
                       @click="dealPwdMode(true)">
                </div>
              </section>
              <section class="login-message">
                <input type="text"
                       maxlength="11"
                       placeholder="验证码"
                       v-model="captcha">
                <img class="get-verification"
                     src="http://localhost:3000/api/captche"
                     alt="captcha"
                     ref="captcat"
                     @click.prevent="getCaptcha()">
              </section>
            </section>
          </div>
          <button class="login-submit"
                  @click.prevent="login()">登录</button>
        </form>
        <button class="login-back">返回</button>
      </div>
    </div>
  </div>

</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      loginMode: true, // 登录方式切换,
      phone: '', // 手机号码
      countDown: 0, // 倒计时
      pwdMode: true, // 密码true为密文，反之
      pwd: '',
      code: '',
      userInfo: {}, // 用户信息
      user_name: '', // 用户名
      captcha: ''// 图形验证码

    }
  },
  methods: {
    //   处理登录模式
    deaLoginMode (flag) {
      this.loginMode = flag
    },
    // 验证码发送
    async geVerifyCode () {
      if (this.phoneRiht) {
        this.countDown = 10
        this.intervalId = setInterval(() => {
          this.countDown--
          if (this.countDown === 0) {
            clearInterval(this.intervalId)
          }
        }, 1000)
      }
      //   获取短信验证码
      const { data: res } = await this.$http.get('api/send_code', { params: { phone: this.phone } })
      if (res.err_code === 1) {
        Toast({
          message: res.message,
          position: 'center',
          duration: 2000
        })
      }
      console.log(res)
    },
    // 密码显示方式
    dealPwdMode (flag) {
      this.pwdMode = flag
    },
    getCaptcha () {
      this.$refs.captcat.src = 'http://localhost:3000/api/captche?time' + new Date()
    },
    async login () {
      if (this.loginMode) {
        //   验证码登录
        if (!this.phone) {
          Toast('请输入手机号码')
          return
        } else if (!this.phoneRiht) {
          Toast('请输入正确手机号码')
          return
        }
        if (!this.code) {
          Toast('请输入验证码')
          return
        } else if (!(/^\d{6}$/gi.test(this.code))) {
          Toast('请输入正确验证码')
          return
        }
        const { data: login } = await this.$http.post('api/login_code', { phone: this.phone, code: this.code })
        console.log(login)
        if (login.success_code === 200) {
          this.userInfo = login.message
        } else {
          this.userInfo = {
            message: '登录失败，手机号或验证码错误'
          }
        }
      } else {
        //   账户密码登录
        if (!this.user_name) {
          Toast('用户名/手机/邮箱')
          return
        } else if (!this.pwd) {
          Toast('请输入密码')
          return
        } else if (!this.pwd) {
          Toast('请输入验证码')
          return
        }
        // 用户名和密码登录
        const { data: login } = await this.$http.post('api/login_pwd', { name: this.user_name, pwd: this.pwd, captcha: this.captcha })
        console.log(login)
        if (login.success_code === 200) {
          this.userInfo = login.message
        } else {
          this.userInfo = {
            message: '登录失败, 手机号或验证码不正确!'
          }
        }
      }
      if (!this.userInfo.id) {
        Toast(this.userInfo.message)
      } else {
        this.$store.commit('UserInfo', this.userInfo)
        this.$router.back()
      }
    }
  },
  computed: {
    phoneRiht () {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)// 手机验证正则
    }
  }
}

</script>
<style lang='stylus' scoped>
.login-container
  width 100%
  height 100%
  background #fff
  .login-inner
    padding-top 60px
    width 80%
    margin 0 auto
    .login-header
      .login-logo
        font-size 40px
        font-weight bold
        color mediumpurple
        text-align center
      .login-header-title
        padding-top 40px
        padding-bottom 10px
        text-align center
        > a
          color #333
          font-size 14px
          padding-bottom 4px
          text-decoration none
          &:first-child
            margin-right 40px
          &.current
            color mediumpurple
            font-weight 700
            border-bottom 2px solid mediumpurple
    .login-content
      > form
        > div
          display none
          &.current
            display block
          input
            width 100%
            height 100%
            padding-left 8px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid mediumpurple
          .login-message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get-verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.phone_right
                color purple
          .login-verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch-show
              position absolute
              right 10px
              top 12px
              img
                display none
              img.on
                display block
          .login-hint
            margin-top 12px
            color #999
            font-size 12px
            line-height 20px
            > a
              color mediumpurple
        .login-submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background mediumpurple
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .login-back
        display block
        width 100%
        height 42px
        margin-top 15px
        border-radius 4px
        background transparent
        border 1px solid mediumpurple
        color mediumpurple
        text-align center
        font-size 16px
        line-height 42px
</style>
