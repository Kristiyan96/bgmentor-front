<template>
  <v-container fluid class="px-0 py-0 container-wrapper">
    <v-row>
      <v-col class="col-wrapper left" cols="12" md="5">
        <slot name="col-left"></slot>
      </v-col>
      <v-col class="col-wrapper" cols="12" md="7">
        <slot name="col-right"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="sass" scoped>
.container-wrapper, .container-wrapper .row
  height: calc(100vh - 90px) !important

  .col-wrapper
    height: calc(100vh - 90px) !important

  .col-wrapper.left
    border-right: 1px solid rgb(230,230,230)
</style>
