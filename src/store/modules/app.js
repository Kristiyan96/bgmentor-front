import {
  TOGGLE_RESIZABLE,
  TOGGLE_SIDEBAR,
  TOGGLE_SIDEBARRIGHT
} from "../mutations.type";

const state = {
  resizable: false,
  sidebar: false,
  sidebarRight: false,
  colLeft: true,
  colRight: true
};

const getters = {
  resizable(state) {
    return state.resizable;
  },
  sidebar(state) {
    return state.sidebar;
  },
  sidebarRight(state) {
    return state.sidebarRight;
  },
  colLeft(state) {
    return state.colLeft;
  },
  colRight(state) {
    return state.colRight;
  }
};

const actions = {

};

const mutations = {
  [TOGGLE_RESIZABLE](state) {
    state.resizable = !state.resizable;
  },
  [TOGGLE_SIDEBAR](state) {
    state.sidebar = !state.sidebar;
  },
  [TOGGLE_SIDEBARRIGHT](state, open) {
    state.sidebarRight = open;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
