<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text color="green" v-on="on">Платил</v-btn>
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
import { CREATE_PAYMENT, FETCH_MEMBERSHIPS } from "@/store/actions.type";
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
        note: "",
        amount: 0,
        membership_ids: []
      }
    }
  },
  methods: {
    addPayments() {
      let params = this.memberships.map(m => {
        return {
          membership_id: m.id, 
          note: this.form.note, 
          amount: this.form.amount
        }
      });
      store.dispatch(CREATE_PAYMENT, params).then(response => {
        store.dispatch(FETCH_MEMBERSHIPS, this.group.id);
      })
      this.dialog = false;
    }
  }
}
</script>