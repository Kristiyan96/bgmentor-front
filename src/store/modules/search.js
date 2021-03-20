import router from '@/router.js'

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
        .get('/users', { params: getters.filters })
        .then((response) => {
          commit('setResults', response.data)
          // router.push({ query: { params } })
          resolve(response.data)
        })
        .catch((error) => {
          commit('purgeAuth')
          reject(error)
        })
    })
  }
}

const mutations = {
  setResults(state, results) {
    state.results = results
  },
  updateParams(state) {
    return true
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
