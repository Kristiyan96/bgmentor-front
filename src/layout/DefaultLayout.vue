<template>
  <div class="container-wrapper">
    <Header />
    <SidebarLeft v-if="currentUser && currentUser.id" />
    <v-main>
      <slot />
    </v-main>
    <Footer v-if="!currentUser" />
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
    ...mapGetters(['currentUser'])
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
