<template>
  <v-container fluid>
    <v-row>
      <v-col
        xs="12"
        md="5"
      >
        <v-card
          class="pb-0"
          outlined
        >
          <v-card-title>
            <span class="headline">Плащания</span>
            <v-spacer></v-spacer>
            <v-text-field
              class="pt-0"
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-card-text class="px-0 pb-0">
            <v-container class="px-0 pb-0">
              <v-row>
                <v-col
                  cols="12"
                  class="px-0 pb-0"
                >
                  <v-data-table
                    v-if="filtered_payments.length"
                    :headers="headers"
                    :items="filtered_payments"
                    :items-per-page="10"
                    class="table-scroll"
                  >
                    <template v-slot:item="{ item }">
                      <tr
                        @click="activate(item)"
                        :class="{active: payment && item.id == payment.id}"
                      >
                        <td v-if="item.payer_type == 'Membership'">{{ item.student.name }}</td>
                        <td v-else>{{ item.payer.name }}</td>
                        <td>{{ item.recipient.name }}</td>
                        <td>{{ item.amount }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                  <div
                    v-else
                    class="px-3 grey--text py-3"
                  >Няма плащания</div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        xs="12"
        md="7"
      >
        <PaymentPreview :payment="payment" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentPreview from "@/views/Payments/PaymentPreview";
import { mapGetters } from "vuex";
import { FETCH_PAYMENTS } from "@/store/actions.type";
import store from "@/store";

export default {
  components: {
    PaymentPreview
  },
  data() {
    return {
      payment: null,
      search: "",
      headers: [
        {
          text: "От",
          align: "left",
          sortable: false
        },
        {
          text: "До",
          align: "left",
          sortable: false
        },
        { text: "Сума", value: "amount" }
      ]
    };
  },
  mounted() {
    store.dispatch(FETCH_PAYMENTS);
  },
  methods: {
    activate(item) {
      this.payment = item;
    },
    capitalize(s) {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
    itemTransfer(item) {
      let response = "";
      if (["Academy", "User"].includes(item.payer_type)) {
        response = item.payer.name + " " + item.recipient.name;
      } else {
        response = item.student.name + " " + item.recipient.name;
      }

      return response;
    }
  },
  computed: {
    ...mapGetters(["payments"]),
    filtered_payments() {
      return this.payments.filter(
        p =>
          p &&
          this.itemTransfer(p)
            .toLowerCase()
            .search(this.search.toLowerCase()) != -1
      );
    }
  },
  watch: {
    payments() {
      if (this.payments.length) {
        this.payment = this.payments[0];
      }
    }
  }
};
</script>

<style lang="sass">
tr.active
  background: #e3f0ff !important
</style>