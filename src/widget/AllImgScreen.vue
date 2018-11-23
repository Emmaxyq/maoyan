<template>
    <div class="allImg">
      <div class="header">
        <i class="icon icon-close" @click="$emit('close')"></i>
        <span class="text">所有图片</span>
      </div>
      <div class="imgWrapper" ref="imgWrapper">
        <ul ref="ul">
          <li @click="showBigImg(img)" v-for="(img,index) in imgData" :key="index">
            <img :src="img" width="70px" height="70px">
          </li>
        </ul>
      </div>
      <div @click="closeBigImg" v-show="showImg" class="bigImg" ref="bigImg">
        <img :src="bigPic">
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      props: ['imgData', 'flag'],
      data() {
        return {
          bigPic: '',
          showImg: false
        }
      },
      watch: {
        flag(newValue, oldValue) {
          if (newValue === true) {
            this.move()
          }
        }
      },
      methods: {
        showBigImg(src) {
          this.showImg = true
          this.bigPic = src
        },
        closeBigImg() {
          this.showImg = false
        },
        move() {
          // console.log(this.flag)
          if (this.flag) {
            this.$nextTick(() => {
              // console.log(555)
              // console.log(this.$refs.ul.offsetHeight)
              // console.log(this.$refs.imgWrapper.offsetHeight)
              if (!this.imgWrapperScroll) {
                this.imgWrapperScroll = new BScroll(this.$refs.imgWrapper, {
                  click: true
                })
              } else {
                this.imgWrapperScroll.refresh()
              }
            })
          }
        }
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .allImg
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1000
    overflow: auto
    text-align: center
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
    .imgWrapper
      position: fixed
      top: 50px
      overflow: hidden
      bottom: 0px
      background: #333
      ul
        text-align: left
        li
          width: 23%
          margin: 3px 3px
          display: inline-block
    .bigImg
      position: fixed
      top: 0
      left: 0
      bottom: 0px
      width: 100%
      z-index: 200
      background: black
      overflow-y: auto
      img
        width: 100%
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: auto
</style>
