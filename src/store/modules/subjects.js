import ApiService from "@/common/api.service";
import { FETCH_SUBJECTS } from "../actions.type";
import { SET_SUBJECTS } from "../mutations.type";

const state = {
  subjects: []
};

const getters = {
  subjects(state) {
    return state.subjects;
  }
};

const actions = {
  async [FETCH_SUBJECTS]({ commit }) {
    const { data } = await ApiService.get(`/subjects`);
    commit(SET_SUBJECTS, data);
  }
};

const mutations = {
  [SET_SUBJECTS](state, subjects) {
    state.subjects = subjects;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
