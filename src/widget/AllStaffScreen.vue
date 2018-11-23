<template>
  <div class="allStaff">
    <div class="header">
      <i class="icon icon-close" @click="$emit('close')"></i>
      <span class="text">全体演职人员</span>
    </div>
    <div class="staffWrapper" ref="staffWrapper">
      <ul ref="ul">
        <li v-for="(item,index) in staffData" :key="index">
          <div class="title">{{index}}</div>
          <div class="name">{{item[0].name}}</div>
          <div class="img">
            <img :src="item[0].imgSrc" width="200px">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      props: ['staffData', 'flag'],
      watch: {
        flag(newValue, oldValue) {
          if (newValue === true) {
            this.move()
          }
        }
      },
      methods: {
        move() {
          console.log(this.flag)
          // if (this.flag) {
          this.$nextTick(() => {
            // console.log(this.$refs.ul.offsetHeight)
            // console.log(this.$refs.staffWrapper.offsetHeight)
            if (!this.staffWrapperScroll) {
              this.staffWrapperScroll = new BScroll(this.$refs.staffWrapper, {
                click: true
              })
            } else {
              console.log('refresh')
              this.staffWrapperScroll.refresh()
            }
          })
        }
      }
      // }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .allStaff
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
    .staffWrapper
      position: fixed
      top: 50px
      overflow: hidden
      bottom: 0px
      width: 100%
      background: white
      ul
        width: 100%
        text-align: center
        .title
          width: 100%
          background: #e5e5e5
          height: 50px
          font-size: 20px
          line-height: 50px
        .name
          margin: 10px 50px
          font-size: 15px
          height: 30px
          line-height: 30px
          /*background: #ffc1cc*/
        .img
          margin-bottom: 10px
</style>
