<template>
    <div class="cinemaDetail">
      <!--<ShoppingCart :shoppingCartData="shoppingCartData" class="shoppingcart"></ShoppingCart>-->
      <div class="header">
        <i class="icon icon-close" @click="$emit('close')"></i>
        <span class="text">{{cinemaDetailData.nm}}</span>
      </div>
      <div class="movieTimeDetail" ref="movieTimeDetail">
        <div>
          <div class="nameArea">
            <div class="name">{{cinemaDetailData.nm}}</div>
            <div class="area">{{cinemaDetailData.cinemaData.addr}}</div>
          </div>
          <div class="movieDecWrapper">
            <div class="movieImgWrapper" ref="movieImgWrapper">
              <ul ref="ul">
                <li :class="{active:img.imgActive}" @click="selectActive(index)" class="imgItem" v-for="(img,index) in imgSrc" :key="index">
                  <img :src="img.src" width="100px" height="150px"/>
                </li>
              </ul>
            </div>
            <div class="movieInfo">
              <div class="nameScore">
                <div class="name">{{movieDesc.nm}}</div>
                <div v-if="movieDesc.sc !== '0.0'" class="score">{{movieDesc.sc}}<span>分</span></div>
                <div v-if="movieDesc.sc === '0.0'" class="score">{{movieDesc.wish}}<span>人想看</span></div>
              </div>
              <div class="desc">{{movieDesc.desc}}</div>
            </div>
          </div>
          <div class="dateWrapper" ref="dateWrapper">
            <ul ref="uldate">
              <li @click="showDateDetaileTime(datemovie,indexdate)" :class="{active:datemovie.dateActive}" class="dateItem" v-for="(datemovie,indexdate) in movieDesc.shows" :key="indexdate">
                {{datemovie.dateShow}}
              </li>
            </ul>
          </div>
          <div class="timeDetail">
            <div class="timeDetailItems" v-for="(timetd,indextd) in timeDetail" :key="indextd">
              <div class="time">{{timetd.tm}}</div>
              <div class="cat">
                <div class="cat1">{{timetd.lang}}&nbsp;{{timetd.tp}}</div>
                <div class="cat2">{{timetd.th}}</div>
              </div>
              <div class="price">
                <div class="sellPrice" v-if="timetd.vipPrice"><span>&yen;</span>{{parseInt(timetd.vipPrice/0.85)}}</div>
                <div class="sellPrice" v-else-if="!timetd.vipPrice && timeDetail[0].vipPrice"><span>&yen;</span>{{parseInt(timeDetail[0].vipPrice/0.85)}}</div>
                <div class="sellPrice" v-else><span>&yen;</span>35</div>
                <div class="cardVip" v-if="timetd.vipPrice">
                  <span class="cart">{{timetd.vipPriceName}}</span>
                  <span class="vipPrice">&yen;{{timetd.vipPrice}}</span>
                </div>
                <div class="desc">{{timetd.extraDesc}}</div>
              </div>
              <div class="butBtn" @click="buyTicket(timetd,indextd)" v-if="!timetd.isBuyInCart">购票</div>
              <div class="butBtn isBuyInCart" @click="buyTicket(timetd,indextd)" v-if="timetd.isBuyInCart">已在购物车</div>
            </div>
          </div>
          <div class="foodsWrapper" v-if="cinemaDetailData.dealList.dealList && cinemaDetailData.dealList.dealList.length > 0">
            <div class="title">影院超值套餐</div>
            <div class="foodItem" v-for="(food,foodindex) in cinemaDetailData.dealList.dealList" :key="foodindex">
              <img class="img" :src="food.imageUrl.replace('w.h/','')" width="92px" height="92px">
              <span class="cardTag" v-if="food.cardTag !== null">{{food.cardTag}}</span>
              <div class="desc">
                <div class="title">
                  <span v-if="food.recommendPersonNum === 2">双人</span>
                  <span v-if="food.recommendPersonNum === 1">单人</span>
                  {{food.title}}
                </div>
                <div class="sellCount">{{food.curNumberDesc}}</div>
                <div class="priceBuy">
                  <div class="price"><span>&yen;</span>{{food.price}}</div>
                  <div @click="addCount(food, foodindex)" class="btn" v-if="!food.isPutInCart">加入购物车</div>
                  <div @click="addCount(food, foodindex)" class="btn isInCart" v-if="food.isPutInCart">已加入购物车</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast @close="closeToast" v-show="showToast"></Toast>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import ShoppingCart from '../components/ShoppingCart'
  import Toast from './Toast'

    export default {
      props: ['isLogin', 'detailFlag', 'cinemaDetailData', 'cinemaIndex', 'newMovieData', 'newMovieComingData', 'selectFoodsCS'],
      data() {
        return {
          movieId: [],
          imgSrc: [],
          flagD: this.detailFlag,
          movieDesc: {},
          timeDetail: [],
          shoppingCartData: {},
          selectFoods: this.selectFoodsCS,
          movieIndex: 0,
          showDateIndex: 0,
          pListIndex: 0,
          showToast: false
        }
      },
      watch: {
        flagD: {
          handler (newValue, oldValue) {
            // console.log(123123)
            if (newValue === true) {
              console.log(this.selectFoodsCS)
              this.initMove()
            }
          },
          immediate: true
        },
        selectFoodsCS: {
          handler (newValue, oldValue) {
            console.log(newValue)
            this.selectFoods = newValue
            console.log('this.selectFoods', this.selectFoods)
          },
          deep: true
        }
      },
      methods: {
        initMove() {
          this.$nextTick(() => {
            console.log(this.cinemaDetailData)
            this.imgSrc = []
            for (let i = 0; i < this.cinemaDetailData.showData.movies.length; i++) {
              let flag = 0
              for (let j = 0; j < this.newMovieData.length; j++) {
                if (this.cinemaDetailData.showData.movies[i].id === this.newMovieData[j].id) {
                  this.imgSrc.push({src: this.newMovieData[j].movieSrc, imgActive: false})
                  flag = 1
                  break
                }
              }
              if (flag === 0) {
                for (let j = 0; j < this.newMovieComingData.length; j++) {
                  if (this.cinemaDetailData.showData.movies[i].id === this.newMovieComingData[j].id) {
                    this.imgSrc.push({src: this.newMovieComingData[j].movieSrc, imgActive: false})
                    flag = 1
                    break
                  }
                }
              }
            }
            // 设置初始样式状态
            this.imgSrc[0].imgActive = true
            this.selectActive(0)

            for (let a = 0; a < this.movieDesc.shows.length; a++) {
              this.$set(this.movieDesc.shows[a], 'dateActive', false)
            }

            this.showDateDetaileTime(this.movieDesc.shows[0], 0)

            // console.log('this.movieDesc.shows', this.movieDesc.shows)
            this.initScroll()
          })
        },
        initScroll() {
          setTimeout(() => {
            console.log('initScroll')
            //  影片
            if (this.$refs.ul.children.length > 0) {
              let pLength = this.$refs.ul.children.length
              let pWidth = this.$refs.ul.children[0].offsetWidth
              let pListWidth = (pWidth + 10) * pLength
              this.$refs.ul.style.width = pListWidth + 'px'
              if (!this.movieImgWrapperScroll) {
                this.movieImgWrapperScroll = new BScroll(this.$refs.movieImgWrapper, {
                  scrollX: true,
                  click: true
                })
              } else {
                this.movieImgWrapperScroll.refresh()
              }
            }
            //  日期
            if (this.$refs.uldate.children.length > 0) {
              let pLengthdate = this.$refs.uldate.children.length
              let pWidthdate = this.$refs.uldate.children[0].offsetWidth
              let pListWidthdate = (pWidthdate + 35) * pLengthdate
              this.$refs.uldate.style.width = pListWidthdate + 'px'
              if (!this.dateWrapperScroll) {
                this.dateWrapperScroll = new BScroll(this.$refs.dateWrapper, {
                  scrollX: true,
                  click: true
                })
              } else {
                this.dateWrapperScroll.refresh()
              }
            }

            if (!this.movieTimeDetailScroll) {
              this.movieTimeDetailScroll = new BScroll(this.$refs.movieTimeDetail, {
                click: true
              })
            } else {
              this.movieTimeDetailScroll.refresh()
            }
          }, 800)
        },
        selectActive(index) {
          this.movieIndex = index
          this.movieDesc = {}
          this.movieDesc = this.cinemaDetailData.showData.movies[index]
          // console.log(this.movieDesc.shows[0].dateShow)
          for (let i = 0; i < this.imgSrc.length; i++) {
            this.imgSrc[i].imgActive = false
          }
          this.imgSrc[index].imgActive = true
          // console.log('index', index)
          // console.log(this.movieDesc.shows)
          this.showDateDetaileTime(this.movieDesc.shows[0], 0)
          this.initScroll()
          // console.log('refresh')
          // this.movieTimeDetailScroll.refresh()
        },
        showDateDetaileTime(datemovie, indexdate) {
          console.log(indexdate)
          this.showDateIndex = indexdate
          console.log(datemovie)
          for (let a = 0; a < this.movieDesc.shows.length; a++) {
            this.movieDesc.shows[a].dateActive = false
          }
          datemovie.dateActive = true
          // console.log(datemovie)
          this.timeDetail = datemovie.plist
          // console.log(this.timeDetail)
          // console.log('refresh')
          // this.movieTimeDetailScroll.refresh()
        },
        addCount (food, foodindex, $event) {
          if (!this.isLogin) {
            this.showToast = true
            return
          }
          console.log(food)
          console.log(foodindex)
          console.log(event)
          console.log(event.target)
          console.log(event.target.parentNode.parentNode.previousElementSibling)
          let target = event.target.parentNode.parentNode.previousElementSibling
          if (!food.count && food.count !== 0) {
            this.$set(food, 'count', 1)
            console.log(food.count)
          } else {
            console.log(food.count)
            food.count = 1
          }
          console.log(this.selectFoods)
          this.$set(food, 'cinemaIndex', this.cinemaIndex)
          this.selectFoods.push(food)
          // event.target.style.pointerEvents = 'none'
          // event.target.style.background = '#bfbfbf'
          // event.target.innerHTML = '已加入购物车'
          console.log(this.selectFoods)
          // this.shoppingCartData = {selectFoods: this.selectFoods, food: food, target: target, CinemaNane: this.cinemaDetailData.nm}
          this.shoppingCartData = {selectFoods: this.selectFoods, target: target, ticket: false}
          console.log('this.shoppingCartData', this.shoppingCartData)
          this.$emit('shoppingCartData', this.shoppingCartData)
          this.$set(this.cinemaDetailData.dealList.dealList[foodindex], 'isPutInCart', true)
          console.log(this.cinemaDetailData.dealList.dealList[foodindex])
          this.$emit('newCinemaDetailData', this.cinemaDetailData)
          this.$emit('currentcinemaIndex', this.cinemaIndex)
        },
        buyTicket(movieTicket, indextd, $event) {
          if (!this.isLogin) {
            this.showToast = true
            return
          }
          console.log(indextd)
          console.log(this.showDateIndex)
          this.pListIndex = indextd
          console.log(movieTicket)
          console.log(event.target)
          let target = event.target
          if (!movieTicket.count && movieTicket.count !== 0) {
            this.$set(movieTicket, 'count', 1)
          } else {
            console.log(movieTicket.count)
            movieTicket.count = 1
          }
          if (!movieTicket.vipPrice) {
            this.$set(movieTicket, 'vipPrice', 35)
          }
          this.$set(movieTicket, 'pListIndex', this.pListIndex)
          this.$set(movieTicket, 'showDateIndex', this.showDateIndex)
          this.$set(movieTicket, 'movieIndex', this.movieIndex)
          this.$set(movieTicket, 'cinemaIndex', this.cinemaIndex)
          this.$set(movieTicket, 'isBuyInCart', true)
          console.log(movieTicket)
          console.log(this.cinemaDetailData)
          this.selectFoods.push(movieTicket)
          this.shoppingCartData = {selectFoods: this.selectFoods, target: target, ticket: true}
          console.log(this.shoppingCartData)
          this.$emit('shoppingCartData', this.shoppingCartData)
          this.$emit('newCinemaDetailData', this.cinemaDetailData)
          this.$emit('currentcinemaIndex', this.cinemaIndex)
        },
        closeToast() {
          this.showToast = false
        }
      },
      components: {
        ShoppingCart,
        Toast
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .cinemaDetail
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 30
    overflow: hidden
    background: white
    .shoppingcart
      z-index: 300
      position: absolute
      top: 17px
      right: 15px
      width: 30px
      height: 30px
      border-radius: 50%
      background: #e5e5e5
      text-align: center
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
        font-size: 18px
        flex: 1
    .movieTimeDetail
      position: fixed
      width: 100%
      top: 50px
      overflow: hidden
      bottom: 0px
      .nameArea
        padding: 15px
        .name
          font-size: 17px
          font-weight: 700
          line-height: 24px
          color: #333
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
        .area
          margin-top: 2px
          font-size: 13px
          line-height: 18px
          color: #999
      .movieDecWrapper
        .movieImgWrapper
          /*position: fixed*/
          width: 100%
          top: 130px
          overflow: hidden
          padding: 15px 5px
          white-space: nowrap
          background: #40454d
          ul
            padding: 5px 30px
          .imgItem
            display: inline-block
            margin-right: 10px
            &.active
              border: 2px solid white
        .movieInfo
          padding: 11px 15px
          text-align: center
          background: white
          .nameScore
            height: 24px
            line-height: 24px
            font-size: 17px
            color: #333
            font-weight: 700
            .name
              display: inline-block
            .score
              display: inline-block
              color: #ffb400
              font-size: 16px
              span
                font-size: 10px
          .desc
            margin-top: 2px
            height: 18.5px
            line-height: 18.5px
            font-size: 13px
            color: #999
      .dateWrapper
        height: 47px
        overflow: hidden
        white-space: nowrap
        .dateItem
          color: #666
          font-size: 14px
          height: 45px
          line-height: 45px
          display: inline-block
          text-align: center
          margin-left: 30px
          &.active
            color: #f30d37
            border-bottom: 2px solid red
      .timeDetail
        .timeDetailItems
          padding: 17px 12.5px
          display: flex
          .time
            font-size: 20px
            line-height: 35px
            color: #333
            white-space: nowrap
            text-align: center
          .cat
            margin-left: 17px
            flex: 1
            overflow-x: hidden
            white-space: nowrap
            .cat1
              margin-top: 2px
              font-size: 12px
              line-height: 18px
              color: #333
            .cat2
              margin-top: 7px
              font-size: 11px
              color: #999
          .price
            flex: 0 1 auto
            margin-left: 5px
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
          .desc
            margin-top: 5px
            font-size: 11px
            color: #999
          .butBtn
            min-width: 45px
            margin-left: 2px
            height: 27px
            line-height: 28px
            font-size: 12px
            color: white
            background: #f03d37
            text-align: center
            border-radius: 4px
          .isBuyInCart
            pointer-events: none
            background: #bfbfbf
      .foodsWrapper
        margin-left: 15px
        .title
          height: 45px
          line-height: 45px
          font-size: 15px
          color: #666
        .foodItem
          padding: 13px 0
          width: 100%
          position: relative
          display: flex
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
            height: 92px
            margin: 0 15px
            overflow: hidden
            .title
              font-size: 14px
              line-height: 18px
              color: #333
              overflow: hidden
              text-overflow: ellipsis
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
            .priceBuy
              height: 27px
              line-height: 27px
              margin-top: 5px
              .price
                display: inline-block
                color: #f03d37
                font-size: 17px
                span
                  font-size: 14px
              .btn
                display: inline-block
                float: right
                height: 27px
                line-height: 27px
                font-size: 12px
                padding: 0 8px
                border-radius: 3px
                color: white
                background: #f03d37
              .isInCart
                pointer-events: none
                background: #bfbfbf
</style>
