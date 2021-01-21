import ApiService from "@/common/api.service";

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
  async ["fetchResults"]({ commit }, params) {
    const { data } = await ApiService.query("/search", params);
    commit("setResults", data);
  }
};

const mutations = {
  ["setResults"](state, results) {
    state.results = results;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
