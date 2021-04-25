<template>
  <v-container class="grey lighten-5">
    <!-- <AddRating /> -->
    <TeacherHeader :teacher="profile" />
    <v-row class="mt-2">
      <v-col cols="12" md="4">
        <TeacherTagsSection
          v-for="model in ['subject', 'level', 'location']"
          :key="model"
          :model="model"
        />
      </v-col>
      <v-col cols="12" md="8">
        <TeacherTextSection
          v-for="model in ['cv']"
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
  mounted() {
    this.fetchProfile()
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
      return this.profile.id
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
