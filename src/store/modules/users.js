import ApiService from "@/common/api.service";

import {
  FETCH_USERS,
  CREATE_USER,
  UPDATE_USER,
  DESTROY_USER,
  CREATE_ALERT
} from "../actions.type";

import { SET_USERS, SET_USER, ADD_USER, REMOVE_USER } from "../mutations.type";

const state = {
  users: [],
  new_user: {
    name: "",
    email: "",
    group_id: "",
    role: ""
  }
};

const getters = {
  users(state) {
    return state.users;
  },
  students(state) {
    return state.users.filter(u => u.role == "student");
  },
  guardians(state) {
    return state.users.filter(u => u.role == "guardian");
  },
  teachers(state) {
    return state.users.filter(u => u.role == "teacher");
  }
};

const actions = {
  async [FETCH_USERS]({ commit }) {
    const { data } = await ApiService.query(`/users`);
    commit(SET_USERS, data);
  },
  async [CREATE_USER]({ commit, dispatch }, params) {
    const { data } = await ApiService.post(`/users`, { user: params });
    commit(ADD_USER, data);
    dispatch(CREATE_ALERT, ["User added", "success"]);
  },
  async [UPDATE_USER]({ commit, dispatch }, params) {
    const { data } = await ApiService.update(`/users`, params.id, {
      user: params
    });
    commit(SET_USER, data);
    dispatch(CREATE_ALERT, ["User updated", "success"]);
  },
  async [DESTROY_USER]({ commit, dispatch }, user_id) {
    await ApiService.delete(`/users`, user_id);
    commit(REMOVE_USER, user_id);
    dispatch(CREATE_ALERT, ["User deleted", "success"]);
  }
};

const mutations = {
  [SET_USERS](state, users) {
    state.users = users;
  },
  [SET_USER](state, user) {
    let idx = state.users.findIndex(u => u.id == user.id);
    state.users.splice(idx, 1, user);
  },
  [ADD_USER](state, user) {
    state.users.push(user || { ...state.new_user });
  },
  [REMOVE_USER](state, user_id) {
    state.users = state.users.filter(u => u.id != user_id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
