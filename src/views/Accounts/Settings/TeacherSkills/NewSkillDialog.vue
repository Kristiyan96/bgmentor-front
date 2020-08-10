<template>
  <v-dialog v-model="open" persistent max-width="700px">
    <v-card>
      <v-card-title
        >{{ skill.id ? "Редакция на " : "Нов" }} предмет</v-card-title
      >
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                :items="subjects"
                v-model="skill.subject_id"
                item-text="label"
                item-value="id"
                label="*Предмет"
                required
              ></v-select
            ></v-col>
            <v-col cols="12">
              <v-select
                :items="levels"
                v-model="skill.level_list"
                item-text="label"
                item-value="label"
                multiple
                label="*Ниво на преподаване"
                required
              ></v-select
            ></v-col>
            <v-col cols="12">
              <v-text-field label="Цена на 1 учебен час" v-model="skill.price"
                ><template v-slot:append
                  >лв.</template
                >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Затвори</v-btn>
        <v-btn color="blue darken-1" outlined @click="submit">
          Запази
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_SKILL, UPDATE_SKILL } from "@/store/actions.type";

export default {
  props: {
    open: {
      type: Boolean,
      default: false,
      description: "Is the dialog open"
    },
    skill_id: {
      type: Number,
      default: null,
      description: "Selected skill id"
    }
  },
  data() {
    return {
      valid: true,
      skill: { subject_id: "", level_list: [], price: "" }
    };
  },
  mounted() {},
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    submit() {
      store.dispatch(this.skill.id ? UPDATE_SKILL : CREATE_SKILL, this.skill);
    }
  },
  computed: {
    ...mapGetters(["subjects", "levels", "skills"])
  },
  watch: {
    skill_id: {
      immediate: true,
      handler() {
        if (this.skill_id) {
          this.skill = this.skills.find(s => s.id == this.skill_id);
        }
      }
    }
  }
};
</script>
