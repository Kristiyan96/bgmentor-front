import ApiService from "@/common/api.service";

import {
  FETCH_PROJECTS,
  SWITCH_PROJECT,
  FETCH_NODE,
  FETCH_FAVORITES,
  CREATE_PROJECT,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_PROJECTS,
  SET_ACTIVE_PROJECT
} from "../mutations.type";

const state = {
  projects: [],
  project: {}
}

const getters = {
  active_project(state) {
    return state.project;
  },
  projects(state) {
    return state.projects;
  }
}

const actions = {
  async [FETCH_PROJECTS](context) {
    const { data } = await ApiService.get("nodes/user_projects");
    context.commit(SET_PROJECTS, data);
  },
  [SWITCH_PROJECT]({dispatch, state, commit}, project_id) {
    let project;

    if(project_id) {
      let idx = state.projects.findIndex(p => p.id == project_id);
      if(idx != -1) {
        project = state.projects[idx];
      } else {
        project = state.projects[0];
      }
    } else {
      project = state.projects[0];
    }

    commit(SET_ACTIVE_PROJECT, project);
    dispatch(FETCH_NODE, project.id);
    dispatch(FETCH_FAVORITES);
  },
  async [CREATE_PROJECT](context, params) {
    const { data } = await ApiService.post("nodes", { node: params });

    context.dispatch(FETCH_PROJECTS, data)
      .then(() => {
        context.dispatch(SWITCH_PROJECT, data.id);
      })
    context.dispatch(CREATE_ALERT, ["Project created", "success"]);
  }
}

const mutations = {
  [SET_PROJECTS](state, projects) {
    state.projects = projects;
  },
  [SET_ACTIVE_PROJECT](state, project) {
    state.project = project;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}