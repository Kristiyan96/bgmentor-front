<template>
  <v-card class="mx-auto" outlined>
    <v-card-title>Subjects</v-card-title>
    <v-card-text>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip
          v-for="subject in profile.subject_list"
          :key="subject"
          class="mr-2"
          color="primary"
          :close="deleteable"
          @click:close="deleteSubject(subject)"
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
import store from '@/store'
import DialogForm from '@/components/DialogForm'
import AddSubject from '@/views/Profile/AddSubject'

export default {
  name: 'TeacherSubjects',
  components: {
    DialogForm,
    AddSubject
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async deleteSubject(subject) {
      this.loading = true
      const subjectList = this.currentUser.subject_list
        .filter((s) => s !== subject)
        .join(', ')

      try {
        await store.dispatch('updateProfile', {
          ...this.currentUser,
          subject_list: subjectList
        })
        this.error = null
        store.dispatch('fetchProfile', this.profile.id)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'profile']),
    deleteable() {
      return this.profile.id === this.currentUser.id
    }
  }
}
</script>
