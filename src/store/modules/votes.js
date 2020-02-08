import ApiService from "@/common/api.service";

import { FETCH_VOTES, CREATE_VOTE, CREATE_ALERT } from "../actions.type";

import { SET_VOTES, ADD_VOTE } from "../mutations.type";

const state = {
  votes: []
};

const getters = {
  votes(state) {
    return state.votes;
  }
};

const actions = {
  async [FETCH_VOTES]({ commit, rootState }) {
    const { data } = await ApiService.query(`/votes`);
    commit(SET_VOTES, data);
  },
  async [CREATE_VOTE]({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      ApiService.post(`/votes`, { vote: params }).then(
        response => {
          commit(ADD_VOTE, response.data);
          dispatch(CREATE_ALERT, ["Vote created", "success"]);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
    });
  }
};

const mutations = {
  [SET_VOTES](state, votes) {
    state.votes = votes;
  },
  [ADD_VOTE](state, vote) {
    state.votes.push(vote);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
