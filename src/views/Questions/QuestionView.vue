<template>
  <LayoutColumn paddingless>
    <template v-slot:title>
      {{ active_question ? "Редактиране на въпрос" : "Нов въпрос" }}
    </template>

    <template v-slot:header-actions>
      <DeleteButton
        @confirm="destroy"
        v-if="active_question && current_user.admin"
        tooltip="Delete question"
      />
    </template>

    <template v-slot:content>
      <v-row>
        <v-col cols="12" class="px-0">
          <v-text-field label="Заглавиe" v-model="form.title"></v-text-field>
        </v-col>
        <v-col cols="12" class="px-0">
          <VueEditor
            v-model="form.description"
            placeholder="Условие на задачата"
          />
        </v-col>
        <v-col cols="12" class="px-0">
          <v-text-field label="Подсказка" v-model="form.hint"></v-text-field>
        </v-col>
        <v-col cols="12" class="px-0">
          <VueEditor
            v-model="form.explanation"
            placeholder="Обяснение на отговора"
          />
        </v-col>
        <v-col cols="12" class="px-0">
          <Options />
        </v-col>
      </v-row>
    </template>

    <template v-slot:actions>
      <v-btn :disabled="!dirty" depressed @click="reset" text>
        Върни промените
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        :disabled="!dirty"
        depressed
        @click="submit"
        v-if="!active_question"
      >
        Създай
      </v-btn>
      <v-btn
        color="primary"
        :disabled="!dirty"
        depressed
        @click="update"
        v-else
      >
        Редактирай
      </v-btn>
    </template>
  </LayoutColumn>
</template>

<script>
import LayoutColumn from "@/layout/LayoutColumn";
import { _ } from "vue-underscore";
import { mapGetters } from "vuex";
import {
  CREATE_QUESTION,
  UPDATE_QUESTION,
  DESTROY_QUESTION
} from "@/store/actions.type";
import store from "@/store";
import DeleteButton from "@/views/components/DeleteButton";
import { VueEditor } from "vue2-editor";
import Options from "./Options/Options";

export default {
  components: {
    DeleteButton,
    LayoutColumn,
    VueEditor,
    Options
  },
  data() {
    return {
      form: {},
      question_copy: {}
    };
  },
  methods: {
    submit() {
      let params = { ...this.form };
      params.options_attributes = params.options;
      delete params["options"];
      store.dispatch(CREATE_QUESTION, params);
    },
    update() {
      let params = { ...this.form };
      params.options_attributes = params.options;
      delete params["options"];
      store.dispatch(UPDATE_QUESTION, this.form);
    },
    destroy() {
      store.dispatch(DESTROY_QUESTION, this.active_question.id);
    },
    reset() {
      this.form = { ...this.question_copy };
    }
  },
  computed: {
    ...mapGetters(["current_user", "new_question", "active_question"]),
    dirty() {
      return !_.isEqual(this.form, this.question_copy);
    }
  },
  watch: {
    active_question: {
      immediate: true,
      handler() {
        if (this.active_question) {
          this.form = { ...this.active_question };
        } else {
          this.form = {
            ...this.new_question
          };
        }
        this.question_copy = { ...this.form };
      }
    }
  }
};
</script>
