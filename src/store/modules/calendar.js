import moment from 'moment'

const state = {
  focus: moment(new Date()).format('YYYY-MM-DD'),
  type: 'week',
  start: moment(new Date()).format('YYYY-MM-DD'),
  end: null,
  calendarTypes: ['day', 'week', 'month']
}

const getters = {
  calendarTypes(state) {
    return state.calendarTypes
  },
  calendarFocus(state) {
    return state.focus
  },
  calendarType(state) {
    return state.type
  },
  calendarStart(state) {
    return state.start
  },
  calendarEnd(state) {
    return state.end
  }
}

const actions = {
  updateCalendarFocus({ commit }, focus) {
    commit('setFocus', focus)
  },
  updateCalendarType({ commit }, type) {
    console.log('updating type 3')
    commit('setType', type)
  },
  updateCalendarStart({ commit }, start) {
    commit('setStart', start)
  },
  updateCalendarEnd({ commit }, end) {
    commit('setEnd', end)
  }
}

const mutations = {
  setFocus(state, focus) {
    state.focus = focus
  },
  setType(state, type) {
    state.type = type
  },
  setStart(state, start) {
    state.start = start
  },
  setEnd(state, end) {
    state.end = end
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
