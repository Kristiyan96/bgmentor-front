<template>
  <div>
    <v-btn @click="addOption">Добави отговор</v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ADD_OPTION } from "@/store/actions.type";
import store from "@/store";

export default {
  data() {
    return { open: false };
  },
  methods: {
    addOption() {
      store.dispatch(ADD_OPTION);
    }
  },
  computed: {
    ...mapGetters(["current_user"])
  },
  watch: {}
};
</script>

<style lang="sass" scoped></style>
