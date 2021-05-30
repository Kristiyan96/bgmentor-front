<template>
  <v-card color="grey lighten-4" max-width="500px" flat>
    <v-toolbar :color="color" dark elevation="0">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="editLesson" v-on="on">
            <v-icon>edit</v-icon>
          </v-btn>
        </template>
        Edit event
      </v-tooltip>
      <v-toolbar-title
        v-html="`${lesson.teacher.name} - ${lesson.group.name}`"
      />
      <v-spacer></v-spacer>
      <DeleteButton @confirm="deleteLesson" tooltip="Delete event" />
    </v-toolbar>
    <GroupMemberships :group="lesson.group" :calendar="true" :lesson="lesson" />
    <v-card-actions>
      <v-btn text color="secondary" @click="$emit('onClose')"> Затвори </v-btn>
      <v-spacer />
      <v-btn
        depressed
        color="primary"
        @click="complete"
        :disabled="lesson.completed"
      >
        Проведен
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import GroupMemberships from '@/views/Groups/GroupMemberships'
import { mapGetters } from 'vuex'
import store from '@/store'
import DeleteButton from '@/views/components/DeleteButton'

export default {
  components: {
    GroupMemberships,
    DeleteButton
  },
  props: {
    lesson_id: {
      type: Number,
      default: null,
      description: 'Id of the selected event'
    },
    color: {
      type: String,
      default: '#1976d2',
      description: 'Location color'
    }
  },
  data() {
    return {
      repeatOpen: false
    }
  },
  methods: {
    deleteLesson() {
      store.dispatch('destroyLesson', this.lesson.id)
      this.$emit('lessonDeleted')
    },
    editLesson() {
      this.$emit('onClose')
      this.$emit('editLesson')
    },
    closeRepeatLesson() {
      this.repeatLesson = false
    },
    complete() {
      store
        .dispatch('updateLesson', {
          ...this.lesson,
          start_time: this.$moment(this.lesson.start_time),
          end_time: this.$moment(this.lesson.end_time),
          completed: true
        })
        .then((response) => {})
    }
  },
  computed: {
    ...mapGetters(['lessons']),
    lesson() {
      return this.lessons
        ? this.lessons.find((l) => l.id === this.lesson_id)
        : {}
    }
  }
}
</script>

<style lang="sass" scoped>
.repeat
  fill: white
</style>
