<template>
  <v-card color="grey lighten-4" min-width="350px" flat>
    <v-toolbar :color="color" dark elevation="0">
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
      <v-toolbar-title v-html="`${lesson.teacher.name} - ${lesson.group.name}`"/>
      <v-spacer></v-spacer>
      <DeleteButton @confirm="deleteLesson" tooltip="Delete event" />
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
      <v-spacer />
      <v-btn depressed color="primary" @click="complete" :disabled="lesson.completed">
        Проведен
      </v-btn>
    </v-card-actions>
    <RepeatDialog :lesson="lesson" :open="repeatOpen" @closeDialog="repeatOpen = false"/>
  </v-card>
</template>

<script>
import GroupMemberships from "@/views/Groups/GroupMemberships";
import { mapGetters } from "vuex";
import { UPDATE_LESSON, DESTROY_LESSON, FETCH_MEMBERSHIPS } from "@/store/actions.type";
import store from "@/store";
import RepeatIcon from 'vue-ionicons/dist/md-repeat.vue';
import RepeatDialog from './LessonRepeat';
import DeleteButton from '@/views/components/DeleteButton';

export default {
  components: {
    GroupMemberships,
    RepeatIcon,
    RepeatDialog,
    DeleteButton
  },
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
      repeatOpen: false
    }
  },
  methods: {
    deleteLesson() {
      store.dispatch(DESTROY_LESSON, this.lesson.id);
      this.$emit("lessonDeleted");
    },
    editLesson() {
      this.$emit("onClose");
      this.$emit("editLesson");
    },
    closeRepeatLesson() {
      this.repeatLesson = false;
    },
    complete() {
      store.dispatch(UPDATE_LESSON, {
        ... this.lesson,
        start_time: this.$moment(this.lesson.start_time),
        end_time: this.$moment(this.lesson.end_time),
        completed: true
      }).then(response => {
        store.dispatch(FETCH_MEMBERSHIPS, this.lesson.group_id);
      })
    }
  },
  computed: {
    ...mapGetters(["lessons"]),
    lesson() {
      return this.lessons ? this.lessons.find(l => l.id == this.lesson_id) : {};
    }
  }
}
</script>

<style lang="sass" scoped>
.repeat
  fill: white
</style>