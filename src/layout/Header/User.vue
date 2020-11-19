<template>
  <v-menu
    transition="slide-y-transition"
    bottom
    offset-y
    v-if="current_user && current_user.id"
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
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { LOGOUT } from "@/store/actions.type";

export default {
  data() {
    return {
      projectDialog: false,
    };
  },
  methods: {
    logOut() {
      store.dispatch(LOGOUT).then(() => this.$router.push("/"));
    },
  },
  computed: {
    ...mapGetters(["current_user"]),
  },
};
</script>
