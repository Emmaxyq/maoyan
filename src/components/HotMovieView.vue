<template>
  <div>
    <div class="hotWrapper" ref="hotmovie">
      <div>
        <div class="movieWrapper" v-for="(item,index) in newMovieData" :key="index">
          <Movie @showDetail="showMovieDetail(item)" :moviedata="item"></Movie>
        </div>
        <div class="foot">已到达底部</div>
      </div>
    </div>
    <MovieDetail :isLogin="isLogin" @changeNewCinemaDataCS="changeNewCinemaDataCS" @shoppingCartDataCS="shoppingCartDataCS" @changeCartPosition="changeCartPosition" :newMovieData="newMovieData" :newMovieComingData="newMovieComingData" :selectFoodsApp="selectFoodsApp" :hasPayment="hasPayment" :newCinemaData="newCinemaData" @closeDetail="closeMovieDetail" v-if="showMovieD" :movieDetailData="movieDetailData"></MovieDetail>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Movie from '../widget/Movie'
  import MovieDetail from '../widget/MovieDetail'
    export default {
      props: ['isLogin', 'newMovieData', 'newCinemaData', 'newMovieComingData', 'selectFoodsApp', 'hasPayment'],
      data() {
        return {
          movieDetailData: {},
          showMovieD: false
        }
      },
      components: {
        Movie,
        MovieDetail
      },
      mounted() {
        this.$nextTick(() => {
          this.hotmovieScroll = new BScroll(this.$refs.hotmovie, {
            click: true
          })
        })
      },
      methods: {
        showMovieDetail(moviedata) {
          // console.log(1234567)
          // console.log(this.showMovieD)
          this.showMovieD = true
          // console.log(this.showMovieD)
          // console.log(moviedata)
          this.movieDetailData = moviedata
        },
        closeMovieDetail() {
          this.showMovieD = false
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
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .hotWrapper
    position: fixed
    top: 94px
    bottom: 70px
    overflow: hidden
    .movieWrapper
      padding: 5px 15px
      /*height: 114px*/
    .foot
      background: #CCCCCC
      width: 100%
      text-align: center
</style>
