<template>
  <div>
    <v-card
      class="mx-auto"
      elevation="0"
      v-if="
        active_question &&
          active_question.options &&
          active_question.options.length
      "
    >
      <OptionItem
        v-for="item in active_question.options"
        :key="item.label"
        :option="item"
      />
    </v-card>
    <NewOption />
  </div>
</template>

<script>
import OptionItem from "./OptionItem";
import NewOption from "./NewOption";
import { mapGetters } from "vuex";

export default {
  components: {
    OptionItem,
    NewOption
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters(["active_question"])
  },
  watch: {}
};
</script>

<style lang="sass" scoped></style>
