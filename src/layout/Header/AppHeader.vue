<template>
  <v-app-bar app clipped-left elevation="0" color="grey lighten-5">
    <v-app-bar-nav-icon
      @click="toggleSidebar"
      v-if="current_user && current_user.id"
    />
    <span class="title ml-3 mr-5 white--grey">
      <router-link to="/" :active="false"
        ><img src="@/assets/images/logo.png" height="40px"
      /></router-link>
    </span>
    <v-spacer />
    <Alerts />
    <UserHeader v-if="current_user && current_user.id" />
    <GuestHeader v-else />
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { TOGGLE_SIDEBAR } from "@/store/mutations.type";
import Alerts from "../Alerts";
import UserHeader from "./User";
import GuestHeader from "./Guest";

export default {
  components: {
    Alerts,
    UserHeader,
    GuestHeader,
  },
  data() {
    return {
      projectDialog: false,
    };
  },
  methods: {
    toggleSidebar() {
      store.commit(TOGGLE_SIDEBAR);
    },
  },
  computed: {
    ...mapGetters(["resizable", "current_user"]),
  },
};
</script>
