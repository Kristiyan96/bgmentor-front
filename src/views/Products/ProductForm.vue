<template>
  <FormWrapper :error="error" :notice="notice" :onSubmit="submit">
    <v-textarea
      class="mb-2"
      v-model="form_product.title"
      :label="$t('product.label.title')"
      :rules="titleRules"
      required
    />
    <v-textarea
      class="mb-2"
      v-model="form_product.subject_id"
      :label="$t('product.label.subject')"
      :rules="subjectRules"
      required
    />
    <v-textarea
      class="mb-2"
      v-model="form_product.price"
      :label="$t('product.label.price')"
      :rules="priceRules"
      required
    />
    <v-textarea
      class="mb-2"
      v-model="form_product.description"
      :label="$t('product.label.description')"
      required
    />
  </FormWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import FormWrapper from '@/components/FormWrapper'

export default {
  components: {
    FormWrapper
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
    ...mapGetters(['new_product']),
    dirty() {
      return (
        this.product.title !== this.form_product.title ||
        this.product.price !== this.form_product.price ||
        this.product.description !== this.form_product.description ||
        this.product.subject_id !== this.form_product.subject_id
      )
    }
  }
}
</script>
