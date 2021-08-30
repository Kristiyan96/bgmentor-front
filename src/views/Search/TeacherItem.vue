<template>
  <div>
    <!-- desktop version -->
    <v-list-item :to="`/profile/${profile.id}`" class="d-none d-md-flex link">
      <v-list-item-avatar size="190" rounded>
        <Avatar :profile="profile" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-card-title>
          <span class="h2">
            {{ profile.first_name }}
          </span>
          <v-spacer />
          <v-chip class="ma-2" color="primary" label text-color="white">
            <font-awesome-icon icon="dollar-sign" class="mr-2" />
            <Pricing :profile="profile" dontEdit />
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <Title :profile="profile" />
            </v-col>
            <v-col>
              <Location :profile="profile" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-list-item-content>
    </v-list-item>
    <!-- mobile version -->
    <v-card class="mx-auto my-12 d-md-none link" :to="`/profile/${profile.id}`">
      <div class="mobile-image-wrapper">
        <Avatar :profile="profile" gradient />

        <div class="h2 teacher-title">
          <span>{{ profile.first_name }}</span>
          <v-spacer />
          <v-chip class="ma-2" color="primary" label text-color="white">
            <font-awesome-icon icon="dollar-sign" class="mr-2" />
            <Pricing :profile="profile" dontEdit />
          </v-chip>
        </div>
      </div>

      <v-card-text>
        <Title :profile="profile" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Location from '@/views/Profile/Location'
import Pricing from '@/views/Profile/Teacher/Pricing'
import Title from '@/views/Profile/Title'
import Avatar from '@/views/Profile/Avatar'

export default {
  name: 'TeacherItem',
  components: {
    Avatar,
    Location,
    Pricing,
    Title
  },
  props: {
    profile: {
      type: Object,
      default: () => {},
      description: 'Profile being displayed'
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="sass">
.img
  border-radius: 5px
.left-border
  border-left: 1px solid rgb(200,200,200)
.mobile-image-wrapper
  position: relative
.teacher-title
  display: flex
  font-weight: bold
  position: absolute
  bottom: 0px
  left: 30px
  z-index: 100
.link:hover
  text-decoration: none !important
</style>
