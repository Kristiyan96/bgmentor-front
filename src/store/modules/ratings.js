const state = {
  ratings: []
}

const getters = {
  ratings(state) {
    return state.ratings
  }
}

const actions = {
  async createRating({ commit, dispatch }, params) {
    await this._vm.$http.secured.post(`/users/${params.recipient_id}/ratings`, {
      rating: params
    })
    dispatch('createAlert', ['Rating added', 'success'])
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
