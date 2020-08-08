<template>
  <p>Skills list</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {
    ...mapGetters(["subjects", "levels", "skills"])
  }
};
</script>
