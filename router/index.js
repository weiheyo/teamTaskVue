import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import DataCharts from "../views/DataCharts";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
