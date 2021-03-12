<template>
  <div>
    <v-btn @click="open = true"> Add product </v-btn>
    <DialogForm
      :error="error"
      :notice="notice"
      :onSubmit="submit"
      :title="title"
      :open="open"
      @onClose="onClose"
    >
      <v-text-field
        class="mb-2"
        v-model="product_form.title"
        :label="$t('products.labels.title')"
        :rules="titleRules"
        required
      />
      <v-select
        :items="subjects"
        item-text="title"
        item-value="id"
        class="mb-2"
        v-model="product_form.subject_id"
        :label="$t('products.labels.subject')"
        :rules="subjectRules"
        required
      />
      <v-text-field
        class="mb-2"
        v-model="product_form.price"
        :label="$t('products.labels.price')"
        :rules="priceRules"
        required
      />
      <v-textarea
        class="mb-2"
        v-model="product_form.description"
        :label="$t('products.labels.description')"
        required
      />
    </DialogForm>
  </div>
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
      open: false,
      product_form: {},
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
    this.product_form =
      this.product && this.product.id
        ? {
            ...this.product
          }
        : { ...this.new_product }
  },
  methods: {
    async submit() {
      this.loading = true

      try {
        await store.dispatch(
          this.product_form.id ? 'updateProduct' : 'createProduct',
          this.product_form
        )
        this.error = ''
      } catch (error) {
        this.error = error.response.data.error
      } finally {
        this.loading = false
      }
    },
    onClose() {
      this.open = false
      this.product_form = { ...this.new_product }
    }
  },
  computed: {
    ...mapGetters(['new_product', 'subjects']),
    dirty() {
      return (
        this.product.title !== this.product_form.title ||
        this.product.price !== this.product_form.price ||
        this.product.description !== this.product_form.description ||
        this.product.subject_id !== this.product_form.subject_id
      )
    },
    title() {
      return this.product_form.id ? 'Create new product' : 'Update product'
    }
  }
}
</script>
