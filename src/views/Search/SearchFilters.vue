<template>
  <v-container id="search-wrapper">
    <v-row>
      <v-btn
        elevation="0"
        small
        v-for="title in titles"
        :key="title"
      >{{title}}</v-btn>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'SearchFilters',
  props: {},
  data() {
    return {
      titles: [
        'location',
        'price',
        'area',
        'floor',
        'proptype'
      ]
    }
  },
  methods: {},
  computed: {}
}
</script>

<style scoped lang="sass"></style>
