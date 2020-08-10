<template>
  <v-list-item>
    <template v-slot:default>
      <v-list-item-content>
        <v-list-item-title v-text="subject.label"></v-list-item-title>
        <v-list-item-subtitle>{{
          item.level_list.join(", ")
        }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-list-item-action-text v-text="item.price"></v-list-item-action-text>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      description: "Current row's skill item"
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {
    ...mapGetters(["subjects", "levels", "skills"]),
    subject() {
      return this.subjects.find(s => s.id == this.item.subject_id);
    }
  }
};
</script>
