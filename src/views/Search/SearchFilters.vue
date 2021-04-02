<template>
  <v-container id="search-wrapper">
    <v-row>
      <v-col cols="12" sm="12" lg="4">
        <SearchFilterSelect
          :label="$t(`search.labels.location`)"
          model="location"
          :suggestions="suggestedLocations"
        />
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <SearchFilterSelect
          :label="$t(`search.labels.subject`)"
          model="subject"
          :suggestions="suggestedSubjects"
        />
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <SearchFilterSelect
          :label="$t(`search.labels.level`)"
          model="level"
          :suggestions="suggestedLevels"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchFilterSelect from './SearchFilterSelect'

export default {
  name: 'SearchFilters',
  components: {
    SearchFilterSelect,
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
        'professional',
        '_1_grade',
        '_2_grade',
        '_3_grade',
        '_4_grade',
        '_5_grade',
        '_6_grade',
        '_7_grade',
        '_8_grade',
        '_9_grade',
        '_10_grade',
        '_11_grade',
        '_12_grade'
      ]
    }
  },
  methods: {},
  computed: {}
}
</script>

<style scoped lang="sass"></style>
