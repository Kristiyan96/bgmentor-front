<template>
  <v-row>
    <v-col cols="12" md="4">
      <div class="mb-5">
        <v-row class="absolute-center">
          <Avatar :profile="profile" />
        </v-row>
      </div>
    </v-col>
    <v-col cols="12" md="8">
      <v-card-title>
        <span class="h2">
          {{ profile.first_name }}
        </span>
        <v-spacer />
      </v-card-title>
      <v-card-text>
        <v-row class="mx-0">
          <v-col cols="12" md="8">
            <Title :profile="profile" />
          </v-col>
          <v-col class="text-right" cols="12" md="4">
            <Location :profile="profile" />
          </v-col>
        </v-row>
        <v-row class="d-flex">
          <v-btn
            :href="`tel:${profile.phone_number}`"
            class="ml-2 info"
            v-if="profile.role === 'teacher'"
            >{{ $t(`profile.actions.call`) }}
            <font-awesome-icon icon="phone" class="ml-2"
          /></v-btn>
        </v-row>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
import Location from '@/views/Profile/Location'
import Title from '@/views/Profile/Title'
import Avatar from '@/views/Profile/Avatar'

export default {
  name: 'TeacherHeader',
  components: {
    Avatar,
    Location,
    Title
  },
  props: {
    profile: {
      type: Object,
      default: () => {},
      description: 'Student being displayed'
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
