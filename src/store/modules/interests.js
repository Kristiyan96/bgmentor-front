import ApiService from "@/common/api.service";

import {
  FETCH_INTERESTS,
  CREATE_INTEREST,
  ARCHIVE_INTEREST,
  DESTROY_INTEREST,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_INTERESTS,
  SET_INTEREST,
  ADD_INTEREST,
  REMOVE_INTEREST
} from "../mutations.type";

const state = { 
  interests: []
}

const getters = {
  interests(state) {
    return state.interests;
  }
}

const actions = {
  async [FETCH_INTERESTS]({ commit }) {
    const { data } = await ApiService.query(`/interests`);
    commit(SET_INTERESTS, data);
  },
  async [CREATE_INTEREST]({commit, dispatch}, params) {
    const { data } = await ApiService.post(`/interests`, { interest: params });
    commit(REMOVE_INTEREST, "");
    commit(ADD_INTEREST, data);
    dispatch(CREATE_ALERT, ["Interest added", "success"]);
  },
  async [ARCHIVE_INTEREST]({commit, dispatch}, params) {
    const { data } = await ApiService.update(`/interests`, params.id, { interest: params });
    commit(SET_INTEREST, data);
    dispatch(CREATE_ALERT, ["Interest archived", "success"]);
  },
  async [DESTROY_INTEREST]({commit, dispatch}, interest_id) {
    await ApiService.delete(`/interests`, interest_id);
    commit(REMOVE_INTEREST, interest_id);
    dispatch(CREATE_ALERT, ["Interest deleted", "success"]);
  }
}

const mutations = {
  [SET_INTERESTS](state, interests) {
    state.interests = interests;
  },
  [SET_INTEREST](state, interest) {
    let idx = state.interests.findIndex(i => i.id == interest.id);
    state.interests.splice(idx, 1, interest);
  },
  [REMOVE_INTEREST](state, interest_id) {
    state.interests = state.interests.filter(i => i.id != interest_id)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}