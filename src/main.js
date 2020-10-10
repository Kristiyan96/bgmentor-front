import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApiService from "./common/api.service";
import { CHECK_AUTH } from "@/store/actions.type";

import vuetify from "./plugins/vuetify";
import i18n from "./plugins/vue-i18n";
import GAuth from "vue-google-oauth2";
import VueGtag from "vue-gtag";

import Vue2Filters from "vue2-filters";
import vSelect from "vue-select";
import vueSmoothScroll from "vue2-smooth-scroll";
import underscore from "vue-underscore";
import VueMoment from "vue-moment";
import moment from "moment-timezone";
import VueDeviceDetector from "vue-device-detector";
import vClickOutside from "v-click-outside";
import VueFbCustomerChat from "vue-fb-customer-chat";

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
  faChalkboard,
  faCog,
  faShieldAlt,
  faAt,
  faKey
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
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
  faChalkboard,
  faGoogle,
  faCog,
  faShieldAlt,
  faAt,
  faKey
});
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(GAuth, {
  clientId:
    "416415299078-04rm7eih4dufkukuhbfcd3v772ol95a1.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account"
});
Vue.use(VueGtag, {
  config: {
    id:
      "416415299078-04rm7eih4dufkukuhbfcd3v772ol95a1.apps.googleusercontent.com"
  }
});
Vue.use(Vue2Filters);
Vue.use(require("vue-cookies"));
Vue.use(VueDeviceDetector);
Vue.use(VueMoment, {
  moment
});
Vue.use(vueSmoothScroll);
Vue.use(underscore);
Vue.use(vClickOutside);
// Vue.use(VueFbCustomerChat, {
//   page_id: 102719431149645, //  change 'null' to your Facebook Page ID,
//   theme_color: "#1976d2", // theme color in HEX
//   locale: "en_US" // default 'en_US'
// });
Vue.component("v-select", vSelect);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.prototype.moment = moment;
Vue.config.productionTip = false;
ApiService.init();

// check auth if required
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    Promise.all([store.dispatch(CHECK_AUTH)], true).then(next);
  } else {
    Promise.all([store.dispatch(CHECK_AUTH)], false);
    next();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let v = new Vue({
    router,
    render: h => h(App),
    vuetify,
    i18n,
    store
  });
  global.vm = v; //Define you app variable globally
  v.$mount("#app");
});
