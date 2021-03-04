<template>
  <v-dialog v-model="open" persistent max-width="700px">
    <v-card>
      <v-card-title>
        <span class="headline">{{
          this.lesson.id ? 'Редактиране' : 'Нов урок'
        }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <!-- start time -->
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="form.start_time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="form.start_time"
                      label="Начало:"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                      :rules="start_time_rules"
                      required
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    format="24hr"
                    v-if="menu1"
                    v-model="form.start_time"
                    full-width
                    @click:minute="$refs.menu1.save(form.start_time)"
                    :max="form.end_time ? form.end_time.toString() : ''"
                  >
                    ></v-time-picker
                  >
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <!-- end time -->
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="form.end_time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="form.end_time"
                      label="Край:"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                      :rules="end_time_rules"
                      required
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    format="24hr"
                    v-if="menu2"
                    v-model="form.end_time"
                    full-width
                    @click:minute="$refs.menu2.save(form.end_time)"
                    :min="form.start_time ? form.start_time.toString() : ''"
                  >
                    ></v-time-picker
                  >
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Затвори</v-btn>
        <v-btn
          color="blue darken-1"
          outlined
          @click="validate"
          :disabled="!valid"
        >
          Запази
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  props: {
    lesson: {
      type: Object,
      default: null,
      description: 'Lesson to edit'
    },
    start: {
      type: Object,
      default: () => {},
      description: 'The start time of the lesson'
    },
    open: {
      type: Boolean,
      default: false,
      description: 'Is the dialog open'
    }
  },
  data() {
    return {
      valid: true,
      menu1: false,
      menu2: false,
      form: {
        start_time: '',
        end_time: '',
        teacher_id: null
      },
      start_time_rules: [(v) => !!v || 'Началният час е задължителен'],
      end_time_rules: [(v) => !!v || 'Крайният час е задължителен'],
      teacher_rules: [(v) => !!v || 'Учителят е задължителен']
    }
  },
  mounted() {},
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
    validate() {
      this.$refs.form.validate()
    },
    save() {
      if (this.lesson.id) {
        let [start, end] = [
          this.$moment(this.lesson.start_time),
          this.$moment(this.lesson.end_time)
        ]
        let [newStart, newEnd] = [this.form.start_time, this.form.end_time]
        this.form = {
          ...this.form,
          start_time: start
            .hour(newStart.split(':')[0])
            .minute(newStart.split(':')[1]),
          end_time: end.hour(newEnd.split(':')[0]).minute(newEnd.split(':')[1])
        }
        store.dispatch('updateLesson', this.form).then((response) => {
          this.closeDialog()
        })
      } else {
        this.form = {
          ...this.form,
          start_time: new Date(
            this.start.year,
            this.start.month - 1,
            this.start.day,
            this.form.start_time.split(':')[0],
            this.form.start_time.split(':')[1]
          ),
          end_time: new Date(
            this.start.year,
            this.start.month - 1,
            this.start.day,
            this.form.end_time.split(':')[0],
            this.form.end_time.split(':')[1]
          )
        }
        store.dispatch('createLesson', this.form).then((response) => {
          this.closeDialog()
        })
      }
    }
  },
  computed: {
    ...mapGetters([])
  },
  watch: {
    open() {
      if (this.open) {
        if (this.lesson.id) {
          this.form.id = this.lesson.id
          this.form.start_time = this.lesson.start_time.split(' ')[1]
          this.form.end_time = this.lesson.end_time.split(' ')[1]
          this.form.teacher_id = this.lesson.teacher_id
        } else {
          this.form = {
            start_time: this.start.hour + ':00',
            end_time: null,
            teacher_id: null
          }
        }
      } else {
        this.form = {
          start_time: '',
          end_time: '',
          teacher_id: null
        }
      }
    }
  }
}
</script>
