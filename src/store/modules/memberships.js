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
    let group_id = Array.isArray(params) && params.length ? params[0].group_id : params.group_id;

    return new Promise((resolve, reject) => {
      ApiService.post(`/groups/${group_id}/memberships`, { membership: params }).then(response => {
        commit(SET_MEMBERSHIPS, response.data);
        dispatch(CREATE_ALERT, ["Membership created", "success"]);
        resolve(response.data);
      }, error => {
        reject(error);
      })
    })
  },
  async [UPDATE_MEMBERSHIP]({ dispatch, commit, rootState }, params) {
    const { data } = await ApiService.update(`/groups/${params.group_id}/memberships`, { membership: params });
    commit(SET_MEMBERSHIP, data);
    dispatch(CREATE_ALERT, ["Membership updated.", "success"]);
  },
  async [DESTROY_MEMBERSHIP]({ commit, dispatch, rootState }, selected_memberships) {
    let group_id = selected_memberships[0].group_id;
    let membership_ids = selected_memberships.map(m => m.id);
    // membership_ids could be either an array or a number
    await ApiService.delete(`/groups/${group_id}/memberships`, membership_ids);
    commit(REMOVE_MEMBERSHIP, membership_ids);
    dispatch(CREATE_ALERT, ["Member(s) removed.", "success"]);
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
  [REMOVE_MEMBERSHIP](state, membership_ids) {
    // membership_ids could be either an array or a number
    if(!Array.isArray(membership_ids)) {
      membership_ids = [membership_ids];
    } 

    state.memberships = state.memberships.filter(m => !membership_ids.includes(m.id));
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}