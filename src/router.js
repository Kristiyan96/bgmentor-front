import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let router = new Router({
  mode: "history",
  linkExactActiveClass: "active",
  linkActiveClass: "active",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      meta: { layout: "no-sidebar" },
      component: require("@/views/Guest/Landing").default
    },
    {
      path: "/login",
      name: "Login",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/User/Login")
    },
    {
      path: "/register",
      name: "Register",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/User/Signup")
    },
    {
      path: "/confirm_email/:key",
      name: "Confirmation",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/User/ConfirmEmail")
    },
    {
      path: "/password",
      name: "ResetPassword",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/User/ResetPassword")
    },
    {
      path: "/terms",
      name: "Terms",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Guest/Terms")
    },
    {
      path: "/privacy",
      name: "Privacy",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Guest/Privacy")
    },
    {
      path: "/частно-или-групово",
      name: "Частно или Групово",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Guest/Blog/PrivateVsGroup")
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("@/views/User/Home")
    },
    {
      path: "/reports",
      name: "Reports",
      component: () => import("@/views/User/Reports")
    },
    {
      path: "/billing",
      name: "Billing",
      component: () => import("@/views/User/Billing")
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;
