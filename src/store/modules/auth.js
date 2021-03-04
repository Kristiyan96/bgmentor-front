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
    return new Promise((resolve) => {
      this._vm.$http.secured
        .get('/me')
        .then((response) => {
          commit('setUser', response.data)
          resolve(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
  updateProfile({ commit }, user) {
    return new Promise((resolve) => {
      this._vm.$http.secured
        .put('/me', { user: user })
        .then((response) => {
          commit('setUser', response.data)
          resolve(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
  register({ commit }, user) {
    return new Promise((resolve) => {
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
          resolve(error)
        })
    })
  },
  logIn({ commit }, user) {
    return new Promise((resolve) => {
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
          resolve(error)
        })
    })
  },
  verify({ commit }, token) {
    return new Promise((resolve) => {
      this._vm.$http.secured
        .post('verify', { token: token })
        .then((response) => {
          commit('setUser', response.data)
          router.push('me')
          resolve(response.data)
        })
        .catch((error) => {
          resolve(error)
        })
    })
  },
  logOut({ commit }) {
    return new Promise((resolve) => {
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
          resolve(error)
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
