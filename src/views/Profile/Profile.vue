<template>
  <v-container class="grey lighten-5">
    <TeacherItem :teacher="profile" />
    <v-row class="mt-2">
      <v-col cols="4">
        <TeacherTagsSection
          v-for="model in ['subject', 'level', 'location']"
          :key="model"
          :model="model"
        />
      </v-col>
      <v-col cols="8">
        <TeacherTextSection
          v-for="model in ['cv', 'experience', 'rate_details']"
          :key="model"
          :model="model"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import TeacherItem from '@/views/Search/TeacherItem'
import TeacherTagsSection from './TeacherTagsSection'
import TeacherTextSection from './TeacherTextSection'

export default {
  name: 'Profile',
  components: {
    TeacherItem,
    TeacherTagsSection,
    TeacherTextSection
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
