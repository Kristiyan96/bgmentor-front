<template>
  <v-card
    class="pb-0"
    outlined
  >
    <v-card-title>
      <span class="headline">
        <slot name="title"></slot>
      </span>
      <v-spacer></v-spacer>
      <div>
        <slot name="header-actions"></slot>
      </div>
    </v-card-title>
    <v-card-text class="px-0 pb-0">
      <v-container class="px-0 pb-0">
        <slot name="content"></slot>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped></style>