<template>
  <Layout2x1>
    <template v-slot:col-left>
      <LocationList
        @setLocation="setLocation"
        :location="location"
      />
    </template>
    <template v-slot:col-right>
      <LocationPreview :location="location" />
    </template>
  </Layout2x1>
</template>

<script>
import Layout2x1 from "@/layout/Layout2x1";
import LocationPreview from "./LocationPreview";
import LocationList from "./LocationList";

export default {
  components: {
    Layout2x1,
    LocationList,
    LocationPreview
  },
  data() {
    return {
      location: null
    };
  },
  methods: {
    setLocation(location) {
      this.location = location;
    }
  }
};
</script>