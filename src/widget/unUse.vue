<template>
    <div class="unUse">
      <div class="header">
        <i class="icon icon-close" @click="$emit('close')"></i>
        <span class="text">已购&nbsp;&nbsp;未消费</span>
      </div>
      <div class="noItem" v-if="!hasPayList || hasPayList.length <= 0">无未消费商品......</div>
      <div class="foodsWrapper" ref="foodsWrapper">
        <div>
          <div class="foodItem" v-for="(food,index) in hasPayList" :key="index">
            <div class="cinemaName">{{newCinemaData[food.cinemaIndex].nm}}</div>
            <!--食品时的展示-->
            <div v-if="food.title" class="foodItemDesc">
              <img class="img" :src="food.imageUrl.replace('w.h/','')" width="92px" height="120px">
              <span class="cardTag" v-if="food.cardTag !== null">{{food.cardTag}}</span>
              <div class="desc">
                <div class="title">
                  <span v-if="food.recommendPersonNum === 2">双人</span>
                  <span v-if="food.recommendPersonNum === 1">单人</span>
                  {{food.title}}
                </div>
                <div class="price"><span>&yen;</span>{{food.price}}</div>
                <div class="count">X&nbsp;{{food.buycount}}</div>
              </div>
            </div>
            <!--电影票的展示-->
            <div v-if="food.tm" class="foodItemDesc">
              <img class="img" :src="newCinemaData[food.cinemaIndex].showData.movies[food.movieIndex].img.replace('w.h/','')" width="92px" height="120px">
              <div class="desc">
                <div class="movieName">{{newCinemaData[food.cinemaIndex].showData.movies[food.movieIndex].nm}}</div>
                <div class="time">{{food.dt}}&nbsp;&nbsp;{{food.tm}}</div>
                <div class="cat">
                  <div class="cat1">{{food.lang}}&nbsp;{{food.tp}}</div>
                  <div class="cat2">{{food.th}}</div>
                </div>
                <div class="movieprice">
                  <div class="sellPrice"><span>&yen;</span>{{parseInt(food.vipPrice/0.85)}}</div>
                  <div class="cardVip" v-if="food.vipPrice">
                    <span class="cart">{{food.vipPriceName}}</span>
                    <span class="vipPrice">&yen;{{food.vipPrice}}</span>
                  </div>
                  <div class="moviedesc">{{food.extraDesc}}</div>
                </div>
                <div class="count">X&nbsp;{{food.buycount}}</div>
              </div>
            </div>
            <div class="buydate"><span>下单时间：</span>{{food.buydate}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      props: ['hasPayList', 'newCinemaData'],
      created() {
        this.$nextTick(() => {
          if (!this.foodsWrapperScroll) {
            this.foodsWrapperScroll = new BScroll(this.$refs.foodsWrapper, {
              click: true
            })
          } else {
            this.foodsWrapperScroll.refresh()
          }
        })
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .unUse
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: white
    z-index: 50
    .header
      width: 100%
      font-size: 0
      height: 50px
      line-height: 50px
      background: #e54847
      color: white
      text-align: center
      display: flex
      .icon
        font-size: 25px
        flex: 0 0 25px
        line-height: 50px
      .text
        font-size: 20px
        flex: 1
    .noItem
      text-align: center
      margin-top: 10px
      font-size: 20px
      color: #666
    .foodsWrapper
      margin-left: 15px
      overflow: hidden
      position: fixed
      top: 50px
      bottom: 0px
      .foodItem
        padding: 13px 0
        width: 100%
        position: relative
        border-bottom: 1px solid #ccc
        &:last-child
          border: none
        .cinemaName
          margin: 5px 0
        .buydate
          font-size: 15px
          color: #666
          margin-top: 5px
        .foodItemDesc
          width: 100%
          display: flex
          position: relative
          .img
            flex: 0 0 92px
          .cardTag
            position: absolute
            left: 0
            top: 13px
            display: inline-block
            height: 18px
            line-height: 18px
            background: #fa5939
            font-size: 12px
            padding: 0 5px
            color: white
            border-bottom-right-radius: 2px
          .desc
            display: inline-block
            flex: 1
            /*height: 92px*/
            margin: 0 15px
            overflow: hidden
            .title
              font-size: 14px
              line-height: 18px
              color: #333
              overflow: hidden
              text-overflow: ellipsis
              margin-bottom: 10px
              span
                display: inline-block
                vertical-align: top
                margin-top: 1px
                margin-right: 7px
                padding: 0 4px
                font-size: 10px
                line-height: 15px
                height: 15px
                background: #f90
                border-radius: 2px
                color: white
            .price
              margin-top: 5px
              display: inline-block
              color: #f03d37
              font-size: 17px
              span
                font-size: 14px
            .movieName
              margin: 5px 0
            .time
              font-size: 15px
              line-height: 22px
              color: #666
              white-space: nowrap
            .cat
              margin-left: 17px
              overflow-x: hidden
              white-space: nowrap
              .cat1
                display: inline-block
                margin-top: 2px
                font-size: 12px
                line-height: 18px
                color: #333
              .cat2
                display: inline-block
                margin-top: 7px
                font-size: 11px
                color: #999
            .count
              display: inline-block
              margin: 5px
              float: right
              font-size: 15px
              color: #666
            .movieprice
              display: inline-block
              margin: 5px 0
              width: 130px
              .sellPrice
                display: inline-block
                color: #f03d37
                margin-top: 1px
                font-size: 19px
                span
                  font-size: 11px
              .cardVip
                display: inline-block
                height: 15px
                line-height: 15px
                transform: scale(0.8)
                transform-origin: left
                margin-right: -16px
                border: 1px solid #ff9000
                font-size: 12px
                border-radius: 2px
                color: #ff9000
                .cart
                  color: white
                  background: #ff9000
                .vipPrice
                  padding: 0 2px
            .moviedesc
              margin-top: 5px
              font-size: 11px
              color: #999
</style>
