<template>
  <LayoutColumn class="pricing-list">
    <template v-slot:title>
      Ценоразпис
    </template>

    <template v-slot:header-actions>
      <v-btn
        icon
        @click="newPricing"
      >
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>

    <template v-slot:content>
      <v-container class="px-0 pb-0">
        <v-row>
          <v-col
            cols="12"
            class="px-0 pb-0"
          >
            <v-data-table
              v-if="pricings.length"
              :headers="headers"
              :items="pricings"
              :items-per-page="10"
            >
              <template v-slot:item="{ item }">
                <tr
                  @click="activate(item)"
                  :class="{active: pricing && item.id == pricing.id}"
                >
                  <td>{{ item.title }}</td>
                  <td>{{ item.credit_price }}лв.</td>
                </tr>
              </template>
            </v-data-table>
            <div
              v-else
              class="px-3 grey--text py-3"
            >Няма ценоразписи</div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </LayoutColumn>
</template>

<script>
import LayoutColumn from "@/layout/LayoutColumn";
import { mapGetters } from "vuex";
import { FETCH_PRICINGS } from "@/store/actions.type";
import store from "@/store";

export default {
  props: {
    pricing: {
      type: Object,
      default: () => {},
      description: "Selected pricing"
    }
  },
  components: {
    LayoutColumn
  },
  data() {
    return {
      headers: [
        {
          value: "title",
          text: "Име"
        },
        {
          value: "price_credit",
          text: "Цена на урок"
        }
      ]
    };
  },
  mounted() {
    store.dispatch(FETCH_PRICINGS);
  },
  methods: {
    activate(item) {
      this.$emit("setPricing", item);
    },
    capitalize(s) {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
    newPricing() {
      this.$emit("setPricing", {
        title: "",
        credit_price: 0
      });
    }
  },
  computed: {
    ...mapGetters(["pricings"])
  },
  watch: {
    pricings() {
      if (this.pricings.length) {
        this.$emit("setPricing", this.pricings[0]);
      }
    }
  }
};
</script>

<style lang="sass">
.pricing-list
  tr.active
    background: #e3f0ff !important
  th:nth-child(1), td:nth-child(1)
    width: 60%
  th:nth-child(2), td:nth-child(2)
    width: 40%
</style>