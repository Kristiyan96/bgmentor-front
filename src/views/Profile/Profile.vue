<template>
  <v-container class="grey lighten-5">
    <!-- <AddRating /> -->
    <TeacherHeader :teacher="profile" />
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
          v-for="model in ['cv', 'experience']"
          :key="model"
          :model="model"
        />
        <TeacherPricing />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import TeacherHeader from '@/views/Profile/TeacherHeader'
import TeacherTagsSection from './TeacherTagsSection'
import TeacherTextSection from './TeacherTextSection'
import TeacherPricing from './TeacherPricingSection'
import AddRating from './AddRating'

export default {
  name: 'Profile',
  components: {
    AddRating,
    TeacherHeader,
    TeacherTagsSection,
    TeacherTextSection,
    TeacherPricing
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
