import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import CinemaRouter from './cinema'
import MineRouter from './mine'

Vue.use(VueRouter)

const routes = [
  movieRouter,
  CinemaRouter,
  MineRouter,
  {
    path: '/*',
    redirect: '/movie'
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'maoyan',
  routes
})

export default router
