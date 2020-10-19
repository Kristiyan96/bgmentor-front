<template>
  <Layout2x1>
    <template v-slot:col-left>
      <QuestionList @setQuestion="setQuestion" :question="question" />
    </template>
    <template v-slot:col-right>
      <QuestionView :question="question" />
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
    return {
      question: null
    };
  },
  methods: {
    setQuestion(question) {
      this.question = question;
    }
  }
};
</script>
