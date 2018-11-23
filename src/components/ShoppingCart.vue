<template>
      <div class="shopping" @click="showsth">
        <div class="icon icon-shopping_cart">
          <div class="num">{{totalCountFood}}</div>
        </div>
        <div class="ballwrapper">
          <transition-group
            @before-enter="beforeDrop"
            @enter="dropActive">
            <div class="ball" :data-index="index" v-show="ball.show" v-for="(ball,index) in balls" :key="index">
              <span class="inball"></span>
            </div>
          </transition-group>
        </div>
      </div>
</template>

<script>
    export default {
      props: ['shoppingCartData'],
      data() {
        return {
          balls: [
            {show: false},
            {show: false},
            {show: false},
            {show: false},
            {show: false}
          ],
          itemList: [],
          totalCountFood: 0
        }
      },
      watch: {
        shoppingCartData: {
          handler (newValue, oldValue) {
            this.totalCountFood = 0
            console.log(newValue)
            console.log(newValue.target)
            if (newValue.target) {
              console.log(newValue.target)
              this.drop(newValue.target, newValue.ticket)
            } else {
              console.log(newValue.target)
            }
            // console.log('11111111111')
            for (let i = 0; i < newValue.selectFoods.length; i++) {
              this.totalCountFood += newValue.selectFoods[i].count
            }
          },
          deep: true
        }
      },
      methods: {
        drop(el, isTicket) {
          console.log('dropdrop')
          for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i]
            if (!ball.show) {
              ball.show = true
              ball.el = el
              ball.isTicket = isTicket
              break
            }
          }
          console.log(this.balls)
        },
        beforeDrop(el) {
          console.log(el)
          let index = parseInt(el.getAttribute('data-index'))
          console.log(index)
          let ball = this.balls[index]
          let target = ball.el
          let ticket = ball.isTicket
          let react = target.getBoundingClientRect() // 获取元素相对页面视口的距离
          console.log(react)
          let y, x
          if (!ticket) {
            y = -parseInt(react.top) - 92
            x = -react.right - 92 - 32
          } else if (ticket) {
            y = -parseInt(react.top)
            x = 0
          }
          console.log(y)
          console.log(el.style.transform)
          el.style.transform = `translateY(${y}px)`
          console.log(el.style.transform)
          console.log(x)
          let inball = el.getElementsByClassName('inball')[0]
          console.log(inball)
          inball.style.transform = `translateX(${x}px)`
        },
        dropActive(el, done) {
            this.$nextTick(() => {
              el.style.transform = 'translateY(0px)'
              let inball = el.getElementsByClassName('inball')[0]
              inball.style.transform = 'translateX(0px)'
              el.addEventListener('transitionend', () => {
                console.log('end')
                done()
                let index = parseInt(el.getAttribute('data-index'))
                let ball = this.balls[index]
                ball.show = false
                el.style.display = 'none'
              })
            })
        },
        showsth() {
          this.$emit('showShopCarView')
        }
      }
    }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .shopping
    .icon
      height: 30px
      line-height: 30px
      width: 30px
      font-size: 20px
      .num
        position: absolute
        right: -9px
        top: -10px
        width: 24px
        text-align: center
        font-size: 10px
        font-weight: 700
        line-height: 16px
        border-radius: 12px
        background: rgb(179, 20, 20)
        color: #fff
    .ballwrapper
      font-size: 0
      .ball
        position: fixed
        right: 0
        top: 30px
        width: 100%
        height: 16px
        z-index: 25
        transition: all .5s cubic-bezier(0.1,-0.2,0.5,0)
        .inball
          position: absolute
          display: inline-block
          right: 23px
          height: 16px
          width: 16px
          border-radius: 50%
          background: rgb(240,20,20)
          transition: all .5s linear
</style>
