<template>
  <v-app-bar app clipped-left elevation="0">
    <v-app-bar-nav-icon @click="toggleSidebar" />
    <span class="title ml-3 mr-5 white--grey">
      <a href="/"><img src="@/assets/images/logo.png" height="40px"/></a>
    </span>
    <v-spacer />
    <Alerts />
    <v-menu
      transition="slide-y-transition"
      bottom
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn fab dedpressed small text color="grey" v-on="on">
          <font-awesome-icon icon="user" />
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/profile/general">
          <v-list-item-title>Моят профил</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logOut">
          <v-list-item-title>Излез</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_ALERT, LOGOUT, TOGGLE_NOTIFICATIONS } from "@/store/actions.type";
import { TOGGLE_SIDEBAR } from "@/store/mutations.type";
import Alerts from "./Alerts";

export default {
  components: {
    Alerts
  },
  data() {
    return {
      projectDialog: false
    };
  },
  methods: {
    toggleNotifications() {
      store.dispatch(TOGGLE_NOTIFICATIONS);
    },
    toggleSidebar() {
      store.commit(TOGGLE_SIDEBAR);
    },
    logOut() {
      store.dispatch(LOGOUT).then(() => this.$router.push('/'));
    },
  },
  computed: {
    ...mapGetters(["resizable"])
  }
}
</script>
