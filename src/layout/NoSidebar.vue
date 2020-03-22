<template>
  <v-content>
    <Header />
    <slot />
    <Footer />
  </v-content>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";

export default {
  components: {
    Header,
    Footer
  }
}
</script>