<template>
  <v-navigation-drawer :value="sidebar" clipped app>
    <v-layout column fill-height align-content-start>
      <v-flex shrink>
        <v-list dense shaped>
          <v-list-item to="/home">
            <v-list-item-action>
              <font-awesome-icon icon="home" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Начало
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/reports">
            <v-list-item-action>
              <font-awesome-icon icon="home" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Доклад и отзиви
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/billing">
            <v-list-item-action>
              <font-awesome-icon icon="home" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Плащания
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

export default {
  data() {
    return { };
  },
  computed: {
    ...mapGetters(["favorites", "sidebar"]),
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
</style>