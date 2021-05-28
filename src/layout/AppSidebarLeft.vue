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
      <v-list dense shaped class="fill-height items font-weight-medium">
        <div>
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
          <v-list-item to="/calendar">
            <v-list-item-action>
              <font-awesome-icon icon="calendar-alt" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('nav.calendar') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="`/profile/${currentUser.id}`">
            <v-list-item-action>
              <font-awesome-icon icon="user" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                {{ $t('nav.profile') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div>
          <v-list-item to="/me/general" class="mb-autos">
            <v-list-item-action>
              <font-awesome-icon icon="cog" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                {{ $t('nav.settings') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logOut" class="mb-auto">
            <v-list-item-action>
              <font-awesome-icon icon="sign-out-alt" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                {{ $t('nav.logout') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
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
  computed: {
    ...mapGetters(['sidebar', 'currentUser'])
  },
  methods: {
    handleClickOutside() {
      if (this.sidebar && this.$isMobile()) {
        store.commit('toggleSidebar')
      }
    },
    logOut() {
      try {
        store.dispatch('logOut')
      } catch (error) {
        console.log(error)
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
.items
  display: flex
  flex-direction: column
  justify-content: space-between
</style>
