import {
  TOGGLE_RESIZABLE,
  TOGGLE_SIDEBAR,
  TOGGLE_SIDEBARRIGHT
} from "../mutations.type";

const state = {
  resizable: false,
  sidebar: false,
  sidebarRight: false,
};

const getters = {
  resizable(state) {
    return state.resizable;
  },
  sidebar(state, _, rootState) {
    return state.sidebar;
  },
  sidebarRight(state) {
    return state.sidebarRight;
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
