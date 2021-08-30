<template>
  <div class="my-1 mb-3 subtitle-1 flex-end d-flex">
    <span>
      <SetLocation v-if="editable" :profile="profile" />
      <font-awesome-icon icon="map-marker-alt" class="mr-2" />
      {{ city }},
      {{ country }}
    </span>
  </div>
</template>

<script>
import SetLocation from '@/views/Profile/SetLocation'
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileLocation',
  components: {
    SetLocation
  },
  props: {
    profile: {
      type: Object
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['currentUser']),
    editable() {
      return this.profile.id === this.currentUser.id
    },
    city() {
      return this.profile.city_list && this.profile.city_list.length
        ? this.$t(`search.city.${this.profile.city_list[0]}`)
        : 'Unknown'
    },
    country() {
      return this.profile.country_list && this.profile.country_list.length
        ? this.$t(`search.country.${this.profile.country_list[0]}`)
        : 'Unknown'
    }
  }
}
</script>

<style lang="sass" scoped>
.flex-end
  display: flex
  justify-content: flex-end
</style>
