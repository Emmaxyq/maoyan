<template>
    <div class="commentWrapper">
      <div class="starTime">
        <Star :score="Number(commentData[4])" size="36"></Star>
        <span class="time">{{commentData[3]}}</span>
      </div>
      <div class="commentContent">{{commentData[6]}}</div>
      <div class="commentUser">
        <div class="imgTou">
          <img :src="commentData[1]" width="25px" height="25px">
        </div>
        <div class="userName">{{commentData[2]}}</div>
        <div class="good">
          <i @click="goodChange" class="icon-thumb_up" :class="{active : goodZan}"></i>
          <span class="count">{{count}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  import Star from './Star'
    export default {
      props: ['commentData'],
      data() {
        return {
          goodZan: false,
          count: Number(this.commentData[5])
        }
      },
      methods: {
        goodChange() {
          this.goodZan = !this.goodZan
          if (this.goodZan) {
            this.count++
          } else {
            this.count--
          }
        }
      },
      components: {
        Star
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .commentWrapper
    margin-left: 15px
    padding: 6px 10px 6px 0
    border-top: 1px solid #e5e5e5
    .starTime
      .time
        font-size: 10px
        color: #999
    .commentContent
      margin: 10px 0
      font-size: 12px
      line-height: 16px
      color: #555
    .commentUser
      margin: 8px 0
      .imgTou
        display: inline-block
        width: 25px
        img
          border-radius: 50%
      .userName
        display: inline-block
        margin-left: 8px
        font-size: 10px
        color: #999
        vertical-align: super
      .good
        margin: 0 4px
        display: inline-block
        float: right
        font-size: 12px
        line-height: 30px
        .icon-thumb_up
          color: #999
          vertical-align: middle
          display: inline-block
          &.active
            color: #f50
</style>
