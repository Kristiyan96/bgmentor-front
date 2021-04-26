<template>
  <div class="container-wrapper">
    <Header />
    <SidebarLeft v-if="signedIn" />
    <v-main>
      <slot />
    </v-main>
    <Footer />
  </div>
</template>

<script>
import Header from './Header/AppHeader'
import SidebarLeft from './AppSidebarLeft'
import Footer from './Footer'
import { mapGetters } from 'vuex'

export default {
  components: {
    Header,
    Footer,
    SidebarLeft
  },
  computed: {
    ...mapGetters(['signedIn'])
  }
}
</script>

<style lang="sass">
.container-wrapper
  background: #fafafa
  height: 100%
  display: flex
  flex-direction: column
</style>
