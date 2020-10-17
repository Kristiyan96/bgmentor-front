<template>
  <LayoutColumn paddingless>
    <template v-slot:title>
      {{ course ? "Редактиране на курс" : "Нов курс" }}
    </template>

    <template v-slot:header-actions>
      <DeleteButton
        @confirm="destroy"
        v-if="course && current_user.admin"
        tooltip="Delete course"
      />
    </template>

    <template v-slot:content>
      <v-row>
        <v-col cols="12" class="px-0">
          <v-text-field
            label="Заглавиe (Офис 1, ул Кирил и Методий, etc)"
            v-model="form.title"
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
        v-if="!course"
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
  CREATE_COURSE,
  UPDATE_COURSE,
  DESTROY_COURSE
} from "@/store/actions.type";
import store from "@/store";
import DeleteButton from "@/views/components/DeleteButton";

export default {
  components: {
    DeleteButton,
    LayoutColumn
  },
  props: {
    course: {
      type: Object,
      default: () => {},
      description: "The selected course"
    }
  },
  data() {
    return {
      form: {
        title: "",
        address: "",
        color: "#1976d2"
      },
      course_copy: {}
    };
  },
  methods: {
    submit() {
      store.dispatch(CREATE_COURSE, this.form);
    },
    update() {
      store.dispatch(UPDATE_COURSE, this.form);
    },
    destroy() {
      store.dispatch(DESTROY_COURSE, this.course.id);
    },
    reset() {
      this.form = { ...this.course_copy };
    }
  },
  computed: {
    ...mapGetters(["current_user"]),
    dirty() {
      return !_.isEqual(this.form, this.course_copy);
    }
  },
  watch: {
    course: {
      immediate: true,
      handler() {
        if (this.course) {
          this.form = { ...this.course };
          this.course_copy = { ...this.form };
        } else {
          this.form = {
            title: "",
            address: "",
            color: "#1976d2"
          };
        }
      }
    }
  }
};
</script>
