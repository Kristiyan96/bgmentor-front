const state = {
  users: [],
  profile: {},
  new_user: {
    name: '',
    email: '',
    phone_number: ''
  }
}

const getters = {
  users(state) {
    return state.users
  },
  profile(state) {
    return state.profile
  },
  students(state) {
    return state.users.filter((u) => u.role === 'student')
  },
  teachers(state) {
    return state.users.filter((u) => u.role === 'teacher')
  }
}

const actions = {
  fetchProfile({ commit }, userId) {
    return new Promise((resolve, reject) => {
      this._vm.$http.plain.get(`profile/${userId}`).then(
        ({ data }) => {
          commit('setProfile', data)
          resolve(data)
        },
        (error) => {
          reject(error)
        }
      )
    })
  },
  async fetchUsers({ commit }) {
    const { data } = await this._vm.$http.roled.get(`users`)
    commit('setUsers', data)
  },
  async createUser({ commit, dispatch }, params) {
    const { data } = await this._vm.$http.roled.post(`users`, {
      student: params
    })
    commit('addUser', data)
    dispatch('createAlert', ['User added', 'success'])
  },
  async updateUser({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      this._vm.$http.roled
        .put(`/users`, params.id, {
          user: params
        })
        .then(
          ({ data }) => {
            commit('setUser', data)
            dispatch('createAlert', ['User updated', 'success'])
            resolve(data)
          },
          (error) => {
            reject(error)
          }
        )
    })
  },
  async destroyUser({ commit, dispatch }, userId) {
    await this._vm.$http.roled.delete(`/users`, userId)
    commit('removeUser', userId)
    dispatch('createAlert', ['User deleted', 'success'])
  }
}

const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  setUser(state, user) {
    let idx = state.users.findIndex((u) => u.id === user.id)
    state.users.splice(idx, 1, user)
  },
  addUser(state, user) {
    state.users.push(user || { ...state.new_user })
  },
  removeUser(state, userId) {
    state.users = state.users.filter((u) => u.id !== userId)
  },
  setProfile(state, profile) {
    state.profile = profile
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
