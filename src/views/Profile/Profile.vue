<template>
  <v-container class="grey lighten-5">
    <TeacherProfile v-if="isTeacher" :profile="profile" />
    <StudentProfile v-else :profile="profile" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import TeacherProfile from "@/views/Profile/Teacher/Profile"
import StudentProfile from "@/views/Profile/Student/Profile"

export default {
  name: 'Profile',
  components: {
    TeacherProfile,
    StudentProfile
  },
  data() {
    return {
      loading: false,
      error: ''
    }
  },
  methods: {
    async fetchProfile() {
      this.loading = true

      try {
        await store.dispatch('fetchProfile', this.$route.params.id)
        this.error = ''
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'profile']),
    profileId() {
      return this.$route.params.id
    },
    isTeacher() {
      return this.profile.role === "teacher"
    }
  },
  watch: {
    profileId: {
      immediate: true,
      handler() {
        this.fetchProfile()
      }
    }
  }
}
</script>
