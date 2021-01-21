<template>
  <v-container fluid class="px-0 py-0 container-wrapper">
    <v-row class="m-0">
      <v-col class="col-wrapper p-1" cols="12" md="5">
        <slot name="col-left"></slot>
      </v-col>
      <v-col class="col-wrapper p-1" cols="12" md="7">
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

<style lang="sass" scoped></style>
