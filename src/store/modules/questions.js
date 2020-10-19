import ApiService from "@/common/api.service";

import {
  FETCH_QUESTIONS,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  DESTROY_QUESTION,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_QUESTIONS,
  SET_QUESTION,
  ADD_QUESTION,
  REMOVE_QUESTION
} from "../mutations.type";

const state = {
  questions: []
};

const NEW_QUESTION = {
  title: "",
  description: "",
  answer: ""
};

const getters = {
  questions(state) {
    return state.questions;
  },
  new_question() {
    return NEW_QUESTION;
  }
};

const actions = {
  async [FETCH_QUESTIONS]({ commit }) {
    const { data } = await ApiService.query(`/questions`);
    commit(SET_QUESTIONS, data);
  },
  async [CREATE_QUESTION]({ commit, dispatch }, params) {
    const { data } = await ApiService.post(`/questions`, { question: params });
    commit(REMOVE_QUESTION, "");
    commit(ADD_QUESTION, data);
    dispatch(CREATE_ALERT, ["Question added", "success"]);
  },
  async [UPDATE_QUESTION]({ commit, dispatch }, params) {
    const { data } = await ApiService.update(`/questions`, params.id, {
      question: params
    });
    commit(SET_QUESTION, data);
    dispatch(CREATE_ALERT, ["Questions updated", "success"]);
  },
  async [DESTROY_QUESTION]({ commit, dispatch }, question_id) {
    await ApiService.delete(`/questions`, question_id);
    commit(REMOVE_QUESTION, question_id);
    dispatch(CREATE_ALERT, ["Question deleted", "success"]);
  }
};

const mutations = {
  [SET_QUESTIONS](state, questions) {
    state.questions = questions;
  },
  [SET_QUESTION](state, question) {
    let idx = state.questions.findIndex(c => c.id == question.id);
    state.questions.splice(idx, 1, question);
  },
  [ADD_QUESTION](state, question) {
    state.questions.push(question || { ...NEW_QUESTION });
  },
  [REMOVE_QUESTION](state, question_id) {
    state.questions = state.questions.filter(c => c.id != question_id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
