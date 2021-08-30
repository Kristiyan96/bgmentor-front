<template>
    <v-container class="grey lighten-5">
    <Header :profile="profile" />
    <v-row class="mt-2">
      <v-col cols="12" md="4">
        hi
      </v-col>
      <v-col cols="12" md="8">

      </v-col>
    </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import Header from './Header'

export default {
  name: 'Profile',
  components: {
    Header
  },
  props: {
    profile: {
      type: Object,
      default: () => {},
      description: "User profile"
    }
  },
  components: {
    
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
