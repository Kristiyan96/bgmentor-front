import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";
import { API_URL } from "@/common/config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    Vue.axios.defaults.headers.common["Authorization"] = JwtService.getToken();
  },

  query(resource, params) {
    return Vue.axios.get(resource, { params: params }).catch(error => {
      UserService.checkAuth();
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      UserService.checkAuth();
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource, slug) {
    return Vue.axios.delete(`${resource}/${slug ? slug : ""}`).catch(error => {
      UserService.checkAuth();
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const UserService = {
  update(params) {
    return ApiService.put("profile/update", { user: params });
  },
  checkAuth() {
    ApiService.get("profile")
      .then(response => {
        if (response.data == null) {
          // commit(PURGE_AUTH);
          // router.push("/login");
          // dispatch(CREATE_ALERT, ["Моля, първо влезте в акаунта си."]);
        } else {
          // commit(SET_AUTH, [
          //   response.config.headers.Authorization,
          //   response.data
          // ]);
        }
      })
      .catch(response => {
        // commit(PURGE_AUTH);
        // commit(SET_ERROR, response.data.errors);
        // router.push("/login");
        // dispatch(CREATE_ALERT, ["Моля, първо влезте в акаунта си."]);
      });
  }
};
