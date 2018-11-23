<template>
  <div class="movieWrapperin" @click="$emit('showDetail')"><!-- @click="toRoute(moviedata)"-->
      <div class="movie-item">
        <div class="img">
          <img :src="moviedata.movieSrc" height="90px" width="60px">
        </div>
        <div class="desc">
          <h2 class="title">{{moviedata.movieName}}</h2>
          <div class="scorewrapper" v-if="moviedata.sc != 0">猫眼评分&nbsp;<span>{{moviedata.sc}}</span></div>
          <div class="scorewrapper" v-if="moviedata.sc == 0"><span>{{moviedata.wish}}</span>&nbsp;人想看</div>
          <div class="actor">主演：{{moviedata.star}}</div>
          <div class="time">{{moviedata.releaseTime}}</div>
        </div>
        <div class="btnWrapper">
          <div class="btn">购票</div>
        </div>
      </div>
  </div>
</template>

<script>
  import MovieDetail from './MovieDetail'
    export default {
      props: ['moviedata'],
      components: {
        MovieDetail
      },
      methods: {
        toRoute(content) {
          // console.log(this.$router)
          this.$router.push({name: 'MovieDetail', params: {detailData: content}})
        }
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .movieWrapperin
    border-bottom: 1px solid #ccc
    padding-bottom: 4px
    .movie-item
      width: 100%
      display: flex
      position: relative
      .img
        width: 60px
        height: 90px
        margin-top: 12px
        flex: 0 0 60px
      .desc
        flex: 1
        padding: 12px 5px 12px 5px
        .title
          font-size: 17px
          color: #333
          font-weight: 700
          padding-right: 5px
          margin-bottom: 7px
        .scorewrapper
          font-size: 13px
          color: #666
          span
            font-weight: 700
            font-size: 15px
            color: #faaf00
        .actor, .time
          font-size: 13px
          color: #666
          margin-top: 6px
          line-height: 15px
      .btnWrapper
        float: right
        font-size: 12px
        height: 27px
        margin: auto
        .btn
          width: 47px
          height: 27px
          line-height: 28px
          text-align: center
          box-sizing: border-box
          background-color: #f03d37
          color: #fff
          border-radius: 4px
          font-size: 12px
</style>
