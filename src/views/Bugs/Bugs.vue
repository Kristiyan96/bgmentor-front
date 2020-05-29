<template>
  <Layout2x1>
    <template v-slot:col-left>
      <BugList
        @setBug="setBug"
        :bug="bug"
      />
    </template>
    <template v-slot:col-right>
      <BugPreview :bug="bug" />
    </template>
  </Layout2x1>
</template>

<script>
import Layout2x1 from "@/layout/Layout2x1";
import BugPreview from "./BugPreview";
import BugList from "./BugList";

export default {
  components: {
    Layout2x1,
    BugList,
    BugPreview
  },
  data() {
    return {
      bug: null
    };
  },
  methods: {
    setBug(bug) {
      this.bug = bug;
    }
  }
};
</script>