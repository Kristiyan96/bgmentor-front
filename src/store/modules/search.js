import router from '@/router.js'

const state = {
  results: [],
  filters: []
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
      this._vm.$http.plain
        .post('/users', { search: { ...getters.filters, ...params } })
        .then((response) => {
          commit('setResults', response.data.results)
          router.push('')
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
  updateParams(state) {
    return true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
