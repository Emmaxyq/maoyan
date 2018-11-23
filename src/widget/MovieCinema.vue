<template>
    <div class="movieCinema">
      <div class="header">
        <i class="icon icon-point-left" @click="$emit('close')"></i>
        <span class="text">{{movieDetailData.movieName}}</span>
      </div>
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
            <div class="background">
              <img :src="movieDetailData.movieSrc" width="380px" height="450px">
            </div>
            <div class="bgfilter"></div>
          </div>
      <div class="cinemaWrapper">
        <CinemaList :isLogin="isLogin" :movieCinemaList="movieCinemaList" @changeNewCinemaDataCS="changeNewCinemaDataCS" @shoppingCartDataCS="shoppingCartDataCS" @changeCartPosition="changeCartPosition" :newCinemaData="newCinemaData" :newMovieData="newMovieData" :newMovieComingData="newMovieComingData" :selectFoodsApp="selectFoodsApp" :hasPayment="hasPayment"></CinemaList>
      </div>
    </div>
</template>

<script>
  import Star from './Star'
  import CinemaList from './CinemaList'
    export default {
      props: ['isLogin', 'movieDetailData', 'newCinemaData', 'newMovieData', 'newMovieComingData', 'selectFoodsApp', 'hasPayment'],
      data() {
        return {
          movieCinemaList: []
        }
      },
      created() {
        console.log(this.selectFoodsApp)
        this.movieCinemaList = []
        console.log(this.newCinemaData)
        console.log(this.movieDetailData)
        for (let i = 0; i < this.newCinemaData.length; i++) {
          let movies = this.newCinemaData[i].showData.movies
          for (let j = 0; j < movies.length; j++) {
            if (movies[j].nm === this.movieDetailData.movieName) {
              this.movieCinemaList.push(this.newCinemaData[i])
            }
          }
        }
        console.log(this.movieCinemaList)
      },
      methods: {
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
        Star,
        CinemaList
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .movieCinema
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 200
    overflow: auto
    background: white
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
    .cinemaWrapper
      position: fixed
      left: 0
      width: 100%
      height: 500px
</style>
