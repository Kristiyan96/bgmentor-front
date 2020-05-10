<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" md="4">
        <v-flex xs12>
          <v-toolbar flat dense>
            <v-toolbar-title>
              Profile
            </v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-item to="general">
              <v-list-item-avatar>
                <font-awesome-icon icon="cog" class="grey--text" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Basic Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="security">
              <v-list-item-avatar>
                <font-awesome-icon icon="shield-alt" class="grey--text" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Security</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="notifications">
              <v-list-item-avatar>
                <font-awesome-icon icon="bell" class="grey--text" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Notifications</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-flex>
      </v-col>
      <v-col>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return { };
  }
};
</script>