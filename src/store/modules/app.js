const state = {
  sidebar: true,
  visibleColumn: '0' // 0 for left or 1 for right
}

const getters = {
  sidebar(state) {
    return state.sidebar
  },
  visibleColumn(state) {
    return state.visibleColumn
  }
}

const actions = {
  toggleSidebar({ commit, getters }) {
    commit('toggleSidebar', !getters.sidebar)
  }
}

const mutations = {
  toggleSidebar(state, open) {
    state.sidebar = open
  },
  setVisibleColumn(state, column) {
    column = column || 'left'
    state.visibleColumn = column
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
