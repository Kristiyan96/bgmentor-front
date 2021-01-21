<template>
  <LayoutColumn>
    <template v-slot:title> {{ $t("account.security.title") }} </template>

    <template v-slot:content>
      <v-list three-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn>{{ $t("account.security.changePassword") }}</v-btn>
            </v-list-item-title>
            <v-list-item-subtitle>{{
              $t("account.security.changePasswordInfo")
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t("account.security.changePhone") }}
            </v-list-item-title>
            <v-list-item-subtitle>{{
              $t("account.security.changePhoneInfo")
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </LayoutColumn>
</template>

<script>
// import store from '@/store'
import LayoutColumn from "@/layout/LayoutColumn";
export default {
  components: {
    LayoutColumn
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
