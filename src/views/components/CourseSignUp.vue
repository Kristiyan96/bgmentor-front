<template>
  <span>
    <v-btn 
      color="primary" 
      class="px-5" 
      rounded 
      depressed
      outlined
      @click="openDialog"
    >
      Проявявам интерес
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card v-if="!completed">
        <v-card-title>
          <span class="headline">Искам да науча повече</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Вашето име" v-model="form.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="*Телефон за контакт" required v-model="form.phone"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="lessonOptions"
                  v-model="form.lesson"
                  label="*Тип урок"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="gradeOptions"
                  v-model="form.grade"
                  label="*Клас"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*сигнализира задължително поле</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="dialog = false">Затвори</v-btn>
          <v-btn color="blue darken-1" text @click="submit">Изпрати</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title>
          <span class="headline">Благодарим за интереса</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" align="center">
                <font-awesome-icon icon="check" size="5x" /><br>
                Ще се свържем с вас при първа възможност, за да отговорим на вашите въпроси и да разберем кои часове са ви удобни.
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="dialog = false">Затвори</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
export default {
  props: {
    grade: {
      type: [String, Number],
      default: 5
    },
    lesson: {
      type: String,
      default: "group"
    }
  },
  data() {
    return {
      dialog: false,
      completed: false,
      form: {
        name: "",
        phone: "",
        grade: "",
        lesson: ""
      },
      gradeOptions: [
        {
          text: "5-ти",
          value: "5"
        },
        {
          text: "6-ти",
          value: "6"
        },
        {
          text: "7-ми",
          value: "7"
        },
        {
          text: "8-ми",
          value: "8"
        },
        {
          text: "9-ти",
          value: "9"
        },
        {
          text: "10-ти",
          value: "10"
        },
      ],
      lessonOptions: [
        {
          text: "Групови",
          value: "group"
        },
        {
          text: "Частни",
          value: "private"
        }
      ]
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
      this.form.lesson = this.lesson;
      this.form.grade = this.grade;
    },
    submit() {
      this.axios
        .post("/interests", {
          interest: this.form
        })
        .then(() => {
          this.completed = true;
        })
        .catch(error => console.log(error));
    }
  }
}
</script>

<style scoped lang="sass">
svg
  color: #00E676
  margin: 20px 0px
</style>