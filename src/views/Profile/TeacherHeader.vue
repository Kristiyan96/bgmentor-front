<template>
  <v-row>
    <v-col cols="12" md="4">
      <div class="mb-5">
        <v-row class="absolute-center">
          <ProfileAvatar :teacher="teacher" />
        </v-row>
      </div>
    </v-col>
    <v-col cols="12" md="8">
      <v-card-title>
        <span class="h2">
          {{ teacher.first_name }}
        </span>
        <v-spacer />
        <TeacherPricing :teacher="teacher" />
      </v-card-title>
      <v-card-text>
        <v-row class="mx-0">
          <v-col cols="12" md="8">
            <TeacherTitle :teacher="teacher" />
          </v-col>
          <v-col class="text-right" cols="12" md="4">
            <ProfileLocation :profile="teacher" />
          </v-col>
        </v-row>
        <v-row class="d-flex">
          <TeacherPayment :teacher="teacher" />
          <v-btn
            :href="`tel:${teacher.phone_number}`"
            class="ml-2 info"
            v-if="teacher.role === 'teacher'"
            >{{ $t(`profile.actions.call`) }}
            <font-awesome-icon icon="phone" class="ml-2"
          /></v-btn>
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
import TeacherPayment from './TeacherPayment'

export default {
  name: 'TeacherHeader',
  components: {
    ProfileAvatar,
    ProfileLocation,
    TeacherPricing,
    TeacherTitle,
    TeacherPayment
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
