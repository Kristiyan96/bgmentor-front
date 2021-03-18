<template>
  <span class="h5 font-weight-bold">
    <v-btn @click="openDialog" color="primary" icon smallclass="mr-5">
      <font-awesome-icon icon="edit" />
    </v-btn>
    <DialogForm
      :open="open"
      :onSubmit="savePricings"
      @onClose="closeDialog"
      :title="$t(`profile.titles.title`)"
      :error="error"
    >
      <div v-for="pricing in pricings" :key="pricing.id" class="d-flex">
        <v-text-field
          :rules="minutesRules"
          v-model="pricing.minutes"
          :label="$t(`profile.labels.pricing_minutes`)"
        ></v-text-field>
        <v-text-field
          :rules="priceRules"
          v-model="pricing.price"
          :label="$t(`profile.labels.pricing_price`)"
        ></v-text-field>
      </div>
      <v-btn @click="addPricing" color="primary"> Add pricing </v-btn>
    </DialogForm>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import DialogForm from '@/components/DialogForm'

export default {
  name: 'TeacherPricing',
  components: {
    DialogForm
  },
  props: {
    teacher: {
      type: Object,
      default: () => {},
      description: 'Teacher being displayed'
    }
  },
  data() {
    return {
      loading: false,
      open: false,
      error: null,
      pricings: [],
      minutesRules: [(v) => !!v || this.$t(`profile.rules.minutes`)],
      priceRules: [(v) => !!v || this.$t(`profile.rules.price`)]
    }
  },
  mounted() {
    this.pricings = this.teacher.pricings
  },
  methods: {
    addPricing() {
      this.pricings = [...this.pricings, { minutes: null, price: null }]
    },
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
      this.resetEditing()
    },
    async savePricings() {
      this.loading = true

      try {
        await store.dispatch('updateProfile', {
          pricings_attributes: this.pricings
        })
        this.error = null
        this.editing = false
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    resetEditing() {
      this.pricings = this.profile.pricings
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'profile']),
    editable() {
      return this.profile.id === this.currentUser.id
    }
  }
}
</script>
