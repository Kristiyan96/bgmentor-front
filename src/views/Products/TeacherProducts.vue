<template>
  <div class="root">
    <!-- <ProductList /> -->
    <ProductForm :product="new_product" />
  </div>
</template>

<script>
import ProductList from '@/views/Products/ProductList'
import ProductForm from '@/views/Products/ProductForm'
import store from '@/store'

export default {
  props: {
    teacher: {
      type: Object,
      default: () => {},
      description: 'The teacher we are displaying'
    }
  },
  components: {
    ProductList,
    ProductForm
  },
  data() {
    return {
      new_product: null
    }
  },
  methods: {
    addSubject() {
      store.commit('addProduct')
    }
  }
}
</script>

<style lang="sass"></style>
