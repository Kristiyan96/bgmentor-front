<template>
  <v-simple-table>
    <template v-slot:default>
      <thead v-if="teacher.pricings.length">
        <tr>
          <th class="text-left">{{ $t(`time.minutes`) }}</th>
          <th class="text-left">{{ $t(`profile.titles.price`) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pricing in teacher.pricings" :key="pricing.minutes">
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
    teacher: {
      type: Object,
      default: () => this.profile,
      description: 'Teacher being displayed'
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {},
  computed: {
    ...mapGetters(['currentUser', 'profile']),
    editable() {
      return this.teacher.id === this.currentUser.id
    }
  }
}
</script>

<style lang="sass" scoped>
.v-data-table
  width: 400px
  padding-left: 15px
</style>
