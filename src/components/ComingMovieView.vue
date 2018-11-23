<template>
  <div>
    <div class="comingWrapper" ref="comingmovie">
      <div>
        <div class="movieWrapper" v-for="(item,index) in newMovieComingData" :key="index">
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
      props: ['isLogin', 'newCinemaData', 'newMovieData', 'newMovieComingData', 'selectFoodsApp', 'hasPayment'],
      components: {
        Movie,
        MovieDetail
      },
      data() {
        return {
          movieDetailData: {},
          showMovieD: false
        }
      },
      mounted() {
        this.$nextTick(() => {
          this.comingmovieScroll = new BScroll(this.$refs.comingmovie, {
            click: true
          })
        })
      },
      methods: {
        showMovieDetail(moviedata) {
          this.showMovieD = true
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
  .comingWrapper
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
