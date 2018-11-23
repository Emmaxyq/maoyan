<template>
    <div class="movieDetail">
      <div class="header">
        <i class="icon icon-point-left" @click="$emit('closeDetail')"></i>
        <span class="text">{{movieDetailData.movieName}}</span>
      </div>
      <div class="moveWrapper" ref="descdetail">
        <div>
          <div class="descHeader">
            <div class="detail">
              <div class="img">
                <img :src="movieDetailData.movieSrc" width="110px" height="150px">
              </div>
              <div class="desc">
                <div class="title">{{movieDetailData.movieName}}</div>
                <div class="title-en">{{movieDetailData.movieRealyName}}</div>
                <div class="scorewrapper" v-if="movieDetailData.sc != 0">
                  <Star :score="Number(movieDetailData.sc)" size="36"></Star>
                  <span>{{movieDetailData.sc}}</span>
                  <div>({{movieDetailData.snum}}人评分)</div>
                </div>
                <div class="scorewrapper" v-if="movieDetailData.sc == 0"><span style="fontSize: 14px">{{movieDetailData.wish}}人想看</span></div>
                <div class="category">{{movieDetailData.category}}</div>
                <div class="placeTime">
                  {{movieDetailData.src}}/{{movieDetailData.dur}}分钟
                </div>
                <div class="releaseTime">{{movieDetailData.releaseTime}}</div>
              </div>
            </div>
            <div @click="showMovieVideo" class="icon-point-right"></div>
            <div class="background">
              <img :src="movieDetailData.movieSrc" width="380px" height="450px">
            </div>
            <div class="bgfilter"></div>
          </div>
          <div class="storyText">
            <div class="buyTicket" @click="showMovieCinema">特惠购票</div>
            <div class="textWrapper" :class="{'showText' : show}">
              <div class="text">
                {{movieDetailData.storyText}}
              </div>
              <div @click="showText" class="icon" :class="{'icon-point-up' : show, 'icon-point-down' : !show}"></div>
            </div>
          </div>
          <div class="actorWrapper">
            <h3 class="title">演职人员</h3>
            <div class="pics" ref="pics">
              <ul class="picWrapper" ref="picContent">
                <li ref="picItem" class="item">
                  <img :src="movieDetailData.staff['导演'][0]['imgSrc']">
                  <div class="name">{{movieDetailData.staff['导演'][0]['name']}}</div>
                  <p class="role">{{Object.keys(movieDetailData.staff)[0]}}</p>
                </li>
                <li ref="picItem" class="item" v-for="(item,index) in movieDetailData.staff['演员']" :key="index">
                  <img :src="item.imgSrc">
                  <div class="name">{{item.name}}</div>
                  <p class="role">{{item.role.replace("饰：","")}}</p>
                </li>
              </ul>
            </div>
            <div class="allStaff">
              <h4 class="text">全体演职人员</h4>
              <i class="icon-point-right" @click="showAllStaffScreen"></i>
            </div>
          </div>
          <div class="allImg" v-if="movieDetailData.allImg.length > 0">
            <h3 class="title">图库</h3>
            <div class="imgW" ref="imgW">
              <ul class="imgWrapper" ref="imgWrapper">
                <li ref="liItems" v-for="(item,index) in movieDetailData.allImg" :key="index" v-if="index<=7">
                  <img :src="item" height="90px" width="120px">
                </li>
              </ul>
            </div>
            <div class="allImgs">
              <h4 class="text">全部图片</h4>
              <i class="icon-point-right" @click="showAllImgScreen"></i>
            </div>
          </div>
          <div class="shortComment"  v-if="movieDetailData.shortComment.length > 0">
            <h3 class="title">短评</h3>
            <CommentDetail v-for="(item,index) in movieDetailData.shortComment" :key="index" :commentData="item"></CommentDetail>
          </div>
        </div>
      </div>
      <AllImgScreen :flag="initFlag" @close="closeAllImg" :imgData="movieDetailData.allImg" v-show="showAllImg"></AllImgScreen>
      <AllStaffScreen :flag="staffFlag" @close="closeAllStaff" :staffData="movieDetailData.allStaff" v-show="showAllStaff"></AllStaffScreen>
      <div v-if="showVideo" class="movieVideo">
        <div class="header">
          <i class="icon icon-close"  @click="closeVideo"></i>
          <span class="text">{{movieDetailData.movieName}}&nbsp;预告片</span>
        </div>
        <video ref="video" class="mvideo" :src="movieDetailData.videourl" :poster="movieDetailData.videoImg" controls="controls">
          您的浏览器不支持video
        </video>
      </div>
      <MovieCinema :isLogin="isLogin" @changeNewCinemaDataCS="changeNewCinemaDataCS" @shoppingCartDataCS="shoppingCartDataCS" @changeCartPosition="changeCartPosition" :newMovieData="newMovieData" :newMovieComingData="newMovieComingData" :selectFoodsApp="selectFoodsApp" :hasPayment="hasPayment" :newCinemaData="newCinemaData" :movieDetailData="movieDetailData" @close="closeMovieCinema" v-if="isShowMovieCinema"></MovieCinema>
      <Toast @close="closeToast" v-show="showToast"></Toast>
    </div>
</template>

<script>
  import Star from './Star'
  import BScroll from 'better-scroll'
  import CommentDetail from './CommentDetail'
  import AllImgScreen from './AllImgScreen'
  import AllStaffScreen from './AllStaffScreen'
  import MovieCinema from './MovieCinema'
  import Toast from './Toast'

    export default {
      props: ['isLogin', 'movieDetailData', 'newCinemaData', 'newMovieData', 'newMovieComingData', 'selectFoodsApp', 'hasPayment'],
      data() {
        return {
          show: false,
          showAllImg: false,
          refreshimg: {},
          initFlag: false,
          showAllStaff: false,
          staffFlag: false,
          showVideo: false,
          current: false,
          isShowMovieCinema: false,
          showToast: false
        }
      },
      mounted() {
        console.log(this.selectFoodsApp)
        this.$nextTick(() => {
          console.log(this.newCinemaData)
          this.newCinemaDataMD = this.newCinemaData
          this.descdetailScroll = new BScroll(this.$refs.descdetail, {
            click: true
          })
          this._inithorizontalScroll()
        })
      },
      // beforeRouteEnter(to, from, next) {
      //   next(vm => {
      //     console.log(this.newCinemaData)
      //     vm._inithorizontalScroll()
      //   })
      // },
      methods: {
        showMovieVideo() {
          // console.log(112222)
          this.showVideo = true
        },
        closeVideo() {
          this.showVideo = false
        },
        playPause() {
          this.$refs.video.pause()
          // if (this.current) {
          //   console.log(this.current)
          //   this.$refs.video.play()
          //   this.current = false
          // } else {
          //   console.log(this.current)
          //   this.$refs.video.pause()
          //   this.current = true
          // }
        },
        goback() {
          this.$router.go(-1)
        },
        showText() {
          this.show = !this.show
        },
        _inithorizontalScroll() {
          // console.log(this.$refs.picContent.children)
          if (this.$refs.picContent.children.length > 0) {
            let pLength = this.$refs.picContent.children.length
            let pWidth = this.$refs.picContent.children[0].offsetWidth
            let pListWidth = (pWidth + 4) * pLength
            this.$refs.picContent.style.width = pListWidth + 'px'
            this.$nextTick(() => {
              if (!this.picScroll) {
                this.picScroll = new BScroll(this.$refs.pics, {
                  scrollX: true
                })
              } else {
                this.picScroll.refresh()
              }
            })
          }
          if (this.movieDetailData.allImg.length > 0) {
            let picsLength = this.$refs.liItems.length
            let picWidth = this.$refs.liItems[0].offsetWidth
            let picListWidth = (picWidth + 5) * picsLength + 70
            // console.log(picWidth, picsLength, picListWidth)
            this.$refs.imgWrapper.style.width = picListWidth + 'px'
            // let width = 0
            // console.log(this.$refs.liItems.length)
            // for (let i = 0; i < this.$refs.liItems.length; i++) {
            //   width += (this.$refs.liItems[i].offsetWidth + 5)
            // }
            // console.log(width)
            // this.$refs.imgWrapper.style.width = width + 'px'
            this.$nextTick(() => {
              if (!this.imgWScroll) {
                this.imgWScroll = new BScroll(this.$refs.imgW, {
                  // startX: 0,
                  // click: true,
                  scrollX: true,
                  scrollY: false
                  // eventPassthrough: 'vertical'
                })
              } else {
                this.imgWScroll.refresh()
              }
            })
          }
        },
        showAllImgScreen() {
          this.showAllImg = true
          this.initFlag = true
        },
        closeAllImg() {
          this.showAllImg = false
        },
        showAllStaffScreen() {
          this.showAllStaff = true
          this.staffFlag = true
        },
        closeAllStaff() {
          this.showAllStaff = false
          this.staffFlag = false
        },
        showMovieCinema() {
          if (!this.isLogin) {
            this.showToast = true
            return
          }
          console.log(11111111111111111111)
          this.isShowMovieCinema = true
        },
        closeMovieCinema() {
          this.isShowMovieCinema = false
        },
        changeCartPosition(val) {
          this.$emit('changeCartPosition', val)
        },
        shoppingCartDataCS(val) {
          this.$emit('shoppingCartDataCS', val)
        },
        changeNewCinemaDataCS(val) {
          this.$emit('changeNewCinemaDataCS', val)
        },
        closeToast() {
          this.showToast = false
        }
      },
      components: {
        Star,
        CommentDetail,
        AllImgScreen,
        AllStaffScreen,
        MovieCinema,
        Toast
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .movieDetail
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 100
    overflow: auto
    /*background-color: rgb(244,244,244)*/
    /*z-index: 1*/
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
    .moveWrapper
      position: fixed
      top: 50px
      overflow: hidden
      bottom: 0px
      width: 100%
      background-color: rgb(244,244,244)
      .descHeader
        height: 188px
        position: relative
        .detail
          height: 150px
          padding: 19px 30px 19px 15px
          display: flex
          .img
            flex: 0 0 110px
          .desc
            flex: 1
            margin-left: 12.5px
            color: rgba(255,255,255,0.8)
            .title
              font-size: 20px
              font-weight: 700
              margin-top: 2px
              color: white
            .title-en
              margin-top: 10px
              font-size: 12px
            .scorewrapper
              color: #666
              span
                font-weight: 700
                font-size: 18px
                color: #fc0
                line-height: 24px
              div
                font-size: 12px
                margin-top: 5px
                color: rgba(255,255,255,0.8)
            .category, .placeTime, .releaseTime
              margin-top: 10px
              font-size: 12px
        .icon-point-right
          display: inline-block
          position: absolute
          right: 15px
          top: 50%
          color: aliceblue
        .background
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          overflow: hidden
          text-align: center
          filter: blur(10px)
          z-index: -1
        .bgfilter
          position: absolute
          top: 0
          width: 100%
          height: 100%
          z-index: -1
          background: rgba(0,0,0,0.4)
      .storyText
        padding: 15px 15px 0 15px
        border-top: 1px solid #e5e5e5
        border-bottom: 1px solid #e5e5e5
        background-color: white
        .buyTicket
          padding: 10px
          font-size: 16px
          margin-bottom: 10px
          background-color: red
          text-align: center
          border-radius: 4px
          color: #fff
        .textWrapper
          .text
            max-height: 58px
            font-size: 15px
            line-height: 19px
            overflow: hidden
            color: #555
            text-overflow: ellipsis
          .icon
            color: #aaaaaa
            text-align: center
            height: 22px
          &.showText
            .text
              max-height: 500px
      .actorWrapper
        margin: 10px 0
        border-top: 1px solid #e5e5e5
        border-bottom: 1px solid #e5e5e5
        background: white
        .title
          color: #666
          padding: 10px 15px
        .picWrapper
          width: 100%
          padding: 0 0 5px 15px
          margin: 0
          list-style: none
          box-sizing: border-box
          white-space: nowrap
          background-color: white
          .item
            display: inline-block
            padding-left: 2px
            text-align: center
            img
              width: 80px
              height: 100px
            .name, .role
              width: 80px
              text-overflow: ellipsis
              white-space: nowrap
              font-size: 11px
              color: #999
              word-wrap: break-word
              word-break: break-all
              overflow: hidden
        .allStaff
          height: 40px
          color: #999
          background: white
          border-top: 1px solid#e5e5e5
          padding: 0 15px
          .text
            float: left
            font-weight: lighter
            line-height: 40px
          .icon-point-right
            float: right
            line-height: 40px
      .allImg
        margin-top: 10px
        background: white
        border-top: 1px solid #e5e5e5
        border-bottom: 1px solid #e5e5e5
        width: 100%
        box-sizing: border-box
        .title
          color: #666
          padding: 10px 15px
        .imgW
          overflow: hidden
          width: 100%
          white-space: nowrap
          /*padding: 0 0 5px 30px*/
          .imgWrapper
            padding: 0 15px
            li
              display: inline-block
              margin-right: 5px
              height: 90px
              width: 120px
        .allImgs
          height: 40px
          color: #999
          background: white
          border-top: 1px solid#e5e5e5
          padding: 0 15px
          .text
            float: left
            font-weight: lighter
            line-height: 40px
          .icon-point-right
            float: right
            line-height: 40px
      .shortComment
        margin-top: 10px
        border-top: 1px solid #e5e5e5
        border-bottom: 1px solid #e5e5e5
        background: white
        .title
          padding: 8px 12px
          height: 40px
          line-height: 25px
          box-sizing: border-box
    .movieVideo
      position: fixed
      top: 0
      left: 0
      background: black
      z-index: 200
      width: 100%
      bottom: 0px
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
      .mvideo
        width: 100%
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: auto
</style>
