<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn outlined color="green" v-on="on">Платил</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Плащане</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" class="pl-0">
              <v-text-field label="*Сума" v-model="form.amount"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pr-0">
              <v-select
                :items="monthOptions"
                v-model="form.month"
                label="*Месец"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" class="px-0">
              <v-text-field label="Забележки" v-model="form.note"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Затвори</v-btn>
        <v-btn color="blue darken-1" outlined @click="addPayments">Потвърди</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { CREATE_PAYMENT } from "@/store/actions.type";
import store from "@/store";

export default {
  props: {
    group: {
      type: Object,
      default: () => {},
      description: "Group to edit"
    },
    memberships: {
      type: Array,
      default: () => [],
      description: "An array of memberships that have paid"
    }
  },
  data() {
    return {
      dialog: false,
      form: {
        month: 0,
        note: "",
        amount: 0,
        membership_ids: []
      },
      monthOptions: [
        {
          text: "Януари",
          value: 0
        },
        {
          text: "Февруари",
          value: 1
        },
        {
          text: "Март",
          value: 2
        },
        {
          text: "Април",
          value: 3
        },
        {
          text: "Май",
          value: 4
        },
        {
          text: "Юни",
          value: 5
        },
        {
          text: "Юли",
          value: 6
        },
        {
          text: "Август",
          value: 7
        },
        {
          text: "Септември",
          value: 8
        },
        {
          text: "Октомври",
          value: 9
        },
        {
          text: "Ноември",
          value: 10
        },
        {
          text: "Декември",
          value: 11
        }
      ]
    }
  },
  methods: {
    addPayments() {
      let params = this.memberships.map(m => {
        return {
          membership_id: m.id, 
          note: this.form.note, 
          amount: this.form.amount,
          month: this.form.month
        }
      });
      store.dispatch(CREATE_PAYMENT, params);
      this.dialog = false;
    }
  }
}
</script>