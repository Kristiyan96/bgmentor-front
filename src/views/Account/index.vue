<template>
  <Layout2x1>
    <template v-slot:col-left>
      <LayoutColumn>
        <template v-slot:title> Профил </template>
        <template v-slot:content>
          <v-container class="px-0 pb-0">
            <v-flex xs12>
              <v-list>
                <v-list-item to="/me/general">
                  <v-list-item-avatar>
                    <font-awesome-icon icon="cog" class="grey--text" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Лична информация</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/me/teacher_profile">
                  <v-list-item-avatar>
                    <font-awesome-icon icon="cog" class="grey--text" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Моята обява</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/me/security">
                  <v-list-item-avatar>
                    <font-awesome-icon icon="shield-alt" class="grey--text" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Настройки за достъп</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/me/notifications">
                  <v-list-item-avatar>
                    <font-awesome-icon icon="bell" class="grey--text" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Известия</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-flex>
          </v-container>
        </template>
      </LayoutColumn>
    </template>
    <template v-slot:col-right>
      <router-view></router-view>
    </template>
  </Layout2x1>
</template>

<script>
import Layout2x1 from "@/layout/Layout2x1";
import LayoutColumn from "@/layout/LayoutColumn";
export default {
  components: {
    Layout2x1,
    LayoutColumn
  },
  data() {
    return {};
  }
};
</script>
