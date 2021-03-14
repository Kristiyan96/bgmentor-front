<template>
  <v-row no-gutters>
    <v-col cols="4">
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        src="https://picsum.photos/id/11/500/300"
        class="img"
      ></v-img>
    </v-col>
    <v-col cols="8">
      <v-card-title>
        <div class="h2">
          {{ teacher.first_name }}
        </div>
      </v-card-title>
      <v-card-text>
        <div class="h5 grey--text">
          {{ teacher.title }}
        </div>
        <div class="my-1 subtitle-1">
          {{ teacher.city }}, {{ teacher.country }}
        </div>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ml-4">4.5 (413)</div>
        </v-row>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TeacherItem',
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

<style scoped lang="sass">
.img
  border-radius: 5px
</style>
