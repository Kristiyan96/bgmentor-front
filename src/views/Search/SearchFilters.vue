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
        'Online',
        "Teacher's place",
        'My Place',
        'BgMentor office'
      ],
      subjects: [],
      suggestedSubjects: ['Maths', 'Bulgarian', 'English'],
      levels: [],
      suggestedLevels: ['beginner', 'intermediate', 'advanced']
    }
  },
  methods: {},
  computed: {}
}
</script>

<style scoped lang="sass"></style>
