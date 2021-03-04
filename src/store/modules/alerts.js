const state = {
  alerts: []
}

const getters = {
  alerts(state) {
    return state.alerts
  }
}

const actions = {
  createAlert(context, [message, status]) {
    let idx = context.state.alerts.findIndex(
      (a) => a[0] === message && a[1] === status
    )

    if (idx === -1) {
      // prevent adding the same status multiple times
      context.commit('addAlert', [message, status])
      setTimeout(
        () => context.commit('removeAlert', message),
        700 + message.length * 75
      )
    }
  },
  destroyAlert({ commit }, message) {
    commit('removeAlert', message)
  }
}

const mutations = {
  addAlert(state, alert) {
    state.alerts.push(alert)
  },
  removeAlert(state, message) {
    state.alerts = state.alerts.filter(([msg, _status]) => msg !== message)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
