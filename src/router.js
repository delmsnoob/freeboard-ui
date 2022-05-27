import Vue from "vue"
import VueRouter from "vue-router"

import Dashboard from "./views/Dashboard"
import Landing from "./views/Landing"
import Login from "./views/Login"
import Profile from "./views/Profile"
import MainNavbar from "./layout/MainNavbar"
import MainFooter from "./layout/MainFooter"

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    components: { default: Dashboard, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    }
  },
  {
    path: "/landing",
    name: "landing",
    components: { default: Landing, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    }
  },
  {
    path: "/login",
    name: "login",
    components: { default: Login, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 }
    }
  },
  {
    path: "/profile",
    name: "profile",
    components: { default: Profile, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    }
  }
]

const router = new VueRouter({ 
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
