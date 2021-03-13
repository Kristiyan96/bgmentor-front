<template>
  <v-container class="grey lighten-5">
    <TeacherItem :teacher="profile" />
    <v-row>
      <v-col> </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import TeacherItem from '@/views/Search/TeacherItem'

export default {
  name: 'Profile',
  components: {
    TeacherItem
  },
  data() {
    return {
      loading: false,
      error: ''
    }
  },
  async mounted() {
    this.loading = true

    try {
      await store.dispatch('fetchProfile', this.$route.params.id)
      this.error = ''
    } catch (error) {
      this.error = error
    } finally {
      this.loading = false
    }
  },
  methods: {},
  computed: {
    ...mapGetters(['currentUser', 'profile'])
  }
}
</script>
