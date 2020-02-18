<template>
    <v-dialog v-model="open" persistent max-width="700px">
      <v-card>
        <v-card-title>
          <span class="headline">{{this.lesson.id ? 'Редактиране' : 'Нов урок'}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <h3>Начало:</h3>
                <v-time-picker 
                  format="24hr" 
                  v-model="form.start_time" 
                  :max="form.end_time ? form.end_time.toString() : ''">
                </v-time-picker>
              </v-col>
              <v-col cols="12" sm="6">
                <h3>Край:</h3>
                <v-time-picker 
                  format="24hr" 
                  v-model="form.end_time" 
                  :min="form.start_time ? form.start_time.toString() : ''">
                </v-time-picker>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="teachers"
                  v-model="form.teacher_id"
                  item-text="name"
                  item-value="id"
                  label="*Учител"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="groups_individuals"
                  v-model="form.group_id"
                  item-text="name"
                  item-value="id"
                  label="*Група"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Затвори</v-btn>
          <v-btn color="blue darken-1" outlined @click="save">Запази</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_USERS, FETCH_GROUPS, CREATE_LESSON, UPDATE_LESSON } from "@/store/actions.type";
import store from "@/store";

export default {
  props: {
    lesson: {
      type: Object,
      default: null,
      description: "Lesson to edit"
    },
    start: {
      type: Object,
      default: () => {},
      description: "The start time of the lesson"
    },
    open: {
      type: Boolean,
      default: false,
      description: "Is the dialog open"
    },
  },
  data() {
    return {
      form: {
        start_time: "",
        end_time: "",
        teacher_id: null,
        group_id: null
      }
    }
  },
  mounted() {
    store.dispatch(FETCH_GROUPS);
    store.dispatch(FETCH_USERS);
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    save() {
      if(this.lesson.id) {
        let [start, end] = [this.$moment(this.lesson.start_time), this.$moment(this.lesson.end_time)];
        let [new_start, new_end] = [this.form.start_time, this.form.end_time];

        this.form = {
          ...this.form,
          start_time: start.hour(new_start.split(":")[0]).minute(new_start.split(":")[1]),
          end_time: end.hour(new_end.split(":")[0]).minute(new_end.split(":")[1])
        };

        store.dispatch(UPDATE_LESSON, this.form).then(response => {
          this.closeDialog();
        })
      } else {
        this.form = {
          ...this.form,
          start_time: new Date(this.start.year, this.start.month - 1, this.start.day, this.form.start_time.split(':')[0], this.form.start_time.split(':')[1]),
          end_time: new Date(this.start.year, this.start.month - 1, this.start.day, this.form.end_time.split(':')[0], this.form.end_time.split(':')[1])
        };

        store.dispatch(CREATE_LESSON, this.form).then(response => {
          this.closeDialog();
        })
      }
    }
  },
  computed: {
    ...mapGetters(["groups_individuals", "teachers"]),
  },
  watch: {
    open() {
      if(this.open) {
        if(this.lesson.id) {
          this.form.id = this.lesson.id;
          this.form.start_time = this.lesson.start_time.split(" ")[1];
          this.form.end_time = this.lesson.end_time.split(" ")[1];
          this.form.teacher_id = this.lesson.teacher_id;
          this.form.group_id = this.lesson.group_id;
        } else {
          this.form = {
            start_time: this.start.hour + ":00",
            end_time: null,
            teacher_id: null,
            group_id: null
          }
        }
      } else {
        this.form = {
          start_time: "",
          end_time: "",
          teacher_id: null,
          group_id: null
        }
      }
    },
  }
}
</script>