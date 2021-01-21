const state = {
  sidebar: true,
  visibleColumn: "0" // 0 for left or 1 for right
};

const getters = {
  sidebar(state) {
    return state.sidebar;
  },
  visibleColumn(state) {
    return state.visibleColumn;
  }
};

const actions = {};

const mutations = {
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  },
  setVisibleColumn(state, column) {
    column = column || "left";
    state.visibleColumn = column;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};