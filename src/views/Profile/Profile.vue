<template>
  <div>
    <v-img
      lazy-src="https://picsum.photos/id/11/10/6"
      max-height="150"
      max-width="250"
      src="https://picsum.photos/id/11/500/300"
    ></v-img>
    <div>{{ profile.first_name }} {{ profile.last_name }}</div>
    <div>{{ profile.desciption }}</div>
    <TeacherProducts :teacher="profile" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import TeacherProducts from '@/views/Products/TeacherProducts'

export default {
  name: 'Profile',
  components: {
    TeacherProducts
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
