<template>
  <DialogForm :error="error" :notice="notice" :onSubmit="submit" :title="title">
    <v-text-field
      class="mb-2"
      v-model="form_product.title"
      :label="$t('products.labels.title')"
      :rules="titleRules"
      required
    />
    <v-select
      :items="subjects"
      item-text="title"
      item-value="id"
      class="mb-2"
      v-model="form_product.subject_id"
      :label="$t('products.labels.subject')"
      :rules="subjectRules"
      required
    />
    <v-text-field
      class="mb-2"
      v-model="form_product.price"
      :label="$t('products.labels.price')"
      :rules="priceRules"
      required
    />
    <v-textarea
      class="mb-2"
      v-model="form_product.description"
      :label="$t('products.labels.description')"
      required
    />
  </DialogForm>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import DialogForm from '@/components/DialogForm'

export default {
  components: {
    DialogForm
  },
  props: {
    product: {
      type: Object,
      default: () => {},
      description: 'Product being edited/created'
    }
  },
  data() {
    return {
      form_product: {},
      loading: false,
      error: '',
      notice: '',
      titleRules: [(v) => !!v || 'Заглавието е задължително.'],
      subjectRules: [(v) => !!v || 'Предметът е задължителен.'],
      priceRules: [(v) => !!v || 'Цената е задължителна.']
    }
  },
  mounted() {
    store.dispatch('fetchApprovedSubjects')
    this.form_product = {
      ...this.product
    }
  },
  methods: {
    async submit() {
      this.loading = true

      try {
        await store.dispatch('updateProduct', this.product)
        this.error = ''
      } catch (error) {
        this.error = error.response.data.error
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters(['new_product', 'subjects']),
    dirty() {
      return (
        this.product.title !== this.form_product.title ||
        this.product.price !== this.form_product.price ||
        this.product.description !== this.form_product.description ||
        this.product.subject_id !== this.form_product.subject_id
      )
    },
    title() {
      return 'New product'
    }
  }
}
</script>
