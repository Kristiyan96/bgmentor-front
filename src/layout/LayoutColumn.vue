<template>
  <v-card class="pb-0 card" elevation="0">
    <v-card-title>
      <span class="headline">
        <slot name="title"></slot>
      </span>
      <v-spacer></v-spacer>
      <div>
        <slot name="header-actions"></slot>
      </div>
    </v-card-title>
    <v-card-text
      class="pb-0"
      v-bind:class="{
        small: $slots.action,
        'px-5 py-5': paddingless,
        'px-0': !paddingless
      }"
    >
      <slot name="content"></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    paddingless: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="sass" scoped>
.card
  overflow: auto
  display: flex
  flex-direction: column
  .v-card__title
    border-bottom: 1px solid rgba(0, 0, 0, 0.12)
  .v-card__text
    display: flex
    flex-direction: column
    position: relative
    overflow: auto
</style>
