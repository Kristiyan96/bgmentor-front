<template>
  <v-app-bar app clipped-left elevation="0" color="grey lighten-5">
    <v-app-bar-nav-icon @click="toggleSidebar" v-if="currentUser" />
    <span class="title ml-3 mr-5 white--grey">
      <router-link to="/" :active="false"
        ><img src="@/assets/images/logo.png" height="40px"
      /></router-link>
    </span>
    <v-spacer />
    <Alerts />
    <UserHeader v-if="currentUser && currentUser.id" />
    <GuestHeader v-else />
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import Alerts from '../Alerts'
import UserHeader from './User'
import GuestHeader from './Guest'

export default {
  components: {
    Alerts,
    UserHeader,
    GuestHeader
  },
  data() {
    return {
      projectDialog: false
    }
  },
  methods: {
    toggleSidebar() {
      store.commit('toggleSidebar')
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>
