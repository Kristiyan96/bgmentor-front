<template>
    <v-dialog v-model="open" persistent max-width="700px">
      <v-card>
        <v-card-title>
          <span class="headline">Филтър на уроците</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">

              </v-col>
              <v-col cols="12">

              </v-col>
              <v-col cols="12">

              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Затвори</v-btn>
          <v-btn color="blue darken-1" outlined @click="applyFilters">Приложи</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_LESSON_FILTERS } from "@/store/mutations.type";
import store from "@/store";

export default {
  props: {
    open: {
      type: Boolean,
      default: false,
      description: "Is the dialog open"
    },
  },
  data() {
    return {
      form: {

      }
    }
  },
  mounted() {

  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    applyFilters() {
      
    }
  },
  watch: {
    open: {
      immediate: true,
      handler() {

      }
    },
  }
}
</script>