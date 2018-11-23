<template>
    <div class="cinema">
      <div class="header">
        <span>影院</span>
      </div>
      <CinemaList :isLogin="isLogin" @changeNewCinemaDataCS="changeNewCinemaDataCS" @shoppingCartDataCS="shoppingCartDataCS" @changeCartPosition="changeCartPosition" :newCinemaData="newCinemaData" :newMovieData="newMovieData" :newMovieComingData="newMovieComingData" :selectFoodsApp="selectFoodsApp" :hasPayment="hasPayment"></CinemaList>
      </div>
</template>

<script>
  import CinemaList from '../widget/CinemaList'
    export default {
      props: ['isLogin', 'newCinemaData', 'newMovieData', 'newMovieComingData', 'selectFoodsApp', 'hasPayment'],
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
        CinemaList
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .cinema
    .header
      width: 100%
      font-size: 20px
      height: 50px
      line-height: 50px
      background: #e54847
      color: white
      text-align: center

</style>
