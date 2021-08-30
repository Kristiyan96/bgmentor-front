<template>
  <v-simple-table v-if="user && user.pricings.length">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">{{ $t(`time.minutes`) }}</th>
          <th class="text-left">{{ $t(`profile.titles.price`) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pricing in user.pricings" :key="pricing.minutes">
          <td>{{ pricing.minutes }}</td>
          <td>{{ Math.floor(pricing.price) }}лв</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PricingTable',
  props: {
    profile: {
      type: Object,
      default: () => {},
      description: 'Teacher being displayed'
    }
  },
  data() {
    return {
      loading: false,
      user: null
    }
  },
  mounted() {
    this.user = this.profile ? this.profile : this.profile
  },
  computed: {
    ...mapGetters(['currentUser', 'profile']),
    editable() {
      return this.user.id === this.currentUser.id
    }
  }
}
</script>

<style lang="sass" scoped>
.v-data-table
  width: 400px
  padding-left: 15px
</style>
