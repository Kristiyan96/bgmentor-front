<template>
  <v-card color="grey lighten-4" min-width="350px" flat>
    <v-toolbar :color="color" dark elevation="0">
      <v-toolbar-title v-html="`${lesson.teacher.name} - ${lesson.group.name}`"/>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      Брой записани ученици: {{lesson.students.length}} <br>
      Място: {{location.title}}

    </v-card-text>
    <v-card-actions>
      <v-btn text color="secondary" @click="$emit('onClose')">
        Затвори
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  props: {
    lesson_id: {
      type: Number,
      default: null,
      description: "Id of the selected event"
    },
    color: {
      type: String,
      default: "#1976d2",
      description: "Location color"
    }
  },
  data() {
    return {
    }
  },
  mounted() {

  },
  computed: {
    ...mapGetters(["lessons", "locations"]),
    lesson() {
      return this.lessons ? this.lessons.find(l => l.id == this.lesson_id) : {};
    },
    location() {
      let location_id = this.lesson.group.location_id;
      return this.locations.find(l => l.id == location_id) || {};
    }
  }
}
</script>

<style lang="sass" scoped>
.repeat
  fill: white
</style>