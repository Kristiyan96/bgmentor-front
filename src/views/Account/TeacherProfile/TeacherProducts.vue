<template>
  <div class="root">
    <ProductList />
    <v-btn>
      <font-awesome-icon icon="plus" class="grey--text mr-3" />
      {{ $t('account.ad.addSubject') }}
    </v-btn>
  </div>
</template>

<script>
import ProductList from '@/views/Products/ProductList'

export default {
  components: {
    ProductList
  },
  data() {
    return {}
  }
}
</script>

<style lang="sass"></style>
