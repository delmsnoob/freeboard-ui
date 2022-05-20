import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./views/Index.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    components: { default: Index, header: MainNavbar, footer: MainFooter },
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

const router = new VueRouter({ mode: 'history', routes: routes })

// new Vue({
//   router,
//   store
// }).$mount('App')

// export default new Router({
//   routes: [
//     // {
//     //   path: "/",
//     //   name: "index",
//     //   components: { default: Index, header: MainNavbar, footer: MainFooter },
//     //   props: {
//     //     header: { colorOnScroll: 400 },
//     //     footer: { backgroundColor: "black" }
//     //   }
//     // },
//     // {
//     //   path: "/landing",
//     //   name: "landing",
//     //   components: { default: Landing, header: MainNavbar, footer: MainFooter },
//     //   props: {
//     //     header: { colorOnScroll: 400 },
//     //     footer: { backgroundColor: "black" }
//     //   }
//     // },
//     // {
//     //   path: "/login",
//     //   name: "login",
//     //   components: { default: Login, header: MainNavbar, footer: MainFooter },
//     //   props: {
//     //     header: { colorOnScroll: 400 }
//     //   }
//     // },
//     // {
//     //   path: "/profile",
//     //   name: "profile",
//     //   components: { default: Profile, header: MainNavbar, footer: MainFooter },
//     //   props: {
//     //     header: { colorOnScroll: 400 },
//     //     footer: { backgroundColor: "black" }
//     //   }
//     // }
//   ],
//   scrollBehavior: to => {
//     if (to.hash) {
//       return { selector: to.hash };
//     } else {
//       return { x: 0, y: 0 };
//     }
//   }
// });
