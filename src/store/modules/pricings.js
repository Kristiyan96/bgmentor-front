import ApiService from "@/common/api.service";

import {
  FETCH_PRICINGS,
  CREATE_PRICING,
  UPDATE_PRICING,
  DESTROY_PRICING,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_PRICINGS,
  SET_PRICING,
  ADD_PRICING,
  REMOVE_PRICING
} from "../mutations.type";

const state = {
  pricings: []
};

const getters = {
  pricings(state) {
    return state.pricings;
  }
};

const actions = {
  async [FETCH_PRICINGS]({ commit, rootState }) {
    const { data } = await ApiService.query(`/pricings`);
    commit(SET_PRICINGS, data);
  },
  async [CREATE_PRICING]({ commit, dispatch }, params) {
    const { data } = await ApiService.post(`/pricings`, { pricing: params });
    commit(ADD_PRICING, data);
    dispatch(CREATE_ALERT, ["Pricing created", "success"]);
  },
  async [UPDATE_PRICING]({ dispatch, commit, rootState }, params) {
    const { data } = await ApiService.update(`/pricings`, params.id, {
      pricing: params
    });
    commit(SET_PRICING, data);
    dispatch(CREATE_ALERT, ["Pricing updated.", "success"]);
  },
  async [DESTROY_PRICING]({ commit, dispatch, rootState }, pricing_id) {
    await ApiService.delete(`/pricings`, pricing_id);
    commit(REMOVE_PRICING, pricing_id);
    dispatch(CREATE_ALERT, ["Pricing removed.", "success"]);
  }
};

const mutations = {
  [SET_PRICINGS](state, pricings) {
    state.pricings = pricings;
  },
  [SET_PRICING](state, pricing) {
    let idx = state.pricings.findIndex(p => p.id == pricing.id);
    state.pricings.splice(idx, 1, pricing);
  },
  [ADD_PRICING](state, pricing) {
    state.pricings.push(pricing);
  },
  [REMOVE_PRICING](state, pricing_id) {
    state.pricings = state.pricings.filter(p => p.id != pricing_id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
