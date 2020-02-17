import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApiService from "./common/api.service";
import { CHECK_AUTH } from "@/store/actions.type";

import vuetify from "./plugins/vuetify";

import Default from "@/layout/Default";
import NoSidebar from "@/layout/NoSidebar";

import Vue2Filters from "vue2-filters";
import vSelect from "vue-select";
import moment from "moment";
import vueSmoothScroll from "vue2-smooth-scroll";
import underscore from "vue-underscore";

import "@/assets/styles/table.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCheck,
  faColumns,
  faBell,
  faUser,
  faHome,
  faDollarSign,
  faFileAlt,
  faUserFriends,
  faArchive,
  faTrashAlt,
  faUsers,
  faEdit,
  faPlusSquare,
  faTimes,
  faCalendarAlt,
  faBug,
  faBuilding,
  faFilter,
  faChalkboard
} from "@fortawesome/free-solid-svg-icons";
library.add({
  faCheck,
  faColumns,
  faBell,
  faUser,
  faHome,
  faDollarSign,
  faFileAlt,
  faUserFriends,
  faArchive,
  faTrashAlt,
  faUsers,
  faEdit,
  faPlusSquare,
  faTimes,
  faCalendarAlt,
  faBug,
  faBuilding,
  faFilter,
  faChalkboard
});
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vue2Filters);
Vue.use(require("vue-cookies"));
Vue.use(require("vue-moment"));
Vue.use(vueSmoothScroll);
Vue.use(underscore);
Vue.component("v-select", vSelect);
Vue.component("default-layout", Default);
Vue.component("no-sidebar-layout", NoSidebar);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.prototype.moment = moment;
Vue.config.productionTip = false;
ApiService.init();

// check auth if required
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    Promise.all([store.dispatch(CHECK_AUTH)]).then(next);
  } else {
    next();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let v = new Vue({
    router,
    render: h => h(App),
    vuetify,
    store
  });
  global.vm = v; //Define you app variable globally
  v.$mount("#app");
});
