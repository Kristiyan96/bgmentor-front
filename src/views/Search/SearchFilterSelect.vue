<template>
  <v-autocomplete
    filled
    :id="`search-${label}`"
    v-model="value"
    :items="allModels"
    chips
    flat
    :label="label"
    multiple
  ></v-autocomplete>
</template>

<script>
export default {
  name: 'SearchFilterSelect',
  components: {},
  props: {
    label: {
      type: String,
      default: '',
      description: 'Search filter name'
    },
    model: {
      type: String,
      default: '',
      description: 'Search filter name'
    },
    suggestions: {
      type: Array,
      default: () => [],
      description:
        'List of suggestions. TODO: This component should fetch these'
    }
  },
  data() {
    return {
      value: [],
      fetchedFilters: []
    }
  },
  methods: {},
  computed: {
    allModels() {
      return [
        { header: 'From your search' },
        ...this.fetchedFilters,
        { header: 'Suggestions' },
        ...this.suggestions
      ]
    }
  }
}
</script>

<style scoped lang="sass"></style>
