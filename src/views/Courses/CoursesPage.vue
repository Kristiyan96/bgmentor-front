<template>
  <Layout2x1>
    <template v-slot:col-left>
      <CourseList @setCourse="setCourse" :course="course" />
    </template>
    <template v-slot:col-right>
      <CourseView :course="course" />
    </template>
  </Layout2x1>
</template>

<script>
import Layout2x1 from "@/layout/Layout2x1";
import CourseView from "./CourseView";
import CourseList from "./CourseList";

export default {
  data() {
    return {
      course: null
    };
  },
  methods: {
    setCourse(course) {
      this.course = course;
    }
  }
};
</script>
