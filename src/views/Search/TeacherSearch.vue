<template>
  <v-container>
    <v-row>
      <SearchFilters />
    </v-row>
    <v-row>
      <div class="h2">Results:</div>
    </v-row>
  </v-container>
</template>

<script>
import SearchFilters from './SearchFilters'

export default {
  name: 'TeacherSearch',
  components: { SearchFilters },
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="sass"></style>
