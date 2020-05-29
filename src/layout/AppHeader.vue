<template>
  <v-app-bar
    app
    clipped-left
    elevation="0"
    color="grey lighten-5"
  >
    <v-app-bar-nav-icon
      @click="toggleSidebar"
      v-if="current_user && current_user.id"
    />
    <span class="title ml-3 mr-5 white--grey">
      <router-link
        to="/"
        :active="false"
      ><img
          src="@/assets/images/logo.png"
          height="40px"
        /></router-link>
    </span>
    <v-spacer />
    <Alerts />
    <v-menu
      transition="slide-y-transition"
      bottom
      offset-y
      v-if="current_user && current_user.id"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          dedpressed
          small
          text
          color="grey"
          v-on="on"
        >
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
    <div v-else>
      <v-btn
        text
        color="primary"
        to="/login"
        class="hidden-sm-and-down"
      >
        Вход
      </v-btn>

      <v-btn
        text
        to="/register"
        class="hidden-sm-and-down"
      >
        Регистрация
      </v-btn>

      <div class="hidden-md-and-up">
        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item to="/login">
              <v-list-item-title>Влез</v-list-item-title>
            </v-list-item>

            <v-list-item to="/register">
              <v-list-item-title>Регистрация</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { LOGOUT } from "@/store/actions.type";
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
    toggleSidebar() {
      store.commit(TOGGLE_SIDEBAR);
    },
    logOut() {
      store.dispatch(LOGOUT).then(() => this.$router.push("/"));
    }
  },
  computed: {
    ...mapGetters(["resizable", "current_user"])
  }
};
</script>
