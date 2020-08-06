import ApiService from "@/common/api.service";

import { FETCH_LEVELS } from "../actions.type";
import { SET_LEVELS } from "../mutations.type";

const state = {
  levels: []
};

const getters = {
  levels(state) {
    return state.levels;
  }
};

const actions = {
  async [FETCH_LEVELS]({ commit }, params) {
    const { data } = await ApiService.query(`/levels`, params);
    commit(SET_LEVELS, data);
  }
};

const mutations = {
  [SET_LEVELS](state, levels) {
    state.levels = levels;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
