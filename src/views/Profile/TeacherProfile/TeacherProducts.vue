<template>
  <div class="root">
    <ProductList />
    <!-- <NewProductForm v-if="new_product" :product="new_product" /> -->
    <v-btn @click="addSubject">
      <font-awesome-icon icon="plus" class="grey--text mr-3" />
      {{ $t('account.ad.addSubject') }}
    </v-btn>
  </div>
</template>

<script>
import ProductList from '@/views/Products/ProductList'
import NewProductForm from '@/views/Products/ProductForm'
import store from '@/store'

export default {
  components: {
    ProductList,
    NewProductForm
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
