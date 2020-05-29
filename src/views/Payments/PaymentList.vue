<template>
  <LayoutColumn>
    <template v-slot:title>
      Плащания
    </template>

    <template v-slot:header-actions>
      <v-text-field
        class="pt-0"
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </template>

    <template v-slot:content>
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
            <td v-if="['Membership', 'User'].includes(item.payer_type)">
              {{ item.payer.name }}
            </td>
            <td v-else>{{ item.payer.name }}</td>
            <td>{{ item.recipient.name }}</td>
            <td>{{ parseFloat(item.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}лв.</td>
          </tr>
        </template>
      </v-data-table>
      <div
        v-else
        class="px-3 grey--text py-3"
      >Няма плащания</div>
    </template>
  </LayoutColumn>
</template>

<script>
import LayoutColumn from "@/layout/LayoutColumn";
import { mapGetters } from "vuex";
import { FETCH_PAYMENTS } from "@/store/actions.type";
import store from "@/store";

export default {
  components: {
    LayoutColumn
  },
  props: {
    payment: {
      type: Object,
      default: () => {},
      description: "Selected payment"
    }
  },
  data() {
    return {
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
      this.$emit("setPayment", item);
    },
    capitalize(s) {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
    itemTransfer(item) {
      return item.payer.name + " " + item.recipient.name;
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
        this.$emit("setPayment", this.payments[0]);
      }
    }
  }
};
</script>

<style lang="sass">
tr.active
  background: #e3f0ff !important
th:nth-child(2), td:nth-child(2)
  width: 30%
th:nth-child(3), td:nth-child(3)
  width: 25%
</style>