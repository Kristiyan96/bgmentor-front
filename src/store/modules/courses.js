import ApiService from "@/common/api.service";

import {
  FETCH_COURSES,
  CREATE_COURSE,
  UPDATE_COURSE,
  DESTROY_COURSE,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_COURSES,
  SET_COURSE,
  ADD_COURSE,
  REMOVE_COURSE
} from "../mutations.type";

const state = {
  courses: []
};

const NEW_COURSE = {
  title: "",
  description: "",
  subject: ""
};

const getters = {
  courses(state) {
    return state.courses;
  },
  new_course() {
    return NEW_COURSE;
  }
};

const actions = {
  async [FETCH_COURSES]({ commit }) {
    const { data } = await ApiService.query(`/courses`);
    commit(SET_COURSES, data);
  },
  async [CREATE_COURSE]({ commit, dispatch }, params) {
    const { data } = await ApiService.post(`/courses`, { course: params });
    commit(REMOVE_COURSE, "");
    commit(ADD_COURSE, data);
    dispatch(CREATE_ALERT, ["Course added", "success"]);
  },
  async [UPDATE_COURSE]({ commit, dispatch }, params) {
    const { data } = await ApiService.update(`/courses`, params.id, {
      course: params
    });
    commit(SET_COURSE, data);
    dispatch(CREATE_ALERT, ["Courses updated", "success"]);
  },
  async [DESTROY_COURSE]({ commit, dispatch }, course_id) {
    await ApiService.delete(`/courses`, course_id);
    commit(REMOVE_COURSE, course_id);
    dispatch(CREATE_ALERT, ["Course deleted", "success"]);
  }
};

const mutations = {
  [SET_COURSES](state, courses) {
    state.courses = courses;
  },
  [SET_COURSE](state, course) {
    let idx = state.courses.findIndex(c => c.id == course.id);
    state.courses.splice(idx, 1, course);
  },
  [ADD_COURSE](state, course) {
    state.courses.push(course || { ...NEW_COURSE });
  },
  [REMOVE_COURSE](state, course_id) {
    state.courses = state.courses.filter(c => c.id != course_id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
