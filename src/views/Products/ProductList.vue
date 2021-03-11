<template>
  <div>
    <v-list three-line v-if="!loading && products.length">
      <ProductItem :product="item" :key="item.id" v-for="item in products" />
    </v-list>
    <div v-else-if="loading">{{ $t('$vuetify.dataIterator.loadingText') }}</div>
    <div v-else class="mb-2">{{ $t('products.text.noProducts') }}</div>
  </div>
</template>

<script>
import ProductItem from './ProductListItem'
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  components: {
    ProductItem
  },
  props: {
    teacher: {
      type: Object,
      default: () => {},
      description: 'The teacher we are displaying products for'
    }
  },
  data() {
    return {
      loading: true,
      error: ''
    }
  },
  async mounted() {
    this.loading = true

    try {
      await store.dispatch('fetchUserProducts', this.teacher)
    } catch (error) {
      this.error = ''
    } finally {
      this.loading = false
    }
  },
  methods: {},
  computed: {
    ...mapGetters(['currentUser', 'products'])
  }
}
</script>
