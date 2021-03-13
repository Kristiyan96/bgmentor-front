<template>
  <v-row no-gutters> </v-row>
</template>

<script>
export default {
  name: 'ProfileSection',
  props: {
    teacher: {
      type: Object,
      default: () => {},
      description: 'Teacher being displayed'
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="sass"></style>
