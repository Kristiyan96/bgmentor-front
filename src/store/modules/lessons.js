import ApiService from "@/common/api.service";

import {
  FETCH_LESSONS,
  CREATE_LESSON,
  CREATE_LESSON_WEEKLY,
  UPDATE_LESSON,
  DESTROY_LESSON,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_LESSON_FILTERS,
  SET_LESSONS,
  SET_LESSON,
  ADD_LESSON,
  REMOVE_LESSON
} from "../mutations.type";

const state = {
  lessons: [],
  new_lesson: {
    user_id: null,
    group_id: null,
    start: null,
    end: null
  },
  filters: {
    user_id: null,
    group_id: null,
    office_id: null
  }
};

const getters = {
  lessons(state) {
    return state.lessons;
  }
};

const actions = {
  async [FETCH_LESSONS]({ commit, rootState }) {
    const { data } = await ApiService.query(`/lessons`);
    commit(SET_LESSONS, data);
  },
  async [CREATE_LESSON]({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      ApiService.post(`/lessons`, { lesson: params }).then(
        response => {
          commit(ADD_LESSON, response.data);
          dispatch(CREATE_ALERT, ["Lesson created", "success"]);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  async [CREATE_LESSON_WEEKLY]({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      ApiService.post(`/lessons/${params.id}/create_weekly`, params).then(
        response => {
          commit(ADD_LESSON, response.data);
          dispatch(CREATE_ALERT, ["Lessons created", "success"]);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  async [UPDATE_LESSON]({ dispatch, commit, rootState }, params) {
    return new Promise((resolve, reject) => {
      ApiService.update(`/lessons`, params.id, { lesson: params }).then(
        response => {
          commit(SET_LESSON, response.data);
          dispatch(CREATE_ALERT, ["Lesson updated.", "success"]);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  async [DESTROY_LESSON]({ commit, dispatch, rootState }, lesson_id) {
    await ApiService.delete(`/lessons`, lesson_id);
    commit(REMOVE_LESSON, lesson_id);
    dispatch(CREATE_ALERT, ["Lesson removed.", "success"]);
  }
};

const mutations = {
  [SET_LESSON_FILTERS](state, filters) {
    state.filters = {...filters};
  },
  [SET_LESSONS](state, lessons) {
    state.lessons = lessons;
  },
  [SET_LESSON](state, lesson) {
    let idx = state.lessons.findIndex(p => p.id == lesson.id);
    state.lessons.splice(idx, 1, lesson);
  },
  [ADD_LESSON](state, lesson) {
    console.log(state.lessons.length);
    state.lessons = state.lessons.concat(lesson);
    console.log(state.lessons.length);
  },
  [REMOVE_LESSON](state, lesson_id) {
    state.lessons = state.lessons.filter(p => p.id != lesson_id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
