<template>
  <TextSection model="rate_details">
    <PricingTable />
  </TextSection>
</template>

<script>
import TextSection from './TeacherTextSection'
import PricingTable from './TeacherPricingTable'

export default {
  name: 'PricingSection',
  props: {},
  components: {
    TextSection,
    PricingTable
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {}
}
</script>
