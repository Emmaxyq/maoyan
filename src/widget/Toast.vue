<template>
    <div class="toastWrapper" @click="$emit('close')">
      <div class="toastTip" v-if="!msg">请先登录！</div>
      <div class="toastTip" v-if="msg">{{msg}}</div>
    </div>
</template>

<script>
    export default {
      props: ['msg']
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .toastWrapper
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 100
    overflow: auto
    background: rgba(7,17,27,0.8)
    text-align: center
    backdrop-filter: blur(10px)
    -webkit-backdrop-filter: blur(10px)
    .toastTip
      position: absolute
      width: 100px
      height: 50px
      top: 0
      left: 0
      bottom: 0
      right: 0
      margin: auto
      text-align: center
      line-height: 50px
      background: lightgrey
      border-radius: 6px
</style>
