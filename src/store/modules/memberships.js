import ApiService from "@/common/api.service";

import {
  FETCH_MEMBERSHIPS,
  CREATE_MEMBERSHIP,
  UPDATE_MEMBERSHIP,
  DESTROY_MEMBERSHIP,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_MEMBERSHIPS,
  SET_MEMBERSHIP,
  ADD_MEMBERSHIP,
  REMOVE_MEMBERSHIP
} from "../mutations.type";

const state = {
  memberships: [],
  new_membership: {
    user_id: "",
    group_id: ""
  }
}

const getters = {
  memberships(state) {
    return state.memberships;
  },
  members(state) {
    const filterUsers = users => {
      return users.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
    }
    let members = state.memberships.map(m => m.user);
    return filterUsers(members);
  }
}

const actions = {
  async [FETCH_MEMBERSHIPS]({ commit, rootState }, group_id) {
    const { data } = await ApiService.query(`/groups/${group_id}/memberships`);
    commit(SET_MEMBERSHIPS, data);
  },
  async [CREATE_MEMBERSHIP]({commit, dispatch}, params) {
    const { data } = await ApiService.post(`/groups/${params.group_id}/memberships`, { membership: params });
    commit(REMOVE_MEMBERSHIP, "");
    commit(ADD_MEMBERSHIP, data);
    dispatch(CREATE_ALERT, ["Membership created", "success"]);
  },
  async [UPDATE_MEMBERSHIP]({ dispatch, commit, rootState }, params) {
    const { data } = await ApiService.update(`/groups/${params.group_id}/memberships`, { membership: params });
    commit(SET_MEMBERSHIP, data);
    dispatch(CREATE_ALERT, ["Membership updated.", "success"]);
  },
  async [DESTROY_MEMBERSHIP]({ commit, dispatch, rootState }, membership) {
    await ApiService.delete(`/groups/${membership.group_id}/memberships`, membership.id);
    commit(REMOVE_MEMBERSHIP, membership.id);
    dispatch(CREATE_ALERT, ["Member removed.", "success"]);
  }
}

const mutations = {
  [SET_MEMBERSHIPS](state, memberships) {
    state.memberships = memberships;
  },
  [SET_MEMBERSHIP](state, membership) {
    let idx = state.memberships.findIndex(m => m.id == membership.id);
    state.memberships.splice(idx, 1, membership);
  },
  [ADD_MEMBERSHIP](state, membership) {
    state.memberships.push(membership);
  },
  [REMOVE_MEMBERSHIP](state, membership_id) {
    state.memberships = state.memberships.filter(m => m.id != membership_id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}