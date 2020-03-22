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
      name: "Landing",
      meta: { layout: "no-sidebar" },
      component: require("@/views/Landing/Landing").default
    },
    {
      path: "/login",
      name: "Login",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Users/Login")
    },
    {
      path: "/register",
      name: "Register",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Users/Signup")
    },
    {
      path: "/confirm_email/:key",
      name: "Confirmation",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Users/ConfirmEmail")
    },
    {
      path: "/forgot_password",
      name: "ForgotPassword",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Users/ForgotPassword")
    },
    {
      path: "/password",
      name: "ResetPassword",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Users/ResetPassword")
    },
    {
      path: "/terms",
      name: "Terms",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Landing/Terms")
    },
    {
      path: "/privacy",
      name: "Privacy",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Landing/Privacy")
    },
    {
      path: "/частно-или-групово",
      name: "Частно или Групово",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Landing/Blog/PrivateVsGroup")
    },
    {
      path: "/home",
      name: "Home",
      meta: { requiresAuth: true },
      component: () => import("@/views/User/Home")
    },
    {
      path: "/reports",
      name: "Reports",
      meta: { requiresAuth: true },
      component: () => import("@/views/User/Reports")
    },
    {
      path: "/payments",
      name: "Payments",
      meta: { requiresAuth: true },
      component: () => import("@/views/Payments/Payments")
    },
    {
      path: "/pricing",
      name: "Pricing",
      meta: { requiresAuth: true },
      component: () => import("@/views/Pricing/Pricing")
    },
    {
      path: "/interests",
      name: "Interests",
      meta: { requiresAuth: true },
      component: () => import("@/views/User/Interests")
    },
    {
      path: "/groups",
      name: "Groups",
      meta: { requiresAuth: true },
      component: () => import("@/views/Groups/Groups")
    },
    {
      path: "/groups/:id",
      name: "GroupHome",
      meta: { requiresAuth: true },
      component: () => import("@/views/Groups/Home/Dashboard")
    },
    {
      path: "/individuals",
      name: "Individials",
      meta: { requiresAuth: true },
      component: () => import("@/views/Groups/Individuals")
    },
    {
      path: "/users",
      name: "Users",
      meta: { requiresAuth: true },
      component: () => import("@/views/Users/Users")
    },
    {
      path: "/calendar",
      name: "Calendar",
      meta: { requiresAuth: true },
      component: () => import("@/views/Calendar/CalendarWrapper")
    },
    {
      path: "/bugs",
      name: "Bugs",
      meta: { requiresAuth: true },
      component: () => import("@/views/Bugs/BugsWrapper")
    },
    {
      path: "/locations",
      name: "Locations",
      meta: { requiresAuth: true },
      component: () => import("@/views/Locations/LocationsWrapper")
    },
    {
      path: "/profile",
      name: "Profile",
      meta: { requiresAuth: true},
      component: () => import("@/views/Users/Profile/Profile"),
      children: [
        {
          path: "general",
          component: () => import("@/views/Users/Profile/General"),
        },
        {
          path: "security",
          component: () => import("@/views/Users/Profile/Security"),
        },
        {
          path: "notifications",
          component: () => import("@/views/Users/Profile/Notifications"),
        },
      ]
    },
    {
      path: "/profiles/:id",
      name: "Profile",
      meta: { requiresAuth: true, layout: "no-sidebar"},
      component: () => import("@/views/User/Profile")
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
