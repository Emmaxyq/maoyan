<template>
    <div>
      <div class="cinemaList" ref="cinemaList">
        <div ref="hua">
          <div class="cinemaItem" v-for="(item,index) in newCinemaData" :key="index" @click="showCinemaDetail(item, index)" v-if="!movieCinemaList">
            <div class="namePrice">
              <div class="name">{{item.nm}}</div>
              <div class="minPrice"><span>{{item.sellPrice}}</span>元起</div>
            </div>
            <div class="addrFar">
              <div class="addr">{{item.addr}}</div>
              <div class="far">{{item.distance}}</div>
            </div>
            <div class="tag" v-if="item.tag">
              <span class="span2" v-if="item.tag.allowRefund === 1">退票</span>
              <span class="span2" v-if="item.tag.endorse   === 1">改签</span>
              <span class="span1" v-if="item.tag.snack   === 1">小吃</span>
              <span class="span1" v-if="item.tag.vipTag ">折扣卡</span>
              <span class="span2" v-for="(tag1,indextag1) in item.tag.hallType" :key="indextag1 + 't1'">{{tag1}}</span>
              <span class="span2" v-if="item.tag.hallType.length < 0" v-for="(tag2,indextag2) in item.tag.hallTypeVOList" :key="indextag2 + 't2'">{{tag2.name}}</span>
            </div>
            <div class="promotion">{{item.promotion.cardPromotionTag}}</div>
          </div>
          <div v-for="(mvcnItem,mcindex) in movieCinemaList" v-if="movieCinemaList" :key="mcindex">
            <div class="cinemaItem" v-for="(item,index) in newCinemaData" :key="index" @click="showCinemaDetail(item, index)" v-if="mvcnItem.id === item.id">
              <div class="namePrice">
                <div class="name">{{item.nm}}</div>
                <div class="minPrice"><span>{{item.sellPrice}}</span>元起</div>
              </div>
              <div class="addrFar">
                <div class="addr">{{item.addr}}</div>
                <div class="far">{{item.distance}}</div>
              </div>
              <div class="tag" v-if="item.tag">
                <span class="span2" v-if="item.tag.allowRefund === 1">退票</span>
                <span class="span2" v-if="item.tag.endorse   === 1">改签</span>
                <span class="span1" v-if="item.tag.snack   === 1">小吃</span>
                <span class="span1" v-if="item.tag.vipTag ">折扣卡</span>
                <span class="span2" v-for="(tag1,indextag1) in item.tag.hallType" :key="indextag1 + 't1'">{{tag1}}</span>
                <span class="span2" v-if="item.tag.hallType.length < 0" v-for="(tag2,indextag2) in item.tag.hallTypeVOList" :key="indextag2 + 't2'">{{tag2.name}}</span>
              </div>
              <div class="promotion">{{item.promotion.cardPromotionTag}}</div>
            </div>
          </div>
        </div>
      </div>
      <CinemaDetail :isLogin="isLogin" @currentcinemaIndex="changeNewCinemaData" :selectFoodsCS="selectFoodsCS" @newCinemaDetailData="newCinemaDetailData" @shoppingCartData="sendShoppingCartData" :detailFlag="detailFlag" :newMovieData="newMovieData" :newMovieComingData="newMovieComingData" @close="closeCinemaDetail" :cinemaDetailData="cinemaDetailData" :cinemaIndex="cinemaIndex" v-if="showDetail"></CinemaDetail>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import CinemaDetail from './CinemaDetail'
  export default {
    props: ['isLogin', 'newCinemaData', 'newMovieData', 'newMovieComingData', 'selectFoodsApp', 'hasPayment', 'movieCinemaList'],
    data() {
      return {
        showDetail: false,
        cinemaDetailData: {},
        detailFlag: false,
        selectFoodsCS: this.selectFoodsApp,
        cinemaIndex: 0
      }
    },
    watch: {
      newCinemaData: {
        handler (newValue, oldValue) {
          console.log(newValue)
          this.newCinemaData = newValue
          console.log(this.newCinemaData)
          console.log('hasPayment', this.hasPayment)
        },
        deep: true
      },
      selectFoodsApp: {
        handler (newValue, oldValue) {
          console.log(newValue)
          this.selectFoodsCS = newValue
          console.log('this.selectFoodsApp', this.selectFoodsCS)
        },
        deep: true
      }
    },
    created() {
      // console.log(this.newCinemaData[1].tag.hallType.length)
      this.$nextTick(() => {
        if (!this.cinemaListScroll) {
          this.cinemaListScroll = new BScroll(this.$refs.cinemaList, {
            click: true
          })
        } else {
          this.cinemaListScroll.refresh()
        }
        setTimeout(() => {
          if (this.$refs.hua.children.length === 0) {
            this.$refs.hua.innerHTML = '抱歉，附近没有影院上映该片......'
          }
        }, 500)
      })
    },
    methods: {
      showCinemaDetail(item, index) {
        console.log(item)
        console.log(this.detailFlag)
        this.showDetail = true
        this.detailFlag = true
        console.log(this.detailFlag)
        this.cinemaDetailData = item
        this.cinemaIndex = index
        this.$emit('changeCartPosition', true)
      },
      closeCinemaDetail() {
        console.log(this.detailFlag)
        this.showDetail = false
        this.detailFlag = false
        console.log(this.detailFlag)
        this.$emit('changeCartPosition', false)
      },
      sendShoppingCartData(val) {
        // this.shoppingCartDataCS = val
        this.$emit('shoppingCartDataCS', val)
      },
      newCinemaDetailData(val) {
        this.cinemaDetailData = val
        console.log(this.cinemaDetailData)
        console.log(this.cinemaDetailData.dealList.dealList[0])
      },
      changeNewCinemaData(val) {
        this.newCinemaData[val] = this.cinemaDetailData
        console.log(this.newCinemaData)
        this.$emit('changeNewCinemaDataCS', this.newCinemaData)
      }
    },
    components: {
      CinemaDetail
    }
  }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .cinemaList
    position: absolute
    width: 100%
    overflow: hidden
    top: 50px
    bottom: 70px
    .cinemaItem
      margin-left: 15px
      padding: 13px 15px 13px 0
      background: white
      overflow: hidden
      border-bottom: 1px solid #e5e5e5
      .namePrice
        height: 23px
        line-height: 23px
        font-size: 16px
        color: #000
        .name
          display: inline-block
        .minPrice
          display: inline-block
          padding-left: 3px
          padding-top: 9px
          color: #f03d37
          font-size: 11px
          span
            font-size: 18px
            margin-right: 3px
      .addrFar
        margin-top: 10px
        font-size: 13px
        color: #666
        display: flex
        .addr
          flex: 1
          display: inline-block
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
        .far
          display: inline-block
          margin-left: 5px
      .tag
        /*height: 17px*/
        line-height: 17px
        margin: 4px 0
        overflow: hidden
        font-size: 10px
        .span1
          color: #f90
          border: 1px solid #f90
          margin-right: 5px
        .span2
          color: #589daf
          border: 1px solid #589daf
          margin-right: 5px
      .promotion
        margin-top: 6px
        margin-bottom: 4px
        font-size: 11px
        color: #999
</style>
