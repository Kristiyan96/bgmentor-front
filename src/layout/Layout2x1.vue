<template>
  <v-container
    fluid
    class="px-0 py-0"
  >
    <v-row>
      <v-col
        cols="12"
        md="5"
      >
        <slot name="col-left"></slot>
      </v-col>
      <v-col
        cols="12"
        md="7"
      >
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

<style lang="stylus" scoped></style>