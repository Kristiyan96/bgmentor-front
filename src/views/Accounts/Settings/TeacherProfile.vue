<template>
  <LayoutColumn paddingless>
    <template v-slot:title>
      Моята обява
    </template>
    <template v-slot:content>
      <v-textarea
        class="mb-2"
        v-model="user.description"
        label="Моля, опишете Вашия опит, постижения..."
        :rules="descriptionRules"
        required
      ></v-textarea>
      <SkillsList />
    </template>
    <template v-slot:actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        :disabled="!dirty"
        depressed
        :loading="loading"
        @click="submit"
      >
        Запази
      </v-btn>
    </template>
  </LayoutColumn>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import {
  FETCH_SUBJECTS,
  FETCH_LEVELS,
  FETCH_SKILLS,
  UPDATE_PROFILE,
  FETCH_PROFILE
} from "@/store/actions.type";
import LayoutColumn from "@/layout/LayoutColumn";
import SkillsList from "./TeacherSkills/SkillsList";

export default {
  components: {
    LayoutColumn,
    SkillsList
  },
  data() {
    return {
      show: false,
      user: {},
      loading: false,
      descriptionRules: [v => !!v || "Описанието е задължително."]
    };
  },
  mounted() {
    store.dispatch(FETCH_SUBJECTS);
    store.dispatch(FETCH_LEVELS);
    store.dispatch(FETCH_SKILLS, this.current_user.id);
    this.user = {
      ...this.current_user
    };
  },
  methods: {
    submit() {
      this.loading = true;
      store.dispatch(UPDATE_PROFILE, this.user).then(response => {
        this.loading = false;
      });
    }
  },
  computed: {
    ...mapGetters(["current_user", "subjects", "levels"]),
    dirty() {
      return this.user.description != this.current_user.description;
    }
  },
  watch: {
    current_user: {
      immediate: true,
      handler() {
        store.dispatch(FETCH_PROFILE, { id: null });
      }
    }
  }
};
</script>
