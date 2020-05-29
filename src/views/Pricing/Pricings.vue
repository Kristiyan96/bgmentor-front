<template>
  <Layout2x1>
    <template v-slot:col-left>
      <PricingList
        @setPricing="setPricing"
        :pricing="pricing"
      />
    </template>
    <template v-slot:col-right>
      <PricingPreview :pricing="pricing" />
    </template>
  </Layout2x1>
</template>

<script>
import Layout2x1 from "@/layout/Layout2x1";
import PricingPreview from "./PricingPreview";
import PricingList from "./PricingList";

export default {
  components: {
    Layout2x1,
    PricingList,
    PricingPreview
  },
  data() {
    return {
      pricing: null
    };
  },
  methods: {
    setPricing(pricing) {
      this.pricing = pricing;
    }
  }
};
</script>