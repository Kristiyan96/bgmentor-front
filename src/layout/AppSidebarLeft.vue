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
          <v-list-item to="/courses">
            <v-list-item-action>
              <font-awesome-icon icon="file-alt" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Теми
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/questions">
            <v-list-item-action>
              <font-awesome-icon icon="file-alt" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Въпроси
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/interests" v-if="current_user.admin">
            <v-list-item-action>
              <font-awesome-icon icon="user-friends" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Заявки
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { TOGGLE_SIDEBAR } from "@/store/mutations.type";

export default {
  data() {
    return {};
  },
  mounted() {
    if (!this.$isMobile()) {
      store.commit(TOGGLE_SIDEBAR);
    }
  },
  computed: {
    ...mapGetters(["favorites", "sidebar", "current_user"])
  },
  methods: {
    handleClickOutside() {
      if (this.sidebar && this.$isMobile()) {
        store.commit(TOGGLE_SIDEBAR);
      }
    }
  }
};
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
