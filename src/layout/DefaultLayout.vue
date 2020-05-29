<template>
  <v-content>
    <Header2 v-if="current_user.id" />
    <Header v-else />
    <SidebarLeft v-if="current_user.id" />
    <slot />
    <Footer v-if="!current_user.id" />
  </v-content>
</template>

<script>
import Header from "./Header";
import Header2 from "./AppHeader";
import SidebarLeft from "./AppSidebarLeft";
import Footer from "./Footer";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
    Header2,
    Footer,
    SidebarLeft
  },
  computed: {
    ...mapGetters(["current_user"])
  }
};
</script>
