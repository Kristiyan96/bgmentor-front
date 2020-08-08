<template>
  <LayoutColumn paddingless>
    <template v-slot:title>
      Моята обява
    </template>

    <template v-slot:actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" depressed>
        Редактирай
      </v-btn>
    </template>
  </LayoutColumn>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_SUBJECTS, FETCH_LEVELS } from "@/store/actions.type";
import LayoutColumn from "@/layout/LayoutColumn";

export default {
  components: {
    LayoutColumn
  },
  data() {
    return {
      show: false
    };
  },
  mounted() {
    store.dispatch(FETCH_SUBJECTS);
    store.dispatch(FETCH_LEVELS);
  },
  methods: {},
  computed: {
    ...mapGetters(["current_user", "subjects", "levels"])
  }
};
</script>
