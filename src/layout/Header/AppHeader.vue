<template>
  <v-app-bar app clipped-left elevation="0" color="grey lighten-5">
    <v-app-bar-nav-icon @click="toggleSidebar" v-if="signedIn" />
    <span class="title ml-3 mr-5 white--grey">
      <router-link to="/" :active="false"
        ><img src="@/assets/images/logo.png" height="40px"
      /></router-link>
    </span>
    <v-spacer />
    <Alerts />
    <GuestHeader v-if="!signedIn" />
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import Alerts from '../Alerts'
import GuestHeader from './Guest'

export default {
  components: {
    Alerts,
    GuestHeader
  },
  data() {
    return {
      projectDialog: false
    }
  },
  methods: {
    toggleSidebar() {
      store.dispatch('toggleSidebar')
    }
  },
  computed: {
    ...mapGetters(['signedIn'])
  }
}
</script>
