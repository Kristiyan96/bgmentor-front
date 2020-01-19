import ApiService from "@/common/api.service";

import {
  FETCH_BUGS,
  CREATE_BUG,
  UPDATE_BUG,
  DESTROY_BUG,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_BUGS,
  SET_BUG,
  ADD_BUG,
  REMOVE_BUG
} from "../mutations.type";

const state = {
  bugs: [],
}

const getters = {
  bugs(state) {
    return state.bugs;
  }
}

const actions = {
  async [FETCH_BUGS]({ commit, rootState }) {
    const { data } = await ApiService.query(`/bugs`);
    commit(SET_BUGS, data);
  },
  async [CREATE_BUG]({commit, dispatch}, params) {
    const { data } = await ApiService.post(`/bugs`, { bug: params });
    commit(ADD_BUG, data);
    dispatch(CREATE_ALERT, ["Bug created", "success"]);
  },
  async [UPDATE_BUG]({ dispatch, commit, rootState }, params) {
    const { data } = await ApiService.update(`/bugs`, params.id, { bug: params });
    commit(SET_BUG, data);
    dispatch(CREATE_ALERT, ["Bug updated.", "success"]);
  },
  async [DESTROY_BUG]({ commit, dispatch, rootState }, bug_id) {
    await ApiService.delete(`/bugs`, bug_id);
    commit(REMOVE_BUG, bug_id);
    dispatch(CREATE_ALERT, ["Bug removed.", "success"]);
  }
}

const mutations = {
  [SET_BUGS](state, bugs) {
    state.bugs = bugs;
  },
  [SET_BUG](state, bug) {
    let idx = state.bugs.findIndex(b => b.id == bug.id);
    state.bugs.splice(idx, 1, bug);
  },
  [ADD_BUG](state, bug) {
    state.bugs.push(bug);
  },
  [REMOVE_BUG](state, bug_id) {
    state.bugs = state.bugs.filter(b => b.id != bug_id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}