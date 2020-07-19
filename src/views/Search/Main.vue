<template>
  <div class="wrapper px-4 py-4">
    <AdvancedSearch />
    <ResultsFeedback />
    <ResultsList />
  </div>
</template>

<script>
import AdvancedSearch from "./AdvancedSearch";
import ResultsFeedback from "./ResultsFeedback";
import ResultsList from "./ResultsList";

export default {
  components: {
    AdvancedSearch,
    ResultsFeedback,
    ResultsList
  },
  data() {
    return {};
  },
  computed: {
    queries() {
      let query = this.$route.params.query;
      let hash = query.split("&").map(q => {
        let key = q.split("=")[0];
        let val = q.split("=")[1];
        return { [key]: val };
      });
      return hash;
    }
  },
  watch: {
    queries: {
      immediate: true,
      handler() {
        console.log("query changed");
      }
    }
  }
};
</script>
