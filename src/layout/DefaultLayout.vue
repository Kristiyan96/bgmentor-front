<template>
  <div class="container-wrapper">
    <Header />
    <SidebarLeft v-if="current_user && current_user.id" />
    <v-content>
      <slot />
    </v-content>
    <Footer v-if="!current_user || !current_user.id" />
  </div>
</template>

<script>
import Header from "./Header/AppHeader";
import SidebarLeft from "./AppSidebarLeft";
import Footer from "./Footer";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
    Footer,
    SidebarLeft,
  },
  computed: {
    ...mapGetters(["current_user"]),
  },
};
</script>

<style lang="sass">
.container-wrapper
  height: 100%
  display: flex
  flex-direction: column
</style>
