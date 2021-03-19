<template>
  <span class="h5 font-weight-bold">
    <v-btn @click="openDialog" color="primary" icon smallclass="mr-5">
      <font-awesome-icon icon="edit" />
    </v-btn>
    <DialogForm
      :open="open"
      :onSubmit="savePricings"
      @onClose="closeDialog"
      :title="$t(`profile.titles.change_pricing`)"
      :error="error"
    >
      <v-container>
        <v-row
          v-for="(pricing, idx) in filteredPricings"
          :key="`${pricing.id}-${idx}`"
          class="d-flex pricing-item"
        >
          <v-col>
            <v-text-field
              :rules="minutesRules"
              v-model="pricing.minutes"
              :label="$t(`profile.labels.pricing_minutes`)"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :rules="priceRules"
              v-model="pricing.price"
              :label="$t(`profile.labels.pricing_price`)"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn icon @click="deletePricing(pricing)"
              ><font-awesome-icon icon="trash-alt"
            /></v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-btn
        @click="addPricing"
        color="primary"
        class="mt-4"
        :loading="loading"
      >
        {{ $t(`profile.labels.add_pricing`) }}
      </v-btn>
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
    this.resetEditing()
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
        this.resetEditing()
        this.closeDialog()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    resetEditing() {
      this.pricings = [...this.teacher.pricings]
    },
    deletePricing(pr) {
      const idx = this.pricings.findIndex(
        (p) =>
          p.id === pr.id &&
          p.minutes === pr.minutes &&
          p.price === pr.price &&
          !p._destroy
      )

      if (idx >= 0) {
        const newPricing = { ...this.pricings[idx], _destroy: true }
        this.pricings.splice(idx, 1, newPricing)
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'profile']),
    editable() {
      return this.profile.id === this.currentUser.id
    },
    filteredPricings() {
      return this.pricings.filter((p) => p['_destroy'] !== true)
    }
  }
}
</script>

<style lang="sass" scoped>
.pricing-item
  border-bottom: 1px solid rgb(220,220,220)
</style>
