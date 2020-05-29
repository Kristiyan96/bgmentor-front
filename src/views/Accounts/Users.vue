<template>
  <Layout2x1>
    <template v-slot:col-left>
      <UserList
        @setUser="setUser"
        @setUserType="setUserType"
        :user="user"
      />
    </template>
    <template v-slot:col-right>
      <UserPreview
        :user="user"
        :userType="userType"
      />
    </template>
  </Layout2x1>
</template>

<script>
import { FETCH_USERS } from "@/store/actions.type";
import store from "@/store";

import UserPreview from "./UserPreview";
import UserList from "./UserList";
import Layout2x1 from "@/layout/Layout2x1";

export default {
  components: {
    UserPreview,
    UserList,
    Layout2x1
  },
  data() {
    return {
      user: null,
      userType: "students"
    };
  },
  mounted() {
    store.dispatch(FETCH_USERS);
  },
  methods: {
    setUser(user) {
      this.user = user;
    },
    setUserType(type) {
      this.userType = type;
    }
  }
};
</script>

<style lang="sass">
tr.active
  background: #e3f0ff !important
th:nth-child(2), td:nth-child(2)
  width: 20%
</style>