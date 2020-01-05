<template>
    <v-dialog v-model="open" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Създай урок седмично до</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-date-picker v-model="until"></v-date-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Затвори</v-btn>
          <v-btn color="blue darken-1" outlined @click="save">Създай</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { CREATE_LESSON_WEEKLY } from "@/store/actions.type";
import store from "@/store";

export default {
  props: {
    lesson: {
      type: Object,
      default: null,
      description: "Lesson to repeat"
    },
    open: {
      type: Boolean,
      default: false,
      description: "Is the dialog open"
    },
  },
  data() {
    return {
      until: null
    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    save() {  
      this.$store.dispatch(CREATE_LESSON_WEEKLY, { 
        id: this.lesson.id, 
        until: this.until 
      });
      this.closeDialog();
    }
  }
}
</script>