import ApiService from "@/common/api.service";

import {
  FETCH_LOCATIONS,
  CREATE_LOCATION,
  UPDATE_LOCATION,
  DESTROY_LOCATION,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_LOCATIONS,
  SET_LOCATION,
  ADD_LOCATION,
  REMOVE_LOCATION
} from "../mutations.type";

const state = {
  locations: []
};

const getters = {
  locations(state) {
    return state.locations;
  }
};

const actions = {
  async [FETCH_LOCATIONS]({ commit, rootState }) {
    const { data } = await ApiService.query(`/locations`);
    commit(SET_LOCATIONS, data);
  },
  async [CREATE_LOCATION]({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      ApiService.post(`/locations`, { location: params }).then(
        response => {
          commit(ADD_LOCATION, response.data);
          dispatch(CREATE_ALERT, ["Location created", "success"]);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  async [UPDATE_LOCATION]({ dispatch, commit, rootState }, params) {
    return new Promise((resolve, reject) => {
      ApiService.update(`/locations`, params.id, { location: params }).then(
        response => {
          commit(SET_LOCATION, response.data);
          dispatch(CREATE_ALERT, ["Location updated.", "success"]);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  async [DESTROY_LOCATION]({ commit, dispatch, rootState }, location_id) {
    await ApiService.delete(`/locations`, location_id);
    commit(REMOVE_LOCATION, location_id);
    dispatch(CREATE_ALERT, ["Location removed.", "success"]);
  }
};

const mutations = {
  [SET_LOCATIONS](state, locations) {
    state.locations = locations;
  },
  [SET_LOCATION](state, location) {
    let idx = state.locations.findIndex(l => l.id == location.id);
    state.locations.splice(idx, 1, location);
  },
  [ADD_LOCATION](state, location) {
    state.locations = state.locations.concat(location);
  },
  [REMOVE_LOCATION](state, location_id) {
    state.locations = state.locations.filter(l => l.id != location_id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
