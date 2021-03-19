<template>
  <v-container id="search-wrapper" class="d-flex">
    <v-col>
      <v-autocomplete
        filled
        id="search-location"
        v-model="locations"
        :items="allLocations"
        chips
        flat
        label="Locations"
        multiple
      ></v-autocomplete>
    </v-col>
    <v-col>
      <v-autocomplete
        filled
        id="search-subject"
        v-model="subjects"
        :items="allSubjects"
        chips
        flat
        label="Subjects"
        multiple
      ></v-autocomplete>
    </v-col>
    <v-col>
      <v-autocomplete
        filled
        id="search-levels"
        v-model="levels"
        :items="allLevels"
        chips
        flat
        label="Levels"
        multiple
      ></v-autocomplete>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'SearchFilters',
  components: {},
  props: {},
  data() {
    return {
      locations: [],
      allLocations: [
        'Online',
        "Teacher's place",
        'My Place',
        'BgMentor office'
      ],
      subjects: [],
      allSubjects: ['Maths', 'Bulgarian', 'English'],
      levels: [],
      allLevels: ['beginner', 'intermediate', 'advanced']
    }
  },
  methods: {}
}
</script>

<style scoped lang="sass"></style>
