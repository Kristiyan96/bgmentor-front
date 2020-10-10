<template>
  <Layout2x1>
    <template v-slot:col-left>
      <GroupList
        :groups="individuals"
        @setGroup="setGroup"
        :group="group"
        type="Индивидуални"
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
  DESTROY_GROUP
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
      group: null,
      headers: [
        {
          text: "Име",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Клас", value: "grade" }
      ]
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
    },
    destroy(group) {
      store.dispatch(DESTROY_GROUP, group.id);
    }
  },
  computed: {
    ...mapGetters(["individuals"])
  },
  watch: {
    individuals() {
      if (this.individuals.length) {
        this.group = this.individuals[0];
      }
    }
  }
};
</script>

<style lang="sass">
tr.active
  background: #e3f0ff !important
</style>
