<template>
  <div id="app">
    <ShoppingCartView @hasPaymentList="hasPaymentList" :newCinemaData="newCinemaData" @changeShoppingCartData="changeShoppingCartData" :shoppingCartData="MshoppingCartData" @close="closeShopCarView" v-if="isShowShopCarView"></ShoppingCartView>
    <ShoppingCart @showShopCarView="showShopCarView" :class="{changePosition:isCinemaDetail}" :shoppingCartData="MshoppingCartData" class="cart"></ShoppingCart>
    <keep-alive>
      <router-view :isLogin="isLogin" :hasPayment="hasPayment" @showShopCarView="showShopCarView" :selectFoodsApp="selectFoodsApp" @changeNewCinemaDataCS="changeNewCinemaDataCS" @changeCartPosition="changeCartPositionMs" @shoppingCartDataCS="revShoppingCartDataCS" :newCinemaData="newCinemaData" @mainmovie="mainORmovie" @hotcoming="hotORcoming" :isHot="isHot" :isComing="isComing" :newMovieData="newMovieData" :newMovieComingData="newMovieComingData" @login-event="loginfunc" @logout-event="logoutfunc"></router-view>
    </keep-alive>
    <div class="footer">
      <div class="item-tab" :class="{'active': isMain}"  @click="toRouteMain">
        <i class="icon icon-home"></i>
        <span>首页</span>
      </div>
      <div class="item-tab" :class="{'active': isMovie}"  @click="toRouteMovie">
        <i class="icon icon-dice"></i>
        <span>电影</span>
      </div>
      <div class="item-tab" :class="{'active': isCinema}">
        <i class="icon icon-film"></i>
        <span  @click="toRouteCinema">影院</span>
      </div>
      <div class="item-tab" :class="{'active': isMine}">
        <i class="icon icon-smile"></i>
        <span  @click="toRouteMine">我的</span>
      </div>
    </div>
    <div class="loading" v-if="showLoadingFlag">
      <img src="./public/img/loading.jpg" width="80%"/>
    </div>
    <Toast @close="closeToast" v-show="showToast"></Toast>
  </div>
</template>

<script>
  import ShoppingCart from './components/ShoppingCart'
  import ShoppingCartView from './widget/ShoppingCartView'
  import Toast from './widget/Toast'
export default {
  name: 'App',
  data() {
    return {
      isLogin: false, //  判断是否显示登录页面
      isMain: true, //  判断是否显示主页面
      isMovie: false, //  判断是否显示电影页面
      isCinema: false, // 判断是否显示影院页面
      isMine: false, // 判断是否显示个人页面
      moviedata: [], // 存储请求第一个正在热映电影json文件返回的数据
      movieguandata: [], // 存储请求第二个正在热映电影json文件返回的数据
      newMovieData: [], // 存储前两个数据合并后的新的正在热映电影的数据
      moviecomingdata: [], // 存储请求第一个即将上映电影json文件返回的数据
      moviecomingguandata: [], // 存储请求第二个即将上映电影json文件返回的数据
      newMovieComingData: [], // 存储前两个数据合并后新的即将上映的数据
      isHot: true, // 判断电影页面是否显示为正在热映的组件
      isComing: false, // 判断电影页面是否显示为即将上映的组件
      showLoadingFlag: true, // 判断是否显示loading画面
      cinemaData: [], // 存储请求的第一个影院的json文件返回的数据
      cinemaId: [],
      cinemaDetailData: [], // 存储请求的第二个影院的json文件返回的数据
      newCinemaData: [], // 存储前两个数据合并后的新的影院的信息
      totalCountCart: 0,
      MshoppingCartData: {}, // 存储已选进购物车中的商品，以及当前要进行动画效果的元素
      isCinemaDetail: false, // 判断当前是否为电影详细页面，如果是则改变购物车的位置
      isShowShopCarView: false, // 判断是否显示购物车详情页面
      selectFoodsApp: [], // 存储已选进购物车中的商品，先设置为空
      hasPayment: [], // 存储已在购物车中购买的商品，先设置为空
      showToast: false // 是否显示 请先登录 的提示页面
    }
  },
  created() {
    setTimeout(() => {
      this.showLoadingFlag = false
    }, 2000)
    this.axios.get('/api/moviedata')
      .then(res => {
        res = res.data
        this.moviedata = res.data
        // console.log(this.moviedata)
      })
    setTimeout(() => {
      this.axios.get('/api/movieguandata')
        .then(res => {
          res = res.data
          this.movieguandata = res.data
          // console.log(this.movieguandata)
          for (let i = 0; i < this.moviedata.length; i++) {
            for (let j = 0; j < this.movieguandata.length; j++) {
              if (String(this.moviedata[i].id) === String(this.movieguandata[j].detailMovie.id)) {
                var obj = Object.assign(this.moviedata[i], this.movieguandata[j].detailMovie)
                this.newMovieData.push(obj)
              }
            }
          }
          console.log(this.newMovieData)
        })
    }, 500)

    this.axios.get('/api/moviecomingdata')
      .then(res => {
        res = res.data
        this.moviecomingdata = res.data
        console.log(this.moviecomingdata)
      })
    setTimeout(() => {
      this.axios.get('/api/moviecomingguandata')
        .then(res => {
          res = res.data
          this.moviecomingguandata = res.data
          // console.log(this.moviecomingguandata)
          // console.log(this.moviecomingdata)
          for (let i = 0; i < this.moviecomingdata.length; i++) {
            for (let j = 0; j < this.moviecomingguandata.length; j++) {
              if (String(this.moviecomingdata[i].id) === String(this.moviecomingguandata[j].detailMovie.id)) {
                var obj = Object.assign(this.moviecomingdata[i], this.moviecomingguandata[j].detailMovie)
                this.newMovieComingData.push(obj)
              }
            }
          }
          console.log(this.newMovieComingData)
        })
    }, 500)
    this.axios.get('/api/cinemadata')
      .then(res => {
        res = res.data
        this.cinemaData = res.data.cinemas
        console.log(this.cinemaData)
        for (let i = 0; i < this.cinemaData.length; i++) {
          this.cinemaId.push(this.cinemaData[i].id)
        }
        console.log(this.cinemaId)
      })
    setTimeout(() => {
      this.axios.get('/api/cinemadetaildata')
        .then(res => {
          res = res.data
          this.cinemaDetailData = res.data
          console.log(this.cinemaDetailData)
          console.log(this.cinemaData)
          for (let i = 0; i < this.cinemaData.length; i++) {
            for (let j = 0; j < this.cinemaDetailData.length; j++) {
              if (String(this.cinemaData[i].id) === String(this.cinemaDetailData[j].cinemaId)) {
                var obj = Object.assign(this.cinemaData[i], this.cinemaDetailData[j])
                this.newCinemaData.push(obj)
              }
            }
          }
          console.log(this.newCinemaData)
        })
    }, 500)
  },
  methods: {
    toRouteMain() {
      this.$router.push({name: 'Main'})
      this.isMain = true
      this.isMovie = false
      this.isCinema = false
      this.isMine = false
    },
    toRouteMovie() {
      this.$router.push({name: 'Movie'})
      this.isMain = false
      this.isMovie = true
      this.isCinema = false
      this.isMine = false
    },
    toRouteCinema() {
      this.$router.push({name: 'Cinema'})
      this.isMain = false
      this.isMovie = false
      this.isCinema = true
      this.isMine = false
    },
    toRouteMine() {
      console.log(this.isLogin)
      this.toRoute('Mine', {isLogin: this.isLogin})
      this.isMain = false
      this.isMovie = false
      this.isCinema = false
      this.isMine = true
    },
    toRoute(name, option) {
      // eslint-disable-next-line
      let params = option ? option : {}
      this.$router.push({name, params})
    },
    loginfunc() {
      this.isLogin = true
      console.log(this.isLogin)
      this.toRoute('Mine', {isLogin: this.isLogin})
    },
    logoutfunc() {
      this.isLogin = false
      console.log(this.isLogin)
      this.toRoute('Login')
    },
    hotORcoming(val) {
      this.isHot = val
      this.isComing = !val
    },
    mainORmovie(val) {
      this.isMain = val
      this.isMovie = !val
    },
    revShoppingCartDataCS(val) {
      this.MshoppingCartData = val
      this.selectFoodsApp = this.MshoppingCartData.selectFoods
      console.log(this.selectFoodsApp)
    },
    changeCartPositionMs(val) {
     this.isCinemaDetail = val
      console.log(this.isCinemaDetail)
    },
    showShopCarView() {
      if (!this.isLogin) {
        this.showToast = true
        return
      }
      console.log('eeeeeeeeeeeee')
      this.isShowShopCarView = true
    },
    closeShopCarView() {
      this.isShowShopCarView = false
    },
    changeShoppingCartData(val) {
      console.log(val)
      this.MshoppingCartData = val
      this.selectFoodsApp = this.MshoppingCartData.selectFoods
      console.log(this.selectFoodsApp)
    },
    changeNewCinemaDataCS(val) {
      this.newCinemaData = val
    },
    hasPaymentList(val) {
      this.hasPayment.push.apply(this.hasPayment, val)
      // this.hasPayment.push(val)
      console.log(this.hasPayment)
    },
    closeToast() {
      this.showToast = false
    }
  },
  components: {
    ShoppingCart,
    ShoppingCartView,
    Toast
  }
}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  #app
    .footer
      position: fixed
      bottom: 0
      left: 0
      display: flex
      height: 48px
      width: 100%
      border-bottom: 1px solid #ccc
      border-top: 1px solid #ccc
      text-align: center
      font-size: 0
      .item-tab
        font-size: 16px
        flex: 1
        line-height: 48px
        &.active
          color: rgb(240,20,20)
    .loading
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 1000
      overflow: auto
      background: white
      img
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 0
        margin: auto
    .cart
      position: absolute
      bottom: 30px
      right: 78px
      width: 30px
      height: 30px
      border-radius: 50%
      background: #e5e5e5
      text-align: center
    .changePosition
      z-index: 300
      position: absolute
      top: 17px
      right: 15px
      width: 30px
      height: 30px
      border-radius: 50%
      background: #e5e5e5
      text-align: center
</style>
