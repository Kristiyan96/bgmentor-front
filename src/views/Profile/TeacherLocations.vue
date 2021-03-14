<template>
  <v-card class="mx-auto mt-4" outlined>
    <v-card-title>Locations</v-card-title>
    <v-card-text>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip
          v-for="location in profile.location_list"
          :key="location"
          class="mr-2"
          color="primary"
          :close="deleteable"
          @click:close="deleteLocation(location)"
        >
          {{ location }}
        </v-chip>
        <AddLocation v-if="deleteable" />
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import DialogForm from '@/components/DialogForm'
import AddLocation from '@/views/Profile/AddLocation'

export default {
  name: 'TeacherLocations',
  components: {
    DialogForm,
    AddLocation
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async deleteLocation(location) {
      this.loading = true
      const locationList = this.currentUser.location_list
        .filter((s) => s !== location)
        .join(', ')

      try {
        await store.dispatch('updateProfile', {
          location_list: locationList
        })
        this.error = null
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'profile']),
    deleteable() {
      return this.profile.id === this.currentUser.id
    }
  }
}
</script>
