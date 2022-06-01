import Vue from "vue"
import VueRouter from "vue-router"

import Dashboard from "./views/Dashboard"
import Landing from "./views/Landing"
import Login from "./views/Login"
import Logout from "./views/Logout"
import Register from "./views/Register"
import Profile from "./views/Profile"
import PageNotFound from "./views/PageNotFound"
import MainNavbar from "./layout/MainNavbar"
import MainFooter from "./layout/MainFooter"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    components: { default: Login, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 }
    }
  },
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
    path: "/register",
    name: "register",
    components: { default: Register, header: '', footer: MainFooter },
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
  },
  {
    path: "/dashboard/:username",
    name: "user-dashboard",
    components: { default: Dashboard, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    }
  },
  // 404
  {
    path: '/:catchAll(.*)',
    name: 'paeg-not-found',
    components: { default: PageNotFound, header: MainNavbar, footer: MainFooter },
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
