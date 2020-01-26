<template>
  <v-navigation-drawer :value="sidebar" clipped app stateless>
    <v-layout column fill-height align-content-start>
      <v-flex shrink>
        <v-list dense shaped>
          <v-list-item to="/calendar">
            <v-list-item-action>
              <font-awesome-icon icon="calendar-alt" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Календар
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/reports" v-if="current_user.role != 'student'">
            <v-list-item-action>
              <font-awesome-icon icon="file-alt" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Доклад и отзиви
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-if="['teacher'].includes(current_user.role)"
            :value="false"
          >
            <font-awesome-icon slot="prependIcon" icon="dollar-sign" class="grey--text pricing-icon" />
            <template v-slot:activator>
              <v-list-item-title>Пари</v-list-item-title>
            </template>

            <v-list-item to="/payments" v-if="['teacher'].includes(current_user.role)">
              <v-list-item-action>
                <font-awesome-icon icon="dollar-sign" class="grey--text" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Плащания
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item to="/pricing" v-if="['teacher'].includes(current_user.role)">
              <v-list-item-action>
                <font-awesome-icon icon="dollar-sign" class="grey--text" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Ценоразпис
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item to="/groups" v-if="current_user.role == 'teacher'">
            <v-list-item-action>
              <font-awesome-icon icon="users" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Групи
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/users" v-if="current_user.role == 'teacher'">
            <v-list-item-action>
              <font-awesome-icon icon="users" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Акаунти
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
          <v-list-item to="/bugs" v-if="current_user.admin">
            <v-list-item-action>
              <font-awesome-icon icon="bug" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Бъгове
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
    ...mapGetters(["favorites", "sidebar", "current_user"]),
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