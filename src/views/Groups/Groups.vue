<template>
  <Layout2x1>
    <template v-slot:col-left>
      <GroupList
        :groups="groups"
        @setGroup="setGroup"
        :group="group"
      />
    </template>
    <template v-slot:col-right>
      <GroupPreview :group="group" />
    </template>
  </Layout2x1>
</template>

<script>
import Layout2x1 from "@/layout/Layout2x1";
import { mapGetters } from "vuex";
import {
  FETCH_USERS,
  FETCH_GROUPS,
  FETCH_PRICINGS,
  FETCH_LOCATIONS,
  CREATE_GROUP,
  UPDATE_GROUP
} from "@/store/actions.type";
import store from "@/store";
import GroupList from "./GroupList";
import GroupPreview from "./GroupPreview";

export default {
  components: {
    Layout2x1,
    GroupList,
    GroupPreview
  },
  data() {
    return {
      group: null
    };
  },
  mounted() {
    store.dispatch(FETCH_GROUPS);
    store.dispatch(FETCH_USERS);
    store.dispatch(FETCH_PRICINGS);
    store.dispatch(FETCH_LOCATIONS);
  },
  methods: {
    setGroup(group) {
      this.group = group;
    }
  },
  computed: {
    ...mapGetters(["groups"])
  },
  watch: {
    groups() {
      if (this.groups.length) {
        this.group = this.groups[0];
      }
    }
  }
};
</script>