<template>
  <v-container class="grey lighten-5">
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
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import Avatar from "@/views/Profile/Avatar"
import Title from "@/views/Profile/Title"
import Location from "@/views/Profile/Location"

export default {
  name: 'Profile',
  components: {
    Avatar,
    Title,
    Location
  },
  props: {
    profile: {
      type: Object,
      default: () => {},
      description: "User profile"
    }
  },
  components: {
    
  },
  data() {
    return {
      loading: false,
      error: ''
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
}
</script>
