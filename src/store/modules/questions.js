import ApiService from "@/common/api.service";

import {
  FETCH_QUESTIONS,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  DESTROY_QUESTION,
  ACTIVATE_QUESTION,
  ADD_OPTION,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_QUESTIONS,
  SET_QUESTION,
  ADD_QUESTION,
  REMOVE_QUESTION,
  SET_ACTIVE_QUESTION
} from "../mutations.type";

const state = {
  questions: [],
  active_question: {}
};

const NEW_QUESTION = {
  id: -1,
  title: "",
  description: "",
  answer: "",
  options: []
};

const NEW_OPTION = {
  question_id: null,
  label: "",
  correct: false
};

const getters = {
  questions(state) {
    return state.questions;
  },
  active_question(state) {
    return state.active_question;
  },
  new_question() {
    return NEW_QUESTION;
  },
  new_option() {
    return NEW_OPTION;
  }
};

const actions = {
  async [FETCH_QUESTIONS]({ commit, dispatch }) {
    const { data } = await ApiService.query(`/questions`);
    commit(SET_QUESTIONS, data);

    // activate first question automatically if any
    if (data.length) {
      dispatch(ACTIVATE_QUESTION, data[0].id);
    }
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
  },
  [ACTIVATE_QUESTION]({ commit }, question_id = null) {
    if (!question_id) {
      commit(ADD_QUESTION);
    }

    commit(SET_ACTIVE_QUESTION, question_id);
  },
  [ADD_OPTION]({ commit, state }) {
    let question = { ...state.active_question };
    console.log(question);
    question.options.push(NEW_OPTION);
    commit(SET_QUESTION, question);
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
  [ADD_QUESTION](state, question = null) {
    state.questions.push(question || { ...NEW_QUESTION });
  },
  [REMOVE_QUESTION](state, question_id) {
    state.questions = state.questions.filter(c => c.id != question_id);
  },
  [SET_ACTIVE_QUESTION](state, question_id) {
    state.active_question = state.questions.find(q => q.id === question_id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
