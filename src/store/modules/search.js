const state = {
  results: [],
  filters: {}
}

const getters = {
  results(state) {
    return state.results
  },
  filters(state) {
    return state.filters
  }
}

const actions = {
  async performSearch({ commit, getters }, params) {
    return new Promise((resolve, reject) => {
      commit('updateFilters', params)
      this._vm.$http.plain
        .get('/profile', { params: getters.filters })
        .then((response) => {
          commit('setResults', response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const mutations = {
  setResults(state, results) {
    state.results = results
  },
  updateFilters(state, filters) {
    state.filters = { ...state.filters, ...filters }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
