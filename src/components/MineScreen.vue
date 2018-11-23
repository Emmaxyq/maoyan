<template>
    <div class="mine">
      <div class="headerWrapper">
        <div class="tipWrapper">
          <div class="tips">
            <i class="icon icon-cog"></i>
            <i class="icon icon-bubble2"></i>
          </div>
        </div>
        <div class="header">
          <div class="imgTou">
            <img class="img" src="../public/img/head.jpg">
          </div>
          <div class="userDesc">
            <div class="name">
              zpX444071608
            </div>
            <div class="more">
              <i class="icon-point-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="dingdan">
        <div class="title">
          <div class="name">我的订单</div>
          <div class="all">全部<i class="icon-point-right"></i></div>
        </div>
        <div class="fourItem">
          <div class="item" @click="showUnUse">
            <i class="icon icon-coin-yen"></i>
            <div class="name">未消费</div>
          </div>
          <div class="item" @click="showShopCart">
            <i class="icon icon-credit-card"></i>
            <div class="name">待付款</div>
          </div>
          <div class="item">
            <i class="icon icon-file-text2"></i>
            <div class="name">待评价</div>
          </div>
          <div class="item">
            <i class="icon icon-enter"></i>
            <div class="name">退款</div>
          </div>
        </div>
      </div>
      <div class="select">
        <div class="selItem">
          <div class="name">影院会员卡</div>
          <i class="icon-point-right"></i>
        </div>
        <div class="selItem">
          <div class="name">优惠券</div>
          <i class="icon-point-right"></i>
        </div>
        <div class="selItem">
          <div class="name">银行活动</div>
          <i class="icon-point-right"></i>
        </div>
        <div @click="logout" class="selItem">
          <div class="name">退出账号</div>
          <i class="icon-point-right"></i>
        </div>
      </div>
      <unUse :newCinemaData="newCinemaData" :hasPayList="hasPayList" @close="closeUnUse" v-if="isShowUnUse"></unUse>
    </div>
</template>

<script>
  import unUse from '../widget/unUse'
    export default {
      props: ['hasPayment', 'newCinemaData'],
      data() {
        return {
          hasPayList: this.hasPayment,
          isShowUnUse: false
        }
      },
      beforeRouteEnter(to, from, next) {
        next(vm => {
          console.log(vm.newCinemaData)
          console.log('hasPayment', vm.hasPayment)
          vm.hasPayList = vm.hasPayment
        })
      },
      methods: {
        logout() {
          this.$emit('logout-event')
        },
        showShopCart() {
          this.$emit('showShopCarView')
        },
        showUnUse() {
          this.isShowUnUse = true
        },
        closeUnUse() {
          this.isShowUnUse = false
        }
      },
      components: {
        unUse
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .mine
    background: #f4f4f4
    .headerWrapper
      background: #e54847
      .tipWrapper
        width: 100%
        height: 30px
        .tips
          float: right
          height: 100%
          line-height: 34px
          .icon
            font-size: 18px
            margin-right: 20px
            color: #FFFFFF
      .header
        width: 100%
        font-size: 0
        height: 100px
        line-height: 100px
        color: white
        display: flex
        .imgTou
          flex: 0 0 85px
          width: 85px
          height: 100px
          line-height: 100px
          margin-right: 15px
          /*background: white*/
          text-align: center
          padding: 25px 0 25px 25px
          box-sizing: border-box
          .img
            width: 50px
            height: 50px
            border-radius: 50%
            background-color: rgba(240,136,239,0.62)
        .userDesc
          flex: 1
          color: #fff
          .name
            display: inline-block
            font-size: 20px
          .more
            float: right
            font-size: 18px
            margin-right: 10px
    .dingdan
      margin-top: 10px
      width: 100%
      background: white
      .title
        padding: 15px 15px 0 15px
        height: 28px
        .name
          display: inline-block
          font-size: 16px
          font-weight: 700
        .all
          display: inline-block
          float: right
          font-size: 15px
          color: #666
          i
            margin-left: 5px
      .fourItem
        width: 100%
        display: flex
        .item
          flex: 1
          padding: 8px
          text-align: center
          .name
            font-size: 15px
            color: #858585
            margin-top: 10px
          .icon
            font-size: 15px
    .select
      margin-top: 10px
      background: white
      width: 100%
      .selItem
        padding: 15px 0
        font-size: 16px
        .name
          display: inline-block
          margin-left: 15px
        i
          float: right
          margin-right: 15px
          color: #666
</style>
