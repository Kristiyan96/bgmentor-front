<template>
  <v-row>
    <v-col cols="4">
      <div class="mb-5">
        <v-row class="absolute-center">
          <ProfileAvatar :teacher="teacher" />
        </v-row>
      </div>
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
        <v-row align="center" class="mx-0">
          <v-col>
            <TeacherTitle :teacher="teacher" />
          </v-col>
          <v-col class="text-right">
            <ProfileLocation :profile="teacher" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
import ProfileLocation from '@/views/Profile/ProfileLocation'
import TeacherPricing from '@/views/Profile/TeacherPricing'
import TeacherTitle from '@/views/Profile/TeacherTitle'
import ProfileAvatar from '@/views/Profile/ProfileAvatar'

export default {
  name: 'TeacherHeader',
  components: {
    ProfileAvatar,
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
.absolute-center
  display: flex
  align-items: center
  justify-content: center
  text-align: center
  z-index: 9
.text-right
  display: flex
  justify-content: flex-end
</style>
