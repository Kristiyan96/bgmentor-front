<template>
  <v-card
    class="pb-0 card"
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
    <v-card-text
      class="px-0 pb-0"
      v-bind:class="{small: $slots.action}"
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
  data() {
    return {};
  }
};
</script>

<style lang="sass" scoped>
.card 
  overflow: hidden
  max-height: 100%
  display: flex
  flex-direction: column

  .v-card__text
    display: flex
    flex-direction: column
    position: relative
    overflow: auto
    max-height: calc(100% - 68px)

  .v-card__text.small
    max-height: calc(100% - 120px)
</style>