import ApiService from "@/common/api.service";

import {
  FETCH_ABSENCES,
  CREATE_ABSENCE,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_ABSENCES,
  REMOVE_ABSENCE
} from "../mutations.type";

const state = {
  absences: []
}

const getters = {
  absences(state) {
    return state.absences;
  },
}

const actions = {
  async [FETCH_ABSENCES]({ commit, rootState }) {
    const { data } = await ApiService.query(`/absences`);
    commit(SET_ABSENCES, data);
  },
  async [CREATE_ABSENCE]({commit, dispatch}, params) {
    return new Promise((resolve, reject) => {
      ApiService.post(`/absences`, { absence: params }).then(response => {
        commit(SET_ABSENCES, response.data);
        dispatch(CREATE_ALERT, ["Absence created", "success"]);
        resolve(response.data);
      }, error => {
        reject(error);
      })
    })
  },
}

const mutations = {
  [SET_ABSENCES](state, absences) {
    state.absences = absences;
  },
  [REMOVE_ABSENCE](state, absence_id) {
    state.absences = state.absences.filter(m => m.id != absence_id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}