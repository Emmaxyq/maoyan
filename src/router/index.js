import Vue from 'vue'
import Router from 'vue-router'
import MainScreen from '../components/MainScreen'
import MovieScreen from '../components/MovieScreen'
import CinemaScreen from '../components/CinemaScreen'
import MineScreen from '../components/MineScreen'
import LoginScreen from '../components/LoginScreen'
import HotMovieView from '../components/HotMovieView'
import ComingMovieView from '../components/ComingMovieView'
import MovieDetail from '../widget/MovieDetail'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: MainScreen
    },
    {
      path: '/movie',
      name: 'Movie',
      component: MovieScreen,
      children: [
        {
          name: 'HotMovie',
          path: '/movie/hotmovie',
          component: HotMovieView
        },
        {
          name: 'ComingMovie',
          path: '/movie/comingmovie',
          component: ComingMovieView
        }
      ]
    },
    {
      path: '/cinema',
      name: 'Cinema',
      component: CinemaScreen
    },
    {
      path: '/discover',
      name: 'Mine',
      component: MineScreen
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginScreen
    },
    {
      path: '/moviedetail',
      name: 'MovieDetail',
      component: MovieDetail
    }
  ],
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  console.log(to.params.isLogin)
  if (to.path === '/discover' && !to.params.isLogin) {
    console.log(!to.params.isLogin)
    next('/login')
  } else {
    next()
  }
})

export default router
