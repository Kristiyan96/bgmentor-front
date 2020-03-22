<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" md="5">
        <v-card class="pb-0" outlined >
          <v-card-title>
            <span class="headline">Ценоразпис</span>
            <v-spacer/>
            <v-btn icon @click="newPricing">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="px-0 pb-0">
            <v-container class="px-0 pb-0">
              <v-row>
                <v-col cols="12" class="px-0 pb-0">
                  <v-data-table
                    v-if="pricings.length"
                    :headers="headers"
                    :items="pricings"
                    :items-per-page="10"
                  >
                    <template v-slot:item="{ item }">
                      <tr @click="activate(item)" :class="{active: pricing && item.id == pricing.id}">
                        <td>{{ item.title }}</td>
                        <td>{{ item.credit_price }}лв.</td>
                      </tr>
                    </template>
                  </v-data-table>
                  <div v-else class="px-3 grey--text py-3">Няма ценоразписи</div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" md="7">
        <PricingPreview :pricing="pricing" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PricingPreview from "@/views/Pricing/PricingPreview";
import { mapGetters } from "vuex";
import { FETCH_PRICINGS } from "@/store/actions.type";
import store from "@/store";

export default {
  components: {
    PricingPreview
  },
  data() {
    return {
      pricing: null,
      headers: [
        {
          value: 'title',
          text: 'Име'
        },
        {
          value: 'price_credit',
          text: 'Цена на урок'
        }
      ],
    }
  },
  mounted() {
    store.dispatch(FETCH_PRICINGS);
  },
  methods: {
    activate(item) {
      this.pricing = item;
    },
    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    newPricing() {
      this.pricing = {
        title: "",
        credit_price: 0
      }
    }
  },
  computed: {
    ...mapGetters(["pricings"])
  },
  watch: {
    pricings() {
      if(this.pricings.length) {
        this.pricing = this.pricings[0];
      }
    }
  }
}
</script>

<style lang="sass">
tr.active
  background: #e3f0ff !important
</style>