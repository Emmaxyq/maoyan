<template>
    <div class="loginWrapper">
      <div class="header">
        <span class="loginText">登录</span>
        <span class="zhuceText">注册</span>
      </div>
      <div class="loginWay">
        <div class="tipWrapper">
          <div>推荐登录方式</div>
        </div>
        <div class="divWrapper">
          <div @click="login" class="wechatLogin">微信登录</div>
        </div>
        <div class="tipWrapper">
          <div>或</div>
        </div>
        <div class="divWrapper">
          <div @click="login" class="telLogin">使用手机登录</div>
        </div>
        <div class="otherWay">
          <div>使用其他方式登录</div>
        </div>
      </div>
      <div class="tip">
        登录代表你已同意<a>《猫眼电影用户协议》</a>
      </div>
    </div>
</template>

<script>
    export default {
      methods: {
        login() {
          this.$emit('login-event')
        }
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .loginWrapper
    /*position: relative*/
    height: 100%
    .header
      width: 100%
      font-size: 0
      height: 50px
      line-height: 50px
      background: #e54847
      color: white
      .loginText
        font-size: 20px
        margin-left: 15px
      .zhuceText
        float: right
        font-size: 17px
        margin-right: 10px
    .loginWay
      padding: 40px 15px 20px 15px
      .tipWrapper
        height: 60px
        text-align: center
        line-height: 60px
        color: #999
      .divWrapper
        position: relative
        width: 100%
        height: 40px
        .wechatLogin, .telLogin
          position: absolute
          top: 0
          bottom: 0
          right: 0
          left: 0
          margin: auto
          width: 80%
          height: 40px
          line-height: 40px
          font-size: 18px
          font-weight: 300
          color: white
          text-align: center
          background: #00CC00
          border-radius: 4px
        .telLogin
          background: lightgray
      .otherWay
        height: 180px
        text-align: center
        line-height: 180px
        font-size: 14px
        color: red
    .tip
      position: absolute
      bottom: 60px
      width: 100%
      height: 15px
      font-size: 12px
      text-align: center
      a
        color: red
</style>
