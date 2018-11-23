<template>
    <div class="shopCartWrapper">
      <div class="header">
        <i class="icon icon-close" @click="$emit('close')"></i>
        <span class="text">购物车</span>
      </div>
      <div class="noItem" v-if="!shoppingCartData || !shoppingCartData.selectFoods || shoppingCartData.selectFoods.length <= 0">购物车暂时无商品，请去购买......</div>
      <div v-if="shoppingCartData && shoppingCartData.selectFoods" class="foodsWrapper" ref="foodsWrapper">
        <div>
          <div class="foodItem" v-for="(food,index) in shoppingCartData.selectFoods" :key="index">
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
                <div @click="deleteFood(food, index)" class="deleteFood">删除</div>
                <div class="controlBtn">
                  <transition name="move">
                    <div @click="decCount(food)" v-show="food.count" class="btn icon-remove_circle_outline"></div>
                  </transition>
                  <transition name="fade">
                    <div v-show="food.count" class="count">{{food.count}}</div>
                  </transition>
                  <div @click="addCount(food)" class="btn icon-add_circle"></div>
                </div>

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
                <div class="deleteFood" @click="deleteTicket(food, index)">删除</div>
                <div class="controlBtn">
                  <transition name="move">
                    <div @click="decCount(food)" v-show="food.count" class="btn icon-remove_circle_outline"></div>
                  </transition>
                  <transition name="fade">
                    <div v-show="food.count" class="count">{{food.count}}</div>
                  </transition>
                  <div @click="addCount(food)" class="btn icon-add_circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="shoppingCartData && shoppingCartData.selectFoods && shoppingCartData.selectFoods.length > 0" class="footer">
        <span class="totalPrice">&yen;{{totalPrice}}</span>
        <span class="empty" @click="deleteAll">清空购物车</span>
        <span class="buyNow" @click="payment">立即购买</span>
      </div>
      <Toast :msg="'购买成功'" @close="closeToast" v-show="showToast"></Toast>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Toast from './Toast'
    export default {
      props: ['shoppingCartData', 'newCinemaData'],
      data() {
        return {
          showToast: false
        }
      },
      created() {
          this.$nextTick(() => {
            if (this.shoppingCartData && this.shoppingCartData.selectFoods) {
              if (!this.foodsWrapperScroll) {
                this.foodsWrapperScroll = new BScroll(this.$refs.foodsWrapper, {
                  click: true
                })
              } else {
                this.foodsWrapperScroll.refresh()
              }
            }
          })
      },
      watch: {
        shoppingCartData: {
          handler(newValue, oldValue) {
            console.log(newValue)
            this.shoppingCartData = newValue
          },
          deep: true
        }
      },
      computed: {
        totalPrice() {
          let sum = 0
          if (this.shoppingCartData.selectFoods) {
            for (let i = 0; i < this.shoppingCartData.selectFoods.length; i++) {
              if (this.shoppingCartData.selectFoods[i].price) {
                sum += this.shoppingCartData.selectFoods[i].count * this.shoppingCartData.selectFoods[i].price
              } else {
                sum += this.shoppingCartData.selectFoods[i].count * this.shoppingCartData.selectFoods[i].vipPrice
              }
            }
          }
          return sum.toFixed(2)
        }
      },
      methods: {
        addCount(food) {
          food.count++
          this.shoppingCartData.target = false
          console.log(this.shoppingCartData)
          console.log(this.shoppingCartData.selectFoods)
        },
        decCount(food) {
          if (food.count === 1) {
            return
          }
          food.count--
          this.shoppingCartData.target = false
        },
        deleteFood(food, index) {
          console.log(index)
          this.shoppingCartData.selectFoods.splice(index, 1)
          console.log(this.newCinemaData)
          for (let i = 0; i < this.newCinemaData[food.cinemaIndex].dealList.dealList.length; i++) {
            if (this.newCinemaData[food.cinemaIndex].dealList.dealList[i].title === food.title) {
              this.newCinemaData[food.cinemaIndex].dealList.dealList[i].isPutInCart = false
              this.newCinemaData[food.cinemaIndex].dealList.dealList[i].count = 0
            }
          }
          console.log(this.newCinemaData)
          console.log(this.shoppingCartData.selectFoods)
          this.shoppingCartData.target = false
          this.$emit('changeShoppingCartData', this.shoppingCartData)
        },
        deleteTicket(ticket, index) {
          this.shoppingCartData.selectFoods.splice(index, 1)
          this.newCinemaData[ticket.cinemaIndex].showData.movies[ticket.movieIndex].shows[ticket.showDateIndex].plist[ticket.pListIndex].count = 0
          this.newCinemaData[ticket.cinemaIndex].showData.movies[ticket.movieIndex].shows[ticket.showDateIndex].plist[ticket.pListIndex].isBuyInCart = false
          console.log(this.shoppingCartData)
          this.shoppingCartData.target = false
          this.$emit('changeShoppingCartData', this.shoppingCartData)
        },
        deleteAll() {
          let foods = this.shoppingCartData.selectFoods.filter(food => food.title)
          let tickets = this.shoppingCartData.selectFoods.filter(food => food.tm)
          console.log('foods', foods)
          console.log('tickets', tickets)
          if (foods.length > 0) {
            for (let j = 0; j < foods.length; j++) {
              for (let i = 0; i < this.newCinemaData[foods[j].cinemaIndex].dealList.dealList.length; i++) {
                if (this.newCinemaData[foods[j].cinemaIndex].dealList.dealList[i].title === foods[j].title) {
                  let buyCount = this.newCinemaData[foods[j].cinemaIndex].dealList.dealList[i].count
                  if (this.newCinemaData[foods[j].cinemaIndex].dealList.dealList[i].buycount) {
                    this.$set(this.newCinemaData[foods[j].cinemaIndex].dealList.dealList[i], 'buycount', buyCount)
                  } else {
                    this.newCinemaData[foods[j].cinemaIndex].dealList.dealList[i].buycount = buyCount
                  }
                  this.newCinemaData[foods[j].cinemaIndex].dealList.dealList[i].isPutInCart = false
                  this.newCinemaData[foods[j].cinemaIndex].dealList.dealList[i].count = 0
                }
              }
            }
          }
          if (tickets.length > 0) {
            for (let k = 0; k < tickets.length; k++) {
              let tbuyCount = this.newCinemaData[tickets[k].cinemaIndex].showData.movies[tickets[k].movieIndex].shows[tickets[k].showDateIndex].plist[tickets[k].pListIndex].count
              if (this.newCinemaData[tickets[k].cinemaIndex].showData.movies[tickets[k].movieIndex].shows[tickets[k].showDateIndex].plist[tickets[k].pListIndex].buycount) {
                this.$set(this.newCinemaData[tickets[k].cinemaIndex].showData.movies[tickets[k].movieIndex].shows[tickets[k].showDateIndex].plist[tickets[k].pListIndex], 'buycount', tbuyCount)
              } else {
                this.newCinemaData[tickets[k].cinemaIndex].showData.movies[tickets[k].movieIndex].shows[tickets[k].showDateIndex].plist[tickets[k].pListIndex].buycount = tbuyCount
              }
              this.newCinemaData[tickets[k].cinemaIndex].showData.movies[tickets[k].movieIndex].shows[tickets[k].showDateIndex].plist[tickets[k].pListIndex].count = 0
              this.newCinemaData[tickets[k].cinemaIndex].showData.movies[tickets[k].movieIndex].shows[tickets[k].showDateIndex].plist[tickets[k].pListIndex].isBuyInCart = false
            }
          }
          this.shoppingCartData.selectFoods = []
          this.shoppingCartData.target = false
          console.log(this.shoppingCartData)
          this.$emit('changeShoppingCartData', this.shoppingCartData)
        },
        payment() {
          let mydate = new Date()
          let buyDate = mydate.toLocaleString()
          for (let i = 0; i < this.shoppingCartData.selectFoods.length; i++) {
            if (this.shoppingCartData.selectFoods[i].buydate) {
              this.$set(this.shoppingCartData.selectFoods[i], 'buydate', buyDate)
            } else {
              this.shoppingCartData.selectFoods[i].buydate = buyDate
            }
          }
          let hasBuy = this.shoppingCartData.selectFoods
          console.log(hasBuy)
          this.$emit('hasPaymentList', hasBuy)
          this.deleteAll()
          this.showToast = true
        },
        closeToast() {
          this.showToast = false
        }
      },
      components: {
        Toast
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .shopCartWrapper
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: white
    z-index: 300
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
      bottom: 30px
      .foodItem
        padding: 13px 0
        width: 100%
        position: relative
        .cinemaName
          margin: 5px 0
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
            .sellCount
              text-align: right
              line-height: 16px
              height: 16px
              font-size: 12px
              color: #999
            .controlBtn
              text-align: right
              transition: all 0.5s linear
              margin: 5px 0
              /*float: right*/
              .btn
                display: inline-block
                font-size: 24px
                line-height: 24px
                color: rgb(0,160,220)
                vertical-align: top
                transition: all 0.5s linear
                &.move-leave-to, &.move-enter
                  opacity: 0
                  transform-origin: center center
                  transform: translateX(36px) rotateZ(180deg)
              .count
                display: inline-block
                width: 24px
                text-align: center
                font-size: 10px
                line-height: 24px
                color: rgb(147,153,159)
                transition: all 0.5s linear
                &.fade-enter, &.fade-leave-to
                  opacity: 0
            .price
              margin-top: 5px
              display: inline-block
              color: #f03d37
              font-size: 17px
              line-height: 37px
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
            .deleteFood
              margin-top: 5px
              display: inline-block
              font-size: 17px
              color: lightblue
              float: right
              line-height: 37px
    .footer
      height: 30px
      width: 100%
      background: #e5e5e5
      line-height: 30px
      position: fixed
      bottom: 0
      left: 0
      display: flex
      text-align: center
      .totalPrice
        flex: 1
        color: #f50
        font-size: 16px
      .empty
        flex: 1
      .buyNow
        flex: 1
        color: blue
        font-weight: 700
</style>
