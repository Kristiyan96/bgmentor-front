import ApiService from "@/common/api.service";

import {
  FETCH_SKILLS,
  CREATE_SKILL,
  UPDATE_SKILL,
  DESTROY_SKILL,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_SKILLS,
  SET_SKILL,
  ADD_SKILL,
  REMOVE_SKILL
} from "../mutations.type";

const state = {
  skills: [],
  new_skill: {
    user_id: "",
    subject_id: "",
    level_id: "",
    price: ""
  }
};

const getters = {
  skills(state) {
    return state.skills;
  }
};

const actions = {
  async [FETCH_SKILLS]({ commit, rootState }) {
    const { data } = await ApiService.query(`/skills`);
    commit(SET_SKILLS, data);
  },
  async [CREATE_SKILL]({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      ApiService.post(`/skills`, { skills: params }).then(
        response => {
          commit(ADD_SKILL, response.data);
          dispatch(CREATE_ALERT, ["Skill created", "success"]);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  async [UPDATE_SKILL]({ dispatch, commit, rootState }, params) {
    return new Promise((resolve, reject) => {
      ApiService.update(`/skills`, params.id, { skill: params }).then(
        response => {
          commit(SET_SKILL, response.data);
          dispatch(CREATE_ALERT, ["Skill updated.", "success"]);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  async [DESTROY_SKILL]({ commit, dispatch, rootState }, skill_id) {
    return new Promise((resolve, reject) => {
      ApiService.delete(`/skills`, skill_id).then(
        response => {
          commit(REMOVE_SKILL, skill_id);
          dispatch(CREATE_ALERT, ["Skill removed.", "success"]);
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
  [SET_SKILLS](state, skills) {
    state.skills = skills;
  },
  [SET_SKILL](state, skill) {
    let idx = state.skills.findIndex(s => s.id == skill.id);
    state.skills.splice(idx, 1, skill);
  },
  [ADD_SKILL](state, skill) {
    state.skills.push(skill);
  },
  [REMOVE_SKILL](state, skill_id) {
    state.skills = state.skills.filter(s => s.id != skill_id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
