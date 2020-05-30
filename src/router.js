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
      component: () => import("@/views/Accounts/Login")
    },
    {
      path: "/register",
      name: "Register",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Accounts/Signup")
    },
    {
      path: "/confirm_email/:key",
      name: "Confirmation",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Accounts/ConfirmEmail")
    },
    {
      path: "/forgot_password",
      name: "ForgotPassword",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Accounts/ForgotPassword")
    },
    {
      path: "/password/:token",
      name: "ResetPassword",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Accounts/ResetPassword")
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
      path: "/payments",
      name: "Payments",
      meta: { requiresAuth: true },
      component: () => import("@/views/Payments/Payments")
    },
    {
      path: "/pricing",
      name: "Pricing",
      meta: { requiresAuth: true },
      component: () => import("@/views/Pricing/Pricings")
    },
    {
      path: "/interests",
      name: "Interests",
      meta: { requiresAuth: true },
      component: () => import("@/views/Users/Interests")
    },
    {
      path: "/groups",
      name: "Groups",
      meta: { requiresAuth: true },
      component: () => import("@/views/Groups/Groups")
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
      component: () => import("@/views/Accounts/Users")
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
      component: () => import("@/views/Bugs/Bugs")
    },
    {
      path: "/locations",
      name: "Locations",
      meta: { requiresAuth: true },
      component: () => import("@/views/Locations/Locations")
    },
    {
      path: "/profile",
      name: "Profile",
      meta: { requiresAuth: true },
      component: () => import("@/views/Accounts/Settings/Profile"),
      children: [
        {
          path: "general",
          component: () => import("@/views/Accounts/Settings/General"),
        },
        {
          path: "security",
          component: () => import("@/views/Accounts/Settings/Security"),
        },
        {
          path: "notifications",
          component: () => import("@/views/Accounts/Settings/Notifications"),
        },
      ]
    },
    {
      path: "/profiles/:id",
      name: "Profile",
      meta: { requiresAuth: true, layout: "no-sidebar" },
      component: () => import("@/views/Users/Profile")
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
