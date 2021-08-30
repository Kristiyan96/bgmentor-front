<template>
  <v-container class="grey lighten-5">
    <!-- <AddRating /> -->
    <Header :profile="profile" />
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
import Header from '@/views/Profile/Teacher/Header'
import TeacherTagsSection from './TeacherTagsSection'
import TeacherTextSection from './TeacherTextSection'
import TeacherPricing from './TeacherPricingSection'
import AddRating from './AddRating'

export default {
  name: 'Profile',
  props: {
    profile: {
      type: Object,
      default: () => {},
      description: "User profile"
    }
  },
  components: {
    AddRating,
    Header,
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
  computed: {
    ...mapGetters(['currentUser']),
  },
}
</script>
