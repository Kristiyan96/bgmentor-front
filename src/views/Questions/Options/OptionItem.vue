<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ option.label }}</v-list-item-title>
      <v-list-item-subtitle> </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    option: {
      type: Object,
      default: () => {},
      description: "Option object"
    }
  },
  data() {
    return {
      editing: false
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["active_question"])
  },
  watch: {}
};
</script>

<style lang="sass" scoped>
.fixed
  background-color: #E8F5E9
</style>
