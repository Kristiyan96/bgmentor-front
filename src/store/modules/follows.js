const state = {
  follows: [],
  new_folow: {
    name: '',
    followee_id: '',
    phone_number: ''
  }
}

const getters = {
  follows(state) {
    return state.follows
  },
  newFollow(state) {
    return state.new_follow
  }
}

const actions = {
  async fetchFollows({ commit }) {
    const { data } = await this._vm.$http.roled.get(`follows`)
    commit('setFollows', data)
  },
  async createFollow({ commit, dispatch }, params) {
    const { data } = await this._vm.$http.roled.post(`follows`, {
      follow: params
    })
    commit('addFollow', data)
    dispatch('createAlert', ['Follow added', 'success'])
  },
  async updateFollow({ commit, dispatch }, params) {
    const pick = (...props) => (o) =>
      props.reduce((a, e) => ({ ...a, [e]: o[e] }), {})

    return new Promise((resolve, reject) => {
      this._vm.$http.roled
        .put(`follows/${params.id}`, {
          follow: pick('followee_id', 'name')(params)
        })
        .then(
          ({ data }) => {
            commit('setFollow', data)
            dispatch('createAlert', ['Follow updated', 'success'])
            resolve(data)
          },
          (error) => {
            reject(error)
          }
        )
    })
  },
  async destroyFollow({ commit, dispatch }, followId) {
    await this._vm.$http.roled.delete(`/follows`, followId)
    commit('removeFollow', followId)
    dispatch('createAlert', ['Follow deleted', 'success'])
  }
}

const mutations = {
  setFollows(state, follows) {
    state.follows = follows
  },
  setFollow(state, follow) {
    let idx = state.follows.findIndex((u) => u.id === follow.id)
    state.follows.splice(idx, 1, follow)
  },
  addFollow(state, follow) {
    state.follows.push(follow || { ...state.new_follow })
  },
  removeFollow(state, followId) {
    state.follows = state.follows.filter((f) => f.id !== followId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
