<template>
  <v-menu transition="slide-y-transition" bottom offset-y v-if="signedIn">
    <template v-slot:activator="{ on }">
      <v-btn fab dedpressed small text color="grey" v-on="on">
        <font-awesome-icon icon="user" />
      </v-btn>
    </template>
    <v-list>
      <v-list-item to="/me/general">
        <v-list-item-title>Моят профил</v-list-item-title>
      </v-list-item>
      <v-list-item @click="logOut">
        <v-list-item-title>Излез</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  data() {
    return {
      projectDialog: false
    }
  },
  methods: {
    logOut() {
      try {
        store.dispatch('logOut')
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapGetters(['signedIn'])
  }
}
</script>
