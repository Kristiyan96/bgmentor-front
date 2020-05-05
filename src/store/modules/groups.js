import ApiService from "@/common/api.service";

import {
  FETCH_GROUPS,
  CREATE_GROUP,
  UPDATE_GROUP,
  DESTROY_GROUP,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_GROUPS,
  SET_GROUP,
  ADD_GROUP,
  REMOVE_GROUP
} from "../mutations.type";

const state = {
  groups: [],
  new_group: {
    name: "",
    grade: "",
    lesson_type: "",
    user_id: "",
    information: "",
    pricing_id: null,
    location_id: null
  }
};

const getters = {
  groups_individuals(state) {
    return state.groups;
  },
  groups(state) {
    return state.groups.filter(g => g.lesson_type == 'collective');
  },
  individuals(state) {
    return state.groups.filter(g => g.lesson_type == 'individual');
  }
};

const actions = {
  async [FETCH_GROUPS]({ commit }) {
    const { data } = await ApiService.query(`/groups`);
    commit(SET_GROUPS, data);
  },
  async [CREATE_GROUP]({ commit, dispatch }, params) {
    const { data } = await ApiService.post(`/groups`, { group: params });
    commit(REMOVE_GROUP, "");
    commit(ADD_GROUP, data);
    dispatch(CREATE_ALERT, ["Group added", "success"]);
  },
  async [UPDATE_GROUP]({ commit, dispatch }, params) {
    const { data } = await ApiService.update(`/groups`, params.id, {
      group: params
    });
    commit(SET_GROUP, data);
    dispatch(CREATE_ALERT, ["Group updated", "success"]);
  },
  async [DESTROY_GROUP]({ commit, dispatch }, group_id) {
    await ApiService.delete(`/groups`, group_id);
    commit(REMOVE_GROUP, group_id);
    dispatch(CREATE_ALERT, ["Group deleted", "success"]);
  }
};

const mutations = {
  [SET_GROUPS](state, groups) {
    state.groups = groups;
  },
  [SET_GROUP](state, group) {
    let idx = state.groups.findIndex(g => g.id == group.id);
    state.groups.splice(idx, 1, group);
  },
  [ADD_GROUP](state, group) {
    state.groups.push(group || { ...state.new_group });
  },
  [REMOVE_GROUP](state, group_id) {
    state.groups = state.groups.filter(g => g.id != group_id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
