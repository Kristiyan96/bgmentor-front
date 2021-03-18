import router from '@/router.js'

const state = {
  user: null,
  csrf: null
}

const getters = {
  role(state) {
    return state.user ? state.user.role : 'student'
  },
  isAdmin(state) {
    return state.user && state.user.role === 'admin'
  },
  isTeacher(state) {
    return state.user && state.user.role === 'teacher'
  },
  isStudent(state) {
    return state.user && state.user.role === 'student'
  },
  currentUserId(state) {
    return state.user ? state.user.id : null
  },
  currentUser(state, getters) {
    return {
      ...state.user,
      isAdmin: getters.isAdmin,
      isTeacher: getters.isTeacher,
      isStudent: getters.isStudent
    }
  }
}

const actions = {
  fetchProfile({ commit }) {
    return new Promise((resolve, reject) => {
      this._vm.$http.secured
        .get('/me')
        .then((response) => {
          commit('setUser', response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateProfile({ commit, getters }, params) {
    return new Promise((resolve, reject) => {
      this._vm.$http.secured
        .put('/me', { user: { id: getters.currentUserId, ...params } })
        .then((response) => {
          commit('setUser', response.data)
          commit('setProfile', response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      this._vm.$http.plain
        .post('/signup', { user: user })
        .then((response) => {
          commit('setUser', response.data.user)
          commit('setAuth', response.data.csrf)
          router.push('verify')
          resolve(response.data)
        })
        .catch((error) => {
          commit('purgeAuth')
          reject(error)
        })
    })
  },
  logIn({ commit }, user) {
    return new Promise((resolve, reject) => {
      this._vm.$http.plain
        .post('/signin', user)
        .then((response) => {
          commit('setUser', response.data.user)
          commit('setAuth', response.data.csrf)
          router.push('me')
          resolve(response.data)
        })
        .catch((error) => {
          commit('purgeAuth')
          reject(error)
        })
    })
  },
  logOut({ commit }) {
    return new Promise((resolve, reject) => {
      this._vm.$http.secured
        .delete('/signin')
        .then((response) => {
          commit('setUser', null)
          commit('purgeAuth')
          router.push('')
          resolve(response.data)
        })
        .catch((error) => {
          commit('purgeAuth')
          reject(error)
        })
    })
  },
  verify({ commit }, token) {
    return new Promise((resolve, reject) => {
      this._vm.$http.secured
        .post('verify', { token: token })
        .then((response) => {
          commit('setUser', response.data)
          router.push('me')
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  resend_verify({ dispatch }) {
    return new Promise((resolve, reject) => {
      this._vm.$http.secured
        .post('resend_verify')
        .then((response) => {
          dispatch('createAlert', [
            'An SMS with a new verification was sent to you mobile phone.',
            'success'
          ])
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  send_password_reset({ dispatch }, email) {
    return new Promise((resolve, reject) => {
      this._vm.$http.plain
        .post('password_resets', { email: email })
        .then((response) => {
          dispatch('createAlert', [
            'A password reset link was sent to your email.',
            'success'
          ])
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const mutations = {
  setUser(state, user = null) {
    if (user) {
      state.signedIn = true
    }
    state.user = user
  },
  setAuth(state, csrf) {
    state.signedIn = true
    state.csrf = csrf
  },
  refreshAuth(state, csrf) {
    state.signedIn = true
    state.csrf = csrf
  },
  purgeAuth(state) {
    state.user = null
    state.signedIn = false
    state.csrf = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
