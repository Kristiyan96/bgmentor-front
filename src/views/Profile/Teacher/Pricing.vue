<template>
  <span>
    <TeacherPricingForm v-if="!dontEdit" :profile="profile" />
    <span class="h5 font-weight-bold">
      {{ price }}
    </span>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import DialogForm from '@/components/DialogForm'
import TeacherPricingForm from '@/views/Profile/Teacher/TeacherPricingForm'

export default {
  name: 'TeacherPricing',
  components: {
    DialogForm,
    TeacherPricingForm
  },
  props: {
    dontEdit: {
      type: Boolean,
      default: false,
      description: 'Should we display edit button'
    },
    profile: {
      type: Object,
      default: () => {},
      description: 'Profile being displayed'
    }
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    ...mapGetters(['currentUser', 'profile']),
    formattedPrice() {
      return `от ${Math.floor(this.lowestPricing.price)}лв`
    },
    formattedTimeCalculated() {
      return `${Math.floor(this.lowestPricing.minutes / 60)}${this.$t(
        'time.h'
      )}${
        this.lowestPricing.minutes % 60 !== 0
          ? this.lowestPricing.minutes % 60
          : ''
      }${this.lowestPricing.minutes % 60 !== 0 ? this.$t('time.min') : ''}`
    },
    formattedTimeInMins() {
      return `${this.lowestPricing.minutes}${this.$t('time.min')}`
    },
    formattedTime() {
      return this.formattedTimeCalculated.length <
        this.formattedTimeInMins.length
        ? this.formattedTimeCalculated
        : this.formattedTimeInMins
    },
    price() {
      return this.lowestPricing
        ? `${this.formattedPrice} / ${this.formattedTime}`
        : this.$t(`profile.titles.negotiate`)
    },
    lowestPricing() {
      return this.profile.pricings.length
        ? this.profile.pricings.reduce((prev, curr) =>
            prev.price < curr.price ? prev : curr
          )
        : null
    }
  }
}
</script>
