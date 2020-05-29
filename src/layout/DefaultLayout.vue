<template>
  <v-content>
    <Header />
    <SidebarLeft v-if="current_user && current_user.id" />
    <slot />
    <Footer v-if="!current_user || !current_user.id" />
  </v-content>
</template>

<script>
import Header from "./AppHeader";
import SidebarLeft from "./AppSidebarLeft";
import Footer from "./Footer";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
    Footer,
    SidebarLeft
  },
  computed: {
    ...mapGetters(["current_user"])
  }
};
</script>
