<template>
  <Layout2x1>
    <template v-slot:col-left>
      <QuestionList />
    </template>
    <template v-slot:col-right>
      <QuestionView />
    </template>
  </Layout2x1>
</template>

<script>
import Layout2x1 from "@/layout/Layout2x1";
import QuestionView from "./QuestionView";
import QuestionList from "./QuestionList";

export default {
  components: {
    QuestionView,
    QuestionList,
    Layout2x1
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
