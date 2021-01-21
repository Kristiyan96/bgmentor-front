import Vue from "vue";
import App from "./App";
import router from "./router.js";
import store from "./store/index";
import VueAxios from "vue-axios";
import {
  roledAxiosInstance,
  securedAxiosInstance,
  plainAxiosInstance
} from "./backend/axios";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/vue-i18n";
import VueMobileDetection from "vue-mobile-detection";
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
  faKey,
  faSms,
  faStar,
  faHistory
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "material-design-icons-iconfont/dist/material-design-icons.css";
Vue.use(require("vue-moment"));
Vue.use(VueMobileDetection);
Vue.use(VueAxios, {
  roled: roledAxiosInstance,
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
});

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
  faKey,
  faSms,
  faStar,
  faHistory
});
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

document.addEventListener("DOMContentLoaded", () => {
  let v = new Vue({
    router,
    store,
    vuetify,
    i18n,
    roledAxiosInstance,
    securedAxiosInstance,
    plainAxiosInstance,
    render: h => h(App)
  });
  global.vm = v; // Define you app variable globally
  v.$mount("#app");
});
