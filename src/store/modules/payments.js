import ApiService from "@/common/api.service";

import {
  FETCH_PAYMENTS,
  CREATE_PAYMENT,
  UPDATE_PAYMENT,
  DESTROY_PAYMENT,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_PAYMENTS,
  SET_PAYMENT,
  ADD_PAYMENT,
  REMOVE_PAYMENT
} from "../mutations.type";

const state = {
  payments: [],
  new_payment: {
    membership_id: "",
    amount: "",
    note: ""
  }
};

const getters = {
  payments(state) {
    return state.payments;
  }
};

const actions = {
  async [FETCH_PAYMENTS]({ commit, rootState }) {
    const { data } = await ApiService.query(`/payments`);
    commit(SET_PAYMENTS, data);
  },
  async [CREATE_PAYMENT]({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      ApiService.post(`/payments`, { payments: params }).then(
        response => {
          commit(ADD_PAYMENT, response.data);
          dispatch(CREATE_ALERT, ["Payment created", "success"]);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  async [UPDATE_PAYMENT]({ dispatch, commit, rootState }, params) {
    return new Promise((resolve, reject) => {
      ApiService.update(`/payments`, params.id, { payment: params }).then(
        response => {
          commit(SET_PAYMENT, response.data);
          dispatch(CREATE_ALERT, ["Payment updated.", "success"]);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  async [DESTROY_PAYMENT]({ commit, dispatch, rootState }, payment_id) {
    return new Promise((resolve, reject) => {
      ApiService.delete(`/payments`, payment_id).then(
        response => {
          commit(REMOVE_PAYMENT, payment_id);
          dispatch(CREATE_ALERT, ["Payment removed.", "success"]);
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
  [SET_PAYMENTS](state, payments) {
    state.payments = payments;
  },
  [SET_PAYMENT](state, payment) {
    let idx = state.payments.findIndex(p => p.id == payment.id);
    state.payments.splice(idx, 1, payment);
  },
  [ADD_PAYMENT](state, payment) {
    state.payments.push(payment);
  },
  [REMOVE_PAYMENT](state, payment_id) {
    state.payments = state.payments.filter(p => p.id != payment_id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
