<template>
  <Layout2x1>
    <template v-slot:col-left>
      <LessonList @setLesson="setLesson" :lesson="lesson" />
    </template>
    <template v-slot:col-right>
      <LessonPreview :lesson="lesson" />
    </template>
  </Layout2x1>
</template>

<script>
import store from '@/store'
import LessonPreview from '@/views/Lessons/LessonPreview'
import LessonList from '@/views/Lessons/LessonList'
import Layout2x1 from '@/layout/Layout2x1'
export default {
  components: {
    LessonPreview,
    LessonList,
    Layout2x1
  },
  data() {
    return {
      lesson: null
    }
  },
  mounted() {
    store.dispatch('fetchLessons')
  },
  methods: {
    setLesson(lesson) {
      this.lesson = lesson
    }
  }
}
</script>

<style lang="sass">
tr.active
  background: #e3f0ff !important
th:nth-child(2), td:nth-child(2)
  width: 20%
</style>
