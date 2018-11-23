<template>
    <div class="main">
      <div class="header">
        <span>猫眼</span>
      </div>
      <div class="content" ref="content">
        <div>
          <div class="slider">
            <ul ref="ul">
              <li ref="lis" v-for="(imgsrc,index) in imgSrc" :key="index" class="item">
                <img :src="imgsrc">
              </li>
            </ul>
          </div>
          <div class="hotMovie">
            <h3 class="title">正在热映</h3>
            <div class="movieW" ref="movieW">
              <ul class="movieWrapper" ref="movieWrapper">
                <li ref="liItems" v-for="(item,index) in newMovieData" :key="index" v-if="index < 9">
                  <img :src="item.movieSrc" height="130px" width="90px">
                  <div class="scorewrapper" v-if="item.sc != 0">猫眼评分&nbsp;<span>{{item.sc}}</span></div>
                  <div class="scorewrapper" v-if="item.sc == 0"><span>{{item.wish}}</span>&nbsp;人想看</div>
                  <div class="name">{{item.movieName}}</div>
                </li>
              </ul>
            </div>
            <div class="allMovies">
              <h4 class="text">查看更多</h4>
              <i class="icon-point-right" @click="toRouteHot"></i>
            </div>
          </div>
          <div class="comingMovie">
            <h3 class="title">即将上映</h3>
            <div class="comingmovieW" ref="comingmovieW">
              <ul class="comingmovieWrapper" ref="comingmovieWrapper">
                <li ref="comingliItems" v-for="(item,index) in newMovieComingData" :key="index" v-if="index < 9">
                  <img :src="item.movieSrc" height="130px" width="90px">
                  <div class="scorewrapper" v-if="item.sc != 0">猫眼评分&nbsp;<span>{{item.sc}}</span></div>
                  <div class="scorewrapper" v-if="item.sc == 0"><span>{{item.wish}}</span>&nbsp;人想看</div>
                  <div class="name">{{item.movieName}}</div>
                </li>
              </ul>
            </div>
            <div class="allcomingMovies">
              <h4 class="text">查看更多</h4>
                <i class="icon-point-right" @click="toRouteComing"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
    props: ['newMovieData', 'newMovieComingData'],
      data() {
        return {
          imgSrc: ['http://p1.meituan.net/mmc/a17d8c1c7cef60828a51dec6dd0162cf61611.jpg', 'http://p1.meituan.net/mmc/d436a965a2ad207b754064740b0b981164468.jpg', 'http://p0.meituan.net/mmc/ec3a41f75c2de005d046db6ed5b7d4f668375.jpg', 'http://p1.meituan.net/mmc/11cb6ffc62537bef62de0a1bc60aec0b135287.jpg', 'http://p1.meituan.net/mmc/a17d8c1c7cef60828a51dec6dd0162cf61611.jpg'],
          index: 0,
          isHot: true,
          isComing: false,
          timeId: null
          // moviedata: []
        }
      },
      // created() {
      //   this.axios.get('/api/moviedata')
      //     .then(res => {
      //       res = res.data
      //       this.moviedata = res.data
      //       console.log(this.moviedata)
      //     })
      // },
      beforeRouteEnter(to, from, next) {
        next(vm => {
          // vm.index = 0
          if (vm.index >= vm.imgSrc.length - 1) {
            vm.index = vm.imgSrc.length - 3
          }
          vm.timeId = setInterval(vm.sliderStart, 2000)
          console.log(vm.index)
          console.log(vm.timeId)
          vm.$refs.ul.addEventListener('transitionend', vm.lastPage)
          vm._inithorizontalScroll()
        })
      },
      beforeRouteLeave(to, from, next) {
        clearInterval(this.timeId)
        console.log(this.index)
        console.log(this.timeId)
        next()
      },
      mounted() {
        // console.log(1231234)
        // this.timeId = setInterval(this.sliderStart, 2000)
        // console.log(this.timeId)
        // console.log(typeof this.timeId)
        // this.$refs.ul.addEventListener('transitionend', this.lastPage)
        // this._inithorizontalScroll()
      },
      methods: {
        _inithorizontalScroll() {
          this.$nextTick(() => {
            setTimeout(() => {
              this.contentScroll = new BScroll(this.$refs.content, {
                click: true
              })
              console.log(this.$refs.liItems)
              console.log('nextTick')
              let picsLength = this.$refs.liItems.length
              let picWidth = this.$refs.liItems[0].offsetWidth
              let picListWidth = (picWidth + 5) * picsLength + 40
              this.$refs.movieWrapper.style.width = picListWidth + 'px'
              if (!this.movieWScroll) {
                this.movieWScroll = new BScroll(this.$refs.movieW, {
                  scrollX: true,
                  scrollY: false
                })
              } else {
                this.movieWScroll.refresh()
              }
              this.$refs.comingmovieWrapper.style.width = picListWidth + 'px'
              if (!this.comingmovieWScroll) {
                this.comingmovieWScroll = new BScroll(this.$refs.comingmovieW, {
                  scrollX: true,
                  scrollY: false
                })
              } else {
                this.comingmovieWScroll.refresh()
              }
            }, 600)
          })
        },
        addTranstion() {
          this.$refs.ul.style.transition = 'all .5s linear'
          this.$refs.ul.style.webkitTransition = 'all .5s linear'
        },
        removeTranstion() {
          this.$refs.ul.style.transition = 'none'
          this.$refs.ul.style.webkitTransition = 'none'
        },
        translateX(offsetX) {
          this.$refs.ul.style.transform = `translateX(${offsetX}px)`
          this.$refs.ul.style.webkitTransform = `translateX(${offsetX}px)`
        },
        sliderStart() {
          this.index++
          let width = this.$refs.lis[0].offsetWidth
          let offsetX = -this.index * width
          this.addTranstion()
          this.translateX(offsetX)
        },
        lastPage() {
          if (this.index === this.$refs.lis.length - 1) {
            this.removeTranstion()
            this.translateX(0)
            this.index = 0
          }
        },
        toRouteHot() {
          this.isHot = true
          this.isComing = false
          this.$emit('hotcoming', this.isHot)
          this.$emit('mainmovie', false)
          this.$router.push('/movie/hotmovie')
        },
        toRouteComing() {
          this.isHot = false
          this.isComing = true
          this.$emit('hotcoming', this.isHot)
          this.$emit('mainmovie', false)
          this.$router.push('/movie/comingmovie')
        }
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .main
    .header
      width: 100%
      font-size: 20px
      height: 50px
      line-height: 50px
      background: #e54847
      color: white
      text-align: center
    .content
      position: fixed
      top: 50px
      bottom: 70px
      overflow: hidden
      width: 100%
      white-space: nowrap
      .slider
        width: 100%
        ul
          width: 1000%
          transition: all .5s linear
          .item
            display: inline-block
            width: 10%
            img
              width: 100%
      .hotMovie
        margin-top: 10px
        background: white
        border-top: 1px solid #e5e5e5
        border-bottom: 1px solid #e5e5e5
        width: 100%
        box-sizing: border-box
        .title
          color: #666
          padding: 10px 15px
        .movieW
          overflow: hidden
          width: 100%
          white-space: nowrap
          .movieWrapper
            padding: 0 15px
            li
              display: inline-block
              margin-right: 5px
              height: 130px
              width: 90px
              .scorewrapper
                font-size: 10px
                margin-top: -14px
                font-weight: 700
                color: #f50
                span
                  font-size: 12px
              .name
                margin-top: 3px
                width: 90px
                text-overflow: ellipsis
                white-space: nowrap
                font-size: 14px
                color: black
                font-weight: 500
                overflow: hidden
        .allMovies
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
      .comingMovie
        margin-top: 10px
        background: white
        border-top: 1px solid #e5e5e5
        border-bottom: 1px solid #e5e5e5
        width: 100%
        box-sizing: border-box
        .title
          color: #666
          padding: 10px 15px
        .comingmovieW
          overflow: hidden
          width: 100%
          white-space: nowrap
          .comingmovieWrapper
            padding: 0 15px
            li
              display: inline-block
              margin-right: 5px
              height: 130px
              width: 90px
              .scorewrapper
                font-size: 10px
                position: relative
                margin-top: -14px
                font-weight: 700
                color: #f50
                span
                  font-size: 12px
              .name
                margin-top: 3px
                width: 90px
                text-overflow: ellipsis
                white-space: nowrap
                font-size: 14px
                color: black
                font-weight: 500
                overflow: hidden
        .allcomingMovies
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
</style>
