<template>
  <v-content dark>
    <Header />
    <SidebarLeft />
    <SidebarRight />
    <slot />
  </v-content>
</template>

<script>
import Header from "./AppHeader";
import SidebarLeft from "./AppSidebarLeft";
import SidebarRight from "./AppSidebarRight";

export default {
  components: {
    Header,
    SidebarLeft,
    SidebarRight
  },
  data: () => ({ })
};
</script>
