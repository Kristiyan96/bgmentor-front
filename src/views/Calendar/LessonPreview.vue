<template>
  <v-card color="grey lighten-4" min-width="350px" flat>
    <v-toolbar :color="selectedEvent.color" dark>
      <v-btn icon @click="editLesson">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="deleteLesson">
        <font-awesome-icon icon="trash-alt"/>
      </v-btn>
    </v-toolbar>
    <GroupMemberships 
      :group="selectedEvent.group" 
      :calendar="true" 
      :lesson="selectedEvent" 
    />
    <v-card-actions>
      <v-btn text color="secondary" @click="$emit('onClose')">
        Затвори
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import GroupMemberships from "@/views/Groups/GroupMemberships";
import { mapGetters } from "vuex";
import { DESTROY_LESSON } from "@/store/actions.type";
import store from "@/store";

export default {
  components: {
    GroupMemberships
  },
  props: {
    selectedEvent: {
      type: Object,
      default: () => {},
      description: ""
    },
  },
  data() {
    return {

    }
  },
  methods: {
    deleteLesson() {
      store.dispatch(DESTROY_LESSON, this.selectedEvent.id);
      this.$emit("lessonDeleted");
    },
    editLesson() {
      this.$emit("editLesson");
    }
  }
}
</script>