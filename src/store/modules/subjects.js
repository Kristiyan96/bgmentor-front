const state = {
  subjects: [],
  new_subject: {
    title: ''
  }
}

const getters = {
  subjects(state) {
    return state.subjects
  },
  new_subject(state) {
    return state.new_subject
  }
}

const actions = {
  fetchApprovedSubjects({ commit }) {
    return new Promise((resolve, reject) => {
      this._vm.$http.plain.get(`subjects`).then(
        ({ data }) => {
          commit('setSubjects', data)
          resolve(data)
        },
        (error) => {
          reject(error)
        }
      )
    })
  },
  fetchUserSubjects({ commit }) {
    // TODO: accept user and only fetch all user's subjects
    return new Promise((resolve, reject) => {
      this._vm.$http.plain.get(`subjects`).then(
        ({ data }) => {
          commit('setSubjects', data)
          resolve(data)
        },
        (error) => {
          reject(error)
        }
      )
    })
  },
  async createSubject({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      this._vm.$http.roled
        .post(`subjects`, {
          subject: params
        })
        .then(
          ({ data }) => {
            commit('setSubject', data)
            dispatch('createAlert', ['Subject created.', 'success'])
            resolve(data)
          },
          (error) => {
            reject(error)
          }
        )
    })
  },
  async updateSubject({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      this._vm.$http.roled
        .put(`subjects`, params.id, {
          subject: params
        })
        .then(
          ({ data }) => {
            commit('setSubject', data)
            dispatch('createAlert', ['Subject updated', 'success'])
            resolve(data)
          },
          (error) => {
            reject(error)
          }
        )
    })
  },
  async destroySubject({ commit, dispatch }, subjectId) {
    return new Promise((resolve, reject) => {
      this._vm.$http.roled.delete(`subjects`, subjectId).then(
        ({ data }) => {
          commit('removeSubject', subjectId)
          dispatch('createAlert', ['Subject deleted', 'success'])
          resolve(data)
        },
        (error) => {
          reject(error)
        }
      )
    })
  }
}

const mutations = {
  setSubjects(state, subjects) {
    state.subjects = subjects
  },
  setSubject(state, subject) {
    let idx = state.subjects.findIndex((s) => s.id === subject.id)
    state.subjects.splice(idx, 1, subject)
  },
  addSubject(state, subject) {
    state.subjects.push(subject || { ...state.new_subject })
  },
  removeSubject(state, subjectId) {
    state.subjects = state.subjects.filter((s) => s.id !== subjectId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
