<template>
  <v-container id="search-wrapper" class="d-flex">
    <v-col>
      <SearchFilterSelect
        :label="$t(`search.labels.location`)"
        model="location"
        :suggestions="suggestedLocations"
      />
    </v-col>
    <v-col>
      <SearchFilterSelect
        :label="$t(`search.labels.subject`)"
        model="subject"
        :suggestions="suggestedSubjects"
      />
    </v-col>
    <v-col>
      <SearchFilterSelect
        :label="$t(`search.labels.level`)"
        model="level"
        :suggestions="suggestedLevels"
      />
    </v-col>
  </v-container>
</template>

<script>
import SearchFilterSelect from './SearchFilterSelect'

export default {
  name: 'SearchFilters',
  components: {
    SearchFilterSelect
  },
  props: {},
  data() {
    return {
      locations: [],
      suggestedLocations: [
        'online',
        'teacher_place',
        'student_place',
        'bgmentor_office'
      ],
      subjects: [],
      suggestedSubjects: [
        'maths',
        'bulgarian',
        'english',
        'programming',
        'biology',
        'piano'
      ],
      levels: [],
      suggestedLevels: [
        'beginner',
        'intermediate',
        'advanced',
        '_1st_grade',
        '_2nd_grade',
        '_3rd_grade',
        '_4th_grade',
        '_5th_grade',
        '_6th_grade',
        '_7th_grade',
        '_8th_grade',
        '_9th_grade',
        '_10th_grade',
        '_11th_grade',
        '_12th_grade'
      ]
    }
  },
  methods: {},
  computed: {}
}
</script>

<style scoped lang="sass"></style>
