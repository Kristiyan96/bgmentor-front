<template>
  <v-navigation-drawer
    :value="sidebar"
    clipped
    disable-route-watcher
    app
    stateless
    :temporary="$isMobile()"
    v-click-outside="handleClickOutside"
  >
    <v-layout column fill-height align-content-start>
      <v-flex shrink>
        <v-list dense shaped>
          <v-list-item to="/verify" v-if="!currentUser.verified">
            <v-list-item-action>
              <font-awesome-icon icon="sms" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('nav.verify') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="`/profile/${currentUser.id}`">
            <v-list-item-action>
              <font-awesome-icon icon="user" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('nav.profile') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  data() {
    return {}
  },
  mounted() {
    // if (!this.$isMobile()) {
    //   store.commit('toggleSidebar')
    // }
  },
  computed: {
    ...mapGetters(['sidebar', 'currentUser'])
  },
  methods: {
    handleClickOutside() {
      if (this.sidebar && this.$isMobile()) {
        store.commit('toggleSidebar')
      }
    }
  }
}
</script>

<style scoped lang="sass">
.v-navigation-drawer
  padding: 4px 0px 4px 4px
.flex.grow .v-list.v-sheet
  height: 100%
.projects-wrapper
  max-height: 200px
  overflow-y: auto
.pricing-icon
  height: 100%
</style>
