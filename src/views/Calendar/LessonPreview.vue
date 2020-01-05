<template>
  <v-card color="grey lighten-4" min-width="350px" flat>
    <v-toolbar :color="lesson.color" dark>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="editLesson" v-on="on">
            <v-icon>edit</v-icon>
          </v-btn>
        </template>
        Edit event
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="repeatOpen = true" class="mr-2" v-on="on">
            <repeat-icon w="24px" h="24px" class='repeat' />
          </v-btn>
        </template>
        Repeat event
      </v-tooltip>
      <v-toolbar-title v-html="lesson.name"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="deleteLesson" v-on="on">
            <font-awesome-icon icon="trash-alt"/>
          </v-btn>
        </template>
        Delete event
      </v-tooltip>
    </v-toolbar>
    <GroupMemberships 
      :group="lesson.group" 
      :calendar="true" 
      :lesson="lesson" 
    />
    <v-card-actions>
      <v-btn text color="secondary" @click="$emit('onClose')">
        Затвори
      </v-btn>
    </v-card-actions>
    <RepeatDialog :lesson="lesson" :open="repeatOpen" @closeDialog="repeatOpen = false"/>
  </v-card>
</template>

<script>
import GroupMemberships from "@/views/Groups/GroupMemberships";
import { mapGetters } from "vuex";
import { DESTROY_LESSON } from "@/store/actions.type";
import store from "@/store";
import RepeatIcon from 'vue-ionicons/dist/md-repeat.vue';
import RepeatDialog from './LessonRepeat';

export default {
  components: {
    GroupMemberships,
    RepeatIcon,
    RepeatDialog
  },
  props: {
    lesson: {
      type: Object,
      default: () => {},
      description: ""
    },
  },
  data() {
    return {
      repeatOpen: false
    }
  },
  methods: {
    deleteLesson() {
      store.dispatch(DESTROY_LESSON, this.lesson.id);
      this.$emit("lessonDeleted");
    },
    editLesson() {
      this.$emit("editLesson");
    },
    closeRepeatLesson() {
      this.repeatLesson = false;
    }
  }
}
</script>

<style lang="sass" scoped>
.repeat
  fill: white
</style>