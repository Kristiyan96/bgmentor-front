const state = {
  lessons: [],
  newLesson: {
    completed: false,
    cancelled: false,
    price: 0,
    starts_at: null,
    ends_at: null,
    location: ''
  }
}

const getters = {
  lessons(state) {
    return state.lessons
  },
  newLesson(state) {
    return state.newLesson
  }
}

const actions = {
  async fetchLessons({ commit }) {
    const { data } = await this._vm.$http.roled.get(`lessons`)
    commit('setLessons', data)
  },
  async createLesson({ commit, dispatch }, params) {
    const { data } = await this._vm.$http.roled.post(`lessons`, {
      lesson: params
    })
    commit('addLesson', data)
    dispatch('createAlert', ['Lesson added', 'success'])
  },
  async updateLesson({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      this._vm.$http.roled
        .put(`lessons`, params.id, {
          lesson: params
        })
        .then(
          ({ data }) => {
            commit('setLesson', data)
            dispatch('createAlert', ['Lesson updated', 'success'])
            resolve(data)
          },
          (error) => {
            reject(error)
          }
        )
    })
  },
  async destroyLesson({ commit, dispatch }, lessonId) {
    await this._vm.$http.secured.delete(`lessons`, lessonId)
    commit('removeLesson', lessonId)
    dispatch('createAlert', ['Lesson deleted', 'success'])
  }
}

const mutations = {
  setLessons(state, lessons) {
    state.lessons = lessons
  },
  setLesson(state, lesson) {
    let idx = state.lessons.findIndex((l) => l.id === lesson.id)
    state.lessons.splice(idx, 1, lesson)
  },
  addLesson(state, lesson) {
    state.lessons.push(lesson || { ...state.new_lesson })
  },
  removeLesson(state, lessonId) {
    state.lessons = state.lessons.filter((l) => l.id !== lessonId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
