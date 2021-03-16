<template>
  <v-row>
    <v-col cols="4">
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        src="https://picsum.photos/id/11/500/300"
        class="img"
      ></v-img>
    </v-col>
    <v-col cols="8">
      <v-card-title>
        <span class="h2">
          {{ teacher.first_name }}
        </span>
        <v-spacer />
        <TeacherPricing :teacher="teacher" />
      </v-card-title>
      <v-card-text>
        <TeacherTitle :teacher="teacher" />
        <v-row align="center" class="mx-0">
          <v-spacer />
          <ProfileLocation :profile="teacher" />
        </v-row>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
import ProfileLocation from '@/views/Profile/ProfileLocation'
import TeacherPricing from '@/views/Profile/TeacherPricing'
import TeacherTitle from '@/views/Profile/TeacherTitle'

export default {
  name: 'TeacherItem',
  components: {
    ProfileLocation,
    TeacherPricing,
    TeacherTitle
  },
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
