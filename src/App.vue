<template>
  <v-app id="app">
    <DefaultLayout>
      <router-view />
    </DefaultLayout>
  </v-app>
</template>

<script>
import DefaultLayout from "@/layout/DefaultLayout";
export default {
  components: {
    DefaultLayout
  },
  data() {
    return {};
  }
};
</script>

<style lang="sass">
@import '../node_modules/vuetify/dist/vuetify.css'
.theme--light.v-application
  background-color: white !important
.row
  margin: 0px !important
.container.grey.lighten-4
  padding: 0px
button:focus, a:focus
  outline: 0 !important
html
  overflow-y: auto !important
.v-btn
  text-transform: none !important
</style>
