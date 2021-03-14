<template>
  <v-card class="mx-auto" outlined>
    <v-card-title>Subjects</v-card-title>
    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip
          v-for="subject in profile.subject_list"
          :key="subject"
          class="mr-2"
          color="primary"
          :close="deleteable"
          @click:close="chip1 = false"
        >
          {{ subject }}
        </v-chip>
        <AddSubject v-if="deleteable" />
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import DialogForm from '@/components/DialogForm'
import AddSubject from '@/views/Profile/AddSubject'

export default {
  name: 'TeacherSubjects',
  components: {
    DialogForm,
    AddSubject
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    ...mapGetters(['currentUser', 'profile']),
    deleteable() {
      return this.profile.id === this.currentUser.id
    }
  }
}
</script>
