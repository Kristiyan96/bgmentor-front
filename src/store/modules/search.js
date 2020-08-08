import ApiService from "@/common/api.service";

import { FETCH_RESULTS } from "../actions.type";
import { SET_RESULTS } from "../mutations.type";

import {} from "../mutations.type";

const state = {
  results: []
};

const getters = {
  results(state) {
    return state.results;
  }
};

const actions = {
  async [FETCH_RESULTS]({ commit }, params) {
    const { data } = await ApiService.query(`/search`, params);
    commit(SET_RESULTS, data);
  }
};

const mutations = {
  [SET_RESULTS](state, results) {
    state.results = results;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
