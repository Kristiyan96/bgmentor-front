<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title v-html="product.title" />
      <v-list-item-subtitle v-html="product.price" />
      <v-list-item-subtitle v-html="product.description" />
    </v-list-item-content>
    <v-divider inset />
  </v-list-item>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
      description: 'The product this list item is displaying'
    }
  },
  data() {
    return {}
  }
}
</script>
