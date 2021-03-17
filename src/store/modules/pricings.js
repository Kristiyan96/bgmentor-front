const state = {
  pricings: [],
  profile: {},
  newPricing: {
    minutes: null,
    price: null
  }
}

const getters = {
  pricings(state) {
    return state.pricings
  },
  newPricing(state) {
    return state.newPricing
  }
}

const actions = {
  fetchPricings({ commit }) {
    return new Promise((resolve, reject) => {
      this._vm.$http.roled.get(`pricings`).then(
        ({ data }) => {
          commit('setPricings', data)
          resolve(data)
        },
        (error) => {
          reject(error)
        }
      )
    })
  },
  async createPricing({ commit, dispatch }, params) {
    const { data } = await this._vm.$http.roled.post(`pricings`, {
      student: params
    })
    commit('addPricing', data)
    dispatch('createAlert', ['Pricing added', 'success'])
  },
  async updatePricing({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      this._vm.$http.roled
        .put(`/pricings`, params.id, {
          pricing: params
        })
        .then(
          ({ data }) => {
            commit('setPricing', data)
            dispatch('createAlert', ['Pricing updated', 'success'])
            resolve(data)
          },
          (error) => {
            reject(error)
          }
        )
    })
  },
  async destroyPricing({ commit, dispatch }, pricingId) {
    await this._vm.$http.roled.delete(`/pricings`, pricingId)
    commit('removePricing', pricingId)
    dispatch('createAlert', ['Pricing deleted', 'success'])
  }
}

const mutations = {
  setPricings(state, users) {
    state.users = users
  },
  setPricing(state, user) {
    let idx = state.users.findIndex((u) => u.id === user.id)
    state.users.splice(idx, 1, user)
  },
  addPricing(state, user) {
    state.users.push(user || { ...state.new_user })
  },
  removePricing(state, userId) {
    state.users = state.users.filter((u) => u.id !== userId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
