<template>
    <div class="movie">
      <div class="header">
        <div class="title">猫眼电影</div>
        <div class="select">
          <div class="place" @click="areaViewShow">
            <span>{{trueAreaName}}</span>
            <i class="icon icon-circle-down"></i>
          </div>
          <div class="switchHot">
            <div class="hot" :class="{'active' : isHots}" @click="toRouteHot()">
              正在热映({{newMovieData.length}})
            </div>
            <div class="coming" :class="{'active' : isComings}" @click="toRouteComing()">
              即将上映({{newMovieComingData.length}})
            </div>
          </div>
          <div @click="searchViewShow" class="search icon-search"></div>
        </div>
       </div>
      <keep-alive>
        <router-view :isLogin="isLogin" @changeNewCinemaDataCS="changeNewCinemaDataCS" @shoppingCartDataCS="shoppingCartDataCS" @changeCartPosition="changeCartPosition" :selectFoodsApp="selectFoodsApp" :hasPayment="hasPayment" :newCinemaData="newCinemaData" :newMovieData="newMovieData" :newMovieComingData="newMovieComingData"></router-view>
      </keep-alive>
      <div class="selectArea" v-show="showAreaView">
        <div class="header">
          <i class="icon icon-close" @click="closeAreaView"></i>
          <div class="searchInput">
            <i class="icon-search"></i>
            <input @click="showSearchInput" @keyup.enter="searchMovie" class="input" placeholder="输入城市名或拼音">
          </div>
        </div>
        <div class="areaName" ref="areaName">
          <ul>
            <li class="allAreaItem" v-for="(value,key,index) in areaData" :key="index">
              <h2 class="title">{{key}}</h2>
              <div @click="changeAreaName(area.name)" class="areaItem" v-for="(area,areaindex) in value" :key="areaindex">
                {{area.name}}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="searchAreaDetail" v-show="showSearch">
        <div class="header">
          <div class="searchInput">
            <i class="icon-search"></i>
            <input @keyup.enter="searchAreaDetail" class="input" placeholder="输入城市名或拼音">
          </div>
          <div @click="closeSearchInput" class="cancel">取消</div>
        </div>
        <div class="nameWrapper" ref="nameWrapper">
          <div>
            <div @click="changeAreaName(areaD)" class="name" v-for="(areaD,indexD) in areaArr" :key="indexD">{{areaD}}</div>
          </div>
        </div>
      </div>
      <div class="searchView" v-show="showSearchView">
        <div class="header">
          <div class="searchInput">
            <i class="icon-search"></i>
            <input @keyup.enter="searchMovie" class="input" placeholder="找电影">
          </div>
          <div @click="cancelSearchView" class="cancel">取消</div>
        </div>
        <div class="movieContent" ref="movieContent">
          <div>
            <div @click="sshowMovieDetail(item)" v-for="(item,index) in movieNameArr" :key="index" class="movieItem">
              <div class="img">
                <img :src="item.movieSrc" width="90px" height="120px">
              </div>
              <div class="desc">
                <div class="nameScore">
                  <div class="name">{{item.movieName}}</div>
                  <div class="scorewrapper" v-if="item.sc != 0">猫眼评分&nbsp;<span>{{item.sc}}</span></div>
                  <div class="scorewrapper" v-if="item.sc == 0"><span>{{item.wish}}</span>&nbsp;人想看</div>
                </div>
                <div class="RealName">{{item.movieRealyName}}</div>
                <div class="category">{{item.category}}</div>
                <div class="releaseTime">{{item.releaseTime}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MovieDetail :isLogin="isLogin" @changeNewCinemaDataCS="changeNewCinemaDataCS" @shoppingCartDataCS="shoppingCartDataCS" @changeCartPosition="changeCartPosition" :newMovieData="newMovieData" :newMovieComingData="newMovieComingData" :selectFoodsApp="selectFoodsApp" :hasPayment="hasPayment"  :newCinemaData="newCinemaData"  @closeDetail="scloseMovieDetail" v-if="sshowMovieD" :movieDetailData="smovieDetailData"></MovieDetail>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import MovieDetail from '../widget/MovieDetail'
    export default {
      props: ['isLogin', 'newMovieData', 'newMovieComingData', 'isHot', 'isComing', 'newCinemaData', 'selectFoodsApp', 'hasPayment'],
      data() {
        return {
          isHots: this.isHot,
          isComings: this.isComing,
          showSearchView: false,
          movieNameStr: '',
          movieNameArr: [],
          sshowMovieD: false,
          smovieDetailData: {},
          showAreaView: false,
          areaData: {},
          showSearch: false,
          areaStr: '',
          keyArr: [],
          areaArr: [],
          trueAreaName: '广州'
        }
      },
      beforeRouteEnter(to, from, next) {
        next(vm => {
          vm.isHots = vm.isHot
          vm.isComings = vm.isComing
          console.log('this.isHot', vm.isHot, 'isComing', vm.isComing)
          console.log('this.isHots', vm.isHots, 'isComings', vm.isComings)
          let pathMovie = vm.isHots ? '/movie/hotmovie' : '/movie/comingmovie'
          vm.$router.push(pathMovie)
        })
      },
      beforeRouteLeave(to, from, next) {
        console.log(this.isHots)
        this.$emit('hotcoming', this.isHots)
        next()
      },
      created() {
        this.axios('/api/areadata')
          .then(res => {
            console.log(res)
            res = res.data
            this.areaData = res.data
            console.log(this.areaData)
            this.keyArr = Object.keys(this.areaData)
          })
      },
      // created() {
      //   this.$router.push('/movie/hotmovie')
      //     this.axios.get('/api/moviedata')
      //       .then(res => {
      //         res = res.data
      //         this.moviedata = res.data
      //         // console.log(this.moviedata)
      //       })
      //     setTimeout(() => {
      //       this.axios.get('/api/movieguandata')
      //         .then(res => {
      //           res = res.data
      //           this.movieguandata = res.data
      //           // console.log(this.movieguandata)
      //           for (let i = 0; i < this.moviedata.length; i++) {
      //             for (let j = 0; j < this.movieguandata.length; j++) {
      //               if (String(this.moviedata[i].id) === String(this.movieguandata[j].detailMovie.id)) {
      //                 var obj = Object.assign(this.moviedata[i], this.movieguandata[j].detailMovie)
      //                 this.newMovieData.push(obj)
      //               }
      //             }
      //           }
      //           console.log(this.newMovieData)
      //         })
      //     }, 100)
      //
      //   this.axios.get('/api/moviecomingdata')
      //     .then(res => {
      //       res = res.data
      //       this.moviecomingdata = res.data
      //       console.log(this.moviecomingdata)
      //     })
      //   setTimeout(() => {
      //     this.axios.get('/api/moviecomingguandata')
      //       .then(res => {
      //         res = res.data
      //         this.moviecomingguandata = res.data
      //         // console.log(this.moviecomingguandata)
      //         // console.log(this.moviecomingdata)
      //         for (let i = 0; i < this.moviecomingdata.length; i++) {
      //           for (let j = 0; j < this.moviecomingguandata.length; j++) {
      //             if (String(this.moviecomingdata[i].id) === String(this.moviecomingguandata[j].detailMovie.id)) {
      //               var obj = Object.assign(this.moviecomingdata[i], this.moviecomingguandata[j].detailMovie)
      //               this.newMovieComingData.push(obj)
      //             }
      //           }
      //         }
      //         console.log(this.newMovieComingData)
      //       })
      //   }, 500)
      // },
      methods: {
        toRouteHot() {
          this.$router.push('/movie/hotmovie')
          this.isHots = true
          this.isComings = false
        },
        toRouteComing() {
          this.$router.push('/movie/comingmovie')
          this.isHots = false
          this.isComings = true
        },
        searchViewShow() {
          this.showSearchView = true
        },
        cancelSearchView() {
          this.showSearchView = false
        },
        searchMovie(e) {
          this.movieNameStr = e.target.value
          console.log(this.movieNameStr)
          this.movieNameArr = []
          for (let i = 0; i < this.newMovieData.length; i++) {
            if (this.newMovieData[i].movieName.indexOf(this.movieNameStr) !== -1) {
              // console.log(this.newMovieData[i].movieName)
                this.movieNameArr.push(this.newMovieData[i])
            }
          }
          for (let i = 0; i < this.newMovieComingData.length; i++) {
            if (this.newMovieComingData[i].movieName.indexOf(this.movieNameStr) !== -1) {
              let flag = true
              for (let j = 0; j < this.movieNameArr.length; j++) {
                if (this.newMovieComingData[i].movieName === this.movieNameArr[j].movieName) {
                  flag = false
                }
              }
              if (flag) {
                this.movieNameArr.push(this.newMovieComingData[i])
              }
            }
          }
          console.log(this.movieNameArr)
          this.$nextTick(() => {
            if (!this.movieContentScroll) {
              this.movieContentScroll = new BScroll(this.$refs.movieContent, {
                click: true
              })
            } else {
              this.movieContentScroll.refresh()
            }
          })
        },
        sshowMovieDetail(moviedata) {
          // console.log(1234567)
          // console.log(this.showMovieD)
          this.sshowMovieD = true
          // console.log(this.showMovieD)
          // console.log(moviedata)
          this.smovieDetailData = moviedata
        },
        scloseMovieDetail() {
          this.sshowMovieD = false
        },
        areaViewShow() {
          this.showAreaView = true
          this.$nextTick(() => {
            if (!this.areaNameScroll) {
              this.areaNameScroll = new BScroll(this.$refs.areaName, {
                click: true
              })
            } else {
              this.areaNameScroll.refresh()
            }
          })
        },
        closeAreaView() {
          this.showAreaView = false
        },
        showSearchInput() {
          this.showSearch = true
        },
        closeSearchInput() {
          this.showSearch = false
        },
        searchAreaDetail(e) {
          this.areaStr = e.target.value
          console.log(this.areaStr)
          this.areaArr = []
          console.log(this.keyArr)
          for (let i = 0; i < this.keyArr.length; i++) {
            for (let j = 0; j < this.areaData[this.keyArr[i]].length; j++) {
              // console.log(this.areaData[this.keyArr[i]][j].name)
              let name = this.areaData[this.keyArr[i]][j].name
              if (name.indexOf(this.areaStr) !== -1) {
                console.log(111)
                this.areaArr.push(name)
              }
            }
          }
          console.log(this.areaArr)
          this.$nextTick(() => {
            if (!this.nameWrapperScroll) {
              this.nameWrapperScroll = new BScroll(this.$refs.nameWrapper, {
                click: true
              })
            } else {
              this.nameWrapperScroll.refresh()
            }
          })
        },
        changeAreaName(name) {
          this.trueAreaName = name
          this.showSearch = false
          this.showAreaView = false
        },
        changeCartPosition(val) {
          this.$emit('changeCartPosition', val)
        },
        shoppingCartDataCS(val) {
          this.$emit('shoppingCartDataCS', val)
        },
        changeNewCinemaDataCS(val) {
          this.$emit('changeNewCinemaDataCS', val)
        }
      },
      components: {
        MovieDetail
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .movie
    .header
      /*height: 94px*/
      width: 100%
      font-size: 0
      .title
        height: 50px
        font-size: 20px
        text-align: center
        line-height: 50px
        background: #e54847
        color: white
      .select
        height: 44px
        display: flex
        font-size: 15px
        text-align: center
        line-height: 44px
        border-bottom: 1px solid #CCCCCC
        .place
          padding-left: 15px
          .icon
            font-size: 10px
        .switchHot
          flex: 1
          display: flex
          font-weight: 700
          color: #666
          overflow: hidden
          .hot
            flex: 1
            margin: 0 12px
            &.active
              color: #e54847
              border-bottom: 2px solid #e54847
          .coming
            flex: 1
            margin: 0 12px
            &.active
              color: #e54847
              border-bottom: 2px solid #e54847
        .search
          width: 20px
          height: 20px
          padding: 13px 15px 10px 10px
          font-size: 18px
          color: rgba(233,53,16,0.62)
    .searchView
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 100
      overflow: auto
      text-align: center
      background: white
      .header
        display: flex
        font-size: 15px
        height: 50px
        line-height: 50px
        text-align: center
        .searchInput
          flex: 1
          box-sizing: border-box
          padding: 15px 10px
          display: flex
          position: relative
          i
            margin-left: 5px
            position: absolute
            width: 20px
            height: 20px
            font-size: 16px
            line-height: 26px
          .input
            flex: 1
            background: #e5e5e5
            outline: none
            border-radius: 16px
            text-indent: 30px
            height: 20px
            line-height: 20px
        .cancel
          width: 50px
          flex: 0 0 50px
          font-size: 13px
          color: red
      .movieContent
        position: fixed
        overflow: hidden
        top: 50px
        width: 100%
        bottom: 0
        .movieItem
          padding: 10px
          display: flex
          width: 100%
          .img
            flex: 0 0 90px
            width: 90px
            height: 120px
          .desc
            flex: 1
            margin-left: 15px
            text-align: left
            .nameScore
              margin-bottom: 5px
              .name
                display: inline-block
                font-size: 15px
              .scorewrapper
                display: inline-block
                float: right
                margin-right: 20px
                font-size: 11px
                color: #666
                span
                  font-weight: 700
                  font-size: 13px
                  color: #faaf00
            .RealName, .category, .releaseTime
              margin-bottom: 15px
              font-size: 13px
              color: #999
  .selectArea
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1000
    overflow: auto
    text-align: center
    background: white
    .header
      display: flex
      font-size: 15px
      height: 50px
      line-height: 50px
      text-align: center
      background: red
      .icon
        font-size: 25px
        flex: 0 0 25px
        line-height: 50px
      .searchInput
        flex: 1
        box-sizing: border-box
        padding: 15px 10px
        display: flex
        position: relative
        margin-top: -3px
        i
          margin-left: 5px
          position: absolute
          width: 20px
          height: 20px
          font-size: 16px
          line-height: 26px
        .input
          flex: 1
          background: #e5e5e5
          outline: none
          border-radius: 16px
          text-indent: 30px
          height: 20px
          line-height: 20px
    .areaName
      position: fixed
      top: 50px
      overflow: hidden
      width: 100%
      bottom: 0
      .title
        padding-left: 14px
        height: 26px
        font-size: 12px
        line-height: 26px
        border-left: 2px solid #d9dde1
        background: #f3f5f7
        color: rgb(147,153,159)
        text-align: left
      .areaItem
        font-size: 15px
        text-align: left
        line-height: 30px
        padding-left: 15px
  .searchAreaDetail
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1000
    overflow: auto
    text-align: center
    background: white
    .header
      display: flex
      font-size: 15px
      height: 50px
      line-height: 50px
      text-align: center
      background: red
      .searchInput
        flex: 1
        box-sizing: border-box
        padding: 15px 10px
        display: flex
        position: relative
        margin-top: -3px
        i
          margin-left: 5px
          position: absolute
          width: 20px
          height: 20px
          font-size: 16px
          line-height: 26px
        .input
          flex: 1
          background: #e5e5e5
          outline: none
          border-radius: 16px
          text-indent: 30px
          height: 20px
          line-height: 20px
      .cancel
        width: 50px
        flex: 0 0 50px
        font-size: 13px
        color: white
    .nameWrapper
      position: fixed
      overflow: hidden
      top: 50px
      width: 100%
      bottom: 0
      .name
        font-size: 15px
        text-align: left
        line-height: 30px
        padding-left: 15px
</style>
