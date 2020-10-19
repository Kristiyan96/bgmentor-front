<template>
  <LayoutColumn paddingless>
    <template v-slot:title>
      {{ question ? "Редактиране на въпрос" : "Нов въпрос" }}
    </template>

    <template v-slot:header-actions>
      <DeleteButton
        @confirm="destroy"
        v-if="question && current_user.admin"
        tooltip="Delete question"
      />
    </template>

    <template v-slot:content>
      <v-row>
        <v-col cols="12" class="px-0">
          <v-text-field label="Заглавиe" v-model="form.title"></v-text-field>
        </v-col>
        <v-col cols="12" class="px-0">
          <v-text-field
            label="Описание"
            v-model="form.description"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="px-0">
          <v-text-field label="Подсказка" v-model="form.hint"></v-text-field>
        </v-col>
        <v-col cols="12" class="px-0">
          <v-text-field
            label="Обяснение на отговора"
            v-model="form.explanation"
          ></v-text-field>
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
        v-if="!question"
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

export default {
  components: {
    DeleteButton,
    LayoutColumn
  },
  props: {
    question: {
      type: Object,
      default: () => {},
      description: "The selected question"
    }
  },
  data() {
    return {
      form: {},
      question_copy: {}
    };
  },
  methods: {
    submit() {
      store.dispatch(CREATE_QUESTION, this.form);
    },
    update() {
      store.dispatch(UPDATE_QUESTION, this.form);
    },
    destroy() {
      store.dispatch(DESTROY_QUESTION, this.question.id);
    },
    reset() {
      this.form = { ...this.question_copy };
    }
  },
  computed: {
    ...mapGetters(["current_user", "new_question"]),
    dirty() {
      return !_.isEqual(this.form, this.question_copy);
    }
  },
  watch: {
    question: {
      immediate: true,
      handler() {
        if (this.question) {
          this.form = { ...this.question };
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
